<template>
	<div class="">
		<main class="">
			<div class="">
				<div class="px-6">
					<div
						v-if="state.loading"
						class="flex items-center justify-center py-36"
					>
						<loading-spinner />
					</div>
					<div v-else class="">
						<div id="chart" class="mt-8 h-full w-full">
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
		const data = await $fetch(`/api/tray/timeseries/${workspaceId}`, {
			method: 'get',
		});
		return data;
	}

	onMounted(async () => {
		state.data = await fetchData();
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
