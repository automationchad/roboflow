<template>
	<div>
		<div class=""><TransitionRoot as="template" :show="sidebarOpen">
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
									
								</nav>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</TransitionRoot></div>
		

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
							v-else-if="retainer.tier === 'free'"
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
				<div class="px-4 py-12 sm:px-6 lg:px-8">
			<nav class="flex justify-center" aria-label="Progress">
				<ol role="list" class="space-y-6">
					<li v-for="(step, index) in stepSelector" :key="step.name">
						<button
							:disabled="index === 0"
							@click="currentStep = index"
							v-if="index < currentStep || index === 0"
							class="group"
						>
							<span class="flex items-start">
								<span
									class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
								>
									<CheckCircleIcon
										class="h-full w-full text-indigo-600 group-hover:text-indigo-800"
										aria-hidden="true"
									/>
								</span>
								<span
									class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900"
									>{{ step.name }}</span
								>
							</span>
						</button>
						<button
							@click="currentStep = index"
							v-else-if="index === currentStep"
							class="flex items-start"
							aria-current="step"
						>
							<span
								class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
								aria-hidden="true"
							>
								<span class="absolute h-4 w-4 rounded-full bg-indigo-200" />
								<span
									class="relative block h-2 w-2 rounded-full bg-indigo-600"
								/>
							</span>
							<span class="ml-3 text-sm font-medium text-indigo-600">{{
								step.name
							}}</span>
						</button>
						<button v-else @click="currentStep = index" class="group">
							<div class="flex items-start">
								<div
									class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
									aria-hidden="true"
								>
									<div
										class="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400"
									/>
								</div>
								<p
									class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900"
								>
									{{ step.name }}
								</p>
							</div>
						</button>
					</li>
				</ol>
			</nav>
		</div>
				<nav class="flex flex-1 flex-col">
					
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
					name
				 ),
				 Ticket (count)
			   )
			 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const teams = ref([]);
	const entitlements = await getEntitlements();

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	const entitlement = entitlements[retainer.tier];

	const totalActive = User.Account.Ticket.filter(
		(o) => o.status !== 'done' && entitlement.ticket_types.includes(o.type)
	).length;
	const upgrade_needed = ref(false);
	upgrade_needed.value =
		totalActive > entitlement.ticket_count &&
		// retainer.status === 'active' &&
		User.systemRole !== 'super_admin';

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
