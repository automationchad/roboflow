<template>
	<div class="">
		<div class="border-b px-6 py-3 text-left dark:border-slate-800">
			<div class="flex items-center justify-between space-x-4">
				<div class="flex items-center justify-between space-x-4">
					<div
						class="flex h-8 w-8 items-center justify-center rounded bg-slate-50 dark:bg-slate-800"
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
					<h5 class="mb-0 font-semibold">Executions</h5>
				</div>

				<span class="text-sm tabular-nums">{{
					abbreviatedNumber(state.count)
				}}</span>
			</div>
		</div>
		<div v-if="state.loading" class="flex items-center justify-center py-36">
			<loading-spinner />
		</div>
		<div v-else class="p-6">
			<div id="chart" class="h-full w-full">
				<div
					class="flex items-center py-24 text-sm font-normal text-slate-300"
					v-if="!state.data"
				>
					No tasks
				</div>
				<ChartLine v-else :data="state.data" />
			</div>
		</div>
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
		count: 0,
		loading: true,
	});

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const route = useRoute();

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

	let workspaceId;

	const { data: Account, error: accountError } = await supabase
		.from('Account')
		.select('trayWorkspaceId')
		.eq('id', route.params.organization)
		.limit(1)
		.single();
	workspaceId = Account.trayWorkspaceId;

	async function fetchData() {
		const { data, count } = await $fetch(
			`/api/tray/executions/${workspaceId}`,
			{
				method: 'get',
			}
		);
		return { data, count };
	}

	onMounted(async () => {
		const { data, count } = await fetchData();
		state.count = count;
		state.data = data;
		state.loading = false;
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
