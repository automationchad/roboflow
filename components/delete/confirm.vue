<template>
	<div
		@click="emits('cancel')"
		class="fixed inset-0 z-[400] grid place-items-center overflow-y-auto bg-black/30"
		style="pointer-events: auto"
	>
		<div
			role="dialog"
			class="relative my-4 rounded-md border border-slate-300 bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:w-full sm:max-w-sm sm:align-middle"
			style="pointer-events: auto"
		>
			<div
				class="dark:bg-white/[2%] space-y-1 border-b border-slate-300 bg-slate-200 px-4 py-3 dark:border-slate-800 dark:text-white sm:px-5"
			>
				Confirm to <span class="lowercase">{{ command.split(' ')[0] }}</span>
			</div>
			<div class="px-5">
				<p class="py-4 text-sm text-slate-300">
					Are you sure you want to {{ description }}? This action cannot be
					undone.
				</p>
			</div>
			<div
				class="flex justify-end gap-2 border-t border-slate-300 px-5 py-3 dark:border-slate-800"
			>
				<div class="flex items-center gap-2">
					<button
						@click="emits('cancel')"
						class="font-regular focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-slate-100 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset transition transition-all duration-200 ease-out hover:bg-slate-200 focus-visible:outline-4 focus-visible:outline-offset-1 dark:bg-slate-800 dark:ring-slate-700 dark:hover:bg-slate-700 dark:hover:ring-slate-600"
						type="button"
					>
						<span class="truncate">Cancel</span></button
					><button
						@click="emits('confirm')"
						class="font-regular focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-300 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:bg-indigo-600 dark:ring-indigo-500 dark:hover:bg-indigo-500 dark:hover:ring-indigo-400"
						type="button"
					>
						<span class="truncate">{{ command }}</span>
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
