<script setup>
	import { reactive, onMounted, ref } from 'vue';

	import visa from '~/assets/images/payment-methods/visa.png';
	import mastercard from '~/assets/images/payment-methods/mastercard.png';

	import { format } from 'date-fns';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const route = useRoute();
	const router = useRouter();

	const subscription = ref([]);

	const customer = ref(null);
	const paymentMethods = ref([]);
	const account = ref(null);

	const email = ref('•••••••••••••••');

	const loading = ref(true);

	const deals = ref([]);

	const getData = async () => {
		let { data: accountData, error: accountError } = await supabase
			.from('organizations')
			.select(`id,status,type,stripe_customer_id,stripe_account_id`)
			.eq('id', route.params.organization)
			.limit(1)
			.single();

		if (accountData.stripe_account_id) {
			account.value = await getStripeAccountData(accountData.stripe_account_id);
		}

		if (accountData.stripe_customer_id) {
			customer.value = await getStripeCustomerData(
				accountData.stripe_customer_id
			);
			email.value = customer.value.email;

			paymentMethods.value = await getStripePaymentMethodData(
				accountData.stripe_customer_id
			);
		}

		console.log(paymentMethods.value);

		const { data: dealData, error: dealError } = await supabase
			.from('projects')
			.select(`*`)
			.eq('organization_id', route.params.organization)
			.eq('partner_status', 'payout_paid');

		deals.value = dealData;
		loading.value = false;
	};

	const handlePayoutLogin = async () => {
		const { url } = await $fetch('/api/stripe/account/login', {
			method: 'post',
			body: {
				account_id: accountData.stripe_customer_id,
			},
		});
		navigateTo(url, { external: true });
	};

	const handlePayoutOnboarding = async (id) => {
		const { url } = await $fetch('/api/stripe/account/onboarding', {
			method: 'post',
			body: {
				account_id: id,
			},
		});
		navigateTo(url, { external: true });
	};

	const handleUpdateStripe = async (customer, values) => {
		const { data } = await $fetch('/api/stripe/customer/update', {
			method: 'post',
			body: {
				customer,
				values,
			},
		});
		return data;
	};

	const getStripeAccountData = async (customer) => {
		const data = await $fetch(`/api/stripe/account/${customer}`, {
			method: 'get',
		});
		return data;
	};

	const getStripeCustomerData = async (customer) => {
		const data = await $fetch(`/api/stripe/customer/${customer}`, {
			method: 'get',
		});
		return data;
	};

	const getStripePaymentMethodData = async (customer) => {
		const data = await $fetch(`/api/stripe/payment-method/${customer}`, {
			method: 'get',
		});
		return data;
	};

	getData();
</script>

