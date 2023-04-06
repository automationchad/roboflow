<template>
	<div v-if="role !== 'owner' && role !== 'super_admin'">
		<div class="mt-4 rounded-md bg-red-50 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-red-800">
						You currently don't have access to change billing details
					</h3>

					<span class="mt-2 text-sm text-red-700">
						Contact an owner to request these changes.
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { XCircleIcon } from '@heroicons/vue/20/solid';
	const props = defineProps({
		role: String,
	});
</script>
