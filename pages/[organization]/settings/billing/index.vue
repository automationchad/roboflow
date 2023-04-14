<template>
	<div>
		<Head>
			<Title>Motis Group | Plan & Billing</Title>
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
											<p class="text-xs text-white">
												{{ User.Account.name }}
											</p>
											<h1
												class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
											>
												Plan & Billing
											</h1>
										</div>
										<div class="px-4 sm:px-6 lg:px-0">
											<TabGroup
												class="py-6"
												as="div"
												:selectedIndex="selectedTab"
												@change="changeTab"
											>
												<!-- Tabs -->
												<div class="lg:hidden">
													<label for="selected-tab" class="sr-only"
														>Select a tab</label
													>
													<select
														id="selected-tab"
														name="selected-tab"
														class="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
													>
														<option
															v-for="tab in tabs"
															:key="tab.name"
															:selected="tab.current"
														>
															{{ tab.name }}
														</option>
													</select>
												</div>
												<TabList class="hidden lg:block">
													<div
														class="border-b border-gray-200 dark:border-slate-700"
													>
														<nav class="-mb-[2px] flex space-x-8">
															<Tab
																as="a"
																:href="tab.id"
																v-for="(tab, idx) in tabs"
																:key="tab.name"
																v-slot="{ selected }"
																class="whitespace-nowrap py-4 text-sm font-medium outline-none"
																><a
																	:class="[
																		selectedTab === idx
																			? 'border-indigo-500'
																			: 'border-transparent',
																		'cursor-pointer whitespace-nowrap border-b px-1 py-4 text-sm font-normal text-gray-500 outline-none dark:text-white',
																	]"
																	>{{ tab.name }}</a
																></Tab
															>
														</nav>
													</div>
												</TabList>
												<TabPanels>
													<TabPanel><org-plans /></TabPanel>
													<TabPanel><org-costs /></TabPanel>

													<TabPanel><org-invoices /></TabPanel>
												</TabPanels>

												<!-- Description list with inline editing -->
											</TabGroup>
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
		.select('systemRole,accountId,Account(name)')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const tabs = [
		{
			name: 'Subscription',
			id: '#subscription',
			href: `/${User.accountId}/settings/billing`,
			current: true,
		},
		{
			name: 'Usage',
			id: '#usage',
			href: `/${User.accountId}/settings/billing/cost-management`,
			current: false,
		},

		{
			name: 'Invoices',
			id: '#invoices',
			href: `/${User.accountId}/settings/billing/invoices`,
			current: false,
		},
	];

	console.log(route);

	const selectedTab = ref(
		tabs.findIndex((o) => o.id === route.hash) !== ''
			? tabs.findIndex((o) => o.id === route.hash)
			: 0
	);

	function changeTab(index) {
		selectedTab.value = index;
	}

	const sidebarOpen = ref(false);
</script>
