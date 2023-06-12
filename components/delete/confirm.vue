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
				class="space-y-1 border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-800 dark:bg-white/[2%] dark:text-white sm:px-5"
			>
				Confirm to <span class="lowercase">{{ command.split(' ')[0] }}</span>
			</div>
			<div class="px-5">
				<p class="py-4 text-sm dark:text-slate-300">
					This is permanent! Are you sure you want to {{ description }}? This action cannot be
					undone.
				</p>
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
						class="font-regular focus-visible:outline-brand-600 bordershadow-brand-fixed-1000 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:bg-indigo-600 dark:ring-indigo-500 dark:hover:bg-indigo-500 dark:hover:ring-indigo-400"
						type="button"
					>
						<span class="truncate">{{ command }}</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.bordershadow-scale-600 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #dfe3e6 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-1000 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #7375ed 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-900 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #e59fe9 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>

<script setup>
	const props = defineProps({ description: String, command: String });
	const emits = defineEmits(['cancel', 'confirm']);

</script>
