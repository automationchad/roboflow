<template>
	<div
		data-radix-popper-content-wrapper=""
		style="
			position: fixed;
			left: 0px;
			top: 0px;
			transform: translate3d(311px, 44px, 0px);
			min-width: max-content;
			z-index: 40;
			--radix-popper-anchor-width: 36px;
			--radix-popper-anchor-height: 24px;
			--radix-popper-available-width: 1013px;
			--radix-popper-available-height: 961.5px;
			--radix-popper-transform-origin: 100% 0px;
		"
	>
		<div
			data-side="bottom"
			data-align="end"
			data-state="open"
			role="dialog"
			id="radix-24"
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
			<div class="w-[400px] lg:w-[700px]">
				<div
					class="flex items-center justify-between border-b border-gray-500 bg-gray-400 px-4 py-2"
				>
					<p class="text-sm">Notifications</p>
				</div>
				<div class="max-h-[380px] overflow-y-auto py-2">
					<div class="px-4 py-2">
						<p class="text-scale-1000 text-sm">No notifications available</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
