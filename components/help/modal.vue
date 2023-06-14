<template>
    <div
						data-side="bottom"
						data-align="end"
						data-state="open"
						role="dialog"
						id="radix-1"
						class="dark:bg-scale-300 data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide origin-popover data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide z-40 w-auto min-w-fit rounded border border-slate-100 bg-slate-50 shadow-lg dark:border-slate-500"
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
						<div class="my-4 w-96 space-y-4">
							<div class="my-5 space-y-4 px-5">
								<h5 class="text-scale-1200">Need help with your project?</h5>
								<p class="text-scale-900 text-sm">
									For issues with your project hosted on supabase.com, or other
									inquiries about our hosted services.
								</p>
								<div class="space-x-1">
									<a href="/dashboard/support/new?ref=nsfipxnlucvgchlkqvqw"
										><button
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<svg
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
												<path
													d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
												></path>
												<polyline points="22,6 12,13 2,6"></polyline></svg
											><span class="truncate">Contact Support</span>
										</button></a
									><a
										target="_blank"
										rel="noreferrer"
										href="https://supabase.com/docs/"
										><button
											class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<svg
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
												<path
													d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
												></path>
												<path
													d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
												></path></svg
											><span class="truncate">Docs</span>
										</button></a
									><a
										target="_blank"
										rel="noreferrer"
										href="https://status.supabase.com/"
										><button
											class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<svg
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
												<polyline
													points="22 12 18 12 15 21 9 3 6 12 2 12"
												></polyline></svg
											><span class="truncate">Supabase Status</span>
										</button></a
									>
								</div>
								<p class="text-scale-900 text-sm">
									Expected response time is based on your billing plan. Pro and
									Pay as You Go plans are prioritized.
								</p>
							</div>
							<div
								class="dark:bg-scale-500 my-2 h-px w-full bg-slate-200"
							></div>
							<div class="mb-4 space-y-2">
								<div class="mb-4 px-5">
									<h5 class="mb-2">Reach out to the community</h5>
									<p class="text-scale-900 text-sm">
										For other support, including questions on our client
										libraries, advice, or best practices.
									</p>
								</div>
								<div class="px-5">
									<div
										class="relative space-y-2 overflow-hidden rounded px-5 py-4 pb-12 shadow-md"
										style="background: rgb(64, 78, 237)"
									>
										<a
											href="https://discord.supabase.com"
											target="_blank"
											rel="noreferrer"
											class="dark block cursor-pointer"
											><span
												style="
													box-sizing: border-box;
													display: block;
													overflow: hidden;
													width: initial;
													height: initial;
													background: none;
													opacity: 1;
													border: 0px;
													margin: 0px;
													padding: 0px;
													position: absolute;
													inset: 0px;
												"
												><img
													alt="discord illustration header"
													sizes="100vw"
													srcset=""
													src="~/assets/images/slack-background.png"
													decoding="async"
													data-nimg="fill"
													class="absolute left-0 top-0 opacity-50"
													style="
														position: absolute;
														inset: 0px;
														box-sizing: border-box;
														padding: 0px;
														border: none;
														margin: auto;
														display: block;
														width: 0px;
														height: 0px;
														min-width: 100%;
														max-width: 100%;
														min-height: 100%;
														max-height: 100%;
														object-fit: cover;
													" /></span
											><button
												class="font-regular text-scale-100 hover:text-scale-800 focus-visible:text-scale-600 bordershadow-scale-1100 hover:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-white px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
												<svg
													class="h-3 w-4"
													viewBox="0 0 24 24"
													fill="currentColor"
													stroke="none"
												>
													<path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M8.804 0A2.397 2.397 0 0 0 6.41 2.4a2.398 2.398 0 0 0 2.395 2.399h2.396V2.4A2.4 2.4 0 0 0 8.804 0c.001 0 .001 0 0 0Zm0 6.4H2.418A2.398 2.398 0 0 0 .022 8.8a2.398 2.398 0 0 0 2.395 2.4h6.387A2.398 2.398 0 0 0 11.2 8.8a2.398 2.398 0 0 0-2.396-2.4Z"
														fill="#36C5F0"
													></path>
													<path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M23.975 8.8a2.398 2.398 0 0 0-2.396-2.4 2.398 2.398 0 0 0-2.396 2.4v2.4h2.396a2.398 2.398 0 0 0 2.396-2.4Zm-6.388 0V2.4A2.398 2.398 0 0 0 15.193 0a2.398 2.398 0 0 0-2.396 2.4v6.4a2.398 2.398 0 0 0 2.395 2.4 2.398 2.398 0 0 0 2.395-2.4Z"
														fill="#2EB67D"
													></path>
													<path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M15.192 24a2.398 2.398 0 0 0 2.395-2.4 2.398 2.398 0 0 0-2.395-2.399h-2.396v2.4A2.4 2.4 0 0 0 15.192 24Zm0-6.401h6.387a2.398 2.398 0 0 0 2.396-2.4 2.398 2.398 0 0 0-2.395-2.4h-6.387a2.398 2.398 0 0 0-2.396 2.4 2.397 2.397 0 0 0 2.395 2.4Z"
														fill="#ECB22E"
													></path>
													<path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M.022 15.2a2.398 2.398 0 0 0 2.396 2.399 2.398 2.398 0 0 0 2.396-2.4v-2.4H2.418a2.398 2.398 0 0 0-2.396 2.4Zm6.388 0v6.4A2.398 2.398 0 0 0 8.804 24a2.398 2.398 0 0 0 2.396-2.4v-6.399a2.396 2.396 0 1 0-4.79-.002s0 .001 0 0Z"
														fill="#E01E5A"
													></path></svg
												><span class="truncate"
													><span style="color: rgb(19, 25, 82)"
														>Join Slack server</span
													></span
												>
											</button></a
										>
									</div>
								</div>
								<div class="px-5">
									<div
										class="relative space-y-2 overflow-hidden rounded px-5 py-4 pb-12 shadow-md"
									>
										<a
											href="https://github.com/supabase/supabase/discussions"
											target="_blank"
											rel="noreferrer"
											class="block cursor-pointer"
											><span
												style="
													box-sizing: border-box;
													display: block;
													overflow: hidden;
													width: initial;
													height: initial;
													background: none;
													opacity: 1;
													border: 0px;
													margin: 0px;
													padding: 0px;
													position: absolute;
													inset: 0px;
												"
												><img
													alt="discord illustration header"
													sizes="100vw"
													srcset="
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=640&amp;q=75   640w,
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=750&amp;q=75   750w,
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=828&amp;q=75   828w,
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=1080&amp;q=75 1080w,
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=1200&amp;q=75 1200w,
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=1920&amp;q=75 1920w,
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=2048&amp;q=75 2048w,
														/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=3840&amp;q=75 3840w
													"
													src="/dashboard/_next/image?url=%2Fdashboard%2Fimg%2Fsupport%2Fgithub-bg.jpg%3Fv-1&amp;w=3840&amp;q=75"
													decoding="async"
													data-nimg="fill"
													class="absolute left-0 top-0 opacity-50"
													style="
														position: absolute;
														inset: 0px;
														box-sizing: border-box;
														padding: 0px;
														border: none;
														margin: auto;
														display: block;
														width: 0px;
														height: 0px;
														min-width: 100%;
														max-width: 100%;
														min-height: 100%;
														max-height: 100%;
														object-fit: cover;
													" /></span
											><button
												class="font-regular bg-scale-1200 text-scale-100 hover:text-scale-800 focus-visible:text-scale-600 bordershadow-scale-1100 hover:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
												<svg
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
													<path
														d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
													></path></svg
												><span class="truncate">GitHub Discussions</span>
											</button></a
										>
									</div>
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
</style>