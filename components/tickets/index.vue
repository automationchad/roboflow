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
		{ plan: 'basic', count: 5 },
		{ plan: 'growth', count: 25 },
		{ plan: 'enterprise', count: 100 },
	];

	// Pagination refs
	const buildingPage = ref(0);
	const backlogPage = ref(0);
	const completedPage = ref(0);

	const tickets = ref([]);
	const active_tickets = ref([]);
	const backlog_tickets = ref([]);
	const done_tickets = ref([]);
	const loading = ref(true);

	// Fetch User data
	let { data: User, error: userError } = await supabase
		.from('User')
		.select('*,Account(id,type,trayWorkspaceId,Ticket(*),Subscription(*))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	// Fetch tickets data
	async function fetchData() {
		loading.value = true;
		const { data: Ticket, error } = await supabase.from('Ticket').select('*');
		let { data: User, error: userError } = await supabase
			.from('User')
			.select('*,Account(id,type,trayWorkspaceId,Ticket(*),Subscription(*))')
			.eq('id', user.value.id)
			.limit(1)
			.single();
		const response =
			User.Account.type === 'super_admin'
				? Ticket.sort((a, b) => b['dueDate'] - a['dueDate']).filter(
						(o) => o.accountId === route.params.team
				  )
				: User.Account.Ticket.filter((o) => o.teamId === route.params.team);
		tickets.value = response;
		active_tickets.value = response.filter(
			(ticket) => ticket.status === 'active'
		);
		backlog_tickets.value = response.filter(
			(ticket) => ticket.status === 'backlog'
		);
		done_tickets.value = response.filter((ticket) => ticket.status === 'done');
		loading.value = false;
	}

	// Refresh tickets data
	function refreshData() {
		fetchData();
	}

	// Call fetchData on component mounted
	onMounted(() => fetchData());

	// Modal control ref
	const showSubmitModal = ref(false);
	const showSessionModal = ref(false);

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

<template>
	<div>
		<div>
			<div class="mx-auto grid max-w-7xl">
				<div class="mb-8 border-b border-gray-200 py-5 dark:border-gray-800">
					<div
						class="-mt-2 flex flex-wrap items-center justify-end sm:flex-nowrap"
					>
						<div class="ml-4 mt-2 flex-shrink-0 space-x-3">
							<button
								:disabled="loading"
								data-tooltip-target="tooltip-default"
								@click="showSubmitModal = true"
								class="group relative inline-flex items-center rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-transparent dark:bg-slate-700 dark:text-white"
							>
								<svg
									v-if="loading"
									class="mr-2 h-5 w-5 animate-spin"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 4.75V6.25"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M17.1266 6.87347L16.0659 7.93413"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M19.25 12L17.75 12"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M17.1266 17.1265L16.0659 16.0659"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M12 17.75V19.25"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M7.9342 16.0659L6.87354 17.1265"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M6.25 12L4.75 12"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
									<path
										d="M7.9342 7.93413L6.87354 6.87347"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									></path>
								</svg>
								<svg class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" v-else>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"
									></path>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M12 8.75003V15.25"
									></path>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M15.25 12L8.75 12"
									></path>
								</svg>

								Add
								<!-- <upgrade-access v-if="upgrade_needed" :object="'tickets'" /> -->
							</button>
						</div>
					</div>
				</div>
				<div>
					<div>
						<div>
							<tickets-section
								title="Active"
								:tickets="active_tickets"
								:page="buildingPage"
								:loading="loading"
								@update:page="buildingPage = $event"
							/>

							<tickets-section
								title="Waiting"
								:tickets="backlog_tickets"
								:page="backlogPage"
								:loading="loading"
								@update:page="backlogPage = $event"
							/>

							<tickets-section
								title="Done"
								:tickets="done_tickets"
								:page="completedPage"
								:loading="loading"
								@update:page="completedPage = $event"
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
			<ticket-session
				v-show="showSessionModal"
				@ticket-submit="refreshData()"
				@close-modal="(showSessionModal = false), refreshData()"
			/>
		</div>
	</div>
</template>
