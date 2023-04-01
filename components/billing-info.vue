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
			<section aria-labelledby="payment-details-heading" v-if="true">
				<fieldset
					:disabled="
						User.systemRole !== 'owner' && User.systemRole !== 'super_admin'
					"
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
		SparklesIcon,
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
		 trayWorkspaceId,
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

	const handleCheckout = async (product, type, customer) => {
		const { url } = await $fetch('/api/stripe/checkout', {
			method: 'post',
			body: {
				product,
				type,
				customer,
				account: User.Account,
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
			priceMonthly: 1800,
			priceYearly: 18000,
			limit: 'Up to 25 active requests',
		},
		{
			name: 'Enterprise',
			id: 'enterprise',
			priceMonthly: 5400,
			priceYearly: 54000,
			limit: 'Unlimited active requests',
		},
	];
	const { data: payments } = await $fetch(
		`/api/stripe/invoices/${User.Account.stripeCustomerId}`
	);

	const selectedPlan = ref(plans[0]);
	const annualBillingEnabled = ref(false);
</script>
