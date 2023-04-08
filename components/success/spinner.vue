<template>
	<div
		class="flex items-center text-sm font-normal text-slate-600 dark:text-slate-300"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M6.75 19s1.038-2.7 4.25-3.178c.082-.012.166-.023.25-.032m8-4.54v-3.5a3 3 0 0 0-3-3h-8.5a3 3 0 0 0-3 3v8.5a3 3 0 0 0 3 3h3.5m8-4.5s-1.929 2.09-2.893 4.5l-1.607-1.929M14.25 10a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
			></path>
		</svg>
		<span v-if="showText" class="ml-1">Success!</span>
	</div>
</template>

<script setup>
	const props = defineProps({
		showText: {
			type: Boolean,
			required: true,
		},
	});
</script>
