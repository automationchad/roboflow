<template>
	<div class="h-full">
		<warning-access :role="User.systemRole" />
		<div class="mt-10 space-y-6 lg:px-0">
			<!-- Plan -->
			<section aria-labelledby="plan-heading">
				<fieldset
					:disabled="
						User.systemRole !== 'owner' && User.systemRole !== 'super_admin'
					"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden">
						<div class="space-y-6 bg-white dark:bg-slate-900">
							<ul
								role="list"
								class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
							>
								<li
									v-for="(plan, idx) in plans"
									:key="plan.id"
									class="col-span-1 flex min-h-[500px] flex-col border bg-white text-center dark:border-white/10 dark:bg-slate-800"
								>
									<div
										class="group relative h-full overflow-hidden ring-2 ring-inset ring-black/20"
									>
										<img
											class="h-full w-full object-cover transition-opacity group-hover:opacity-95"
											:src="plan.image"
											:alt="plan.name"
										/>
										<div
											class="absolute left-0 top-0 h-full w-full bg-black opacity-50"
										></div>
										<div
											class="absolute left-0 top-0 flex h-full w-full flex-col justify-between px-6 py-4"
										>
											<div
												class="flex flex-col items-start justify-start self-start"
											>
												<h4
													class="text-xl font-semibold tracking-tight text-white"
												>
													{{ plan.name }}
												</h4>
												<div
													class="max-w-sm break-words text-left text-xs text-slate-300"
												>
													{{ plan.desc }}
												</div>
												<h3
													class="mt-8 text-3xl font-semibold tracking-tight text-white"
												>
													${{ plan.priceMonthly.toLocaleString()
													}}<small class="text-sm text-slate-300">/mo</small>
												</h3>
												<div class="text-left">
													<ul
														role="list"
														class="mt-4 space-y-1 text-sm text-white dark:text-gray-300"
													>
														<div class="mb-2 dark:text-gray-300">
															<span v-if="idx === 0">
																<strong class="">{{ plan.name }}</strong>
																includes:</span
															>
															<span v-else
																>Everything in
																<strong class="">{{
																	plans[idx - 1].name
																}}</strong
																>, plus:</span
															>
														</div>
														<li
															v-for="feature in plan.features"
															:key="feature"
															class="flex text-xs"
														>
															<CheckIcon class="mr-1 h-4 w-4" />
															{{ feature }}
														</li>
													</ul>
												</div>
											</div>
											<div class="flex w-full items-center self-end">
												<div
													class="flex w-full items-center justify-between rounded-lg py-1 text-sm"
													v-if="retainer.tier === plan.id"
												>
													<div class="mr-12 flex items-center">
														<div
															class="flex items-center text-lime-400"
															v-if="retainer.status === 'active'"
														>
															<svg
																class="mr-1 h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M9.75 12.75L10.1837 13.6744C10.5275 14.407 11.5536 14.4492 11.9564 13.7473L14.25 9.75"
																></path>
															</svg>
															Selected
														</div>
														<div
															class="flex items-center text-yellow-400"
															v-else
														>
															<svg
																class="mr-1 h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M15.25 6.75V17.25"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M8.75 6.75V17.25"
																></path>
															</svg>
															Paused
														</div>
													</div>
													<div class="flex items-center text-xs text-white">
														<span class="mr-1.5">10 days</span
														><button
															@click="
																handlePause(retainer.stripeSubscriptionId)
															"
															class="justify-right flex items-center rounded-md border border-slate-700 bg-slate-800 text-slate-200 hover:border-slate-600 hover:text-white"
														>
															<svg
																class="h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M15.25 6.75V17.25"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M8.75 6.75V17.25"
																></path>
															</svg>
														</button>
													</div>
												</div>
												<button
													v-else
													@click="
														handleCheckout(
															{ id: plan.id },
															'retainer',
															User.Account.stripeCustomerId,
															User.Account.subscription
														)
													"
													class="w-full rounded-lg bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
												>
													{{
														idx <
														plans.findIndex((plan) => retainer.tier === plan.id)
															? 'Downgrade'
															: 'Upgrade'
													}}
												</button>
											</div>
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
					<div class="mt-8">
						<div class="space-y-6">
							<div
								class="flex justify-between border-b border-slate-200 py-6 dark:border-slate-700"
							>
								<h2 class="font-semibold dark:text-white">Hosting</h2>
							</div>
							<div class="py-4 text-sm text-slate-400">
								<!-- <div class="">No add on added</div> -->
								<div
									class="flex flex-col items-start gap-x-8 gap-y-6 border border-gray-900/10 bg-gray-50 p-8 dark:border-white/10 dark:bg-slate-800 sm:gap-y-10 sm:p-10 lg:col-span-3 lg:flex-row lg:items-center"
								>
									<div class="lg:min-w-0 lg:flex-1">
										<div class="mt-1 flex items-center">
											<h3
												class="text-lg font-semibold leading-8 tracking-tight text-slate-600 dark:text-white"
											>
												Tray.io hosting
											</h3>
											<div
												class="ml-3 flex items-center rounded-lg py-1 text-sm text-lime-600 dark:text-lime-400"
												v-if="hosting"
											>
												<CheckCircleIcon class="mr-1 h-5 w-5" />
												Active
											</div>
										</div>

										<p
											class="mt-1 text-sm leading-7 text-gray-600 dark:text-slate-300"
										>
											Get full access to all of the standard Tray.io license
											features for 70% of the cost by joining us.
										</p>
									</div>

									<button
										@click="
											hosting
												? handleCheckout(
														{ id: selectedPlan.id },
														'retainer',
														User.Account.stripeCustomerId,
														User.Account.Subscription
												  )
												: handleCheckout(
														{},
														'add_on',
														User.Account.stripeCustomerId
												  )
										"
										class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-black shadow dark:bg-slate-100"
									>
										<SparklesIcon class="mr-1 h-5 w-5" />{{
											hosting ? 'Manage License' : 'Upgrade License'
										}}
									</button>
								</div>
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
		CheckCircleIcon,
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
		CheckIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format } from 'date-fns';

	import free from '@/assets/images/plans/free.png';
	import support from '~/assets/images/plans/support.png';
	import growth from '~/assets/images/plans/growth.png';
	import enterprise from '~/assets/images/plans/enterprise.png';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const plans = [
		{
			name: 'Free',
			id: 'free',
			desc: 'Experiment for free',
			features: ['No requests'],
			image: free,
			priceMonthly: 0,
			priceYearly: 0,
			limit: 'No requests',
		},
		{
			name: 'Basic',
			id: 'basic',
			desc: 'Great for running lightweight automations',
			features: [
				'Up to 2 hours of development',
				'Unlimited debugging',
				'48 hours (18/5) response time',
			],
			image: support,
			priceMonthly: 600,
			priceYearly: 6000,
			limit: 'Up to 5 active requests',
		},
		{
			name: 'Growth',
			id: 'growth',
			desc: 'We scale as you scale',
			image: growth,
			features: [
				'Up to 20 hours of development',
				'Unlimited project requests',
				'QA testing',
				'Add us to your Slack',
				'36-hour (18/5) response time',
			],
			priceMonthly: 1800,
			priceYearly: 18000,
			limit: 'Up to 25 active requests',
		},
		{
			name: 'Enterprise',
			id: 'enterprise',
			desc: 'Governance, compliance and support.',
			features: [
				'Up to 80 hours of development',
				'Concurrent requests',
				'Regular unit & load testing',
				'Team coaching',
				'Monthly strategy call',
				'Process documentation hub',
				'24-hour (18/7) response time',
			],
			image: enterprise,
			priceMonthly: 5400,
			priceYearly: 54000,
			limit: 'Unlimited active requests',
		},
	];

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`systemRole,Account(id,stripeCustomerId,trayWorkspaceId,Subscription(*))`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	let retainer = {};
	retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	let hosting = {};
	hosting = User.Account.Subscription.find((o) => o.type === 'hosting');

	const selectedPlan = ref(null);

	const handleCheckout = async (product, type, customer) => {
		selectedPlan.value = product.id;
		const { url } = await $fetch('/api/stripe/checkout', {
			method: 'post',
			body: {
				product: { id: selectedPlan.value },
				type,
				customer,
				account: User.Account,
			},
		});
		location.href = url;
	};

	const handlePause = async (subscriptionId) => {
		const { date: paused, error } = await $fetch(
			'/api/stripe/subscription/pause',
			{
				method: 'post',
				body: {
					subscriptionId,
				},
			}
		);
		return paused;
	};
</script>
