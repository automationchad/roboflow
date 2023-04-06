<template>
	<div class="">
		<Menu as="div" class="relative text-sm">
			<div>
				<MenuButton class="-m-1.5 flex items-center p-1.5 text-slate-500">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full text-xs"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt=""
					>
						<QuestionMarkCircleIcon class="h-5 w-5" />
					</div>
					<span class="hidden lg:flex lg:items-center">
						<span
							style="font-weight: 100"
							class="ml-4 text-sm leading-6 dark:text-slate-900"
							aria-hidden="true"
							>Help</span
						>
					</span>
				</MenuButton>
			</div>

			<transition
				enter-active-class="transition duration-100 ease-out"
				enter-from-class="transform scale-95 opacity-0"
				enter-to-class="transform scale-100 opacity-100"
				leave-active-class="transition duration-75 ease-in"
				leave-from-class="transform scale-100 opacity-100"
				leave-to-class="transform scale-95 opacity-0"
			>
				<MenuItems
					class="absolute bottom-16  mt-2 w-56 origin-bottom-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="px-1 py-1 space-y-1">
						<MenuItem v-slot="{ active }">
							<a
								href="/docs/quickstart-guide"
								:class="[
									active ? 'bg-slate-50 text-slate-900' : 'text-slate-800',
									'group flex w-full items-center rounded-md px-2 py-2 text-sm',
								]"
							>
								<BookOpenIcon
									:active="active"
									class="mr-2 h-5 w-5 group-hover:text-indigo-600"
									aria-hidden="true"
								/>
								Quickstart guide
							</a>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<a href="/documentation"
								:class="[
									active ? 'bg-slate-50 text-slate-900' : 'text-slate-800',
									'group flex w-full items-center rounded-md px-2 py-2 text-sm',
								]"
							>
								<DocumentTextIcon
									:active="active"
									class="mr-2 h-5 w-5 group-hover:text-indigo-600"
									aria-hidden="true"
								/>
								Documentation portal
							</a>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-slate-50 text-slate-900' : 'text-slate-800',
									'group flex w-full items-center rounded-md px-2 py-2 text-sm',
								]"
							>
								<DocumentTextIcon
									:active="active"
									class="mr-2 h-5 w-5 group-hover:text-indigo-600"
									aria-hidden="true"
								/>
								What's new
							</button>
						</MenuItem>
					</div>
					<div class="px-1 py-1 space-y-1">
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-slate-50 text-slate-900' : 'text-slate-800',
									'group flex w-full items-center rounded-md px-2 py-2 text-sm',
								]"
							>
								<ChatBubbleOvalLeftIcon
									:active="active"
									class="mr-2 h-5 w-5 group-hover:text-indigo-600"
									aria-hidden="true"
								/>
								Share feedback
							</button>
						</MenuItem>
						<MenuItem v-slot="{ active }">
							<button
								:class="[
									active ? 'bg-slate-50 text-slate-900' : 'text-slate-800',
									'group flex w-full items-center rounded-md px-2 py-2 text-sm',
								]"
							>
								<slackmark
									:active="active"
									class="mr-2 h-4 w-4"
									aria-hidden="true"
								/>
								Join Slack community
							</button>
						</MenuItem>
					</div>
				</MenuItems>
			</transition>
		</Menu>
	</div>
</template>

<script setup>
	import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
	import slackmark from '~/assets/images/logos/slackmark.vue';
	import {
		ChevronDownIcon,
		ArchiveIcon,
		QuestionMarkCircleIcon,
		ChatBubbleOvalLeftIcon,
		DocumentTextIcon,
		BookOpenIcon,
	} from '@heroicons/vue/24/outline';
    
</script>
