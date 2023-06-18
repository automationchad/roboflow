<template>
	<div
		data-state="open"
		class="data-open:animate-overlay-show data-closed:animate-overlay-hide fixed inset-0 z-40 grid place-items-center overflow-y-auto"
		style="pointer-events: auto"
	>
		<div
			role="dialog"
			id="radix-312"
			aria-describedby="radix-316"
			aria-labelledby="radix-315"
			data-state="open"
			class="bg-scale-100 dark:bg-scale-300 border-scale-300 dark:border-scale-500 data-open:animate-overlay-show data-closed:animate-overlay-hide relative my-4 !w-[450px] max-w-xl rounded-md border shadow-xl sm:w-full sm:align-middle"
			tabindex="-1"
			style="pointer-events: auto"
		>
			<div
				class="bg-scale-200 dark:bg-scale-400 border-scale-300 dark:border-scale-500 space-y-1 border-b px-4 py-3 sm:px-5"
			>
				Change payment method
			</div>
			<div class="px-5">
				<div class="space-y-2 py-6">
					<p class="text-sm">
						Upon clicking confirm, all future charges will be deducted from the
						selected payment method. There are no immediate charges.
					</p>
					<div class="!mt-6">
						<div class="space-y-2">
							<p class="text-sm">Select payment method</p>
							<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
								<div class="col-span-12">
									<div class="">
										<button
											class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
											name=""
											id=""
											type="button"
											aria-haspopup="menu"
											aria-expanded="false"
											data-state="closed"
										>
											<span class="flex w-full flex-row items-center space-x-3"
												><img
													src="/img/payment-methods/mastercard.png"
													width="32"
												/><span class="truncate"
													>•••• •••• •••• 6792</span
												></span
											><span
												class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
												><svg
													class="text-scale-600 h-5 w-5"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path
														fill-rule="evenodd"
														d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
														clip-rule="evenodd"
													></path></svg
											></span>
										</button>
									</div>
									<p
										data-state="hide"
										class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
									></p>
								</div>
							</div>
						</div>
						<div id="supabase-captcha">
							<iframe
								src="https://newassets.hcaptcha.com/captcha/v1/672044a/static/hcaptcha.html#frame=checkbox&amp;id=51vyia0o6zz5&amp;host=app.supabase.com&amp;sentry=true&amp;reportapi=https%3A%2F%2Faccounts.hcaptcha.com&amp;recaptchacompat=true&amp;custom=false&amp;hl=en&amp;tplinks=on&amp;sitekey=4ca1fdb9-c9c9-4495-ba50-c85fc0e7ec1f&amp;size=invisible&amp;theme=light&amp;origin=https%3A%2F%2Fapp.supabase.com"
								tabindex="0"
								frameborder="0"
								scrolling="no"
								title="Widget containing checkbox for hCaptcha security challenge"
								aria-hidden="true"
								data-hcaptcha-widget-id="51vyia0o6zz5"
								data-hcaptcha-response=""
								style="display: none"
							></iframe
							><textarea
								id="g-recaptcha-response-51vyia0o6zz5"
								name="g-recaptcha-response"
								style="display: none"
							></textarea
							><textarea
								id="h-captcha-response-51vyia0o6zz5"
								name="h-captcha-response"
								style="display: none"
							></textarea>
						</div>
					</div>
				</div>
			</div>
			<div
				class="border-scale-300 dark:border-scale-500 flex justify-end gap-2 border-t px-5 py-3"
			>
				<div
					class="flex w-full space-x-2"
					style="width: 100%; justify-content: flex-end"
				>
					<button
						class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
						type="button"
					>
						<span class="truncate">Cancel</span></button
					><button
						class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
						type="button"
					>
						<span class="truncate">Confirm</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
