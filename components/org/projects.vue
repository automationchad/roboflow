<template>
	<div class="px-5 py-4">
		<div class="my-2">
			<div class="flex">
				<Menu as="div"
					><MenuButton
						class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
					>
						<span
							class="font-regular focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-600 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset ring-indigo-500 transition transition-all duration-200 ease-out hover:bg-indigo-500 hover:ring-indigo-300 focus-visible:outline-4 focus-visible:outline-offset-1"
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
			<div class="space-y-3">
				<div class="flex items-center space-x-4">
					<h4 class="flex items-center text-lg">automationchad</h4>
				</div>
				<ul
					class="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
				>
					<li class="col-span-1">
						<a href="/dashboard/project/nsfipxnlucvgchlkqvqw"
							><div
								class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark hover:bg-panel-border-light dark:hover:bg-panel-border-dark hover:border-panel-border-hover-light dark:hover:border-panel-border-hover-dark group relative flex h-32 cursor-pointer flex-row rounded-md border px-6 py-4 text-left transition duration-150 ease-in-out hover:border-gray-300"
							>
								<div class="flex h-full w-full flex-col space-y-2">
									<h5 class="text-scale-1200">
										<div class="flex w-full flex-row justify-between gap-1">
											<span class="flex-shrink truncate">motis-group</span>
										</div>
									</h5>
									<div class="w-full">
										<div class="flex items-end justify-between">
											<span class="text-scale-1000 text-sm lowercase"
												>AWS | us-east-1</span
											>
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
						></a>
					</li>
					<li class="col-span-1">
						<a href="/dashboard/project/odsgzqqkrgqxltpnzdhf"
							><div
								class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark hover:bg-panel-border-light dark:hover:bg-panel-border-dark hover:border-panel-border-hover-light dark:hover:border-panel-border-hover-dark group relative flex h-32 cursor-pointer flex-row rounded-md border px-6 py-4 text-left transition duration-150 ease-in-out hover:border-gray-300"
							>
								<div class="flex h-full w-full flex-col space-y-2">
									<h5 class="text-scale-1200">
										<div class="flex w-full flex-row justify-between gap-1">
											<span class="flex-shrink truncate">slack</span>
										</div>
									</h5>
									<div class="w-full">
										<div class="flex items-end justify-between">
											<span class="text-scale-1000 text-sm lowercase"
												>AWS | us-east-1</span
											>
											<div class="grow text-right">
												<span
													class="bg-scale-200 text-scale-1100 border-scale-700 inline-flex items-center rounded-full border bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
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
															<line x1="14" y1="15" x2="14" y2="9"></line></svg
														><span class="truncate">Paused</span>
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
						></a>
					</li>
					<li class="col-span-1">
						<a href="/dashboard/project/iewbubwzoguiwdbqqatm"
							><div
								class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark hover:bg-panel-border-light dark:hover:bg-panel-border-dark hover:border-panel-border-hover-light dark:hover:border-panel-border-hover-dark group relative flex h-32 cursor-pointer flex-row rounded-md border px-6 py-4 text-left transition duration-150 ease-in-out hover:border-gray-300"
							>
								<div class="flex h-full w-full flex-col space-y-2">
									<h5 class="text-scale-1200">
										<div class="flex w-full flex-row justify-between gap-1">
											<span class="flex-shrink truncate"
												>Tray-Embedded-Demo</span
											>
										</div>
									</h5>
									<div class="w-full">
										<div class="flex items-end justify-between">
											<span class="text-scale-1000 text-sm lowercase"
												>AWS | us-east-1</span
											>
											<div class="grow text-right">
												<span
													class="bg-scale-200 text-scale-1100 border-scale-700 inline-flex items-center rounded-full border bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
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
															<line x1="14" y1="15" x2="14" y2="9"></line></svg
														><span class="truncate">Paused</span>
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
						></a>
					</li>
				</ul>
			</div>
			<div class="space-y-3">
				<div class="flex items-center space-x-4">
					<h4 class="flex items-center text-lg">molecular-testing-labs</h4>
				</div>
				<ul
					class="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
				>
					<li class="col-span-1">
						<a href="/dashboard/project/nbzzscdfxajwbwdzglqw"
							><div
								class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark hover:bg-panel-border-light dark:hover:bg-panel-border-dark hover:border-panel-border-hover-light dark:hover:border-panel-border-hover-dark group relative flex h-32 cursor-pointer flex-row rounded-md border px-6 py-4 text-left transition duration-150 ease-in-out hover:border-gray-300"
							>
								<div class="flex h-full w-full flex-col space-y-2">
									<h5 class="text-scale-1200">
										<div class="flex w-full flex-row justify-between gap-1">
											<span class="flex-shrink truncate">Rev-Ops</span>
										</div>
									</h5>
									<div class="w-full">
										<div class="flex items-end justify-between">
											<span class="text-scale-1000 text-sm lowercase"
												>AWS | us-east-1</span
											>
											<div class="grow text-right">
												<span
													class="bg-scale-200 text-scale-1100 border-scale-700 inline-flex items-center rounded-full border bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
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
															<line x1="14" y1="15" x2="14" y2="9"></line></svg
														><span class="truncate">Paused</span>
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
						></a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
