<template>
	<div>
		<article
			v-for="(reply, idx) in activityItem.Comment"
			id="reply-messages"
			:key="reply.id"
			class="relative my-6 pl-2 text-base lg:pl-4"
		>
			<div
				v-if="idx < activityItem.Comment.length - 1"
				:class="[
					activityItemIdx === comments.length ? 'h-6 ' : '-bottom-6',
					'absolute  left-0 top-0 flex w-12 justify-center',
				]"
			>
				<div
					class="w-px bg-gradient-to-b from-slate-300/0 via-slate-300/20 to-slate-300/0"
				/>
			</div>
			<footer class="mb-2 flex items-center justify-between">
				<div class="flex items-center">
					<div
						class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
					>
						<div v-if="reply.avatarUrl" class="">
							<img
								class="relative z-50 mr-2 h-6 w-6 rounded-full object-cover ring-8 ring-white dark:ring-[#020014]"
								:src="reply.avatarUrl"
								:alt="reply.User.firstName + ' ' + reply.User.lastName"
							/>
						</div>

						<div v-else class="mr-2 h-5 w-5 rounded-full bg-slate-300"></div>

						{{ reply.User.firstName }}
						{{ reply.User.lastName }}
						<div class="ml-2 mr-1 flex items-center space-x-1">
							<div
								v-for="badge in reply.User.badges.slice(0, 1)"
								:key="badge.id"
								:class="[
									badge.id,
									'py-0.25 flex items-center justify-center rounded-md px-1 text-xs',
								]"
							>
								<span :class="`${badge.id}-text flex items-center`"
									><svg
										v-if="badge.id === 'mg_ai'"
										class="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9.75 13C14 13 14 7.75 14 7.75C14 7.75 14 13 18.25 13C14 13 14 18.25 14 18.25C14 18.25 14 13 9.75 13Z"
											fill="#8900ff"
										></path>
										<path
											d="M5.75 8C8 8 8 5.75 8 5.75C8 5.75 8 8 10.25 8C8 8 8 10.25 8 10.25C8 10.25 8 8 5.75 8Z"
											fill="#8900ff"
										></path>
										<path
											d="M7.75 16.25H7.76M18.25 5.75H18.26M18.25 18.25H18.26M14 7.75C14 7.75 14 13 9.75 13C14 13 14 18.25 14 18.25C14 18.25 14 13 18.25 13C14 13 14 7.75 14 7.75ZM8 5.75C8 5.75 8 8 5.75 8C8 8 8 10.25 8 10.25C8 10.25 8 8 10.25 8C8 8 8 5.75 8 5.75Z"
											stroke="#8900ff"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path></svg
									>{{ badge.text }}</span
								>
							</div>

							<div
								v-if="reply.User.badges.length > 1"
								class="badge-extra rounded-md border border-gray-600 px-1.5 leading-4 text-black/40 dark:text-gray-400"
							>
								+{{ reply.User.badges.length - 1 }}
							</div>
						</div>

						<span
							class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
						>
							{{ formatDateDistance(reply.createdOn) }}
						</span>
					</div>
				</div>

				<div class="flex space-x-1" v-if="reply.createdBy === User.id">
					<button
						class="text-slate-400 transition-colors hover:text-indigo-400"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
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
						@click="handleDelete(reply.id, activityItem.Comment)"
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
				:class="[
					reply.User.id === User.id ? 'bg-[#0166C8]' : 'bg-[#1C1B2C]',
					reply.activity_type === 'ai_comment'
						? 'ai_shadow shadow-inse shadow-[#9643FF]/25'
						: '',
					'prose ml-8 rounded-b-lg rounded-r-lg rounded-tl-sm px-4 py-3 ring-1 ring-inset ring-white/5 dark:prose-invert',
				]"
			>
				{{ reply.text }}
			</p>
			<div class="mt-2 pl-8">
				<NuxtLink
					v-if="
						reply.text.includes('below') &&
						reply.User.systemRole === 'super_admin'
					"
					:to="`https://calendly.com/motis-group/partners?name=${
						Ticket.User.firstName + ' ' + Ticket.User.lastName
					}&email=${Ticket.User.email}&utm_source=${Ticket.id}`"
					class="rounded-md border border-indigo-500 bg-indigo-100 px-2 py-1 text-xs font-normal text-indigo-600 transition-colors dark:bg-indigo-800 dark:text-indigo-100 dark:hover:border-indigo-400 dark:hover:text-white"
					>Schedule a call</NuxtLink
				>
			</div>
		</article>
	</div>
</template>
