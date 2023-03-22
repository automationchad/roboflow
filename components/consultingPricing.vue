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
					No expensive hourly billing or contracts, cancel anytime.
				</p>
				<div class="mt-16 flex justify-center">
					<RadioGroup
						v-model="frequency"
						class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200 dark:ring-gray-400"
					>
						<RadioGroupLabel class="sr-only">Payment frequency</RadioGroupLabel>
						<RadioGroupOption
							as="template"
							v-for="option in frequencies"
							:key="option.value"
							:value="option"
							v-slot="{ checked }"
						>
							<div
								:class="[
									checked ? 'bg-indigo-100 text-indigo-800' : 'text-gray-200',
									'cursor-pointer rounded-full py-1 px-2.5',
								]"
							>
								<span>{{ option.label }}</span>
							</div>
						</RadioGroupOption>
					</RadioGroup>
				</div>
				<div
					class="mt-4 flex items-center justify-center text-xs text-slate-300"
				>
					<InformationCircleIcon class="mr-1 h-5 w-5" />{{
						frequency.value === 'ps'
							? 'Get unlimited automation requests, revisions and support '
							: 'Get unlimited async support for your existing automations '
					}}
				</div>
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
		<div
			class="flow-root bg-white pb-24 dark:bg-black sm:pb-32"
			v-if="frequency.value === 'ps'"
		>
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
								<a
									target="_blank"
									href="https://motisgroup.manyrequests.com/register"
									:aria-describedby="tier.id"
									:class="[
										tier.mostPopular
											? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 '
											: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 dark:text-indigo-200 ',
										'mt-6 block w-full items-center rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ',
									]"
								>
									<div class="flex items-center justify-center">
										{{ 'Get started' }}
									</div>
								</a>
								<!-- <a
									href="https://calendly.com/motis-group/intro"
									target="_blank"
									:aria-describedby="tier.id"
									:class="[
										tier.mostPopular
											? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 '
											: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 dark:text-indigo-200 ',
										'mt-6 block w-full items-center rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ',
									]"
								>
									<div class="flex items-center justify-center">
										{{ 'Get started' }}
									</div>
								</a> -->
								<p class="mt-4 text-center text-xs">
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
										<span class="text-base font-semibold dark:text-white"
											>Pro<span class="text-sm font-normal dark:text-gray-400">
												($1,000/mo)</span
											></span
										>
										<div
											:class="[
												spotsLeft.spots > 0 ? 'badge' : 'err-badge',
												' flex items-center rounded-full px-3 py-0.5 shadow-md',
											]"
										>
											<ClockIcon
												class="mr-1 h-4 w-4"
												v-if="!spotsLeft.spots > 0"
											/>
											<p class="text-xs font-normal">
												{{
													spotsLeft.spots > 0
														? `${spotsLeft.spots} spots left`
														: 'Waitlist'
												}}
											</p>
										</div>
									</div>
									<div class="mt-2 dark:text-gray-300">
										Everything in <strong class="">{{ tier.name }}</strong
										>, plus:
									</div>
									<li
										v-for="feature in tier.addOns"
										:key="feature"
										class="flex gap-x-3 dark:text-gray-300"
									>
										<PlusIcon
											class="h-6 w-5 flex-none text-slate-600 dark:text-slate-500"
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
										: 'Calculate your savings'
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
										: 'Buy discounted license'
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
						<div class="" v-if="false">
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
								class="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-400 dark:ring-indigo-400"
							>
								Join now
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="flow-root bg-white pb-24 dark:bg-black sm:pb-32" v-else>
			<div class="-mt-80">
				<div class="mx-auto max-w-7xl px-6 lg:px-8">
					<div
						class="mx-auto grid max-w-lg grid-cols-3 gap-8 sm:grid-cols-1 lg:max-w-7xl lg:grid-cols-3"
					>
						<div
							v-for="(tier, idx) in debug_tiers"
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
												tier.priceMonthly - tier.priceMonthly * idx * 0.05
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
								<a
									target="_blank"
									href="https://motisgroup.manyrequests.com/register"
									:aria-describedby="tier.id"
									:class="[
										tier.mostPopular
											? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 '
											: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 dark:text-indigo-200 ',
										'mt-6 block w-full items-center rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ',
									]"
								>
									<div class="flex items-center justify-center">
										{{ 'Get started' }}
									</div>
								</a>
								<!-- <a
									href="https://calendly.com/motis-group/intro"
									target="_blank"
									:aria-describedby="tier.id"
									:class="[
										tier.mostPopular
											? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 '
											: 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 dark:text-indigo-200 ',
										'mt-6 block w-full items-center rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  ',
									]"
								>
									<div class="flex items-center justify-center">
										{{ 'Get started' }}
									</div>
								</a> -->
								<p class="mt-4 text-center text-xs">
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
										<span class="text-base font-semibold dark:text-white"
											>Pro<span class="text-sm font-normal dark:text-gray-400">
												($1,000/mo)</span
											></span
										>
										<div
											:class="[
												spotsLeft.spots > 0 ? 'badge' : 'err-badge',
												' flex items-center rounded-full px-3 py-0.5 shadow-md',
											]"
										>
											<ClockIcon
												class="mr-1 h-4 w-4"
												v-if="!spotsLeft.spots > 0"
											/>
											<p class="text-xs font-normal">
												{{
													spotsLeft.spots > 0
														? `${spotsLeft.spots} spots left`
														: 'Waitlist'
												}}
											</p>
										</div>
									</div>
									<div class="mt-2 dark:text-gray-300">
										Everything in <strong class="">{{ tier.name }}</strong
										>, plus:
									</div>
									<li
										v-for="feature in tier.addOns"
										:key="feature"
										class="flex gap-x-3 dark:text-gray-300"
									>
										<PlusIcon
											class="h-6 w-5 flex-none text-slate-600 dark:text-slate-500"
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
										: 'Calculate your savings'
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
										: 'Buy discounted license'
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
						<div class="" v-if="false">
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
								class="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-400 dark:ring-indigo-400"
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
		InformationCircleIcon,
		ClockIcon,
		MinusIcon,
		PlusIcon,
	} from '@heroicons/vue/20/solid';
	import {
		RadioGroup,
		RadioGroupLabel,
		RadioGroupDescription,
		RadioGroupOption,
	} from '@headlessui/vue';
	import { useAttrs } from 'vue';

	const emit = defineEmits(['open-modal']);
	const user = useSupabaseUser();
	const attrs = useAttrs();
	const profile = attrs.profile;
	const retainer_base_price = 3000;
	const debug_base_price = 600;

	const spotsLeft = { spots: 3, remaining_days: 5 };
	const frequencies = [
		{ value: 'ps', label: 'Growth', priceSuffix: '/month' },
		{ value: 'cs', label: 'Support', priceSuffix: '/year' },
	];
	const frequency = ref(frequencies[0]);

	let subscription = { status: false };
	let subscription_type = false;
	let add_on = { status: false };
	let customer = {};
	const test = false;

	if (profile?.workspaces?.billing_email) {
		const email = test
			? 'automation@motis.group'
			: profile?.workspaces?.billing_email;

		customer = await $fetch(`/api/stripe/customer?email=${email}`, {
			method: 'get',
		});

		if (customer.subscriptions.data.length > 0) {
			subscription = customer.subscriptions.data.find(
				(o) => o.plan?.metadata.type === 'retainer'
			)
				? customer.subscriptions.data.find(
						(o) => o.plan?.metadata.type === 'retainer'
				  )
				: { status: false };
			if (subscription?.id) {
				subscription_type = subscription?.plan?.nickname;
			}
			add_on = customer?.subscriptions?.data?.find((o) =>
				o.items.data.find((v) => v.plan.nickname === 'software_license')
			)
				? customer?.subscriptions?.data?.find((o) =>
						o.items.data.find((v) => v.plan.nickname === 'software_license')
				  )
				: { status: false };
		}
	}

	const tiers = [
		{
			name: 'Monthly',
			id: 'monthly',
			mostPopular: true,
			href: '#',
			billingInfo: 'Pause or cancel anytime',
			priceMonthly: retainer_base_price,
			description: 'No minimum commitment.',
			features: [
				'Unlimited project requests',
				'Unlimited debugging',
				'48 hours (18/5) response time',
			],
			addOns: [
				'Concurrent requests',
				'Weekly tactical sessions',
				'Monthly strategy sessions',
				'Documentation (written ONLY)',
			],
		},
		{
			name: 'Quarterly',
			id: 'quarterly',
			mostPopular: false,
			href: '#',
			billingInfo: `Paid quarterly (\$${(
				(retainer_base_price - retainer_base_price * 0.1) *
				3
			).toLocaleString()})`,
			priceMonthly: retainer_base_price,
			description: `Save $${Math.round(
				retainer_base_price * 0.1
			).toLocaleString()} per month.`,
			features: [
				'Unlimited project requests',
				'Unlimited debugging',
				'36-hour (18/5) response time',
			],
			addOns: [
				'Concurrent requests',
				'Weekly tactical sessions',
				'Monthly strategy sessions',
				'Documentation (written + video)',
			],
		},
		{
			name: 'Yearly',
			id: 'yearly',
			mostPopular: false,
			href: '#',
			billingInfo: `Paid annually (\$${(
				(retainer_base_price - retainer_base_price * 0.2) *
				12
			).toLocaleString()})`,
			priceMonthly: retainer_base_price,
			description: `Save $${Math.round(
				retainer_base_price * 0.2
			).toLocaleString()} per month.`,
			features: [
				'Unlimited project requests',
				'Unlimited debugging',
				'24-hour (18/7) response time',
			],
			addOns: [
				'Concurrent requests',
				'Weekly tactical sessions',
				'Monthly strategy sessions',
				'Documentation (written + video)',
			],
		},
	];

	const debug_tiers = [
		{
			name: 'Monthly',
			id: 'monthly',
			mostPopular: true,
			href: '#',
			billingInfo: 'Pause or cancel anytime',
			priceMonthly: debug_base_price,
			description: 'No minimum commitment.',
			features: [
				'Unlimited debugging',
				'Add us to your Slack',
				'48 hours (18/5) response time',
			],
			addOns: [
				'Concurrent requests',
				'Weekly tactical sessions',
				'Monthly strategy sessions',
				'Documentation (written ONLY)',
			],
		},
		{
			name: 'Quarterly',
			id: 'quarterly',
			mostPopular: false,
			href: '#',
			billingInfo: `Paid quarterly (\$${(
				(debug_base_price - debug_base_price * 0.05) *
				3
			).toLocaleString()})`,
			priceMonthly: debug_base_price,
			description: `Save $${Math.round(
				debug_base_price * 0.05
			).toLocaleString()} per month.`,
			features: [
				'Unlimited debugging',
				'Add us to your Slack',
				'36-hour (18/5) response time',
			],
			addOns: [
				'Concurrent requests',
				'Weekly tactical sessions',
				'Monthly strategy sessions',
				'Documentation (written + video)',
			],
		},
		{
			name: 'Yearly',
			id: 'yearly',
			mostPopular: false,
			href: '#',
			billingInfo: `Paid annually (\$${(
				(debug_base_price - debug_base_price * 0.1) *
				12
			).toLocaleString()})`,
			priceMonthly: debug_base_price,
			description: `Save $${Math.round(
				debug_base_price * 0.1
			).toLocaleString()} per month.`,
			features: [
				'Unlimited debugging',
				'Add us to your Slack',
				'24-hour (18/7) response time',
			],
			addOns: [
				'Concurrent requests',
				'Weekly tactical sessions',
				'Monthly strategy sessions',
				'Documentation (written + video)',
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

<style setup>
	.err-badge {
		background-size: 100% 100%;
		background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
		background-image: radial-gradient(
				49% 81% at 45% 47%,
				#ffe20345 0%,
				#073aff00 100%
			),
			radial-gradient(113% 91% at 17% -2%, #ff5a00ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at 83% 7%, #ffdb00ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at -6% 74%, #ff0049ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at 111% 84%, #ff7000ff 0%, #ff0000ff 100%);
		color: rgb(0, 0, 0);
	}
	.badge {
		background-size: 100% 100%;
		background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px,
			0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
		background-image: radial-gradient(
				18% 28% at 24% 50%,
				#cefaffff 7%,
				#073aff00 100%
			),
			radial-gradient(18% 28% at 18% 71%, #ffffff59 6%, #073aff00 100%),
			radial-gradient(70% 53% at 36% 76%, #73f2ffff 0%, #073aff00 100%),
			radial-gradient(42% 53% at 15% 94%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(42% 53% at 34% 72%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(18% 28% at 35% 87%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(31% 43% at 7% 98%, #ffffffff 24%, #073aff00 100%),
			radial-gradient(21% 37% at 72% 23%, #d3ff6d9c 24%, #073aff00 100%),
			radial-gradient(35% 56% at 91% 74%, #8a4ffff5 9%, #073aff00 100%),
			radial-gradient(74% 86% at 67% 38%, #6dffaef5 24%, #073aff00 100%),
			linear-gradient(125deg, #4eb5ffff 1%, #4c00fcff 100%);
		color: #00373e;
	}
</style>
