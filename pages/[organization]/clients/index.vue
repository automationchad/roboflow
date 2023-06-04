<template>
	<div>
		<Head>
			<Title>Motis Group | Org Settings</Title>
		</Head>
		<div>
			<!-- Your content -->
			<div>
				<div class="">
					<div class="lg:px-8">
						<div class="mx-auto flex flex-col lg:max-w-7xl">
							<main class="max-w-7xl flex-1">
								<div class="relative mx-auto">
									<div class="pb-16 pt-10">
										<div class="px-4 sm:px-6 lg:px-0">
											<h1
												class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
											>
												Client organizations
											</h1>
										</div>
										<div class="px-4 sm:px-6 lg:px-0">
											<div class="py-6">
												<!-- Tabs -->

												<div class=""><org-clients /></div>

												<!-- Description list with inline editing -->
											</div>
										</div>
									</div>
								</div>
							</main>
						</div>
					</div>
				</div>
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
		TabGroup,
		TabList,
		Tab,
		TabPanels,
		TabPanel,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		ChartPieIcon,
		Cog6ToothIcon,
		DocumentDuplicateIcon,
		CreditCardIcon,
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

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
		Account (
	     id,
		 name,
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

	const tabs = [
		{
			name: 'Settings',
			href: `/${User.Account.id}/settings`,
			current: true,
		},
		{
			name: 'Members',
			href: `/${User.Account.id}/settings/billing/billing-info`,
			current: false,
		},
	];

	const sidebarOpen = ref(false);
</script>
