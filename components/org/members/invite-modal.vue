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

	const emit = defineEmits(['invite-sent', 'close']);

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

	async function fetchAccountData() {
		try {
			const { data: rolesData, error: getTicketTypesError } = await supabase
				.from('roles')
				.select('*')
				.order('id', { ascending: true });

			if (getTicketTypesError) {
				throw new Error(
					`Error fetching ticket type data: ${getTicketTypesError.message}`
				);
			}

			roles.value = rolesData;
			selectedRole.value = rolesData[0];
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

			const { data: inviteData, error: inviteError } = await supabase
				.from('invitations')
				.select('id')
				.eq('invited_email', inviteeEmail.value);

			if (inviteData.length > 0) {
				inviteeEmail.value = '';
				throw new Error('Email has already received an invite');
			}

			const { data: invitation, error } = await supabase
				.from('invitations')
				.insert([
					{
						invited_email: inviteeEmail.value,
						role_id: selectedRole.value.id,
						organization_id: route.params.organization,
					},
				]);
			// If there was an error inserting the invitation, log the error and alert the user
			if (error) {
				throw new Error(error.message || error.toString());
			} else {
				// Update the local invitations data as well
				is_error.value = false;
				emit('invite-sent', 'Invitation sent successfully');
				emit('close');
				inviteeEmail.value = '';
				success_message.value = 'Invitation sent successfully';
				is_success.value = true;
			}
		} catch (error) {
			// Catch any unexpected errors and log them
			is_success.value = false;
			is_error.value = true;
			error_message.value = error.message || error.toString();
			submit_loading.value = false;
			emit('error', error.message || error.toString());
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
	<div
		@click="emit('close')"
		class="bg-scale-600/75 fixed inset-0 grid place-items-center overflow-y-auto"
	>
		<div
			@click.stop
			role="dialog"
			id="radix-134"
			aria-describedby="radix-142"
			aria-labelledby="radix-141"
			data-state="open"
			class="bg-scale-100 dark:bg-scale-300 border-scale-300 dark:border-scale-500 data-open:animate-overlay-show data-closed:animate-overlay-hide relative my-4 !overflow-visible rounded-md border shadow-xl sm:w-full sm:max-w-lg sm:align-middle"
			tabindex="-1"
			style="pointer-events: auto"
		>
			<div
				class="bg-scale-200 dark:bg-scale-400 border-scale-300 dark:border-scale-500 space-y-1 border-b px-4 py-3 sm:px-5"
			>
				Invite a member to this organization
			</div>
			<form>
				<div class="px-5">
					<div class="w-full py-4">
						<div class="space-y-4">
							<div class="space-y-2">
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for="role"
											>Member role</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<button
												class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
												name="role"
												id="role"
												type="button"
												aria-haspopup="menu"
												aria-expanded="false"
												data-state="closed"
											>
												<span
													class="flex w-full flex-row items-center space-x-3"
													><span class="truncate">Developer</span></span
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
											</button>
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
												type="text"
												class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 box-border block w-full rounded-md border border border-red-700 bg-red-100 px-4 py-2 pl-10 text-sm shadow-sm outline-none transition-all placeholder:text-red-600 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-red-500"
												value="Rev-Ops"
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
												data-lastpass-icon-root="true"
												style="
													position: relative !important;
													height: 0px !important;
													width: 0px !important;
													float: left !important;
												"
											></div>
											<div
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
									</div>
									<p
										data-state="show"
										class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
									>
										Must be a valid email address
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
				<div class="px-5">
					<div class="pb-3 pt-2">
						<button
							class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-4 py-2 text-center text-sm text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							type="submit"
						>
							<span class="truncate">Invite new member</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
