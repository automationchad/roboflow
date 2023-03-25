<template>
	<div>
		<TransitionRoot as="template" :show="sidebarOpen">
			<Dialog
				as="div"
				class="relative z-50 lg:hidden"
				@close="sidebarOpen = false"
			>
				<TransitionChild
					as="template"
					enter="transition-opacity ease-linear duration-300"
					enter-from="opacity-0"
					enter-to="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leave-from="opacity-100"
					leave-to="opacity-0"
				>
					<div class="fixed inset-0 bg-gray-900/80" />
				</TransitionChild>

				<div class="fixed inset-0 flex">
					<TransitionChild
						as="template"
						enter="transition ease-in-out duration-300 transform"
						enter-from="-translate-x-full"
						enter-to="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leave-from="translate-x-0"
						leave-to="-translate-x-full"
					>
						<DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
							<TransitionChild
								as="template"
								enter="ease-in-out duration-300"
								enter-from="opacity-0"
								enter-to="opacity-100"
								leave="ease-in-out duration-300"
								leave-from="opacity-100"
								leave-to="opacity-0"
							>
								<div
									class="absolute top-0 left-full flex w-16 justify-center pt-5"
								>
									<button
										type="button"
										class="-m-2.5 p-2.5"
										@click="sidebarOpen = false"
									>
										<span class="sr-only">Close sidebar</span>
										<XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
									</button>
								</div>
							</TransitionChild>
							<!-- Sidebar component, swap this element with another sidebar if you like -->
							<div
								class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"
							>
								<div class="flex h-16 shrink-0 items-center">
									<img
										class="h-8 w-auto"
										src="~/assets/images/logo.png"
										alt="Your Company"
									/>
								</div>
								<nav class="flex flex-1 flex-col">
									<ul role="list" class="flex flex-1 flex-col gap-y-7">
										<li>
											<ul role="list" class="-mx-2 space-y-1">
												<li v-for="item in navigation" :key="item.name">
													<a
														:href="item.href"
														:class="[
															item.current
																? 'bg-gray-800 text-white'
																: 'text-gray-400 hover:bg-gray-800 hover:text-white',
															'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
														]"
													>
														<component
															:is="item.icon"
															class="h-6 w-6 shrink-0"
															aria-hidden="true"
														/>
														{{ item.name
														}}<span
															v-if="item.count"
															class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-800 py-0.5 px-2.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
															aria-hidden="true"
															>{{ abbreviatedNumber(item.count) }}</span
														>
													</a>
												</li>
											</ul>
										</li>
										<li>
											<div
												class="text-xs font-semibold leading-6 text-gray-400"
											>
												Your teams
											</div>
											<ul role="list" class="-mx-2 mt-2 space-y-1">
												<li v-for="team in teams" :key="team.name">
													<a
														:href="team.href"
														:class="[
															team.current
																? 'bg-gray-800 text-white'
																: 'text-gray-400 hover:bg-gray-800 hover:text-white',
															'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
														]"
													>
														<span
															class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
															>{{ team.initial }}</span
														>
														<span class="truncate">{{ team.name }}</span>
													</a>
												</li>
											</ul>
										</li>
										<li class="mt-auto">
											<a
												href="#"
												class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
											>
												<Cog6ToothIcon
													class="h-6 w-6 shrink-0"
													aria-hidden="true"
												/>
												Settings
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot>

		<!-- Static sidebar for desktop -->
		<div
			class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
		>
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div
				class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4"
			>
				<div class="flex h-16 shrink-0 items-center">
					<img
						class="h-8 w-auto"
						src="~/assets/images/logo.png"
						alt="Your Company"
					/>
				</div>
				<nav class="flex flex-1 flex-col">
					<ul role="list" class="flex flex-1 flex-col gap-y-7">
						<li>
							<ul role="list" class="-mx-2 space-y-1">
								<li v-for="item in navigation" :key="item.name">
									<a
										:href="!active ? '/settings' : item.href"
										:class="[
											item.current
												? 'bg-gray-800 text-white'
												: 'text-gray-400 hover:bg-gray-800 hover:text-white',
											'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
										]"
									>
										<component
											:is="item.icon"
											class="h-6 w-6 shrink-0"
											aria-hidden="true"
										/>
										{{ item.name
										}}<span
											v-if="item.count && active"
											class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-800 py-0.5 px-2.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
											aria-hidden="true"
											>{{ abbreviatedNumber(item.count) }}</span
										><span
											v-if="!active && item.gated"
											class="ml-auto w-9 min-w-max whitespace-nowrap"
											><LockClosedIcon class="h-5 w-5 text-gray-200"
										/></span>
									</a>
								</li>
							</ul>
						</li>
						<li>
							<div class="text-xs font-semibold leading-6 text-gray-400">
								Your teams
							</div>
							<ul role="list" class="-mx-2 mt-2 space-y-1">
								<li v-for="team in teams" :key="team.name">
									<a
										:href="team.href"
										:class="[
											team.current
												? 'bg-gray-800 text-white'
												: 'text-gray-400 hover:bg-gray-800 hover:text-white',
											'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
										]"
									>
										<span
											class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
											>{{ team.initial }}</span
										>
										<span class="truncate">{{ team.name }}</span>
									</a>
								</li>
							</ul>
						</li>
						<li class="mt-auto">
							<a
								href="/settings"
								class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
							>
								<Cog6ToothIcon class="h-6 w-6 shrink-0" aria-hidden="true" />
								Settings
							</a>
						</li>
					</ul>
				</nav>
			</div>
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
		CircleStackIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		UsersIcon,
		TicketIcon,
		XMarkIcon,
		LockClosedIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	const abbreviatedNumber = (number) => {
		const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
		const tier = (Math.log10(Math.abs(number)) / 3) | 0;
		if (tier === 0) {
			return number;
		}
		const suffix = SI_SYMBOL[tier];
		const scale = 10 ** (tier * 3);
		const scaled = number / scale;
		const length = scaled.toFixed(1).toString();
		const precision = length > 3 ? 0 : 1;
		return scaled.toFixed(precision) + suffix;
	};

	const active = true;

	const route = useRoute();

	const navigation = [
		{
			name: 'Dashboard',
			href: '/',
			icon: HomeIcon,
			current: route.path === '/',
		},
		{
			name: 'Team',
			href: '/users',
			icon: UsersIcon,
			current: route.path === '/users',
		},
		{
			name: 'Tickets',
			href: '/tickets',
			icon: TicketIcon,
			count: 10,
			gated: true,
			current: route.path.includes('/tickets'),
		},
		// { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
		// {
		// 	name: 'Storage',
		// 	href: '#',
		// 	icon: CircleStackIcon,
		// 	gated: true,
		// 	current: false,
		// },
		// {
		// 	name: 'Reports',
		// 	href: '#',
		// 	icon: ChartPieIcon,
		// 	gated: true,
		// 	current: false,
		// },
	];
	const teams = [
		{ id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
	];
	const userNavigation = [
		{ name: 'Your profile', href: '#' },
		{ name: 'Sign out', href: '#' },
	];

	const sidebarOpen = ref(false);
</script>
