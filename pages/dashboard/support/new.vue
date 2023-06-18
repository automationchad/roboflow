<template>
	<div
		class="relative flex overflow-y-auto overflow-x-hidden"
		style="height: 100vh; max-height: 100vh"
	>
		<div class="mx-auto my-8 max-w-2xl px-4 lg:px-6">
			<div class="space-y-12 py-8">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<svg
							width="109"
							height="113"
							viewBox="0 0 109 113"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
						>
							<path
								d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0625L99.1935 40.0625C107.384 40.0625 111.952 49.5226 106.859 55.9372L63.7076 110.284Z"
								fill="url(#paint0_linear)"
							></path>
							<path
								d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0625L99.1935 40.0625C107.384 40.0625 111.952 49.5226 106.859 55.9372L63.7076 110.284Z"
								fill="url(#paint1_linear)"
								fill-opacity="0.2"
							></path>
							<path
								d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
								fill="#3ECF8E"
							></path>
							<defs>
								<linearGradient
									id="paint0_linear"
									x1="53.9738"
									y1="54.9738"
									x2="94.1635"
									y2="71.8293"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#249361"></stop>
									<stop offset="1" stop-color="#3ECF8E"></stop>
								</linearGradient>
								<linearGradient
									id="paint1_linear"
									x1="36.1558"
									y1="30.5779"
									x2="54.4844"
									y2="65.0804"
									gradientUnits="userSpaceOnUse"
								>
									<stop></stop>
									<stop offset="1" stop-opacity="0"></stop>
								</linearGradient>
							</defs>
						</svg>
						<h1 class="m-0 text-lg">Supabase support</h1>
					</div>
					<div class="flex items-center space-x-3">
						<button data-state="closed">
							<a
								target="_blank"
								rel="noreferrer"
								href="https://status.supabase.com/"
								><button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<div class="bg-brand-900 h-2 w-2 rounded-full"></div>
									<span class="truncate">All systems operational</span>
								</button></a
							>
						</button>
					</div>
				</div>
				<div
					class="bg-panel-body-light dark:border-dark dark:bg-panel-body-dark min-w-full space-y-12 rounded border py-8 shadow-md"
				>
					<form id="support-form">
						<div class="w-[620px] space-y-8">
							<div class="px-6"><h3 class="text-xl">How can we help?</h3></div>
							<div class="px-6">
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for="category"
											>What area are you having problems with?</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<button
												class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
												name=""
												id="category"
												type="button"
												aria-haspopup="menu"
												aria-expanded="false"
												data-state="closed"
											>
												<span
													class="flex w-full flex-row items-center space-x-3"
													><span class="truncate">Sales enquiry</span></span
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
							<div class="px-6">
								<div class="grid grid-cols-2 gap-4">
									<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
										<div
											class="col-span-12 flex flex-row justify-between space-x-2"
										>
											<label
												class="text-scale-1100 block text-sm"
												for="projectRef"
												>Which project is affected?</label
											>
										</div>
										<div class="col-span-12">
											<div class="">
												<button
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
													name=""
													id="projectRef"
													type="button"
													aria-haspopup="menu"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														class="flex w-full flex-row items-center space-x-3"
														><span class="truncate">motis-group</span></span
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
									<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
										<div
											class="col-span-12 flex flex-row justify-between space-x-2"
										>
											<label
												class="text-scale-1100 block text-sm"
												for="severity"
												>Severity</label
											>
										</div>
										<div class="col-span-12">
											<div class="">
												<button
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
													name=""
													id="severity"
													type="button"
													aria-haspopup="menu"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														class="flex w-full flex-row items-center space-x-3"
														><span class="truncate">Low</span></span
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
								<p class="text-scale-1000 mt-2 text-sm">
									This project is on the
									<span class="text-scale-1100">Free plan</span>
								</p>
							</div>
							<div class="px-6">
								<div
									class="border-scale-600 bg-scale-100 dark:border-scale-500 dark:bg-scale-400 block w-full rounded border py-3"
								>
									<div class="flex flex-col px-4">
										<div class="flex items-center justify-between">
											<div class="flex w-full space-x-3 lg:items-start">
												<span class="text-scale-900"
													><svg
														xmlns="http://www.w3.org/2000/svg"
														width="21"
														height="21"
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
														<line
															x1="12"
															y1="16"
															x2="12.01"
															y2="16"
														></line></svg
												></span>
												<div class="flex-grow">
													<h5 class="text-scale-1200 text-sm">
														Expected response times are based on your project's
														plan
													</h5>
												</div>
											</div>
											<div class="text-scale-900 cursor-pointer">
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
													<polyline points="15 3 21 3 21 9"></polyline>
													<polyline points="9 21 3 21 3 15"></polyline>
													<line x1="21" y1="3" x2="14" y2="10"></line>
													<line x1="3" y1="21" x2="10" y2="14"></line>
												</svg>
											</div>
										</div>
										<div
											class="flex flex-col space-y-3 overflow-hidden transition-all"
											style="max-height: 0px"
										>
											<div class="text-scale-1100 text-sm">
												<div class="mb-1 space-y-4">
													<p>
														Free plan support is available within the community
														and officially by the team on a best efforts basis,
														though we cannot guarantee a response time. For a
														guaranteed response time we recommend upgrading to
														the Pro plan. Enhanced SLAs for support are
														available on our Enterprise Plan.
													</p>
													<div class="flex items-center space-x-2">
														<a
															href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/billing/update"
															><button
																class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																type="button"
															>
																<span class="truncate">Upgrade project</span>
															</button></a
														><a
															target="_blank"
															rel="noreferrer"
															href="https://supabase.com/contact/enterprise"
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
																		d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																	></path>
																	<polyline points="15 3 21 3 21 9"></polyline>
																	<line
																		x1="10"
																		y1="14"
																		x2="21"
																		y2="3"
																	></line></svg
																><span class="truncate"
																	>Enquire about Enterprise</span
																>
															</button></a
														>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-scale-400 h-px w-full"></div>
							<div class="px-6">
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for="subject"
											>Subject</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													id="subject"
													name=""
													placeholder="Summary of the problem you have"
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													value=""
												/>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
									</div>
								</div>
							</div>
							<div class="space-y-2 px-6">
								<p class="text-scale-1100 text-sm">
									Which services are affected?
								</p>
								<div class="form-group">
									<div
										class="form-control form-control--multi-select border-scale-700 bg-scaleA-200 multi-select relative block w-full w-full space-x-1 overflow-auto rounded border"
									>
										<button
											type="button"
											aria-haspopup="dialog"
											aria-expanded="false"
											aria-controls="radix-75"
											data-state="closed"
											class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
										>
											<div
												class="flex h-9 w-full cursor-default flex-wrap items-start gap-1.5 p-1.5"
											>
												<div
													class="text-scale-1000 flex h-full items-center px-2 text-sm"
												>
													No particular service
												</div>
												<div
													class="absolute inset-y-0 right-0 flex cursor-pointer items-center space-x-1 pl-3 pr-2"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon text-scale-900"
													>
														<polyline points="6 9 12 15 18 9"></polyline>
													</svg>
												</div>
											</div>
										</button>
									</div>
								</div>
							</div>
							<div class="text-area-text-sm px-6">
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for="message"
											>Message</label
										><span class="text-scale-900 text-sm" id="message-optional"
											>5000 character limit</span
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<textarea
													id="message"
													name=""
													rows="4"
													cols="100"
													placeholder="Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible."
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													maxlength="5000"
												></textarea>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
									</div>
								</div>
							</div>
							<div class="space-y-4 px-6">
								<div class="space-y-1">
									<p class="text-scale-1100 block text-sm">Attachments</p>
									<p class="text-scale-1000 block text-sm">
										Upload up to 5 screenshots that might be relevant to the
										issue that you're facing
									</p>
								</div>
								<div>
									<input
										multiple=""
										type="file"
										class="hidden"
										accept="image/png, image/jpeg"
									/>
								</div>
								<div class="flex items-center space-x-2">
									<div
										class="border-scale-800 group flex h-14 w-14 cursor-pointer items-center justify-center rounded border opacity-50 transition hover:opacity-100"
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
											<line x1="12" y1="5" x2="12" y2="19"></line>
											<line x1="5" y1="12" x2="19" y2="12"></line>
										</svg>
									</div>
								</div>
							</div>
							<div class="px-6">
								<div class="flex justify-end">
									<p class="text-scale-1000 mb-2 mt-0 block text-sm">
										We will contact you at will.marzella@tray.io.
									</p>
								</div>
								<div class="flex justify-end">
									<button
										class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-3 py-2 text-center text-sm leading-4 text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										type="submit"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
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
										><span class="truncate">Send support request</span>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
