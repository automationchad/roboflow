<template>
	<div
		@click="emits('cancel')"
		class="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-white/60"
		style="pointer-events: auto"
	>
		<div
			@click.stop
			class="relative z-10 my-4 rounded-md border border-slate-200 bg-slate-50 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:w-full sm:max-w-sm sm:align-middle"
		>
			<div
				class="bg-scale-200 dark:bg-scale-400 border-scale-300 dark:border-scale-500 space-y-1 border-b px-4 py-3 sm:px-5"
			>
				<h5 class="text-scale-1200 text-sm">
					Confirm to <span class="lowercase">{{ command.split(' ')[0] }}</span>
				</h5>
			</div>
			<div class="px-5">
				<p class="py-4 text-sm dark:text-slate-300">{{ description }}.</p>
			</div>
			<div
				class="flex justify-end gap-2 border-t border-slate-200 px-5 py-3 dark:border-slate-800"
			>
				<div class="flex items-center gap-2">
					<button
						@click="emits('cancel')"
						class="font-regular bordershadow-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-white px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 ring-1 ring-inset transition transition-all duration-200 ease-out hover:bg-slate-200 focus-visible:outline-4 focus-visible:outline-offset-1 dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-700 dark:hover:ring-slate-600"
						type="button"
					>
						<span class="truncate">Cancel</span></button
					><button
						@click="emits('confirm')"
						class="font-regular focus-visible:outline-brand-600 bordershadow-brand-fixed-1000 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-brand-900 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:bg-indigo-600 dark:ring-indigo-500 dark:hover:bg-indigo-500 dark:hover:ring-indigo-400"
						type="button"
					>
						<span class="truncate">Confirm</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({ description: String, command: String });
	const emits = defineEmits(['cancel', 'confirm']);
</script>
