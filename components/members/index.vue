<template>
	<div class="container my-4 max-w-4xl space-y-8">
		<div class="flex justify-between">
			<div class="grid gap-2 text-sm leading-4 md:grid md:grid-cols-12">
				<div class="col-span-12">
					<div class="">
						<div class="relative">
							<input
								id="email"
								name="email"
								placeholder="Filter members"
								type="text"
								class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 pl-10 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
								value=""
							/>
							<div
								class="text-scale-1100 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
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
									<circle cx="11" cy="11" r="8"></circle>
									<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
								</svg>
							</div>
						</div>
					</div>
					<p
						data-state="hide"
						class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
					></p>
				</div>
			</div>
			<div class="flex items-center space-x-4">
				<div>
					<button data-state="closed">
						<button
							class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
						>
							<span class="truncate">Invite</span>
						</button>
					</button>
				</div>
				<div>
					<button data-state="closed">
						<button
							class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							disabled=""
							type="button"
						>
							<span class="truncate">Leave team</span>
						</button>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="container my-4 max-w-4xl space-y-8">
		<div class="rounded">
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div class="table-container">
						<table class="table">
							<thead>
								<tr>
									<th class="p-3 px-4 text-left">User</th>
									<th class="p-3 px-4 text-left"></th>
									<th class="flex items-center space-x-2 p-3 px-4 text-left">
										<span>Role</span
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon hover:text-scale-1200 cursor-pointer transition"
										>
											<circle cx="12" cy="12" r="10"></circle>
											<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
											<line x1="12" y1="17" x2="12.01" y2="17"></line>
										</svg>
									</th>
									<th class="p-3 px-4 text-left"></th>
								</tr>
							</thead>
							<tbody class="dark:text-white">
								<tr class="">
									<td>
										<div class="flex items-center space-x-4">
											<div>
												<span
													style="
														box-sizing: border-box;
														display: inline-block;
														overflow: hidden;
														width: initial;
														height: initial;
														background: none;
														opacity: 1;
														border: 0px;
														margin: 0px;
														padding: 0px;
														position: relative;
														max-width: 100%;
													"
													><span
														style="
															box-sizing: border-box;
															display: block;
															width: initial;
															height: initial;
															background: none;
															opacity: 1;
															border: 0px;
															margin: 0px;
															padding: 0px;
															max-width: 100%;
														"
														><img
															alt=""
															aria-hidden="true"
															src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2740%27%20height=%2740%27/%3e"
															style="
																display: block;
																max-width: 100%;
																width: initial;
																height: initial;
																background: none;
																opacity: 1;
																border: 0px;
																margin: 0px;
																padding: 0px;
															" /></span
													><img
														srcset="
															/dashboard/_next/image?url=https%3A%2F%2Fgithub.com%2Fautomationchad.png%3Fsize%3D80&amp;w=48&amp;q=75 1x,
															/dashboard/_next/image?url=https%3A%2F%2Fgithub.com%2Fautomationchad.png%3Fsize%3D80&amp;w=96&amp;q=75 2x
														"
														src="/dashboard/_next/image?url=https%3A%2F%2Fgithub.com%2Fautomationchad.png%3Fsize%3D80&amp;w=96&amp;q=75"
														decoding="async"
														data-nimg="intrinsic"
														class="rounded-full border"
														style="
															position: absolute;
															inset: 0px;
															box-sizing: border-box;
															padding: 0px;
															border: none;
															margin: auto;
															display: block;
															width: 0px;
															height: 0px;
															min-width: 100%;
															max-width: 100%;
															min-height: 100%;
															max-height: 100%;
														"
												/></span>
											</div>
											<div>
												<p class="text-scale-1200">automationchad</p>
												<p class="text-scale-1100">will.marzella@tray.io</p>
											</div>
										</div>
									</td>
									<td></td>
									<td>
										<div data-state="closed" class="w-[140px]">
											<div
												class="pointer-events-none grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-12">
													<div class="">
														<button
															class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
															name=""
															id=""
															type="button"
															aria-haspopup="menu"
															aria-expanded="false"
															data-state="closed"
															data-disabled=""
															disabled=""
														>
															<span
																class="flex w-full flex-row items-center space-x-3"
																><span class="truncate">Owner</span></span
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
									</td>
									<td></td>
								</tr>
								<tr class="">
									<td>
										<div class="flex items-center space-x-4">
											<div>
												<span
													class="border-scale-700 flex rounded-full border-2 p-2"
													><svg
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
														<path
															d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
														></path>
														<circle cx="12" cy="7" r="4"></circle></svg
												></span>
											</div>
											<div><p class="text-scale-1200">heello@ryn.com</p></div>
										</div>
									</td>
									<td>
										<span
											class="text-yellow-1100 inline-flex items-center rounded-full border border-yellow-700 bg-yellow-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
											>Invited</span
										>
									</td>
									<td>
										<div data-state="closed" class="w-[140px]">
											<div
												class="pointer-events-none grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-12">
													<div class="">
														<button
															class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
															name=""
															id=""
															type="button"
															aria-haspopup="menu"
															aria-expanded="false"
															data-state="closed"
															data-disabled=""
															disabled=""
														>
															<span
																class="flex w-full flex-row items-center space-x-3"
																><span class="truncate">Developer</span></span
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
									</td>
									<td>
										<div class="flex items-center justify-end">
											<button
												type="button"
												id="radix-1234"
												aria-haspopup="menu"
												aria-expanded="false"
												data-state="closed"
												class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
											>
												<span
													class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													><svg
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
														<circle cx="12" cy="12" r="1"></circle>
														<circle cx="19" cy="12" r="1"></circle>
														<circle cx="5" cy="12" r="1"></circle></svg
												></span>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<div class="flex items-center space-x-4">
											<div>
												<span
													class="border-scale-700 flex rounded-full border-2 p-2"
													><svg
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
														<path
															d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
														></path>
														<circle cx="12" cy="7" r="4"></circle></svg
												></span>
											</div>
											<div>
												<p class="text-scale-1200">hello@motis.group</p>
											</div>
										</div>
									</td>
									<td>
										<span
											class="text-yellow-1100 inline-flex items-center rounded-full border border-yellow-700 bg-yellow-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
											>Invited</span
										>
									</td>
									<td>
										<div data-state="closed" class="w-[140px]">
											<div
												class="pointer-events-none grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-12">
													<div class="">
														<button
															class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
															name=""
															id=""
															type="button"
															aria-haspopup="menu"
															aria-expanded="false"
															data-state="closed"
															data-disabled=""
															disabled=""
														>
															<span
																class="flex w-full flex-row items-center space-x-3"
																><span class="truncate">Developer</span></span
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
									</td>
									<td>
										<div class="flex items-center justify-end">
											<button
												type="button"
												id="radix-1236"
												aria-haspopup="menu"
												aria-expanded="false"
												data-state="closed"
												class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
											>
												<span
													class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													><svg
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
														<circle cx="12" cy="12" r="1"></circle>
														<circle cx="19" cy="12" r="1"></circle>
														<circle cx="5" cy="12" r="1"></circle></svg
												></span>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<div class="flex items-center space-x-4">
											<div>
												<span
													class="border-scale-700 flex rounded-full border-2 p-2"
													><svg
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
														<path
															d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
														></path>
														<circle cx="12" cy="7" r="4"></circle></svg
												></span>
											</div>
											<div>
												<p class="text-scale-1200">tracy@motis.group</p>
											</div>
										</div>
									</td>
									<td>
										<span
											class="text-yellow-1100 inline-flex items-center rounded-full border border-yellow-700 bg-yellow-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
											>Invited</span
										>
									</td>
									<td>
										<div data-state="closed" class="w-[140px]">
											<div
												class="pointer-events-none grid gap-2 text-sm md:grid md:grid-cols-12"
											>
												<div class="col-span-12">
													<div class="">
														<button
															class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
															name=""
															id=""
															type="button"
															aria-haspopup="menu"
															aria-expanded="false"
															data-state="closed"
															data-disabled=""
															disabled=""
														>
															<span
																class="flex w-full flex-row items-center space-x-3"
																><span class="truncate">Developer</span></span
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
									</td>
									<td>
										<div class="flex items-center justify-end">
											<button
												type="button"
												id="radix-1238"
												aria-haspopup="menu"
												aria-expanded="false"
												data-state="closed"
												class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
											>
												<span
													class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													><svg
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
														<circle cx="12" cy="12" r="1"></circle>
														<circle cx="19" cy="12" r="1"></circle>
														<circle cx="5" cy="12" r="1"></circle></svg
												></span>
											</button>
										</div>
									</td>
								</tr>
								<tr
									class="bg-panel-secondary-light dark:bg-panel-secondary-dark"
								>
									<td colspan="4"><p class="text-scale-1100">4 users</p></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<MembersInviteModal v-if="false"/>
	<MembersScopesModal v-if="false"/>
