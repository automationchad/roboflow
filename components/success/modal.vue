<template>
	<div class="fixed right-10 top-20 z-10">
		<div
			class="relative flex max-w-sm flex-col overflow-hidden rounded-md bg-white px-4 py-2 shadow-md ring-1 ring-gray-300 dark:bg-gray-900 dark:ring-gray-800"
		>
			<div class="flex w-full justify-between space-x-4">
				<div
					class="flex items-center space-x-2 text-sm text-gray-800 dark:text-white"
				>
					<div class="relative flex items-center">
						<CheckCircleIcon class="z-10 h-7 w-7 text-lime-400" /><span
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
			<div
				class="absolute inset-x-0 bottom-0 h-0.5 rounded-r-full bg-gradient-to-r from-sky-400 to-purple-400 transition-width ease-in duration-75"
				:style="`width: ${width}%`"
			></div>
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

	const width = ref(100);

	watchEffect(() => {
		if (props.title || props.description) {
			setTimeout(() => {
				emits('close');
			}, 3000);
		}
	});

	watchEffect(() => {
		if (props.title || props.description) {
			const interval = setInterval(() => {
				if (width.value <= 0) {
					clearInterval(interval);
				} else {
					width.value--;
				}
			}, 30); // adjust timing as needed
		}
	});

	import { CheckCircleIcon } from '@heroicons/vue/24/solid';
</script>
