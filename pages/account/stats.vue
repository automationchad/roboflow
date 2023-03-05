<script setup>
	import { format } from 'date-fns';
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	const user = attrs.user;
	if (!user) {
		navigateTo('/');
	}
	const loading = ref(true);
	const username = ref('');
	const allAccess = ref(false);
	const templates = ref([]);
	const invoices = ref([]);
	const profile = attrs.profile;

	if (profile) {
		const invoices_result = await useFetch(
			`/api/invoices/${profile.workspaces.stripe_customer_id}`
		);
		invoices.value = invoices_result.data.value;
	}

	var date = new Date(Date.now());
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var d = new Date(new Date().getFullYear(), 0, 1);

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
					workspaces: [profile.workspaces.tray_workspace_id],
				},
				startPeriod: firstDay,
			},
		}
	);

	let { pending, data: workflow_runs } = await useLazyFetch(
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
					workspaces: [profile.workspaces.tray_workspace_id],
				},
				metric: 'TASK_RUNS',
				startPeriod: firstDay,
			},
		}
	);

	workflow_runs = Object.values(
		workflow_runs.value.data.timeseries
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
	kpis = kpis.value.data.kpis;
</script>

<template>
	<div>
		<div class="sm:px-46 mx-auto space-y-4 px-48 py-36 lg:px-48">
			<div class="grid grid-cols-3 gap-4">
				<div
					v-for="kpi in kpis.slice(3)"
					:key="kpi"
					class="rounded-lg border border-gray-200"
				>
					<div class="py-4 px-6">
						<p class="font-semibold uppercase tracking-tight text-gray-400">
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

							<span class="inline-flex items-center text-lg font-semibold">
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
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-4 grid grid-rows-2 gap-4">
					<div
						class="overflow-hidden rounded-lg border border-gray-200 px-8 py-8"
					>
						<div class="flex flex-wrap items-center justify-between">
							<p class="text-xl">Task Usage</p>

							<nav class="flex items-center justify-center gap-x-3">
								<a href="#" title="" class="ng dg jh lh th mi xe hf re dk qi">
									12 Months
								</a>

								<a
									href="#"
									title=""
									class="border-text-200 rounded border px-3 py-1"
								>
									6 Months
								</a>

								<a
									href="#"
									title=""
									class="border-text-200 rounded border px-3 py-1"
								>
									30 Days
								</a>

								<a
									href="#"
									title=""
									class="border-text-200 rounded border px-3 py-1"
								>
									7 Days
								</a>
							</nav>

							<button
								type="button"
								class="inline-flex items-center rounded border border-gray-200 px-2 py-1 text-sm shadow-sm hover:bg-gray-50"
							>
								<svg
									class="mr-1 h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									></path>
								</svg>
								Export to CSV
							</button>
						</div>

						<div id="chart" class="h-full w-full p-8">
							<BarChart :data="workflow_runs" />
						</div>
					</div>
					<div
						class="overflow-hidden rounded-lg border border-gray-200 px-8 py-8"
					>
						<div class="flex flex-wrap items-center justify-between">
							<p class="text-xl">Cost savings</p>

							<nav class="flex items-center justify-center gap-x-3">
								<a href="#" title="" class="ng dg jh lh th mi xe hf re dk qi">
									12 Months
								</a>

								<a
									href="#"
									title=""
									class="border-text-200 rounded border px-3 py-1"
								>
									6 Months
								</a>

								<a
									href="#"
									title=""
									class="border-text-200 rounded border px-3 py-1"
								>
									30 Days
								</a>

								<a
									href="#"
									title=""
									class="border-text-200 rounded border px-3 py-1"
								>
									7 Days
								</a>
							</nav>
							<button
								type="button"
								class="inline-flex items-center rounded border border-gray-200 px-2 py-1 text-sm shadow-sm hover:bg-gray-50"
							>
								<svg
									class="mr-1 h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									></path>
								</svg>
								Export to CSV
							</button>
						</div>

						<div id="chart" class="h-full w-full p-8">
							<BarChart :data="workflow_runs" />
						</div>
					</div>
				</div>

				<div class="col-span-2 rounded-lg border border-gray-200">
					<div class="p-8">
						<div class="nj rj tj">
							<p class="text-xl font-semibold">Billing</p>

							<div class="ab mj text-gray-400">
								<div>Next invoice: 2nd February, 2023</div>
							</div>
						</div>

						<div class="bb je mt-14">
							<div>
								<div class="mx-auto flex flex-col gap-y-4">
									<!-- <p class="gh mh th">Current usage:</p>
									<p class="gh mh th">
										${{ Math.round(taskPrice(kpis.slice(3)[1].value)) }}
									</p> -->
									<dt class="text-base leading-7 text-gray-600">
										{{ 'Estimated cost' }}
									</dt>
									<dd
										class="order-first text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
									>
										${{
											Math.round(
												taskPrice(
													(kpis.slice(3)[1].value / currentDays) * totalDays
												)
											).toLocaleString()
										}}
									</dd>
								</div>
							</div>
							<section class="pt-4">
								<table
									class="mt-4 w-full rounded-lg bg-white text-sm leading-6"
								>
									<caption class="sr-only">
										Purchase history
									</caption>
									<thead
										class="border-b border-slate-200 text-left text-slate-900 dark:border-slate-700"
									>
										<tr>
											<th class="w-0 py-3 font-semibold dark:text-white">
												Date
											</th>
											<th
												class="w-full py-3 pl-6 font-semibold dark:text-white"
											>
												Status
											</th>
											<th
												class="hidden w-0 py-3 pl-6 text-right font-semibold dark:text-white sm:table-cell"
											>
												Price
											</th>
											<th class="w-0 py-3 pl-6 pr-4 sm:pr-6">
												<span class="sr-only">Receipt</span>
											</th>
										</tr>
									</thead>
									<tbody class="whitespace-nowrap">
										<tr
											v-for="invoice in invoices.data.filter(
												(o) => o.metadata.type === 'monthly_tasks'
											)"
											:key="invoice.id"
											class="border-t border-slate-200 first:border-0 dark:border-slate-700"
										>
											<td
												class="py-3 align-top text-slate-600 dark:text-slate-500"
											>
												{{ format(new Date(invoice.created * 1000), 'd MMM') }}
											</td>
											<td
												class="max-w-0 py-3 pl-6 text-slate-900 dark:text-white"
											>
												<div class="flex items-center truncate">
													<div
														class="ml-1 flex items-center justify-between space-x-2 text-xs"
													>
														<div
															v-if="
																invoice.status &&
																!invoice.status_transitions.voided_at
															"
															class="flex items-center rounded-lg bg-lime-200 px-2 capitalize text-lime-700"
														>
															{{ invoice.status
															}}<svg
																class="h-4 w-4"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M7.75 12.75L10 15.25L16.25 8.75"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
															</svg>
														</div>
														<div
															v-else-if="invoice.status_transitions.voided_at"
															class="flex items-center rounded-lg bg-gray-200 px-2 capitalize text-gray-700"
														>
															{{ 'Refunded'
															}}<svg
																class="h-3 w-3"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M9.25 4.75L4.75 9L9.25 13.25"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M5.5 9H15.25C17.4591 9 19.25 10.7909 19.25 13V19.25"
																></path>
															</svg>
														</div>
														<div
															v-else
															class="rounded-lg bg-gray-200 px-2 capitalize text-gray-700"
														>
															{{ 'Failed' }}
														</div>
														<div
															v-if="invoice.subscription"
															class="text-gray-500"
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
																	d="M11.25 4.75L8.75 7L11.25 9.25"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M12.75 19.25L15.25 17L12.75 14.75"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M9.75 7H13.25C16.5637 7 19.25 9.68629 19.25 13V13.25"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M14.25 17H10.75C7.43629 17 4.75 14.3137 4.75 11V10.75"
																></path>
															</svg>
														</div>
													</div>
												</div>
												<div class="font-semibold sm:hidden">
													${{ invoice.total / 100 }}
												</div>
											</td>
											<td
												class="hidden py-3 pl-6 text-right font-semibold tabular-nums text-slate-900 dark:text-white sm:table-cell"
											>
												<span class=""
													>${{ (invoice.total / 100).toLocaleString() }}</span
												>
											</td>
											<td class="py-3 pl-6 pr-4 align-top sm:pr-6">
												<a
													:href="invoice.hosted_invoice_url"
													target="_blank"
													class="font-semibold text-sky-500 hover:text-sky-600"
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
															d="M13.75 4.75h-8v14.5l1.599-1.243a1 1 0 0 1 1.272.036L10 19.25l1.341-1.174a1 1 0 0 1 1.318 0L14 19.25l1.379-1.207a1 1 0 0 1 1.272-.036l1.599 1.243v-9m-4.5-5.5 4.5 5.5m-4.5-5.5v3.5a2 2 0 0 0 2 2h2.5"
														></path>
													</svg>
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				series: [44, 55, 41, 17, 15],
				chartOptions: {
					chart: {
						type: 'donut',
					},
					responsive: [
						{
							breakpoint: 480,
							options: {
								chart: {
									width: 200,
								},
								legend: {
									position: 'bottom',
								},
							},
						},
					],
				},
			};
		},
		computed: {
			currentDays() {
				var date = new Date();
				var time = date.getDate();
				return time;
			},
			totalDays() {
				var now = new Date();
				return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
			},
		},
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

			taskPrice(tasks) {
				let pricing = [...Array(8)].fill(undefined).map((_, i) => {
					const initial_value = 0.05;
					const decay_rate = 0.65;
					return initial_value * (1 - decay_rate) ** i;
				});

				if (tasks <= 1000) return tasks * pricing[0];
				if (tasks > 1000 && tasks <= 5000)
					return 1000 * pricing[0] + (tasks - 1000) * pricing[1];
				if (tasks > 5000 && tasks <= 10000)
					return (
						1000 * pricing[0] + 5000 * pricing[1] + (tasks - 5000) * pricing[2]
					);
				if (tasks > 10000 && tasks <= 50000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						(tasks - 10000) * pricing[3]
					);
				if (tasks > 50000 && tasks <= 100000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						(tasks - 50000) * pricing[4]
					);
				if (tasks > 100000 && tasks <= 500000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						100000 * pricing[4] +
						(tasks - 100000) * pricing[5]
					);
				if (tasks > 500000 && tasks <= 1000000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						100000 * pricing[4] +
						500000 * pricing[5] +
						(tasks - 500000) * pricing[6]
					);
				else
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						100000 * pricing[4] +
						500000 * pricing[5] +
						1000000 * pricing[6] +
						(tasks - 1000000) * pricing[7]
					);
			},
		},
	};
</script>
