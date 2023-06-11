<template>
	<div class="fixed right-10 top-20 z-10">
		<div
			class="flex max-w-sm justify-between space-x-4 rounded-md bg-white px-4 py-2 shadow-md ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-800"
		>
			<div
				class="flex items-center space-x-2 text-sm text-gray-800 dark:text-white"
			>
				<div class="relative flex items-center">
					<XCircleIcon class="z-10 h-7 w-7 text-red-400" /><span
						class="absolute left-2 top-2 h-3 w-3 rounded-full bg-white"
					></span>
				</div>
				<div class="">{{ props.title }} {{ props.description }}</div>
			</div>
			<div class="flex items-center dark:text-white">
				<button @click="emits('close')">
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M17.25 6.75L6.75 17.25"
						></path>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6.75 6.75L17.25 17.25"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: 'Title',
		},
		description: {
			type: String,
			default: 'Description',
		},
	});

	const emits = defineEmits(['close']);

	import { XCircleIcon } from '@heroicons/vue/24/solid';
</script>
