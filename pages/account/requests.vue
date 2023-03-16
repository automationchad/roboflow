<template>
	<div>
		<div class="relative h-full">
			<Navbar
				class=""
				@open-modal="showLoginModal = true"
				:user="user"
				:profile="profile"
			/>
			<div class="mx-auto grid max-w-7xl py-24 sm:py-32">
				<div class="mb-8 border-b border-gray-200 py-5 dark:border-gray-800">
					<div
						class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
					>
						<div class="ml-4 mt-2">
							<h3
								class="text-xl font-semibold leading-6 text-gray-900 dark:text-white"
							>
								Requests
							</h3>
						</div>
						<div class="ml-4 mt-2 flex-shrink-0">
							<button
								@click="showSubmitModal = true"
								class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Create new request
							</button>
						</div>
					</div>
				</div>
				<div class="">
					<!-- <div v-if="tickets.length === 0" class="text-center">
						<TicketIcon class="mx-auto h-12 w-12 text-gray-400" />

						<h3 class="mt-2 text-sm font-semibold text-gray-900">
							No requests
						</h3>
						<p class="mt-1 text-sm text-gray-500">
							Get started by creating a new requests.
						</p>
						<div class="mt-6">
							<button
								@click="showSubmitModal = true"
								class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
								New Request
							</button>
						</div>
					</div> -->
					<div class="">
						<div class="py-5">
							<div
								class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
							>
								<div class="ml-4 mt-2">
									<h3
										class="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200"
									>
										Active
									</h3>
								</div>
							</div>
						</div>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
							<button
								@click="showSubmitModal = true"
								v-if="tickets.filter((o) => o.idList === activeId).length <= 0"
								type="button"
								class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="my-2 block text-sm font-semibold text-gray-900"
									>Hmmm...nothing to see here</span
								>
							</button>
							<button
								@click="handleShow(ticket)"
								v-for="ticket in tickets.filter((o) => o.idList === activeId)"
								:key="ticket.id"
								class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 dark:border-gray-600 dark:bg-slate-800 dark:hover:border-gray-500"
							>
								<!-- <div class="flex-shrink-0">
									<img
										class="h-10 w-10 rounded-full"
										src="~/assets/images/logo.png"
										alt=""
									/>
								</div> -->
								<div class="min-w-0 flex-1">
									<div class="focus:outline-none">
										<span class="absolute inset-0" aria-hidden="true" />
										<div
											class="mb-4 flex justify-between border-b border-gray-100 pb-4 dark:border-gray-700"
										>
											<div class="flex items-center space-x-4">
												<p
													class="text-sm font-medium text-gray-900 dark:text-white"
												>
													{{ ticket.name }}
												</p>
												<span
													class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
													>🧱 Building</span
												>
											</div>
											<div
												class="flex items-center space-x-1 text-sm text-gray-400"
											>
												<ClockIcon class="h-4 w-4" />
												<span>{{
													'In ' +
														differenceInDays(new Date(ticket.due), new Date()) +
														' days' ?? 'null'
												}}</span>
											</div>
										</div>
										<div class="flex justify-between space-x-8">
											<p class="truncate text-sm text-gray-500">
												{{ ticket.desc }}
											</p>
											<a
												v-if="ticket.badges.attachments"
												class="flex items-center space-x-1 text-sm text-gray-500"
												href=""
											>
												<PaperClipIcon class="h-5 w-5" />
											</a>
										</div>
									</div>
								</div>
							</button>
						</div>
						<div class="mt-8 py-5">
							<div
								class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
							>
								<div class="ml-4 mt-2 flex justify-between">
									<div class="">
										<h3
											class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
										>
											Backlog
										</h3>
									</div>
								</div>
								<div class="flex items-center space-x-3">
									<p class="text-sm dark:text-gray-300">
										Showing {{ backLogPage * limit + 1 }} to
										{{
											tickets.filter((o) => o.idList === backlogId).length /
												(backLogPage + 1) <=
											limit
												? tickets.filter((o) => o.idList === backlogId).length
												: backLogPage * limit + limit
										}}
										of
										{{ tickets.filter((o) => o.idList === backlogId).length }}
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
												tickets.filter((o) => o.idList === backlogId).length /
													(backLogPage + 1) <=
												limit
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
							<button
								@click="showSubmitModal = true"
								v-if="tickets.filter((o) => o.idList === backlogId).length <= 0"
								type="button"
								class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="my-2 block text-sm font-semibold text-gray-900"
									>Hmmm...nothing to see here</span
								>
							</button>
							<button
								@click="handleShow(ticket)"
								v-for="ticket in tickets
									.filter((o) => o.idList === backlogId)
									.slice(backLogPage * limit, backLogPage * limit + limit)"
								:key="ticket.id"
								class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 dark:bg-slate-800"
							>
								<!-- <div class="flex-shrink-0">
									<img
										class="h-10 w-10 rounded-full"
										src="~/assets/images/logo.png"
										alt=""
									/>
								</div> -->
								<div class="min-w-0 flex-1">
									<div class="focus:outline-none">
										<span class="absolute inset-0" aria-hidden="true" />
										<div
											class="mb-4 grid grid-cols-3 justify-between border-b border-gray-100 pb-4"
										>
											<div
												class="col-span-2 flex items-center space-x-4 overflow-hidden truncate"
											>
												<p class="truncate text-sm font-medium text-gray-900">
													{{ ticket.name }}
												</p>
												<div
													class="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800"
												>
													{{ '😭 Backlog' }}
												</div>
											</div>
											<div
												class="col-span-1 flex items-center justify-end space-x-1 text-sm text-gray-400"
											>
												<CalendarIcon class="h-4 w-4" />
												<span>{{
													format(
														new Date(ticket.dateLastActivity),
														'MMM d, yyyy'
													) ?? 'null'
												}}</span>
											</div>
										</div>

										<div class="flex justify-between space-x-4">
											<p class="truncate text-sm text-gray-500">
												{{ ticket.desc }}
											</p>
											<a
												v-if="ticket.badges.attachments"
												class="flex items-center space-x-1 text-sm text-gray-500"
												href=""
											>
												<PaperClipIcon class="h-5 w-5" />
											</a>
										</div>
									</div>
								</div>
							</button>
						</div>
						<div class="mt-4 bg-white py-5">
							<div
								class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
							>
								<div class="ml-4 mt-2">
									<h3 class="text-base font-semibold leading-6 text-gray-900">
										Completed
									</h3>
								</div>
								<div class="flex items-center space-x-3">
									<p class="text-sm">
										Showing {{ completedPage * limit + 1 }} to
										{{
											tickets.filter((o) => o.idList === completedId).length /
												(completedPage + 1) <=
											limit
												? tickets.filter((o) => o.idList === completedId).length
												: completedPage * limit + limit
										}}
										of
										{{ tickets.filter((o) => o.idList === completedId).length }}
									</p>
									<div class="space-x-2">
										<button
											:disabled="completedPage <= 0"
											class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
											@click="completedPage--"
										>
											Previous page
										</button>
										<button
											:disabled="
												tickets.filter((o) => o.idList === completedId).length /
													(completedPage + 1) <=
												limit
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
							<button
								@click="handleShow(ticket)"
								v-if="
									tickets.filter((o) => o.idList === completedId).length <= 0
								"
								type="button"
								class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="my-2 block text-sm font-semibold text-gray-900"
									>Hmmm...nothing to see here</span
								>
							</button>
							<button
								@click="handleShow(ticket)"
								v-for="ticket in tickets
									.filter((o) => o.idList === completedId)
									.slice(completedPage * limit, completedPage * limit + limit)"
								:key="ticket.id"
								class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
							>
								<!-- <div class="flex-shrink-0">
									<img
										class="h-10 w-10 rounded-full"
										src="~/assets/images/logo.png"
										alt=""
									/>
								</div> -->
								<div class="min-w-0 flex-1">
									<div class="focus:outline-none">
										<span class="absolute inset-0" aria-hidden="true" />
										<div
											class="mb-4 grid grid-cols-3 justify-between border-b border-gray-100 pb-4"
										>
											<div
												class="col-span-2 flex items-center space-x-4 truncate"
											>
												<p class="truncate text-sm font-medium text-gray-900">
													{{ ticket.name }}
												</p>
												<span
													class="inline-flex items-center rounded-full bg-lime-100 px-2.5 py-0.5 text-xs font-medium text-lime-800"
													>{{ '✅ Done' }}</span
												>
											</div>
											<div
												class="col-span-1 flex items-center justify-end space-x-1 text-sm text-gray-400"
											>
												<CheckCircleIcon class="h-4 w-4" />
												<span>{{
													format(
														new Date(ticket.dateLastActivity),
														'MMM d, yyyy'
													) ?? 'null'
												}}</span>
											</div>
										</div>

										<div class="flex justify-between space-x-4">
											<p class="truncate text-sm text-gray-500">
												{{ ticket.desc }}
											</p>
											<a
												v-if="ticket.badges.attachments"
												class="flex items-center space-x-1 text-sm text-gray-500"
												href=""
											>
												<PaperClipIcon class="h-5 w-5" />
											</a>
										</div>
									</div>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
			<RequestSubmit
				v-show="showSubmitModal"
				@close-modal="showSubmitModal = false"
				@submit-reload="getTickets(board, auth)"
				:list-id="backlogId"
				:auth="auth"
			/>
			<TicketModal
				:card="selected_card"
				:comments="comments"
				:open="showTicketModal"
				@close-modal="showTicketModal = false"
			/>
		</div>
	</div>
