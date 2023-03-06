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
				<div class="mb-8 border-b border-gray-200 bg-white py-5">
					<div
						class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
					>
						<div class="ml-4 mt-2">
							<h3 class="text-xl font-semibold leading-6 text-gray-900">
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
					<div v-if="tickets.length === 0" class="text-center">
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
					</div>
					<div v-else class="">
						<div class="bg-white py-5">
							<div
								class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
							>
								<div class="ml-4 mt-2">
									<h3 class="text-base font-semibold leading-6 text-gray-900">
										Active
									</h3>
								</div>
							</div>
						</div>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
							<div
								v-for="ticket in tickets.filter((o) => o.idList === activeId)"
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
											class="mb-4 flex justify-between border-b border-gray-100 pb-4"
										>
											<div class="flex items-center space-x-4">
												<p class="text-sm font-medium text-gray-900">
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
							</div>
						</div>
						<div class="mt-8 bg-white py-5">
							<div
								class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
							>
								<div class="ml-4 mt-2 flex justify-between">
									<div class="">
										<h3 class="text-base font-semibold leading-6 text-gray-900">
											Backlog
										</h3>
									</div>
								</div>
								<div class="flex items-center space-x-3">
									<p class="text-sm">
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
							<div
								v-if="tickets.filter((o) => o.idList === backlogId).length <= 0"
								type="button"
								class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="my-2 block text-sm font-semibold text-gray-900"
									>Hooray...nothing to see here</span
								>
							</div>
							<div
								v-for="ticket in tickets
									.filter((o) => o.idList === backlogId)
									.slice(backLogPage * limit, backLogPage * limit + limit)"
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
							</div>
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
							<div
								v-if="
									tickets.filter((o) => o.idList === completedId).length <= 0
								"
								type="button"
								class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="my-2 block text-sm font-semibold text-gray-900"
									>Hooray...nothing to see here</span
								>
							</div>
							<div
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
							</div>
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
	const attrs = useAttrs();
	const user = useSupabaseUser();
  const profile = attrs.profile;
	if (!user.value) {
		navigateTo('/');
	}
	
	const success = ref(false);
	const test = false;
	const showOtpModal = ref(false);
	const auth = `key=8ec73785de7fe1ccc3f8c83aa07f85bd&token=ATTA9da8c99ddba28fd8b218a814b05c0dc3b05c7be57eb004508cc37467b6a162e914BB2F03`;

	let email = test ? 'automation@moleculartestinglabs.com' : user.value.email;
	let domain = email.split('@')[1];
	let boards = [];
	boards = await $fetch(
		`https://api.trello.com/1/organizations/motisgroup/boards?fields=name,id&${auth}`,
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
	console.log(tickets);
</script>

<script>
	export default {
		data() {
			return {
				showSubmitModal: false,
				showOtpModal: false,
				backLogPage: 0,
				completedPage: 0,
				limit: 3,
			};
		},
		components: { ShieldCheckIcon, CheckCircleIcon },
	};
</script>
