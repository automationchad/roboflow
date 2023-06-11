<script setup>
	import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

	import { watch } from 'vue';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const route = useRoute();
	const title = ref(null);
	const description = ref(null);

	const accountId = ref(null);

	const admin = ref(false);

	const accounts = ref([]);

	async function fetchUserData() {
		const { data: userData, error: userError } = await supabase
			.from('User')
			.select(`*,Account(type, name, id)`)
			.eq('id', user.value.id)
			.limit(1)
			.single();

		admin.value = userData.Account.type === 'super_admin';

		if (userData.Account.type === 'super_admin') {
			const { data: accountData, error: accountError } = await supabase
				.from('Account')
				.select('*,Ticket(status,type)')
				.neq('type', 'super_admin');
			accounts.value = accountData;
		} else accounts.value = [userData.Account];

		if (route.params.id) {
			const { data: accountData, error: accountError } = await supabase
				.from('Account')
				.select('id,name,Ticket(id)')
				.eq('Ticket.id', route.params.id)
				.limit(1)
				.single();
			const { data: ticketData, error: ticketError } = await supabase
				.from('Ticket')
				.select('name,accountId')
				.eq('id', route.params.id)
				.limit(1)
				.single();
			title.value = accountData.name;
			description.value = ticketData.name;
			accountId.value = ticketData.accountId;
		}

		// if (route.path.includes('/projects')) {
		// 	description.value = 'Projects';
		// } else description.value = 'Settings';
	}

	await fetchUserData();

	watch(
		() => route.params.id,
		async (newId, oldId) => {
			if (newId) {
				fetchUserData();
			}
		},
		{ immediate: true }
	);

	watch(
		() => route.params.organization,
		async (newId, oldId) => {
			if (newId) {
				fetchUserData();
			}
		},
		{ immediate: true }
	);
</script>

<template>
	<div
		class="border-scale-500 sticky top-0 z-50 flex h-12 max-h-12 items-center justify-between border-b bg-[#F8F8FB] px-5 py-2 dark:border-white/10 dark:bg-[#020014]"
	>
		<div class="-ml-2 flex items-center text-sm">
			<Menu as="div"
				><MenuButton
					:disabled="!admin"
					v-if="route.params.id"
					class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all hover:bg-gray-50 focus:outline-4"
				>
					<span
						class="font-regular hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-slate-700 shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:text-white"
						><span class="truncate">{{ title }}</span></span
					></MenuButton
				>

				<NuxtLink
					v-else
					:to="'/dashboard/projects'"
					class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
				>
					<span
						class="font-regular hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-slate-700 shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:text-white"
						><span class="truncate">{{ title }}</span></span
					></NuxtLink
				>
				<MenuItems
					class="fixed left-0 top-0 z-[500] min-w-max"
					style="transform: translate3d(68px, 42px, 0px)"
				>
					<div
						class="bg origin-dropdown data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide z-40 w-64 min-w-fit rounded border bg-white py-1.5 shadow-lg"
						style="outline: none; pointer-events: auto"
					>
						<MenuItem
							as="div"
							v-slot="{ active }"
							v-for="account in accounts"
							:key="account.id"
						>
							<NuxtLink
								:to="`/dashboard/org/${account.id}`"
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
							<div
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
							</div>
						</MenuItem>
					</div>
				</MenuItems>
			</Menu>

			<span class="dark:text-scale-700 text-gray-800"
				><svg
					viewBox="0 0 24 24"
					width="16"
					height="16"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
					stroke-linejoin="round"
					fill="none"
					shape-rendering="geometricPrecision"
				>
					<path d="M16 3.549L7.12 20.600"></path></svg
			></span>

			<Menu as="div"
				><MenuButton
					v-if="description !== 'Projects'"
					:disabled="!admin"
					as="button"
					class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all hover:bg-gray-50 focus:outline-4 dark:hover:bg-white/5"
				>
					<span
						class="font-regular hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-slate-700 shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:text-white/60"
						><span class="truncate">{{ description }}</span></span
					></MenuButton
				>

				<div
					v-else
					class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
				>
					<span
						class="font-regular hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-slate-700 shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 dark:text-white/60"
						><span class="truncate">{{ description }}</span></span
					>
				</div>

				<MenuItems
					class="fixed left-0 top-0 z-[500] min-w-max"
					style="transform: translate3d(68px, 42px, 0px)"
				>
					<div
						class="z-40 w-64 min-w-fit rounded border bg-white py-1.5 shadow-lg"
						style="outline: none; pointer-events: auto"
					>
						<MenuItem as="div" v-slot="{ active }">
							<div
								:class="[
									active ? 'bg-gray-100 text-gray-800' : 'text-slate-600',
									'text-body-light focus:bg-selection focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
								]"
							>
								<span>{{ description }}</span>
							</div>
						</MenuItem>
						<div
							role="separator"
							aria-orientation="horizontal"
							class="my-2 w-full border-t-[1px]"
						></div>
						<MenuItem as="div" v-slot="{ active }">
							<NuxtLink
								:to="`/dashboard/new/${accountId}`"
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
								><span>New project</span>
							</NuxtLink>
						</MenuItem>
					</div>
				</MenuItems>
			</Menu>
		</div>
		<div class="flex items-center space-x-2 dark:text-white">
			<NuxtLink
				:to="'https://motisgroup.helpkit.so'"
				type="button"
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-controls="radix-462"
				data-state="closed"
				class="focus:outline-scale-600 flex rounded border-none bg-white p-0 outline-none outline-offset-1 transition-all focus:outline-4"
			>
				<span
					class="font-regular bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-slate-700 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
						class="sbui-icon text-scale-900"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
						<line x1="12" y1="17" x2="12.01" y2="17"></line></svg
					><span class="truncate">Help</span>
				</span></NuxtLink
			><button
				type="button"
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-controls="radix-463"
				data-state="closed"
				class="focus:outline-scale-600 flex rounded border-none bg-white p-0 outline-none outline-offset-1 transition-all focus:outline-4"
			>
				<span
					class="font-regular bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-slate-700 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
						class="sbui-icon text-scale-900"
					>
						<path
							d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
						></path></svg
					><span class="truncate"
						><span class="hidden md:block">Feedback</span></span
					></span
				></button
			><button
				type="button"
				aria-haspopup="dialog"
				aria-expanded="false"
				aria-controls="radix-464"
				data-state="closed"
				class="focus:outline-scale-600 flex rounded border-none bg-white p-0 outline-none outline-offset-1 transition-all focus:outline-4"
			>
				<div class="relative flex" data-state="closed">
					<span
						id="notification-button"
						class="font-regular bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-slate-700 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
							class="sbui-icon text-slate-700"
						>
							<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
							<path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg
					></span>
					<div
						class="absolute -right-1 -top-1 z-50 flex h-3 w-3 items-center justify-center"
					>
						<div
							class="h-full w-full animate-ping rounded-full bg-rose-500 opacity-60 dark:bg-rose-800"
						></div>
						<div
							class="z-60 absolute right-0 top-0 h-full w-full rounded-full bg-rose-600 opacity-80 dark:bg-rose-900"
						></div>
					</div>
				</div>
			</button>
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
</style>
