<template>
	<div class="h-full">
		<warning-access :role="User.systemRole" />
		<div class="space-y-6 lg:px-0">
			<!-- Plan -->
			<div class="mx-auto w-full">
				<div class="container max-w-4xl space-y-8 py-8">
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark mb-8 w-full overflow-hidden rounded border border-slate-200 dark:border-slate-800 dark:bg-slate-900"
							>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div class="flex items-center justify-between px-6 pt-4">
										<div class="flex flex-col">
											<p class="text-sm text-slate-500">Current subscription</p>
											<h3 class="mb-0 text-xl dark:text-slate-100">
												<span class="capitalize">{{ retainer.tier }}</span> tier
											</h3>
										</div>
										<div class="flex flex-col items-end space-y-2">
											<NuxtLink
												to="/settings/billing/update"
												class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
												<span class="truncate">Change subscription</span>
											</NuxtLink>
										</div>
									</div>
									<div class="mt-2 px-6 pb-4">
										<p class="text-sm text-slate-500">
											See our
											<NuxtLink
												href="/settings/billing/update"
												class="underline"
												>pricing</NuxtLink
											>
											for a more detailed analysis of what Motis Group has on
											offer.
										</p>
									</div>
									<div
										class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 text-slate-500 dark:border-slate-800"
									>
										<div class="w-[40%]">
											<p class="text-scale-900 text-xs uppercase">Item</p>
										</div>
										<div class="flex w-[20%] justify-end">
											<p class="text-scale-900 text-xs uppercase">Amount</p>
										</div>
										<div class="flex w-[20%] justify-end">
											<p class="text-scale-900 text-xs uppercase">Unit Price</p>
										</div>
										<div class="flex w-[20%] justify-end">
											<p class="text-scale-900 text-xs uppercase">Price</p>
										</div>
									</div>
									<div
										class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 dark:border-slate-800 dark:text-slate-200"
									>
										<div class="flex w-[40%] items-center gap-3">
											<span class="text-sm">Retainer</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{ retainer.quantity }}</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{
												formatAccounting(retainer.amount / 100, true)
											}}</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{
												formatAccounting(
													(retainer.amount / 100) * retainer.quantity
													, true)
											}}</span>
										</div>
									</div>
									<div v-if="hosting"
										class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 dark:border-slate-800 dark:text-slate-200"
									>
										<div class="flex w-[40%] items-center gap-3">
											<span class="text-sm">Hosting</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{ 1 }}</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{
												formatAccounting(150, true)
											}}</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{
												formatAccounting(
													150 * retainer.quantity, true
												)
											}}</span>
										</div>
									</div>
									<div v-if="hosting"
										class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 dark:border-slate-800 dark:text-slate-200"
									>
										<div class="flex w-[40%] items-center gap-3">
											<span class="text-sm">Executions</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{ state.kpis['Task Runs'].toLocaleString() }}</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">${{
												formatAccounting(taskPrice(state.kpis['Task Runs'], false) / state.kpis['Task Runs'])
											}}</span>
										</div>
										<div class="flex w-[20%] justify-end">
											<span class="text-sm">{{
												formatAccounting(
													taskPrice(state.kpis['Task Runs']) * retainer.quantity, true
												)
											}}</span>
										</div>
									</div>
									<div
										class="border-panel-border-light relative flex items-center border-t px-6 py-3 dark:border-slate-800"
									>
										<div class="w-[80%]">
											<p class="text-sm text-slate-500">
												Estimated cost for
												{{
													format(firstDay, 'MMM d, yyyy') +
													' - ' +
													format(addDays(firstDay, 30), 'MMM d, yyyy')
												}}
												so far
											</p>
										</div>
										<div
											class="flex w-[20%] items-center justify-end space-x-1"
										>
											<p class="text-slate-500">$</p>
											<h3 class="m-0 text-xl dark:text-slate-200">{{ formatAccounting(
												taskPrice(hosting ? state.kpis['Task Runs'] : 0) * retainer.quantity + (retainer.amount / 100 * retainer.quantity) + (hosting ? 150 : 0), false) }}</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<org-billing />
			<section aria-labelledby="plan-heading" v-if="false">
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
													<div class="flex items-center">
														<div
															class="flex items-center rounded-md border border-lime-400 bg-lime-200 px-3 py-0.5 text-lime-700"
															v-if="
																retainer.status === 'active' &&
																new Date(retainer.resumesAt) <=
																new Date(new Date().getTime())
															"
														>
															Active
														</div>
														<div
															class="flex items-center rounded-md border border-sky-400 bg-sky-200 px-3 py-0.5 text-sky-700"
															v-else-if="
																retainer.status === 'active' &&
																new Date(retainer.resumesAt) >
																new Date(new Date().getTime())
															"
														>
															Resuming
														</div>
														<div
															class="flex items-center rounded-md border border-yellow-400 bg-yellow-200 px-3 py-0.5 text-yellow-700"
															v-else
														>
															Paused
														</div>
													</div>
													<div class="flex items-center text-xs text-white">
														<span
															v-if="
																retainer.status === 'paused' ||
																new Date(retainer.resumesAt) >
																new Date(new Date().getTime())
															"
															class="mr-1.5 flex items-center"
															><svg
																class="h4 mr-0.5 w-4"
																fill="none"
																viewBox="0 0 24 24"
															>
																<circle
																	cx="12"
																	cy="12"
																	r="7.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																></circle>
																<path
																	stroke="currentColor"
																	stroke-width="1.5"
																	d="M12 8V12L14 14"
																></path>
															</svg>

															{{
																Math.floor(
																	retainer.daysLeft / (24 * 3600 * 1000)
																)
															}}
															days</span
														>
														<button
															v-if="retainer.status === 'active'"
															:disabled="loading"
															@click="
																handlePause(retainer.stripeSubscriptionId)
															"
															class="justify-right flex items-center rounded-md border border-slate-700 bg-slate-800 p-0.5 text-slate-200 transition-colors hover:border-slate-600 hover:text-white"
														>
															<svg
																v-if="loading"
																class="h-5 w-5 animate-spin"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M12 4.75V6.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M17.1266 6.87347L16.0659 7.93413"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M19.25 12L17.75 12"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M17.1266 17.1265L16.0659 16.0659"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M12 17.75V19.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M7.9342 16.0659L6.87354 17.1265"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M6.25 12L4.75 12"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M7.9342 7.93413L6.87354 6.87347"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
															</svg>
															<svg
																v-else
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
														<button
															v-else
															:disabled="loading"
															@click="
																handleResume(
																	retainer.stripeSubscriptionId,
																	retainer.daysLeft
																)
															"
															class="justify-right flex items-center rounded-md border border-slate-700 bg-slate-800 p-0.5 text-slate-200 transition-colors hover:border-slate-600 hover:text-white"
														>
															<svg
																v-if="loading"
																class="h-5 w-5 animate-spin"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M12 4.75V6.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M17.1266 6.87347L16.0659 7.93413"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M19.25 12L17.75 12"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M17.1266 17.1265L16.0659 16.0659"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M12 17.75V19.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M7.9342 16.0659L6.87354 17.1265"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M6.25 12L4.75 12"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M7.9342 7.93413L6.87354 6.87347"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
															</svg>

															<svg
																v-else
																class="h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
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
			<section aria-labelledby="plan-heading" v-if="false">
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

