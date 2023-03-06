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
								v-for="ticket in tickets.filter(
									(o) => o.idList === '64040fc82c6113f036bf547b'
								)"
								:key="ticket.id"
								class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
							>
								<div class="flex-shrink-0">
									<img
										class="h-10 w-10 rounded-full"
										src="~/assets/images/logo.png"
										alt=""
									/>
								</div>
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
														differenceInBusinessDays(
															new Date(ticket.due),
															new Date()
														) +
														' days' ?? 'null'
												}}</span>
											</div>
										</div>

										<p class="truncate text-sm text-gray-500">
											{{ ticket.desc }}
										</p>
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
											tickets.filter(
												(o) => o.idList === '64040fbc24e31b54998629dc'
											).length /
												(backLogPage + 1) <=
											limit
												? tickets.filter(
														(o) => o.idList === '64040fbc24e31b54998629dc'
												  ).length
												: backLogPage * limit + limit
										}}
										of
										{{
											tickets.filter(
												(o) => o.idList === '64040fbc24e31b54998629dc'
											).length
										}}
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
												tickets.filter(
													(o) => o.idList === '64040fbc24e31b54998629dc'
												).length /
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
								v-for="ticket in tickets
									.filter((o) => o.idList === '64040fbc24e31b54998629dc')
									.slice(backLogPage * limit, backLogPage * limit + limit)"
								:key="ticket.id"
								class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
							>
								<div class="flex-shrink-0">
									<img
										class="h-10 w-10 rounded-full"
										src="~/assets/images/logo.png"
										alt=""
									/>
								</div>
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
													class="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800"
													>{{ 'Backlog' }}</span
												>
											</div>
											<div
												class="flex items-center space-x-1 text-sm text-gray-400"
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

										<p class="truncate text-sm text-gray-500">
											{{
												ticket.desc === ''
													? 'No description given'
													: ticket.desc
											}}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="bg-white py-5">
							<div
								class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
							>
								<div class="ml-4 mt-2">
									<h3 class="text-base font-semibold leading-6 text-gray-900">
										Completed
									</h3>
								</div>
							</div>
						</div>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div
								v-for="ticket in tickets.filter(
									(o) => o.idList === '64040fce591250ac309a581f'
								)"
								:key="ticket.id"
								class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
							>
								<div class="flex-shrink-0">
									<img
										class="h-10 w-10 rounded-full"
										src="~/assets/images/logo.png"
										alt=""
									/>
								</div>
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
													class="inline-flex items-center rounded-full bg-lime-100 px-2.5 py-0.5 text-xs font-medium text-lime-800"
													>{{ '✅ Done' }}</span
												>
											</div>
											<div
												class="flex items-center space-x-1 text-sm text-gray-400"
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

										<p class="truncate text-sm text-gray-500">
											{{ ticket.desc }}
										</p>
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
	} from '@heroicons/vue/24/outline';
	import { format, differenceInBusinessDays } from 'date-fns';
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	const user = useSupabaseUser();
	const profile = attrs.profile;
	const success = ref(false);
	const limit = 3;

	const showOtpModal = ref(false);

	if (!user.value) {
		navigateTo('/');
	}

	let tickets = [];
	tickets = await $fetch(
		`https://api.trello.com/1/boards/4DOSvwSr/cards?key=8ec73785de7fe1ccc3f8c83aa07f85bd&token=ATTA9da8c99ddba28fd8b218a814b05c0dc3b05c7be57eb004508cc37467b6a162e914BB2F03`,
		{
			method: 'GET',
		}
	)
		.then((response) => {
			return response;
		})
		.catch((err) => console.error(err));
</script>

<script>
	export default {
		data() {
			return { showSubmitModal: false, showOtpModal: false, backLogPage: 1 };
		},
		components: { ShieldCheckIcon, CheckCircleIcon },
	};
</script>
