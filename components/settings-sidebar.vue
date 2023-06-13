<template>
	<div
		id="with-sidebar"
		class="hide-scrollbar h-full w-64 z-0 overflow-auto border-r border-black/10 dark:border-white/10"
		style="height: 100vh; max-height: 100vh"
	>
		<div class="mb-2">
			<div
				class="flex h-12 max-h-12 items-center border-b border-black/10 px-6 dark:border-white/10"
			>
				<h4 class="mb-0 truncate text-lg dark:text-slate-200" :title="title">
					{{ title }}
				</h4>
			</div>
		</div>
		<div class="-mt-1">
			<nav
				role="menu"
				aria-label="Sidebar"
				aria-orientation="vertical"
				aria-labelledby="options-menu"
			>
				<ul>
					<div class="border-b border-black/10 px-6 py-5 dark:border-white/10">
						<div class="mb-2 flex space-x-3 font-normal">
							<span class="w-full text-sm text-slate-400">Projects</span>
						</div>
						<ul class="space-y-1">
							<NuxtLink class="block" to="/dashboard/projects"
								><button
									class="group flex max-w-full cursor-pointer items-center space-x-2 border-slate-700 py-1 font-normal text-slate-300 outline-none ring-slate-300 focus-visible:z-10 focus-visible:ring-1 group-hover:border-slate-500"
								>
									<span
										title="All projects"
										class="w-full truncate text-sm text-slate-500 transition group-hover:text-slate-200 dark:text-slate-300/90"
										>All projects</span
									>
								</button></NuxtLink
							>
						</ul>
					</div>
					<div class="border-b border-black/10 px-6 py-5 dark:border-white/10">
						<div class="mb-2 flex space-x-3 font-normal">
							<span class="w-full text-sm text-slate-400 dark:text-slate-400"
								>Organizations</span
							>
						</div>
						<ul class="space-y-1">
							<NuxtLink
								v-for="team in teams"
								class="block"
								target="_self"
								@click="(title = team.name), (teams = teams)"
								:to="`/dashboard/org/${team.id}`"
								><button
									class="group flex max-w-full cursor-pointer items-center space-x-2 border-slate-700 py-1 font-normal text-slate-400 outline-none ring-slate-300 focus-visible:z-10 focus-visible:ring-1 group-hover:border-slate-500 dark:text-slate-300"
								>
									<span
										:title="team.name"
										class="w-full truncate text-sm text-slate-300/90 text-slate-500 transition group-hover:text-slate-700 dark:group-hover:text-slate-200"
										>{{ team.name }}</span
									>
								</button></NuxtLink
							>
						</ul>
					</div>
					<div class="border-b border-black/10 px-6 py-5 dark:border-white/10">
						<div class="mb-2 flex space-x-3 font-normal">
							<span class="w-full text-sm text-slate-400 dark:text-slate-300"
								>Account</span
							>
						</div>
						<ul class="space-y-1">
							<a class="block" target="_self" href="/dashboard/account/me"
								><button
									class="group flex max-w-full cursor-pointer items-center space-x-2 border-slate-700 py-1 font-normal text-slate-300 outline-none ring-slate-300 focus-visible:z-10 focus-visible:ring-1 group-hover:border-slate-500"
								>
									<span
										title="Preferences"
										class="w-full truncate text-sm text-slate-500 transition group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200"
										>Preferences</span
									>
								</button></a
							>
						</ul>
					</div>
					<div class="border-b border-black/10 px-6 py-5 dark:border-white/10">
						<div class="mb-2 flex space-x-3 font-normal">
							<span class="w-full text-sm text-slate-400 dark:text-slate-300"
								>Documentation</span
							>
						</div>
						<ul class="space-y-1">
							<a class="block" target="_blank" href="https://supabase.com/docs"
								><button
									class="group flex max-w-full cursor-pointer items-center space-x-2 border-slate-700 py-1 font-normal text-slate-300 outline-none ring-slate-300 focus-visible:z-10 focus-visible:ring-1 group-hover:border-slate-500"
								>
									<span
										class="truncate text-sm text-slate-500 transition group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200"
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon text-slate-500 transition group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200"
										>
											<line x1="7" y1="17" x2="17" y2="7"></line>
											<polyline points="7 7 17 7 17 17"></polyline></svg></span
									><span
										title="Guides"
										class="w-full truncate text-sm text-slate-500 transition group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200"
										>Guides</span
									>
								</button></a
							>
						</ul>
					</div>
					<div class="border-b border-black/10 px-6 py-5 dark:border-white/10">
						<ul class="space-y-1">
							<li role="menuitem" class="outline-none">
								<button
									@click="signOut"
									class="group flex cursor-pointer items-center space-x-3 border-slate-700 py-1 font-normal text-slate-300 outline-none ring-slate-300 focus-visible:z-10 focus-visible:ring-1 group-hover:border-slate-500"
									style="margin-left: 0rem"
								>
									<div
										class="min-w-fit truncate text-sm text-slate-500 transition group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200"
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
											class="sbui-icon text-slate-500 transition dark:text-slate-300"
										>
											<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
											<polyline points="16 17 21 12 16 7"></polyline>
											<line x1="21" y1="12" x2="9" y2="12"></line>
										</svg>
									</div>
									<span
										class="w-full truncate text-sm text-slate-500 transition group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-slate-200"
										>Logout</span
									>
								</button>
							</li>
						</ul>
					</div>
				</ul>
			</nav>
		</div>
	</div>
</template>

<script setup>
	import { ref, watch } from 'vue';
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

	const route = useRoute();
	const router = useRouter();

	const title = ref('');

	const teams = ref([]);

	async function fetchUserData() {
		const { data: userData, error: userError } = await supabase
			.from('User')
			.select(`*,Account(type, name, id)`)
			.eq('id', user.value.id)
			.limit(1)
			.single();

		if (userData.Account.type === 'super_admin') {
			const { data: accountData, error: accountError } = await supabase
				.from('Account')
				.select('*,Ticket(status,type)')
			teams.value = accountData;
		} else teams.value = [userData.Account];

		if (route.params.organization) {
			const { data: Account, error: accountError } = await supabase
				.from('Account')
				.select('name')
				.eq('id', route.params.organization)
				.limit(1)
				.single();
			title.value = Account.name;
		} else {
			title.value = 'Dashboard';
		}
	}

	await fetchUserData();

	watch(
		() => route.params.organization,
		async (newOrg, oldOrg) => {
			if (newOrg) {
				fetchUserData();
			} else {
				title.value = 'Dashboard';
			}
		},
		{ immediate: true }
	);

	watch(
		() => user.value,
		(newValue, oldValue) => {
			if (!newValue && oldValue) {
				navigateTo('/');
			}
		},
		{ immediate: true }
	);

	function moveOrgToFront(arr) {
		const orgIndex =
			User.Account.type === 'super_admin'
				? arr.findIndex((obj) => obj.id === User.Account.id)
				: arr.findIndex((obj) => obj?.name === 'Organization');
		if (orgIndex > -1) {
			const orgObj = arr.splice(orgIndex, 1)[0];
			arr.unshift(orgObj);
		}
		return arr;
	}

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

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	avatarUrl.value = await getAvatarUrl(user.value.id);
</script>
