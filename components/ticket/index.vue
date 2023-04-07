<template>
	<div class="flex min-h-full">
		<div class="flex w-0 flex-1 flex-col">
			<main class="flex-1">
				<div class="py-8 xl:py-10">
					<div
						class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3"
					>
						<div
							class="dark:border-slate-800 xl:col-span-2 xl:border-gray-200 xl:pr-8"
						>
							<div>
								<div>
									<div
										class="grid grid-cols-7 justify-between md:space-x-4"
									>
										<div class="col-span-7">
											<footer class="mb-4 flex w-full items-center" id="posted-by">
												<img
													v-if="Ticket.User.avatarPath"
													:src="`https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/avatars/${Ticket.User.id}`"
													class="mr-2 flex h-12 w-12 object-cover items-center justify-center rounded-full border border-slate-700"
												/>

												<div
													v-else
													class="mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800"
												>
													<div class="text-white">
														{{ Ticket.User.firstName[0]
														}}{{ Ticket.User.lastName[0] }}
													</div>
												</div>

												<div class="">
													<div class="flex items-center">
														<span
															class="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
														>
															{{ Ticket.User.firstName }}
															{{ Ticket.User.lastName }}
														</span>
														<span class="text-xs text-gray-400">&nbsp; &bull; &nbsp;</span>
														<span class="inline-flex text-sm font-normal text-gray-600">
															{{ Ticket.User.jobTitle ?? Ticket.User.systemRole }}
														</span>
													</div>
													<span
														v-if="Ticket.User.systemRole === 'super_admin'"
														class="badge py-0.25 rounded-md border border-gray-900/10 px-1 text-xs"
														>MG Admin</span
													>
												</div>
											</footer>
											<h1
												class="text-2xl font-bold text-gray-900 dark:text-white"
											>
												{{ Ticket.name }}
											</h1>
											
										</div>
									</div>
									<aside class="mt-8 xl:hidden">
										<div
											class="col-span-2 mt-4 flex items-center justify-end space-x-3 md:mt-0"
										>
											<button
												@click="handleTicketClose(Ticket.status)"
												type="button"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>
												<CheckCircleIcon
													class="-ml-0.5 h-5 w-5 text-green-500"
													aria-hidden="true"
												/>
												Close ticket
											</button>

											<!-- <button
												type="button"
												@click="handleTicketDelete()"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>
												<TrashIcon
													class="-ml-0.5 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												Delete
											</button> -->
										</div>
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
												<CalendarIcon
													class="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												<span
													class="text-sm font-medium text-gray-900 dark:text-white"
													>Created on
													<span>{{
														format(new Date(Ticket.createdOn), 'MMM dd, yyyy')
													}}</span></span
												>
											</div>
										</div>
										<div
											class="mt-6 space-y-8 border-t border-b border-gray-200 py-6 dark:border-slate-800"
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
															<div
																class="text-sm font-medium text-gray-900 dark:text-white"
															>
																Eduardo Benz
															</div>
														</a>
													</li>
												</ul>
											</div>
											<div>
												<h2 class="text-sm font-medium text-gray-500">Type</h2>
												<ul role="list" class="mt-2 leading-8">
													<li class="inline" v-if="Ticket.type === 'bug'">
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
															<div
																class="ml-3 text-xs font-semibold text-purple-900"
															>
																Bug
															</div>
														</a>
														{{ ' ' }}
													</li>
													<li class="inline" v-else>
														<a
															href="#"
															class="relative inline-flex items-center rounded-full bg-sky-100 px-2.5 py-1 ring-1 ring-inset ring-sky-300 hover:bg-sky-50"
														>
															<div
																class="absolute flex flex-shrink-0 items-center justify-center"
															>
																<span
																	class="h-1.5 w-1.5 rounded-full bg-sky-500"
																	aria-hidden="true"
																/>
															</div>
															<div
																class="ml-3 text-xs font-semibold text-sky-900"
															>
																New
															</div>
														</a>
														{{ ' ' }}
													</li>
												</ul>
											</div>
										</div>
									</aside>
									<div class="xl:pb-0">
										<h2 class="sr-only">Description</h2>

										<Disclosure v-slot="{ open }">
											<DisclosurePanel class="flex items-start space-x-4 mt-4">
												<div class="min-w-0 flex-1">
													<div class="relative">
														<div
															class="rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-slate-800"
														>
															<label for="comment" class="sr-only"
																>Edit description</label
															>
															<textarea
																v-model="input"
																@input="update"
																name="comment"
																id="comment"
																class="h-content w-full text-sm max-w-full border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white sm:py-1.5 sm:leading-6"
																placeholder="Add your comment..."
															></textarea>

															<!-- Spacer element to match the height of the toolbar -->
															<div class="py-2" aria-hidden="true">
																<!-- Matches height of button in toolbar (1px border + 36px content height) -->
																<div class="py-px">
																	<div class="h-9" />
																</div>
															</div>
														</div>

														<div
															class="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2"
														>
															<div
																class="flex flex-shrink-0 items-center space-x-2"
															>
																<DisclosureButton
																	class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:border-transparent dark:bg-slate-800 dark:text-white"
																>
																	Cancel
																</DisclosureButton>
																<DisclosureButton
																	type="button"
																	@click="handleDescUpdate()"
																	class="inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:text-indigo-400"
																>
																	Save
																</DisclosureButton>
															</div>
														</div>
													</div>
												</div>
											</DisclosurePanel>
											<div
												class="prose my-4 max-w-none dark:prose-invert"
												v-html="convert(input)"
											></div>
											<div class="">
												<DisclosureButton
													v-if="!open && Ticket.createdBy === user.id"
													class="flex items-center text-xs font-semibold text-gray-800 dark:text-white"
												>
													<div
														data-v-164b91a0=""
														data-test="open-reply-button"
														class="flex items-center"
													>
														<svg
															class="mr-1 h-4 w-4"
															fill="none"
															viewBox="0 0 24 24"
														>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
															></path>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M19.25 19.25H13.75"
															></path>
														</svg>

														Edit
													</div>
												</DisclosureButton>
											</div>
										</Disclosure>
									</div>
									<div class="mt-2 text-xs  py-3 xl:pt-6 xl:pb-0">
												
												<NuxtLink
													:to="`/${route.params.team}/tickets`"
													class="font-normal px-2 py-1 rounded-md text-indigo-600 bg-indigo-100 dark:text-white"
													>{{ Ticket.Team.name }}</NuxtLink
												>
											</div>
								</div>
							</div>
							<section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
								<div>
									<div class="divide-gray-200 dark:divide-slate-800">
										<div class="pb-4">
											<h2
												id="activity-title"
												class="text-md font-medium text-gray-900 dark:text-white"
											>
												{{ Ticket.Comment.length }} comment{{
													Ticket.Comment.length > 1 ? 's' : ''
												}}
											</h2>
											<div class="mt-3">
												<div
													class="flex space-x-3 rounded-lg p-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:ring-slate-800"
												>
													<div class="flex-shrink-0">
														<div class="relative">
															<img v-if="User.avatarPath"
																class="flex h-8 object-cover w-8 items-center justify-center rounded-full bg-gray-400 text-xs"
																:src="`https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/avatars/${user.id}`"
																alt=""
															/>
														</div>
													</div>
													<div class="min-w-0 flex-1">
														<form
															@submit.prevent="handleCommentAdd(null)"
															class=""
														>
															<div>
																<label for="comment" class="sr-only"
																	>Comment</label
																>
																<textarea
																	v-model="comment_text"
																	id="comment"
																	name="comment"
																	rows="3"
																	class="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white sm:py-1.5 sm:text-base sm:leading-6"
																	placeholder="Leave a comment"
																/>
															</div>
															<div
																class="mt-6 flex items-end justify-end space-x-4"
															>
																<div
																	v-if="!imageSrc"
																	class="relative ml-auto flex h-8 items-center justify-center text-slate-200"
																>
																	<svg
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																		class="h-5 w-5"
																	>
																		<path
																			d="M16.667 8.75a.833.833 0 00-.834.833v5.834a.833.833 0 01-.833.833H3.334a.833.833 0 01-.834-.833V8.75a.833.833 0 01.833-.833H5a.833.833 0 00.833-.567l.45-1.367a.833.833 0 01.792-.566h4.592a.833.833 0 000-1.667H7.033a2.5 2.5 0 00-2.366 1.708l-.267.834H3.333a2.5 2.5 0 00-2.5 2.5v6.666a2.5 2.5 0 002.5 2.5H15a2.5 2.5 0 002.5-2.5V9.625a.835.835 0 00-.833-.875zm-7.5-.833a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm0 5a1.667 1.667 0 110-3.334 1.667 1.667 0 010 3.334zm9.167-9.167H17.5v-.833a.833.833 0 10-1.666 0v.833H15a.833.833 0 100 1.667h.834v.833a.833.833 0 101.666 0v-.833h.834a.833.833 0 000-1.667z"
																			fill="currentColor"
																		></path>
																	</svg>
																	<input
																		type="file"
																		accept="image/*"
																		@change="uploadImage"
																		ref="fileInput"
																		data-test="image-input"
																		class="absolute h-full w-full cursor-auto opacity-0"
																	/>
																</div>
																<div v-else class="relative ml-auto h-full">
																	<img
																		:src="imageSrc"
																		width="40"
																		height="40"
																		alt=""
																		loading="eager"
																		class="h-10 rounded object-cover"
																	/>
																	<div
																		class="absolute left-0 top-0 h-10 w-10 rounded border border-slate-200 opacity-20"
																	></div>
																	<!---->
																	<svg
																		@click="removeImage"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																		class="absolute -right-1.5 -top-1.5 h-4 w-4 cursor-pointer rounded-full border border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600"
																	>
																		<path
																			d="M7.822 7l2.509-2.503a.586.586 0 00-.829-.828L7 6.177 4.497 3.67a.586.586 0 10-.828.828L6.177 7 3.67 9.502a.583.583 0 00.19.957.584.584 0 00.638-.128L7 7.822l2.502 2.509a.583.583 0 00.957-.19.583.583 0 00-.128-.639L7.822 7z"
																			fill="currentColor"
																		></path>
																	</svg>
																</div>

																<button
																	:disabled="comment_text === ''"
																	type="submit"
																	class="inline-flex items-center justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
																>
																	Comment
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>

										<div class="pt-6">
											<!-- Activity feed-->
											<div class="flex" v-if="!loading">
												<div
													v-if="comments <= 0"
													class="flex w-full rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm font-semibold text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-800 dark:text-white"
												>
													No comments yet
												</div>

												<section
													class="w-full bg-white dark:bg-transparent"
													v-else
												>
													<div class="mx-auto">
														<article
															v-for="(
																activityItem, activityItemIdx
															) in comments"
															:key="activityItem.id"
															id="parent-comment"
															class="mb-6 rounded-lg bg-white text-base dark:bg-transparent"
														>
															<footer
																v-if="!activityItem.deleted"
																class="mb-2 flex items-center justify-between"
															>
																<div class="flex items-center">
																	<p
																		class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																	>
																		<img
																			v-if="activityItem.avatarUrl"
																			class="mr-2 h-5 w-5 rounded-full object-cover"
																			:src="activityItem.avatarUrl"
																			alt=""
																		/>{{ activityItem.User.firstName }}
																		{{ activityItem.User.lastName }}
																		<span
																			v-if="
																				activityItem.User.systemRole ===
																				'super_admin'
																			"
																			class="badge py-0.25 ml-2 rounded-md border border-gray-900/10 px-1 text-xs"
																			>MG Admin</span
																		>
																	</p>
																</div>

																<div
																	class="flex space-x-1"
																	v-if="activityItem.createdBy === User.id"
																>
																	<button
																		class="text-slate-400 transition-colors hover:text-indigo-400"
																	>
																		<svg
																			class="h-5 w-5"
																			fill="none"
																			viewBox="0 0 24 24"
																		>
																			<path
																				stroke="currentColor"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																				stroke-width="1.5"
																				d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
																			></path>
																			<path
																				stroke="currentColor"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																				stroke-width="1.5"
																				d="M19.25 19.25H13.75"
																			></path>
																		</svg>
																	</button>
																	<button
																		@click="handleDelete(activityItem.id)"
																		class="text-slate-400 transition-colors hover:text-rose-400"
																	>
																		<svg
																			class="h-5 w-5"
																			viewBox="0 0 24 24"
																			fill="none"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				d="M5.75 7.75L6.59115 17.4233C6.68102 18.4568 7.54622 19.25 8.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75H5.75Z"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M9.75 10.75V16.25"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M13.25 10.75V16.25"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M8.75 7.75V6.75C8.75 5.64543 9.64543 4.75 10.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.75"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M4.75 7.75H18.25"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																		</svg>
																	</button>
																</div>
																<div class="flex space-x-1" v-else>
																	<button
																		class="text-slate-400 transition-colors hover:text-indigo-400"
																	>
																		<svg
																			class="h-5 w-5"
																			viewBox="0 0 24 24"
																			fill="none"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				d="M4.75 5.75V19.25"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M19.25 15.25V5.75C19.25 5.75 18.5 6.25 16 6.25C13.5 6.25 12 4.75 9 4.75C6 4.75 4.75 5.75 4.75 5.75V15.25C4.75 15.25 6.5 14.25 9 14.25C11.5 14.25 13.5 16.25 16 16.25C18.5 16.25 19.25 15.25 19.25 15.25Z"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																		</svg>
																	</button>
																</div>
															</footer>
															<span
																:class="[
																	activityItem.deleted
																		? 'dark:text-gray-400'
																		: 'text-gray-900 dark:text-gray-200',
																	'prose prose-base pb-2 font-normal ',
																]"
															>
																{{ activityItem.text }}
															</span>
															<div
																v-if="
																	activityItem.attachment &&
																	!activityItem.deleted
																"
																data-test="war_room_comment_text"
																class="mt-1 flex overflow-hidden"
															>
																<img
																	:src="`https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/images/${activityItem.attachment}`"
																	:alt="activityItem.attachment.split('/')[1]"
																	loading="lazy"
																	data-test="comment-image"
																	class="max-h-96 max-w-full cursor-pointer rounded-lg"
																/>
															</div>
															<div class="mt-2">
																<Disclosure v-slot="{ open }">
																	<div
																		class="flex items-center justify-between"
																	>
																		<DisclosureButton
																			class="flex items-center text-xs font-semibold text-gray-800 dark:text-white"
																		>
																			<div
																				data-v-164b91a0=""
																				data-test="open-reply-button"
																				class="flex items-center"
																			>
																				<svg
																					data-v-164b91a0=""
																					viewBox="0 0 16 16"
																					fill="none"
																					xmlns="http://www.w3.org/2000/svg"
																					class="mr-1 h-4 w-4"
																				>
																					<path
																						data-v-164b91a0=""
																						d="M13.74 12.793a4.668 4.668 0 00-1.827-7.046 5.333 5.333 0 10-9.46 4.193l-.926.92a.667.667 0 00-.14.727A.667.667 0 002 12h3.793A4.667 4.667 0 0010 14.667h4a.667.667 0 00.613-.414.667.667 0 00-.14-.726l-.733-.734zM5.333 10c.001.223.02.446.054.667h-1.78l.233-.227a.666.666 0 000-.947 3.953 3.953 0 01-1.173-2.826 4 4 0 014-4 3.96 3.96 0 013.766 2.666H10A4.667 4.667 0 005.333 10zm7.027 3.333l.033.034H10a3.334 3.334 0 112.36-.974.667.667 0 00-.2.467.666.666 0 00.2.473z"
																						fill="currentColor"
																					></path>
																				</svg>
																				Reply
																			</div>
																		</DisclosureButton>

																		<p
																			class="mr-2 text-xs text-gray-500 dark:text-gray-300"
																		>
																			{{
																				format(
																					new Date(activityItem.createdOn),
																					'MMM dd, hh:mm aa'
																				)
																			}}
																		</p>
																	</div>

																	<DisclosurePanel
																		class="mt-3 flex items-start space-x-4"
																	>
																		<div class="min-w-0 flex-1">
																			<form
																				@submit.prevent="
																					handleCommentAdd(activityItem.id)
																				"
																				class="relative"
																			>
																				<div
																					class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
																				>
																					<label for="comment" class="sr-only"
																						>Add your reply</label
																					>
																					<textarea
																						v-model="reply_text"
																						name="comment"
																						id="comment"
																						class="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
																						placeholder="Add your reply..."
																					/>

																					<!-- Spacer element to match the height of the toolbar -->
																					<div class="py-2" aria-hidden="true">
																						<!-- Matches height of button in toolbar (1px border + 36px content height) -->
																						<div class="py-px">
																							<div class="h-9" />
																						</div>
																					</div>
																				</div>

																				<div
																					class="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2"
																				>
																					<div
																						class="flex flex-shrink-0 items-center space-x-2"
																					>
																						<DisclosureButton
																							class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
																						>
																							Cancel
																						</DisclosureButton>
																						<button
																							type="submit"
																							class="inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:text-indigo-400"
																						>
																							Post
																						</button>
																					</div>
																				</div>
																			</form>
																		</div>
																	</DisclosurePanel>
																</Disclosure>
															</div>

															<div
																class="ml-2 border-l border-slate-300 dark:border-slate-700"
																v-if="activityItem.Comment.length > 0"
															>
																<article
																	v-for="reply in activityItem.Comment.sort(
																		(a, b) =>
																			new Date(b.createdOn) -
																			new Date(a.createdOn)
																	)"
																	id="reply-messages"
																	:key="reply.id"
																	class="my-6 w-full rounded-lg pl-2 text-base lg:pl-8"
																>
																	<footer
																		class="mb-2 flex items-center justify-between"
																	>
																		<div class="flex items-center">
																			<p
																				class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																			>
																				<img v-if="reply.User.avatarPath"
																					class="mr-2 h-5 w-5 rounded-full object-cover"
																					:src="`https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/avatars/${reply.User.id}`"
																					alt="Jese Leos"
																				/>
																				<div v-else class="mr-2 h-5 w-5 rounded-full bg-slate-300"></div>
																				
								
																				{{ reply.User.firstName }}
																				{{ reply.User.lastName
																				}}<span
																					v-if="
																						reply.User.systemRole ===
																						'super_admin'
																					"
																					class="badge py-0.25 ml-2 rounded-md border border-gray-900/10 px-1 text-xs"
																					>MG Admin</span
																				>
																			</p>
																		</div>

																		<div
																			class="flex space-x-1"
																			v-if="reply.createdBy === User.id"
																		>
																			<button
																				class="text-slate-400 transition-colors hover:text-indigo-400"
																			>
																				<svg
																					class="h-5 w-5"
																					fill="none"
																					viewBox="0 0 24 24"
																				>
																					<path
																						stroke="currentColor"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																						stroke-width="1.5"
																						d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
																					></path>
																					<path
																						stroke="currentColor"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																						stroke-width="1.5"
																						d="M19.25 19.25H13.75"
																					></path>
																				</svg>
																			</button>
																			<button
																				@click="
																					handleDelete(
																						reply.id,
																						activityItem.Comment
																					)
																				"
																				class="text-slate-400 transition-colors hover:text-rose-400"
																			>
																				<svg
																					class="h-5 w-5"
																					viewBox="0 0 24 24"
																					fill="none"
																					xmlns="http://www.w3.org/2000/svg"
																				>
																					<path
																						d="M5.75 7.75L6.59115 17.4233C6.68102 18.4568 7.54622 19.25 8.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75H5.75Z"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																					<path
																						d="M9.75 10.75V16.25"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																					<path
																						d="M13.25 10.75V16.25"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																					<path
																						d="M8.75 7.75V6.75C8.75 5.64543 9.64543 4.75 10.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.75"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																					<path
																						d="M4.75 7.75H18.25"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																				</svg>
																			</button>
																		</div>
																		<div class="flex space-x-1" v-else>
																			<button
																				class="text-slate-400 transition-colors hover:text-indigo-400"
																			>
																				<svg
																					class="h-5 w-5"
																					viewBox="0 0 24 24"
																					fill="none"
																					xmlns="http://www.w3.org/2000/svg"
																				>
																					<path
																						d="M4.75 5.75V19.25"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																					<path
																						d="M19.25 15.25V5.75C19.25 5.75 18.5 6.25 16 6.25C13.5 6.25 12 4.75 9 4.75C6 4.75 4.75 5.75 4.75 5.75V15.25C4.75 15.25 6.5 14.25 9 14.25C11.5 14.25 13.5 16.25 16 16.25C18.5 16.25 19.25 15.25 19.25 15.25Z"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																				</svg>
																			</button>
																		</div>
																	</footer>
																	<p
																		class="text-base text-gray-900 dark:text-gray-400"
																	>
																		{{ reply.text }}
																	</p>
																	<Disclosure v-slot="{ open }">
																		<div
																			class="mt-2 flex items-center justify-between"
																		>
																			<DisclosureButton
																				class="flex items-center text-xs font-semibold text-gray-800"
																			>
																				<div
																					data-v-164b91a0=""
																					data-test="open-reply-button"
																					class="flex items-center"
																				>
																					<svg
																						class="mr-1 h-4 w-4"
																						fill="none"
																						viewBox="0 0 24 24"
																					>
																						<path
																							stroke="currentColor"
																							stroke-linecap="round"
																							stroke-linejoin="round"
																							stroke-width="1.5"
																							d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
																						></path>
																						<path
																							stroke="currentColor"
																							stroke-linecap="round"
																							stroke-linejoin="round"
																							stroke-width="1.5"
																							d="M19.25 19.25H13.75"
																						></path>
																					</svg>

																					Edit
																				</div>
																			</DisclosureButton>
																			<p
																				class="mr-2 text-xs text-gray-500 dark:text-gray-600"
																			>
																				{{
																					format(
																						new Date(reply.createdOn),
																						'MMM dd, hh:mm aa'
																					)
																				}}
																			</p>
																		</div>

																		<DisclosurePanel
																			v-if="false"
																			class="mt-2 flex items-start space-x-4"
																		>
																			<div class="min-w-0 flex-1">
																				<form
																					@submit.prevent="
																						handleCommentAdd(activityItem.id)
																					"
																					class="relative"
																				>
																					<div
																						class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
																					>
																						<label for="comment" class="sr-only"
																							>Add your comment</label
																						>
																						<textarea
																							v-model="comment_text"
																							name="comment"
																							id="comment"
																							class="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
																							placeholder="Add your comment..."
																						/>

																						<!-- Spacer element to match the height of the toolbar -->
																						<div
																							class="py-2"
																							aria-hidden="true"
																						>
																							<!-- Matches height of button in toolbar (1px border + 36px content height) -->
																							<div class="py-px">
																								<div class="h-9" />
																							</div>
																						</div>
																					</div>

																					<div
																						class="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2"
																					>
																						<div
																							class="flex flex-shrink-0 items-center space-x-2"
																						>
																							<DisclosureButton
																								class="inline-flex items-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
																							>
																								Cancel
																							</DisclosureButton>
																							<button
																								type="submit"
																								class="inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:text-indigo-400"
																							>
																								Post
																							</button>
																						</div>
																					</div>
																				</form>
																			</div>
																		</DisclosurePanel>
																	</Disclosure>
																</article>
															</div>
														</article>
													</div>
												</section>
											</div>
											<div
												v-else
												class="relative flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											>
												<loading-spinner />
											</div>
											<!-- Comment Box  -->
										</div>
									</div>
								</div>
							</section>
						</div>
						<aside class="hidden xl:block xl:pl-8">
							<div class="mt-4 mb-8 flex items-center space-x-3 md:mt-0">
								<button
									@click="handleTicketClose(Ticket.status)"
									type="button"
									class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								>
									<CheckCircleIcon
										class="-ml-0.5 h-5 w-5 text-green-500"
										aria-hidden="true"
									/>

									{{
										Ticket.status !== 'done' ? 'Close ticket' : 'Open ticket'
									}}
								</button>

								<!-- <button
												type="button"
												@click="handleTicketDelete()"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>
												<TrashIcon
													class="-ml-0.5 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												Delete
											</button> -->
							</div>
							<h2 class="sr-only">Details</h2>
							<div class="space-y-3">
								<div
									class="flex items-center space-x-2"
									v-if="Ticket.status !== 'done'"
								>
									<LockOpenIcon
										class="h-5 w-5 text-green-500"
										aria-hidden="true"
									/>
									<span class="text-sm text-green-700">Open Ticket</span>
								</div>
								<div class="flex items-center space-x-2" v-else>
									<LockClosedIcon
										class="h-5 w-5 text-red-500"
										aria-hidden="true"
									/>
									<span class="text-sm text-red-700">Closed Ticket</span>
								</div>

								<div class="flex items-center space-x-2">
									<CalendarIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<span class="text-sm text-gray-900"
										>Created on
										<span>{{
											format(new Date(Ticket.createdOn), 'MMM dd, yyyy')
										}}</span></span
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
														src="~/assets/images/logo.png"
														alt=""
													/>
												</div>
												<div class="text-sm font-medium text-gray-900">
													Motis Group
												</div>
											</a>
										</li>
									</ul>
								</div>
								<div>
									<h2 class="text-sm font-medium text-gray-500">Type</h2>
									<ul role="list" class="mt-2 leading-8">
										<li class="inline" v-if="Ticket.type === 'bug'">
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
										<li class="inline" v-else>
											<a
												href="#"
												class="relative inline-flex items-center rounded-full bg-sky-100 px-2.5 py-1 ring-1 ring-inset ring-sky-300 hover:bg-sky-50"
											>
												<div
													class="absolute flex flex-shrink-0 items-center justify-center"
												>
													<span
														class="h-1.5 w-1.5 rounded-full bg-sky-500"
														aria-hidden="true"
													/>
												</div>
												<div class="ml-3 text-xs font-semibold text-sky-900">
													New
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

