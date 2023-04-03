<template>
	<div class="flex min-h-full">
		<div class="flex w-0 flex-1 flex-col">
			<main class="flex-1">
				<div class="py-8 xl:py-10">
					<div
						class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3"
					>
						<div
							class="dark:border-slate-800 xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8"
						>
							<div>
								<div>
									<div
										class="grid grid-cols-7 justify-between dark:border-slate-800 md:space-x-4 xl:border-b xl:pb-6"
									>
										<div class="col-span-7">
											<footer class="mb-2 flex w-full items-center">
												<div
													class="mr-2 flex h-12 w-12 items-center border border-slate-700 justify-center rounded-full bg-slate-800"
												>
													<div class="text-white">
														{{ Ticket.User.firstName[0] }}{{ Ticket.User.lastName[0] }}
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
														<span>&nbsp; • &nbsp;</span>
														<span class="text-sm font-normal text-gray-600">
															{{ Ticket.User.jobTitle }}
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
											<p class="mt-2 text-sm text-gray-500">
												Opened by
												{{ ' ' }}
												<a
													href="#"
													class="font-medium text-gray-900 dark:text-white"
													>{{ Ticket.User.firstName }}
													{{ Ticket.User.lastName }}</a
												>
												{{ ' ' }}
												in
												{{ ' ' }}
												<a
													:href="`/${route.params.team}/tickets`"
													class="font-medium text-gray-900 dark:text-white"
													>{{ Ticket.Team.name }}</a
												>
											</p>
										</div>
									</div>
									<aside class="mt-8 xl:hidden">
										<div
											class="col-span-2 mt-4 flex items-center justify-end space-x-3 md:mt-0"
										>
											<button
												@click="handleTicketClose(Ticket.status)"
												type="button"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
												<ChatBubbleLeftEllipsisIcon
													class="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												<span
													class="text-sm font-medium text-gray-900 dark:text-white"
													>{{ Ticket.Comment.length }} comments</span
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
									<div class="py-3 xl:pt-6 xl:pb-0">
										<h2 class="sr-only">Description</h2>

										<Disclosure v-slot="{ open }">
											<DisclosurePanel class="flex items-start space-x-4">
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
																class="h-content w-full max-w-full border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white sm:py-1.5 sm:leading-6"
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
															<img
																class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
																src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
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
																class="mt-6 flex items-center justify-end space-x-4"
															>
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
															class="mb-6 rounded-lg bg-white text-base dark:bg-transparent"
														>
															<footer
																class="mb-2 flex items-center justify-between"
															>
																<div class="flex items-center">
																	<p
																		class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																	>
																		<img
																			class="mr-2 h-5 w-5 rounded-full"
																			src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
																			alt="Michael Gough"
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
																<MessageMenu />
															</footer>
															<p
																class="prose prose-base pb-2 font-normal text-gray-900 dark:text-gray-400"
															>
																{{ activityItem.text }}
															</p>
															<div class="">
																<Disclosure v-slot="{ open }">
																	<div
																		class="flex items-center justify-between"
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
																			class="mr-2 text-xs text-gray-500 dark:text-gray-600"
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
																class="ml-2 border-l-2 border-gray-300"
																v-if="activityItem.Comment.length > 0"
															>
																<article
																	v-for="reply in activityItem.Comment.sort(
																		(a, b) =>
																			new Date(b.createdOn) -
																			new Date(a.createdOn)
																	)"
																	:key="reply.id"
																	class="my-6 w-full rounded-lg bg-white pl-2 text-base dark:bg-gray-900 lg:pl-8"
																>
																	<footer
																		class="mb-2 flex items-center justify-between"
																	>
																		<div class="flex items-center">
																			<p
																				class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																			>
																				<img
																					class="mr-2 h-5 w-5 rounded-full"
																					src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
																					alt="Jese Leos"
																				/>{{ reply.User.firstName }}
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

																		<!-- Dropdown menu -->
																		<MessageMenu />
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
												class="relative block w-full rounded-lg border border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											>
												<div class="flex items-center justify-center">
													<svg
														class="mr-3 h-5 w-5 animate-spin text-gray-500"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															class="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															stroke-width="4"
														></circle>
														<path
															class="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
													<span class="text-sm text-gray-500"
														>Loading comments...</span
													>
												</div>
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
									class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
							<div class="space-y-5">
								<div
									class="flex items-center space-x-2"
									v-if="Ticket.status !== 'done'"
								>
									<LockOpenIcon
										class="h-5 w-5 text-green-500"
										aria-hidden="true"
									/>
									<span class="text-sm font-medium text-green-700"
										>Open Ticket</span
									>
								</div>
								<div class="flex items-center space-x-2" v-else>
									<LockClosedIcon
										class="h-5 w-5 text-red-500"
										aria-hidden="true"
									/>
									<span class="text-sm font-medium text-red-700"
										>Closed Ticket</span
									>
								</div>
								<div class="flex items-center space-x-2">
									<ChatBubbleLeftEllipsisIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<span class="text-sm font-medium text-gray-900"
										>{{ Ticket.Comment.length }} comments</span
									>
								</div>
								<div class="flex items-center space-x-2">
									<CalendarIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<span class="text-sm font-medium text-gray-900"
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
	const loading = ref(false);
	const test = false;
	const user = test
		? ref({ email: 'automation@motis.group' })
		: useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 billingEmail,
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

	let { data: Ticket, error } = await supabase
		.from('Ticket')
		.select(
			'*, Team(id,name), Comment(*,User(firstName,lastName,systemRole,id),Comment(*,User(firstName,lastName,systemRole,id))), User(*)'
		)
		.eq('id', route.params.id)
		.limit(1)
		.single();

	console.log(Ticket);

	const input = ref(Ticket.desc);

	const comments = Ticket.Comment.filter((o) => !o.threadId).sort(
		(a, b) => new Date(b.createdOn) - new Date(a.createdOn)
	);

	const comment_text = ref('');
	const reply_text = ref('');

	const convert = (text) => {
		let converter = new showdown.Converter();
		const formatted = converter.makeHtml(text);
		return formatted;
	};

	const handleCommentAdd = async (thread_id) => {
		const { data, error } = await supabase.from('Comment').insert([
			{
				text: thread_id ? reply_text.value : comment_text.value,
				createdBy: user.value.id,
				ticketId: Ticket.id,
				threadId: thread_id,
			},
		]);
		comment_text.value = '';
		loading.value = true;
		setTimeout(() => {
			feedKey.value++;
			location.reload();
		}, 1000);
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
		navigateTo(`/tickets/${route.params.team}`);
	};

	const calculateDistance = (date) => {
		var x = new Date(date);
		var y = new Date();
		let seconds = Math.abs(x.getTime() - y.getTime()) / 1000;
		return seconds < 3600;
	};
	const regex = /\{[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\} ---/;

	const calculateMessage = (text) => {};

	const handleDeleteComment = async (card, comment) => {
		const result = await $fetch(
			`https://api.trello.com/1/cards/${card}/actions/${comment}/comments?${auth}`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => {
				return response;
			})

			.catch((err) => console.error(err));

		loading.value = true;
		setTimeout(() => {
			feedKey.value++;
			location.reload();
		}, 1000);
		return result;
	};
</script>
