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
	const selectedAccount = ref({});

	const submit_loading = ref(false);
	const page_loading = ref(true);

	const is_success = ref(false);
	const success_message = ref('');
	const is_error = ref(false);
	const error_message = ref('');

	const inviteeEmail = ref('');
	const formSubmitted = ref(false);

	const roles = ref([]);
	const selectedRole = ref({});

	const severities = ref([]);
	const categories = ref([]);
	const selectedSeverity = ref({ title: null });
	const selectedTicket = ref({ title: null });
	const selectedFiles = ref([]);

	const projectName = ref('');
	const projectSummary = ref('');

	const { data: accountData, error: accountError } = await supabase
		.from('Account')
		.select('*,User(count)')
		.eq('id', route.params.organization)
		.limit(1)
		.single();

	if (accountError)
		throw new Error(`Error fetching account data: ${accountError.message}`);

	if (accountData.User[0].count > 0) {
		navigateTo(`/dashboard/projects`);
	}

	async function fetchAccountData() {
		try {
			const { data: accountData, error: accountError } = await supabase
				.from('Account')
				.select('*,User(count)')
				.eq('id', route.params.organization)
				.limit(1)
				.single();

			if (accountError)
				throw new Error(`Error fetching account data: ${accountError.message}`);

			if (accountData.User[0].count > 0) {
				router.push(`/dashboard/projects`);
				return;
			}

			const { role, error: getTicketTypesError } = await getTicketTypes(
				null,
				'active'
			);

			if (getTicketTypesError) {
				throw new Error(
					`Error fetching ticket type data: ${getTicketTypesError.message}`
				);
			}

			roles.value = role;
			selectedRole.value = role[0];
			page_loading.value = false;
		} catch (error) {
			is_error.value = true;
			error_message.value = error;
		}
	}

	await fetchAccountData();

	const invalid_email = computed(() => {
		// Only validate if the form has been submitted
		if (formSubmitted.value) {
			// Check if email is empty
			if (!inviteeEmail.value) {
				return 'Email is required';
			}

			// Simple regex for email validation
			let re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!re.test(inviteeEmail.value.toLowerCase())) {
				return 'Invalid email';
			}
		}

		return false;
	});

	const sendInvitation = async () => {
		try {
			submit_loading.value = true;
			formSubmitted.value = true;

			if (!inviteeEmail.value) {
				throw new Error('No email included');
			}
			// Try to insert the invitation
			const { data: userData, error: userError } = await supabase
				.from('User')
				.select('email')
				.eq('email', inviteeEmail.value);

			if (userData.length > 0) {
				inviteeEmail.value = '';
				throw new Error('User already exists in this organization');
			}

			const { data: invitation, error: invitationError } = await supabase
				.from('Invitation')
				.insert([
					{
						email: inviteeEmail.value,
						systemRole: selectedRole.value.id,
						createdBy: user.value.id,
						expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
						account: route.params.organization,
					},
				])
				.select('*');
			// If there was an error inserting the invitation, log the error and alert the user
			if (invitationError) {
				inviteeEmail.value = '';
				throw new Error(invitationError.message || invitationError.toString());
			} else {
				// Update the local invitations data as well
				is_error.value = false;
				success_message.value = 'Invitation sent successfully';
				is_success.value = true;
			}
			navigateTo('/dashboard/projects');
		} catch (error) {
			// Catch any unexpected errors and log them
			is_success.value = false;
			is_error.value = true;
			error_message.value = error.message || error.toString();
			submit_loading.value = false;
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
								<div><h3>Invite a member to this organization</h3></div>
							</div>
						</div>
						<div>
							<div class="px-5">
								<div class="w-full py-4">
									<div class="space-y-4">
										<div class="space-y-2">
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div
													class="col-span-12 flex flex-row justify-between space-x-2"
												>
													<label
														class="text-scale-1100 block text-sm"
														for="role"
														>Member role</label
													>
												</div>
												<div class="col-span-12">
													<div class="">
														<Listbox
															v-model="selectedRole"
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
																		selectedRole.name
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
																		v-for="role in roles"
																		:key="role.id"
																		:value="role"
																		v-slot="{ selected, active }"
																		><div
																			:class="[
																				selected ? 'bg-slate-200' : '',
																				active ? 'bg-slate-50' : '',
																				'w-listbox text-scale-900 hover:bg-scale-300 dark:hover:bg-scale-500 focus:bg-scale-300 dark:focus:bg-scale-500 focus:text-scale-1200 text-scale-1200 bg-scale-600 relative cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none',
																			]"
																		>
																			<div class="flex items-center space-x-3">
																				<span>{{ role.name }}</span>
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
												</div>
											</div>
										</div>
										<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
											<div
												class="col-span-12 flex flex-row justify-between space-x-2"
											>
												<label class="text-scale-1100 block text-sm" for="email"
													>Email address</label
												>
											</div>
											<div class="col-span-12">
												<div class="">
													<div class="relative">
														<input
															id="email"
															name=""
															placeholder="Enter email address"
															type="email"
															:class="[
																invalid_email
																	? 'border-rose-400 bg-rose-50 placeholder:text-rose-400'
																	: 'bg-slate-100',
																'peer box-border block w-full rounded-md border border-slate-300  px-4 py-2 pl-10 text-sm placeholder-slate-300 shadow-sm outline-none transition-all  focus:border-slate-500 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-slate-300',
															]"
															v-model="inviteeEmail"
														/>
														<div
															class="text-scale-1100 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
														>
															<svg
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
																	d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
																></path>
																<polyline points="22,6 12,13 2,6"></polyline>
															</svg>
														</div>
														<div
															class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
														>
															<div
																v-if="invalid_email"
																class="pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2 text-rose-600"
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
																	<line
																		x1="12"
																		y1="16"
																		x2="12.01"
																		y2="16"
																	></line>
																</svg>
															</div>
														</div>
													</div>
												</div>
												<p
													v-if="invalid_email"
													:class="[
														invalid_email ? 'mt-2' : '',
														'text-sm text-rose-600 transition-all',
													]"
												>
													{{ invalid_email }}
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"
							></div>
							<div class="px-5">
								<div class="pb-3 pt-2">
									<button
										:disabled="invalid_email || submit_loading"
										@click="sendInvitation()"
										class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded bg-indigo-500 px-4 py-2 text-center text-sm text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 disabled:opacity-50 disabled:opacity-60"
										type="submit"
									>
										<svg
											v-if="submit_loading"
											class="h-5 w-5 animate-spin"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
												d="M12 4.75v1.5m5.126.624L16 8m3.25 4h-1.5m-.624 5.126-1.768-1.768M12 16.75v2.5m-3.36-3.891-1.768 1.768M7.25 12h-2.5m3.891-3.358L6.874 6.874"
											></path>
										</svg>

										<span class="truncate">Invite new member</span>
									</button>
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
