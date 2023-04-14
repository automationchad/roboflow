<script setup>
import { reactive, onMounted, ref } from 'vue';
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

import { format, addDays } from 'date-fns';

const user = useSupabaseUser();

const supabase = useSupabaseClient();

const state = reactive({
	kpis: { 'Task Runs': 0 },
	workflows: { count: 0, runs: 0 },
	loading: true,
});

let { data: User, error: userError } = await supabase
	.from('User')
	.select('*,Account(type,Subscription(*),Ticket(*),User(*))')
	.eq('id', user.value.id)
	.limit(1)
	.single();

const super_admin = User.Account.type === 'super_admin';

const plans = [
	{
		name: 'Free',
		id: 'free',
		desc: 'Experiment for free',
		features: ['No requests'],

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

		priceMonthly: 600,
		priceYearly: 6000,
		limit: 'Up to 5 active requests',
	},
	{
		name: 'Growth',
		id: 'growth',
		desc: 'We scale as you scale',

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

		priceMonthly: 5400,
		priceYearly: 54000,
		limit: 'Unlimited active requests',
	},
];

const entitlements = await getEntitlements();

const hosting = User.Account.Subscription.find((o) => o.type === 'hosting');

let retainer = {};
retainer = ref(User.Account.Subscription.find((o) => o.type === 'retainer'));

var date = new Date(Date.now());
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

const monthly_sum = Math.round(
	User.Account.Subscription.reduce((acc, item) => {
		return acc + item.amount;
	}, 0) / 100
);

const workspaceId =
	User.Account.type === 'super_admin' ? 'null' : User.Account.trayWorkspaceId;

async function fetchData() {
	const kpis = await $fetch(`/api/tray/kpis/${workspaceId}`);
	let workflows = {};
	workflows.runs = await $fetch(`/api/tray/workflows/runs/${workspaceId}`);
	workflows.count = kpis['Active Workflows'];
	const data = { kpis, workflows };
	return data;
}

const kpis = ref(state.kpis);
const workflows = ref(state.workflows);
const loading = ref(state.loading);

onMounted(async () => {
	const { kpis, workflows } = await fetchData();
	state.kpis = kpis;
	state.workflows = workflows;
	console.log(state.workflows);
	loading.value = false;
});
</script>

