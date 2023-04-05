<template>
	<div class="max-w-2xl">
		<warning-access :role="User.systemRole"/>
		<div class="mt-4 space-y-6">
			<section aria-labelledby="payment-details-heading" v-if="true">
				<fieldset
					:disabled="
						User.systemRole !== 'owner' && User.systemRole !== 'super_admin'
					"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden sm:rounded-md">
						<div class="pb-6">
							<div>
								<h2
									id="payment-details-heading"
									class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
								>
									Billing information
								</h2>
							</div>

							<div class="mt-6 grid grid-cols-4 gap-6">
								<div class="col-span-4 sm:col-span-2">
									<label
										for="email-address"
										class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
										>Billing email</label
									>
									<input
										v-model="billingEmail"
										type="text"
										name="email-address"
										id="email-address"
										autocomplete="email"
										class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 dark:text-white dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6 bg-slate-800"
									/>
									<p class="mt-2 text-xs text-slate-600 dark:text-slate-300">
										The invoices will be sent to this email
									</p>
								</div>
							</div>
						</div>
						<div class="space-x-4 px-4 py-3 text-right sm:px-6">
							<button
								@click="billingEmail = customer.email"
								class="inline-flex justify-center rounded-md border border-slate-400 py-2 px-3 text-sm font-semibold dark:text-slate-300 text-gray-900 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
							>
								Cancel
							</button>
							<button
								@click="
									handleUpdateStripe(User.Account.stripeCustomerId, {
										email: billingEmail,
									})
								"
								:disabled="loading"
								class="inline-flex justify-center rounded-md bg-gray-900 dark:bg-slate-700 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
							>
								{{ loading ? 'Loading' : 'Submit' }}
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
			`systemRole,Account(id,stripeCustomerId,Subscription(*))`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	

	const customer = await $fetch(
		`/api/stripe/customer/${User.Account.stripeCustomerId}`
	);
	const billingEmail = ref(customer.email);
	const loading = ref(false);

	const handleUpdateStripe = async (customer, values) => {
		loading.value = true;
		const { data } = await $fetch('/api/stripe/customer/update', {
			method: 'post',
			body: {
				customer,
				values,
			},
		});
		loading.value = false;
		return data;
	};

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
