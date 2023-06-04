<template>
	<NuxtLink
		class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm transition-colors hover:border-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
		:to="ticket.type !== 'asap' ? `/${route.params.team}/tickets/${ticket.id}` : `${ticket.desc}`"
		><div class="min-w-0 flex-1">
			<div class="rounded-xl focus:outline-none">
				<div class="flex justify-between">
					<div class="flex items-center space-x-4 truncate">
						<div
							class="flex items-center truncate text-sm font-medium text-gray-900 dark:text-white"
						>
							<span
								v-if="ticket.type === 'asap'"
								class="relative ml-1 mr-1.5 flex h-2 w-2"
							>
								<span
									class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
								></span>
								<span
									class="relative inline-flex h-2 w-2 rounded-full bg-red-500"
								></span>
							</span>
							<a
								v-if="ticket.type === 'asap'"
								:href="ticket.desc"
								class="hover:underline"
								>{{ ticket.name }}</a
							>
							<span v-else>{{ truncateString(ticket.name,30) }}</span>
						</div>
						<div
							:class="[
								styles[ticket.type],
								'relative inline-flex items-center rounded-full px-2.5 py-0.5 ring-1 ring-inset',
							]"
						>
							<div class="text-xs font-normal">
								{{ ticket.type }}
							</div>
						</div>
					</div>
					<div
						v-if="ticket.status === 'done'"
						class="flex items-center justify-end space-x-1 text-xs text-gray-400"
					>
						<CheckCircleIcon class="h-4 w-4" />
						<span>{{
							format(new Date(ticket.updatedOn), 'MMM d, yyyy') ?? 'null'
						}}</span>
					</div>
					<div
						v-else-if="ticket.status === 'active' && ticket.type !== 'asap'"
						class="flex items-center space-x-1 text-xs text-slate-400"
					>
						<ClockIcon class="h-4 w-4" />
						<span>{{
							'In ' + formatDistance(new Date(ticket.dueDate), new Date())
						}}</span>
					</div>
					<div
						v-else-if="ticket.type === 'asap'"
						class="flex items-center space-x-1 text-xs text-slate-400"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M12.25 8.75V12l-1.5 1.25m8.5 1.5s-1.929 2.09-2.893 4.5l-1.607-1.929m-3.5 1.929-.25-.068A7.251 7.251 0 0 1 12 4.75 7.251 7.251 0 0 1 19.182 11l.033.254"
							></path>
						</svg>

						<span>{{
							'Now'
						}}</span>
					</div>
					<div
						v-else
						class="col-span-1 flex items-center justify-end space-x-1 text-xs text-slate-400"
					>
						<CalendarIcon class="h-4 w-4" />
						<span>{{
							formatDateDistance(new Date(ticket.dueDate)) ?? 'null'
						}}</span>
					</div>
				</div>
			</div>
		</div></NuxtLink
	>
</template>

<script setup>
	import { format, formatDistance } from 'date-fns';
	import {
		CheckCircleIcon,
		ClockIcon,
		CalendarIcon,
	} from '@heroicons/vue/20/solid';
	const route = useRoute();
	const props = defineProps({
		ticket: Object,
	});

	const styles = {
		bug: 'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		billing:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		new: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		referral: 'inline-flex bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 ring-white text-white ',
		sales_inquiry:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
	};
</script>