<template>
	<div class="">
		<div class="mx-auto w-full">
			<div class="container max-w-4xl space-y-8 py-8">
				<div class="relative">
					<div class="transition-opacity duration-300">
						<div v-if="!loading">
							<div class="mb-10" v-if="entitlements[retainer.tier].ticket_count - User.Account.Ticket.filter((o) => o.status !== 'done').length <= 0 || entitlements[retainer.tier].user_count - User.Account.User.length <= 0">
								<div
									class="block w-full rounded border border-slate-100 bg-slate-50 py-3 dark:border-slate-800 dark:bg-slate-900"
								>
									<div class="flex flex-col px-4">
										<div class="flex items-center justify-between">
											<div class="flex w-full space-x-3 lg:items-start">
												<span class="text-slate-900 dark:text-white"
													><svg
														xmlns="http://www.w3.org/2000/svg"
														width="21"
														height="21"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="8" x2="12" y2="12"></line>
														<line
															x1="12"
															y1="16"
															x2="12.01"
															y2="16"
														></line></svg
												></span>
												<div class="flex-grow">
													<h5 class="text-sm text-slate-900 dark:text-white">
														You are exceeding your plans quota
													</h5>
												</div>
											</div>
										</div>
										<div
											class="mt-3 flex flex-col space-y-3 overflow-hidden transition-all"
											style="max-height: 500px"
										>
											<div class="text-sm text-slate-500 dark:text-slate-400">
												<div class="p-1">
													<div>
														<p class="mb-4">
															Your project is currently on the
															<span class="capitalize">{{
																retainer.tier
															}}</span>
															tier -
															{{
																retainer.tier === 'enterprise'
																? 'Please schedule a call with us to discuss a custom plan to scale up.'
																: `upgrade to the ${plans[
																	plans.findIndex(
																		(o) => o.id === retainer.tier
																	) + 1
																].name
																} tier
																														for a greatly increased quota and continue to
																														scale.`
															}}
															<p v-if="retainer.tier !== 'enterprise'">
															See
															<a
																class="text-indigo-800 dark:text-indigo-400"
																href="https://app.motis.group/#pricing"
																>pricing page</a
															>
															for a full breakdown of available plans.
														</p>
														</p>
														
														<button
														v-if="retainer.tier !== 'enterprise'"
															class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
															type="button"
														>
															<span class="truncate">Upgrade to {{ plans[
																plans.findIndex(
																	(o) => o.id === retainer.tier
																) + 1
															].name }} </span>
														</button>
														<button
														v-else
															class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
															type="button"
														>
															<span class="truncate">Enquire about custom</span>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- Database -->
							<div
								class="mb-8 overflow-hidden rounded border border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
							>
								<table
									class="bg-panel-body-light dark:bg-panel-body-dark w-full"
								>
									<thead
										class="bg-panel-header-light dark:bg-panel-header-dark"
									>
										<tr class="overflow-hidden rounded">
											<th class="w-1/4 px-6 py-3 text-left">
												<div class="flex items-center space-x-4">
													<div
														class="flex h-8 w-8 items-center justify-center rounded dark:bg-slate-800 bg-slate-50"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															fill="none"
															viewBox="0 0 24 24"
														>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M8.25 5.75h-2.5a1 1 0 0 0-1 1v5.5m10.07-3.533c-1.786-1.074-.573-3.263-.573-3.263l-.946-.568a.95.95 0 0 0-1.325.37L6.88 14.448a1.034 1.034 0 0 0 .355 1.381l5.464 3.285a.95.95 0 0 0 1.325-.37l5.096-9.192a1.034 1.034 0 0 0-.355-1.381l-.946-.569s-1.213 2.19-3 1.115Z"
															></path>
														</svg>
													</div>
													<h5 class="mb-0">Requests</h5>
												</div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Active Tickets<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												{{ entitlements[retainer.tier]
																.ticket_count === 0 ? '-' :
													`${formatAccounting(
														(User.Account.Ticket.filter(
															(o) => entitlements[retainer.tier].ticket_types.includes(o.type) && o.status !== 'done'
														).length /
															entitlements[retainer.tier]
																.ticket_count) *
														100
													)} %`
												}}
											</td>
											<td v-if="entitlements[retainer.tier]
												.ticket_count === 0" class="px-6 py-3 text-sm text-scale-1200"><div class="flex items-center justify-between"><span>Not included in <span class="capitalize">{{ retainer.tier}}</span> tier</span>
												<NuxtLink to="/settings/billing/update"
														v-if="retainer.tier !== 'enterprise'"
															class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
															
														>
															<span class="truncate">Upgrade to {{ Object.values(entitlements).find(item => {
    return item['ticket_count'] > 0;
  }).name }} </span>
														</NuxtLink></div></td>
											<td v-else class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															{{
																User.Account.Ticket.filter(
															(o) => entitlements[retainer.tier].ticket_types.includes(o.type) && o.status !== 'done'
														).length
															}}
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															{{ entitlements[retainer.tier].ticket_count }}
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															:class="[
																User.Account.Ticket.filter(
																	(o) => o.status !== 'done'
																).length /
																	entitlements[retainer.tier].ticket_count <
																	1
																	? 'bg-lime-500'
																	: 'bg-rose-700',
																'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
															]"
															:style="`width: ${(User.Account.Ticket.filter(
																(o) => o.status !== 'done'
															).length /
																	entitlements[retainer.tier].ticket_count) *
																100
																}%`"
														></div>
													</div>
												</div>
											</td>
										</tr>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Concurrent Tickets<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												{{ entitlements[retainer.tier]
																.concurrent_ticket_count === 0 ? '-' :
													`${formatAccounting(
														(User.Account.Ticket.filter(
															(o) => o.status === 'active'
														).length /
															entitlements[retainer.tier]
																.concurrent_ticket_count) *
														100
													)} %`
												}}
												
											</td>
											
											<td v-if="entitlements[retainer.tier]
												.concurrent_ticket_count === 0" class="px-6 py-3 text-sm text-scale-1200"><div class="flex items-center justify-between"><span>Not included in <span class="capitalize">{{ retainer.tier}}</span> tier</span>
												<NuxtLink to="/settings/billing/update"
														v-if="retainer.tier !== 'enterprise'"
															class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
															
														>
															<span class="truncate">Upgrade to {{ Object.values(entitlements).find(item => {
    return item['concurrent_ticket_count'] > 0;
  }).name }} </span>
														</NuxtLink></div></td>
										<td v-else class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															{{
																User.Account.Ticket.filter(
																	(o) => o.status === 'active'
																).length
															}}
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															{{
																entitlements[retainer.tier]
																	.concurrent_ticket_count
															}}
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															:class="[
																User.Account.Ticket.filter(
																	(o) => o.status === 'active'
																).length /
																	entitlements[retainer.tier]
																		.concurrent_ticket_count <
																	1
																	? 'bg-lime-500'
																	: 'bg-rose-700',
																'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
															]"
															:style="`width: ${(User.Account.Ticket.filter(
																(o) => o.status === 'active'
															).length /
																	entitlements[retainer.tier]
																		.concurrent_ticket_count) *
																100
																}%`"
														></div>
													</div>
												</div>
											</td>
									</tr>
									</tbody>
								</table>
							</div>

							<div
								v-if="true"
								class="mb-8 overflow-hidden rounded border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
							>
								<table
									class="bg-panel-body-light dark:bg-panel-body-dark w-full"
								>
									<thead
										class="bg-panel-header-light dark:bg-panel-header-dark"
									>
										<tr class="overflow-hidden rounded">
											<th class="w-1/4 px-6 py-3 text-left">
												<div class="flex items-center space-x-4">
													<div
														class="bg-slate-50 flex h-8 w-8 items-center justify-center rounded dark:bg-slate-800"
													>
														<svg width="20" height="20" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.78168 19.25H13.2183C13.7828 19.25 14.227 18.7817 14.1145 18.2285C13.804 16.7012 12.7897 14 9.5 14C6.21031 14 5.19605 16.7012 4.88549 18.2285C4.773 18.7817 5.21718 19.25 5.78168 19.25Z"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 14C17.8288 14 18.6802 16.1479 19.0239 17.696C19.2095 18.532 18.5333 19.25 17.6769 19.25H16.75"></path>
  <circle cx="9.5" cy="7.5" r="2.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.75 10.25C16.2688 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2688 4.75 14.75 4.75"></path>
</svg>

													</div>
													<h5 class="mb-0">Users</h5>
												</div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Monthly Active Users<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												{{
													formatAccounting(
														(User.Account.User.length /
															entitlements[retainer.tier].user_count) *
														100
													)
												}}
												%
											</td>
											<td class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															{{ User.Account.User.length.toLocaleString() }}
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															{{
																entitlements[
																	retainer.tier
																].user_count.toLocaleString()
															}}
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															:class="[
																User.Account.User.length /
																	entitlements[retainer.tier].user_count <
																	1
																	? 'bg-lime-500'
																	: 'bg-rose-700',
																'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
															]"
															:style="`width: ${(User.Account.User.length /
																	entitlements[retainer.tier].user_count) *
																100
																}%`"
														></div>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<div
								class="mb-8 overflow-hidden rounded border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
							>
								<table
									class="bg-panel-body-light dark:bg-panel-body-dark w-full"
								>
									<thead
										class="bg-panel-header-light dark:bg-panel-header-dark"
									>
										<tr class="overflow-hidden rounded">
											<th class="w-1/4 px-6 py-3 text-left">
												<div
													class="flex items-center justify-between space-x-4"
												>
													<div class="flex items-center space-x-4">
														<div
															class="bg-slate-50 flex h-8 w-8 items-center justify-center rounded dark:bg-slate-800"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="2"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon dark:text-scale-100"
															>
																<polyline points="16 18 22 12 16 6"></polyline>
																<polyline points="8 6 2 12 8 18"></polyline>
															</svg>
														</div>
														<h5 class="mb-0">Workflows</h5>
													</div>
													
												</div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Workflow Count<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												{{ hosting ?
													`${formatAccounting(
														(state.workflows.count /
															entitlements[retainer.tier].workflow_count) *
														100
													)} %` : '-'
												}}
												
											</td>
											<td v-if="!hosting" class="px-6 py-3 text-sm text-scale-1200"><div class="flex items-center justify-between"><span>No hosting selected</span>
												<NuxtLink to="/settings/billing/update"
														v-if="retainer.tier !== 'enterprise'"
															class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
															
														>
															<span class="truncate">Upgrade hosting </span>
														</NuxtLink></div></td>
											<td v-else class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															{{ state.workflows.count.toLocaleString() }}
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															{{
																entitlements[
																	retainer.tier
																].workflow_count.toLocaleString()
															}}
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															:class="[
																state.workflows.count /
																	entitlements[retainer.tier].workflow_count <
																	1
																	? 'bg-lime-500'
																	: 'bg-rose-700',
																'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
															]"
															:style="`width: ${(state.workflows.count /
																	entitlements[retainer.tier].workflow_count) *
																100
																}%`"
														></div>
													</div>
												</div>
											</td>
										</tr>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Workflow Invocations<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												{{ hosting ?
													`${formatAccounting(
														(state.workflows.runs.count /
															entitlements[retainer.tier].workflow_runs) *
														100
													)} %` : '-'
												}}
												
											</td>
											<td v-if="!hosting" class="px-6 py-3 text-sm text-scale-1200"><div class="flex items-center justify-between"><span>No hosting selected</span>
												<NuxtLink to="/settings/billing/update"
														v-if="retainer.tier !== 'enterprise'"
															class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
															
														>
															<span class="truncate">Upgrade hosting </span>
														</NuxtLink></div></td>
											<td v-else class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															{{ state.workflows.runs.count.toLocaleString() }}
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															{{
																entitlements[
																	retainer.tier
																].workflow_runs.toLocaleString()
															}}
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															:class="[
																state.workflows.runs.count /
																	entitlements[retainer.tier].workflow_runs <
																	1
																	? 'bg-lime-500'
																	: 'bg-rose-700',
																'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
															]"
															:style="`width: ${(state.workflows.runs.count /
																	entitlements[retainer.tier].workflow_runs) *
																100
																}%`"
														></div>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div
								class="mb-8 overflow-hidden rounded border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
							>
								<table
									class="bg-panel-body-light dark:bg-panel-body-dark w-full"
								>
									<thead
										class="bg-panel-header-light dark:bg-panel-header-dark"
									>
										<tr class="overflow-hidden rounded">
											<th class="w-1/4 px-6 py-3 text-left">
												<div class="flex items-center space-x-4">
													<div
														class="bg-slate-50 flex h-8 w-8 items-center justify-center rounded dark:bg-slate-800"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon dark:text-scale-100"
														>
															<polygon
																points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
															></polygon>
														</svg>
													</div>
													<h5 class="mb-0">Tasks</h5>
												</div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Executions<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												
												{{ hosting ?
													`${formatAccounting(
														(state.kpis['Task Runs'] /
															entitlements[retainer.tier].execution_count) *
														100
													)} %` : '-'
												}}
											</td>
											<td v-if="!hosting" class="px-6 py-3 text-sm text-scale-1200"><div class="flex items-center justify-between"><span>No hosting selected</span>
												<NuxtLink to="/settings/billing/update"
														v-if="retainer.tier !== 'enterprise'"
															class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
															
														>
															<span class="truncate">Upgrade hosting </span>
														</NuxtLink></div></td>
											<td v-else class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															{{ state.kpis['Task Runs'].toLocaleString() }}
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															{{
																entitlements[
																	retainer.tier
																].execution_count.toLocaleString()
															}}
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															:class="[
																state.kpis['Task Runs'] /
																	entitlements[retainer.tier].execution_count <
																	1
																	? 'bg-lime-500'
																	: 'bg-rose-700',
																'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
															]"
															:style="`width: ${(state.kpis['Task Runs'] /
																	entitlements[retainer.tier].execution_count) *
																100
																}%`"
														></div>
													</div>
												</div>
											</td>
										</tr>
										<tr
											v-if="false"
											class="border-t border-slate-200 dark:border-slate-800"
										>
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Realtime Concurrent Peak Connections<button
													data-state="closed"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												0.00 %
											</td>
											<td class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															0
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															200
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															class="bg-brand-900 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
															style="width: 0%"
														></div>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div
								v-if="false"
								class="mb-8 overflow-hidden rounded border border-slate-200 dark:border-slate-800"
							>
								<table
									class="bg-panel-body-light dark:bg-panel-body-dark w-full"
								>
									<thead
										class="bg-panel-header-light dark:bg-panel-header-dark"
									>
										<tr class="overflow-hidden rounded">
											<th class="w-1/4 px-6 py-3 text-left">
												<div class="flex items-center space-x-4">
													<div
														class="bg-slate-50 flex h-8 w-8 items-center justify-center rounded dark:bg-slate-800"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon dark:text-scale-100"
														>
															<polyline points="21 8 21 21 3 21 3 8"></polyline>
															<rect x="1" y="3" width="22" height="5"></rect>
															<line x1="10" y1="12" x2="14" y2="12"></line>
														</svg>
													</div>
													<h5 class="mb-0">Storage</h5>
												</div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Storage space<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												7.64 %
											</td>
											<td class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															78.21 MB
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															1 GB
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															class="bg-brand-900 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
															style="width: 7.63735%"
														></div>
													</div>
												</div>
											</td>
										</tr>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Storage egress<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												212.95 %
											</td>
											<td class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex w-full flex-col">
													<div
														class="flex justify-between space-x-8 pb-1 align-baseline"
													>
														<p
															class="text-scale-1200 capitalize-sentence max-w-[75%] truncate text-sm"
														>
															4.26 GB
														</p>
														<p class="text-scale-1100 text-sm tabular-nums">
															2 GB
														</p>
													</div>
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
													>
														<div
															class="absolute inset-x-0 bottom-0 h-1 rounded bg-red-900 transition-all"
															style="width: 212.945%"
														></div>
													</div>
												</div>
											</td>
										</tr>
										<tr class="border-t border-slate-200 dark:border-slate-800">
											<td
												class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
											>
												Storage Images Transformed<button data-state="closed">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon ml-2"
													>
														<circle cx="12" cy="12" r="10"></circle>
														<line x1="12" y1="16" x2="12" y2="12"></line>
														<line x1="12" y1="8" x2="12.01" y2="8"></line>
													</svg>
												</button>
											</td>
											<td
												class="text-scale-1200 hidden w-1/5 whitespace-nowrap p-3 text-sm lg:table-cell"
											>
												-
											</td>
											<td class="text-scale-1200 px-6 py-3 text-sm">
												<div class="flex items-center justify-between">
													<span>Not included in Free tier</span
													><button
														class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														type="button"
													>
														<span class="truncate">Upgrade to Pro</span>
													</button>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div v-else><loading-spinner /></div>
					</div>
				</div>
			</div>
		</div>
		<div role="tabpanel" v-if="false">
			<div class="mt-8" v-if="!loading">
				<div class="block">
					<div class="">
						<div class="flex w-full">
							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base font-medium text-slate-600 dark:text-slate-200"
								>
									Base
								</p>
								<h3 class="my-8 text-2xl font-semibold dark:text-white">
									{{ formatAccounting(monthly_sum) }}
								</h3>
							</div>
							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base font-medium text-slate-600 dark:text-slate-200"
								>
									Tasks
								</p>
								<h3
									:class="[
										super_admin
											? 'text-rose-800 dark:text-rose-600'
											: 'text-gray-900 dark:text-white',
										'my-8 flex items-center text-2xl font-semibold ',
									]"
								>
									{{
										hosting
										? super_admin
											? `(${formatAccounting(trayCost(kpis['Task Runs']))})`
											: formatAccounting(taskPrice(kpis['Task Runs']))
										: formatAccounting(0)
									}}
									<div v-if="User.Account.type === 'super_admin'" class="">
										<!-- <p class="text-xs font-semibold text-rose-700">
											({{ formatAccounting(trayCost(kpis['Task Runs'])) }})
										</p> -->
										<p class="ml-1 text-xs font-semibold text-lime-700">
											{{
												formatAccounting(
													taskPrice(kpis['Task Runs']) -
													trayCost(kpis['Task Runs'])
												)
											}}
										</p>
									</div>
								</h3>
							</div>

							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base font-medium text-slate-600 dark:text-slate-200"
								>
									Total cost
								</p>
								<h3 class="my-8 text-2xl font-semibold dark:text-white">
									{{
										formatAccounting(
											(hosting
												? super_admin
													? trayCost(kpis['Task Runs'])
													: taskPrice(kpis['Task Runs'])
												: 0) + monthly_sum
										)
									}}
								</h3>
							</div>
						</div>
						<div class="sc-gsnTZi mb-4 dark:text-white">
							{{
								format(firstDay, 'MMM d') +
								' - ' +
								format(addDays(firstDay, 30), 'MMM d yyyy')
							}}
						</div>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-8">
					<div class="gwIZYl bg-gray-50 p-6 dark:bg-slate-800">
						<div class="sc-ckMVTt jUiJgh">
							<div
								class="sc-gsnTZi eMxiQG border-b border-gray-300 pb-3 dark:border-slate-600"
							>
								<h4 class="bOtoTi text-base font-semibold dark:text-white">
									Task Runs
								</h4>
								<div class="sc-TRNrF iPuFes"></div>
							</div>

							<div
								class="my-4 text-slate-600 dark:text-slate-300"
								v-if="hosting"
							>
								<div class="flex">
									<div>
										<div>
											<p
												class="text-3xl font-semibold text-slate-800 dark:text-white"
											>
												{{ kpis['Task Runs'].toLocaleString() }}/{{
													abbreviatedNumber(task_entitlement)
												}}
											</p>
										</div>
										<div>
											<p class="text-sm">Plan tasks used</p>
										</div>
									</div>
								</div>
								<div class="mt-2">
									<div class="">
										<div class="sc-hiMGwR dkaYIm">
											<progress
												id="file"
												:value="(kpis['Task Runs'] / task_entitlement) * 100"
												max="100"
											>
												{{ (kpis['Task Runs'] / task_entitlement) * 100 }}%
											</progress>
										</div>
									</div>
									<div class="flex">
										<p class="text-sm">
											{{
												Math.round(
													(kpis['Task Runs'] * 0.7) / 60 > 60
														? (kpis['Task Runs'] * 0.7) / 3600
														: (kpis['Task Runs'] * 0.7) / 60
												)
											}}
											Self-hosted
											{{
												(kpis['Task Runs'] * 0.7) / 60 > 60
												? 'hours'
												: 'minutes'
											}}
										</p>
									</div>
								</div>
							</div>
							<div
								v-else
								class="my-10 text-sm text-slate-600 dark:text-slate-300"
							>
								You'll need to
								<a
									:href="`/${User.Account.id}/settings/billing`"
									class="font-semibold text-indigo-500"
									>upgrade your hosting</a
								>
								to see tasks
							</div>
						</div>
					</div>
					<div class="bg-gray-50 p-6 dark:bg-slate-800">
						<div class="sc-ckMVTt jUiJgh">
							<div
								display="flex"
								class="sc-gsnTZi eMxiQG border-b border-gray-300 pb-3 dark:border-slate-600"
							>
								<h4 class="text-md font-semibold dark:text-white">
									Assistant user seats
								</h4>
							</div>

							<div class="my-4 text-sm text-slate-600 dark:text-slate-300">
								<p class="">Assistant seat pricing is not active yet.</p>
								<p>Assistant use won't be charged for the time being.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="mt-8"><loading-spinner /></div>
		</div>
	</div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
	progress[value] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 0.5rem;
	}

	progress[value]::-webkit-progress-bar {
		background-color: hsl(220, 36%, 25%);
		border-radius: 0.5rem;

		overflow: hidden;
	}

	progress[value]::-webkit-progress-value {
		background-image: -webkit-linear-gradient(top,
				rgba(255, 255, 255, 0.25),
				rgba(0, 0, 0, 0.25)),
			-webkit-linear-gradient(left, rgb(58, 0, 204), rgb(75, 228, 255));

		border-radius: 0.5rem;
		background-size: 35px 20px, 100% 100%, 100% 100%;
	}
}

@media (prefers-color-scheme: light) {
	progress[value] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 0.5rem;
	}

	progress[value]::-webkit-progress-bar {
		background-color: hsl(221, 100%, 96%);
		border-radius: 0.5rem;

		overflow: hidden;
	}

	progress[value]::-webkit-progress-value {
		background-image: -webkit-linear-gradient(top,
				rgba(255, 255, 255, 0.25),
				rgba(0, 0, 0, 0.25)),
			-webkit-linear-gradient(left, rgb(58, 0, 204), rgb(75, 228, 255));

		border-radius: 0.5rem;
		background-size: 35px 20px, 100% 100%, 100% 100%;
	}
}
</style>
