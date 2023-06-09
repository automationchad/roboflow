<template>
	<div>
		<Head>
			<Title>Motis Group | Org Clients</Title>
		</Head>
		<div>
			<div>
				<div class="">
					<div class="lg:px-8">
						<div class="mx-auto flex flex-col lg:max-w-7xl">
							<main class="max-w-7xl flex-1">
								<div class="relative mx-auto">
									<div class="pb-16 pt-10">
										<div class="px-4 sm:px-6 lg:px-0">
											<p class="text-xs text-white">{{ User.Account.name }}</p>
											<h1
												class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
											>
												Client organizations
											</h1>
										</div>
										<div class="px-4 sm:px-6 lg:px-0">
											<div class="py-6">
												<div class="mt-8 space-y-6 lg:px-0">
													<section aria-labelledby="clients">
														<div class="sm:overflow-hidden">
															<div class="flex max-w-5xl flex-col">
																<div class="overflow-x-auto">
																	<div
																		class="inline-block min-w-full align-middle"
																	>
																		<div class="overflow-hidden">
																			<div
																				class="border-panel-border-light dark:border-panel-border-dark w-full overflow-hidden rounded border border-slate-200 dark:border-slate-800 dark:bg-slate-900"
																			>
																				<div
																					class="bg-panel-body-light dark:bg-panel-body-dark"
																				>
																					<div
																						class="flex items-center justify-between px-6"
																					>
																						<div class="flex flex-col">
																							<h3
																								class="text-md dark:text-slate-100"
																							>
																								Client organizations
																							</h3>
																						</div>
																						<Disclosure
																							as="div"
																							class="py-4 dark:border-slate-700"
																							v-slot="{ open }"
																							><div
																								class="flex items-center justify-start"
																							>
																								<div class="group relative">
																									<div
																										v-if="isAddingDisabled"
																										id="tooltip-default"
																										role="tooltip"
																										class="absolute bottom-0 left-1/2 z-10 m-4 mx-auto flex w-[200px] -translate-x-1/2 translate-y-full flex-col rounded-lg border border-slate-300 bg-white px-4 py-4 text-xs font-normal text-slate-500 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 dark:border-slate-800 dark:bg-gray-900 dark:text-white"
																									>
																										<span
																											class="text-left text-slate-900 dark:text-white"
																										>
																											As a "<span
																												class="capitalize"
																												>{{
																													User.systemRole
																												}}</span
																											>" you don't have
																											permissions to send
																											invites.
																										</span>
																									</div>
																									<DisclosureButton
																										:disabled="isAddingDisabled"
																										v-if="!open"
																										type="button"
																										class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
																										><svg
																											class="mr-2 h-4 w-4"
																											fill="none"
																											viewBox="0 0 24 24"
																										>
																											<path
																												stroke="currentColor"
																												stroke-linecap="round"
																												stroke-linejoin="round"
																												stroke-width="1.5"
																												d="M17 14.75V19.25M11.25 19.25H5.78165C5.21714 19.25 4.77296 18.7817 4.88545 18.2285C5.19601 16.7012 6.21027 14 9.49996 14C10.1744 14 10.7532 14.0563 11.25 14.25M19.25 17H14.75M14.75 10.25C16.2687 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2687 4.75 14.75 4.75M12.25 7.5C12.25 9.01878 11.0187 10.25 9.49996 10.25C7.98118 10.25 6.74996 9.01878 6.74996 7.5C6.74996 5.98122 7.98118 4.75 9.49996 4.75C11.0187 4.75 12.25 5.98122 12.25 7.5Z"
																											></path>
																										</svg>

																										Add
																									</DisclosureButton>
																									<DisclosurePanel
																										class="flex flex-grow items-center justify-between text-sm text-gray-500"
																									>
																										<div
																											class="flex justify-between space-x-4"
																										>
																											<div>
																												<div
																													class="relative rounded-md shadow-sm"
																												>
																													<input
																														:disabled="loading"
																														v-model="
																															form_responses.name
																														"
																														required
																														type="text"
																														name="text"
																														:class="[
																															is_error &&
																															form_responses.name ===
																																duped_name
																																? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-rose-600 dark:text-red-500 dark:ring-rose-600'
																																: 'focus:ring-indigo-600 dark:text-white dark:ring-slate-700',
																															'block w-56 rounded-md border-0 py-0 pr-10 ring-1 ring-inset  focus:ring-2 focus:ring-inset  dark:bg-slate-800  sm:text-xs sm:leading-6',
																														]"
																														placeholder="Client name"
																														aria-invalid="true"
																														aria-describedby="client-error"
																													/>
																													<div
																														class="absolute inset-y-0 right-0 flex items-center pr-1"
																													>
																														<svg
																															class="h-4 w-4"
																															fill="none"
																															viewBox="0 0 24 24"
																														>
																															<path
																																stroke="currentColor"
																																stroke-linecap="round"
																																stroke-linejoin="round"
																																stroke-width="1.5"
																																d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V8.18322C19.2502 7.89772 19.1891 7.61553 19.071 7.35561L18.5332 6.17239C18.2086 5.45841 17.4967 5 16.7124 5H7.28807C6.50378 5 5.79188 5.45841 5.46734 6.1724L4.92951 7.35561C4.81137 7.61553 4.75024 7.89772 4.75024 8.18322V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
																															></path>
																															<path
																																stroke="currentColor"
																																stroke-linecap="round"
																																stroke-linejoin="round"
																																stroke-width="1.5"
																																d="M9.5 7.75C9.5 8.99264 8.5 10.25 7 10.25C5.5 10.25 4.75 8.99264 4.75 7.75"
																															></path>
																															<path
																																stroke="currentColor"
																																stroke-linecap="round"
																																stroke-linejoin="round"
																																stroke-width="1.5"
																																d="M19.25 7.75C19.25 8.99264 18.5 10.25 17 10.25C15.5 10.25 14.5 8.99264 14.5 7.75"
																															></path>
																															<path
																																stroke="currentColor"
																																stroke-linecap="round"
																																stroke-linejoin="round"
																																stroke-width="1.5"
																																d="M14.5 7.75C14.5 8.99264 13.5 10.25 12 10.25C10.5 10.25 9.5 8.99264 9.5 7.75"
																															></path>
																															<path
																																stroke="currentColor"
																																stroke-linecap="round"
																																stroke-linejoin="round"
																																stroke-width="1.5"
																																d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
																															></path>
																														</svg>

																														<input
																															v-model="
																																form_responses
																																	.options
																																	.partner
																															"
																															id="partner"
																															aria-describedby="partner-description"
																															name="partner"
																															type="checkbox"
																															class="h-4 w-4 rounded-full border-gray-300 text-[#9382ff] focus:outline-0 active:outline-0 active:ring-0 dark:border-slate-700 dark:bg-slate-800"
																														/>
																													</div>
																												</div>
																											</div>

																											<div
																												class="flex items-center"
																											>
																												<DisclosureButton
																													@click="cancelAll()"
																													:disabled="loading"
																													v-if="open"
																													class="mr-2 flex h-6 w-6 items-center justify-center rounded-md border border-slate-300 text-center text-sm font-normal shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
																													><svg
																														class="h-4 w-4"
																														fill="none"
																														viewBox="0 0 24 24"
																													>
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
																												</DisclosureButton>
																												<button
																													:disabled="loading"
																													@click="
																														handleSubmit(
																															form_responses
																														)
																													"
																													class="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600 text-white"
																												>
																													<svg
																														v-if="loading"
																														xmlns="http://www.w3.org/2000/svg"
																														class="h-5 w-5 animate-spin"
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

																													<svg
																														v-else
																														class="h-5 w-5"
																														viewBox="0 0 24 24"
																														fill="none"
																														xmlns="http://www.w3.org/2000/svg"
																													>
																														<path
																															d="M7.75 12.75L10 15.25L16.25 8.75"
																															stroke="currentColor"
																															stroke-width="1.5"
																															stroke-linecap="round"
																															stroke-linejoin="round"
																														></path>
																													</svg>
																												</button>
																											</div>
																										</div>
																									</DisclosurePanel>
																								</div>
																							</div>
																						</Disclosure>
																					</div>

																					<div
																						class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 text-slate-500 dark:border-slate-800"
																					>
																						<div class="w-[40%]">
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Name
																							</p>
																						</div>

																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Type
																							</p>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Status
																							</p>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Tasks
																							</p>
																						</div>
																					</div>
																					<NuxtLink
																						v-for="(team, idx) in teams"
																						:to="`/${team.id}/dashboard`"
																						:key="team.name"
																						class="dark:border-panel-border-dark hover:bg-white/[2%] relative flex items-center border-t border-slate-100 px-6 py-3 transition-colors dark:border-slate-800 dark:text-slate-200"
																					>
																						<div
																							class="flex w-[40%] items-center gap-3"
																						>
																							<span class="text-sm">{{
																								team.name +
																								(team.name === User.Account.name
																									? ' (You)'
																									: '')
																							}}</span>
																						</div>

																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<span
																								class="rounded-full border border-slate-400 bg-slate-500 px-2 text-xs capitalize text-slate-100"
																								>{{
																									team.type.replace(/_/g, ' ')
																								}}</span
																							>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<span
																								:class="[
																									styles[team.status],
																									'rounded-full px-2 text-xs capitalize ring-1 ',
																								]"
																								>{{ team.status }}</span
																							>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<div
																								v-if="team.Ticket[0].count"
																								class="flex items-center justify-center rounded-full bg-rose-900 px-2 py-0.5 text-xs leading-none"
																							>
																								{{ team.Ticket[0].count }}
																							</div>
																						</div>
																					</NuxtLink>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</section>
												</div>
											</div>
										</div>
									</div>
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
		</div>

		<transition
			enter-active-class="transition duration-300 ease-in-out"
			enter-from-class="transform -translate-y-10 opacity-0 scale-95"
			enter-to-class="transform translate-y-0 opacity-100 scale-100"
			leave-active-class="transition duration-300 ease-in-out"
			leave-from-class="transform translate-y-0 opacity-100 scale-100"
			leave-to-class="transform -translate-y-10 opacity-0 scale-95"
			><SuccessModal
				:title="successMessage"
				:description="''"
				v-if="is_success"
				@close="is_success = false"
		/></transition>

		<transition
			enter-active-class="transition duration-200 ease-in-out"
			enter-from-class="transform -translate-y-10 opacity-0 scale-95"
			enter-to-class="transform translate-y-0 opacity-100 scale-100"
			leave-active-class="transition duration-200 ease-in-out"
			leave-from-class="transform translate-y-0 opacity-100 scale-100"
			leave-to-class="transform -translate-y-10 opacity-0 scale-95"
			><ErrorModal
				:title="errorMessage"
				:description="''"
				v-if="is_error"
				@close="is_error = false"
		/></transition>
		<transition
			enter-active-class="transition duration-200 ease-in-out"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition duration-200 ease-in-out"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
			><org-submit
				v-show="showSubmitModal"
				@close-modal="showSubmitModal = false"
				@org-submit="handleSubmit"
				@error="handleError"
		/></transition>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
	} from '@headlessui/vue';

	const is_success = ref(false);
	const is_error = ref(false);

	const errorMessage = ref('');
	const successMessage = ref('');

	const teams = ref([]);

	const handleError = (msg) => {
		errorMessage.value = msg;
		is_error.value = true;
	};

	const showSubmitModal = ref(false);

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const styles = {
		active:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		pending:
			'bg-yellow-100 dark:bg-yellow-700 dark:ring-yellow-500 ring-yellow-300  text-yellow-900 dark:text-yellow-200',
		deleted:
			'bg-slate-100 dark:bg-slate-700 dark:ring-slate-500 ring-slate-300  text-slate-900 dark:text-slate-200',
		inactive:
			'bg-amber-100 dark:bg-amber-700 dark:ring-amber-500 ring-amber-300  text-amber-900 dark:text-amber-200',
		cancelled:
			'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		delinquent:
			'bg-rose-100 dark:bg-rose-700 dark:ring-rose-500 ring-rose-300 text-rose-900 dark:text-rose-200',
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
			Account (
			     id,
				 name,
				 type,
				 Subscription(*),
				 Team (
					id,
					name
				 ),
				 Ticket (count)
			   )
			 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const getData = async () => {
		const { data: Account, error: accountError } = await supabase
			.from('Account')
			.select('*,Ticket(count)');
		teams.value = Account;
	};

	const form_responses = ref({
		name: '',
		options: {
			partner: false,
		},
	});

	const loading = ref(false);
	const duped_name = ref('');
	const route = useRoute();

	const cancelAll = () => {
		form_responses.value = {
			name: '',
			options: {
				partner: false,
			},
		};
		loading.value = false;
	};

	const handleSubmit = async (body) => {
		try {
			loading.value = true;
			if (!body.name) {
				is_error.value = true;
				throw new Error('Please enter a name');
			}
			// Insert account data
			const { data: accountData, error: accountError } = await supabase
				.from('Account')
				.insert([
					{
						name: body.name,
						type: body.options.partner ? 'partner' : 'client',
						status: 'active',
					},
				])
				.select();

			if (accountError) {
				throw new Error(accountError.message);
			}

			// Create Stripe customer
			const customer = await $fetch('/api/stripe/customer/create', {
				method: 'post',
				body: {
					email: body.email,
					company_name: body.name,
				},
			});

			if (!customer || customer.error) {
				throw new Error(
					customer.error ? customer.error : 'Error creating customer'
				);
			}

			// Create Stripe subscription
			if (!body.options.partner) {
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
			}
			cancelAll();
			is_success.value = true;
			successMessage.value = `Successfully created ${
				body.options.partner ? 'Partner' : 'Client'
			} account`;
			await getData();
		} catch (error) {
			console.log(error);
			loading.value = false;
			duped_name.value = body.name;
			is_error.value = true;
			errorMessage.value = error.message;
		}
	};

	onMounted(async () => {
		await getData();
	});
</script>
