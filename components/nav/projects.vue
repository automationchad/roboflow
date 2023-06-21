<script setup>
	import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/vue';
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const route = useRoute();

	const projects = ref(null);

	const loading = ref(true);

	const refresh = ref(false);

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');

	const showProjectModal = ref(false);

	const user_data = ref({});

	const getData = async () => {
		try {
			const { data: projectData, error: projectError } = await supabase
				.from('projects')
				.select('*')
				.eq('client_id', route.params.client_id);
			if (projectError) throw new Error(projectError.message);
			projects.value = projectData;
			loading.value = false;
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
			console.log(error);
		}
	};

	getData();

	const handleRefresh = async () => {
		refresh.value = true;
		await getData();
		setTimeout(() => {
			refresh.value = false;
		}, 1000);
	};
</script>

<template>
	<div
		class="hide-scrollbar bg-scale-200 dark:border-dark border-scale-500 z-[200] flex w-64 flex-col border-r"
		style="height: 100vh; max-height: 100vh"
	>
		<div
			class="dark:border-dark border-scale-500 flex max-h-12 items-center border-b px-6"
			style="min-height: 3rem"
		>
			<h4 class="text-lg">Project editor</h4>
		</div>
		<div class="flex-grow overflow-y-auto">
			<div
				class="flex h-full flex-grow flex-col space-y-6 pt-6"
				style="max-height: calc(100vh - 48px)"
			>
				<div class="mx-4 space-y-1">
					<div class="px-3">
						<button data-state="closed" class="w-full">
							<span
								class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								style="justify-content: start"
								><div class="text-scale-900">
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
											d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
										></path>
										<path
											d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
										></path>
									</svg>
								</div>
								<span class="truncate">New project</span></span
							>
						</button>
					</div>
					<div class="mb-2 block px-3">
						<div
							class="table-editor-search grid gap-2 border-none text-xs md:grid md:grid-cols-12"
						>
							<div class="col-span-12">
								<div class="">
									<div class="relative">
										<input
											id=""
											name=""
											placeholder="Search projects"
											type="text"
											class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-2.5 py-1 pl-10 text-xs shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
											value=""
										/>
										<div
											class="text-scale-1100 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="12"
												height="12"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<circle cx="11" cy="11" r="8"></circle>
												<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
											</svg>
										</div>
									</div>
								</div>
								<p
									data-state="hide"
									class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-xs text-red-900 transition-all"
								></p>
							</div>
						</div>
					</div>
				</div>
				<div class="mx-7" v-if="loading">
					<div class="text-scale-1100 flex items-center space-x-1 text-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 animate-spin"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M12 4.75v1.5m5.126.624L16 8m3.25 4h-1.5m-.624 5.126-1.768-1.768M12 16.75v2.5m-3.36-3.891-1.768 1.768M7.25 12h-2.5m3.891-3.358L6.874 6.874"
							></path>
						</svg>

						<p>Loading projects</p>
					</div>
				</div>
				<div
					v-else-if="projects.length === 0 && !loading"
					class="border-scale-400 bg-scale-300 mx-7 space-y-1 rounded-md border px-4 py-3"
				>
					<p class="text-xs">No projects available</p>
					<p class="text-scale-1100 text-xs">
						This client has no projects available yet
					</p>
				</div>
				<nav
					v-else
					role="menu"
					aria-label="Sidebar"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
					class="flex flex-auto space-y-6 px-4 pb-4"
				>
					<ul class="flex flex-auto flex-col">
						<div class="mb-2 flex space-x-3 px-3 font-normal">
							<span class="text-scale-900 w-full text-sm">
								<div class="flex w-full items-center justify-between">
									<div class="flex items-center space-x-1">
										<p>Projects</p>
										<p style="font-variant-numeric: tabular-nums">
											({{ projects.length }})
										</p>
									</div>
									<div class="flex items-center gap-3">
										<button
											type="button"
											id="radix-3269"
											aria-haspopup="menu"
											aria-expanded="false"
											data-state="closed"
											class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
										>
											<div
												class="text-scale-900 hover:text-scale-1200 transition-colors"
												data-state="closed"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="18"
													height="18"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="1"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon"
												>
													<polyline points="7 13 12 18 17 13"></polyline>
													<polyline points="7 6 12 11 17 6"></polyline>
												</svg>
											</div></button
										><button
											@click="handleRefresh"
											class="text-scale-900 hover:text-scale-1200 cursor-pointer transition-colors"
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
												:class="[refresh ? 'animate-spin' : '', 'sbui-icon']"
											>
												<polyline points="23 4 23 10 17 10"></polyline>
												<polyline points="1 20 1 14 7 14"></polyline>
												<path
													d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
												></path>
											</svg>
										</button>
									</div>
								</div>
							</span>
						</div>
						<div class="flex flex-1" v-if="!loading">
							<div class="flex flex-grow flex-col">
								<div class="flex-grow">
									<div style="overflow: visible; height: 0px; width: 0px">
										<div
											style="
												position: relative;
												height: 760px;
												width: 223px;
												overflow: auto;
												will-change: transform;
												direction: ltr;
											"
										>
											<div style="height: 280px; width: 100%">
												<div
													v-for="(project, idx) in projects"
													:key="project.id"
													:style="`position: absolute; left: 0px; top: ${
														idx * 28
													}px; height: 28px; width: 100%;`"
												>
													<div
														:class="[
															route.params.project_id === project.id
																? 'text-scale-1200 bg-scale-300'
																: '',
															'group flex items-center justify-between rounded-md',
														]"
													>
														<NuxtLink
															class="flex w-full max-w-[90%] items-center space-x-3 px-3 py-1"
															:to="`/clients/${route.params.client_id}/projects/${project.id}`"
														>
															<p
																class="text-scale-1100 group-hover:text-scale-1200 max-w-[85%] overflow-hidden text-ellipsis whitespace-nowrap text-sm transition"
															>
																{{ project.name }}
															</p></NuxtLink
														>
														<div class="pr-3">
															<Menu as="div">
																<MenuButton
																	v-if="route.params.project_id === project.id"
																	class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
																>
																	<div
																		class="text-scale-900 hover:text-scale-1200 transition-colors"
																	>
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="14"
																			height="14"
																			viewBox="0 0 24 24"
																			fill="none"
																			stroke="currentColor"
																			stroke-width="2"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			class="sbui-icon"
																		>
																			<polyline
																				points="6 9 12 15 18 9"
																			></polyline>
																		</svg>
																	</div> </MenuButton
																><MenuItems
																	style="
																		position: fixed;
																		left: 0px;
																		top: 0px;
																		transform: translate(100px, 20px);
																		min-width: max-content;
																		will-change: transform;
																		z-index: 1000;
																	"
																	><div>
																		<div
																			class="bg origin-dropdown data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide z-40 w-48 min-w-fit rounded border py-1.5 shadow-lg"
																		>
																			<MenuItem
																				@click="showProjectModal = true"
																				as="div"
																				class="text-body-light focus:bg-selection focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none"
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
																						d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
																					></path>
																					<path
																						d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
																					></path></svg
																				><span>Edit Project</span>
																			</MenuItem>
																			<!-- <div
																				role="menuitem"
																				class="text-body-light focus:bg-selection focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none"
																				tabindex="-1"
																				data-orientation="vertical"
																				data-radix-collection-item=""
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
																				><span>Duplicate Table</span>
																			</div> -->
																			<!-- <div
																				href="/project/nsfipxnlucvgchlkqvqw/auth/policies?search=29442"
																				><div
																					role="menuitem"
																					class="text-body-light focus:bg-selection focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none"
																					tabindex="-1"
																					data-orientation="vertical"
																					data-radix-collection-item=""
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
																							x="3"
																							y="11"
																							width="18"
																							height="11"
																							rx="2"
																							ry="2"
																						></rect>
																						<path
																							d="M7 11V7a5 5 0 0 1 10 0v4"
																						></path></svg
																					><span>View Policies</span>
																				</div></div
																			> -->
																			<div
																				role="separator"
																				aria-orientation="horizontal"
																				class="my-2 w-full border-t-[1px]"
																			></div>
																			<div
																				role="menuitem"
																				class="text-body-light focus:bg-selection focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none"
																				tabindex="-1"
																				data-orientation="vertical"
																				data-radix-collection-item=""
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
																						points="3 6 5 6 21 6"
																					></polyline>
																					<path
																						d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
																					></path></svg
																				><span>Delete Project</span>
																			</div>
																		</div>
																	</div></MenuItems
																></Menu
															>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									style="position: absolute; inset: 0px; pointer-events: none"
								></div>
							</div>
						</div>
					</ul>
				</nav>
			</div>
		</div>
		<ProjectModal v-if="showProjectModal" @close="showProjectModal = false" />
	</div>
</template>

<style scoped></style>
