<script setup>
	import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const accounts = ref([]);

	const { data: userData, error: userError } = await supabase
		.from('User')
		.select('id,Account(type)')
		.eq('id,', user.value.id)
		.limit(1)
		.single();

	if (userData.Account.type === 'super_admin') {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('id,name,Ticket(*,User(*))').neq('type', 'super_admin');
		accounts.value = accountData;
	} else {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('id,name,Ticket(*,User(*))')
			.eq('id', userData.Account.id);
		accounts.value = accountData;
	}

	const stageType = {
		initial_review:
			'bg-blue-100 dark:bg-blue-700 dark:ring-blue-500 ring-blue-300 text-blue-900 dark:text-blue-200',
		requirements_gathering:
			'bg-yellow-100 dark:bg-yellow-700 dark:ring-yellow-500 ring-yellow-300 text-yellow-900 dark:text-yellow-200',
		proposal_submitted:
			'bg-purple-100 dark:bg-purple-700 dark:ring-purple-500 ring-purple-300 text-purple-900 dark:text-purple-200',
		contract_pending:
			'bg-orange-100 dark:bg-orange-700 dark:ring-orange-500 ring-orange-300 text-orange-900 dark:text-orange-200',
		invoice_pending:
			'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		invoice_paid:
			'bg-green-100 dark:bg-green-700 dark:ring-green-500 ring-green-300 text-green-900 dark:text-green-200',
		solution_design:
			'bg-teal-100 dark:bg-teal-700 dark:ring-teal-500 ring-teal-300 text-teal-900 dark:text-teal-200',
		in_development:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300 text-lime-900 dark:text-lime-200',
		unit_testing:
			'bg-indigo-100 dark:bg-indigo-700 dark:ring-indigo-500 ring-indigo-300 text-indigo-900 dark:text-indigo-200',
		integration_testing:
			'bg-amber-100 dark:bg-amber-700 dark:ring-amber-500 ring-amber-300 text-amber-900 dark:text-amber-200',
		user_acceptance_testing:
			'bg-pink-100 dark:bg-pink-700 dark:ring-pink-500 ring-pink-300 text-pink-900 dark:text-pink-200',
		bug_fixing:
			'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		deployment_preparation:
			'bg-gray-100 dark:bg-gray-700 dark:ring-gray-500 ring-gray-300 text-gray-900 dark:text-gray-200',
		in_deployment:
			'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300 text-sky-900 dark:text-sky-200',
		post_deployment_review:
			'bg-blue-100 dark:bg-blue-700 dark:ring-blue-500 ring-blue-300 text-blue-900 dark:text-blue-200',
		maintenance_mode:
			'bg-yellow-100 dark:bg-yellow-700 dark:ring-yellow-500 ring-yellow-300 text-yellow-900 dark:text-yellow-200',
		upgrades_and_enhancements:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300 text-lime-900 dark:text-lime-200',
		project_on_hold:
			'bg-orange-100 dark:bg-orange-700 dark:ring-orange-500 ring-orange-300 text-orange-900 dark:text-orange-200',
		project_rejected:
			'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		project_cancelled:
			'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		project_completed:
			'bg-green-100 dark:bg-green-700 dark:ring-green-500 ring-green-300 text-green-900 dark:text-green-200',
	};
</script>

