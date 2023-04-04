<template>
	<div class="h-full">
		<div
			class="mt-4 rounded-md bg-yellow-50 p-4"
			v-if="User.systemRole !== 'owner' && User.systemRole !== 'super_admin'"
		>
			<div class="flex">
				<div class="flex-shrink-0">
					<ExclamationTriangleIcon
						class="h-5 w-5 text-yellow-400"
						aria-hidden="true"
					/>
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-yellow-800">
						You currently don't have access to change org settings
					</h3>
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
						<div role="tabpanel" class="mt-4">
							<div class="space-y-8">
								<div class="dark:text-white" id="profile">
									<div class="">
										<div class="mb-4 flex border-b border-slate-300 py-8">
											<h4 class="font-semibold">Organization</h4>
										</div>

										<ul class="space-y-4">
											<li class="flex items-center justify-between">
												<div class="">
													<div class="flex flex-col">
														<small>Name</small>{{ User.Account.name }}
													</div>
												</div>
												<div class="ml-2">
													<button class="p-2">
														<PencilIcon class="h-5 w-5" />
													</button>
												</div>
											</li>
											<li class="flex items-center justify-between">
												<div class="">
													<div class="flex flex-col">
														<small>Organization ID</small>{{ User.Account.id }}
													</div>
												</div>
												<div class="ml-2">
													<button class="p-2">
														<PencilIcon class="h-5 w-5" />
													</button>
												</div>
											</li>
										</ul>
									</div>
								</div>
								<div id="danger">
									<div>
										<div
											class="mb-4 flex border-b border-slate-300 py-8 dark:text-white"
										>
											<h4 class="font-semibold">Danger zone</h4>
										</div>

										<div class="flex items-center justify-between">
											<div class="flex flex-col dark:text-white">
												Delete organization<small class="text-slate-600"
													>Delete the organization and all data associated with
													it. This action cannot be reverted.</small
												>
											</div>

											<div class="ml-2">
												<button
													disabled
													class="group rounded-lg bg-red-100 p-1 disabled:bg-slate-700 dark:bg-red-800"
												>
													<TrashIcon
														class="h-5 w-5 text-red-600 group-disabled:text-slate-300 dark:text-red-200"
													/>
												</button>
											</div>
										</div>
										<div class="mt-4 flex items-center justify-between">
											<div class="flex flex-col dark:text-white">
												Leave organization<small class="text-slate-600"
													>Are you sure you want to leave this
													organization?</small
												>
											</div>

											<div class="ml-2">
												<button
													disabled
													class="group rounded-lg bg-red-100 p-1 disabled:bg-slate-700 dark:bg-red-800"
												>
													<UserMinusIcon
														class="h-5 w-5 text-red-600 group-disabled:text-slate-300 dark:text-red-200"
													/>
												</button>
											</div>
										</div>
									</div>
								</div>
								<div class="text-slate-500">
									<div class="flex flex-col">
										<small
											>Motis Group<a
												href="https://robocorp.com/terms-of-use"
												target="_blank"
												rel="noreferrer"
												class="text-indigo-500"
											>
												terms of use</a
											>
											and<a
												href="https://robocorp.com/privacy-policy"
												target="_blank"
												rel="noreferrer"
												class="text-indigo-500"
											>
												privacy policy</a
											></small
										>
									</div>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
			</section>
			<!-- Add Ons -->
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
		ExclamationTriangleIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	import {
		Bars3Icon,
		BellIcon,
		PencilIcon,
		CogIcon,
		CreditCardIcon,
		SparklesIcon,
		KeyIcon,
		SquaresPlusIcon,
		UserCircleIcon,
		UserMinusIcon,
		TrashIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format } from 'date-fns';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(`*,Account(*)`)
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
