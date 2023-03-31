<template>
	<div class="">
		<div
			class="mt-4 rounded-md bg-red-50 p-4"
			v-if="User.systemRole !== 'owner' && User.systemRole !== 'super_admin'"
		>
			<div class="flex">
				<div class="flex-shrink-0">
					<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-red-800">
						You currently don't have access to change billing details
					</h3>

					<span class="mt-2 text-sm text-red-700">
						Contact an owner to request these changes.
					</span>
				</div>
			</div>
		</div>
		<div class="mt-4 space-y-6 lg:px-0">
			<section aria-labelledby="payment-details-heading" v-if="false">
				<fieldset
					:disabled="User.systemRole !== 'owner' && User.systemRole !== 'super_admin'"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden sm:rounded-md">
						<div class="bg-white pb-6">
							<div>
								<h2
									id="payment-details-heading"
									class="text-lg font-medium leading-6 text-gray-900"
								>
									Payment details
								</h2>
								<p class="mt-1 text-sm text-gray-500">
									Update your billing information. Please note that updating
									your location could affect your tax rates.
								</p>
							</div>

							<div class="mt-6 grid grid-cols-4 gap-6">
								<div class="col-span-4 sm:col-span-2">
									<label
										for="first-name"
										class="block text-sm font-medium leading-6 text-gray-900"
										>First name</label
									>
									<input
										type="text"
										name="first-name"
										id="first-name"
										autocomplete="cc-given-name"
										class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
									/>
								</div>

								<div class="col-span-4 sm:col-span-2">
									<label
										for="last-name"
										class="block text-sm font-medium leading-6 text-gray-900"
										>Last name</label
									>
									<input
										type="text"
										name="last-name"
										id="last-name"
										autocomplete="cc-family-name"
										class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
									/>
								</div>

								<div class="col-span-4 sm:col-span-2">
									<label
										for="email-address"
										class="block text-sm font-medium leading-6 text-gray-900"
										>Email address</label
									>
									<input
										type="text"
										name="email-address"
										id="email-address"
										autocomplete="email"
										class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
									/>
								</div>

								<div class="col-span-4 sm:col-span-1">
									<label
										for="expiration-date"
										class="block text-sm font-medium leading-6 text-gray-900"
										>Expration date</label
									>
									<input
										type="text"
										name="expiration-date"
										id="expiration-date"
										autocomplete="cc-exp"
										class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
										placeholder="MM / YY"
									/>
								</div>

								<div class="col-span-4 sm:col-span-1">
									<label
										for="security-code"
										class="flex items-center text-sm font-medium leading-6 text-gray-900"
									>
										<span>Security code</span>
										<QuestionMarkCircleIcon
											class="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
											aria-hidden="true"
										/>
									</label>
									<input
										type="text"
										name="security-code"
										id="security-code"
										autocomplete="cc-csc"
										class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
									/>
								</div>

								<div class="col-span-4 sm:col-span-2">
									<label
										for="country"
										class="block text-sm font-medium leading-6 text-gray-900"
										>Country</label
									>
									<select
										id="country"
										name="country"
										autocomplete="country-name"
										class="mt-2 block w-full rounded-md border-0 bg-white py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
									>
										<option>United States</option>
										<option>Canada</option>
										<option>Mexico</option>
									</select>
								</div>

								<div class="col-span-4 sm:col-span-2">
									<label
										for="postal-code"
										class="block text-sm font-medium leading-6 text-gray-900"
										>ZIP / Postal code</label
									>
									<input
										type="text"
										name="postal-code"
										id="postal-code"
										autocomplete="postal-code"
										class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
							<button
								type="submit"
								class="inline-flex justify-center rounded-md bg-gray-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
							>
								Save
							</button>
						</div>
					</div>
				</fieldset>
			</section>
			<!-- Plan -->
			<section aria-labelledby="plan-heading">
				<fieldset
					:disabled="User.systemRole !== 'owner' && User.systemRole !== 'super_admin'"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden sm:rounded-md">
						<div class="space-y-6 bg-white py-6">
							<div>
								<h2
									id="plan-heading"
									class="text-lg font-medium leading-6 text-gray-900"
								>
									Plan
								</h2>
							</div>

							<RadioGroup v-model="selectedPlan">
								<RadioGroupLabel class="sr-only">
									Pricing plans
								</RadioGroupLabel>
								<div class="relative -space-y-px rounded-md bg-white">
									<RadioGroupOption
										as="template"
										v-for="(plan, planIdx) in plans"
										:key="plan.name"
										:value="plan"
										v-slot="{ checked, active }"
									>
										<div
											:class="[
												planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
												planIdx === plans.length - 1
													? 'rounded-bl-md rounded-br-md'
													: '',
												checked
													? 'z-10 border-indigo-200 bg-indigo-50'
													: 'border-gray-200',
												'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pr-6',
											]"
										>
											<span class="flex items-center text-sm">
												<span
													:class="[
														checked
															? 'border-transparent bg-indigo-500'
															: 'border-gray-300 bg-white',
														active ? 'ring-2 ring-gray-900 ring-offset-2' : '',
														'flex h-4 w-4 items-center justify-center rounded-full border',
													]"
													aria-hidden="true"
												>
													<span class="h-1.5 w-1.5 rounded-full bg-white" />
												</span>
												<RadioGroupLabel
													as="div"
													class="ml-3 flex items-center font-medium text-gray-900"
													><img
														src="~/assets/images/logo.png"
														class="mr-2 h-5 w-5"
													/>{{ plan.name }}</RadioGroupLabel
												>
											</span>
											<RadioGroupDescription
												as="div"
												class="ml-6 items-center pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
											>
												<span
													:class="[
														checked ? 'text-indigo-900' : 'text-gray-900',
														'font-medium',
													]"
													>${{ plan.priceMonthly.toLocaleString() }} / mo</span
												>
												{{ ' ' }}
												<span
													:class="checked ? 'text-indigo-700' : 'text-gray-500'"
													>(${{ plan.priceYearly.toLocaleString() }} / yr)</span
												>
											</RadioGroupDescription>
											<RadioGroupDescription
												as="span"
												:class="[
													checked ? 'text-indigo-700' : 'text-gray-500',
													'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right',
												]"
												>{{ plan.limit }}</RadioGroupDescription
											>
										</div>
									</RadioGroupOption>
								</div>
							</RadioGroup>

							<SwitchGroup as="div" class="flex items-center">
								<Switch
									v-model="annualBillingEnabled"
									:class="[
										annualBillingEnabled ? 'bg-indigo-500' : 'bg-gray-200',
										'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ',
									]"
								>
									<span
										aria-hidden="true"
										:class="[
											annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
											'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
										]"
									/>
								</Switch>
								<SwitchLabel as="span" class="ml-3 text-sm">
									<span class="font-medium text-gray-900">Annual billing</span>
									{{ ' ' }}
									<span class="text-gray-500">(Save 10%)</span>
								</SwitchLabel>
							</SwitchGroup>
						</div>
						<div class="space-x-3 bg-gray-50 px-3 py-3 text-right sm:px-3">
							<button
								v-if="User.subscription"
								type="submit"
								class="inline-flex justify-center rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 ring-1 ring-gray-400 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
							>
								Cancel subscription
							</button>
							<button
								@click="
									handleCheckout(
										{ id: selectedPlan.id },
										'retainer',
										User.Account.stripeCustomerId,
										User.Account.subscription
									)
								"
								class="inline-flex justify-center rounded-md bg-indigo-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
							>
								Change plan
							</button>
						</div>
					</div>
				</fieldset>
			</section>

			<!-- Billing history -->
			<section aria-labelledby="billing-history-heading">
				<div class="bg-white pt-6 sm:overflow-hidden sm:rounded-md">
					<div class="">
						<h2
							id="billing-history-heading"
							class="text-lg font-medium leading-6 text-gray-900"
						>
							Billing history
						</h2>
					</div>
					<div class="mt-6 flex flex-col">
						<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div
								class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
							>
								<div class="overflow-hidden border-t border-gray-200">
									<table class="min-w-full divide-y divide-gray-200">
										<thead class="bg-gray-50">
											<tr>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-semibold text-gray-900"
												>
													Date
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-semibold text-gray-900"
												>
													Description
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-semibold text-gray-900"
												>
													Amount
												</th>
												<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
												<th
													scope="col"
													class="relative px-6 py-3 text-left text-sm font-medium text-gray-500"
												>
													<span class="sr-only">View receipt</span>
												</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-200 bg-white">
											<tr v-for="payment in payments" :key="payment.id">
												<td
													class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
												>
													<span>{{
														format(
															new Date(payment.created * 1000),
															'MMM dd, yyyy'
														)
													}}</span>
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
												>
													{{ payment.number }}
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
												>
													${{ (payment.amount_due / 100).toLocaleString() }}
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
												>
													<a
														:href="payment.hosted_invoice_url"
														target="_blank"
														class="text-indigo-600 hover:text-indigo-900"
														>View receipt</a
													>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
	} from '@headlessui/vue';
	import {
		MagnifyingGlassIcon,
		QuestionMarkCircleIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	import {
		Bars3Icon,
		BellIcon,
		ExclamationTriangleIcon,
		CogIcon,
		CreditCardIcon,
		KeyIcon,
		SquaresPlusIcon,
		UserCircleIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format } from 'date-fns';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 billingEmail,
		 stripeCustomerId,
		 Subscription(*),
		 Team (
			id,
			name
		 )
	   )`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	console.log(User);

	const handleCheckout = async (product, type, customer, subscription) => {
		const { url } = await $fetch('/api/stripe/checkout', {
			method: 'post',
			body: {
				customer,
				subscription,
				product,
				type,
			},
		});
		location.href = url;
	};

	const navigation = [
		{ name: 'Dashboard', href: '#' },
		{ name: 'Jobs', href: '#' },
		{ name: 'Applicants', href: '#' },
		{ name: 'Company', href: '#' },
	];
	const userNavigation = [
		{ name: 'Your Profile', href: '#' },
		{ name: 'Settings', href: '#' },
		{ name: 'Sign out', href: '#' },
	];

	const plans = [
		{
			name: 'Free',
			id: 'free',
			priceMonthly: 0,
			priceYearly: 0,
			limit: 'No requests',
		},
		{
			name: 'Support',
			id: 'support',
			priceMonthly: 600,
			priceYearly: 6000,
			limit: 'Up to 5 active requests',
		},
		{
			name: 'Growth',
			id: 'growth',
			priceMonthly: 2000,
			priceYearly: 20000,
			limit: 'Up to 25 active requests',
		},
		{
			name: 'Enterprise',
			id: 'enterprise',
			priceMonthly: 5000,
			priceYearly: 50000,
			limit: 'Unlimited active requests',
		},
	];
	const { data: payments } = await $fetch(
		`/api/stripe/invoices/${User.Account.stripeCustomerId}`
	);

	console.log(payments);

	const selectedPlan = ref(plans[0]);
	const annualBillingEnabled = ref(true);
</script>
