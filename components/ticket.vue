<template>
	<div class="flex min-h-full">
		<!-- Static sidebar for desktop -->

		<div class="flex w-0 flex-1 flex-col">
			<main class="flex-1">
				<div class="py-8 xl:py-10">
					<div
						class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3"
					>
						<div class="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8">
							<div>
								<div>
									<div
										class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6"
									>
										<div>
											<h1 class="text-2xl font-bold text-gray-900">
												ARIA attribute misspelled
											</h1>
											<p class="mt-2 text-sm text-gray-500">
												#400 opened by
												{{ ' ' }}
												<a href="#" class="font-medium text-gray-900"
													>Hilary Mahy</a
												>
												{{ ' ' }}
												in
												{{ ' ' }}
												<a href="#" class="font-medium text-gray-900"
													>Customer Portal</a
												>
											</p>
										</div>
										<div class="mt-4 flex space-x-3 md:mt-0">
											<button
												type="button"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>
												<PencilIcon
													class="-ml-0.5 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												Edit
											</button>
											<button
												type="button"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>
												<BellIcon
													class="-ml-0.5 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												Subscribe
											</button>
										</div>
									</div>
									<aside class="mt-8 xl:hidden">
										<h2 class="sr-only">Details</h2>
										<div class="space-y-5">
											<div class="flex items-center space-x-2">
												<LockOpenIcon
													class="h-5 w-5 text-green-500"
													aria-hidden="true"
												/>
												<span class="text-sm font-medium text-green-700"
													>Open Ticket</span
												>
											</div>
											<div class="flex items-center space-x-2">
												<ChatBubbleLeftEllipsisIcon
													class="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												<span class="text-sm font-medium text-gray-900"
													>4 comments</span
												>
											</div>
											<div class="flex items-center space-x-2">
												<CalendarIcon
													class="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												<span class="text-sm font-medium text-gray-900"
													>Created on
													<time datetime="2020-12-02">Dec 2, 2020</time></span
												>
											</div>
										</div>
										<div
											class="mt-6 space-y-8 border-t border-b border-gray-200 py-6"
										>
											<div>
												<h2 class="text-sm font-medium text-gray-500">
													Assignees
												</h2>
												<ul role="list" class="mt-3 space-y-3">
													<li class="flex justify-start">
														<a href="#" class="flex items-center space-x-3">
															<div class="flex-shrink-0">
																<img
																	class="h-5 w-5 rounded-full"
																	src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
																	alt=""
																/>
															</div>
															<div class="text-sm font-medium text-gray-900">
																Eduardo Benz
															</div>
														</a>
													</li>
												</ul>
											</div>
											<div>
												<h2 class="text-sm font-medium text-gray-500">Type</h2>
												<ul role="list" class="mt-2 leading-8">
													<li class="inline">
														<a
															href="#"
															class="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
														>
															<div
																class="absolute flex flex-shrink-0 items-center justify-center"
															>
																<span
																	class="h-1.5 w-1.5 rounded-full bg-rose-500"
																	aria-hidden="true"
																/>
															</div>
															<div
																class="ml-3 text-xs font-semibold text-gray-900"
															>
																👾 Bug
															</div>
														</a>
														{{ ' ' }}
													</li>
													<li class="inline">
														<a
															href="#"
															class="relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
														>
															<div
																class="absolute flex flex-shrink-0 items-center justify-center"
															>
																<span
																	class="h-1.5 w-1.5 rounded-full bg-indigo-500"
																	aria-hidden="true"
																/>
															</div>
															<div
																class="ml-3 text-xs font-semibold text-gray-900"
															>
																Accessibility
															</div>
														</a>
														{{ ' ' }}
													</li>
												</ul>
											</div>
										</div>
									</aside>
									<div class="py-3 xl:pt-6 xl:pb-0">
										<h2 class="sr-only">Description</h2>
										<div class="prose max-w-none">
											<p>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Expedita, hic? Commodi cumque similique id tempora
												molestiae deserunt at suscipit, dolor voluptatem,
												numquam, harum consequatur laboriosam voluptas tempore
												aut voluptatum alias?
											</p>
											<ul role="list">
												<li>
													Tempor ultrices proin nunc fames nunc ut auctor vitae
													sed. Eget massa parturient vulputate fermentum id
													facilisis nam pharetra. Aliquet leo tellus.
												</li>
												<li>
													Turpis ac nunc adipiscing adipiscing metus tincidunt
													senectus tellus.
												</li>
												<li>
													Semper interdum porta sit tincidunt. Dui suspendisse
													scelerisque amet metus eget sed. Ut tellus in sed
													dignissim.
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
								<div>
									<div class="divide-y divide-gray-200">
										<div class="pb-4">
											<h2
												id="activity-title"
												class="text-lg font-medium text-gray-900"
											>
												Activity
											</h2>
										</div>
										<div class="pt-6">
											<!-- Activity feed-->
											<comment-feed
												:card="card"
												:key="feedKey"
												v-if="!loading"
												@delete-comment="handleDeleteComment"
											/>
											<!-- Comment Box  -->
											<div class="mt-6">
												<div class="flex space-x-3">
													<div class="flex-shrink-0">
														<div class="relative">
															<img
																class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
																src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
																alt=""
															/>

															<span
																class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px"
															>
																<ChatBubbleLeftEllipsisIcon
																	class="h-5 w-5 text-gray-400"
																	aria-hidden="true"
																/>
															</span>
														</div>
													</div>
													<div class="min-w-0 flex-1">
														<form action="#">
															<div>
																<label for="comment" class="sr-only"
																	>Comment</label
																>
																<textarea
																	id="comment"
																	name="comment"
																	rows="3"
																	class="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:py-1.5 sm:text-sm sm:leading-6"
																	placeholder="Leave a comment"
																/>
															</div>
															<div
																class="mt-6 flex items-center justify-end space-x-4"
															>
																<button
																	type="button"
																	class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
																>
																	<CheckCircleIcon
																		class="-ml-0.5 h-5 w-5 text-green-500"
																		aria-hidden="true"
																	/>
																	Close ticket
																</button>
																<button
																	type="submit"
																	class="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
																>
																	Comment
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
						<aside class="hidden xl:block xl:pl-8">
							<h2 class="sr-only">Details</h2>
							<div class="space-y-5">
								<div class="flex items-center space-x-2">
									<LockOpenIcon
										class="h-5 w-5 text-green-500"
										aria-hidden="true"
									/>
									<span class="text-sm font-medium text-green-700"
										>Open Ticket</span
									>
								</div>
								<div class="flex items-center space-x-2">
									<ChatBubbleLeftEllipsisIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<span class="text-sm font-medium text-gray-900"
										>4 comments</span
									>
								</div>
								<div class="flex items-center space-x-2">
									<CalendarIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<span class="text-sm font-medium text-gray-900"
										>Created on
										<time datetime="2020-12-02">Dec 2, 2020</time></span
									>
								</div>
							</div>
							<div class="mt-6 space-y-8 border-t border-gray-200 py-6">
								<div>
									<h2 class="text-sm font-medium text-gray-500">Assignees</h2>
									<ul role="list" class="mt-3 space-y-3">
										<li class="flex justify-start">
											<a href="#" class="flex items-center space-x-3">
												<div class="flex-shrink-0">
													<img
														class="h-5 w-5 rounded-full"
														src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
														alt=""
													/>
												</div>
												<div class="text-sm font-medium text-gray-900">
													Eduardo Benz
												</div>
											</a>
										</li>
									</ul>
								</div>
								<div>
									<h2 class="text-sm font-medium text-gray-500">Type</h2>
									<ul role="list" class="mt-2 leading-8">
										<li class="inline">
											<a
												href="#"
												class="relative inline-flex items-center rounded-full bg-purple-100 px-2.5 py-1 ring-1 ring-inset ring-purple-300 hover:bg-purple-50"
											>
												<div
													class="absolute flex flex-shrink-0 items-center justify-center"
												>
													<span
														class="h-1.5 w-1.5 rounded-full bg-purple-500"
														aria-hidden="true"
													/>
												</div>
												<div class="ml-3 text-xs font-semibold text-purple-900">
													Bug
												</div>
											</a>
											{{ ' ' }}
										</li>
									</ul>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		ArchiveBoxIcon,
		Bars3BottomLeftIcon,
		Bars4Icon,
		ClockIcon,
		HomeIcon,
		UserCircleIcon as UserCircleIconOutline,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		BellIcon,
		CalendarIcon,
		ChatBubbleLeftEllipsisIcon,
		CheckCircleIcon,
		LockOpenIcon,
		MagnifyingGlassIcon,
		PencilIcon,
		TagIcon,
		UserCircleIcon as UserCircleIconMini,
	} from '@heroicons/vue/20/solid';

	const props = defineProps(['card', 'open', 'comments']);
	const feedKey = ref(0);
	const loading = ref(false);

	const navigation = [
		{ name: 'All Tickets', href: '#', icon: HomeIcon, current: true },
		{ name: 'My Tickets', href: '#', icon: Bars4Icon, current: false },
		{
			name: 'Assigned',
			href: '#',
			icon: UserCircleIconOutline,
			current: false,
		},
		{ name: 'Closed', href: '#', icon: ArchiveBoxIcon, current: false },
		{ name: 'Recent', href: '#', icon: ClockIcon, current: false },
	];
	const projects = [
		{ id: 1, name: 'GraphQL API', href: '#' },
		{ id: 2, name: 'iOS App', href: '#' },
		{ id: 3, name: 'Marketing Site Redesign', href: '#' },
		{ id: 4, name: 'Customer Portal', href: '#' },
	];
	const activity = [
		{
			id: 1,
			type: 'comment',
			person: { name: 'Eduardo Benz', href: '#' },
			imageUrl:
				'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
			date: '6d ago',
		},
		{
			id: 2,
			type: 'assignment',
			person: { name: 'Hilary Mahy', href: '#' },
			assigned: { name: 'Kristin Watson', href: '#' },
			date: '2d ago',
		},
		{
			id: 3,
			type: 'tags',
			person: { name: 'Hilary Mahy', href: '#' },
			tags: [
				{ name: '👾 Bug', href: '#', color: 'bg-rose-500' },
				{ name: 'Accessibility', href: '#', color: 'bg-indigo-500' },
			],
			date: '6h ago',
		},
		{
			id: 4,
			type: 'comment',
			person: { name: 'Jason Meyers', href: '#' },
			imageUrl:
				'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
			comment:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
			date: '2h ago',
		},
	];

	const sidebarOpen = ref(false);

	const handleDeleteComment = () => {
		loading.value = true;
		setTimeout(() => {
			feedKey.value++;
			loading.value = false;
		}, 1000);
	};

	const handleCommentAdd = async (card_id, text) => {
		const comment = await $fetch(
			`https://api.trello.com/1/cards/${card_id}/actions/comments?text=${
				`\{${user.value.email}\} --- ` + text
			}&${auth}`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
			}
		)
			.then((response) => {
				console.log(response);
				return response;
			})
			.catch((err) => console.error(err));
		comment_text.value = '';
		loading.value = true;
		setTimeout(() => {
			feedKey.value++;
			loading.value = false;
		}, 1000);

		return comment;
	};
</script>
