<script setup>
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
	let { data: components } = await useFetch(`/api/components`);
	components = components.value.data;
	const tabs = [
		{
			name: 'Finance',
			id: 'finance',
			url: 'finance',
			description: 'Meet deadlines set by regulators.',
			children: [{ name: 'Intercom', id: 'intercom' }],
		},
		{
			name: 'Sales',
			id: 'sales',
			url: 'finance',
			description:
				'Sales teams need to hit quotas, not waste time on paperwork.',
			children: [
				{ name: 'Salesforce', id: 'salesforce' },
				{ name: 'Outreach.io', id: 'outreach' },
			],
		},
		{
			name: 'IT',
			id: 'it',
			url: 'marketing',
			description: 'Manage massive amounts of data.',
			children: [
				{ name: 'Application Shells', id: 'page_sections' },
				{ name: 'Headings', id: 'page_sections' },
			],
		},
	];
</script>

<template>
	<section class="max-w-container sm:px-46 mx-auto w-full px-48 py-24 lg:px-48">
		<div class="max-w-2xl">
			<h2 class="text-base font-semibold leading-7 text-indigo-600">
				Components
			</h2>
			<p class="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
				Robot and solution examples all in one place.
			</p>
		</div>
		<div class="max-w-xl">
			<p class="mt-4 text-base leading-7 text-slate-700">
				Jumpstart your automation development with hundreds of example robots
				and solution blueprints by Robocorp and the community.
			</p>
		</div>
		<div class="mt-6">
			<a
				class="text-base font-semibold text-indigo-600 hover:text-indigo-700"
				href="/components"
				>Browse all components <span aria-hidden="true">→</span></a
			>
		</div>
		<TabGroup class="" as="div" v-slot="{ selectedIndex }"
			><TabList
				class="mt-16 flex border-t border-slate-200 sm:space-x-10 md:grid md:grid-cols-3 md:gap-x-8 md:space-x-0"
				as="div"
			>
				<Tab
					v-slot="{ selected }"
					as="div"
					class="focus:outline-none"
					v-for="tab in tabs"
					:key="tab"
					><div
						:class="[
							selected ? 'border-indigo-500' : 'border-transparent',
							'relative -mt-px cursor-pointer  border-t pt-4 pb-6 text-left outline-none md:pb-10 md:pt-8',
						]"
					>
						<div
							:class="[
								selected ? 'text-indigo-600' : 'text-slate-900',
								'a whitespace-nowrap text-sm font-semibold leading-7 sm:text-base',
							]"
						>
							<span class="absolute inset-0 -top-px"></span>{{ tab.name }}
						</div>

						<p class="mt-2 hidden text-sm leading-6 text-slate-700 md:block">
							{{ tab.description }}
						</p>
					</div></Tab
				>
			</TabList>
			<TabPanels>
				<TabPanel v-for="tab in tabs" :key="tab">
					<p class="text-sm leading-6 text-slate-700 md:hidden">
						{{ tab.description }}
					</p>
					<div class="relative mt-10 md:mt-0">
						<ul
							class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
						>
							<li
								v-for="component in components
									.filter((o) => o.categories.includes(tabs[selectedIndex].id))
									.slice(0, 4)"
								:key="component.id"
								class=""
							>
								<a
									:href="`/components/${component.id}`"
									class="group relative before:absolute before:-inset-2.5 before:rounded-[20px] before:bg-gray-50 before:opacity-0 hover:before:opacity-100"
								>
									<div
										class="relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/10"
									>
										<img
											:src="component.images[0]?.url"
											:alt="component.images[0]?.alt"
											class="absolute inset-0 h-full w-full object-cover"
										/>
									</div>
									<h4
										class="relative mt-4 flex max-w-xs justify-start truncate text-sm font-medium text-slate-900 group-hover:text-indigo-600"
									>
										<div>
											<span class="absolute z-10"></span
											><span class="relative">{{ component.name }}</span>
										</div>
									</h4>
									<p class="relative mt-1.5 text-xs font-medium text-slate-500">
										v{{ component.version }}
									</p>
								</a>
							</li>
						</ul>
						<div
							class="pointer-events-none absolute -inset-x-2.5 -bottom-2.5 h-[16.6%] bg-gradient-to-t from-white to-white/0 sm:h-[33.3%]"
						></div>
					</div>
					<div
						class="pointer-events-none relative z-10 -mt-5 flex justify-center"
					>
						<a
							class="pointer-events-auto inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-sm font-semibold text-white hover:bg-slate-700"
							:href="`/components/#${tab.url}`"
							><span
								>Show more...<span class="sr-only">, {{ tab.name }}</span></span
							></a
						>
					</div>
				</TabPanel>
			</TabPanels></TabGroup
		>
	</section>
</template>
