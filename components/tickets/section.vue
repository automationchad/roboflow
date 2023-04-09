<template>
	<div>
		<div class="py-5">
			<div
				class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
			>
				<div class="ml-4 mt-2">
					<h3
						class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
					>
						{{ title }}
					</h3>
				</div>
				<div class="m-0 flex items-center justify-center space-x-3 p-0">
					<div class="m-0 p-0 text-xs dark:text-gray-300">
						<span v-if="displayedTickets.length > 0">
							Page {{ props.page + 1 }} of
							{{ Math.ceil(props.tickets.length / limit) }}
						</span>
						<!-- <span v-else>No records</span> -->
					</div>
					<div class="flex items-center space-x-2">
						<ButtonPageback :disabled="props.page < 1" @click="prevPage" />
						<ButtonPageforward
							:disabled="(props.page === totalPages - 1) || props.tickets.length === 0"
							@click="nextPage"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-3 gap-4 sm:grid-cols-3">
			<div
				v-if="displayedTickets.length <= 0"
				class="relative col-span-3 block w-full rounded-lg border border-dashed border-gray-300 px-6 py-5 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-800"
			>
				<span
					v-if="!props.loading"
					class="block text-sm font-normal text-gray-600 dark:text-slate-400"
				>
					No <span class="lowercase">{{ title }}</span> requests
				</span>
				<span
					v-else
					class="flex items-center justify-center text-sm text-center font-normal text-gray-900 dark:text-slate-400"
				>
					<loading-spinner />
				</span>
			</div>
			<tickets-pill
				v-for="ticket in displayedTickets"
				:key="ticket.id"
				:ticket="ticket"
			/>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref } from 'vue';

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		tickets: {
			type: Array,
			required: true,
		},
		page: {
			type: Number,
			required: true,
		},
		loading: {
			type: Boolean,
			required: true,
		},
	});

	const emit = defineEmits(['update:page']);

	const limit = ref(3);

	const totalPages = computed(() => {
		return Math.ceil(props.tickets.length / limit.value);
	});

	const displayedTickets = computed(() => {
		return props.tickets.slice(
			props.page * limit.value,
			(props.page + 1) * limit.value
		);
	});

	const nextPage = () => {
		if (props.page < totalPages.value - 1) {
			emit('update:page', props.page + 1);
		}
	};

	const prevPage = () => {
		if (props.page > 0) {
			emit('update:page', props.page - 1);
		}
	};
</script>
