<template>
	<div>
		<div class="bg-white">
			<div class="py-24 px-6 sm:px-6 sm:py-32 lg:px-8">
				<div class="mx-auto max-w-7xl text-center">
					<h2
						class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
					>
						Boost your productivity.<br />Start using our app today.
					</h2>
					<p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
						Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
						anim id veniam aliqua proident excepteur commodo do ea.
					</p>
					<TabGroup class="flex items-center justify-start gap-8" as="div">
						<TabList
							as="ol"
							class="flex flex-col space-y-6 outline-none "
							v-slot="{ selectedIndex }"
						>
							<Tab v-for="(step, idx) in steps" :key="step.name">
								<a v-if="selectedIndex > idx" class="group">
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
								</a>
								<a
									v-else-if="selectedIndex === idx"
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
								</a>
								<a v-else class="group">
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
								</a>
							</Tab>
						</TabList>
						<TabPanels>
							<TabPanel><step-1 /></TabPanel>
							<TabPanel><step-2 /></TabPanel>
							<TabPanel><step-3 /></TabPanel>
							<TabPanel><step-4 /></TabPanel>
						</TabPanels>
					</TabGroup>
					<div class="mt-10 flex items-center justify-center gap-x-6">
						<a
							href="#"
							class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>Get started</a
						>
						<a href="#" class="text-sm font-semibold leading-6 text-gray-900"
							>Learn more <span aria-hidden="true">→</span></a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { CheckCircleIcon } from '@heroicons/vue/20/solid';
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

	const steps = [
		{ name: 'Match', href: '#', status: 'complete' },
		{ name: 'Submit', href: '#', status: 'current' },
		{ name: 'Build', href: '#', status: 'upcoming' },
		{ name: 'Ship', href: '#', status: 'upcoming' },
	];
</script>
