<template>
	<Menu as="div" class="relative inline-block w-full text-left">
		<div
			class="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-[#0A80F6] overflow-hidden text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-white/10"
		>
			<MenuButton class="h-full w-3/4 hover:bg-white/5 px-3 py-2 ">
				Add Deals
			</MenuButton>
			<MenuButton class="px-3 py-2 w-1/4 hover:bg-white/5 flex justify-end text-right">
				<ChevronDownIcon
					class="-mr-1 h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
			</MenuButton>
		</div>

		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<MenuItems
				class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="py-1">
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<PencilSquareIcon
								class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Add single
						</a>
					</MenuItem>
				</div>
				<div class="py-1">
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<ArchiveBoxIcon
								class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Import spreadsheet
						</a>
					</MenuItem>
				</div>
				<div class="py-1">
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<UserPlusIcon
								class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Share a win
						</a>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script setup>
	import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
	import {
		ArchiveBoxIcon,
		ArrowRightCircleIcon,
		ChevronDownIcon,
		DocumentDuplicateIcon,
		HeartIcon,
		PencilSquareIcon,
		TrashIcon,
		UserPlusIcon,
	} from '@heroicons/vue/20/solid';
</script>
