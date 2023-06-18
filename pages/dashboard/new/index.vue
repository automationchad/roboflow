<script setup>
	definePageMeta({ layout: 'project', middleware: ['auth'] });

	import { ref } from 'vue';

	import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';

	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	} from '@headlessui/vue';

	const options = [
		{ id: 'personal', name: 'Personal' },
		{ id: 'educational', name: 'Educational' },
		{ id: 'startup', name: 'Startup' },
		{ id: 'agency', name: 'Agency' },
		{ id: 'company', name: 'Company' },
		{ id: 'n/a', name: 'N/A' },
	];

	const selectedOption = ref(options[0]);

	const emit = defineEmits(['close-modal', 'org-submit', 'error']);
	const user = useSupabaseUser();

	const supabase = await useSupabaseClient();

	// if (userData.accountId) {
	// 	navigateTo(`/dashboard/new/${userData.accountId}`);
	// }

	const form_responses = ref({
		name: '',
		options: {
			partner: false,
		},
	});

	const loading = ref(false);
	const is_success = ref(false);
	const success_message = ref('');
	const is_error = ref(false);
	const error_message = ref('');
	const duped_name = ref('');
	const router = useRouter();

	const cancelAll = () => {
		form_responses.value = {
			name: '',
			options: {
				partner: false,
			},
		};
	};

	const createTrayWorkspace = async (body) => {
		const variables = {
			workspaceName: body.name,
			workspaceDescription: body.description,
			workspacePurpose: 'CONSULTANCY',
			workspaceColor: '#4ACC94',
			workspaceIsSandbox: true,
		};

		try {
			const { data: trayWorkspaceData, error: trayWorkspaceError } =
				await $fetch('/api/tray/workspaces/create', {
					method: 'POST',
					body: variables,
				});

			if (trayWorkspaceError) {
				throw new Error(trayWorkspaceError.message);
			}
			return { data: trayWorkspaceData, error: null };
		} catch (e) {
			return { data: null, error: { message: e } };
		}
	};

	const handleSubmit = async (body) => {
		try {
			if (!body.name) {
				throw new Error('Organization name is empty');
			}
			loading.value = true;
			// Insert account data

			const { data: trayWorkspace, error: trayWorkspaceError } =
				await createTrayWorkspace({
					name: body.name,
					description: selectedOption.value.id,
				});

			if (trayWorkspaceError) {
				throw new Error(trayWorkspaceError.message);
			}

			const account = await $fetch('/api/stripe/account/create', {
				method: 'post',
			});

			if (!account || account.error) {
				throw new Error(
					account.error ? account.error : 'Error creating account'
				);
			}

			const customer = await $fetch('/api/stripe/customer/create', {
				method: 'post',
				body: {
					company_name: body.name,
				},
			});

			if (!customer || customer.error) {
				throw new Error(
					customer.error ? customer.error : 'Error creating customer'
				);
			}

			// Create Stripe subscription

			const subscription = await $fetch('/api/stripe/subscription/create', {
				method: 'post',
				body: {
					customer,
				},
			});

			if (!subscription || subscription.error) {
				throw new Error(
					subscription.error
						? subscription.error
						: 'Error creating subscription'
				);
			}

			const payload = {
				name: body.name,
				type: selectedOption.value.id,
				stripe_customer_id: customer.id,
				stripe_account_id: account.id,
				tray_workspace_id: trayWorkspace.id,
				status: 'ACTIVE',
			};

			const { data: orgInsert, error: orgInsertError } = await supabase.rpc(
				'create_organization_and_member',
				{
					organization_data: payload,
					user_id: user.value.id,
				}
			);

			if (orgInsertError) {
				throw new Error(orgInsertError.message);
			}
			router.push(`/dashboard/new/${orgInsert.id}`);
		} catch (error) {
			console.log(error);
			loading.value = false;
			duped_name.value = body.name;
			is_error.value = true;
			error_message.value = error.message;
			emit('error', error.message); // Emit the error up to the parent
		}
	};
</script>

<template>
	<div class="">
		<section class="has-slide-in slide-in relative mx-auto my-10 max-w-2xl">
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div
						class="mb-8 rounded-md border border-gray-400 bg-white/60 shadow-sm"
					>
						<div
							class="bg-panel-body-light dark:bg-panel-body-dark rounded-t-md"
						>
							<div class="flex items-center px-6 py-4">
								<div><h4>Create a new organization</h4></div>
							</div>
						</div>
						<div class="bg-panel-body-light dark:bg-panel-body-dark">
							<div class="px-6 py-4 pt-0">
								<p class="text-sm">
									This is your organization within Supabase.
								</p>
								<p class="text-sm text-slate-600">
									For example, you can use the name of your company or
									department.
								</p>
							</div>
							<div
								class="Form section-block--body has-inputs-centered px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Name</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<div class="relative">
												<input
													v-model="form_responses.name"
													type="text"
													autofocus=""
													id=""
													name=""
													:disabled="loading"
													placeholder="Organization name"
													class="box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-300 shadow-sm outline-none transition-all focus:border-slate-500 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-slate-300"
												/>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
										<p
											class="mt-2 text-sm leading-normal text-slate-500"
											id="-description"
										>
											What's the name of your company or team?
										</p>
									</div>
								</div>
							</div>
							<div
								class="Form section-block--body has-inputs-centered px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Type of organization</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<Listbox
												v-model="selectedOption"
												as="div"
												v-slot="{ open }"
											>
												<div class="relative">
													<ListboxButton
														:disabled="loading"
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
																selectedOption.name
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
														><div class="relative">
															<ListboxOptions
																class="dark:bg-scale-300 absolute z-[500] mt-1 max-h-60 w-full overflow-y-scroll rounded-md border border-solid border-gray-100 bg-white py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
															>
																<ListboxOption
																	v-for="option in options"
																	:key="option.id"
																	:value="option"
																	v-slot="{ active, selected }"
																	><div
																		:class="[
																			active
																				? 'bg-slate-50 text-slate-900'
																				: 'text-slate-500',
																			selected
																				? 'bg-slate-200'
																				: 'text-slate-500',
																			'focus:text-slate-1200 relative  w-full cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none ',
																		]"
																	>
																		<div class="flex items-center space-x-3">
																			<span>{{ option.name }}</span>
																		</div>
																		<span
																			class="absolute inset-y-0 right-0 flex items-center pr-3 text-lime-500"
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
																				class="sbui-icon h-5 w-5"
																				aria-hidden="true"
																			>
																				<polyline
																					points="20 6 9 17 4 12"
																				></polyline></svg
																		></span>
																	</div>
																</ListboxOption>
															</ListboxOptions></div
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
											What would best describe your organization?
										</p>
									</div>
								</div>
							</div>
						</div>
						<div
							class="border-panel-border-interior-light bg-panel-footer-light dark:border-panel-border-interior-dark dark:bg-panel-footer-dark rounded-b-md border-t"
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
									<div class="flex items-center space-x-3">
										<p class="text-xs text-slate-500">
											You can rename your organization later
										</p>
										<button
											:disabled="loading"
											@click="handleSubmit(form_responses)"
											:class="[
												' font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1   text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all  duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-50',
											]"
											type="button"
										>
											<svg
												v-if="loading"
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4 animate-spin"
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

											<span class="truncate">Create organization</span>
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
