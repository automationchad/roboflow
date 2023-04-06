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
															class="h-4 w-4 shrink-0"
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
												class="flex justify-between text-xs font-semibold leading-6 text-gray-400"
											>
												<div>Workspace</div>
												<button><PlusIcon class="h-5 w-5 text-white" /></button>
											</div>
											<ul role="list" class="-mx-2 mt-2 space-y-1">
												<li v-for="team in teams" :key="team.name">
													<NuxtLink
														to="'/tickets/' + team.id"
														:class="[
															route.params.team == team.id
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
													</NuxtLink>
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
				class="flex grow flex-col overflow-y-auto bg-gray-50 px-6 pb-4 dark:bg-gray-900"
			>
				<div class="flex shrink-0 items-center justify-center py-4">
					<img
						class="mr-1 h-4 w-auto"
						src="~/assets/images/logo.png"
						alt="Your Company"
					/>
					<p class="text-xs text-slate-400">Motis Group</p>
				</div>
				<nav class="flex flex-1 flex-col">
					<ul role="list" class="flex flex-1 flex-col gap-y-7">
						<a
							:class="[
								'group -mx-6 flex items-center justify-between py-4 px-4 text-sm font-semibold leading-6 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800',
							]"
						>
							<div :class="['flex gap-x-3']">
								<span
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-400 bg-gray-800 text-sm font-medium text-white dark:border-gray-700"
									>{{ User.Account.name[0] }}</span
								>
								<div class="">
									<p
										class="text-xs font-normal text-slate-600 dark:text-slate-400"
									>
										Organization
									</p>
									<span class="truncate text-base">{{
										User.Account.name
									}}</span>
								</div>
							</div>
							<div class="flex items-center">
								<span
									v-if="!active && item.gated"
									class="ml-auto w-9 min-w-max whitespace-nowrap"
									><LockClosedIcon class="h-5 w-5 text-gray-200"
								/></span>
							</div>
						</a>
						<li>
							<ul role="list" class="-mx-2 space-y-1">
								<li v-for="item in navigation" :key="item.name">
									<NuxtLink
										:to="!active ? '/settings' : item.href"
										:class="[
											route.path === item.href
												? ' text-gray-900 dark:text-white'
												: 'text-gray-700 hover:text-gray-900 dark:text-gray-400  dark:hover:text-white',
											'group flex items-center gap-x-3 rounded-md p-1 text-sm font-normal leading-6 transition-colors',
										]"
									>
										<component
											:is="item.icon"
											:class="[
												route.path === item.href
													? 'text-gray-900 dark:text-indigo-500'
													: 'text-gray-700',
												'h-5 w-5 shrink-0',
											]"
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
									</NuxtLink>
								</li>
							</ul>
						</li>
						<li>
							<div
								class="flex justify-between text-xs font-semibold leading-6 text-gray-400"
							>
								<div>Workspaces</div>
							</div>
							<ul role="list" class="-ml-2 mt-2 space-y-1">
								<li
									v-for="(team, idx) in moveOrgToFront(teams)"
									:key="team.name"
								>
									<NuxtLink
										:to="`/${team.id}/tickets`"
										:class="[
											route.params.team == team.id
												? ' dark:text-white'
												: 'text-gray-600 dark:text-gray-400  dark:hover:text-white',
											idx === 0
												? 'border-b border-gray-300 dark:border-gray-800'
												: '',
											'group flex items-center justify-between text-sm font-semibold leading-6 ',
										]"
									>
										<div :class="['flex gap-x-3  p-2']">
											<span
												:class="[
													route.params.team == team.id
														? 'text-gray-900 dark:text-white'
														: '',
													'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-400 bg-slate-300  text-[0.625rem] font-medium text-gray-400 group-hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:group-hover:text-white',
												]"
												>{{ team.name[0] }}</span
											>
											<span class="truncate">{{ team.name }}</span>
										</div>
										<div class="flex items-center">
											<span
												v-if="!active && item.gated"
												class="ml-auto w-9 min-w-max whitespace-nowrap"
												><LockClosedIcon class="h-5 w-5 text-gray-200"
											/></span>
										</div>
									</NuxtLink>
								</li>
								<button
									:disabled="upgrade_needed"
									class="group relative flex items-center py-3 px-1 text-sm text-gray-500 disabled:text-gray-300"
								>
									<PlusIcon class="mr-2 h-4 w-4" />New Workspace
									<upgrade-access
										:object="'workspaces'"
										v-if="upgrade_needed"
									/>
								</button>
							</ul>
						</li>

						<li class="mt-auto space-y-2">
							<div class="relative">
								<button class=""><help /></button>
							</div>

							<div class="relative">
								<NuxtLink
									class="-m-1.5 flex items-center p-1.5"
									:to="`/settings`"
								>
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-xs"
										alt=""
									>
										{{ User.firstName[0] }}
									</div>
									<span class="hidden lg:flex lg:items-center">
										<span
											style="font-weight: 100"
											class="ml-4 text-sm leading-6 text-gray-900 dark:text-white"
											aria-hidden="true"
											>{{ User.firstName }} {{ User.lastName }}</span
										>
									</span>
								</NuxtLink>
							</div>
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
		Cog6ToothIcon,
		Cog8ToothIcon,
		CodeBracketIcon,
		DocumentDuplicateIcon,
		CircleStackIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		PlusIcon,
		UsersIcon,
		TicketIcon,
		QuestionMarkCircleIcon,
		CreditCardIcon,
		XMarkIcon,
		LockClosedIcon,
		CpuChipIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
		ChartBarIcon,
		StarIcon,
	} from '@heroicons/vue/20/solid';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
		Account (
	     id,
		 name,
		 Subscription(*),
		 Team (
			id,
			name
		 ),
		 Ticket (
			count
		 )
	   )
	 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	let teams = User.Account.Team;
	let teams_sorted = teams;
	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');
	const upgrade_needed =
		retainer.tier !== 'enterprise' ||
		(retainer.status !== 'active' && User.systemRole !== 'super_admin');
	const index = teams_sorted.indexOf((o) => User.defaultTeamId == o.id);

	const item = teams_sorted.splice(index, 1)[0];

	teams_sorted.unshift(item);

	function moveOrgToFront(arr) {
		const orgIndex = arr.findIndex((obj) => obj.name === 'Organization');
		if (orgIndex > -1) {
			const orgObj = arr.splice(orgIndex, 1)[0];
			arr.unshift(orgObj);
		}
		return arr;
	}

	const active = true;

	const route = useRoute();

	const navigation = [
		{
			name: 'Dashboard',
			href: `/${User.Account.id}/dashboard`,
			icon: ChartBarIcon,
			current: route.path === `/${User.Account.id}/dashboard`,
		},
		{
			name: 'Plan & Billing',
			href: `/${User.Account.id}/settings/billing`,
			icon: CreditCardIcon,
			current: route.path === `/${User.Account.id}/settings/billing`,
		},
		{
			name: 'Settings & Members',
			href: `/${User.Account.id}/settings`,
			icon: Cog8ToothIcon,
			current: route.path === `/${User.Account.id}/settings`,
		},
	];

	const userNavigation = [
		{ name: 'Your profile', href: '#' },
		{ name: 'Sign out', href: '#' },
	];

	const sidebarOpen = ref(false);
</script>
