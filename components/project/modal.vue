<script setup>
	import { ref } from 'vue';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	} from '@headlessui/vue';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();
	const router = useRouter();
	const account = ref({ name: '' });
	const selectedAccount = ref({ name: '' });

	const fileInput = ref(null);

	const emits = defineEmits(['close']);

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

	const selectedPDFFile = ref(null);

	const onPDFFileChange = (e) => {
		selectedPDFFile.value = e.target.files[0];
		fileInput.value.value = '';
	};

	const projectName = ref('');
	const projectSummary = ref('');

	async function fetchData() {
		try {
			const { data: organizationData, error: organizationError } =
				await supabase
					.from('clients')
					.select('*')
					.eq('id', route.params.client_id)
					.limit(1)
					.single();

			if (organizationError)
				throw new Error(
					`Error fetching account data: ${organizationError.message}`
				);

			account.value = organizationData;

			const {
				category,
				severity,
				error: getTicketTypesError,
			} = getTicketTypes('default', 'active');

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
			router.push(`/new/${newAccount.id}`);
		}
	});

	const isDisabled = computed(() => {
		return (
			!projectName.value ||
			(selectedPDFFile.value ? false : !projectSummary.value) ||
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
					.from('organizations')
					.select('id, users(id, badges)')
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
		const projects = [
			{
				title: 'Salesforce-HubSpot Integration',
				description:
					"Looking for guidance to integrate Salesforce with HubSpot for streamlined customer relationship management. No dedicated team available for this task, and there are no plans to purchase a Zapier subscription. Desire a straightforward connection between both platforms. The goal is to complete within the next quarter, ahead of the forthcoming sales drive in Europe. The Sales Operations Manager will also be overseeing the process. Unfortunately, our in-house resources are tied up with other commitments, hence we can't spare them for this undertaking. We have set a budget of $18,000 for this project.",
			},
			{
				title: 'QuickBooks-Shopify Synchronization',
				description:
					"Require assistance to synchronize QuickBooks and Shopify for enhanced inventory control. Don't have a designated team for the task, and buying a Unify subscription isn't in the plan. Aiming for an easy integration of the two services. The objective is to get everything in place before the upcoming product launch in Australia. Our Operations Manager will also keep an eye on this. Due to other priorities, our team is unable to take up this project. A budget of $15,000 has been allocated for this endeavor.",
			},
			{
				title: 'Jira-Confluence Connection',
				description:
					"Need support to connect Jira and Confluence for improved project management. There's no internal team to tackle this, and we aren't looking to invest in a Trello license. We prefer a direct link between these two platforms. The aim is to accomplish this before the start of the new project in Asia. Our Project Manager will also monitor the progress. Our team is preoccupied with other tasks, so they can't be assigned to this project. A budget of $20,000 has been set aside for this operation.",
			},
			{
				title: 'Slack-Google Workspace Integration',
				description:
					"Seeking help to integrate Slack with Google Workspace for better team collaboration. We don't have a team to spare for this, and no plans to acquire a Workato license. We want a clear-cut integration of the two systems. The completion deadline is set for the coming semester, before our recruitment drive in the United States. The IT Director will be involved in this project as well. Our team's schedule doesn't allow them to take on this integration project. A budget of $16,000 has been planned for this project.",
			},
			{
				title: 'Microsoft Teams-Asana Unification',
				description:
					"Assistance needed to marry Microsoft Teams with Asana for efficient task management. We don't have a team for this and we're not considering a Microsoft Power Automate license. A smooth link between the two systems is what we're looking for. The goal is to have everything set up before the next fiscal year, ahead of the new branch opening in the Middle East. Our Department Head will also review this. Current team obligations prevent us from using in-house resources for this initiative. We've outlined a budget of $22,000 for this project.",
			},
			{
				title: 'BambooHR and ADP WFN Integration',
				description:
					"Need help to link BambooHR and ADP WFN for easier payroll. No team to do this, and not planning to buy a Tray license. Want simple link between the two systems. Plan is to finish in a few months, before many new hires in Canada. Finance Director also checking this. No time to use our own team for this project. We're also working on setting a budget for this project.",
			},
			{
				title: 'Dropbox-Box Integration',
				description:
					"Seeking advice to synchronize Dropbox and Box for easier file sharing and storage management. No team in place for this, and not intending to get a MuleSoft license. Want a clear-cut link between these two systems. The plan is to wrap up within a couple of months, before we onboard new teams in South America. The Chief Technology Officer will be overlooking this. With our team engaged in other key projects, we don't have bandwidth for this currently. We have allocated a budget of $15,000 for this project.",
			},
			{
				title: 'Zendesk-Freshdesk Connection',
				description:
					"Need assistance to integrate Zendesk and Freshdesk for better customer service management. We lack a dedicated team for this and are not considering an Integrately subscription. Hoping for a straightforward bridge between both platforms. Aiming to finish before the start of the new service campaign in Africa. The Customer Service Manager will be supervising the project. Our team is tied up with other tasks and can't be delegated for this project. The budget for this project has been set at $10,000.",
			},
			{
				title: 'Airtable-Trello Link',
				description:
					"Help required to connect Airtable and Trello for improved task tracking. No team assigned to this task, and we're not planning to buy an Automate.io license. Desire a direct connection between these two platforms. The objective is to complete this ahead of the new workflow implementation in Asia. The Product Manager will also keep an eye on this. Our team is preoccupied with other tasks, hence they can't be spared for this project. The budget set aside for this operation is $20,000.",
			},
			{
				title: 'GitHub-GitLab Synchronization',
				description:
					"Looking for support to integrate GitHub and GitLab for effective version control. Don't have a team available for the task, and there's no plan to purchase a Jenkins license. Want a smooth integration of the two platforms. The plan is to have everything ready before the next coding sprint in Europe. Our Development Manager will also be monitoring this. Our team's schedule doesn't permit them to take on this integration project. The budget allocated for this project is $25,000.",
			},
			{
				title: 'MailChimp-Constant Contact Integration',
				description:
					"Assistance needed to link MailChimp and Constant Contact for optimized email marketing. We lack a team for this and are not considering a Piesync license. A straightforward link between both systems is the target. The goal is to wrap up before the start of the new marketing campaign in the US. The Marketing Head will also review this. With current team commitments, we can't delegate our in-house resources for this project. A budget of $30,000 has been defined for this initiative.",
			},
		];

		const random = projects[Math.floor(Math.random() * projects.length)];

		projectName.value = random.title;
		projectSummary.value = random.description;
	};

	const PDFUpload = async () => {
		try {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(selectedPDFFile.value);
				reader.onloadend = async function () {
					try {
						const base64data = reader.result;
						const url =
							'https://ed7965f7-7202-48f5-be9e-6a3af2e398f1.trayapp.io';
						const options = {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								file: base64data,
							}),
						};
						const response = await $fetch(url, options);
						if (!response.ok) {
							throw new Error(`Error uploading file: ${response.statusText}`);
						}
						resolve(response);
					} catch (error) {
						reject(error);
					}
				};
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async () => {
		try {
			submit_loading.value = true;

			// const accountManager = await getAccountManager(selectedTicket.value.type);

			// Create Stripe invoice with the project data

			// Create SOW with the project data

			let description = null;

			if (selectedPDFFile.value) {
				description = await PDFUpload();
			}

			const { data: projectData, error } = await supabase
				.from('projects')
				.insert([
					{
						name: projectName.value,
						type: selectedTicket.value.id,
						created_by: user.value.id,
						// due_date: generateDueDate('normal'),
						client_id: route.params.client_id,
						// assigned_id: null,
						description: description ?? projectSummary.value,
						stripe_invoice_id: null,
						sow_id: null,
					},
				])
				.select();

			if (error) {
				throw new Error(`Error inserting ticket: ${error.message}`);
			}

			is_success.value = true;
			success_message.value = 'Successfully created project';

			router.push(
				`/clients/${route.params.client_id}/projects/${projectData[0].id}`
			);

			submit_loading.value = false;
		} catch (error) {
			is_error.value = true;
			error_message.value = error;
			submit_loading.value = false;
			console.error('Error submitting ticket:', error);
		}
	};

	function resetFields() {
		projectName.value = '';
		projectSummary.value = '';
		selectedTicket.value = categories.value[0];
		selectedSeverity.value = severities.value[0];
		selectedFiles.value = [];
	}
</script>

<template>
	<div>
		<div
			@click="emits('close')"
			data-state="open"
			class="bg-scale-300 dark:bg-scale-100 data-closed:animate-fade-out-overlay-bg data-open:animate-fade-in-overlay-bg fixed left-0 top-0 z-40 h-full w-full opacity-75"
			style="pointer-events: auto"
			data-aria-hidden="true"
			aria-hidden="true"
		></div>

		<div
			style="z-index: 100"
			class="bg-scale-100 dark:bg-scale-300 border-overlay-border data-open:animate-panel-slide-right-out data-closed:animate-panel-slide-right-in fixed inset-y-0 right-0 z-40 flex h-screen w-screen max-w-2xl flex-col border-l shadow-xl transition-all duration-100 ease-in"
		>
			<LoadingModal v-if="submit_loading" />
			<header
				class="bg-overlay-bg border-overlay-border space-y-1 border-b px-4 py-4 sm:px-6"
			>
				Create a new project under
				<code class="text-sm">{{ account.name }}</code>
			</header>
			<div class="relative flex-1 overflow-y-auto">
				<div class="px-4 sm:px-6">
					<div class="space-y-10 py-6">
						<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
							<div class="col-span-4 flex flex-col space-y-2">
								<label class="text-scale-1100 block text-sm" for="">Name</label>
							</div>
							<div class="col-span-8">
								<div class="">
									<div class="relative">
										<input
											id=""
											name=""
											type="text"
											placeholder="Summary of the project"
											:class="[
												!projectName
													? ' text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 box-border block w-full rounded-md border border border-red-700 bg-red-100 px-4 py-2 text-sm   shadow-sm outline-none transition-all placeholder:text-red-600 focus:shadow-md  focus:ring-2 focus:ring-current focus:ring-red-500'
													: 'text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current',
											]"
											v-model="projectName"
										/>
										<div
											v-if="!projectName"
											class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
										>
											<div
												class="pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2 text-red-900"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon"
												>
													<circle cx="12" cy="12" r="10"></circle>
													<line x1="12" y1="8" x2="12" y2="12"></line>
													<line x1="12" y1="16" x2="12.01" y2="16"></line>
												</svg>
											</div>
										</div>
									</div>
									<transition
										enter-active-class="transition ease-out duration-100"
										enter-from-class="transform opacity-0 mt-2"
										enter-to-class="transform opacity-100 "
										leave-active-class="transition ease-in duration-75"
										leave-from-class="transform opacity-100"
										leave-to-class="transform opacity-0 -mt-4"
									>
										<p
											v-if="!projectName"
											class="animate-slide-down-normal data-hide:animate-slide-up-normal mt-2 text-sm text-red-900 transition-all"
										>
											Please add a subject heading
										</p>
									</transition>
								</div>
							</div>
						</div>
						<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
							<div class="col-span-4 flex flex-col space-y-2">
								<label class="text-scale-1100 block text-sm" for="">Type</label>
							</div>
							<div class="col-span-8">
								<Listbox class="relative" as="div" v-model="selectedTicket">
									<ListboxButton
										:class="[
											selectedTicket.disabled
												? 'border-red-700 bg-red-100 placeholder:text-red-600 focus:ring-red-500'
												: 'text-scale-1200  focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2   indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md  focus:ring-2 focus:ring-current aria-expanded:ring-2',
											'text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 relative box-border block w-full rounded-md border  bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current ',
										]"
									>
										<span class="flex w-full flex-row items-center space-x-3"
											><span class="truncate">{{
												selectedTicket.title
											}}</span></span
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
												></path></svg
										></span>
										<div
											v-if="selectedTicket.disabled"
											class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
										>
											<div
												class="pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2 text-red-900"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon"
												>
													<circle cx="12" cy="12" r="10"></circle>
													<line x1="12" y1="8" x2="12" y2="12"></line>
													<line x1="12" y1="16" x2="12.01" y2="16"></line>
												</svg>
											</div>
										</div>
									</ListboxButton>
									<ListboxOptions
										class="bg-scale-100 dark:bg-scale-300 origin-dropdown data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide absolute z-10 max-h-60 w-full overflow-hidden overflow-y-scroll rounded-md border border-solid border-gray-100 py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
									>
										<div>
											<ListboxOption
												v-slot="{ active, selected }"
												v-for="category in categories"
												:key="category.id"
												:disabled="category.disabled"
												:value="category"
												as="template"
												><div
													:class="[
														selected
															? 'bg-scale-600 dark:bg-scale-500 text-scale-1200 '
															: '',
														active
															? 'bg-scale-300 text-scale-1200'
															: 'text-scale-900',
														'relative w-full cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none',
													]"
												>
													<div class="flex flex-col items-start">
														<span>{{ category.title }}</span>
														<span class="text-xs">{{ category.desc }}</span>
													</div>
													<span
														class="text-brand-900 text-brand-900 absolute inset-y-0 right-0 flex items-center pr-3"
														><svg
															v-if="selected"
															xmlns="http://www.w3.org/2000/svg"
															width="18"
															height="18"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon h-5 w-5"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline></svg
													></span></div
											></ListboxOption>
										</div>
									</ListboxOptions>
								</Listbox>
								<p
									v-if="selectedTicket.disabled"
									class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
								>
									Please select the type of project that you're facing issues
									with
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
				<div class="px-4 sm:px-6">
					<div class="space-y-10 py-6">
						<div class="flex cursor-pointer leading-none">
							<input
								id="enable-rls"
								name="enable-rls"
								type="checkbox"
								class="focus:ring-scale-400 text-brand-900 border-scale-700 mr-3.5 mt-0.5 h-4 w-4 cursor-pointer rounded bg-transparent shadow-sm outline-none focus:ring-2 focus:ring-current"
								value="enable-rls"
								checked=""
							/><label
								class="text-scale-1100 cursor-pointer text-sm"
								for="enable-rls"
								><span
									><div class="flex items-center space-x-2">
										<span>Enable Row Level Security (RLS)</span
										><span
											class="text-gray-1100 inline-flex items-center rounded-full border border-gray-700 bg-gray-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
											>Recommended</span
										>
									</div></span
								>
								<p class="text-scale-1000 text-sm">
									Restrict access to your table by enabling RLS and writing
									Postgres policies.
								</p></label
							>
						</div>
						<div
							class="bg-scale-400 border-scale-500 dark:bg-scale-100 dark:border-scale-300 relative mt-3 flex items-start space-x-4 rounded-md border !px-4 !py-3 px-6 py-4"
						>
							<div class="text-scale-900">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="12" y1="16" x2="12" y2="12"></line>
									<line x1="12" y1="8" x2="12.01" y2="8"></line>
								</svg>
							</div>
							<div class="flex flex-1 items-center justify-between">
								<div>
									<h3 class="text-scale-1200 mb-1 block text-sm font-normal">
										Policies are required to query data
									</h3>
									<div class="text-scale-1100 text-xs">
										<p>
											You need to write an access policy before you can query
											data from this table. Without a policy, querying this
											table will result in an <u>empty array</u> of results.
										</p>
										<p class="mt-3">
											You can create policies after you create this table.
										</p>
										<p class="mt-4">
											<a
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/docs/guides/auth/row-level-security"
												><button
													class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													type="button"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<path
															d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
														></path>
														<path
															d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
														></path></svg
													><span class="truncate">RLS Documentation</span>
												</button></a
											>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="flex cursor-pointer leading-none">
							<input
								id="enable-realtime"
								name="enable-realtime"
								type="checkbox"
								class="focus:ring-scale-400 text-brand-900 border-scale-700 mr-3.5 mt-0.5 h-4 w-4 cursor-pointer rounded bg-transparent shadow-sm outline-none focus:ring-2 focus:ring-current"
								value="enable-realtime"
							/><label
								class="text-scale-1100 cursor-pointer text-sm"
								for="enable-realtime"
								><span>Enable Realtime</span>
								<p class="text-scale-1000 text-sm">
									Broadcast updates on this project to authorized subscribers
								</p></label
							>
						</div>
					</div>
				</div>
				<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
				<div class="px-4 sm:px-6">
					<div class="space-y-10 py-6">
						<div class="table-editor-columns w-full space-y-4">
							<div class="flex w-full items-center justify-between">
								<h5>Use case description</h5>

								<div class="flex items-center space-x-2">
									<button
										@click="(fileInput = ''), (selectedPDFFile = null)"
										v-if="selectedPDFFile"
									>
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24">
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
												d="M17.25 6.75L6.75 17.25"
											></path>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
												d="M6.75 6.75L17.25 17.25"
											></path>
										</svg>
									</button>

									<button
										class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										type="button"
									>
										<input
											type="file"
											@change="onPDFFileChange"
											:ref="fileInput"
											accept="application/pdf"
											class="absolute w-full cursor-pointer opacity-0"
										/>
										<span class="truncate">Import data via PDF</span>
									</button>
								</div>
							</div>
							<div
								class="text-area-text-sm grid gap-2 space-y-2 md:grid md:grid-cols-12"
							>
								<div class="col-span-12">
									<div class="">
										<div class="relative">
											<textarea
												v-if="!selectedPDFFile"
												id="message"
												name=""
												rows="4"
												cols="100"
												placeholder="Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible."
												:class="[
													projectSummary
														? ' text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border shadow-sm outline-none transition-all   focus:shadow-md focus:ring-2 focus:ring-current '
														: 'text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 box-border block w-full rounded-md border border-red-700 bg-red-100 pr-4 shadow-sm outline-none transition-all placeholder:text-red-600 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-red-500',
												]"
												maxlength="5000"
												v-model="projectSummary"
											></textarea>
											<div
												v-if="selectedPDFFile"
												class="text-scale-1200 text-scale-900 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border flex w-full items-center space-x-3 rounded-md border p-4 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="mr-2 h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="m17.25 9.25-4.5-4.5m4.5 4.5h-3.5a1 1 0 0 1-1-1v-3.5m4.5 4.5v1m-4.5-5.5h-6a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h3.5m3.5-4.4 2.75-1.1 2.75 1.1s0 4.4-2.75 4.4-2.75-4.4-2.75-4.4Z"
													></path>
												</svg>

												{{ selectedPDFFile.name }}
											</div>
											<div
												v-if="!projectSummary && !selectedPDFFile"
												class="absolute inset-y-1.5 right-0 flex items-start space-x-1 pl-3 pr-1"
											>
												<div class="flex items-center">
													<div
														class="pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2 text-red-900"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="18"
															height="18"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon"
														>
															<circle cx="12" cy="12" r="10"></circle>
															<line x1="12" y1="8" x2="12" y2="12"></line>
															<line x1="12" y1="16" x2="12.01" y2="16"></line>
														</svg>
													</div>
												</div>
											</div>
										</div>
									</div>
									<p
										v-if="!projectSummary && !selectedPDFFile"
										data-state="show"
										class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
									>
										Please add a message about the issue that you're facing
									</p>
								</div>
							</div>
							<div class="flex items-center justify-between">
								<button
									@click="generateExample"
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<span class="truncate">Generate example</span></button
								><a
									target="_blank"
									rel="noreferrer"
									href="https://supabase.com/docs/guides/database/tables#data-types"
									><button
										class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 text-scale-1000 hover:text-scale-1200 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										type="button"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="12"
											height="12"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
											></path>
											<polyline points="15 3 21 3 21 9"></polyline>
											<line x1="10" y1="14" x2="21" y2="3"></line></svg
										><span class="truncate">Learn more about use cases</span>
									</button></a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				class="border-scale-500 flex w-full justify-end space-x-3 border-t px-3 py-4"
			>
				<button
					@click="emits('close')"
					class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-3 py-2 text-center text-sm leading-4 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
					type="button"
				>
					<span class="truncate">Cancel</span></button
				><button
					@click="handleSubmit"
					class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-3 py-2 text-center text-sm leading-4 text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
					type="button"
				>
					<span class="truncate">Save</span>
				</button>
			</div>
		</div>
	</div>
</template>
