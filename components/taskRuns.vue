<template>
	<div class="">
		<main class="">
			<div class="">
				<div class="px-6">
					<div v-if="state.loading" class="flex items-center justify-center">
						<div class="flex items-center py-24">
							<svg
								class="-ml-1 mr-3 h-5 w-5 animate-spin text-black"
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
								></path></svg
							>Loading...
						</div>
					</div>
					<div v-else class="">
						<div id="chart" class="mt-8 h-full w-full">
							<div
								class="flex items-center py-24 text-sm font-normal text-slate-300"
								v-if="state.data === []"
							>
								No workflows
							</div>
							<BarChart v-else :data="state.data" />
						</div>
						<!-- <div
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
						</div> -->
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

	const statusStyles = {
		available: 'bg-green-100 text-green-800',
		pending: 'bg-yellow-100 text-yellow-800',
		failed: 'bg-red-100 text-red-800',
		refunded: 'bg-gray-100 text-gray-800',
	};

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

	const state = reactive({
		data: null,
		loading: true,
	});

	console.log(state);

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 billingEmail,
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

	async function fetchData() {
		const data = await $fetch('/api/tray/timeseries', { method: 'get' });
		return data;
	}

	onMounted(async () => {
		state.data = await fetchData();
		state.loading = false;
	});

	const task_data = state.data;
	const loading = state.loading;
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
