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

	import { format, addDays } from 'date-fns';

	import free from '@/assets/images/plans/free.png';
	import support from '~/assets/images/plans/support.png';
	import growth from '~/assets/images/plans/growth.png';
	import enterprise from '~/assets/images/plans/enterprise.png';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const loading = ref(false);
	const plans = [
		// {
		// 	name: 'Free',
		// 	id: 'free',
		// 	desc: 'Experiment for free',
		// 	features: ['No requests', 'Community support'],
		// 	image: free,
		// 	priceMonthly: 0,
		// 	priceYearly: 0,
		// 	limit: 'No requests',
		// },
		{
			name: 'Basic',
			id: 'basic',
			desc: 'Great for running lightweight automations',
			features: [
				'Up to 4 hours of development',
				'Unlimited debugging',
				'Community support',
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
				'Email support',
				'Add us to your Slack',
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
				'Designated Support manager & SLAs',
				'Custom contracts & invoicing',
				'Team coaching',
				'Monthly strategy call',
				'On-premise support',
				'Process documentation hub',
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
	retainer = ref(User.Account.Subscription.find((o) => o.type === 'retainer'));

	var date = new Date(Date.now());
	var firstDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		new Date(retainer.value.startDate).getDate()
	);

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
		loading.value = true;
		const { date: paused, error } = await $fetch(
			'/api/stripe/subscription/pause',
			{
				method: 'post',
				body: {
					subscriptionId,
				},
			}
		);
		location.reload();

		let { data: User, error: userError } = await supabase
			.from('User')
			.select(
				`systemRole,Account(id,stripeCustomerId,trayWorkspaceId,Subscription(*))`
			)
			.eq('id', user.value.id)
			.limit(1)
			.single();

		retainer.value = User.Account.Subscription.find(
			(o) => o.type === 'retainer'
		);
	};

	const handleResume = async (subscriptionId, days_left) => {
		loading.value = true;
		const { date: resumed, error } = await $fetch(
			'/api/stripe/subscription/resume',
			{
				method: 'post',
				body: {
					subscriptionId,
					days_left,
				},
			}
		);
		location.reload();

		let { data: User, error: userError } = await supabase
			.from('User')
			.select(
				`systemRole,Account(id,stripeCustomerId,trayWorkspaceId,Subscription(*))`
			)
			.eq('id', user.value.id)
			.limit(1)
			.single();
		retainer.value = User.Account.Subscription.find(
			(o) => o.type === 'retainer'
		);
	};
</script>

<template>
	<div>
		<div class="overflow-auto">
			<section class="relative">
				<div class="mx-auto my-10 max-w-[80vw] dark:text-white">
					<div>
						<div>
							<div class="mb-8 flex justify-between">
								<h4 class="text-lg">Change your organization's subscription</h4>
								<NuxtLink
									to="/settings/billing"
									class="flex items-center justify-center rounded-full border border-red-900/60 bg-red-900/50 p-1 text-red-300 transition-colors hover:text-white"
									><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
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
								</NuxtLink>
							</div>

							<!-- <org-update-plan/> -->
							<div
								class="grid grid-cols-2 gap-8 py-8 dark:text-white lg:grid-cols-3"
								v-if="true"
							>
								<div
									v-for="(plan, idx) in plans"
									:key="plan.id"
									class="bg-scale-300 flex flex-col justify-between rounded border px-6 py-6 dark:border-slate-800 dark:bg-slate-900"
								>
									<div class="space-y-8">
										<div class="space-y-4">
											<div class="flex items-center space-x-2">
												<p class="text-sm text-indigo-400">{{ plan.name }}</p>
												<div
													v-if="retainer.tier === plan.id"
													class="rounded bg-slate-800 px-2 py-0.5 text-xs dark:text-slate-500"
												>
													Current plan
												</div>
											</div>
											<p class="text-scale-1100 text-sm">
												{{ plan.desc }}
											</p>
											<div
												class="space-y-2 border-b border-t py-8 dark:border-slate-800"
											>
												<p class="text-sm text-slate-400">Starting from</p>
												<div class="space-y-1">
													<p class="text-[3.4rem] leading-none">
														${{ plan.priceMonthly.toLocaleString() }}
													</p>
													<p class="text-sm text-slate-400">per month</p>
												</div>
												<div
													class="w-fit rounded bg-indigo-400 px-2 py-0.5 text-xs text-indigo-900"
												>
													{{
														idx === 0
															? 'Limit of 2 free tickets'
															: '+ any additional usage'
													}}
												</div>
											</div>
										</div>
										<div class="space-y-4">
											<p v-if="idx === 0" class="text-xs text-slate-400">
												<strong class="">{{ plan.name }}</strong>
												includes:
											</p>
											<p v-else class="text-xs text-slate-400">
												Everything in
												<strong class="">{{ plans[idx - 1].name }}</strong
												>, plus:
											</p>
											<ul role="list" class=" ">
												<li
													class="flex py-2"
													v-for="feature in plan.features"
													:key="feature"
												>
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														{{ feature }}
													</p>
												</li>
											</ul>
										</div>
									</div>
									<div class="!mt-20 space-y-4">
										<div class="space-y-2">
											<p v-if="idx === 0" class="text-xs text-slate-500">
												Free accounts are paused after 1 week of inactivity.
											</p>
										</div>
										<div
											class="flex flex-col items-center justify-center space-y-2"
										>
											<button
												:class="[
													retainer.tier === plan.id
														? 'pointer-events-none border-slate-500 bg-slate-700 opacity-50'
														: 'border-indigo-400 bg-indigo-600 ',
													'hover:bg-scale-300 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 relative flex w-full cursor-pointer items-center justify-center space-x-2 rounded border  px-2.5 py-1 text-center text-xs font-normal shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-indigo-600',
												]"
												:disabled="retainer.tier === plan.id"
												type="button"
												@click="
													plan.id === 'enterprise'
														? navigateTo(
																'https://calendly.com/motis-group/intro',
																{external: true}
														  )
														: handleCheckout(
																{ id: plan.id },
																'retainer',
																User.Account.stripeCustomerId,
																User.Account.subscription
														  )
												"
											>
												<span
													v-if="retainer.tier !== plan.id"
													class="truncate"
													>{{
														idx <
														plans.findIndex((plan) => retainer.tier === plan.id)
															? `Downgrade to ${plan.name}`
															: `${
																	plan.id !== 'enterprise'
																		? `Upgrade to ${plan.name}`
																		: `Contact sales`
															  }`
													}}</span
												>
												<span v-else class="truncate">Current plan</span>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="mt-4 flex items-center justify-center">
								<a target="_blank" href="https://motis.group/#pricing"
									><button
										class="font-regular text-brand-1100 hover:bg-brand-400 focus-visible:outline-scale-700 text-scale-1000 hover:text-scale-1100 hover:bg-scale-400 relative inline-flex cursor-pointer items-center space-x-2 rounded border border-transparent border-opacity-0 bg-opacity-0 px-2.5 py-1 text-center text-sm text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:bg-opacity-0"
										type="button"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
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
											<line x1="10" y1="14" x2="21" y2="3"></line></svg
										><span class="truncate"
											>See detailed comparisons across plans</span
										>
									</button></a
								>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