<template>
	<div class="mb-8">
		<article class="container my-4 max-w-4xl space-y-8">
			<div class="space-y-8">
				<div class="space-y-2">
					<h4>Projects at a glance</h4>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div
									class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
								>
									<div class="flex items-center px-6 py-4">
										<div class="flex w-full items-center">
											<div class="w-[25%]">
												<p class="text-sm opacity-50">Name</p>
											</div>
											<div class="w-[20%]">
												<p class="text-sm opacity-50">Plan</p>
											</div>
											<div class="w-[40%]">
												<p class="text-sm opacity-50">Deal cycle</p>
											</div>
											<div class="w-[15%]"></div>
										</div>
									</div>
								</div>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div
										v-if="deals.length > 0 && !loading"
										class="flex w-full items-center px-6 py-3"
										v-for="deal in deals"
										:key="deal.id"
									>
										<div class="w-[25%]">
											<p class="text-sm">{{ deal.name }}</p>
										</div>
										<div class="w-[20%]">
											<p class="text-sm">
												{{ formatAccounting(deal.partner_payout_amount, true) }}
											</p>
										</div>
										<div class="flex w-[40%] items-center space-x-2">
											<p class="text-sm">
												{{ format(new Date(deal.created_at), 'MMMM dd, yyyy') }}
											</p>
											<p class="text-sm">-</p>
											<p class="text-sm">
												{{
													format(new Date(deal.payout_paid_at), 'MMMM dd, yyyy')
												}}
											</p>
										</div>
										<div class="flex w-[15%] items-center justify-end">
											<NuxtLink
												class="group flex items-center space-x-2"
												:to="`/dashboard/projects/${deal.id}/settings/billing/subscription`"
												><p
													class="text-xs opacity-0 transition group-hover:opacity-100"
												>
													View details
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="21"
													height="21"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon"
												>
													<polyline points="9 18 15 12 9 6"></polyline></svg
											></NuxtLink>
										</div>
									</div>
									<div
										v-else-if="deals.length === 0 && !loading"
										class="px-6 py-4"
									>
										<p class="text-scale-1100 text-sm">
											No projects created yet
										</p>
									</div>
									<div v-else class="px-6 py-4 text-center">
										<p
											class="text-scale-1100 flex items-center justify-center text-sm"
										>
											<svg
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
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="flex items-center justify-between">
					<div class="space-y-1">
						<div class="flex items-center space-x-2">
							<h4>Commission balance</h4>
						</div>
						<p class="text-sm opacity-50">
							Charges will be deducted from your balance first
						</p>
					</div>
					<div class="flex items-end space-x-1">
						<h4 class="opacity-50">$</h4>
						<h2 class="text-4xl">
							{{
								formatAccounting(
									deals.reduce((a, c) => a + c.partner_payout_amount, 0)
								)
							}}
						</h2>
					</div>
				</div>
				<div class="space-y-2">
					<div>
						<h4>External payout account</h4>
						<p class="text-sm opacity-50">
							You can set up your external payout account, which is where your
							earnings from referral bonuses will be directly deposited.
						</p>
					</div>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div v-if="loading" class="px-6 py-4">
										<div class="flex items-center justify-center">
											<svg
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
										</div>
									</div>
									<div v-else-if="!account" class="px-6 py-4">
										<div class="flex items-center space-x-2 opacity-50">
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
												<rect
													x="1"
													y="4"
													width="22"
													height="16"
													rx="2"
													ry="2"
												></rect>
												<line x1="1" y1="10" x2="23" y2="10"></line>
											</svg>
											<p class="text-sm">No payout set up</p>
										</div>
									</div>
									<div v-else-if="account?.details_submitted" class="px-6 py-4">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-8">
													<img alt="" class="text-xs" :src="visa" width="32" />
													<div
														class="grid w-64 gap-2 text-sm leading-4 md:grid md:grid-cols-12"
													>
														<div class="col-span-12">
															<div class="">
																<div class="relative">
																	<input
																		id=""
																		name=""
																		type="text"
																		class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																		readonly=""
																		value="•••• •••• •••• 6792"
																	/>
																</div>
															</div>
															<p
																data-state="hide"
																class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
															></p>
														</div>
													</div>
													<div class="opacity-0">
														<span
															class="text-gray-1100 inline-flex items-center rounded-full border border-gray-700 bg-gray-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
															>Default</span
														>
													</div>
													<p class="text-sm tabular-nums">Expires: 3/2029</p>
												</div>
												<button
													type="button"
													id="radix-1072"
													aria-haspopup="menu"
													aria-expanded="false"
													data-state="closed"
													class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
												>
													<button
														class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:border-gray-500 focus-visible:outline-4 focus-visible:outline-offset-1"
														type="button"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="14"
															height="14"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon"
														>
															<circle cx="12" cy="12" r="1"></circle>
															<circle cx="19" cy="12" r="1"></circle>
															<circle cx="5" cy="12" r="1"></circle>
														</svg>
													</button>
												</button>
											</div>
										</div>
									</div>
									<div
										v-else-if="!account?.details_submitted"
										class="px-6 py-4"
									>
										<div class="space-y-2">
											<div
												class="relative flex items-start space-x-4 rounded-md border border-amber-700 bg-amber-200 px-6 py-4 dark:bg-amber-100"
											>
												<div class="text-amber-900">
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
														<path
															d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
														></path>
														<line x1="12" y1="9" x2="12" y2="13"></line>
														<line x1="12" y1="17" x2="12.01" y2="17"></line>
													</svg>
												</div>
												<div class="flex flex-1 items-center justify-between">
													<div>
														<h3
															class="text-amber-1200 mb-1 block text-sm font-normal"
														>
															Finish activating your account
														</h3>
														<div class="text-amber-1100 text-xs">
															Add or clarify details so you can start receiving
															payouts for referred leads.
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									class="border-panel-border-interior-light bg-panel-footer-light dark:border-panel-border-interior-dark dark:bg-panel-footer-dark border-t"
								>
									<div class="flex h-12 items-center px-6">
										<div class="flex w-full justify-between">
											<div></div>
											<div>
												<button
													@click="handlePayoutOnboarding(account.id)"
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
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<line x1="12" y1="5" x2="12" y2="19"></line>
														<line x1="5" y1="12" x2="19" y2="12"></line></svg
													><span class="truncate">{{
														account ? 'Edit payout method' : 'Add payout method'
													}}</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="space-y-2">
					<div>
						<h4>Payment methods</h4>
						<p class="text-sm opacity-50">
							When adding a new payment method, either remove the old one or go
							to your projects' subscription to explicitly update the payment
							method. Marking a payment method as "default" is only relevant for
							new projects or if there are no other payment methods on your
							account.
						</p>
					</div>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div class="px-6 py-4">
										<div class="space-y-2">
											<div v-if="loading" class="px-6 py-4">
												<div class="flex items-center justify-center">
													<svg
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
												</div>
											</div>
											<div
												v-else-if="paymentMethods.length === 0 && !loading"
												class="px-6 py-4"
											>
												<div class="flex items-center space-x-2 opacity-50">
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
														<rect
															x="1"
															y="4"
															width="22"
															height="16"
															rx="2"
															ry="2"
														></rect>
														<line x1="1" y1="10" x2="23" y2="10"></line>
													</svg>
													<p class="text-sm">No payments methods</p>
												</div>
											</div>
											<div
												v-else
												v-for="method in paymentMethods"
												:key="method.id"
												class="flex items-center justify-between"
											>
												<div class="flex items-center space-x-8">
													<img
														alt="Credit card brand"
														:src="
															method.card.brand === 'visa' ? visa : mastercard
														"
														width="32"
													/>
													<div
														class="grid w-64 gap-2 text-sm leading-4 md:grid md:grid-cols-12"
													>
														<div class="col-span-12">
															<div class="">
																<div class="relative">
																	<input
																		id=""
																		name=""
																		type="text"
																		class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																		readonly=""
																		:value="`•••• •••• •••• ${method.card.last4}`"
																	/>
																</div>
															</div>
															<p
																data-state="hide"
																class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
															></p>
														</div>
													</div>
													<span
														v-if="
															customer.invoice_settings
																.default_payment_method === method.id
														"
														class="text-gray-1100 inline-flex items-center rounded-full border border-gray-700 bg-gray-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
														>Default</span
													>
													<p class="text-sm tabular-nums">
														Expires: {{ method.card.exp_month }}/{{
															method.card.exp_year
														}}
													</p>
												</div>
												<button data-state="closed">
													<span
														class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><svg
															xmlns="http://www.w3.org/2000/svg"
															width="14"
															height="14"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon"
														>
															<line x1="18" y1="6" x2="6" y2="18"></line>
															<line x1="6" y1="6" x2="18" y2="18"></line></svg
													></span>
												</button>
											</div>
										</div>
									</div>
								</div>
								<div
									class="border-panel-border-interior-light bg-panel-footer-light dark:border-panel-border-interior-dark dark:bg-panel-footer-dark border-t"
								>
									<div class="flex h-12 items-center px-6">
										<div class="flex w-full justify-between">
											<div></div>
											<div>
												<button
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
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<line x1="12" y1="5" x2="12" y2="19"></line>
														<line x1="5" y1="12" x2="19" y2="12"></line></svg
													><span class="truncate">Add new card</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="container my-4 max-w-4xl">
					<h4>Billing email</h4>
					<p class="text-sm opacity-50">
						All billing correspondence will go to this email
					</p>
					<div class="mt-3">
						<form id="org-billing-email">
							<div
								class="bg-scale-100 dark:bg-scale-300 border-scale-400 overflow-hidden rounded-md border shadow"
							>
								<div class="divide-scale-400 flex flex-col gap-0 divide-y">
									<div
										class="-mx-2 block grid grid-cols-12 gap-6 px-8 py-8 opacity-100"
									>
										<div
											class="undefined undefined relative col-span-12 flex flex-col gap-6 lg:col-span-7"
										>
											<div
												class="grid gap-2 text-sm leading-4 md:grid md:grid-cols-12"
											>
												<div
													class="col-span-12 flex flex-row justify-between space-x-2"
												>
													<label
														class="text-scale-1100 block text-sm leading-4"
														for="billing_email"
														>Email address</label
													>
												</div>
												<div class="col-span-12">
													<div class="">
														<div class="relative">
															<input
																id="billing_email"
																name=""
																type="text"
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																v-model="email"
															/>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
													></p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="border-scale-400 border-t"></div>
								<div class="flex px-8 py-4">
									<div class="flex w-full items-center justify-end gap-2">
										<div class="flex items-center gap-2">
											<button
												class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												disabled=""
												type="reset"
											>
												<span class="truncate">Cancel</span></button
											><button
												form="org-billing-email"
												class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												disabled=""
												type="submit"
											>
												<span class="truncate">Save</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="space-y-2">
					<div>
						<h4>Billing address</h4>
						<p class="text-sm opacity-50">
							This will be reflected in every invoice
						</p>
					</div>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<form>
										<div class="w-3/5 space-y-2 px-6 py-4">
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div class="col-span-12">
													<div class="">
														<div class="relative">
															<input
																id="line1"
																name="line1"
																placeholder="Address line 1"
																type="text"
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																value=""
															/>
															<div
																data-lastpass-icon-root="true"
																style="
																	position: relative !important;
																	height: 0px !important;
																	width: 0px !important;
																	float: left !important;
																"
															></div>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
												</div>
											</div>
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div class="col-span-12">
													<div class="">
														<div class="relative">
															<input
																id="line2"
																name="line2"
																placeholder="Address line 2"
																type="text"
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																value=""
															/>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
												</div>
											</div>
											<div class="flex items-center space-x-2">
												<div
													class="grid w-full gap-2 text-sm md:grid md:grid-cols-12"
												>
													<div class="col-span-12">
														<div class="">
															<button
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
																name="country"
																id="country"
																type="button"
																aria-haspopup="menu"
																aria-expanded="false"
																data-state="closed"
															>
																<span
																	class="flex w-full flex-row items-center space-x-3"
																	><span class="truncate">---</span></span
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
												<div
													class="grid w-full gap-2 text-sm md:grid md:grid-cols-12"
												>
													<div class="col-span-12">
														<div class="">
															<div class="relative">
																<input
																	id="postal_code"
																	name="postal_code"
																	placeholder="Postal code"
																	type="text"
																	class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																	value=""
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
											<div class="flex items-center space-x-2">
												<div
													class="grid w-full gap-2 text-sm md:grid md:grid-cols-12"
												>
													<div class="col-span-12">
														<div class="">
															<div class="relative">
																<input
																	id="city"
																	name="city"
																	placeholder="City"
																	type="text"
																	class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																	value=""
																/>
															</div>
														</div>
														<p
															data-state="hide"
															class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
														></p>
													</div>
												</div>
												<div
													class="grid w-full gap-2 text-sm md:grid md:grid-cols-12"
												>
													<div class="col-span-12">
														<div class="">
															<div class="relative">
																<input
																	id="state"
																	name="state"
																	placeholder="State"
																	type="text"
																	class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																	value=""
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
										</div>
										<div class="border-scale-400 border-t"></div>
										<div class="flex justify-between px-6 py-4">
											<div></div>
											<div class="flex items-center space-x-2">
												<button
													class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													disabled=""
													type="reset"
												>
													<span class="truncate">Cancel</span></button
												><button
													class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													disabled=""
													type="submit"
												>
													<span class="truncate">Save</span>
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="space-y-2">
					<div>
						<h4>Tax ID</h4>
						<p class="text-sm opacity-50">
							If you would like to include specific tax ID(s) to your invoices.
							<br />Make sure the tax ID looks exactly like the placeholder
							text.
						</p>
					</div>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div class="w-8/12 space-y-4 px-6 py-4">
										<div>
											<p
												class="text-scale-900 flex items-center space-x-2 text-sm"
											>
												No tax IDs
											</p>
										</div>
										<div
											class="flex cursor-pointer items-center space-x-2 opacity-50 transition hover:opacity-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon"
											>
												<line x1="12" y1="5" x2="12" y2="19"></line>
												<line x1="5" y1="12" x2="19" y2="12"></line>
											</svg>
											<p class="text-sm">Add another ID</p>
										</div>
									</div>
								</div>
								<div
									class="border-panel-border-interior-light bg-panel-footer-light dark:border-panel-border-interior-dark dark:bg-panel-footer-dark border-t"
								>
									<div class="flex h-12 items-center px-6">
										<div class="flex w-full justify-between">
											<div></div>
											<div class="flex items-center space-x-2">
												<button
													class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													disabled=""
													type="reset"
												>
													<span class="truncate">Cancel</span></button
												><button
													class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													disabled=""
													type="submit"
												>
													<span class="truncate">Save</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
		<!-- <OverlayPayout/> -->
	</div>
</template>
