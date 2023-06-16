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
				.select('*,Account(id,name)')
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

	const completeOnboarding = async () => {
		try {
			const { data, error } = await supabase
				.from('User')
				.update({ hasCompletedOnboarding: true })
				.eq('id', user.value.id);

			if (error) {
				throw new Error(error.message);
			}

			is_success.value = true;
			success_message.value = 'Onboarding complete!';
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
		}
	};
</script>

<template>
	<main class="flex-1 overflow-y-auto" style="max-height: 100vh">
		<div class="mx-auto my-16 w-full max-w-7xl space-y-16">
			<div class="mx-6 flex items-center space-x-6">
				<h1 class="text-3xl">{{ account.Account.name }}</h1>
			</div>
			<div class="mx-6"></div>
			<div class="mx-6">
				<div class="grid grid-cols-12 gap-4 lg:gap-20">
					<div class="col-span-12">
						<div class="flex flex-col space-y-20">
							<div class="flex h-full flex-col justify-between">
								<div class="space-y-2">
									<h3 class="text-scale-1200 text-xl">
										Welcome to your new organization
									</h3>
									<p class="text-scale-1100 text-base">
										Your project has been deployed on its own instance, with its
										own API all set up and ready to use.
									</p>
								</div>
							</div>
							<div class="grid grid-cols-12 gap-4">
								<div
									class="col-span-12 flex flex-col justify-center space-y-8 lg:col-span-7"
								>
									<div class="space-y-2">
										<h3 class="text-scale-1200 text-xl">
											Get started by submitting a project
										</h3>
										<p class="text-scale-1100 text-base">
											Start your project by creating a ticket and inserting
											information. Our AI assistants make collecting information
											a breeze, but there's also your personal Slack channel if
											you need something more.
										</p>
									</div>
									<div class="flex flex-wrap items-center gap-2">
										<NuxtLink :to="`/dashboard/new/${account.Account.id}`"
											><button
												@click="completeOnboarding"
												class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
												<svg
													class="text-color-inherit mr-auto h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M19.25 6.75C19.25 6.19772 18.8023 5.75 18.25 5.75H5.75C5.19772 5.75 4.75 6.19771 4.75 6.75V8.04566C4.75 8.50939 5.07835 8.89813 5.49029 9.11107C6.53552 9.65136 7.25 10.7422 7.25 12C7.25 13.2578 6.53552 14.3486 5.49029 14.8889C5.07835 15.1019 4.75 15.4906 4.75 15.9543V17.25C4.75 17.8023 5.19771 18.25 5.75 18.25H18.25C18.8023 18.25 19.25 17.8023 19.25 17.25V15.9543C19.25 15.4906 18.9216 15.1019 18.5097 14.8889C17.4645 14.3486 16.75 13.2578 16.75 12C16.75 10.7422 17.4645 9.65136 18.5097 9.11107C18.9216 8.89813 19.25 8.50939 19.25 8.04566V6.75Z"
													></path>
												</svg>
												<span class="truncate">Project creator</span>
											</button></NuxtLink
										><a href="/dashboard/project/ywpgafmqbdrqaavwrwab/sql"
											><button
												class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
												<svg
													class="h-5 w-5"
													xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink"
													x="0px"
													y="0px"
													viewBox="0 0 270 270"
													xml:space="preserve"
												>
													<g>
														<g>
															<path
																class="st0"
																d="M99.4,151.2c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9h12.9V151.2z"
															/>
															<path
																class="st0"
																d="M105.9,151.2c0-7.1,5.8-12.9,12.9-12.9s12.9,5.8,12.9,12.9v32.3c0,7.1-5.8,12.9-12.9,12.9
			s-12.9-5.8-12.9-12.9V151.2z"
															/>
														</g>
														<g>
															<path
																class="st1"
																d="M118.8,99.4c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9s12.9,5.8,12.9,12.9v12.9H118.8z"
															/>
															<path
																class="st1"
																d="M118.8,105.9c7.1,0,12.9,5.8,12.9,12.9s-5.8,12.9-12.9,12.9H86.5c-7.1,0-12.9-5.8-12.9-12.9
			s5.8-12.9,12.9-12.9H118.8z"
															/>
														</g>
														<g>
															<path
																class="st2"
																d="M170.6,118.8c0-7.1,5.8-12.9,12.9-12.9c7.1,0,12.9,5.8,12.9,12.9s-5.8,12.9-12.9,12.9h-12.9V118.8z"
															/>
															<path
																class="st2"
																d="M164.1,118.8c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9V86.5c0-7.1,5.8-12.9,12.9-12.9
			c7.1,0,12.9,5.8,12.9,12.9V118.8z"
															/>
														</g>
														<g>
															<path
																class="st3"
																d="M151.2,170.6c7.1,0,12.9,5.8,12.9,12.9c0,7.1-5.8,12.9-12.9,12.9c-7.1,0-12.9-5.8-12.9-12.9v-12.9H151.2z"
															/>
															<path
																class="st3"
																d="M151.2,164.1c-7.1,0-12.9-5.8-12.9-12.9c0-7.1,5.8-12.9,12.9-12.9h32.3c7.1,0,12.9,5.8,12.9,12.9
			c0,7.1-5.8,12.9-12.9,12.9H151.2z"
															/>
														</g>
													</g></svg
												><span class="truncate">Slack Channel</span>
											</button></a
										><a
											target="_blank"
											rel="noreferrer"
											href="https://supabase.com/docs/guides/database"
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
													<line x1="10" y1="14" x2="21" y2="3"></line></svg
												><span class="truncate">About Database</span>
											</button></a
										>
									</div>
								</div>
								<div class="col-span-12 lg:col-span-5">
									<div
										class="pointer-events-none relative h-full w-full"
										v-if="false"
									>
										<div
											class="bg-scale-100 border-scale-500 h-[180px] w-[290px] space-y-1 overflow-hidden rounded-t border px-4 py-3 lg:w-[400px]"
										>
											<div
												class="flex items-center space-x-4 font-mono text-xs"
											>
												<span class="text-scale-1000">1</span>
												<p class="text-blue-900">
													create table
													<span class="text-scale-1200">countries (</span>
												</p>
											</div>
											<div
												class="flex items-center space-x-8 font-mono text-xs"
											>
												<span class="text-scale-1000">2</span>
												<p class="text-scale-1200">
													id
													<span class="text-blue-900"
														>bigint generated by default</span
													>
												</p>
											</div>
											<div
												class="flex items-center space-x-8 font-mono text-xs"
											>
												<span class="text-scale-1000">3</span>
												<p class="text-scale-1200">
													name <span class="text-blue-900">text</span>
												</p>
											</div>
											<div
												class="flex items-center space-x-8 font-mono text-xs"
											>
												<span class="text-scale-1000">4</span>
												<p class="text-scale-1200">
													iso2 <span class="text-blue-900">text not null</span>
												</p>
											</div>
											<div
												class="flex items-center space-x-8 font-mono text-xs"
											>
												<span class="text-scale-1000">5</span>
												<p class="text-scale-1200">
													iso3 <span class="text-blue-900">text</span>
												</p>
											</div>
											<div
												class="flex items-center space-x-8 font-mono text-xs"
											>
												<span class="text-scale-1000">6</span>
												<p class="text-scale-1200">
													local_name <span class="text-blue-900">text</span>
												</p>
											</div>
											<div
												class="flex items-center space-x-8 font-mono text-xs"
											>
												<span class="text-scale-1000">7</span>
												<p class="text-scale-1200">
													continent
													<span class="text-blue-900">continents</span>
												</p>
											</div>
											<div
												class="flex items-center space-x-4 font-mono text-xs"
											>
												<span class="text-scale-1000">8</span>
												<p class="text-blue-900">);</p>
											</div>
										</div>
										<div
											class="bg-scale-300 border-scale-500 absolute right-0 top-[50px] h-[160px] w-[260px] overflow-y-hidden rounded-t border lg:-top-[40px] lg:h-[220px] lg:w-[320px]"
										>
											<div
												class="border-scale-500 flex h-[24px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">id</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">name</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">iso2</p>
												</div>
											</div>
											<div
												class="bg-scale-200 border-scale-500 flex h-[30px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">1</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">Angola</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">AO</p>
												</div>
											</div>
											<div
												class="bg-scale-200 border-scale-500 flex h-[30px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">2</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">Timor-Leste</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">TL</p>
												</div>
											</div>
											<div
												class="bg-scale-200 border-scale-500 flex h-[30px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">3</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">Serbia</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">RS</p>
												</div>
											</div>
											<div
												class="bg-scale-200 border-scale-500 flex h-[30px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">4</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">Bahamas</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">BS</p>
												</div>
											</div>
											<div
												class="bg-scale-200 border-scale-500 flex h-[30px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">5</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">Chile</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">CL</p>
												</div>
											</div>
											<div
												class="bg-scale-200 border-scale-500 flex h-[30px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">6</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">Denmark</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">DK</p>
												</div>
											</div>
											<div
												class="bg-scale-200 border-scale-500 flex h-[30px] items-center border-b"
											>
												<div
													class="border-scale-500 flex h-full w-[10%] items-center border-r px-2"
												>
													<div
														class="border-scale-600 h-3 w-3 rounded border"
													></div>
												</div>
												<div
													class="border-scale-500 flex h-full w-[20%] items-center border-r px-2"
												>
													<p class="text-xs">7</p>
												</div>
												<div
													class="border-scale-500 flex h-full w-[40%] items-center border-r px-2"
												>
													<p class="text-xs">Singapore</p>
												</div>
												<div class="flex h-full w-[30%] items-center px-2">
													<p class="text-xs">SG</p>
												</div>
											</div>
										</div>
									</div>
									<div class="pointer-events-none relative h-full w-full">
										<img
											src="https://canvasapp.com/_next/image?url=%2Ftemporary%2Fillustrations%2Fslack.png&w=828&q=75"
											alt=""
										/>
									</div>
								</div>
							</div>
							<div
								class="flex h-full flex-col justify-between space-y-6"
								v-if="false"
							>
								<div class="max-w-2xl space-y-2">
									<h3 class="text-scale-1200 text-xl">
										Explore our other products
									</h3>
									<p class="text-scale-1100 text-base">
										Supabase provides all the backend features you need to build
										a product. You can use it completely, or just the features
										you need.
									</p>
								</div>
								<div
									class="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:gap-y-0 xl:grid-cols-4"
								>
									<div class="relative">
										<div class="transition-opacity duration-300">
											<div
												class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
											>
												<div
													class="bg-panel-body-light dark:bg-panel-body-dark"
												>
													<div
														class="flex flex-col space-y-4 px-6 py-4 md:px-3"
													>
														<div class="flex items-center space-x-3">
															<div
																class="bg-scale-600 text-scale-1000 rounded p-1.5 shadow-sm"
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
																	class="sbui-icon"
																>
																	<path
																		d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
																	></path>
																</svg>
															</div>
															<h5>Authentication</h5>
														</div>
														<div
															class="flex flex-grow md:min-h-[50px] xl:min-h-[75px]"
														>
															<p class="text-scale-1000 text-sm">
																A complete user management system that works
																without any additional tools.
															</p>
														</div>
														<div class="flex items-center space-x-2">
															<a
																href="/dashboard/project/ywpgafmqbdrqaavwrwab/auth/users"
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																	type="button"
																>
																	<span class="truncate">Explore Auth</span>
																</button></a
															><a
																target="_blank"
																rel="noreferrer"
																href="https://supabase.com/docs/guides/auth"
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex translate-y-[1px] cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
																		<polyline
																			points="15 3 21 3 21 9"
																		></polyline>
																		<line
																			x1="10"
																			y1="14"
																			x2="21"
																			y2="3"
																		></line></svg
																	><span class="truncate">About Auth</span>
																</button></a
															>
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
													class="bg-panel-body-light dark:bg-panel-body-dark"
												>
													<div
														class="flex flex-col space-y-4 px-6 py-4 md:px-3"
													>
														<div class="flex items-center space-x-3">
															<div
																class="bg-scale-600 text-scale-1000 rounded p-1.5 shadow-sm"
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
																	class="sbui-icon"
																>
																	<polyline
																		points="21 8 21 21 3 21 3 8"
																	></polyline>
																	<rect
																		x="1"
																		y="3"
																		width="22"
																		height="5"
																	></rect>
																	<line x1="10" y1="12" x2="14" y2="12"></line>
																</svg>
															</div>
															<h5>Storage</h5>
														</div>
														<div class="flex md:min-h-[50px] xl:min-h-[75px]">
															<p class="text-scale-1000 text-sm">
																Store, organize, and serve any file types of any
																size from multiple buckets.
															</p>
														</div>
														<div class="flex items-center space-x-2">
															<a
																href="/dashboard/project/ywpgafmqbdrqaavwrwab/storage/buckets"
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																	type="button"
																>
																	<span class="truncate">Explore Storage</span>
																</button></a
															><a
																target="_blank"
																rel="noreferrer"
																href="https://supabase.com/docs/guides/storage"
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex translate-y-[1px] cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
																		<polyline
																			points="15 3 21 3 21 9"
																		></polyline>
																		<line
																			x1="10"
																			y1="14"
																			x2="21"
																			y2="3"
																		></line></svg
																	><span class="truncate">About Storage</span>
																</button></a
															>
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
													class="bg-panel-body-light dark:bg-panel-body-dark"
												>
													<div
														class="flex flex-col space-y-4 px-6 py-4 md:px-3"
													>
														<div class="flex items-center space-x-3">
															<div
																class="bg-scale-600 text-scale-1000 rounded p-1.5 shadow-sm"
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
																	class="sbui-icon"
																>
																	<polyline
																		points="16 18 22 12 16 6"
																	></polyline>
																	<polyline points="8 6 2 12 8 18"></polyline>
																</svg>
															</div>
															<h5>Edge Functions</h5>
														</div>
														<div class="flex md:min-h-[50px] xl:min-h-[75px]">
															<p class="text-scale-1000 text-sm">
																Write custom code without deploying or scaling
																servers, with fast deploy times and low latency.
															</p>
														</div>
														<div class="flex items-center space-x-2">
															<a
																href="/dashboard/project/ywpgafmqbdrqaavwrwab/functions"
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																	type="button"
																>
																	<span class="truncate"
																		>Explore Functions</span
																	>
																</button></a
															><a
																target="_blank"
																rel="noreferrer"
																href="https://supabase.com/docs/guides/functions"
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex translate-y-[1px] cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
																		<polyline
																			points="15 3 21 3 21 9"
																		></polyline>
																		<line
																			x1="10"
																			y1="14"
																			x2="21"
																			y2="3"
																		></line></svg
																	><span class="truncate">About Functions</span>
																</button></a
															>
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
													class="bg-panel-body-light dark:bg-panel-body-dark"
												>
													<div
														class="flex flex-col space-y-4 px-6 py-4 md:px-3"
													>
														<div class="flex items-center space-x-4">
															<div
																class="bg-scale-600 text-scale-1000 rounded p-1.5 shadow-sm"
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
																	class="sbui-icon"
																>
																	<polyline
																		points="22 12 18 12 15 21 9 3 6 12 2 12"
																	></polyline>
																</svg>
															</div>
															<h5>Realtime</h5>
														</div>
														<div class="flex md:min-h-[50px] xl:min-h-[75px]">
															<p class="text-scale-1000 text-sm">
																Listen to your PostgreSQL database in realtime
																via websockets.
															</p>
														</div>
														<div class="flex items-center space-x-2">
															<a
																target="_blank"
																rel="noreferrer"
																href="https://supabase.com/docs/guides/realtime"
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex translate-y-[1px] cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
																		<polyline
																			points="15 3 21 3 21 9"
																		></polyline>
																		<line
																			x1="10"
																			y1="14"
																			x2="21"
																			y2="3"
																		></line></svg
																	><span class="truncate">About Realtime</span>
																</button></a
															>
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
					<div class="col-span-12 lg:col-span-4" v-if="false">
						<div class="space-y-6">
							<div class="space-y-2">
								<h3 class="text-scale-1200 text-xl">
									Connecting to your new project
								</h3>
								<p class="text-scale-1100 text-base lg:max-w-sm">
									Interact with your database through the
									<a
										class="text-brand-900"
										href="https://supabase.com/docs/reference"
										>Supabase client libraries</a
									>
									with your API keys.
								</p>
								<p class="text-scale-1100 text-base lg:max-w-sm">
									More information about your project's keys can be found in
									your project's API settings.
								</p>
							</div>
							<div class="flex items-center space-x-2">
								<a href="/dashboard/project/ywpgafmqbdrqaavwrwab/settings/api"
									><button
										class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										type="button"
									>
										<span class="truncate">View API settings</span>
									</button></a
								><a
									target="_blank"
									rel="noreferrer"
									href="https://supabase.com/docs/guides/database/api"
									><button
										class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex translate-y-[1px] cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
											<line x1="10" y1="14" x2="21" y2="3"></line></svg
										><span class="truncate">About APIs</span>
									</button></a
								>
							</div>
						</div>
					</div>
					<div class="col-span-12 lg:col-span-8" v-if="false">
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
												<h5 class="text-base">Project API</h5>
												<p class="text-scale-1000 text-sm">
													Your API is secured behind an API gateway which
													requires an API Key for every request.<br />You can
													use the parameters below to use Supabase client
													libraries.
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
														>Project URL</label
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
																value="https://ywpgafmqbdrqaavwrwab.supabase.co"
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
														><div class="space-y-2">
															<p class="text-sm">API Key</p>
															<div class="-ml-1 flex items-center space-x-1">
																<code class="text-xs">anon</code
																><code class="text-xs">public</code>
															</div>
														</div></label
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
																value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3cGdhZm1xYmRycWFhdndyd2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzODQwMTYsImV4cCI6MjAwMTk2MDAxNn0.pGva6sFZJhAMlJ1462vbC2xTd3H3Ub_-Edn9_XX5C4g"
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
														enabled Row Level Security (RLS) for your tables and
														configured policies. You may also use the service
														key which can be found
														<a
															class="text-brand-800 hover:text-brand-900 transition"
															href="/dashboard/project/ywpgafmqbdrqaavwrwab/settings/api"
															>here</a
														>
														to bypass RLS.
													</p>
												</div>
											</div>
										</div>
										<div
											class="border-panel-border-interior-light dark:border-panel-border-interior-dark border-t"
										>
											<div class="bg-scale-200 flex items-center">
												<div
													class="bg-scale-300 cursor-pointer px-3 py-1 text-sm transition"
												>
													Javascript
												</div>
												<div
													class="bg-scale-200 text-scale-1000 cursor-pointer px-3 py-1 text-sm transition"
												>
													Dart
												</div>
											</div>
											<div class="bg-scale-300 min-h-[200px] px-4 py-6">
												<div class="Code codeBlockWrapper group">
													<pre
														class="codeBlock prism-code language-js"
													><div class="token-line" style="color: rgb(191, 199, 213);"><span class="token keyword module" style="font-style: italic;">import</span><span class="token plain"> </span><span class="token imports punctuation" style="color: rgb(199, 146, 234);">{</span><span class="token imports"> createClient </span><span class="token imports punctuation" style="color: rgb(199, 146, 234);">}</span><span class="token plain"> </span><span class="token keyword module" style="font-style: italic;">from</span><span class="token plain"> </span><span class="token string" style="color: rgb(195, 232, 141);">'@supabase/supabase-js'</span><span class="token plain"></span></div><div class="token-line" style="color: rgb(191, 199, 213);"><span class="token plain" style="display: inline-block;">
