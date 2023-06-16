<script setup>
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const loading = ref(true);
	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');
	const account = ref({ type: 'client' });

	const getData = async () => {
		try {
			const { data, error } = await supabase
				.from('User')
				.select('*,Account(name)')
				.eq('id', user.value.id)
				.limit(1)
				.single();

			account.value = data;

			if (error) {
				throw new Error(error.message);
			}
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
		} finally {
			loading.value = false;
		}
	};

	await getData();
</script>

<template>
	<div class="mx-auto my-16 w-full max-w-6xl items-center justify-center">
		<div class="mx-6 flex flex-col space-y-16">
			<div class="flex flex-col gap-4">
				<div class="flex items-center space-x-3">
					<h1 class="text-scale-1200 text-3xl">{{ account.Account.name }}</h1>
					<span
						class="bg-brand-200 text-brand-1100 border-brand-700 inline-flex items-center rounded-full border bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
						><div class="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="sbui-icon animate-spin"
							>
								<line x1="12" y1="2" x2="12" y2="6"></line>
								<line x1="12" y1="18" x2="12" y2="22"></line>
								<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
								<line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
								<line x1="2" y1="12" x2="6" y2="12"></line>
								<line x1="18" y1="12" x2="22" y2="12"></line>
								<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
								<line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg
							><span>Setting up project</span>
						</div></span
					>
				</div>
				<div>
					<p class="text-scale-1100 text-sm">
						We are provisioning your database and API endpoints
					</p>
					<p class="text-scale-1100 text-sm">This may take a few minutes</p>
				</div>
			</div>
			<div>
				<div class="grid grid-cols-12 gap-12">
					<div class="col-span-12 space-y-12 lg:col-span-4">
						<div>
							<h4 class="text-scale-1200 text-base">While you wait</h4>
							<li class="my-3 flex flex-wrap space-x-3">
								<div class="mt-0.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon text-scale-900"
									>
										<line x1="5" y1="12" x2="19" y2="12"></line>
										<polyline points="12 5 19 12 12 19"></polyline>
									</svg>
								</div>
								<div class="flex-1">
									<p class="text-scale-1100 text-sm">
										Browse the Supabase
										<a
											class="text-brand-900 hover:text-brand-1200 mb-0 transition-colors"
											target="_blank"
											rel="noreferrer"
											href="https://supabase.com/docs"
											>documentation</a
										>.
									</p>
								</div>
							</li>
						</div>
						<div>
							<h4 class="text-scale-1200 text-base">Not working?</h4>
							<li class="my-3 flex flex-wrap space-x-3">
								<div class="mt-0.5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon text-scale-900"
									>
										<line x1="5" y1="12" x2="19" y2="12"></line>
										<polyline points="12 5 19 12 12 19"></polyline>
									</svg>
								</div>
								<div class="flex-1">
									<p class="text-scale-1100 text-sm">
										Try refreshing after a couple of minutes.
									</p>
								</div>
							</li>
							<ul>
								<li class="my-3 flex flex-wrap space-x-3">
									<div class="mt-0.5">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon text-scale-900"
										>
											<line x1="5" y1="12" x2="19" y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</div>
									<div class="flex-1">
										<p class="text-scale-1100 mb-4 text-sm">
											If your dashboard hasn't connected within 2 minutes, you
											can open a support ticket.
										</p>
										<a href="/dashboard/support/new"
											><button
												class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
												<span class="truncate">Contact support team</span>
											</button></a
										>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-span-12 lg:col-span-8">
						<div class="relative">
							<div class="transition-opacity duration-300">
								<div
									class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
								>
									<div
										class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
									>
										<div class="flex items-center px-6 py-4">
											<div class="space-y-3">
												<h5 class="text-base">Project API keys</h5>
												<p class="text-scale-1000 text-sm">
													Your API is secured behind an API gateway which
													requires an API Key for every request.<br />You can
													use the keys below to use Supabase client libraries.
												</p>
											</div>
										</div>
									</div>
									<div class="bg-panel-body-light dark:bg-panel-body-dark">
										<div class="px-6 py-4">
											<div
												class="input-mono grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														><code class="text-code text-xs">anon</code
														><code class="text-code text-xs"
															>public</code
														></label
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
																value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpeXV6ZWFha2xzdmh1eGp4dWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY4ODgzOTIsImV4cCI6MjAwMjQ2NDM5Mn0.BnoYIaaUEzd0u4Mjyjp-dUQUctwNNLEgwZwzFL-ZHl8"
															/>
															<div
																class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
															>
																<button
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
																		<rect
																			x="9"
																			y="9"
																			width="13"
																			height="13"
																			rx="2"
																			ry="2"
																		></rect>
																		<path
																			d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
																		></path></svg
																	><span class="truncate">Copy</span>
																</button>
															</div>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
													<p
														class="text-scale-900 mt-2 text-sm leading-normal"
														id="-description"
													>
														This key is safe to use in a browser if you have
														enabled Row Level Security for your tables and
														configured policies.
													</p>
												</div>
											</div>
										</div>
										<div
											class="border-panel-border-interior-light dark:border-panel-border-interior-dark border-t px-6 py-4"
										>
											<div
												class="input-mono grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														><code class="text-code text-xs">service_role</code
														><code class="bg-red-900 text-xs text-white"
															>secret</code
														></label
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
																value="**** **** **** ****"
															/>
															<div
																class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
															>
																<button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																	type="button"
																>
																	<span class="truncate">Reveal</span>
																</button>
															</div>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
													<p
														class="text-scale-900 mt-2 text-sm leading-normal"
														id="-description"
													>
														This key has the ability to bypass Row Level
														Security. Never share it publicly.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="relative">
							<div class="transition-opacity duration-300">
								<div
									class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
								>
									<div
										class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
									>
										<div class="flex items-center px-6 py-4">
											<div class="space-y-3">
												<h5 class="text-base">Project Configuration</h5>
											</div>
										</div>
									</div>
									<div class="bg-panel-body-light dark:bg-panel-body-dark">
										<div class="px-6 py-4">
											<div
												class="input-mono grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														>URL</label
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
																value="https://liyuzeaaklsvhuxjxuhn.supabase.co"
															/>
															<div
																class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
															>
																<button
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
																		<rect
																			x="9"
																			y="9"
																			width="13"
																			height="13"
																			rx="2"
																			ry="2"
																		></rect>
																		<path
																			d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
																		></path></svg
																	><span class="truncate">Copy</span>
																</button>
															</div>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
													<p
														class="text-scale-900 mt-2 text-sm leading-normal"
														id="-description"
													>
														A RESTful endpoint for querying and managing your
														database.
													</p>
												</div>
											</div>
										</div>
										<div
											class="border-panel-border-interior-light dark:border-panel-border-interior-dark border-t px-6 py-4"
										>
											<div
												class="input-mono grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														>JWT Secret</label
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
																value="**** **** **** ****"
															/>
															<div
																class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
															>
																<button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																	type="button"
																>
																	<span class="truncate">Reveal</span>
																</button>
															</div>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
													<p
														class="text-scale-900 mt-2 text-sm leading-normal"
														id="-description"
													>
														Used to decode your JWTs. You can also use this to
														mint your own JWTs.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mx-auto my-16 w-full max-w-7xl space-y-16">
			<div class="space-y-8">
				<div class="mx-6"><h5>Client libraries</h5></div>
				<div class="mx-6 mb-12 grid gap-12 md:grid-cols-3">
					<div class="flex items-start space-x-6">
						<img
							src="/dashboard/img/libraries/javascript-icon.svg"
							alt="JavaScript logo"
							width="21"
						/>
						<div class="space-y-4">
							<div>
								<h5 class="text-scale-1200 flex items-center gap-2 text-base">
									JavaScript
								</h5>
								<p class="text-scale-1000 text-sm">
									This library is officially supported
								</p>
							</div>
							<div class="space-x-1">
								<a
									href="https://supabase.com/docs/reference/javascript/installing"
									target="_blank"
									rel="noreferrer"
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
											<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
											<path
												d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
											></path></svg
										><span class="truncate">Docs</span>
									</button></a
								><a
									href="https://github.com/supabase/supabase-js"
									target="_blank"
									rel="noreferrer"
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
												d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
											></path></svg
										><span class="truncate">See GitHub</span>
									</button></a
								>
							</div>
						</div>
					</div>
					<div class="flex items-start space-x-6">
						<img
							src="/dashboard/img/libraries/python-icon.svg"
							alt="Python logo"
							width="21"
						/>
						<div class="space-y-4">
							<div>
								<h5 class="text-scale-1200 flex items-center gap-2 text-base">
									Python
									<span
										class="text-yellow-1100 inline-flex items-center rounded-full border border-yellow-700 bg-yellow-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
										>Public Alpha</span
									>
								</h5>
								<p class="text-scale-1000 text-sm">
									This library is community supported
								</p>
							</div>
							<div class="space-x-1">
								<a
									href="https://supabase.com/docs/reference/python/introduction"
									target="_blank"
									rel="noreferrer"
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
											<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
											<path
												d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
											></path></svg
										><span class="truncate">Docs</span>
									</button></a
								><a
									href="https://github.com/supabase/supabase-py"
									target="_blank"
									rel="noreferrer"
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
												d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
											></path></svg
										><span class="truncate">See GitHub</span>
									</button></a
								>
							</div>
						</div>
					</div>
					<div class="flex items-start space-x-6">
						<img
							src="/dashboard/img/libraries/flutter-icon.svg"
							alt="Flutter logo"
							width="21"
						/>
						<div class="space-y-4">
							<div>
								<h5 class="text-scale-1200 flex items-center gap-2 text-base">
									Flutter
								</h5>
								<p class="text-scale-1000 text-sm">
									This library is officially supported
								</p>
							</div>
							<div class="space-x-1">
								<a
									href="https://supabase.com/docs/reference/dart/installing"
									target="_blank"
									rel="noreferrer"
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
											<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
											<path
												d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
											></path></svg
										><span class="truncate">Docs</span>
									</button></a
								><a
									href="https://github.com/supabase/supabase-flutter"
									target="_blank"
									rel="noreferrer"
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
												d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
											></path></svg
										><span class="truncate">See GitHub</span>
									</button></a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="space-y-8">
				<div class="mx-6"><h5>Example projects</h5></div>
				<div class="mx-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/codingki/react-native-expo-template/tree/master/template-typescript-bottom-tabs-supabase-auth-flow"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/expo-dark-icon.svg"
									alt="Expo logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Expo Starter</h5>
								<p class="text-scale-1000 text-sm">
									Template bottom tabs with auth flow (Typescript)
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/hiro1107/nestjs-supabase-auth"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/nestjs-icon.svg"
									alt="NestJS logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">NestJS example</h5>
								<p class="text-scale-1000 text-sm">
									NestJS example using Supabase Auth
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/supabase/supabase/tree/master/examples/slack-clone/nextjs-slack-clone"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/nextjs-dark-icon.svg"
									alt="NextJS logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Next.js Realtime chat app</h5>
								<p class="text-scale-1000 text-sm">
									Next.js Slack clone app using Supabase realtime subscriptions
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/vercel/nextjs-subscription-payments"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/nextjs-dark-icon.svg"
									alt="NextJS logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Next.js Subscription and Auth</h5>
								<p class="text-scale-1000 text-sm">
									The all-in-one starter kit for high-performance SaaS
									applications.
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/supabase/supabase/tree/master/examples/todo-list/nextjs-todo-list"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/nextjs-dark-icon.svg"
									alt="NextJS logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Next.js todo list app</h5>
								<p class="text-scale-1000 text-sm">NextJS todo list example</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/supabase/examples/tree/main/supabase-js-v1/todo-list/expo-todo-list"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/react-icon.svg"
									alt="React logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">React Native todo list app</h5>
								<p class="text-scale-1000 text-sm">
									React Native Todo List example with Expo
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/shwosner/realtime-chat-supabase-react"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/react-icon.svg"
									alt="React logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">React realtime chat app</h5>
								<p class="text-scale-1000 text-sm">
									Example app of real-time chat using supabase realtime api
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/supabase/examples/tree/main/supabase-js-v1/todo-list/react-todo-list"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/react-icon.svg"
									alt="React logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">React todo List app</h5>
								<p class="text-scale-1000 text-sm">React todo List example</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/joshnuss/supabase-kanban"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/svelte-icon.svg"
									alt="Svelte logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Svelte kanban board</h5>
								<p class="text-scale-1000 text-sm">
									A Trello clone using Supabase as the storage system.
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/supabase/supabase/tree/master/examples/todo-list/sveltejs-todo-list"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/svelte-icon.svg"
									alt="Svelte logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Svelte todo list app</h5>
								<p class="text-scale-1000 text-sm">
									Sveltejs todo with TailwindCSS and Snowpack
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/supabase/examples/tree/main/supabase-js-v1/auth/javascript-auth"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/javascript-icon.svg"
									alt="JavaScript logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Vanilla-js Auth app</h5>
								<p class="text-scale-1000 text-sm">
									Example app of real-time chat using supabase realtime api
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div></a
					><a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/supabase/examples/tree/main/supabase-js-v1/todo-list/vue3-ts-todo-list"
						><div
							class="bg-panel-header-light hover:bg-panel-border-light dark:bg-panel-header-dark dark:hover:bg-panel-border-dark border-panel-border-light hover:border-panel-border-hover-light dark:border-panel-border-dark dark:hover:border-panel-border-hover-dark group relative flex h-32 flex-row rounded-md border p-4 transition duration-150 ease-in-out hover:border-gray-300"
						>
							<div class="mr-4 flex flex-col">
								<img
									class="transition-all group-hover:scale-110"
									src="/dashboard/img/libraries/vuejs-icon.svg"
									alt="VueJS logo"
									width="26"
									height="26"
								/>
							</div>
							<div class="w-4/5 space-y-2">
								<h5 class="text-scale-1200">Vue.js todo list app</h5>
								<p class="text-scale-1000 text-sm">
									Vue.js todo app using TypeScript
								</p>
							</div>
							<div
								class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-3 transition-all duration-200 group-hover:right-3"
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
									<polyline points="9 18 15 12 9 6"></polyline>
								</svg>
							</div></div
					></a>
				</div>
			</div>
		</div>
	</div>
</template>
