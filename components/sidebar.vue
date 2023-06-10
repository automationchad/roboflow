<template>
	<div
		class="hide-scrollbar bg-scale-200 dark:border-dark flex w-64 flex-col border-r"
		style="height: 100vh; max-height: 100vh"
	>
		<div
			class="dark:border-dark flex max-h-12 items-center border-b px-6"
			style="min-height: 3rem"
		>
			<h4 class="text-lg">Settings</h4>
		</div>
		<div class="flex-grow overflow-y-auto">
			<div class="flex flex-col space-y-8 overflow-y-auto">
				<nav
					role="menu"
					aria-label="Sidebar"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					<ul>
						<div>
							<div class="my-6 space-y-8">
								<div class="mx-3">
									<div class="mb-2 flex space-x-3 px-3 font-normal">
										<span class="text-scale-900 w-full text-sm"
											><div class="flex flex-col space-y-2">
												<span>Project Settings</span>
											</div></span
										>
									</div>
									<div>
										<a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/general"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 bg-scale-400 dark:bg-scale-300 text-scale-900 group z-10 flex cursor-pointer items-center space-x-3 rounded-md px-3 py-1 font-semibold outline-none focus-visible:z-10 focus-visible:ring-1"
													aria-current="page"
													><span
														class="text-scale-1200 w-full truncate text-sm font-semibold transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="General"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">General </span>
															</div>
														</div></span
													></a
												>
											</li></a
										><a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/database"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="Database"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">Database </span>
															</div>
														</div></span
													></a
												>
											</li></a
										><a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/api"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="API"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">API </span>
															</div>
														</div></span
													></a
												>
											</li></a
										><a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/auth"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="Auth"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">Auth </span>
															</div>
														</div></span
													></a
												>
											</li></a
										><a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/storage"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="Storage"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">Storage </span>
															</div>
														</div></span
													></a
												>
											</li></a
										><a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/vault/secrets"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="Vault"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">Vault </span
																><span
																	class="truncate text-xs font-normal text-orange-800"
																	>BETA</span
																>
															</div>
														</div></span
													></a
												>
											</li></a
										>
									</div>
								</div>
							</div>
							<div class="bg-scale-500 h-px w-full"></div>
						</div>
						<div>
							<div class="my-6 space-y-8">
								<div class="mx-3">
									<div class="mb-2 flex space-x-3 px-3 font-normal">
										<span class="text-scale-900 w-full text-sm"
											><div class="flex flex-col space-y-2">
												<span>Billing</span>
											</div></span
										>
									</div>
									<div>
										<a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/billing/subscription"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="Subscription"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">Subscription </span>
															</div>
														</div></span
													></a
												>
											</li></a
										><a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/billing/usage"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="Usage"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">Usage </span>
															</div>
														</div></span
													></a
												>
											</li></a
										><a
											class="block"
											target="_self"
											href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/billing/invoices"
											><li role="menuitem" class="outline-none">
												<a
													class="ring-scale-1200 border-scale-500 group-hover:border-scale-900 group flex cursor-pointer items-center space-x-3 px-3 py-1 font-normal outline-none focus-visible:z-10 focus-visible:ring-1"
													><span
														class="text-scale-1100 group-hover:text-scale-1200 w-full truncate text-sm transition"
														><div
															class="flex w-full items-center justify-between gap-1"
														>
															<div
																title="Invoices"
																class="flex w-full items-center gap-2 truncate"
															>
																<span class="truncate">Invoices </span>
															</div>
														</div></span
													></a
												>
											</li></a
										>
									</div>
								</div>
							</div>
						</div>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</template>
