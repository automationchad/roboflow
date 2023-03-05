<template>
	<div class="isolate overflow-hidden bg-gray-900" id="pricing">
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
		<div class="flow-root bg-white pb-24 sm:pb-32">
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
									: 'ring-1 ring-gray-900/10',
								'flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl sm:p-10',
							]"
						>
							<div>
								<div class="flex items-center justify-between gap-x-4">
									<h3
										:id="tier.id"
										:class="[
											tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
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
									<span class="text-4xl font-bold tracking-tight text-gray-900"
										>${{
											(
												tier.priceMonthly -
												tier.priceMonthly * idx * 0.1
											).toLocaleString()
										}}</span
									>
									<span class="text-base font-semibold leading-7 text-gray-600"
										>/month</span
									>
								</div>
								<p class="mt-2 text-sm text-gray-400">{{ tier.billingInfo }}</p>
								<p class="mt-6 text-base leading-7 text-gray-600">
									{{ tier.description }}
								</p>
								<NuxtLink
									@click="handleButtonClick(user, profile, tier)"
									:aria-describedby="tier.id"
									:class="[
										tier.mostPopular
											? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500'
											: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
										'mt-6 block cursor-pointer rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
									]"
									>{{
										subscription.status === 'active' ? 'Manage' : 'Get started'
									}}</NuxtLink
								>
								<p class="mt-4 text-center text-xs">
									<a
										href="https://calendly.com/motis-group/intro"
										target="_blank"
										class="underline"
										>Book a call</a
									>
								</p>

								<ul
									role="list"
									class="my-10 space-y-4 text-sm leading-6 text-gray-600"
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
									class="mt-10 space-y-4 border-t border-gray-400 pt-10 text-sm leading-6 text-gray-600"
								>
									<span>Available add-ons:</span>
									<li
										v-for="feature in tier.addOns"
										:key="feature"
										class="flex gap-x-3"
									>
										<MinusIcon
											class="h-6 w-5 flex-none text-slate-600"
											aria-hidden="true"
										/>
										{{ feature }}
									</li>
								</ul>
							</div>
						</div>
						<div
							class="flex flex-col items-start gap-y-6 gap-x-8 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-3 lg:flex-row lg:items-center"
						>
							<div class="lg:min-w-0 lg:flex-1">
								<h3
									class="mt-1 text-lg font-semibold leading-8 tracking-tight text-indigo-600"
								>
									Tray.io development
									<span class="ml-1 text-base font-normal text-gray-500"
										>$999/mo</span
									>
								</h3>
								<p class="mt-1 text-base leading-7 text-gray-600">
									Get a better automation faster with Tray.io development.
									Requires an automation subscription.
								</p>
							</div>
							<a
								:disabled="subscription"
								class="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>Add on {{ ' ' }}<span aria-hidden="true">&rarr;</span></a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { CheckIcon, MinusIcon } from '@heroicons/vue/20/solid';
	import { useAttrs } from 'vue';
	const emit = defineEmits(['open-modal']);
	const user = useSupabaseUser();
	console.log(user.value);

	const base_price = 6000;

	let subscription = false;
	let subscription_type = false;

	if (user.value) {
		const { customer } = await $fetch(
			`/api/stripe/customer?email=${user.value.email}`,
			{
				method: 'get',
			}
		);
		subscription = await customer.subscriptions.data.find(
			(o) => o.plan.metadata.type === 'retainer'
		);
		subscription_type = subscription.plan.nickname;
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
			features: ['Unlimited requests', 'Unlimited changes', 'Unlimited users'],
			addOns: [
				'Multiple projects at a time',
				'Weekly session calls',
				'48-hour support response time',
			],
		},
		{
			name: 'Quarterly',
			id: 'quarterly',
			mostPopular: false,
			href: '#',
			billingInfo: 'Paid quarterly',
			priceMonthly: base_price,
			description: `Save $${(base_price * 0.1).toLocaleString()} per month.`,
			features: ['Unlimited requests', 'Unlimited changes', 'Unlimited users'],
			addOns: [
				'Multiple projects at a time',
				'Weekly session calls',
				'24-hour support response time',
			],
		},
		{
			name: 'Yearly',
			id: 'yearly',
			mostPopular: false,
			href: '#',
			billingInfo: 'Paid annually',
			priceMonthly: base_price,
			description: `Save $${(base_price * 0.2).toLocaleString()} per month.`,
			features: ['Unlimited requests', 'Unlimited changes', 'Unlimited users'],
			addOns: [
				'Multiple projects at a time',
				'Weekly session calls',
				'1-hour, dedicated support response time',
				'Advanced analytics',
			],
		},
	];

	const handleButtonClick = async (user, subscription, tier) => {
		if (!user) {
			emit('open-modal');
		} else if (subscription) {
			navigateTo(
				`https://billing.stripe.com/p/login/cN2eWV7TNf8MeWY3cc?prefilled_email=${user.email}`,
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
		const { url } = await $fetch('/api/checkout', {
			method: 'post',
			body: {
				type,
				billing_period,
				metadata: { type: 'initial_subscription', workspace_id: workspace.id },
				product: product,
				project_id: product.tray_project_id,
				workspace_id: workspace.id,
				customer: workspace.stripe_customer_id,
			},
		});
		location.href = url;
	};
</script>

<!-- <script>
	export default {
		props: ['user', 'profile'],
	};
</script> -->
