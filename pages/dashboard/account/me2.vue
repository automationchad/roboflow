<template>
	<div class="flex-1 flex-grow overflow-auto">
		<div class="my-2">
			<article class="max-w-4xl p-4">
				<section>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div
									class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
								>
									<div class="flex items-center px-6 py-4">
										<h5 class="mb-0">Account Information</h5>
									</div>
								</div>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div class="px-6 py-4">
										<div class="space-y-2">
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														>Username</label
													>
												</div>
												<div class="col-span-8">
													<div class="">
														<div class="relative">
															<input
																disabled=""
																id=""
																name=""
																type="text"
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																readonly=""
																value="automationchad"
															/>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
												</div>
											</div>
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														>Email</label
													>
												</div>
												<div class="col-span-8">
													<div class="">
														<div class="relative">
															<input
																disabled=""
																id=""
																name=""
																type="text"
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																readonly=""
																value="will.marzella@tray.io"
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
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<section class="section-block mb-8">
						<div
							class="border-panel-border-light bg-panel-header-light dark:border-panel-border-dark dark:bg-panel-header-dark flex h-12 items-center overflow-hidden border-b px-6"
						>
							<div class="flex-1 text-left"><h6>Profile</h6></div>
							<div
								class="flex cursor-default opacity-0 transition duration-150"
							>
								<button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									disabled=""
									type="button"
								>
									<span class="truncate">Cancel</span></button
								><button
									class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 pointer-events-none relative ml-2 inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:border-green-500 focus-visible:outline-4 focus-visible:outline-offset-1"
									disabled=""
									type="button"
								>
									<span class="truncate">Save</span>
								</button>
							</div>
							<span class="text-scale-900 text-sm"></span>
						</div>
						<div class="Form section-block--body px-6 py-3">
							<form novalidate="" class="form">
								<div class="form-group">
									<label for="uniforms-0002-0000" class="">First name</label
									><input
										class="form-control"
										id="uniforms-0002-0000"
										name="first_name"
										placeholder=""
										type="text"
										value=""
									/>
									<div
										data-lastpass-icon-root="true"
										style="
											position: relative !important;
											height: 0px !important;
											width: 0px !important;
											float: left !important;
										"
									></div>
								</div>
								<div class="form-group">
									<label for="uniforms-0002-0001" class="">Last name</label
									><input
										class="form-control"
										id="uniforms-0002-0001"
										name="last_name"
										placeholder=""
										type="text"
										value=""
									/>
								</div>
							</form>
						</div>
					</section>
				</section>
				<section>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div
									class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
								>
									<div class="flex items-center px-6 py-4"><h5>Theme</h5></div>
								</div>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div class="px-6 py-4">
										<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
											<div class="col-span-4 flex flex-col space-y-2">
												<label class="text-scale-1100 block text-sm" for=""
													>Interface theme</label
												>
											</div>
											<div class="col-span-8" style="width: 50%">
												<div class="">
													<button
														class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 pl-10 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
														name=""
														id=""
														type="button"
														aria-haspopup="menu"
														aria-expanded="false"
														data-state="closed"
													>
														<span
															class="flex w-full flex-row items-center space-x-3"
															><div
																class="text-scale-1100 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="21"
																	height="21"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon"
																>
																	<path
																		d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
																	></path>
																</svg>
															</div>
															<span class="truncate">Dark</span></span
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
												<p
													class="text-scale-900 mt-2 text-sm leading-normal"
													id="-description"
												>
													Choose a theme preference
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</article>
		</div>
	</div>
</template>

<script setup>


definePageMeta({ layout: 'settings', middleware: ['auth'] })
</script>
