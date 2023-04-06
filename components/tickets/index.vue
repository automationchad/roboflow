<template>
	<div>
		<div class="">
			<div class="mx-auto grid max-w-7xl">
				<div class="mb-8 border-b border-gray-200 py-5 dark:border-gray-800">
					<div
						class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
					>
						<div class="ml-4 mt-2">
							<h3
								class="flex items-center text-xl font-semibold leading-6 text-gray-900 dark:text-white"
							>
								Requests<a
									class="ml-2 text-slate-300"
									href="/support/guides/ticket-submit"
									><QuestionMarkCircleIcon class="h-5 w-5"
								/></a>
							</h3>
						</div>
						<div class="ml-4 mt-2 flex-shrink-0">
							<button
								:disabled="upgrade_needed || loading"
								data-tooltip-target="tooltip-default"
								@click="showSubmitModal = true"
								class="group relative inline-flex items-center rounded-lg border border-slate-300 px-4 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-transparent dark:bg-slate-700 dark:text-white"
							>
								<PlusCircleIcon class="mr-2 h-5 w-5" />
								Add
								<upgrade-access v-if="upgrade_needed" :object="'tickets'" />
							</button>
						</div>
					</div>
				</div>
				<div class="">
					<div v-if="loading" class="text-center">
						<div class="mt-8"><loading-spinner /></div>
					</div>
					<div class="" v-else>
						<div class="" v-if="tickets.length === 0">
							<p
								class="my-12 text-center text-sm text-gray-500 dark:text-slate-300"
							>
								No requests.
							</p>
						</div>
						<div class="" v-else>
							<div class="py-5">
								<div
									class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
								>
									<div class="ml-4 mt-2">
										<h3
											class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
										>
											Building
										</h3>
									</div>
									<div class="flex items-center space-x-3">
										<p class="text-xs" v-if="active_tickets.length > 0">
											Showing {{ buildingPage * limit + 1 }} to
											{{
												active_tickets.length / (buildingPage + 1) <= limit
													? active_tickets.length
													: buildingPage * limit + limit
											}}
											of
											{{ active_tickets.length }}
										</p>
										<div class="space-x-2">
											<button
												:disabled="buildingPage <= 0"
												class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
												@click="buildingPage--"
											>
												Previous page
											</button>
											<button
												:disabled="
													active_tickets.length / (buildingPage + 1) <= limit
												"
												class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
												@click="buildingPage++"
											>
												Next page
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
								<div
									v-if="active_tickets.length <= 0"
									class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-800"
								>
									<span
										class="my-2 block text-sm font-normal text-gray-900 dark:text-slate-400"
										>No active requests</span
									>
								</div>

								<tickets-pill
									v-for="ticket in active_tickets"
									:key="ticket.id"
									:ticket="ticket"
								/>
							</div>
							<div class="mt-8 py-5">
								<div
									class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
								>
									<div class="ml-4 mt-2 flex justify-between">
										<div class="">
											<h3
												class="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
											>
												Backlog
											</h3>
										</div>
									</div>
									<div class="flex items-center space-x-3">
										<p class="text-xs dark:text-gray-300">
											Showing {{ backLogPage * limit + 1 }} to
											{{
												backlog_tickets.length / (backLogPage + 1) <= limit
													? backlog_tickets.length
													: backLogPage * limit + limit
											}}
											of
											{{ backlog_tickets.length }}
										</p>
										<div class="space-x-2">
											<button
												:disabled="backLogPage <= 0"
												class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
												@click="backLogPage--"
											>
												Previous page
											</button>
											<button
												:disabled="
													backlog_tickets.length / (backLogPage + 1) <= limit
												"
												class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
												@click="backLogPage++"
											>
												Next page
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
								<div
									v-if="backlog_tickets.length <= 0"
									class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									<span
										class="my-2 block text-sm text-slate-900 dark:text-slate-400"
										>No backlogged requests</span
									>
								</div>

								<tickets-pill
									v-for="ticket in backlog_tickets.slice(
										backLogPage * limit,
										backLogPage * limit + limit
									)"
									:key="ticket.id"
									:ticket="ticket"
								/>
							</div>
							<div class="mt-4 py-5">
								<div
									class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
								>
									<div class="ml-4 mt-2">
										<h3
											class="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
										>
											Done
										</h3>
									</div>
									<div class="flex items-center space-x-3">
										<p class="text-xs" v-if="done_tickets.length > 0">
											Showing {{ completedPage * limit + 1 }} to
											{{
												done_tickets.length / (completedPage + 1) <= limit
													? done_tickets.length
													: completedPage * limit + limit
											}}
											of
											{{ done_tickets.length }}
										</p>
										<div class="space-x-2">
											<button
												:disabled="completedPage <= 0"
												class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 dark:bg-slate-800 dark:disabled:bg-slate-900"
												@click="completedPage--"
											>
												Previous page
											</button>
											<button
												:disabled="
													done_tickets.length / (completedPage + 1) <= limit
												"
												class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
												@click="completedPage++"
											>
												Next page
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
								<div
									v-if="done_tickets.length <= 0"
									class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-800"
								>
									<span
										class="my-2 block text-sm font-normal text-gray-900 dark:text-slate-400"
										>No completed requests</span
									>
								</div>

								<tickets-pill
									v-for="ticket in done_tickets.slice(
										completedPage * limit,
										completedPage * limit + limit
									)"
									:key="ticket.id"
									:ticket="ticket"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ticket-submit
				v-show="showSubmitModal"
				@close-modal="showSubmitModal = false"
				@ticket-submit="refreshData()"
				:list-id="backlogId"
				:auth="auth"
			/>
		</div>
	</div>