<template>
	<div class="px-5 py-4">
		<div class="my-2">
			<div class="flex">
				<Menu as="div"
					><MenuButton
						class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
					>
						<span
							class="font-regular focus-visible:outline-brand-600 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset transition transition-all duration-200 ease-out hover:bg-indigo-400 focus-visible:outline-4 focus-visible:outline-offset-1"
							><span class="truncate">New project</span></span
						></MenuButton
					>

					<MenuItems
						class="fixed left-0 top-0 z-[500] min-w-max"
						style="transform: translate3d(191px, 102px, 0px)"
					>
						<div
							class="bg origin-dropdown data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide z-40 w-64 min-w-fit rounded border bg-white py-1.5 shadow-lg"
							style="outline: none; pointer-events: auto"
						>
							<div
								class="text-body-lighter flex items-center space-x-2 px-4 py-1.5 text-xs"
							>
								Choose organization
							</div>
							<MenuItem
								as="div"
								v-slot="{ active }"
								v-for="account in accounts"
								:key="account.id"
							>
								<NuxtLink
									:to="`/dashboard/new/${account.id}`"
									:class="[
										active ? 'bg-gray-100 text-gray-800' : 'text-slate-600',
										'text-body-light focus:bg-selection focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
									]"
								>
									<span>{{ account.name }}</span>
								</NuxtLink>
							</MenuItem>

							<div
								role="separator"
								aria-orientation="horizontal"
								class="my-2 w-full border-t-[1px]"
							></div>
							<MenuItem as="div" v-slot="{ active }">
								<NuxtLink
									to="/dashboard/new"
									:class="[
										active ? 'bg-gray-100 text-gray-800' : 'text-slate-600',
										'text-body-light focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
									]"
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
										<line x1="12" y1="5" x2="12" y2="19"></line>
										<line x1="5" y1="12" x2="19" y2="12"></line></svg
									><span>New organization</span>
								</NuxtLink>
							</MenuItem>
						</div>
					</MenuItems>
				</Menu>
			</div>
		</div>
		<div class="my-8 space-y-8">
			<div class="" v-for="account in accounts" :key="account.id">
				<div class="space-y-3">
					<div class="flex items-center space-x-4">
						<h4 class="flex items-center text-lg">{{ account.name }}</h4>
					</div>
					<ul
						class="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
					>
						<li
							class="col-span-1"
							v-for="project in account.Ticket"
							:key="project.id"
							v-if="account.Ticket.length > 0"
						>
							<NuxtLink :to="`/dashboard/projects/${project.id}`">
								<div
									class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark hover:bg-panel-border-light dark:hover:bg-panel-border-dark hover:border-panel-border-hover-light dark:hover:border-panel-border-hover-dark group relative flex h-32 cursor-pointer flex-row rounded-md border px-6 py-4 text-left transition duration-150 ease-in-out hover:border-gray-300"
								>
									<div class="flex h-full w-full flex-col space-y-2">
										<h5 class="text-scale-1200">
											<div class="flex w-full flex-row justify-between gap-1">
												<span class="flex-shrink truncate">{{
													project.name
												}}</span>
											</div>
										</h5>
										<div class="w-full">
											<div class="flex items-end justify-between">
												<span class="text-scale-1000 text-sm capitalize"
													>{{ project.type }} | {{ project.User.firstName }}
													{{ project.User.lastName }}</span
												>
												<div class="grow text-right">
													<span
														:class="[
															stageType[project.status],
															'bg-scale-200 text-scale-1100 border-scale-700 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1',
														]"
														><div class="flex items-center gap-2">
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
																<circle cx="12" cy="12" r="10"></circle>
																<line x1="10" y1="15" x2="10" y2="9"></line>
																<line
																	x1="14"
																	y1="15"
																	x2="14"
																	y2="9"
																></line></svg
															><span class="truncate capitalize">{{
																project.status.replace(/_/g, ' ')
															}}</span>
														</div></span
													>
												</div>
											</div>
										</div>
									</div>
									<div
										class="text-scale-900 group-hover:text-scale-1200 absolute right-4 top-4 transition-all duration-200 group-hover:right-3"
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
							></NuxtLink>
						</li>
						<div
							v-else
							class="col-span-4 space-y-4 rounded-lg border-2 border-dashed border-gray-200 p-6 text-center"
						>
							<div class="space-y-1">
								<p>No projects</p>
								<p class="text-sm text-slate-600">
									Get started by creating a new project.
								</p>
							</div>
							<div>
								<NuxtLink :to="`/dashboard/new/${account.id}`"
									><button
										class="font-regular bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-indigo-400 focus-visible:outline-4 focus-visible:outline-offset-1"
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
											<line x1="12" y1="5" x2="12" y2="19"></line>
											<line x1="5" y1="12" x2="19" y2="12"></line></svg
										><span class="truncate">New Project</span>
									</button></NuxtLink
								>
							</div>
						</div>
					</ul>
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

	.bordershadow-brand-fixed-900 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #e59fe9 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>
