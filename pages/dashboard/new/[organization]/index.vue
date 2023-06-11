<script setup>
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	} from '@headlessui/vue';
	import { ref } from 'vue';

	const SUPER_ADMIN = 'super_admin';

	definePageMeta({ layout: 'project', middleware: ['auth'] });

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();
	const router = useRouter();
	const accounts = ref([]);
	const selectedAccount = ref({ name: '' });

	const submit_loading = ref(false);
	const page_loading = ref(true);

	const is_success = ref(false);
	const success_message = ref('');
	const is_error = ref(false);
	const error_message = ref('');

	const severities = ref([]);
	const categories = ref([]);
	const selectedSeverity = ref({ title: null });
	const selectedTicket = ref({ title: null });
	const selectedFiles = ref([]);

	const projectName = ref('');
	const projectSummary = ref('');

	async function fetchData() {
		try {
			const fetchUserData = supabase
				.from('User')
				.select(
					`*,
					Account(
					type
					)`
				)
				.eq('id', user.value.id)
				.limit(1)
				.single();

			const fetchAccountData = supabase
				.from('Account')
				.select('*, User(count)');
			// .neq('type', 'super_admin');

			const [
				{ data: userData, error: userError },
				{ data: accountData, error: accountError },
			] = await Promise.all([fetchUserData, fetchAccountData]);

			if (userError)
				throw new Error(`Error fetching user data: ${userError.message}`);
			if (accountError)
				throw new Error(`Error fetching account data: ${accountError.message}`);

			if (userData.Account && userData.Account.type === 'super_admin') {
				accounts.value = accountData;
				selectedAccount.value = accountData.find(
					(o) => o.id === route.params.organization
				);
			} else {
				const { data: singleAccountData, error: singleAccountError } =
					await supabase
						.from('Account')
						.select('*,User(count)')
						.eq('id', route.params.organization);

				if (singleAccountError)
					throw new Error(
						`Error fetching single account data: ${singleAccountError.message}`
					);

				accounts.value = singleAccountData;
				selectedAccount.value = singleAccountData[0];
			}

			const {
				category,
				severity,
				error: getTicketTypesError,
			} = getTicketTypes(userData.Account.type, 'active');

			if (getTicketTypesError)
				throw new Error(
					`Error fetching ticket types: ${getTicketTypesError.message}`
				);

			categories.value = category;

			severities.value = severity;

			selectedSeverity.value = severity[0];
			selectedTicket.value = category[0];

			page_loading.value = false;
		} catch (error) {
			is_error.value = true;
			error_message.value = error;
			console.error('Error data:', error);
		}
	}

	await fetchData();

	watch(selectedAccount, (newAccount) => {
		if (newAccount) {
			router.push(`/dashboard/new/${newAccount.id}`);
		}
	});

	const isDisabled = computed(() => {
		return (
			!projectName.value ||
			!projectSummary.value ||
			!selectedSeverity.value ||
			!selectedTicket.value ||
			submit_loading.value
		);
	});

	async function getAccountManager(type) {
		try {
			const badgeId = type === 'engineering' ? 'mg_officer' : 'mg_sales';
			const { data: accountManagerData, error: accountManagerError } =
				await supabase
					.from('Account')
					.select('id, User(id, badges)')
					.eq('id', '49c1e675-9c3b-4517-86e6-436f558c2966')
					.limit(1)
					.single();

			if (accountManagerError)
				throw new Error(
					`Error fetching account manager data: ${accountManagerError.message}`
				);

			const accountManagers = accountManagerData.User.filter((o) => {
				return o.badges.some((badge) => badge.id === badgeId);
			});
			accountManagers.sort((a, b) => a.ticket_count - b.ticket_count);
			return accountManagers[0];
		} catch (error) {
			console.error('Error getting account manager:', error);
			throw error;
		}
	}

	function generateDueDate(selectedOption) {
		const today = new Date();
		return new Date(today.setDate(today.getDate() + selectedOption.sla_days));
	}

	const generateExample = () => {
		projectName.value =
			'[DEMO] Nailey Belson - BambooHR and ADP WFN Integration';
		projectSummary.value =
			"Need help to link BambooHR and ADP WFN for easier payroll. No team to do this, and not planning to buy a Tray license. Want simple link between the two systems. Plan is to finish in a few months, before many new hires in Canada. Finance Director also checking this. No time to use our own team for this project. We're also working on setting a budget for this project.";
	};

	const handleSubmit = async () => {
		try {
			submit_loading.value = true;
			const accountManager = await getAccountManager(selectedTicket.value.type);
			console.log('accountManager:', accountManager);

			const { data: ticketData, error } = await supabase
				.from('Ticket')
				.insert([
					{
						name: projectName.value,
						type: selectedTicket.value.id,
						createdBy: user.value.id,
						dueDate: generateDueDate(selectedSeverity.value),
						accountId: route.params.organization,
						assignedTo: accountManager.id,
						desc: projectSummary.value,
					},
				])
				.select();
			if (error) {
				throw new Error(`Error inserting ticket: ${error.message}`);
			}

			await uploadImages(ticketData[0].id, selectedFiles.value);
			is_success.value = true;
			success_message.value = 'Successfully created project';
			if (selectedAccount.value.User[0].count === 0) {
				navigateTo(`/dashboard/new/${route.params.organization}/invite`);
			} else navigateTo(`/dashboard/project/${ticketData[0].id}`);
			submit_loading.value = false;
		} catch (error) {
			is_error.value = true;
			error_message.value = error;
			console.error('Error submitting ticket:', error);
		}
	};

	async function uploadImages(ticketId, files) {
		try {
			const promises = files.map(async (file) => {
				const extension = file.name.match(/[^\&?]+\.(jpg|jpeg|gif|png|webp)$/i);
				const fileName = `${ticketId}.${extension[1]}`;
				const filePath = `attachments/${fileName}`;
				const { error: uploadError } = await supabase.storage
					.from('images')
					.upload(filePath, file, { upsert: true });

				if (uploadError)
					throw new Error(`Error uploading image: ${uploadError.message}`);
			});

			const results = await Promise.all(promises);
			results.forEach(({ error }) => {
				if (error) {
					throw new Error(`Error processing image uploads: ${error.message}`);
				}
			});
		} catch (error) {
			console.error('Error uploading images:', error);
			throw error;
		}
	}

	function resetFields() {
		projectName.value = '';
		projectSummary.value = '';
		selectedTicket.value = categories.value[0];
		selectedSeverity.value = severities.value[0];
		selectedFiles.value = [];
	}
