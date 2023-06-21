<script setup>
	definePageMeta({ layout: 'client-settings', middleware: ['auth'] });

	const supabase = useSupabaseClient();

	const route = useRoute();

	const client = ref({ name: '', tray_workspace_id: '' });

	const getData = async () => {
		const { data: accountData, error: userError } = await supabase
			.from('clients')
			.select(`id, name, tray_workspace_id`)
			.eq('id', route.params.client_id)
			.limit(1)
			.single();

		client.value = accountData;
	};

	await getData();
</script>

<template>
	<main class="max-h-screen flex-1 overflow-y-auto">
		<div
			class="mx-auto flex flex-col gap-10 px-5 py-6 lg:px-16 xl:px-24 2xl:px-32"
		>
			<form id="project-general-settings">
				<div class="mb-6">
					<h3 class="text-scale-1200 mb-2 text-xl">Client Settings</h3>
				</div>
				<div
					class="bg-scale-100 dark:bg-scale-300 border-scale-400 overflow-hidden rounded-md border shadow"
				>
					<div class="divide-scale-400 flex flex-col gap-0 divide-y">
						<div
							class="undefined block grid grid-cols-12 gap-6 px-8 py-8 opacity-100"
						>
							<label class="text-scale-1200 col-span-12 text-sm lg:col-span-5"
								>General settings</label
							>
							<div
								class="undefined undefined relative col-span-12 flex flex-col gap-6 lg:col-span-7"
							>
								<div
									class="grid gap-2 text-sm leading-4 md:grid md:grid-cols-12"
								>
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label
											class="text-scale-1100 block text-sm leading-4"
											for="name"
											>Client name</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													id="name"
													name=""
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													v-model="client.name"
												/>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
										></p>
									</div>
								</div>
								<div
									class="grid gap-2 text-sm leading-4 md:grid md:grid-cols-12"
								>
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label
											class="text-scale-1100 block text-sm leading-4"
											for="ref"
											>Tray Workspace ID</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													disabled=""
													id="ref"
													name=""
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 text-sm leading-4 opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													v-model="client.tray_workspace_id"
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
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
										></p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="border-scale-400 border-t"></div>
					<div class="flex px-8 py-4">
						<div class="flex w-full items-center justify-end gap-2">
							<div class="flex items-center gap-2">
								<button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									disabled=""
									type="reset"
								>
									<span class="truncate">Cancel</span></button
								><button
									form="project-general-settings"
									class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									disabled=""
									type="submit"
								>
									<span class="truncate">Save</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div>
				<div class="mb-6">
					<h3 class="text-scale-1200 mb-2 text-xl">Infrastructure</h3>
				</div>
				<div
					class="bg-scale-100 dark:bg-scale-300 border-scale-400 overflow-hidden rounded-md border shadow"
				>
					<div class="divide-scale-400 flex flex-col gap-0 divide-y">
						<div
							class="undefined block grid grid-cols-12 gap-6 px-8 py-8 opacity-100"
						>
							<label class="text-scale-1200 col-span-12 text-sm lg:col-span-5"
								>Configuration</label
							>
							<div
								class="undefined undefined relative col-span-12 flex flex-col gap-6 lg:col-span-7"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for=""
											>Cloud provider</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													disabled=""
													id=""
													name=""
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													readonly=""
													value="AWS"
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
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for=""
											>Region</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													disabled=""
													id=""
													name=""
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													readonly=""
													value="us-east-1"
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
						<div
							class="undefined block grid grid-cols-12 gap-6 px-8 py-8 opacity-100"
						>
							<label class="text-scale-1200 col-span-12 text-sm lg:col-span-5"
								>Postgres</label
							>
							<div
								class="undefined undefined relative col-span-12 flex flex-col gap-6 lg:col-span-7"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for=""
											>Current version</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													disabled=""
													id=""
													name=""
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													readonly=""
													value="15.1.0.33"
												/>
												<div
													class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
												></div>
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
					<div class="border-scale-400 border-t"></div>
					<div class="flex w-full items-center justify-between px-8 py-4">
						<div>
							<p class="text-sm">Restart server</p>
							<div class="max-w-[420px]">
								<p class="text-scale-1100 text-sm">
									Your project will not be available for a few minutes.
								</p>
							</div>
						</div>
						<div data-state="closed">
							<div class="flex items-center">
								<button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded rounded-r-none px-2.5 px-3 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<span class="truncate">Restart project</span></button
								><button
									type="button"
									id="radix-2547"
									aria-haspopup="menu"
									aria-expanded="false"
									data-state="closed"
									class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
								>
									<div
										class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded rounded-l-none px-2.5 px-[4px] py-1 py-[5px] text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
											<polyline points="6 9 12 15 18 9"></polyline>
										</svg>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="mb-6">
					<h3 class="text-scale-1200 mb-2 text-xl">Custom Domains</h3>
					<div class="text-scale-900 text-sm">
						<p>Present a branded experience to your users</p>
					</div>
				</div>
				<div
					class="block w-full rounded border border-gray-600 border-opacity-20 bg-gray-100 px-6 py-4 dark:border-gray-300 dark:bg-gray-400"
				>
					<div class="flex space-x-3">
						<div class="mt-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="sbui-icon"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="12" y1="8" x2="12" y2="12"></line>
								<line x1="12" y1="16" x2="12.01" y2="16"></line>
							</svg>
						</div>
						<div class="flex w-full items-center justify-between space-x-32">
							<div class="space-y-1">
								<p class="text-sm">Custom domains are a Pro plan add-on</p>
								<div>
									<p class="text-scale-1100 text-sm">
										To configure a custom domain for your project, please enable
										the add-on
									</p>
								</div>
							</div>
							<button data-state="closed">
								<button
									class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<span class="truncate"
										><a
											href="/project/nsfipxnlucvgchlkqvqw/settings/billing/update"
											>Modify subscription</a
										></span
									>
								</button>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="mb-6">
					<h3 class="text-scale-1200 mb-2 text-xl">Delete Project</h3>
				</div>
				<div class="relative">
					<div class="transition-opacity duration-300">
						<div
							class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
						>
							<div class="bg-panel-body-light dark:bg-panel-body-dark">
								<div class="px-6 py-4">
									<div
										class="btext-red-1200 relative flex items-start space-x-4 rounded-md border border-red-700 bg-red-200 px-6 py-4 dark:bg-red-100"
									>
										<div class="text-red-900">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="18"
												height="18"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon"
											>
												<polygon
													points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
												></polygon>
												<line x1="12" y1="8" x2="12" y2="12"></line>
												<line x1="12" y1="16" x2="12.01" y2="16"></line>
											</svg>
										</div>
										<div class="flex flex-1 items-center justify-between">
											<div>
												<h3
													class="text-red-1200 mb-1 block text-sm font-normal"
												>
													Deleting this project will also remove your database.
												</h3>
												<div class="text-red-1100 text-xs">
													<div>
														<p class="mb-4 block">
															Make sure you have made a backup if you want to
															keep your data.
														</p>
														<button data-state="closed">
															<button
																class="font-regular text-red-1100 bordershadow-red-700 hover:bordershadow-red-900 hover:text-lo-contrast relative inline-flex cursor-pointer items-center space-x-2 rounded bg-red-200 px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-red-900 focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-red-700"
																type="button"
															>
																<span class="truncate">Delete project</span>
															</button>
														</button>
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
		</div>
	</main>
</template>