import { format, addDays } from 'date-fns';

import free from '@/assets/images/plans/free.png';
import support from '~/assets/images/plans/support.png';
import growth from '~/assets/images/plans/growth.png';
import enterprise from '~/assets/images/plans/enterprise.png';

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const state = reactive({
	kpis: { 'Task Runs': 0 },
	loading: true,
});



const kpis = ref(state.kpis);
const workflows = ref(state.workflows);
const loading = ref(state.loading);



let { data: User, error: userError } = await supabase
	.from('User')
	.select(
		`systemRole,Account(id,stripeCustomerId,trayWorkspaceId,type,Subscription(*))`
	)
	.eq('id', user.value.id)
	.limit(1)
	.single();

async function fetchData() {
	const workspaceId =
		User.Account.type === 'super_admin' ? 'null' : User.Account.trayWorkspaceId;
	const kpis = await $fetch(`/api/tray/kpis/${workspaceId}`);
	const data = { kpis };
	return data;
}

let retainer = {};
retainer = ref(User.Account.Subscription.find((o) => o.type === 'retainer'));

var date = new Date(Date.now());
var firstDay = new Date(
	date.getFullYear(),
	date.getMonth(),
	new Date(retainer.value.startDate).getDate()
);

onMounted(async () => {
	const { kpis } = await fetchData();
	state.kpis = kpis;

	loading.value = false;
});

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
