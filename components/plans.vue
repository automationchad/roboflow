<template>
	<div class="h-full">
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
			<!-- Plan -->
			<section aria-labelledby="plan-heading">
				<fieldset
					:disabled="
						User.systemRole !== 'owner' && User.systemRole !== 'super_admin'
					"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden">
						<div class="space-y-6 bg-white p-6 dark:bg-slate-900">
							<div class="space-x-3 bg-gray-50 text-right dark:bg-transparent">
								<button
									@click="
										handleCheckout(
											{ id: selectedPlan.id },
											'retainer',
											User.Account.stripeCustomerId,
											User.Account.subscription
										)
									"
									class="inline-flex items-center justify-center rounded-md py-2 px-3 text-sm font-normal text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-slate-700"
								>
									<PencilIcon class="mr-1 h-4 w-4" />
									Change retainer
								</button>
							</div>

							<ul
								role="list"
								class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
							>
								<li
									v-for="plan in plans"
									:key="plan.id"
									class="col-span-1 flex flex-col rounded-lg border bg-white text-center shadow dark:border-slate-700 dark:bg-slate-800"
								>
									<div class="flex flex-1 flex-col p-8">
										<img
											class="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
											:src="plan.image"
											alt=""
										/>
										<h3 class="mt-6 text-sm font-medium text-gray-900">
											{{ plan.name }}
										</h3>
										<dl class="mt-1 flex flex-grow flex-col justify-between">
											<dt class="sr-only">Title</dt>
											<dd class="text-sm text-gray-500">{{ plan.title }}</dd>
											<dt class="sr-only">Role</dt>
										</dl>
									</div>
									<div>
										<div class="my-8 flex items-center justify-center">
											<div
												class="rounded-lg px-8 py-1 text-lime-400"
												v-if="plan.id === 'free'"
											>
												Your selected plan
											</div>
											<button
												v-else
												class="rounded-lg bg-indigo-500 px-8 py-1 text-white"
											>
												Select
											</button>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</fieldset>
			</section>
			<!-- Add Ons -->
			<section aria-labelledby="plan-heading">
				<fieldset
					:disabled="
						User.systemRole !== 'owner' && User.systemRole !== 'super_admin'
					"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden">
						<div class="space-y-6 bg-white p-6 dark:bg-slate-800">
							<div class="flex justify-between">
								<h2 class="font-semibold text-white">Add ons</h2>
								<button
									@click="
										User.Account.trayWorkspaceId
											? handleCheckout(
													{ id: selectedPlan.id },
													'retainer',
													User.Account.stripeCustomerId,
													User.Account.subscription
											  )
											: handleCheckout(
													{},
													'add_on',
													User.Account.stripeCustomerId
											  )
									"
									class="inline-flex items-center rounded-lg bg-black py-2 px-3 text-sm font-medium text-white shadow"
								>
									<SparklesIcon class="mr-1 h-5 w-5" />{{
										User.Account.trayWorkspaceId
											? 'Manage License'
											: 'Upgrade License'
									}}
								</button>
							</div>
							<div class="py-12 text-center text-sm text-slate-400">
								No add on added
							</div>
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
		PencilIcon,
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
			image: '@/assets/images/plans/waitlist.png',
			priceMonthly: 0,
			priceYearly: 0,
			limit: 'No requests',
		},
		{
			name: 'Support',
			id: 'support',
			image: '~/assets/images/plans/support.png',
			priceMonthly: 600,
			priceYearly: 6000,
			limit: 'Up to 5 active requests',
		},
		{
			name: 'Growth',
			id: 'growth',
			image: '~/assets/images/plans/growth.png',
			priceMonthly: 1800,
			priceYearly: 18000,
			limit: 'Up to 25 active requests',
		},
		{
			name: 'Enterprise',
			id: 'enterprise',
			image: '~/assets/images/plans/enterprise.png',
			priceMonthly: 5400,
			priceYearly: 54000,
			limit: 'Unlimited active requests',
		},
	];

	const people = [
		{
			name: 'Jane Cooper',
			title: 'Paradigm Representative',
			role: 'Admin',
			email: 'janecooper@example.com',
			telephone: '+1-202-555-0170',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
		},
		// More people...
	];
	const { data: payments } = await $fetch(
		`/api/stripe/invoices/${User.Account.stripeCustomerId}`
	);

	const selectedPlan = ref(plans[0]);
	const annualBillingEnabled = ref(false);
</script>
