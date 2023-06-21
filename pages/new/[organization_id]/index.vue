<script setup>
	import { ref } from 'vue';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	} from '@headlessui/vue';

	definePageMeta({ layout: 'projects', middleware: ['auth'] });

	import CENTRAL_CANADA from '@/assets/images/regions/CENTRAL_CANADA.svg';
	import CENTRAL_EU from '@/assets/images/regions/CENTRAL_EU.svg';
	import EAST_US from '@/assets/images/regions/EAST_US.svg';
	import NORTHEAST_ASIA_2 from '@/assets/images/regions/NORTHEAST_ASIA_2.svg';
	import NORTHEAST_ASIA from '@/assets/images/regions/NORTHEAST_ASIA.svg';
	import OCEANIA from '@/assets/images/regions/OCEANIA.svg';
	import SOUTH_AMERICA from '@/assets/images/regions/SOUTH_AMERICA.svg';
	import SOUTH_ASIA from '@/assets/images/regions/SOUTH_ASIA.svg';
	import SOUTHEAST_ASIA from '@/assets/images/regions/SOUTHEAST_ASIA.svg';
	import WEST_EU_2 from '@/assets/images/regions/WEST_EU_2.svg';
	import WEST_EU from '@/assets/images/regions/WEST_EU.svg';
	import WEST_US from '@/assets/images/regions/WEST_US.svg';

	const regions = [
		{
			name: 'Central Canada',
			image: CENTRAL_CANADA,
			value: 'central_canada',
		},
		{
			name: 'Central EU',
			image: CENTRAL_EU,
			value: 'central_eu',
		},
		{
			name: 'East US',
			image: EAST_US,
			value: 'east_us',
		},
		{
			name: 'Northeast Asia',
			image: NORTHEAST_ASIA,
			value: 'northeast_asia',
		},
		{
			name: 'Northeast Asia 2',
			image: NORTHEAST_ASIA_2,
			value: 'northeast_asia_2',
		},
		{
			name: 'Oceania',
			image: OCEANIA,
			value: 'oceania',
		},
		{
			name: 'South America',
			image: SOUTH_AMERICA,
			value: 'south_america',
		},
		{
			name: 'South Asia',
			image: SOUTH_ASIA,
			value: 'south_asia',
		},
		{
			name: 'Southeast Asia',
			image: SOUTHEAST_ASIA,
			value: 'southeast_asia',
		},
		{
			name: 'West EU',
			image: WEST_EU,
			value: 'west_eu',
		},
		{
			name: 'West EU 2',
			image: WEST_EU_2,
			value: 'west_eu_2',
		},
		{
			name: 'West US',
			image: WEST_US,
			value: 'west_us',
		},
	];

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

	const client_name = ref('');

	const client_region = ref(regions[0]);
	const client_email = ref('');

	async function fetchData() {
		try {
			const { data: organizationData, error: organizationError } =
				await supabase.from('organizations').select('*');

			if (organizationError)
				throw new Error(
					`Error fetching account data: ${organizationError.message}`
				);

			accounts.value = organizationData;
			selectedAccount.value = organizationData.find(
				(o) => o.id === route.params.organization_id
			);

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
			!client_name.value ||
			!client_region.value ||
			!client_email.value ||
			submit_loading.value
		);
	});

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

	const handleSubmit = async () => {
		try {
			submit_loading.value = true;

			// Create stripe customer

			const customer = await $fetch('/api/stripe/customer/create', {
				method: 'post',
				body: {
					company_name: client_name.value,
					email: client_email.value,
					metadata: {
						region: client_region.value.value,
						organization_id: route.params.organization_id,
					},
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

			// Create Tray workspace

			const { data: trayWorkspace, error: trayWorkspaceError } =
				await createTrayWorkspace({
					name: client_name.value,
					description: route.params.organization_id,
				});

			if (trayWorkspaceError) {
				throw new Error(trayWorkspaceError.message);
			}

			// Finally create client in Supabase

			const { data: client, error } = await supabase
				.from('clients')
				.insert([
					{
						name: client_name.value,
						type: null,
						stripe_subscription_id: subscription.id,
						stripe_customer_id: customer.id,
						status: 'active',
						organization_id: route.params.organization_id,
						tray_workspace_id: trayWorkspace.id,
					},
				])
				.select();
			if (error) {
				throw new Error(`Error inserting ticket: ${error.message}`);
			}

			is_success.value = true;
			success_message.value = 'Successfully created client';
			router.push(`/clients/${client[0].id}`);
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
								<div><h3>Create a new client</h3></div>
							</div>
						</div>
						<div class="bg-panel-body-light dark:bg-panel-body-dark">
							<div class="px-6 py-4 pb-6 pt-0">
								<p class="text-sm text-slate-500">
									Your client will have its own dedicated account manager.<br />An
									AI will initially respond so you can easily convey information
									with support.<br />
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
															'text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2',
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
															style="z-index: 9999"
															class="dark:bg-scale-300 absolute mt-1 max-h-60 w-full overflow-hidden overflow-y-scroll rounded-md border border-solid border-gray-100 bg-white py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
														>
															<ListboxOption
																v-for="account in accounts"
																:key="account.id"
																:value="account"
																v-slot="{ selected, active }"
																><div
																	:class="[
																		selected ? 'bg-slate-100' : '',
																		active ? 'bg-scale-600' : '',
																		'text-scale-900 hover:bg-scale-300 dark:hover:bg-scale-500 focus:bg-scale-300 dark:focus:bg-scale-500 focus:text-scale-1200 text-scale-1200 relative  w-full cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none',
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
								class="border-panel-border-interior-light dark:border-panel-border-interior-dark border-b px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label
											class="text-scale-1100 block text-sm"
											for="client-name"
											>Name</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<div class="relative">
												<input
													id="client-name"
													name=""
													placeholder="Client name"
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													v-model="client_name"
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
								class="border-panel-border-interior-light dark:border-panel-border-interior-dark space-y-4 border-b px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Region</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<button
												class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
												name=""
												id=""
												type="button"
												aria-haspopup="menu"
												aria-expanded="false"
												data-state="closed"
												push::1.36.12::listener="1"
											>
												<span
													class="flex w-full flex-row items-center space-x-3"
													><img
														class="w-5 rounded-sm"
														:src="CENTRAL_CANADA"
													/><span class="truncate"
														>East US (North Virginia)</span
													></span
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
										<p
											class="text-scale-900 mt-2 text-sm leading-normal"
											id="-description"
										>
											Select a region close to your users for the best
											performance.
										</p>
									</div>
								</div>
							</div>
							<div class="px-6 py-4">
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Billing email</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<div class="relative">
												<input
													id="client-name"
													name=""
													placeholder="Client email"
													type="email"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													v-model="client_email"
												/>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
										<p
											class="text-scale-900 mt-2 text-sm leading-normal"
											id="-description"
										>
											Select a plan that suits your needs.&nbsp;<a
												class="underline"
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/pricing"
												>More details</a
											>
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
											>You can rename your client later</span
										><button
											@click="handleSubmit()"
											class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
											:disabled="isDisabled"
										>
											<svg
												v-if="submit_loading"
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

											<span class="truncate">Create new client</span>
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
