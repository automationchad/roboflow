<template>
	<div
		data-radix-popper-content-wrapper=""
		style="
			position: fixed;
			left: 0px;
			top: 0px;
			transform: translate3d(647px, 42px, 0px);
			min-width: max-content;
			z-index: 40;
			--radix-popper-anchor-width: 96.3125px;
			--radix-popper-anchor-height: 24px;
			--radix-popper-available-width: 969px;
			--radix-popper-available-height: 963.5px;
			--radix-popper-transform-origin: 100% 0px;
		"
	>
		<div
			data-side="bottom"
			data-align="end"
			data-state="open"
			role="dialog"
			id="radix-23"
			class="bg-scale-100 dark:bg-scale-300 border-scale-300 dark:border-scale-500 data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide origin-popover data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide z-40 w-auto min-w-fit rounded border shadow-lg"
			tabindex="-1"
			style="
				--radix-popover-content-transform-origin: var(
					--radix-popper-transform-origin
				);
				--radix-popover-content-available-width: var(
					--radix-popper-available-width
				);
				--radix-popover-content-available-height: var(
					--radix-popper-available-height
				);
				--radix-popover-trigger-width: var(--radix-popper-anchor-width);
				--radix-popover-trigger-height: var(--radix-popper-anchor-height);
			"
		>
			<div id="feedback-widget" class="text-area-text-sm">
				<div
					class="grid w-80 gap-2 p-3 text-sm leading-4 md:grid md:grid-cols-12"
				>
					<div class="col-span-12">
						<div class="">
							<div class="relative">
								<textarea
									id=""
									name=""
									rows="5"
									cols="100"
									placeholder="Ideas on how to improve this page.
Use the Support Form for technical issues."
									class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
								></textarea>
							</div>
						</div>
						<p
							data-state="hide"
							class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
						></p>
					</div>
				</div>
				<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
				<div class="w-80 space-y-3 px-3 py-2 pb-4">
					<div class="flex justify-between space-x-2">
						<button
							class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:border-gray-500 focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
						>
							<span class="truncate">Cancel</span>
						</button>
						<div class="flex items-center space-x-2">
							<button
								type="button"
								id="radix-61"
								aria-haspopup="menu"
								aria-expanded="false"
								data-state="closed"
								class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
							>
								<span
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2 px-2.5 py-1 py-1.5 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<rect
											x="3"
											y="3"
											width="18"
											height="18"
											rx="2"
											ry="2"
										></rect>
										<circle cx="8.5" cy="8.5" r="1.5"></circle>
										<polyline points="21 15 16 10 5 21"></polyline></svg
								></span></button
							><input type="file" class="hidden" accept="image/png" /><button
								class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								type="button"
							>
								<span class="truncate">Send feedback</span>
							</button>
						</div>
					</div>
					<p class="text-scale-1000 text-xs">
						Have a technical issue? Contact
						<a href="/dashboard/support/new"
							><span
								class="text-brand-900 hover:text-brand-1200 cursor-pointer transition-colors"
								>Supabase support</span
							></a
						>
						or
						<a href="https://supabase.com/docs" target="_blank" rel="noreferrer"
							><span
								class="text-brand-900 hover:text-brand-1200 cursor-pointer transition-colors"
								>browse our docs</span
							></a
						>.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
