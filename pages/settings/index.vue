<template>
	<div>
		<navbar />
		<div class="lg:pl-72">
			<main class="py-10">
				<div class="px-4 sm:px-6 lg:px-8">
					<!-- Your content -->
					<div>
						<div class="">
							<div class="lg:px-8">
								<div class="mx-auto flex flex-col lg:max-w-7xl">
									<main class="max-w-7xl flex-1">
										<div class="relative mx-auto">
											<div class="pt-10 pb-16">
												<div class="flex justify-between px-4 sm:px-6 lg:px-0">
													<h1
														class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
													>
														Account settings
													</h1>
													<button
														@click="signOut"
														class="flex items-center rounded-lg border border-gray-200 px-4 py-1"
													>
														<svg
															class="mr-1 h-6 w-6"
															fill="none"
															viewBox="0 0 24 24"
														>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M15.75 8.75L19.25 12L15.75 15.25"
															></path>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M19 12H10.75"
															></path>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"
															></path>
														</svg>
														Log out
													</button>
												</div>
												<div class="px-4 sm:px-6 lg:px-0">
													<TabGroup class="py-6" as="div">
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
																		as="div"
																		v-for="tab in tabs"
																		:key="tab.name"
																		rel="noreferrer"
																		v-slot="{ selected }"
																		class="whitespace-nowrap py-4 text-sm font-medium outline-none"
																		><a
																			:class="[
																				selected
																					? 'border-purple-500'
																					: 'border-transparent',
																				'cursor-pointer whitespace-nowrap border-b py-4 px-1 text-sm font-normal text-gray-500 outline-none dark:text-white',
																			]"
																			>{{ tab.name }}</a
																		></Tab
																	>
																</nav>
															</div>
														</TabList>
														<TabPanels>
															<TabPanel><profile-settings /></TabPanel>
															<TabPanel><profile-preferences /></TabPanel>
															<TabPanel><profile-credentials /></TabPanel>
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

	definePageMeta({ middleware: ['auth'] });

	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo(`/login`);
			}
		});
	});

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
		Account (
	     id,
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
			name: 'Profile',
			href: `/${User.Account.id}/settings`,
			current: true,
		},
		{
			name: 'Preferences',
			href: `/${User.Account.id}/settings/billing/billing-info`,
			current: false,
		},
		{
			name: 'Access Credentials',
			href: `/${User.Account.id}/settings/billing/billing-info`,
			current: false,
		},
	];

	const sidebarOpen = ref(false);
</script>
