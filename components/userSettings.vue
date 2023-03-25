<template>
	<div>
		<!-- Static sidebar for desktop -->

		<!-- Content area -->
		<div class="">
			<div class="lg:px-8">
				<div class="mx-auto flex flex-col lg:max-w-7xl">
					<main class="max-w-7xl flex-1">
						<div class="relative mx-auto">
							<div class="pt-10 pb-16">
								<div class="px-4 sm:px-6 lg:px-0">
									<h1 class="text-3xl font-bold tracking-tight text-gray-900">
										Settings
									</h1>
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
											<div class="border-b border-gray-200">
												<nav class="-mb-px flex space-x-8">
													<Tab
														as="div"
														v-for="tab in tabs"
														:key="tab.name"
														v-slot="{ selected }"
														class="whitespace-nowrap py-4 px-1 text-sm font-medium outline-none"
														><a
															:class="[
																selected
																	? 'border-purple-500 text-purple-600'
																	: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
																'cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium outline-none',
															]"
															>{{ tab.name }}</a
														></Tab
													>
												</nav>
											</div>
										</TabList>
										<TabPanels>
											<TabPanel><user-profile /></TabPanel>
											<TabPanel><user-billing /></TabPanel>
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
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		Switch,
		SwitchGroup,
		SwitchLabel,
		TransitionChild,
		TransitionRoot,
		TabGroup,
		TabList,
		Tab,
		TabPanels,
		TabPanel,
	} from '@headlessui/vue';
	import {
		ArrowLeftOnRectangleIcon,
		Bars3BottomLeftIcon,
		BellIcon,
		BriefcaseIcon,
		ChatBubbleOvalLeftEllipsisIcon,
		CogIcon,
		DocumentMagnifyingGlassIcon,
		HomeIcon,
		QuestionMarkCircleIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';

	const navigation = [
		{ name: 'Home', href: '#', icon: HomeIcon, current: false },
		{ name: 'Jobs', href: '#', icon: BriefcaseIcon, current: false },
		{
			name: 'Applications',
			href: '#',
			icon: DocumentMagnifyingGlassIcon,
			current: false,
		},
		{
			name: 'Messages',
			href: '#',
			icon: ChatBubbleOvalLeftEllipsisIcon,
			current: false,
		},
		{ name: 'Team', href: '#', icon: UsersIcon, current: false },
		{ name: 'Settings', href: '#', icon: CogIcon, current: true },
	];
	const secondaryNavigation = [
		{ name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
		{ name: 'Logout', href: '#', icon: ArrowLeftOnRectangleIcon },
	];
	const tabs = [
		{ name: 'General', href: '#', current: true },
		{ name: 'Plan & Billing', href: '#', current: false },
	];

	const sidebarOpen = ref(false);
	const automaticTimezoneEnabled = ref(true);
	const autoUpdateApplicantDataEnabled = ref(false);
</script>
