<template>
	<div class="">
		<warning-access :role="User.systemRole" />
		<div class="mt-8 space-y-6 lg:px-0">
			<loading-spinner v-if="state.loading" />
			<!-- Billing history -->
			<section aria-labelledby="billing-history-heading" v-else>
				<div class="sm:overflow-hidden">
					<div class="flex max-w-5xl flex-col">
						<div class="overflow-x-auto">
							<div class="inline-block min-w-full pt-2 align-middle">
								<div class="overflow-hidden">
									<div
										class="border-panel-border-light dark:border-panel-border-dark mb-8 w-full overflow-hidden rounded border border-slate-200 dark:border-slate-800 dark:bg-slate-900"
									>
										<div class="bg-panel-body-light dark:bg-panel-body-dark">
											<div class="flex items-center justify-between px-6 pt-4">
												<div class="flex flex-col">
													<h3 class="mb-0 text-xl dark:text-slate-100">
														Cost reports
													</h3>
												</div>
												<div class="flex items-end space-x-2 space-y-2">
													<NuxtLink
														to="/settings/billing/update"
														class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-slate-400 bg-slate-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-slate-300 hover:bg-slate-600 focus-visible:outline-4 focus-visible:outline-offset-1"
														type="button"
													>
														<span class="truncate">Export usage report</span>
													</NuxtLink>
													<NuxtLink
														to="/settings/billing/update"
														class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
														type="button"
													>
														<span class="truncate">Invoice</span>
													</NuxtLink>
												</div>
											</div>
											<div class="mt-2 px-6 pb-4"></div>
											<div
												class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 text-slate-500 dark:border-slate-800"
											>
												<div class="w-[40%]">
													<p class="text-scale-900 text-xs uppercase">Name</p>
												</div>
												<div class="flex w-[20%] justify-end">
													<p class="text-scale-900 text-xs uppercase">Status</p>
												</div>
												<div class="flex w-[20%] justify-end">
													<p class="text-scale-900 text-xs uppercase">Tasks</p>
												</div>
												<div class="flex w-[20%] justify-end">
													<p class="text-scale-900 text-xs uppercase">Amount</p>
												</div>
											</div>
											<div
												v-for="(team, idx) in teams"
												:key="team.name"
												class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 dark:border-slate-800 dark:text-slate-200"
											>
												<div class="flex w-[40%] items-center gap-3">
													<span class="text-sm">{{ team.name }}</span>
												</div>
												<div class="flex w-[20%] justify-end">
													<span
														:class="[
															styles[team.status],
															'rounded-full px-2 text-xs capitalize ring-1 ',
														]"
														>{{ team.status }}</span
													>
												</div>
												<div class="flex w-[20%] justify-end">
													<span class="text-sm">{{
														abbreviatedNumber(tasks)
													}}</span>
												</div>
												<div class="flex w-[20%] justify-end">
													<span class="text-sm">{{
														formatAccounting(taskPrice(tasks,false), true)
													}}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

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

	import { format, formatDistance } from 'date-fns';

	const state = reactive({
		invoices: [],
		loading: false,
	});

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	// let { data: User, error: userError } = await supabase
	// 	.from('User')
	// 	.select(`systemRole,Account(stripeCustomerId)`)
	// 	.eq('id', user.value.id)
	// 	.limit(1)
	// 	.single();

	const pastDue = () => {};

	const tasks = Math.ceil(Math.random() * 1000000);

	const styles = {
		active:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		pending:
			'bg-yellow-100 dark:bg-yellow-700 dark:ring-yellow-500 ring-yellow-300  text-yellow-900 dark:text-yellow-200',
		deleted:
			'bg-slate-100 dark:bg-slate-700 dark:ring-slate-500 ring-slate-300  text-slate-900 dark:text-slate-200',
		inactive:
			'bg-amber-100 dark:bg-amber-700 dark:ring-amber-500 ring-amber-300  text-amber-900 dark:text-amber-200',
		cancelled:
			'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		delinquent:
			'bg-rose-100 dark:bg-rose-700 dark:ring-rose-500 ring-rose-300 text-rose-900 dark:text-rose-200',
	};
	const fetchData = async () => {
		const { data } = await $fetch(
			`/api/stripe/invoices/${User.Account.stripeCustomerId}`
		);
		return data;
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
				Account (
			     id,
				 name,
				 type,
				 Subscription(*),
				 Team (
					id,
					name
				 ),
				 Ticket (count)
			   )
			 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const teams = ref([]);
	const entitlements = await getEntitlements();

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	const entitlement = entitlements[retainer.tier];

	const totalActive = User.Account.Ticket.filter(
		(o) => o.status !== 'done' && entitlement.ticket_types.includes(o.type)
	).length;
	const upgrade_needed = ref(false);
	upgrade_needed.value =
		totalActive > entitlement.ticket_count &&
		// retainer.status === 'active' &&
		User.systemRole !== 'super_admin';

	function moveOrgToFront(arr) {
		const orgIndex =
			User.Account.type === 'super_admin'
				? arr.findIndex((obj) => obj.id === User.Account.id)
				: arr.findIndex((obj) => obj.name === 'Organization');
		if (orgIndex > -1) {
			const orgObj = arr.splice(orgIndex, 1)[0];
			arr.unshift(orgObj);
		}
		return arr;
	}

	onMounted(async () => {
		let { data: Account, error: accountError } = await supabase
			.from('Account')
			.select('*,Ticket(status,type)');
		if (User.Account.type === 'super_admin') {
			teams.value = Account;
		} else {
			teams.value = User.Account.Team;
			const index = teams.value.indexOf((o) => User.defaultTeamId === o.id);
			const item = teams.value.splice(index, 1)[0];
			teams.value.unshift(item);
		}
		teams.value = moveOrgToFront(teams.value);
	});
</script>
