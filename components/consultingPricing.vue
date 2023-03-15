<template>
	<div class="isolate overflow-hidden bg-black" id="pricing">
		<div
			class="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8"
		>
			<div class="mx-auto max-w-4xl">
				<h2 class="text-base font-semibold leading-7 text-indigo-400">
					Memberships levels
				</h2>
				<p
					class="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl"
				>
					Choose a plan that's right for you.
				</p>
			</div>
			<div class="relative mt-6">
				<p class="mx-auto max-w-2xl text-lg leading-8 text-white/60">
					Get unlimited automation requests and revisions. No expensive hourly
					billing or contracts, cancel anytime.
				</p>
				<svg
					viewBox="0 0 1208 1024"
					class="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
				>
					<ellipse
						cx="604"
						cy="512"
						fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
						rx="604"
						ry="512"
					/>
					<defs>
						<radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
							<stop stop-color="#7775D6" />
							<stop offset="1" stop-color="#E935C1" />
						</radialGradient>
					</defs>
				</svg>
			</div>
		</div>
		<div class="flow-root bg-white pb-24 dark:bg-black sm:pb-32">
			<div class="-mt-80">
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div
						class="mx-auto grid max-w-lg grid-cols-3 gap-8 sm:grid-cols-1 lg:max-w-7xl lg:grid-cols-3"
					>
						<div
							v-for="(tier, idx) in tiers"
							:key="tier.id"
							:class="[
								tier.mostPopular
									? 'ring-2 ring-indigo-600'
									: 'ring-1 ring-gray-900/10 dark:ring-white/10',
								'flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-800 sm:p-10',
							]"
						>
							<div>
								<div class="flex items-center justify-between gap-x-4">
									<h3
										:id="tier.id"
										:class="[
											tier.mostPopular
												? 'text-indigo-600'
												: 'text-gray-900 dark:text-gray-100',
											'text-base font-semibold leading-8',
										]"
									>
										{{ tier.name }}
									</h3>
									<p
										v-if="tier.mostPopular"
										class="rounded-full bg-indigo-600/10 py-1 px-2.5 text-xs font-semibold leading-5 text-indigo-600"
									>
										Most popular
									</p>
								</div>

								<div class="mt-4 flex items-baseline gap-x-2">
									<span
										class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
										>${{
											Math.round(
												tier.priceMonthly - tier.priceMonthly * idx * 0.1
											).toLocaleString()
										}}</span
									>
									<span
										class="text-base font-semibold leading-7 text-gray-600 dark:text-gray-400"
										>/month</span
									>
								</div>
								<p class="mt-2 text-sm text-gray-400">{{ tier.billingInfo }}</p>
								<p
									class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400"
								>
									{{ tier.description }}
								</p>
								<button
									@click="
										handleButtonClick(
											profile?.workspaces?.billing_email ?? null,
											customer,
											tier
										)
									"
									:aria-describedby="tier.id"
									:class="[
										subscription_type === tier.id &&
										subscription.status === 'active'
											? 'bg-lime-50 text-lime-600 ring-1 ring-lime-200'
											: tier.mostPopular
											? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 '
											: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 dark:text-indigo-200 hover:ring-indigo-300 ',
										'mt-6 block w-full items-center rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ',
									]"
								>
									<div class="flex items-center justify-center">
										<CheckCircleIcon
											class="mr-1 h-5 w-5"
											v-if="
												subscription_type === tier.id &&
												subscription.status === 'active'
											"
										/>{{
											subscription_type === tier.id
												? 'Manage subscription'
												: subscription.status === 'active'
												? 'Upgrade'
												: 'Get started'
										}}
									</div>
								</button>
								<p class="mt-4 text-center text-xs" v-if="!subscription.status">
									<a
										href="https://calendly.com/motis-group/intro"
										target="_blank"
										class="underline dark:text-white"
										>Book a call</a
									>
								</p>

								<ul
									role="list"
									class="my-10 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-300"
								>
									<li
										v-for="feature in tier.features"
										:key="feature"
										class="flex gap-x-3"
									>
										<CheckIcon
											class="h-6 w-5 flex-none text-indigo-600"
											aria-hidden="true"
										/>
										{{ feature }}
									</li>
								</ul>

								<ul
									v-if="tier.addOns.length > 0"
									role="list"
									class="mt-10 space-y-4 border-t border-gray-400 pt-10 text-sm leading-6 text-gray-600 dark:text-gray-400"
								>
									<div class="flex items-center justify-between">
										<span class="font-semibold">Available add-ons:</span
										><span
											class="inline-flex items-center rounded-full bg-sky-100 px-3 py-0.5 text-xs font-medium text-sky-800"
											>${{ (1000).toLocaleString() }}/mo</span
										>
									</div>

									<li
										v-for="feature in tier.addOns"
										:key="feature"
										class="flex gap-x-3"
									>
										<PlusIcon
											class="h-6 w-5 flex-none text-slate-600"
											aria-hidden="true"
										/>
										{{ feature }}
									</li>
								</ul>
							</div>
						</div>
						<div
							class="flex flex-col items-start gap-y-6 gap-x-8 rounded-3xl p-8 ring-1 ring-gray-900/10 dark:ring-white/10 sm:gap-y-10 sm:p-10 lg:col-span-3 lg:flex-row lg:items-center"
						>
							<div class="lg:min-w-0 lg:flex-1">
								<h3
									class="mt-1 text-lg font-semibold leading-8 tracking-tight text-indigo-600"
								>
									Discounted Tray.io development
								</h3>
								<p
									class="mt-1 text-base leading-7 text-gray-600 dark:text-gray-400"
								>
									Get full access to all of the standard Tray.io license
									features for 70% of the cost.
								</p>
							</div>

							<a
								v-if="
									!subscription.status ||
									(add_on.status === 'active' &&
										subscription.status === 'active')
								"
								href="#save"
								:class="[
									add_on.status === 'active'
										? 'text-lime-600 ring-lime-200'
										: 'hover:ring-indigo-300',
									'rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-400 dark:ring-indigo-400',
								]"
							>
								{{
									add_on.status === 'active' && subscription.status === 'active'
										? 'Active'
										: 'Buy discounted license'
								}}
								{{ ' '
								}}<span aria-hidden="true">{{
									add_on.status === 'active' && subscription.status === 'active'
										? '&check;'
										: '&rarr;'
								}}</span>
							</a>
							<button
								v-else
								@click="handleCheckout({}, 'add_on', '', profile.workspaces)"
								:class="[
									add_on.status === 'active'
										? 'text-lime-600 ring-lime-200'
										: 'hover:ring-indigo-300',
									'rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
								]"
							>
								{{
									add_on.status === 'active' && subscription.status === 'active'
										? 'Active'
										: 'Add on'
								}}
								{{ ' '
								}}<span aria-hidden="true">{{
									add_on.status === 'active' && subscription.status === 'active'
										? '&check;'
										: '&rarr;'
								}}</span>
							</button>
						</div>
					</div>
					<div
						class="mt-24 flex flex-col items-center justify-center text-center align-middle"
					>
						<div class="">
							<h1
								class="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl"
							>
								Refer a friend & earn
							</h1>
							<p class="mt-2 mb-6 dark:text-gray-400">
								Earn 10% monthly recurring commissions for each referral.
							</p>
							<a
								href="https://app.getrewardful.com/login"
								target="_blank"
								class="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400 dark:ring-indigo-400 ring-1 ring-inset ring-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Join now
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		CheckIcon,
		CheckCircleIcon,
		MinusIcon,
		PlusIcon
	} from '@heroicons/vue/20/solid';
	import { useAttrs } from 'vue';
	const emit = defineEmits(['open-modal']);
	const user = useSupabaseUser();
	const attrs = useAttrs();
	const profile = attrs.profile;
	const base_price = 4000;

	let subscription = { status: false };
	let subscription_type = false;
	let add_on = { status: false };
	let customer = {};
	const test = false;

	if (profile?.workspaces.billing_email) {
		const email = test
			? 'automation@motis.group'
			: profile.workspaces.billing_email;

		customer = await $fetch(`/api/stripe/customer?email=${email}`, {
			method: 'get',
		});

		if (customer.subscriptions.data.length > 0) {
			subscription = customer.subscriptions.data.find(
				(o) => o.plan?.metadata.type === 'retainer'
			);
			if (subscription.id) {
				subscription_type = subscription.plan.nickname;
			}
			add_on = customer.subscriptions.data.find((o) =>
				o.items.data.find((v) => v.plan.nickname === 'software_license')
			)
				? customer.subscriptions.data.find((o) =>
						o.items.data.find((v) => v.plan.nickname === 'software_license')
				  )
				: { status: false };
		}
		console.log(subscription);
	}

	const tiers = [
		{
			name: 'Monthly',
			id: 'monthly',
			mostPopular: true,
			href: '#',
			billingInfo: 'Pause or cancel anytime',
			priceMonthly: base_price,
			description: 'No minimum commitment.',
			features: [
				'Unlimited requests',
				'Unlimited changes',
				'Unlimited users',
				'48-hour support response time',
			],
			addOns: ['Weekly AMA sessions', 'Process documentation hub'],
		},
		{
			name: 'Quarterly',
			id: 'quarterly',
			mostPopular: false,
			href: '#',
			billingInfo: 'Paid quarterly',
			priceMonthly: base_price,
			description: `Save $${Math.round(
				base_price * 0.1
			).toLocaleString()} per month.`,
			features: [
				'Unlimited requests',
				'Unlimited changes',
				'Unlimited users',
				'24-hour support response time',
			],
			addOns: [
				'Weekly AMA sessions',
				'Process documentation hub',
				'Ticket escalation',
			],
		},
		{
			name: 'Yearly',
			id: 'yearly',
			mostPopular: false,
			href: '#',
			billingInfo: 'Paid annually',
			priceMonthly: base_price,
			description: `Save $${Math.round(
				base_price * 0.2
			).toLocaleString()} per month.`,
			features: [
				'Unlimited requests',
				'Unlimited changes',
				'Unlimited users',
				'12-hour support response time',
			],
			addOns: [
				'Weekly AMA sessions',
				'Process documentation hub',
				'Ticket escalation',
				'Advanced analytics',
			],
		},
	];

	const handleButtonClick = async (user, customer, tier) => {
		if (!user) {
			emit('open-modal');
		} else if (customer.subscriptions.data.length > 0) {
			navigateTo(
				`https://billing.stripe.com/p/login/cN2eWV7TNf8MeWY3cc?prefilled_email=${user}`,
				{ external: true }
			);
		} else {
			await handleCheckout(
				{
					tray_project_id: null,
				},
				'retainer',
				tier.id,
				profile.workspaces
			);
		}
	};

	const handleCheckout = async (product, type, billing_period, workspace) => {
		const { url } = await $fetch('/api/stripe/checkout', {
			method: 'post',
			body: {
				type,
				billing_period,
				metadata: { type, workspace_id: workspace.id },
				product: product,
				project_id: product.tray_project_id,
				workspace_id: workspace.id,
				customer: workspace.stripe_customer_id,
			},
		});
		location.href = url;
	};
</script>
