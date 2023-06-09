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
					<div class="fixed inset-0 bg-slate-900/80" />
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
									class="absolute left-full top-0 flex w-16 justify-center pt-5"
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
								class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#06051A] px-6 pb-4 ring-1 ring-white/10"
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
																? 'bg-slate-800 text-white'
																: 'text-slate-400 hover:bg-slate-800 hover:text-white',
															'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
														]"
													>
														<component
															:is="item.icon"
															class="h-4 w-4 shrink-0"
															aria-hidden="true"
														/>
														{{ item.name }}
													</a>
												</li>
											</ul>
										</li>
										<li>
											<div
												class="flex justify-between text-xs font-semibold leading-6 text-slate-400"
											>
												<div>Workspace</div>
												<button><PlusIcon class="h-5 w-5 text-white" /></button>
											</div>
											<ul role="list" class="-mx-2 mt-2 space-y-1">
												<li v-for="team in teams" :key="team.name">
													<NuxtLink
														to="'/tickets/' + team.id"
														:class="[
															route.params.organization == team.id
																? 'bg-slate-800 text-white'
																: 'text-slate-400 hover:bg-slate-800 hover:text-white',
															'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
														]"
													>
														<span
															class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-[0.625rem] font-medium text-slate-400 group-hover:text-white"
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
												class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-400 hover:bg-slate-800 hover:text-white"
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
				class="flex grow flex-col overflow-y-auto border-r border-white/10 bg-slate-50 px-6 pb-4 dark:bg-white/[2%]"
			>
				<div
					class="-mx-2 flex shrink-0 flex-col items-center justify-center space-y-3 pt-4"
				>
					<div class="flex items-center">
						<img
							class="mr-1 h-4 w-auto"
							src="~/assets/images/logo.png"
							alt="Your Company"
						/>
						<p class="text-xs capitalize text-slate-400">
							{{ User.Account.type.replace(/_/g, ' ') }} Account
						</p>
					</div>

					<div class="mt-4 flex h-6 w-full items-center justify-center">
						<NuxtLink
							v-if="upgrade_needed"
							to="/settings/billing#usage"
							class="w-full rounded-full border border-red-200 bg-red-100 px-2 py-0.5 text-center text-xs font-normal text-red-700 dark:border-red-600 dark:bg-red-800 dark:text-red-300"
							>Account has exceeded usage limits</NuxtLink
						>
						<NuxtLink
							v-else
							to="/settings/billing#usage"
							class="inline-flex w-full items-center justify-center space-x-1 rounded-full border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-center text-xs font-normal text-yellow-700 dark:border-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-1"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="10" y1="15" x2="10" y2="9"></line>
								<line x1="14" y1="15" x2="14" y2="9"></line></svg
							>Paused</NuxtLink
						>
					</div>
				</div>
				<nav class="flex flex-1 flex-col">
					<ul role="list" class="flex flex-1 flex-col gap-y-7">
						<a
							:class="[
								'group -mx-6 flex flex-col items-start justify-between space-y-2 px-4 py-4 text-sm font-semibold leading-6 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800',
							]"
						>
							<div :class="['flex gap-x-3']">
								<span
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-400 bg-slate-800 text-sm font-medium uppercase text-white dark:border-slate-700"
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
						</a>

						<li>
							<ul role="list" class="-mx-2 space-y-1">
								<li
									v-for="item in navigation[User.Account.type]"
									:key="item.name"
								>
									<NuxtLink
										:to="item.href"
										:class="[
											route.path === item.href
												? ' text-slate-900 dark:text-white'
												: 'text-slate-700 hover:text-slate-900 dark:text-slate-400  dark:hover:text-white',
											'group flex items-center gap-x-3 rounded-md p-1 text-sm font-normal leading-6 transition-colors',
										]"
									>
										<component
											:is="item.icon"
											:class="[
												route.path === item.href
													? 'text-slate-900 dark:text-indigo-500'
													: 'text-slate-700',
												'h-5 w-5 shrink-0',
											]"
											aria-hidden="true"
										/>
										{{ item.name }}
									</NuxtLink>
								</li>
							</ul>
						</li>
						<li
							v-if="
								User.Account.type !== 'super_admin' &&
								User.Account.type !== 'partner'
							"
						>
							<div
								class="flex justify-between text-xs font-semibold leading-6 text-slate-400"
							>
								<div>Workspaces</div>
							</div>
							<ul role="list" class="-ml-2 mt-2 space-y-1">
								<li v-for="(team, idx) in teams" :key="team.name">
									<NuxtLink
										:to="`/${team.accountId}/tickets`"
										:class="[
											route.params.organization == team.id
												? ' dark:text-white'
												: 'text-slate-600 dark:text-slate-400  dark:hover:text-white',
											idx === 0
												? 'border-b border-slate-300 dark:border-slate-800'
												: '',
											'group flex items-center justify-between text-sm font-semibold leading-6 ',
										]"
									>
										<div :class="['flex gap-x-3  p-2']">
											<span
												:class="[
													route.params.organization == team.id
														? 'text-slate-900 dark:text-white'
														: '',
													'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-slate-400 bg-slate-300  text-[0.625rem] font-medium text-slate-400 group-hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:group-hover:text-white',
												]"
												>{{ team.name[0] }}</span
											>
											<span class="truncate font-normal">{{ team.name }}</span>
										</div>
										<div class="flex items-center" v-if="team.Ticket">
											<div
												v-if="
													team.Ticket.filter((o) => o.status !== 'done').length
												"
												class="flex items-center text-xs font-normal"
											>
												<span
													class="inline-flex h-min w-min items-center rounded-full bg-rose-700 px-2 text-xs font-medium text-white"
													>{{
														team.Ticket.filter((o) => o.status !== 'done')
															.length
													}}</span
												>
											</div>
											<span
												v-if="false"
												class="ml-auto w-9 min-w-max whitespace-nowrap"
												><LockClosedIcon class="h-5 w-5 text-slate-200"
											/></span>
										</div>
									</NuxtLink>
								</li>
								<button
									v-if="User.Account.type !== 'super_admin'"
									:disabled="upgrade_needed"
									class="group relative flex items-center px-1 py-3 text-sm text-slate-500 disabled:text-slate-300"
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
								<help />
							</div>

							<div class="relative">
								<NuxtLink class="-m-1.5 flex items-center p-1.5" to="/settings">
									<img
										class="flex h-8 w-8 items-center justify-center rounded-full border object-cover text-xs dark:border-slate-700"
										alt=""
										:src="avatarUrl"
									/>
									<div></div>

									<span class="hidden lg:flex lg:items-center">
										<span
											style="font-weight: 100"
											class="ml-4 text-sm leading-6 text-slate-900 dark:text-white"
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
		DocumentTextIcon,
		DocumentChartBarIcon,
		BuildingOfficeIcon,
		CpuChipIcon,
		InboxStackIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
		ChartBarIcon,
		StarIcon,
		ArrowTopRightOnSquareIcon,
	} from '@heroicons/vue/20/solid';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const avatarUrl = ref(null);

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
				Account (
			     id,
				 name,
				 type,
				 Subscription(*),
				 Team (
					id,
					name,
					accountId
				 ),
				 Ticket (count)
			   )
			 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const teams = ref([]);
	
	const upgrade_needed = ref(false);
	

	function moveOrgToFront(arr) {
		const orgIndex =
			User.Account.type === 'super_admin'
				? arr.findIndex((obj) => obj.id === User.Account.id)
				: arr.findIndex((obj) => obj.name === 'Organization');
		if (orgIndex > -1) {
			const orgObj = arr.splice(orgIndex, 1)[0];
			arr.unshift(orgObj);
		}
		return arr;
	}

	onMounted(async () => {
		let { data: Account, error: accountError } = await supabase
			.from('Account')
			.select('*,Ticket(status,type)');
		if (User.Account.type === 'super_admin') {
			teams.value = Account;
		} else {
			teams.value = User.Account.Team;
			const index = teams.value.indexOf((o) => User.defaultTeamId === o.id);
			const item = teams.value.splice(index, 1)[0];
			teams.value.unshift(item);
		}
		teams.value = moveOrgToFront(teams.value);
	});

	const getAvatarUrl = async (avatar) => {
		const {
			data: [File],
			error: fileError,
		} = await supabase.storage.from('avatars').list(`${avatar}/`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'updated_at', order: 'desc' },
			search: `${user.value.id}`,
		});
		if (File) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from('avatars')
				.getPublicUrl(`/${user.value.id}/${File.name}`);

			return publicUrl;
		} else return null;
	};

	avatarUrl.value = await getAvatarUrl(user.value.id);

	const route = useRoute();

	const navigation = {
		client: [
			{
				name: 'Dashboard',
				href: `/${User.Account.id}/dashboard`,
				icon: ChartBarIcon,
				current: route.path.includes`/${User.Account.id}/dashboard`,
			},
			{
				name: 'Plan & Billing',
				href: `/${User.Account.id}/settings/billing`,
				icon: CreditCardIcon,
				current: route.path.includes(`/${User.Account.id}/settings/billing`),
			},
			{
				name: 'Settings & Members',
				href: `/${User.Account.id}/settings`,
				icon: Cog8ToothIcon,
				current: route.path.includes(`/${User.Account.id}/settings`),
			},
		],
		partner: [
			{
				name: 'Portfolio',
				href: `/${User.Account.id}/dashboard`,
				icon: DocumentChartBarIcon,
				current: route.path.includes`/${User.Account.id}/dashboard`,
			},

			{
				name: 'Members & Details',
				href: `/${User.Account.id}/settings`,
				icon: UsersIcon,
				current: route.path.includes(`/${User.Account.id}/settings`),
			},
			{
				name: 'Billing info',
				href: `/${User.Account.id}/settings/billing`,
				icon: CreditCardIcon,
				current: route.path.includes(`/${User.Account.id}/settings/billing`),
			},

			{
				name: 'Partner Central',
				href: `/${User.Account.id}/documentation/partners`,
				icon: ArrowTopRightOnSquareIcon,
				current: route.path.includes(`/${User.Account.id}/settings/billing`),
			},
		],
		super_admin: [
			{
				name: 'Client organizations',
				href: `/${User.Account.id}/clients`,
				icon: BuildingOfficeIcon,
				current: route.path.includes(`/${User.Account.id}/clients`),
			},

			{
				name: 'Members & Details',
				href: `/${User.Account.id}/settings`,
				icon: UsersIcon,
				current: route.path.includes(`/${User.Account.id}/settings`),
			},
			{
				name: 'Billing info',
				href: `/${User.Account.id}/settings/billing`,
				icon: CreditCardIcon,
				current: route.path.includes(`/${User.Account.id}/settings/billing`),
			},

			{
				name: 'Cost reports',
				href: `/${User.Account.id}/cost-reports`,
				icon: DocumentChartBarIcon,
				current: route.path.includes(`/${User.Account.id}/settings/billing`),
			},
			{
				name: 'Partner Central',
				href: `/${User.Account.id}/documentation/partners`,
				icon: ArrowTopRightOnSquareIcon,
				current: route.path.includes(`/${User.Account.id}/settings/billing`),
			},
		],
	};

	

	const sidebarOpen = ref(false);
</script>
