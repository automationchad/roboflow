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
							:class="[
								styles[ticket.type],
								'relative inline-flex items-center rounded-full  px-2.5 py-0.5 ring-1 ring-inset',
							]"
						>
							<div class="text-xs font-normal">
								{{ ticket.type }}
							</div>
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
							format(new Date(ticket.dueDate), 'MMM d') ?? 'null'
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
		bug: 'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 hover:bg-red-50 text-red-900 dark:text-red-200',
		billing: 'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300 hover:bg-lime-50 text-lime-900 dark:text-lime-200',
		new: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300 hover:bg-sky-50 text-sky-900 dark:text-sky-200',
	};
</script>
