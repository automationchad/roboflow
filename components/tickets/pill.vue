<template>
	<NuxtLink
		class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
		:to="`/${route.params.team}/tickets/${ticket.id}`"
		><div class="min-w-0 flex-1">
			<div class="rounded-xl focus:outline-none">
				<div class="grid grid-cols-3 justify-between">
					<div class="col-span-2 flex items-center space-x-4 truncate">
						<p
							class="truncate text-sm font-medium text-gray-900 dark:text-white"
						>
							{{ ticket.name }}
						</p>
						<div
							v-if="ticket.type === 'new'"
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
							<div class="ml-3 text-xs font-semibold text-sky-900">New</div>
						</div>
						<div
							v-else
							class="relative inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-800 px-2.5 py-1 ring-1 ring-inset ring-purple-300 hover:bg-purple-50"
						>
							<div
								class="absolute flex flex-shrink-0 items-center justify-center"
							>
								<span
									class="h-1.5 w-1.5 rounded-full bg-purple-500 dark:bg-purple-300"
									aria-hidden="true"
								/>
							</div>
							<div class="ml-3 text-xs font-semibold text-purple-900 dark:text-purple-100">Bug</div>
						</div>
					</div>
					<div
						v-if="ticket.status === 'done'"
						class="col-span-1 flex items-center justify-end space-x-1 text-sm text-gray-400"
					>
						<CheckCircleIcon class="h-4 w-4" />
						<span>{{
							format(new Date(ticket.updatedOn), 'MMM d, yyyy') ?? 'null'
						}}</span>
					</div>
					<div
						v-else-if="ticket.status === 'active'"
						class="flex items-center space-x-1 text-sm text-gray-400"
					>
						<ClockIcon class="h-4 w-4" />
						<span>{{
							'In ' + formatDistance(new Date(ticket.dueDate), new Date())
						}}</span>
					</div>
					<div
						v-else
						class="col-span-1 flex items-center justify-end space-x-1 text-sm text-gray-400"
					>
						<CalendarIcon class="h-4 w-4" />
						<span>{{
							format(new Date(ticket.dueDate), 'MMM d, yyyy') ?? 'null'
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
</script>