</template>

<script setup>
	import {
		PlusIcon,
		TicketIcon,
		ClockIcon,
		CalendarIcon,
		ShieldCheckIcon,
		CheckCircleIcon,
		PaperClipIcon,
	} from '@heroicons/vue/24/outline';
	import { format, differenceInDays } from 'date-fns';
	import { useAttrs } from 'vue';
	definePageMeta({ middleware: ['auth'] });
	const attrs = useAttrs();
	const test = false;

	const user = test ? { email: 'automation@motis.group' } : useSupabaseUser();
	if (!user.value) {
		navigateTo('/');
		location.reload();
	}

	const profile = attrs.profile;
	const selected_card = ref({});
	const showSubmitModal = ref(false);
	const showTicketModal = ref(false);
	const showOtpModal = ref(false);
	const backLogPage = ref(0);
	const completedPage = ref(0);
	const limit = 3;

	let subscription = { status: false };
	let email = 'automation@motis.group';
	let customer = {};
	if (profile?.workspaces?.billing_email) {
		email = profile?.workspaces?.billing_email;
		customer = await $fetch(`/api/stripe/customer?email=${email}`, {
			method: 'get',
		});
		if (customer.subscriptions.data.length > 0) {
			subscription = customer.subscriptions.data.find(
				(o) => o.plan?.metadata.type === 'retainer'
			);
		}
	}

	const domain = email.split('@')[1];
	const auth = `key=8ec73785de7fe1ccc3f8c83aa07f85bd&token=ATTA9da8c99ddba28fd8b218a814b05c0dc3b05c7be57eb004508cc37467b6a162e914BB2F03`;

	let boards = [];
	boards = await $fetch(
		`https://api.trello.com/1/organizations/motisgroup/boards?filter=open&fields=name,id&${auth}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}
	)
		.then((response) => {
			return response;
		})

		.catch((err) => console.error(err));

	const board = boards.find((board) => board.name === domain);
	let categories = [];
	categories = await $fetch(
		`https://api.trello.com/1/boards/${board.id}/lists?${auth}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}
	)
		.then((response) => {
			return response;
		})
		.catch((err) => console.error(err));

	const activeId = categories[0].id;
	const backlogId = categories[1].id;
	const completedId = categories[2].id;

	let tickets = [];
	const getTickets = async (board, auth) => {
		tickets = await $fetch(
			`https://api.trello.com/1/boards/${board.id}/cards?${auth}`,
			{
				method: 'GET',
			}
		)
			.then((response) => {
				return response;
			})
			.catch((err) => console.error(err));
	};
	await getTickets(board, auth);
	let comments = [];
	const handleShow = async (card) => {
		selected_card.value = card;
		showTicketModal.value = true;
	};
</script>

<script>
	export default {
		data() {
			return {};
		},
		components: { ShieldCheckIcon, CheckCircleIcon },
	};
</script>