</span></div><div class="token-line" style="color: rgb(191, 199, 213);"><span class="token plain"></span><span class="token keyword" style="font-style: italic;">const</span><span class="token plain"> supabaseUrl </span><span class="token operator" style="color: rgb(137, 221, 255);">=</span><span class="token plain"> </span><span class="token string" style="color: rgb(195, 232, 141);">'https://ywpgafmqbdrqaavwrwab.supabase.co'</span><span class="token plain"></span></div><div class="token-line" style="color: rgb(191, 199, 213);"><span class="token plain"></span><span class="token keyword" style="font-style: italic;">const</span><span class="token plain"> supabaseKey </span><span class="token operator" style="color: rgb(137, 221, 255);">=</span><span class="token plain"> process</span><span class="token punctuation" style="color: rgb(199, 146, 234);">.</span><span class="token property-access">env</span><span class="token punctuation" style="color: rgb(199, 146, 234);">.</span><span class="token constant" style="color: rgb(130, 170, 255);">SUPABASE_KEY</span><span class="token plain"></span></div><div class="token-line" style="color: rgb(191, 199, 213);"><span class="token plain"></span><span class="token keyword" style="font-style: italic;">const</span><span class="token plain"> supabase </span><span class="token operator" style="color: rgb(137, 221, 255);">=</span><span class="token plain"> </span><span class="token function" style="color: rgb(130, 170, 255);">createClient</span><span class="token punctuation" style="color: rgb(199, 146, 234);">(</span><span class="token plain">supabaseUrl</span><span class="token punctuation" style="color: rgb(199, 146, 234);">,</span><span class="token plain"> supabaseKey</span><span class="token punctuation" style="color: rgb(199, 146, 234);">)</span></div></pre>
													<div
														class="invisible absolute right-0 top-0 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100"
													>
														<button
															class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
															type="button"
														>
															<span class="truncate">Copy</span>
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
