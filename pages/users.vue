<template>
	<div>
		<navbar />

		<div class="lg:pl-72">
			<div
				class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
			>
				<button
					type="button"
					class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
					@click="sidebarOpen = true"
				>
					<span class="sr-only">Open sidebar</span>
					<Bars3Icon class="h-6 w-6" aria-hidden="true" />
				</button>

				<!-- Separator -->
				<div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

				<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
					<form class="relative flex flex-1" action="#" method="GET">
						<label for="search-field" class="sr-only">Search</label>
						<MagnifyingGlassIcon
							class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
							aria-hidden="true"
						/>
						<input
							id="search-field"
							class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
							placeholder="Search..."
							type="search"
							name="search"
						/>
					</form>
					<div class="flex items-center gap-x-4 lg:gap-x-6">
						<button
							type="button"
							class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
						>
							<span class="sr-only">View notifications</span>
							<BellIcon class="h-6 w-6" aria-hidden="true" />
						</button>

						<!-- Separator -->
						<div
							class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
							aria-hidden="true"
						/>

						<!-- Profile dropdown -->
						<Menu as="div" class="relative">
							<MenuButton class="-m-1.5 flex items-center p-1.5">
								<span class="sr-only">Open user menu</span>
								<img
									class="h-8 w-8 rounded-full bg-gray-50"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
								<span class="hidden lg:flex lg:items-center">
									<span
										class="ml-4 text-sm font-semibold leading-6 text-gray-900"
										aria-hidden="true"
										>Tom Cook</span
									>
									<ChevronDownIcon
										class="ml-2 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</MenuButton>
							<transition
								enter-active-class="transition ease-out duration-100"
								enter-from-class="transform opacity-0 scale-95"
								enter-to-class="transform opacity-100 scale-100"
								leave-active-class="transition ease-in duration-75"
								leave-from-class="transform opacity-100 scale-100"
								leave-to-class="transform opacity-0 scale-95"
							>
								<MenuItems
									class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
								>
									<MenuItem
										v-for="item in userNavigation"
										:key="item.name"
										v-slot="{ active }"
									>
										<a
											:href="item.href"
											:class="[
												active ? 'bg-gray-50' : '',
												'block px-3 py-1 text-sm leading-6 text-gray-900',
											]"
											>{{ item.name }}</a
										>
									</MenuItem>
								</MenuItems>
							</transition>
						</Menu>
					</div>
				</div>
			</div>

			<main class="py-10">
				<div class="px-4 sm:px-6 lg:px-8">
					<div class="px-4 sm:px-6 lg:px-8">
						<div class="sm:flex sm:items-center">
							<div class="sm:flex-auto">
								<h1 class="text-base font-semibold leading-6 text-gray-900">
									Users
								</h1>
								<p class="mt-2 text-sm text-gray-700">
									A list of all the users in your account including their name,
									title, email and role.
								</p>
							</div>
							<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
								<button
									type="button"
									class="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Add user
								</button>
							</div>
						</div>
						<div class="mt-8 flow-root">
							<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div
									class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
								>
									<table class="min-w-full divide-y divide-gray-300">
										<thead>
											<tr>
												<th
													scope="col"
													class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
												>
													Name
												</th>
												<th
													scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Title
												</th>
												<th
													scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Status
												</th>
												<th
													scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
												>
													Role
												</th>
												<th
													scope="col"
													class="relative py-3.5 pl-3 pr-4 sm:pr-0"
												>
													<span class="sr-only">Edit</span>
												</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-200 bg-white">
											<tr
												v-for="person in User.Account.User"
												:key="person.email"
											>
												<td
													class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0"
												>
													<div class="flex items-center">
														<div class="h-10 w-10 flex-shrink-0">
															<img
																class="h-10 w-10 rounded-full"
																:src="person.image"
																alt=""
															/>
														</div>
														<div class="ml-4">
															<div class="font-medium text-gray-900">
																{{ person.firstName }} {{ person.lastName }}
															</div>
															<div class="text-gray-500">
																{{ person.email }}
															</div>
														</div>
													</div>
												</td>
												<td
													class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
												>
													<div class="text-gray-900">{{ person.jobTitle }}</div>
													<div class="text-gray-500">
														{{ person.systemRole }}
													</div>
												</td>
												<td
													class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
												>
													<span
														class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
														>Active</span
													>
												</td>
												<td
													class="whitespace-nowrap px-3 py-4 text-sm capitalize text-gray-500"
												>
													{{ person.systemRole }}
												</td>
												<td
													class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
												>
													<a
														href="#"
														class="text-indigo-600 hover:text-indigo-900"
														>Edit<span class="sr-only"
															>, {{ person.name }}</span
														></a
													>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		ChartPieIcon,
		Cog6ToothIcon,
		DocumentDuplicateIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`id,
		Account (
	     id,
		 User (
			*
		 )
	   )
	 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	// const { data: images } = await client.storage
	// 	.from('images')
	// 	.list(`blueprints/${event.context.params.id}`, {
	// 		limit: 100,
	// 		offset: 0,
	// 		sortBy: { column: 'name', order: 'asc' },
	// 	});

	console.log(User);
</script>
