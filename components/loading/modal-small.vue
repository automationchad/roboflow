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
						<svg
							class="-ml-1 mr-3 h-4 w-4 animate-spin dark:text-white"
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
							></path></svg
						>
					</div>
					<div class="">{{ props.title }} {{ props.description }}</div>
				</div>
				
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

	// const emits = defineEmits(['close']);

	// const width = ref(100);

	// watchEffect(() => {
	// 	if (props.title || props.description) {
	// 		setTimeout(() => {
	// 			emits('close');
	// 		}, 3000);
	// 	}
	// });

	// watchEffect(() => {
	// 	if (props.title || props.description) {
	// 		const interval = setInterval(() => {
	// 			if (width.value <= 0) {
	// 				clearInterval(interval);
	// 			} else {
	// 				width.value--;
	// 			}
	// 		}, 30); // adjust timing as needed
	// 	}
	// });

	import { XCircleIcon } from '@heroicons/vue/24/solid';
</script>
