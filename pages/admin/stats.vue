<template>
	<div class="min-h-full">
		<div class="flex flex-1 flex-col">
			<div
				class="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none"
			>
				<button
					type="button"
					class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
					@click="sidebarOpen = true"
				>
					<span class="sr-only">Open sidebar</span>
					<Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
				</button>
				<!-- Search bar -->
			</div>
			<main class="flex-1 pb-8">
				<!-- Page header -->

				<div class="mt-8">
					<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<h2 class="text-lg font-medium leading-6 text-gray-900">
							Overview
						</h2>
						<div id="chart" class="h-full w-full p-8">
							<BarChart :data="workflow_runs" />
						</div>
						<div
							class="mt-4 mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
						>
							<div
								v-for="kpi in kpis"
								:key="kpi"
								class="overflow-hidden rounded-lg bg-white shadow"
							>
								<div class="py-4 px-6">
									<p class="truncate text-sm font-medium text-gray-500">
										{{ kpi.name }}
									</p>
									<div class="mt-2 flex items-center justify-between">
										<svg
											v-if="pending"
											class="-ml-1 mr-3 h-5 w-5 animate-spin text-blue-300"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											></circle>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										<p v-else class="text-xl font-bold text-gray-700">
											{{ abbreviatedNumber(kpi.value) }}{{ kpi.unit }}
										</p>

										<span
											class="inline-flex items-center text-lg font-semibold"
										>
											{{ kpi.percentageChange ? kpi.percentageChange : '' }}%
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="ml-1 block h-4 w-4 align-middle"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="3"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M7 11l5-5m0 0l5 5m-5-5v12"
												></path>
											</svg>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div
							class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
						>
							<!-- Card -->
							<div
								v-for="card in cards"
								:key="card.name"
								class="overflow-hidden rounded-lg bg-white shadow"
							>
								<div class="p-5">
									<div class="flex items-center">
										<div class="flex-shrink-0">
											<component
												:is="card.icon"
												class="h-6 w-6 text-gray-400"
												aria-hidden="true"
											/>
										</div>
										<div class="ml-5 w-0 flex-1">
											<dl>
												<dt class="truncate text-sm font-medium text-gray-500">
													{{ card.name }}
												</dt>
												<dd>
													<div class="text-lg font-medium text-gray-900">
														${{ card.amount.toLocaleString() }}
													</div>
												</dd>
											</dl>
										</div>
									</div>
								</div>
								<div class="bg-gray-50 px-5 py-3">
									<div class="text-sm">
										<a
											:href="card.href"
											class="font-medium text-cyan-700 hover:text-cyan-900"
											>View all</a
										>
									</div>
								</div>
							</div>
						</div>
					</div>

					<h2
						class="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8"
					>
						Recent activity
					</h2>

					<!-- Activity list (smallest breakpoint only) -->
					<div class="shadow sm:hidden">
						<ul
							role="list"
							class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
						>
							<li v-for="transaction in transactions" :key="transaction.id">
								<a
									:href="transaction.href"
									class="block bg-white px-4 py-4 hover:bg-gray-50"
								>
									<span class="flex items-center space-x-4">
										<span class="flex flex-1 space-x-2 truncate">
											<BanknotesIcon
												class="h-5 w-5 flex-shrink-0 text-gray-400"
												aria-hidden="true"
											/>
											<span
												class="flex flex-col truncate text-sm text-gray-500"
											>
												<span class="truncate">{{ transaction.name }}</span>
												<span
													><span class="font-medium text-gray-900">{{
														transaction.amount
													}}</span>
													{{ transaction.currency }}</span
												>
												<time :datetime="transaction.datetime">{{
													transaction.date
												}}</time>
											</span>
										</span>
										<ChevronRightIcon
											class="h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
									</span>
								</a>
							</li>
						</ul>

						<nav
							class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
							aria-label="Pagination"
						>
							<div class="flex flex-1 justify-between">
								<a
									href="#"
									class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
									>Previous</a
								>
								<a
									href="#"
									class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
									>Next</a
								>
							</div>
						</nav>
					</div>

					<!-- Activity table (small breakpoint and up) -->
					<div class="hidden sm:block">
						<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
							<div class="mt-2 flex flex-col">
								<div
									class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
								>
									<table class="min-w-full divide-y divide-gray-200">
										<thead>
											<tr>
												<th
													class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
													scope="col"
												>
													Transaction
												</th>
												<th
													class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
													scope="col"
												>
													Customer
												</th>
												<th
													class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
													scope="col"
												>
													Amount
												</th>
												<th
													class="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
													scope="col"
												>
													Status
												</th>
												<th
													class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
													scope="col"
												>
													Date
												</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-200 bg-white">
											<tr
												v-for="transaction in transactions.slice(0, 10)"
												:key="transaction.id"
												class="bg-white"
											>
												<td
													class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900"
												>
													<div class="flex">
														<a
															:href="transaction.href"
															class="group inline-flex space-x-2 truncate text-sm"
														>
															<BanknotesIcon
																class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
																aria-hidden="true"
															/>
															<p
																class="truncate text-gray-500 group-hover:text-gray-900"
															>
																{{
																	transaction.description ?? transaction.source
																}}
															</p>
														</a>
													</div>
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
												>
													{{
														transaction.billing_details?.email ??
														transaction.customer
													}}
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-right text-sm uppercase text-gray-500"
												>
													<span
														:class="[
															transaction.refunded
																? 'text-gray-500'
																: 'text-gray-900',
															'font-medium',
														]"
														>${{
															(
																(transaction.amount - transaction.fee) /
																100
															).toLocaleString()
														}}</span
													>
													{{ transaction.currency }}
												</td>
												<td
													class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block"
												>
													<span
														:class="[
															statusStyles[
																transaction.refunded
																	? 'refunded'
																	: transaction.status
															],
															'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
														]"
														>{{
															transaction.refunded
																? 'Refunded'
																: transaction.status
														}}</span
													>
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
												>
													{{
														format(
															transaction.available_on * 1000,
															'do MMM, yyyy'
														)
													}}
												</td>
											</tr>
										</tbody>
									</table>
									<!-- Pagination -->
									<nav
										class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
										aria-label="Pagination"
									>
										<div class="hidden sm:block">
											<p class="text-sm text-gray-700">
												Showing
												{{ ' ' }}
												<span class="font-medium">1</span>
												{{ ' ' }}
												to
												{{ ' ' }}
												<span class="font-medium">10</span>
												{{ ' ' }}
												of
												{{ ' ' }}
												<span class="font-medium">20</span>
												{{ ' ' }}
												results
											</p>
										</div>
										<div class="flex flex-1 justify-between sm:justify-end">
											<a
												href="#"
												class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
												>Previous</a
											>
											<a
												href="#"
												class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
												>Next</a
											>
										</div>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useAttrs } from 'vue';
	import { format } from 'date-fns';

	import {
		Dialog,
		DialogPanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3CenterLeftIcon,
		BellIcon,
		ClockIcon,
		CogIcon,
		CreditCardIcon,
		DocumentChartBarIcon,
		HomeIcon,
		QuestionMarkCircleIcon,
		ScaleIcon,
		ShieldCheckIcon,
		UserGroupIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		BanknotesIcon,
		BuildingOfficeIcon,
		CheckCircleIcon,
		ChevronDownIcon,
		ChevronRightIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	const attrs = useAttrs();
	const user = attrs.user;
	const profile = attrs.profile;
	const transactions = ref([]);
	const balance = ref({});
	const workflow_runs = ref([]);
	if (!user || profile.workspaces.type !== 'super_admin') {
		navigateTo('/');
	}

	var date = new Date(Date.now());
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var d = new Date(new Date().getFullYear(), 0, 1);

	
	const transactions_result = await useFetch(`/api/charges`);
	const balance_result = await useFetch(`/api/balance`);
	balance.value = balance_result.data.value.data;
	transactions.value = transactions_result.data.value.data.data;

    
    const supabase = useSupabaseClient();
	const { data: workspaces } = await supabase
		.from('workspaces')
		.select(`tray_workspace_id`)
		.neq('type', 'super_admin');

	let { data: kpis } = await useLazyFetch(
		'https://api.tray.io/insights/v1/executions/kpis',
		{
			method: 'post',
			headers: {
				Authorization:
					'Bearer dae2c6823fc64ce1ab72034d943f1e01df20bf7eeec94e13bf4e5534486f0a35',
				'Content-Type': 'application/json',
			},
			body: {
				endPeriod: new Date(Date.now()),
				filters: {
					workspaces: workspaces.map((o) => o.tray_workspace_id),
				},
				startPeriod: firstDay,
			},
		}
	);

	let { data: all_kpis } = await useLazyFetch(
		'https://api.tray.io/insights/v1/executions/kpis',
		{
			method: 'post',
			headers: {
				Authorization:
					'Bearer dae2c6823fc64ce1ab72034d943f1e01df20bf7eeec94e13bf4e5534486f0a35',
				'Content-Type': 'application/json',
			},
			body: {
				endPeriod: new Date(Date.now()),
				filters: {},
				startPeriod: firstDay,
			},
		}
	);

	kpis = kpis.value.data.kpis;
	all_kpis = all_kpis.value.data.kpis;
	kpis = kpis
		.slice(1)
		.slice(-3)
		.concat(all_kpis.slice(1).slice(-3))
		.filter((o) => o.name === 'Task Runs');
	kpis.unshift({ name: 'Active Customers', value: workspaces.length });
	kpis[1].name = 'Customer Tasks';
	kpis[2].name = 'Total Tasks';

	let { data: result } = await useLazyFetch(
		'https://api.tray.io/insights/v1/executions/timeseries',
		{
			method: 'post',
			headers: {
				Authorization:
					'Bearer dae2c6823fc64ce1ab72034d943f1e01df20bf7eeec94e13bf4e5534486f0a35',
				'Content-Type': 'application/json',
			},
			body: {
				endPeriod: new Date(Date.now()),
				filters: {
					workspaces: workspaces.map((o) => o.tray_workspace_id),
				},
				metric: 'TASK_RUNS',
				startPeriod: firstDay,
			},
		}
	);

	console.log(workflow_runs);

	workflow_runs.value = Object.values(
		result.value.data.timeseries
			.map((o) =>
				o.series.map((v) => {
					return {
						date: v.value[0],
						value: v.value[1],
					};
				})
			)
			.flat()
			.reduce((acc, curr) => {
				const date = curr.date.split('T')[0];
				if (!acc[date]) {
					acc[date] = { date, value: 0 };
				}
				acc[date].value += curr.value;
				return acc;
			}, {})
	).map((o) => {
		return { date: new Date(o.date).getDate(), value: o.value };
	});

	const trayCost = (tasks) => {
		if (tasks <= 1000000) return tasks * (2.04 / 1000);
		if (tasks > 1000000 && tasks <= 3000000)
			return 1000000 * (2.04 / 1000) + (tasks - 1000000) * (1.8 / 1000);
		if (tasks > 3000000 && tasks <= 10000000)
			return (
				1000000 * (2.04 / 1000) +
				3000000 * (1.8 / 1000) +
				(tasks - 3000000) * (1.56 / 1000)
			);
		if (tasks > 10000000 && tasks <= 20000000)
			return (
				1000000 * (2.04 / 1000) +
				3000000 * (1.8 / 1000) +
				10000000 * (1.56 / 1000) +
				(tasks - 10000000) * (1.2 / 1000)
			);
		if (tasks > 20000000 && tasks <= 40000000)
			return (
				1000000 * (2.04 / 1000) +
				3000000 * (1.8 / 1000) +
				10000000 * (1.56 / 1000) +
				20000000 * (1.2 / 1000) +
				(tasks - 20000000) * (0.96 / 1000)
			);
		else return tasks * 0.005;
	};

	const cards = [
		{
			name: 'Account balance',
			href: '#',
			icon: ScaleIcon,
			amount: balance.value.available[0].amount / 100,
		},
		{
			name: 'Pending',
			href: '#',
			icon: ScaleIcon,
			amount: balance.value.pending[0].amount / 100,
		},
		{
			name: 'Tray Cost',
			href: '#',
			icon: ScaleIcon,
			amount: Math.round(trayCost(all_kpis.slice(3)[1].value)).toLocaleString(),
		},
		// More items...
	];
	// const transactions = [
	// 	{
	// 		id: 1,
	// 		name: 'Payment to Molly Sanders',
	// 		href: '#',
	// 		amount: '$20,000',
	// 		currency: 'USD',
	// 		status: 'success',
	// 		date: 'July 11, 2020',
	// 		datetime: '2020-07-11',
	// 	},
	// 	// More transactions...
	// ];
	const statusStyles = {
		available: 'bg-green-100 text-green-800',
		pending: 'bg-yellow-100 text-yellow-800',
		failed: 'bg-red-100 text-red-800',
		refunded: 'bg-gray-100 text-gray-800',
	};

	const sidebarOpen = ref(false);
</script>

<script>
	export default {
		methods: {
			abbreviatedNumber(number) {
				const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
				const tier = (Math.log10(Math.abs(number)) / 3) | 0;
				if (tier === 0) {
					return number;
				}
				const suffix = SI_SYMBOL[tier];
				const scale = 10 ** (tier * 3);
				const scaled = number / scale;
				const length = scaled.toFixed(1).toString();
				const precision = length > 3 ? 0 : 1;
				return scaled.toFixed(precision) + suffix;
			},
		},
	};
</script>
