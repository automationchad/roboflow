<template>
	<div>
		<div class="overflow-auto">
			<section class="relative">
                
				<div class="mx-auto my-10 max-w-[80vw] dark:text-white">
					<div>
						<div>
							<h4 class="mb-8 text-lg">Change your project's subscription</h4>
                            <org-update-plan/>
							<div class="grid grid-cols-2 gap-8 py-8 lg:grid-cols-3 dark:text-white" v-if="false">
								<div
									class="bg-scale-300 flex flex-col justify-between rounded border px-6 py-6"
								>
									<div class="space-y-8">
										<div class="space-y-4">
											<div class="flex items-center space-x-2">
												<p class="text-brand-900 text-sm">Free</p>
												<div
													class="bg-scale-500 text-scale-1000 rounded px-2 py-0.5 text-xs"
												>
													Current plan
												</div>
											</div>
											<p class="text-scale-1100 text-sm">
												Perfect for passion projects &amp; simple websites.
											</p>
											<div class="space-y-2 border-b border-t py-8">
												<p class="text-scale-1000 text-sm">Starting from</p>
												<div class="space-y-1">
													<p class="text-[3.4rem] leading-none">$0</p>
													<p class="text-scale-1000 text-sm">
														per month per project
													</p>
												</div>
												<div
													class="bg-brand-400 text-brand-900 w-fit rounded px-2 py-0.5 text-xs"
												>
													Limit of 2 free projects
												</div>
											</div>
										</div>
										<div class="space-y-4">
											<p class="text-scale-1000 text-xs">Get started with:</p>
											<ul role="list" class=" ">
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Up to 500MB database &amp; 1GB file storage
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Up to 2GB bandwidth
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Up to 50MB file uploads
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Social OAuth providers
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														50,000 monthly active users
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Up to 500K Edge Function invocations
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														1-day log retention
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														200 concurrent Realtime connections
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														2 million Realtime messages
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Community support
													</p>
												</li>
											</ul>
										</div>
									</div>
									<div class="!mt-20 space-y-4">
										<div class="space-y-2">
											<p class="text-scale-1000 text-xs">
												Free projects are paused after 1 week of inactivity.
											</p>
										</div>
										<div
											class="flex flex-col items-center justify-center space-y-2"
										>
											<button data-state="closed" class="w-full">
												<button
													class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative flex inline-flex w-full cursor-not-allowed cursor-pointer items-center items-center justify-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													disabled=""
													type="button"
												>
													<span class="truncate">Current plan</span>
												</button>
											</button>
										</div>
									</div>
								</div>
								<div
									class="bg-scale-300 flex flex-col justify-between rounded border px-6 py-6"
								>
									<div class="space-y-8">
										<div class="space-y-4">
											<div class="flex items-center space-x-2">
												<p class="text-brand-900 text-sm">Pro</p>
											</div>
											<p class="text-scale-1100 text-sm">
												For production applications with the option to scale.
											</p>
											<div class="space-y-2 border-b border-t py-8">
												<p class="text-scale-1000 text-sm">Starting from</p>
												<div class="space-y-1">
													<p class="text-[3.4rem] leading-none">$25</p>
													<p class="text-scale-1000 text-sm">
														per month per project
													</p>
												</div>
												<div
													class="bg-brand-400 text-brand-900 w-fit rounded px-2 py-0.5 text-xs"
												>
													+ any additional usage
												</div>
											</div>
										</div>
										<div class="space-y-4">
											<p class="text-scale-1000 text-xs">
												Everything in the Free plan, plus:
											</p>
											<ul role="list" class=" ">
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														8GB database &amp; 100GB file storage
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														50GB bandwidth
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														5GB file uploads
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Social OAuth providers
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														100,000 monthly active users
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														2M Edge Function invocations
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Daily backups
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														7-day log retention
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														500 concurrent Realtime connections
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														5 million Realtime messages
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														No project pausing
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Email support
													</p>
												</li>
											</ul>
										</div>
									</div>
									<div class="!mt-20 space-y-4">
										<div class="space-y-2">
											<p class="text-scale-1000 text-xs"></p>
										</div>
										<div
											class="flex flex-col items-center justify-center space-y-2"
										>
											<button data-state="closed" class="w-full">
												<button
													class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													type="button"
												>
													<span class="truncate">Upgrade to Pro</span>
												</button>
											</button>
										</div>
									</div>
								</div>
								<div
									class="bg-scale-200 flex flex-col justify-between rounded border px-6 py-6"
								>
									<div class="flex flex-col space-y-8 xl:flex-col xl:space-x-0">
										<div class="space-y-4 xl:w-auto">
											<div class="flex items-center space-x-2">
												<p
													class="text-brand-900 font-mono text-sm font-bold uppercase lg:text-base xl:text-sm"
												>
													Enterprise
												</p>
											</div>
											<p class="text-scale-1100 text-sm">
												For large-scale applications managing serious workloads.
											</p>
											<div
												class="space-y-2 border-b pb-6 lg:border-b-0 lg:border-t lg:pt-6 xl:border-b xl:border-t-0 xl:pb-6 xl:pt-0"
											>
												<a href="https://supabase.com/contact/enterprise"
													><button
														class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														type="button"
													>
														<span class="truncate">Contact sales</span>
													</button></a
												>
											</div>
										</div>
										<div class="lg:!mt-0 lg:space-y-0 xl:space-y-4">
											<p class="text-scale-1000 text-xs"></p>
											<ul role="list" class="xl:columns-1 xl:gap-0">
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Point in time recovery
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Designated Support manager &amp; SLAs
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Enterprise OAuth providers
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">SSO/ SAML</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">SOC2</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														Custom contracts &amp; invoicing
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														On-premise support
													</p>
												</li>
												<li class="flex py-2">
													<div class="w-[12px]">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="21"
															height="21"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="3"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon text-brand-900 h-3 w-3 translate-y-[2.5px]"
															aria-hidden="true"
														>
															<polyline points="20 6 9 17 4 12"></polyline>
														</svg>
													</div>
													<p class="text-scale-1100 ml-3 text-xs">
														24×7×365 premium enterprise support
													</p>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="mt-4 flex items-center justify-center">
								<a target="_blank" href="https://supabase.com/pricing"
									><button
										class="font-regular text-brand-1100 hover:bg-brand-400 focus-visible:outline-scale-700 text-scale-1000 hover:text-scale-1100 hover:bg-scale-400 relative inline-flex cursor-pointer items-center space-x-2 rounded border border-transparent border-opacity-0 bg-opacity-0 px-2.5 py-1 text-center text-sm text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:bg-opacity-0"
										type="button"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
											></path>
											<polyline points="15 3 21 3 21 9"></polyline>
											<line x1="10" y1="14" x2="21" y2="3"></line></svg
										><span class="truncate"
											>See detailed comparisons across plans</span
										>
									</button></a
								>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