<style scoped>
	.badge {
		background: conic-gradient(
			from 171.52deg at 50% 50%,
			#f0f1f6 0deg,
			#a0b9cc 90deg,
			#dde5f0 180deg,
			#c5e6f9 234.26deg,
			#a7b5bb 270deg,
			#ecf1f4 1turn
		);
	}
</style>

<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		TransitionChild,
		TransitionRoot,
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
	} from '@headlessui/vue';
	import {
		ArchiveBoxIcon,
		Bars3BottomLeftIcon,
		Bars4Icon,
		ClockIcon,
		HomeIcon,
		UserCircleIcon as UserCircleIconOutline,
		FaceFrownIcon,
		FaceSmileIcon,
		FireIcon,
		HandThumbUpIcon,
		HeartIcon,
		PaperClipIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		BellIcon,
		CalendarIcon,
		ChatBubbleLeftEllipsisIcon,
		CheckCircleIcon,
		LockOpenIcon,
		TrashIcon,
		LockClosedIcon,
		MagnifyingGlassIcon,
		PencilIcon,
		TagIcon,
		UserCircleIcon as UserCircleIconMini,
	} from '@heroicons/vue/20/solid';

	import { format, formatDistanceStrict } from 'date-fns';
	import showdown from 'showdown';
	const converter = await new showdown.Converter();

	const route = useRoute();

	const props = defineProps(['open', 'comments']);
	const feedKey = ref(0);
	const loading = ref(true);

	const imageSrc = ref(null);
	const fileInput = ref(null);
	const selectedFile = ref(null);

	const uploadImage = (event) => {
		const file = event.target.files[0];
		if (file) {
			imageSrc.value = URL.createObjectURL(file);
			selectedFile.value = file;
		}
	};

	const removeImage = () => {
		imageSrc.value = null;
		fileInput.value = '';
	};

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
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

	const comments = ref([]);

	const getAvatar = async (id) => {
		
		if (User.avatarPath) {
			const url = `https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/avatars/${id}`;
			return url;
		} else return null;
	};

	let { data: Ticket, error } = await supabase
		.from('Ticket')
		.select(
			'*, Team(id,name), Comment(*,User(firstName,lastName,systemRole,id,avatarPath),Comment(*,User(firstName,lastName,systemRole,id,avatarPath))), User(*)'
		)
		.eq('id', route.params.id)
		.limit(1)
		.single();

	const ticketAvatar = await getAvatar(Ticket.User.id);

	const currentAvatar = await getAvatar(user.value.id);

	const input = ref(Ticket.desc);

	function fetchComments() {
		const parents = Ticket.Comment.filter((o) => !o.threadId).sort(
			(a, b) => new Date(b.createdOn) - new Date(a.createdOn)
		);
		const updatedComments = parents.map((comment) => {
			return {
				...comment,
				avatarUrl: comment.User.avatarPath
					? `https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/avatars/${User.avatarPath}`
					: null,
			};
		});
		comments.value = updatedComments;
	}

	onMounted(() => {
		fetchComments();
		console.log(comments.value);
		loading.value = false;
	});

	const comment_text = ref('');
	const reply_text = ref('');

	const convert = (text) => {
		let converter = new showdown.Converter();
		const formatted = converter.makeHtml(text);
		return formatted;
	};

	const handleCommentAdd = async (thread_id) => {
		const org_id =
			User.Account.type === 'super_admin'
				? org_id.value
				: route.params.organization;
		try {
			loading.value = true;
			if (selectedFile.value) {
				const fileName = selectedFile.value.name;
				const filePath = `attachments/${fileName}`;
				const { error: uploadError } = await supabase.storage
					.from('images')
					.upload(filePath, selectedFile.value, { upsert: true });

				if (uploadError) {
					console.error('Error uploading image:', uploadError);
					return;
				}
				const { data, error: insertError } = await supabase
					.from('Comment')
					.insert([
						{
							text: thread_id ? reply_text.value : comment_text.value,
							createdBy: user.value.id,
							ticketId: Ticket.id,
							threadId: thread_id,
							attachment: filePath,
						},
					]);

				if (insertError) {
					console.error('Error inserting comment:', insertError);
				} else {
					console.log('Image uploaded and comment created successfully');
					removeImage();
				}
			} else {
				const { data, error: insertError } = await supabase
					.from('Comment')
					.insert([
						{
							text: thread_id ? reply_text.value : comment_text.value,
							createdBy: user.value.id,
							ticketId: Ticket.id,
							threadId: thread_id,
						},
					]);

				if (insertError) {
					console.error('Error inserting comment:', insertError);
				} else {
					console.log('Comment created successfully');
					removeImage();
				}
			}
		} catch (error) {
			alert(error.message);
		} finally {
			comment_text.value = '';
			loading.value = false;
			location.reload();
		}
	};

	const handleDescUpdate = async () => {
		const { data, error } = await supabase
			.from('Ticket')
			.update({ desc: input.value })
			.eq('id', route.params.id);
	};

	const handleTicketClose = async (status) => {
		const ticket_status = status !== 'done' ? 'done' : 'backlog';
		const { data, error } = await supabase
			.from('Ticket')
			.update({ status: ticket_status })
			.eq('id', route.params.id);
		navigateTo(`/${route.params.team}/tickets`);
	};

	const handleDelete = async (id, comments) => {
		try {
			if (comments) {
				const { data, error: deleteError } = await supabase
					.from('Comment')
					.delete()
					.eq('id', id);
			} else {
				const { data, error } = await supabase
					.from('Comment')
					.update({ text: 'This message was deleted.', deleted: true })
					.eq('id', id);
			}
		} catch (error) {
			alert(error.message);
		} finally {
			comment_text.value = '';
			loading.value = false;
			location.reload();
		}
		location.reload();
	};
</script>