</template>

<script setup>
	import {
		PlusIcon,
		TicketIcon,
		ClockIcon,
		QuestionMarkCircleIcon,
		CalendarIcon,
		ShieldCheckIcon,
		CheckCircleIcon,
		PlusCircleIcon,
		PaperClipIcon,
	} from '@heroicons/vue/24/outline';
	import { format, formatDistance } from 'date-fns';
	import { reactive, onMounted, ref } from 'vue';
	definePageMeta({ middleware: ['auth'] });
	const route = useRoute();
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	const selected_card = ref({});
	const showSubmitModal = ref(false);
	const showTicketModal = ref(false);
	const showOtpModal = ref(false);
	const buildingPage = ref(0);
	const backLogPage = ref(0);
	const completedPage = ref(0);
	const limit = 3;

	const state = reactive({
		tickets: [],
		loading: true,
	});

	const tickets = ref([]);
	const active_tickets = ref([]);
	const backlog_tickets = ref([]);
	const done_tickets = ref([]);
	const loading = ref(true);

	onMounted(async () => {
		await getTickets();
		loading.value = false;
	});

	const refreshData = async () => {
		loading.value = true;
		await getTickets();
		setTimeout(() => {
			loading.value = false;
		}, 1000);
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select('*,Account(id,type,trayWorkspaceId,Ticket(*),Subscription(*))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const getTickets = async () => {
		const { data: Ticket, error } = await supabase.from('Ticket').select('*');
		const response =
			User.Account.type === 'super_admin'
				? Ticket.sort((a, b) => b['priority'] - a['priority'])
				: User.Account.Ticket.filter((o) => o.teamId == route.params.team);
		tickets.value = response;
		active_tickets.value = response.filter((o) => o.status === 'active');
		backlog_tickets.value = response.filter((o) => o.status === 'backlog');
		done_tickets.value = response.filter((o) => o.status === 'done');
	};

	const entitlements = [
		{ plan: 'free', count: 0 },
		{ plan: 'support', count: 5 },
		{ plan: 'growth', count: 25 },
		{ plan: 'enterprise', count: 100 },
	];

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');
	const totalActive = User.Account.Ticket.filter(
		(o) => o.status === 'active'
	).length;
	const entitlement = entitlements.find((v) => v.plan === retainer.tier);
	const upgrade_needed =
		totalActive >= entitlement.count &&
		retainer.status === 'active' &&
		User.systemRole !== 'super_admin';
</script>

<script>
	export default {
		data() {
			return {};
		},
		components: { ShieldCheckIcon, CheckCircleIcon, QuestionMarkCircleIcon },
	};
</script>
