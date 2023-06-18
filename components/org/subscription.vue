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

			paymentMethods.value = await getStripePaymentMethodData(
				accountData.stripe_customer_id
			);
		}

		console.log(customer.value);

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

	const handleReset = async () => {
		state.customer = await fetchData();
		state.loading = false;
		state.email = state.customer.email;
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
	<main class="flex-1 overflow-y-auto" style="max-height: 100vh">
		<div class="relative">
			<div
				class="absolute right-16 top-[1.9rem] z-10 flex items-center space-x-3 xl:right-32"
			>
				<div class="flex flex-row gap-6 text-xs">
					<div class="">
						<button
							type="button"
							id=""
							name=""
							class="focus:ring-scale-400 bg-scale-500 hover:bg-scale-700 !bg-brand-900 !hover:bg-brand-900 relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent p-0 outline-none transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-current"
						>
							<span
								aria-hidden="true"
								class="bg-scale-100 dark:bg-scale-900 inline-block !h-3 h-5 !w-3 w-5 translate-x-3 rounded-full shadow ring-0 transition duration-200 ease-in-out dark:bg-white"
							></span>
						</button>
					</div>
				</div>
				<p class="text-scale-1100 -translate-y-[1px] text-xs">
					Preview new interface
				</p>
			</div>
			<div class="border-b">
				<div
					class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-6 lg:px-16 2xl:px-32"
				>
					<h3 class="text-scale-1200 text-xl">Subscription</h3>
				</div>
			</div>
			<div class="border-b">
				<div
					class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
				>
					<div class="grid grid-cols-12 gap-6" id="plan">
						<div class="col-span-12 space-y-6 lg:col-span-5">
							<div class="sticky top-16 space-y-6">
								<p class="text-base">Subscription plan</p>
								<div class="text-scale-1000 text-sm">
									To manage your billing address, emails or Tax ID, head to your
									<a href="/org/gujvascqmaqhbcsazlwd/billing"
										><span
											class="hover:text-green-1000 text-sm text-green-900 transition"
											>organization settings</span
										>.</a
									>
								</div>
								<div class="space-y-2">
									<p class="text-scale-1100 text-sm">More information</p>
									<div>
										<a
											target="_blank"
											rel="noreferrer"
											href="https://supabase.com/pricing"
											><div
												class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
											>
												<p class="text-sm">Pricing</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon"
												>
													<path
														d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
													></path>
													<polyline points="15 3 21 3 21 9"></polyline>
													<line x1="10" y1="14" x2="21" y2="3"></line>
												</svg></div
										></a>
									</div>
								</div>
							</div>
						</div>
						<div class="col-span-12 space-y-6 lg:col-span-7">
							<div>
								<p class="text-sm">This project is currently on the plan:</p>
								<p class="text-brand-900 text-2xl uppercase">Pro</p>
							</div>
							<div>
								<button
									data-state="closed"
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<span class="truncate">Change subscription plan</span>
								</button>
							</div>
							<div
								class="bg-scale-400 border-scale-500 dark:bg-scale-100 dark:border-scale-300 relative flex items-start space-x-4 rounded-md border px-6 py-4"
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
											This project is limited by the included usage
										</h3>
										<div class="text-scale-1100 text-xs">
											<p class="text-scale-1000 text-sm">
												When this project exceeds its
												<a
													class="hover:text-green-1000 text-sm text-green-900 transition"
													href="/project/nsfipxnlucvgchlkqvqw/settings/billing/subscription#breakdown"
													>included usage quotas</a
												>, it may become unresponsive.
												<span
													>You can change the Cost Control settings if you plan
													on exceeding the included usage quotas.</span
												>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div class="flex w-full flex-col">
								<div class="flex justify-between space-x-8 pb-1 align-baseline">
									<p
										class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate pb-1 text-sm"
									>
										Current billing cycle (Jun 18 - Jul 18)
									</p>
									<p class="text-scale-1100 text-sm">29 Days left</p>
								</div>
								<div
									class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
								>
									<div
										class="bg-scale-1200 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
										style="width: 3.33333%"
									></div>
								</div>
							</div>
							<div class="relative">
								<div class="transition-opacity duration-300">
									<div
										class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
									>
										<div
											v-for="method in paymentMethods.filter(
												(v) =>
													customer.invoice_settings.default_payment_method ===
													v.id
											)"
											:key="method.id"
											class="bg-panel-body-light dark:bg-panel-body-dark"
										>
											<div
												class="flex flex-col justify-between space-y-6 px-6 py-4 md:flex-row md:space-y-0 lg:items-center"
											>
												<div
													class="text-scale-1000 flex items-center space-x-3 font-mono tracking-wide"
												>
													<img
														alt="Credit card brand"
														:src="
															method.card.brand === 'visa' ? visa : mastercard
														"
														width="24"
													/><span class="font-mono text-sm"
														>**** **** **** {{ method.card.last4 }}</span
													>
												</div>
												<div
													class="text-scale-1000 flex flex-row space-x-3 text-sm"
												>
													<span
														>Expires {{ method.card.exp_month }}/{{
															`${method.card.exp_year}`.slice(2)
														}}</span
													>
												</div>
												<div data-state="closed">
													<button
														class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														type="button"
													>
														<span class="truncate">Change</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="self-center">
						<div>
							<iframe
								src="https://newassets.hcaptcha.com/captcha/v1/672044a/static/hcaptcha.html#frame=checkbox&amp;id=26y0gvo4aij2&amp;host=app.supabase.com&amp;sentry=true&amp;reportapi=https%3A%2F%2Faccounts.hcaptcha.com&amp;recaptchacompat=true&amp;custom=false&amp;hl=en&amp;tplinks=on&amp;sitekey=4ca1fdb9-c9c9-4495-ba50-c85fc0e7ec1f&amp;size=invisible&amp;theme=light&amp;origin=https%3A%2F%2Fapp.supabase.com"
								tabindex="0"
								frameborder="0"
								scrolling="no"
								title="Widget containing checkbox for hCaptcha security challenge"
								aria-hidden="true"
								data-hcaptcha-widget-id="26y0gvo4aij2"
								data-hcaptcha-response=""
								style="display: none"
							></iframe
							><textarea
								id="g-recaptcha-response-26y0gvo4aij2"
								name="g-recaptcha-response"
								style="display: none"
							></textarea
							><textarea
								id="h-captcha-response-26y0gvo4aij2"
								name="h-captcha-response"
								style="display: none"
							></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="border-b">
				<div
					class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
				>
					<div class="grid grid-cols-12 gap-6" id="cost-control">
						<div class="col-span-12 lg:col-span-5">
							<div class="sticky top-16">
								<div class="space-y-6">
									<div>
										<p class="text-base">Cost Control</p>
										<p class="text-scale-1000 text-sm">
											Control whether to usage beyond your plans included quota
										</p>
									</div>
									<div class="space-y-2">
										<p class="text-scale-1100 text-sm">More information</p>
										<div>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/docs/guides/platform/spend-cap"
												><div
													class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
												>
													<p class="text-sm">Spend cap</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<path
															d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
														></path>
														<polyline points="15 3 21 3 21 9"></polyline>
														<line x1="10" y1="14" x2="21" y2="3"></line>
													</svg></div
											></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-span-12 space-y-6 lg:col-span-7">
							<p class="text-scale-1000 text-sm">
								You can control whether your project is charged for additional
								usage beyond the
								<a
									class="hover:text-green-1000 text-sm text-green-900 transition"
									href="/project/nsfipxnlucvgchlkqvqw/settings/billing/subscription#breakdown"
									>included quota</a
								>
								of your subscription plan. If you need to go beyond the included
								quota, simply switch off your spend cap to pay for additional
								usage.
							</p>
							<div class="flex space-x-6">
								<div>
									<div
										class="bg-scale-100 dark:bg-scale-400 h-[96px] w-[160px] rounded-md shadow"
									>
										<img
											alt="Spend Cap"
											width="160"
											height="96"
											:src="`~/assets/images/spend-cap-${'on'}${'--light'}.png`"
										/>
									</div>
								</div>
								<div>
									<p class="mb-1">Spend cap is enabled</p>
									<p class="text-scale-1000 text-sm">
										<span
											>You won't be charged any extra for usage. However, your
											project could become unresponsive or enter read only mode
											if you exceed the included quota.</span
										>
									</p>
									<button
										data-state="closed"
										class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative mt-4 inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										type="button"
									>
										<span class="truncate">Change spend cap</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="border-b">
				<div
					class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
				>
					<div class="grid grid-cols-12 gap-6" id="addons">
						<div class="col-span-12 lg:col-span-5">
							<div class="sticky top-16">
								<div class="space-y-6">
									<div>
										<p class="text-base">Add ons</p>
										<p class="text-scale-1000 text-sm">
											Level up your project with add-ons
										</p>
									</div>
									<div class="space-y-2">
										<p class="text-scale-1100 text-sm">More information</p>
										<div>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/docs/guides/platform/compute-add-ons"
												><div
													class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
												>
													<p class="text-sm">Compute add-ons</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<path
															d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
														></path>
														<polyline points="15 3 21 3 21 9"></polyline>
														<line x1="10" y1="14" x2="21" y2="3"></line>
													</svg></div
											></a>
										</div>
										<div>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/docs/guides/platform/backups#point-in-time-recovery"
												><div
													class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
												>
													<p class="text-sm">PITR backups</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<path
															d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
														></path>
														<polyline points="15 3 21 3 21 9"></polyline>
														<line x1="10" y1="14" x2="21" y2="3"></line>
													</svg></div
											></a>
										</div>
										<div>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/docs/guides/platform/custom-domains"
												><div
													class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
												>
													<p class="text-sm">Custom domains</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<path
															d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
														></path>
														<polyline points="15 3 21 3 21 9"></polyline>
														<line x1="10" y1="14" x2="21" y2="3"></line>
													</svg></div
											></a>
										</div>
										<div>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler"
												><div
													class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
												>
													<p class="text-sm">Connection Pooler</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<path
															d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
														></path>
														<polyline points="15 3 21 3 21 9"></polyline>
														<line x1="10" y1="14" x2="21" y2="3"></line>
													</svg></div
											></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-span-12 space-y-6 lg:col-span-7">
							<div class="space-y-6 py-2">
								<div class="flex space-x-6">
									<div>
										<div
											class="bg-scale-100 dark:bg-scale-400 h-[96px] w-[160px] rounded-md shadow"
										>
											<img
												alt="Optimized Compute"
												width="160"
												height="96"
												src="/img/optimized-compute-off.png"
											/>
										</div>
									</div>
									<div class="flex-grow">
										<p class="text-scale-1000 text-sm">Optimized compute</p>
										<p class="">Micro</p>
										<button
											data-state="closed"
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative mt-2 inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<span class="truncate">Change optimized compute</span>
										</button>
										<div
											class="mt-2 flex w-full items-center justify-between border-b py-2"
										>
											<a
												href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#ram"
												><div class="group flex items-center space-x-2">
													<p
														class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
													>
														Memory
													</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
													>
														<polyline points="9 18 15 12 9 6"></polyline>
													</svg></div
											></a>
											<p class="text-sm">1 GB</p>
										</div>
										<div
											class="flex w-full items-center justify-between border-b py-2"
										>
											<a
												href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#cpu"
												><div class="group flex items-center space-x-2">
													<p
														class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
													>
														CPU
													</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
													>
														<polyline points="9 18 15 12 9 6"></polyline>
													</svg></div
											></a>
											<p class="text-sm">2-core ARM (Shared)</p>
										</div>
										<div
											class="flex w-full items-center justify-between border-b py-2"
										>
											<p class="text-scale-1000 text-sm">
												No. of direct connections
											</p>
											<p class="text-sm">60</p>
										</div>
										<div
											class="flex w-full items-center justify-between border-b py-2"
										>
											<p class="text-scale-1000 text-sm">
												No. of pooler connections
											</p>
											<p class="text-sm">200</p>
										</div>
										<div
											class="flex w-full items-center justify-between border-b py-2"
										>
											<a
												href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#disk_io"
												><div class="group flex items-center space-x-2">
													<p
														class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
													>
														Max Disk Throughput
													</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
													>
														<polyline points="9 18 15 12 9 6"></polyline>
													</svg></div
											></a>
											<p class="text-sm">2,085 Mbps</p>
										</div>
										<div class="flex w-full items-center justify-between py-2">
											<a
												href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#disk_io"
												><div class="group flex items-center space-x-2">
													<p
														class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
													>
														Baseline Disk Throughput
													</p>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
													>
														<polyline points="9 18 15 12 9 6"></polyline>
													</svg></div
											></a>
											<p class="text-sm">87 Mbps</p>
										</div>
									</div>
								</div>
								<div class="w-full border-t"></div>
								<div class="flex space-x-6">
									<div>
										<div
											class="bg-scale-100 dark:bg-scale-400 h-[96px] w-[160px] rounded-md shadow"
										>
											<img
												alt="Point-In-Time-Recovery"
												width="160"
												height="96"
												src="/img/pitr-off.png?v=2"
											/>
										</div>
									</div>
									<div>
										<p class="text-scale-1000 text-sm">
											Point in time recovery
										</p>
										<p class="">Point in time recovery is not enabled</p>
										<button
											data-state="closed"
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative mt-2 inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<span class="truncate"
												>Change point in time recovery</span
											>
										</button>
									</div>
								</div>
								<div class="w-full border-t"></div>
								<div class="flex space-x-6">
									<div>
										<div
											class="bg-scale-100 dark:bg-scale-400 h-[96px] w-[160px] rounded-md shadow"
										>
											<img
												alt="Custom Domain"
												width="160"
												height="96"
												src="/img/custom-domain-off.png"
											/>
										</div>
									</div>
									<div>
										<p class="text-scale-1000 text-sm">Custom domain</p>
										<p class="">Custom domain is not enabled</p>
										<button
											data-state="closed"
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative mt-2 inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<span class="truncate">Change custom domain</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="border-b">
				<div
					class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
				>
					<div class="grid grid-cols-12 gap-6" id="breakdown">
						<div class="col-span-12 lg:col-span-5">
							<div class="sticky top-16">
								<p class="text-base">Billing breakdown</p>
								<p class="text-scale-1000 text-sm">
									Current billing cycle: Jun 18 - Jul 18
								</p>
							</div>
						</div>
						<div class="col-span-12 space-y-6 lg:col-span-7">
							<p class="text-sm">Included usage summary</p>
							<p class="text-scale-1000 text-sm">
								Your plan includes a limited amount of usage. If the usage on
								your project exceeds these quotas, you may experience
								restrictions, as you are currently not billed for overage. It
								may take up to 24 hours for usage stats to update.
							</p>
							<div class="grid grid-cols-12">
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:border-r md:pr-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#dbSize"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Database space
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												76.28 MB of 8 GB
											</p>
											<p class="text-scale-1100 text-sm">0.93%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0.931145%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:pl-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#dbEgress"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Database egress
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 bytes of 50 GB
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:border-r md:pr-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#mau"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Active users
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 of 100,000
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:pl-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#mauSso"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Active SSO users
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 of 50
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:border-r md:pr-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#storageSize"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Storage space
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												53.96 MB of 100 GB
											</p>
											<p class="text-scale-1100 text-sm">0.05%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0.052694%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:pl-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#storageEgress"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Storage egress
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 bytes of 200 GB
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:border-r md:pr-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#storageImageTransformations"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Storage Image Transformations
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 of 100
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:pl-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#realtimePeakConnections"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Realtime peak connections
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 of 500
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 border-b py-4 md:col-span-6 md:border-r md:pr-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#realtimeMessageCount"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Realtime messages
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 of 5,000,000
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 py-4 md:col-span-6 md:pl-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#funcInvocations"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Edge Function invocations
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 of 2,000,000
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
								<div
									class="border-scale-400 col-span-12 space-y-4 py-4 md:col-span-6 md:border-r md:pr-4"
								>
									<div class="flex items-center justify-between">
										<a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/usage#funcCount"
											><div class="group flex items-center space-x-2">
												<p
													class="text-scale-1100 group-hover:text-scale-1200 cursor-pointer text-sm transition"
												>
													Edge Functions
												</p>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
												>
													<polyline points="9 18 15 12 9 6"></polyline>
												</svg></div
										></a>
									</div>
									<div class="flex w-full flex-col">
										<div
											class="flex justify-between space-x-8 pb-1 align-baseline"
										>
											<p
												class="text-scale-1200 capitalize-sentence !text-scale-1000 max-w-[75%] truncate text-sm"
											>
												0 of 100
											</p>
											<p class="text-scale-1100 text-sm">0.00%</p>
										</div>
										<div
											class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
										>
											<div
												class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
												style="width: 0%"
											></div>
										</div>
									</div>
								</div>
							</div>
							<p class="!mt-10 text-sm">Upcoming cost for next invoice</p>
							<p class="text-scale-1000 text-sm">
								The following table shows your upcoming costs. Depending on your
								usage, the final amount may vary. Next invoice on
								<span class="text-scale-1100">Jul 18, 2023</span>.
							</p>
							<table class="w-full">
								<thead>
									<tr class="border-b">
										<th
											class="text-scale-1000 w-1/2 py-2 text-left text-sm font-normal"
										>
											Item
										</th>
										<th
											class="text-scale-1000 py-2 text-left text-sm font-normal"
										>
											Count
										</th>
										<th
											class="text-scale-1000 py-2 text-left text-sm font-normal"
										>
											Unit price
										</th>
										<th
											class="text-scale-1000 py-2 text-right text-sm font-normal"
										>
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class="border-b">
										<td class="py-2 text-sm">Pro plan</td>
										<td class="py-2 text-sm">1</td>
										<td class="py-2 text-sm">$25</td>
										<td class="py-2 text-right text-sm">$25</td>
									</tr>
								</tbody>
								<tbody>
									<tr>
										<td class="py-2 text-sm">Total</td>
										<td class="py-2 text-sm"></td>
										<td class="py-2 text-sm"></td>
										<td class="py-2 text-right text-sm">$25</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