</template>

<style scoped>
	.table-container table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
	}
	.table {
		display: table;
	}
	table {
		text-indent: 0;
		border-color: inherit;
		border-collapse: collapse;
	}

	.table-container tbody td:first-child {
		border-bottom-width: 1px;
		border-left-width: 1px;
		border-color: var(--colors-scale5);
		padding-left: 1.5rem;
	}
	.table-container tbody td {
		
		border-bottom-width: 1px;
		border-color: var(--colors-scale5);
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--colors-gray11);
	}

	.table-container tbody td:last-child {
		border-bottom-width: 1px;
		border-right-width: 1px px;
		border-color: var(--colors-scale5);
		padding-right: 1.5rem;
	}


.table-container table span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<!-- <script setup>
	import { reactive, ref, watch, watchEffect } from 'vue';

	import {
		Dialog,
		DialogPanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		TransitionChild,
		TransitionRoot,
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		PlusCircleIcon,
		CheckIcon,
		ChartPieIcon,
		Cog6ToothIcon,
		DocumentDuplicateIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		TrashIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		LinkIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();

	const deleteCommand = ref('');
	const deleteDescription = ref('');

	const users = ref([]);
	const selectedRoles = reactive({});

	let accountData, Invitation, User, Scopes;

	const showInvite = ref(false);
	const showDelete = ref(false);
	const userToDelete = ref(null);
	const inviteeEmail = ref('');
	const loading = ref(true);

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');

	const handleError = (msg) => {
		error_message.value = msg;
		is_error.value = true;
	};

	const handleSuccess = (msg) => {
		success_message.value = msg;
		is_success.value = true;
	};

	async function fetchData() {
		const accountPromise = supabase
			.from('Account')
			.select(`id, User(*)`)
			.eq('id', route.params.organization)
			.limit(1)
			.single();

		const invitationPromise = supabase
			.from('Invitation')
			.select('*')
			.eq('account', route.params.organization);

		const userPromise = supabase
			.from('User')
			.select(`*, Account (id, User(*))`)
			.eq('id', user.value.id)
			.limit(1)
			.single();

		[accountData, Invitation, User] = await Promise.all([
			accountPromise,
			invitationPromise,
			userPromise,
		]);

		Scopes = await supabase
			.from('Scopes')
			.select('*')
			.eq('systemRole', User.systemRole)
			.limit(1)
			.single();


		users.value = moveUserToFront(accountData.User.concat(Invitation));

		for (let user of users.value) {
			selectedRoles[user.id] = ref(user.systemRole);
		}
		loading.value = false;
	}

	fetchData();

	watch(
		selectedRoles,
		async (newRoles, oldRoles) => {
			for (let userId in newRoles) {
				if (newRoles[userId] !== oldRoles[userId]) {
					// The role for this user has changed, so update the backend.
					await editUserRole(userId, newRoles[userId]);
				}
			}
		},
		{ deep: true }
	);

	const handleDeleteConfirm = (person) => {
		showDelete.value = true;
		userToDelete.value = person;
		deleteCommand.value =
			person.status === 'pending' ? 'Revoke invite' : 'Delete user';
		deleteDescription.value =
			person.status === 'pending'
				? 'revoke the user invite'
				: 'delete the selected user';
	};

	const isAddingDisabled = computed(() => {
		// const currentUserScopes = Scopes.scopes.split(',');
		// // Check if the current user has the 'users:add' scope
		// if (!currentUserScopes.includes('users:create')) return true;

		// Check if the current user is a viewer
		if (User.systemRole === 'viewer') return true;

		return false;
	});

	const isEditRoleDisabled = (selectedUser) => {
		// const currentUserScopes = Scopes.scopes.split(',');

		// // Check if the current user has the 'users:edit' scope
		// if (!currentUserScopes.includes('users:edit')) return true;

		if (selectedUser.status === 'pending') return true;

		// Check if the current user is trying to edit their own role
		if (user.value.id === selectedUser.id) return true;

		if (
			selectedUser.systemRole === 'owner' &&
			accountData.User.filter((o) => o.systemRole === 'owner').length === 1
		)
			return true;

		// Check if the current user is an admin and the selected user is an owner
		if (User.systemRole === 'admin' && selectedUser.systemRole === 'owner')
			return true;

		// Check if the current user is a contributor or viewer
		// Add the relevant checks here

		return false;
	};

	const isDeleteDisabled = (selectedUser) => {
		const currentUserScopes = Scopes.scopes.split(',');

		// Check if the current user has the 'users:delete' scope
		if (!currentUserScopes.includes('users:delete')) return true;

		// Check if the current user is trying to delete their own account
		if (user.value.id === selectedUser.id) return true;

		if (accountData.User.concat(Invitation).length === 1) return true;

		if (
			selectedUser.systemRole === 'owner' &&
			selectedUser.status !== 'pending' &&
			accountData.User.filter((o) => o.systemRole === 'owner').length === 1
		)
			return true;

		// Check if the current user is an admin and the selected user is an owner
		if (User.systemRole === 'admin' && selectedUser.systemRole === 'owner')
			return true;

		// Check if the current user is a contributor or viewer
		// Add the relevant checks here

		return false;
	};

	function moveUserToFront(arr) {
		const orgIndex = arr.findIndex((obj) => obj.id === user.value.id);
		if (orgIndex > -1) {
			const orgObj = arr.splice(orgIndex, 1)[0];
			arr.unshift(orgObj);
		}
		return arr;
	}

	const copyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text) // write the text to the clipboard
			.then(() => {
				console.log('Text copied to clipboard'); // log a message indicating that the text was copied
			})
			.catch((err) => {
				console.error('Error copying text to clipboard: ', err); // log an error message if there was an error copying the text
			});
	};

	// Function to edit user role
	async function editUserRole(userId, newRole) {
		if (isEditRoleDisabled(userId)) {
			console.error('User is not allowed to edit roles');
			return;
		}

		const { error } = await supabase
			.from('User')
			.update({ systemRole: newRole })
			.eq('id', userId);

		if (error) {
			is_success.value = false;
			is_error.value = true;
			error_message.value = 'Error updating user role';
			console.error('Error updating user role:', error);
		} else {
			// Update the local user data as well
			const user = users.value.find((u) => u.id === userId);
			if (user) {
				user.systemRole = newRole;
			}
			is_success.value = true;
			success_message.value = 'User role updated successfully';
			console.log('User role updated successfully');
		}
	}

	// Function to delete user
	async function deleteUser(person) {
		if (isDeleteDisabled(person)) {
			console.error('User is not allowed to be deleted');
			return;
		}

		let error;

		if (person.status === 'pending') {
			const response = await supabase
				.from('Invitation')
				.delete()
				.eq('id', person.id);

			error = response.error;
		} else {
			const response = await supabase.from('User').delete().eq('id', person.id);

			error = response.error;
		}

		if (error) {
			is_success.value = false;
			is_error.value = true;
			error_message.value = error.message || error.toString();
			console.error('Error deleting user:', error);
		} else {
			// Update the local user data as well
			users.value = users.value.filter((u) => u.id !== person.id);

			is_success.value = true;
			success_message.value = 'User deleted successfully';
			console.log('User deleted successfully');
		}
	}

	const sendInvitation = async () => {
		try {
			loading.value = true;
			// Try to insert the invitation
			const { data: userData, error: userError } = await supabase
				.from('User')
				.select('email')
				.eq('email', inviteeEmail.value);

			if (userData.length > 0) {
				inviteeEmail.value = '';
				throw new Error('User already exists');
			}
			const { data: invitation, error } = await supabase
				.from('Invitation')
				.insert([
					{
						email: inviteeEmail.value,
						systemRole: accountData.User.length === 0 ? 'owner' : 'contributor',
						createdBy: user.value.id,
						expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
						account: route.params.organization,
					},
				])
				.select('*');

			if (error) {
				throw new Error(error.message || error.toString());
			} else {
				users.value.push(invitation[0]);
				is_error.value = false;
				inviteeEmail.value = '';
				success_message.value = 'Invitation sent successfully';
				is_success.value = true;
			}
			loading.value = false;
		} catch (error) {
			is_success.value = false;
			is_error.value = true;
			error_message.value = error.message || error.toString();
			loading.value = false;
		}
	};

	const roles = [
		{ id: 'super_admin', name: 'Super Admin' },
		{ id: 'owner', name: 'Owner' },
		{ id: 'admin', name: 'Administrator' },
		{ id: 'contributor', name: 'Contributor' },
		{ id: 'viewer', name: 'Viewer' },
	];
</script> -->
