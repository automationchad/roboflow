<template>
	<div
		@click="emits('cancel')"
		class="data-open:animate-overlay-show data-closed:animate-overlay-hide fixed inset-0 z-40 grid place-items-center overflow-y-auto"
		style="pointer-events: auto"
	>
		<div
			role="dialog"
			id="radix-314"
			aria-describedby="radix-325"
			aria-labelledby="radix-324"
			data-state="open"
			class="bg-scale-100 dark:bg-scale-300 border-scale-300 dark:border-scale-500 data-open:animate-overlay-show data-closed:animate-overlay-hide relative my-4 rounded-md border shadow-xl sm:w-full sm:max-w-sm sm:align-middle"
			tabindex="-1"
			style="pointer-events: auto"
		>
			<div
				class="bg-scale-200 dark:bg-scale-400 border-scale-300 dark:border-scale-500 space-y-1 border-b px-4 py-3 sm:px-5"
			>
				<div class="flex items-baseline gap-2">
					<h5 class="text-scale-1200 text-sm">Delete organisation</h5>
					<span class="text-scale-900 text-xs">Are you sure?</span>
				</div>
			</div>
			<form>
				<div class="space-y-4 py-3">
					<div class="px-5">
						<p class="text-scale-900 text-sm">
							This action <span class="text-scale-1200">cannot</span> be undone.
							This will permanently delete the
							<span class="text-scale-1200">yyyyy</span> organization and remove
							all of its projects.
						</p>
					</div>
					<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
					<div class="px-5">
						<div class="grid w-full gap-2 text-sm md:grid md:grid-cols-12">
							<div class="col-span-12 flex flex-row justify-between space-x-2">
								<label class="text-scale-1100 block text-sm" for="orgName"
									><span
										>Please type
										<span class="font-bold">quvsrhtwyfmvyswurhlx</span> to
										confirm</span
									></label
								>
							</div>
							<div class="col-span-12">
								<div class="">
									<div class="relative">
										<input
											id="orgName"
											name=""
											placeholder="Enter the string above"
											type="text"
											class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 box-border block w-full rounded-md border border border-red-700 bg-red-100 px-4 py-2 text-sm shadow-sm outline-none transition-all placeholder:text-red-600 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-red-500"
											value=""
										/>
										<div
											class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
										>
											<div
												class="pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2 text-red-900"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon"
												>
													<circle cx="12" cy="12" r="10"></circle>
													<line x1="12" y1="8" x2="12" y2="12"></line>
													<line x1="12" y1="16" x2="12.01" y2="16"></line>
												</svg>
											</div>
										</div>
									</div>
								</div>
								<p
									data-state="show"
									class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
								>
									Value entered does not match the value above.
								</p>
							</div>
						</div>
					</div>
					<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
					<div class="px-5">
						<button
							class="font-regular text-red-1100 bordershadow-red-700 hover:bordershadow-red-900 hover:text-lo-contrast relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded bg-red-200 px-3 py-2 text-center text-sm leading-4 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-red-900 focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-red-700"
							type="submit"
						>
							<span class="truncate"
								>I understand, delete this organization</span
							>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({ description: String, command: String });
	const emits = defineEmits(['cancel', 'confirm']);
</script>
