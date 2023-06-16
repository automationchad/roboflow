<template>
	<div
		data-state="open"
		class="data-open:animate-overlay-show data-closed:animate-overlay-hide fixed inset-0 z-40 grid place-items-center overflow-y-auto"
		style="pointer-events: auto"
	>
		<div
			role="dialog"
			id="radix-701"
			aria-describedby="radix-706"
			aria-labelledby="radix-705"
			data-state="open"
			class="bg-scale-100 dark:bg-scale-300 border-scale-300 dark:border-scale-500 data-open:animate-overlay-show data-closed:animate-overlay-hide PAYMENT relative my-4 rounded-md border shadow-xl sm:w-full sm:max-w-lg sm:align-middle"
			tabindex="-1"
			style="pointer-events: auto"
		>
			<div
				class="bg-scale-200 dark:bg-scale-400 border-scale-300 dark:border-scale-500 space-y-1 border-b px-4 py-3 sm:px-5"
			>
				Add new payment method
			</div>
			<div class="space-y-4 py-4">
				<form>
					<div class="px-5">
						<div class="opacity-100 transition">
							<div class="StripeElement">
								<div
									class="__PrivateStripeElement"
									style="
										margin: -4px 0px !important;
										padding: 0px !important;
										border: none !important;
										display: block !important;
										background: transparent !important;
										position: relative !important;
										opacity: 1 !important;
										clear: both !important;
										transition: height 0.35s ease 0s !important;
									"
								>
									<iframe
										name="__privateStripeFrame20319"
										frameborder="0"
										allowtransparency="true"
										scrolling="no"
										role="presentation"
										allow="payment *"
										src="https://js.stripe.com/v3/elements-inner-payment-9a3ae5346969a559c122790b2a2a0ea8.html#wait=false&amp;rtl=false&amp;componentName=payment&amp;keyMode=live&amp;apiKey=pk_live_RCgmeGrogodF6BBvZj2M6zGc00r2Nck4eJ&amp;referrer=https%3A%2F%2Fsupabase.com%2Fdashboard%2Forg%2Fphfcwtaxwhtjhoctesmi%2Fbilling&amp;controllerId=__privateStripeController2031"
										title="Secure payment input frame"
										style="
											border: none !important;
											margin: -4px;
											padding: 0px !important;
											width: calc(100% + 8px);
											min-width: 100% !important;
											overflow: hidden !important;
											display: block !important;
											user-select: none !important;
											transform: translate(0px) !important;
											color-scheme: light only !important;
											height: 297.992px;
											opacity: 1;
											transition: height 0.35s ease 0s, opacity 0.4s ease 0.1s;
										"
									></iframe>
								</div>
							</div>
						</div>
					</div>
					<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
					<div class="px-5">
						<div class="flex items-center space-x-2 pt-2">
							<button
								class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								type="submit"
							>
								<span class="truncate">Save</span></button
							><button
								class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								type="button"
							>
								<span class="truncate">Cancel</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
