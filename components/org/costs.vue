<template>
	<div class="">
		<div role="tabpanel">
			<div class="mt-8" v-if="!loading">
				<div class="block">
					<div class="">
						<div class="flex w-full">
							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base text-slate-600 dark:text-slate-200"
								>
									PLAN
								</p>
								<h3 class="my-8 text-2xl font-semibold dark:text-white">
									{{ formatNumber(monthly_sum) }}
								</h3>
							</div>
							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base text-slate-600 dark:text-slate-200"
								>
									TASKS
								</p>
								<h3
									:class="[
										super_admin ? 'text-rose-800 dark:text-rose-600' : 'dark:text-white text-gray-900',
										'my-8 flex items-center text-2xl font-semibold ',
									]"
								>
									{{
										hosting
											? super_admin
												? `(${formatNumber(trayCost(kpis['Task Runs']))})`
												: formatNumber(taskPrice(kpis['Task Runs']))
											: formatNumber(0)
									}}
									<div v-if="User.Account.type === 'super_admin'" class="">
										<!-- <p class="text-xs font-semibold text-rose-700">
											({{ formatNumber(trayCost(kpis['Task Runs'])) }})
										</p> -->
										<p class="ml-1 text-xs font-semibold text-lime-700">
											{{
												formatNumber(
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
									class="sc-kLLXSd text-base text-slate-600 dark:text-slate-200"
								>
									TOTAL COST
								</p>
								<h3 class="my-8 text-2xl font-semibold dark:text-white">
									{{
										formatNumber(
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
												:value="(kpis['Task Runs']*1000 / task_entitlement) * 100"
												max="100"
											>
												{{ (kpis['Task Runs']*1000 / task_entitlement) * 100 }}%
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
			background-image: -webkit-linear-gradient(
					top,
					rgba(255, 255, 255, 0.25),
					rgba(0, 0, 0, 0.25)
				),
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
			background-image: -webkit-linear-gradient(
					top,
					rgba(255, 255, 255, 0.25),
					rgba(0, 0, 0, 0.25)
				),
				-webkit-linear-gradient(left, rgb(58, 0, 204), rgb(75, 228, 255));

			border-radius: 0.5rem;
			background-size: 35px 20px, 100% 100%, 100% 100%;
		}
	}
</style>

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
		data: [],
		loading: true,
	});

	let { data: User, error: userError } = await supabase
		.from('User')
		.select('*,Account(type,Subscription(*))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const super_admin = User.Account.type === 'super_admin';

	const task_entitlement = super_admin ? 10000000 : 100000;

	const hosting = User.Account.Subscription.find((o) => o.type === 'hosting');

	const tiers = 10;
	const monthly_base = 150;

	var date = new Date(Date.now());
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	const monthly_sum = Math.round(
		User.Account.Subscription.reduce((acc, item) => {
			return acc + item.amount;
		}, 0) / 100
	);

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

	const formatNumber = (num) => {
		let formattedNum = Math.abs(num)
			.toFixed(2)
			.replace(/\d(?=(\d{3})+\.)/g, '$&,');
		return num < 0 ? `($${formattedNum})` : `$${formattedNum}`;
	};

	const workspaceId =
		User.Account.type === 'super_admin' ? 'null' : User.Account.trayWorkspaceId;

	async function fetchData() {
		const data = hosting ? await $fetch(`/api/tray/kpis/${workspaceId}`) : {};
		return data;
	}

	const kpis = ref(state.data);
	const loading = ref(state.loading);

	onMounted(async () => {
		kpis.value = await fetchData();
		loading.value = false;
	});

	const total_time_min = (kpis['Task Runs'] * 0.7) / 60;
	const total_time_hrs = (kpis['Task Runs'] * 0.7) / 3600;
</script>