</script>

<template>
	<div class="">
		<section class="has-slide-in slide-in relative mx-auto my-10 max-w-2xl">
			<div
				v-if="page_loading"
				class="absolute inset-0 z-[200] flex h-full w-full items-center justify-center bg-white/70 text-indigo-600"
			>
				<svg
					class="h-7 w-7 animate-spin"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 4.75V6.25"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M17.1266 6.87347L16.0659 7.93413"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M19.25 12L17.75 12"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M17.1266 17.1265L16.0659 16.0659"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M12 17.75V19.25"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M7.9342 16.0659L6.87354 17.1265"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M6.25 12L4.75 12"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M7.9342 7.93413L6.87354 6.87347"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</svg>
			</div>
			<div class="">
				<div class="transition-opacity duration-300">
					<div
						class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 rounded-md border bg-white/60 shadow-sm"
					>
						<div class="bg-panel-body-light dark:bg-panel-body-dark">
							<div class="flex items-center px-6 py-4">
								<div><h3>Create a new project</h3></div>
							</div>
						</div>
						<div class="bg-panel-body-light dark:bg-panel-body-dark">
							<div class="px-6 py-4 pb-6 pt-0">
								<p class="text-sm text-slate-500">
									Your project will have its own dedicated account manager.<br />An
									AI will initially respond so you can easily convey information with
									support.<br />
								</p>
							</div>
							<div
								class="border-panel-border-interior-light dark:border-panel-border-interior-dark space-y-4 border-b border-t px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Organization</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<Listbox
												v-model="selectedAccount"
												as="div"
												v-slot="{ open }"
											>
												<div class="relative">
													<ListboxButton
														:class="[
															open
																? 'border-slate-500 shadow-md ring-2 ring-slate-300'
																: '',
															'box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-800 shadow-sm outline-none transition-all ',
														]"
													>
														<span
															class="flex w-full flex-row items-center space-x-3"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="21"
																height="21"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
																></path>
																<circle cx="9" cy="7" r="4"></circle>
																<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
																<path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg
															><span class="truncate">{{
																selectedAccount.name
															}}</span
															><span
																class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
																><svg
																	class="text-scale-600 h-5 w-5"
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																	aria-hidden="true"
																>
																	<path
																		fill-rule="evenodd"
																		d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
																		clip-rule="evenodd"
																	></path></svg></span
														></span>
													</ListboxButton>
													<transition
														leave-active-class="transition ease-in duration-100"
														leave-from-class="opacity-100"
														leave-to-class="opacity-0"
														><ListboxOptions
															class="dark:bg-scale-300 absolute z-[200] mt-1 max-h-60 w-full overflow-hidden overflow-y-scroll rounded-md border border-solid border-gray-100 bg-white py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
														>
															<ListboxOption
																v-for="account in accounts"
																:key="account.id"
																:value="account"
																v-slot="{ selected, active }"
																><div
																	:class="[
																		selected ? 'bg-slate-100' : '',
																		'w-listbox text-scale-900 hover:bg-scale-300 dark:hover:bg-scale-500 focus:bg-scale-300 dark:focus:bg-scale-500 focus:text-scale-1200 text-scale-1200 bg-scale-600 relative cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none',
																	]"
																>
																	<div class="flex items-center space-x-3">
																		<span>{{ account.name }}</span>
																	</div>
																	<span
																		class="text-brand-900 text-brand-900 absolute inset-y-0 right-0 flex items-center pr-3"
																		><svg
																			v-if="selected"
																			xmlns="http://www.w3.org/2000/svg"
																			width="21"
																			height="21"
																			viewBox="0 0 24 24"
																			fill="none"
																			stroke="currentColor"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			class="h-5 w-5 text-lime-500"
																			aria-hidden="true"
																		>
																			<polyline
																				points="20 6 9 17 4 12"
																			></polyline></svg
																	></span>
																</div>
															</ListboxOption> </ListboxOptions
													></transition>
												</div>
											</Listbox>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
									</div>
								</div>
							</div>
							<div
								class="border-panel-border-interior-light dark:border-panel-border-interior-dark border-b border-t px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label
											class="text-scale-1100 block text-sm"
											for="project-name"
											>Name</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<div class="relative">
												<input
													id="project-name"
													v-model="projectName"
													placeholder="Project name"
													type="text"
													class="box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-300 shadow-sm outline-none transition-all focus:border-slate-500 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-slate-300"
												/>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
									</div>
								</div>
							</div>
							<div
								class="border-panel-border-interior-light dark:border-panel-border-interior-dark border-b px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for="password"
											>Summary</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<div class="relative">
												<textarea
													required
													v-model="projectSummary"
													id="message"
													rows="4"
													max="5000"
													placeholder="Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible."
													class="box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-300 shadow-sm outline-none transition-all focus:border-slate-500 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-slate-300"
												/>
											</div>
										</div>
										<p
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>

										<p
											@click="generateExample"
											class="mt-2 text-sm leading-normal text-slate-500"
											id="password-description"
										>
											Please briefly describe your issue or case here. Include
											key details for better assistance.
											<span
												class="hover:text-brand-900 cursor-pointer text-indigo-500 underline transition"
												>Generate an example</span
											>
										</p>
									</div>
								</div>
							</div>
							<div
								class="border-panel-border-interior-light dark:border-panel-border-interior-dark border-b px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Type</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<Listbox
												v-model="selectedTicket"
												as="div"
												v-slot="{ open }"
												class="relative w-auto"
											>
												<ListboxButton
													:class="[
														open
															? 'border-slate-500 shadow-md ring-2 ring-slate-300'
															: '',
														'box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-800 shadow-sm outline-none transition-all ',
													]"
												>
													<span
														class="flex w-full flex-row items-center space-x-3"
														><span class="truncate">{{
															selectedTicket.title
														}}</span
														><span
															class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
															><svg
																class="text-scale-600 h-5 w-5"
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 20 20"
																fill="currentColor"
																aria-hidden="true"
															>
																<path
																	fill-rule="evenodd"
																	d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
																	clip-rule="evenodd"
																></path></svg></span
													></span>
												</ListboxButton>
												<transition
													leave-active-class="transition ease-in duration-100"
													leave-from-class="opacity-100"
													leave-to-class="opacity-0"
													><ListboxOptions
														class="dark:bg-scale-300 absolute z-[500] mt-1 max-h-60 w-full overflow-auto overflow-y-scroll rounded-md border border-solid border-gray-100 bg-white py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
													>
														<ListboxOption
															v-for="category in categories"
															:key="category.id"
															:value="category"
															v-slot="{ selected, active }"
															><div
																:class="[
																	selected ? 'bg-slate-100' : '',
																	'w-listbox text-scale-900 hover:bg-scale-300 dark:hover:bg-scale-500 focus:bg-scale-300 dark:focus:bg-scale-500 focus:text-scale-1200 text-scale-1200 bg-scale-600 relative cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none',
																]"
															>
																<div class="flex flex-col items-start">
																	<span>{{ category.title }}</span>
																	<span class="text-xs text-slate-400">{{
																		category.desc
																	}}</span>
																</div>
																<span
																	class="text-brand-900 text-brand-900 absolute inset-y-0 right-0 flex items-center pr-3"
																	><svg
																		v-if="selected"
																		xmlns="http://www.w3.org/2000/svg"
																		width="21"
																		height="21"
																		viewBox="0 0 24 24"
																		fill="none"
																		stroke="currentColor"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		class="h-5 w-5 text-lime-500"
																		aria-hidden="true"
																	>
																		<polyline
																			points="20 6 9 17 4 12"
																		></polyline></svg
																></span>
															</div>
														</ListboxOption> </ListboxOptions
												></transition>
											</Listbox>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
										<p
											class="mt-2 text-sm leading-normal text-slate-500"
											id="-description"
										>
											Select the category that best describes your project.
										</p>
									</div>
								</div>
							</div>
							<div class="px-6 py-4">
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Severity</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<Listbox
												v-model="selectedSeverity"
												as="div"
												class="relative"
												v-slot="{ open }"
											>
												<div class="relative">
													<ListboxButton
														:class="[
															open
																? 'border-slate-500 shadow-md ring-2 ring-slate-300'
																: '',
															'box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-800 shadow-sm outline-none transition-all ',
														]"
													>
														<span
															class="flex w-full flex-row items-center space-x-3"
															><span class="truncate">{{
																selectedSeverity.title
															}}</span
															><span
																class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
																><svg
																	class="text-scale-600 h-5 w-5"
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																	aria-hidden="true"
																>
																	<path
																		fill-rule="evenodd"
																		d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
																		clip-rule="evenodd"
																	></path></svg></span
														></span>
													</ListboxButton>
													<transition
														leave-active-class="transition ease-in duration-100"
														leave-from-class="opacity-100"
														leave-to-class="opacity-0"
														><ListboxOptions
															class="dark:bg-scale-300 absolute z-[500] mt-1 max-h-60 w-full overflow-hidden overflow-y-scroll rounded-md border border-solid border-gray-100 bg-white py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
														>
															<ListboxOption
																v-for="severity in severities"
																:key="severity.id"
																:value="severity"
																v-slot="{ selected, active }"
																><div
																	:class="[
																		selected ? 'bg-slate-100' : '',
																		'w-listbox text-scale-900 hover:bg-scale-300 dark:hover:bg-scale-500 focus:bg-scale-300 dark:focus:bg-scale-500 focus:text-scale-1200 text-scale-1200 bg-scale-600 relative cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none',
																	]"
																>
																	<div class="flex flex-col items-start">
																		<span>{{ severity.title }}</span>
																		<span class="text-xs text-slate-400">{{
																			severity.desc
																		}}</span>
																	</div>
																	<span
																		class="text-brand-900 text-brand-900 absolute inset-y-0 right-0 flex items-center pr-3"
																		><svg
																			v-if="selected"
																			xmlns="http://www.w3.org/2000/svg"
																			width="21"
																			height="21"
																			viewBox="0 0 24 24"
																			fill="none"
																			stroke="currentColor"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			class="h-5 w-5 text-lime-500"
																			aria-hidden="true"
																		>
																			<polyline
																				points="20 6 9 17 4 12"
																			></polyline></svg
																	></span>
																</div>
															</ListboxOption> </ListboxOptions
													></transition>
												</div>
											</Listbox>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
										<p
											class="mt-2 text-sm leading-normal text-slate-500"
											id="-description"
										>
											<!-- Select the urgency of this project.&nbsp;<a
												class="underline"
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/pricing"
												>More details</a
											> -->
										</p>
									</div>
								</div>
							</div>
						</div>
						<div
							class="border-panel-border-interior-light bg-panel-footer-light dark:border-panel-border-interior-dark dark:bg-panel-footer-dark border-t"
						>
							<div class="flex h-12 items-center px-6">
								<div class="flex w-full items-center justify-between">
									<NuxtLink
										:to="'/dashboard/projects'"
										class="font-regular bordershadow-scale-600 hover:bg-scale-300 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-white px-2.5 py-1 text-center text-xs text-slate-900 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-slate-50 focus-visible:outline-4 focus-visible:outline-offset-1"
										type="button"
									>
										<span class="truncate">Cancel</span>
									</NuxtLink>
									<div class="items-center space-x-3">
										<span class="text-xs text-slate-500"
											>You can rename your project later</span
										><button
											@click="handleSubmit()"
											class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
											:disabled="isDisabled"
										>
											<span class="truncate">Create new project</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<SuccessModal
				v-if="is_success"
				@close="is_success = false"
				:title="success_message"
				:description="''"
			/>
		</transition>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<ErrorModal
				v-if="is_error"
				@close="is_error = false"
				:title="'Error: '"
				:description="error_message"
			/>
		</transition>
	</div>
</template>

<style scoped>
	.bordershadow-scale-600 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #dfe3e6 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-1000 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #7375ed 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>
