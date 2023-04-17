<template>
	<div class="">
		<main class="">
			<div class="">
				<div class="">
					<div
						v-if="state.loading"
						class="flex items-center justify-center py-36"
					>
						<loading-spinner />
					</div>
					<div v-else class="">
						<div id="chart" class="h-full w-full">
							<div
								class="flex items-center py-24 text-sm font-normal text-slate-300"
								v-if="!state.data"
							>
								No tasks
							</div>
							<div v-else>
								<div
									v-if="true"
									class="mb-8 overflow-hidden rounded border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
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
															class="flex h-8 w-8 items-center justify-center rounded bg-slate-50 dark:bg-slate-800"
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
																	d="m11.75 16.75 1.25 1.5s5.025-6.058 5.883-7.732c.857-1.675.162-3.71-1.553-4.548-1.525-.744-3.343.534-4.33 1.82-.987-1.286-2.805-2.564-4.33-1.82-1.542.753-2.26 2.474-1.766 4.03l.08.254M4.75 12.75H8l1 3.5 2-5.5 2 2h1.25"
																></path>
															</svg>
														</div>
														<h5 class="mb-0">Health</h5>
													</div>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr
												class="border-t border-slate-200 dark:border-slate-800"
											>
												<td
													class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
												>
													Successful<button data-state="closed">
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
															(state.data.response.successful /
																state.data.count) *
																100,
															false
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
																{{ state.data.response.successful }}
															</p>
															<p class="text-scale-1100 text-sm tabular-nums">
																{{ state.data.count }}
															</p>
														</div>
														<div
															class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
														>
															<div
																:class="[
																	state.data.response.successful /
																		state.data.count >
																	0.5
																		? 'bg-lime-500'
																		: 'bg-rose-700',
																	'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
																]"
																:style="`width: ${
																	(state.data.response.successful /
																		state.data.count) *
																	100
																}%`"
															></div>
														</div>
													</div>
												</td>
											</tr>
											<tr
												class="border-t border-slate-200 dark:border-slate-800"
											>
												<td
													class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
												>
													Failed<button data-state="closed">
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
															(state.data.response.failed / state.data.count) *
																100,
															false
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
																{{ state.data.response.failed }}
															</p>
															<p class="text-scale-1100 text-sm tabular-nums">
																{{ state.data.count }}
															</p>
														</div>
														<div
															class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
														>
															<div
																:class="[
																	state.data.response.failed /
																		state.data.count <
																	0.5
																		? 'bg-rose-800'
																		: 'bg-rose-900',
																	'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
																]"
																:style="`width: ${
																	(state.data.response.failed /
																		state.data.count) *
																	100
																}%`"
															></div>
														</div>
													</div>
												</td>
											</tr>
											<tr
												class="border-t border-slate-200 dark:border-slate-800"
											>
												<td
													class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
												>
													Terminated<button data-state="closed">
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
															(state.data.response.terminated /
																state.data.count) *
																100,
															false
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
																{{ state.data.response.terminated }}
															</p>
															<p class="text-scale-1100 text-sm tabular-nums">
																{{ state.data.count }}
															</p>
														</div>
														<div
															class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
														>
															<div
																:class="[
																	state.data.response.terminated /
																		state.data.count <
																	0.5
																		? 'bg-amber-500'
																		: 'bg-rose-700',
																	'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
																]"
																:style="`width: ${
																	(state.data.response.terminated /
																		state.data.count) *
																	100
																}%`"
															></div>
														</div>
													</div>
												</td>
											</tr>
											<tr
												class="border-t border-slate-200 dark:border-slate-800"
											>
												<td
													class="text-scale-1200 whitespace-nowrap px-6 py-3 text-sm"
												>
													Stopped<button data-state="closed">
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
															(state.data.response.stopped / state.data.count) *
																100,
															false
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
																{{ state.data.response.stopped }}
															</p>
															<p class="text-scale-1100 text-sm tabular-nums">
																{{ state.data.count }}
															</p>
														</div>
														<div
															class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-100 p-0 dark:bg-slate-700"
														>
															<div
																:class="[
																	state.data.response.stopped /
																		state.data.count <
																	0.5
																		? 'bg-lime-500'
																		: 'bg-rose-700',
																	'absolute inset-x-0 bottom-0 h-1 rounded transition-all',
																]"
																:style="`width: ${
																	(state.data.response.stopped /
																		state.data.count) *
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
	import { reactive, onMounted, ref } from 'vue';

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

	const props = defineProps({
		period: String,
	});

	const state = reactive({
		data: null,
		loading: true,
	});

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 type,
		 trayWorkspaceId,
		 stripeCustomerId,
		 Subscription(*),
		 Team (
			id,
			name
		 )
	   )`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const workspaceId =
		User.Account.type === 'super_admin' ? 'null' : User.Account.trayWorkspaceId;
	async function fetchData() {
		const data = await $fetch(`/api/tray/workflows/runs/${workspaceId}`, {
			method: 'get',
		});
		return data;
	}

	onMounted(async () => {
		state.data = await fetchData();
		state.loading = false;
		console.log(state.data);
	});
</script>

<script>
	// let { data: kpis } = await useLazyFetch(
	// 	'https://api.tray.io/insights/v1/executions/kpis',
	// 	{
	// 		method: 'post',
	// 		headers: {
	// 			Authorization: `Bearer ${tray_key}`,
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: {
	// 			endPeriod: new Date(Date.now()),
	// 			filters: {
	// 				workspaces: [User.Account.trayWorkspaceId],
	// 			},
	// 			startPeriod: firstDay,
	// 		},
	// 	}
	// );

	// let { data: all_kpis } = await useLazyFetch(
	// 	'https://api.tray.io/insights/v1/executions/kpis',
	// 	{
	// 		method: 'post',
	// 		headers: {
	// 			Authorization: `Bearer ${tray_key}`,
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: {
	// 			endPeriod: new Date(Date.now()),
	// 			filters: {},
	// 			startPeriod: firstDay,
	// 		},
	// 	}
	// );

	// kpis = kpis.value.data.kpis;
	// all_kpis = all_kpis.value.data.kpis;
</script>
