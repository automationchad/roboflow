<template>
	<div class="flex h-full w-full items-center justify-center">
		<div class="flex flex-col items-center space-y-4">
			<div class="flex h-full w-full items-center justify-center">
				<div
					class="border-panel-border-light bg-panel-body-light dark:border-panel-border-dark dark:bg-panel-body-dark flex space-x-4 rounded border p-6 shadow-md"
				>
					<div class="flex flex-col">
						<div class="w-80 space-y-4">
							<h5>Project Editor</h5>
							<div class="flex flex-col space-y-2">
								<p class="text-scale-1100 text-sm">
									Select a project from the navigation panel on the left to view
									its data, or create a new one.
								</p>
							</div>
							<div class="flex items-center space-x-2">
								<button data-state="closed">
									<button
										@click="showProjectModal = true"
										class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										type="button"
									>
										<span class="truncate">Create a new project</span>
									</button>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ProjectModal v-if="showProjectModal" @close="showProjectModal = false" />
	</div>
</template>

<script setup>
	definePageMeta({ layout: 'client-editor', middleware: ['auth'] });

	const showProjectModal = ref(false);
</script>
