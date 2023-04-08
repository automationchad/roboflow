<template>
	<div class="flex items-center text-sm font-normal text-green-500">
		<CheckCircleIcon class="h-5 w-5" />

		<span v-if="showText" class="ml-1">Success!</span>
	</div>
</template>

<script setup>
	import { CheckCircleIcon } from '@heroicons/vue/20/solid';
	const props = defineProps({
		showText: {
			type: Boolean,
			required: true,
		},
	});
</script>
