<template>
	<div>
		<div>
			<div class="mx-auto grid max-w-7xl">
				<div class="mb-8 border-b border-gray-200 py-5 dark:border-gray-800">
					<div
						class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
					>
						<div class="ml-4 mt-2">
							<h3
								class="flex items-center text-xl font-semibold leading-6 text-gray-900 dark:text-white"
							>
								Requests
								<a
									class="ml-2 text-slate-300"
									href="/support/guides/ticket-submit"
								>
									<QuestionMarkCircleIcon class="h-5 w-5" />
								</a>
								<button @click="refreshData()">refresh</button>
							</h3>
						</div>
						<div class="ml-4 mt-2 flex-shrink-0">
							<button
								:disabled="upgrade_needed || state.loading"
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
				<div>
					<div v-if="state.loading" class="text-center">
						<div class="mt-8">
							<loading-spinner />
						</div>
					</div>
					<div v-else>
						<div v-if="false">
							<p
								class="my-12 text-center text-sm text-gray-500 dark:text-slate-300"
							>
								No requests.
							</p>
						</div>
						<div v-else>
							<tickets-section
								title="Building"
								:tickets="active_tickets"
								:page="state.buildingPage"
								@update:page="state.buildingPage = $event"
							/>

							<tickets-section
								title="Backlog"
								:tickets="backlog_tickets"
								:page="state.backlogPage"
								@update:page="state.backlogPage = $event"
							/>

							<tickets-section
								title="Done"
								:tickets="done_tickets"
								:page="state.completedPage"
								@update:page="state.completedPage = $event"
							/>
						</div>
					</div>
				</div>
			</div>
			<ticket-submit
				v-show="showSubmitModal"
				@ticket-submit="refreshData()"
				@close-modal="(showSubmitModal = false), refreshData()"
			/>
		</div>
	</div>
</template>

<script setup>
	// Import Vue Composition API and date-fns functions
	import { reactive, onMounted, ref, computed } from 'vue';
	import { format, formatDistance } from 'date-fns';

	// Import heroicons
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

	// Custom hooks and constants
	const route = useRoute();
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const entitlements = [
		{ plan: 'free', count: 0 },
		{ plan: 'support', count: 5 },
		{ plan: 'growth', count: 25 },
		{ plan: 'enterprise', count: 100 },
	];

	// Pagination refs
	// const buildingPage = ref(1);
	// const backlogPage = ref(1);
	// const completedPage = ref(1);

	// Reactive state
	const state = reactive({
		tickets: [],
		buildingPage: 1,
		backlogPage: 1,
		completedPage: 1,
		loading: false,
	});

	const active_tickets = ref([]);
	const backlog_tickets = ref([]);
	const done_tickets = ref([]);

	onMounted(() => {
		watchEffect(() => {
			active_tickets.value = state.tickets.filter(
				(ticket) => ticket.status === 'active'
			);
			backlog_tickets.value = state.tickets.filter(
				(ticket) => ticket.status === 'backlog'
			);
			done_tickets.value = state.tickets.filter(
				(ticket) => ticket.status === 'done'
			);
		});
	});

	// Fetch User data
	let { data: User, error: userError } = await supabase
		.from('User')
		.select('*,Account(id,type,trayWorkspaceId,Ticket(*),Subscription(*))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	// Fetch tickets data
	async function fetchData() {
		state.loading = true;
		const { data: Ticket, error } = await supabase.from('Ticket').select('*');
		const response =
			User.Account.type === 'super_admin'
				? Ticket.sort((a, b) => b['priority'] - a['priority'])
				: User.Account.Ticket.filter((o) => o.teamId === route.params.team);
		state.tickets = response;
		state.loading = false;
	}

	// Refresh tickets data
	function refreshData() {
		fetchData();
	}

	// Call fetchData on component mounted
	onMounted(() => fetchData());

	// Modal control ref
	const showSubmitModal = ref(false);

	// If your application needs an upgrade to add tickets,
	// set `upgrade_needed` to true. Otherwise, set it to false.
	const upgrade_needed = ref(false);

	// Calculate the current user's entitlement and update `upgrade_needed`
	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');
	const totalActive = User.Account.Ticket.filter(
		(o) => o.status === 'active'
	).length;
	const entitlement = entitlements.find((v) => v.plan === retainer.tier);
	upgrade_needed.value =
		totalActive >= entitlement.count &&
		retainer.status === 'active' &&
		User.systemRole !== 'super_admin';
</script>
