<template>
	<Menu as="div" class="relative inline-block w-full">
		<div
			class="inline-flex w-full justify-start gap-x-1.5 rounded-md bg-white px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-slate-800 dark:bg-slate-900"
		>
			<div
				class="relative inline-flex w-full items-center justify-start rounded-md"
			>
				<MenuButton
					><svg
						:class="['h-6 w-6 text-[#9382ff] transition-colors duration-200']"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.75 13C14 13 14 7.75 14 7.75C14 7.75 14 13 18.25 13C14 13 14 18.25 14 18.25C14 18.25 14 13 9.75 13Z"
							fill="currentColor"
						></path>
						<path
							d="M5.75 8C8 8 8 5.75 8 5.75C8 5.75 8 8 10.25 8C8 8 8 10.25 8 10.25C8 10.25 8 8 5.75 8Z"
							fill="currentColor"
						></path>
						<path
							d="M7.75 16.25H7.76M18.25 5.75H18.26M18.25 18.25H18.26M14 7.75C14 7.75 14 13 9.75 13C14 13 14 18.25 14 18.25C14 18.25 14 13 18.25 13C14 13 14 7.75 14 7.75ZM8 5.75C8 5.75 8 8 5.75 8C8 8 8 10.25 8 10.25C8 10.25 8 8 10.25 8C8 8 8 5.75 8 5.75Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path></svg
				></MenuButton>
				<input
					:disabled="loading"
					type="text"
					name="account-number"
					id="account-number"
					:class="[
						loading
							? 'placeholder:text-[#9382ff]'
							: 'placeholder:text-gray-400',
						'block w-full border-0 bg-transparent py-1.5 pr-4 font-normal text-white placeholder:font-normal  focus:border-0 focus:ring-0 sm:text-sm sm:leading-6',
					]"
					:placeholder="
						loading ? 'AI is writing...' : 'Ask Tracy to write anything...'
					"
				/>

				<button
					class="text-gray-500 transition-colors hover:text-[#9382ff]"
					@click="loading = !loading"
				>
					<ArrowUpCircleIcon class="h-5 w-5" />
				</button>
			</div>
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
				class="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="py-1">
					<div class="flex items-center px-4 py-2 text-xs font-medium">
						Generate from ticket
					</div>
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<svg
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M11.25 11.25C11.25 12.3546 10.3546 13.25 9.25 13.25H6.75C5.64543 13.25 4.75 12.3546 4.75 11.25V9.06349C4.75 8.2262 5.09991 7.427 5.71516 6.85908L8 4.75V7.75H9.25C10.3546 7.75 11.25 8.64543 11.25 9.75V11.25Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M19.25 17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H14.75C13.6454 19.25 12.75 18.3546 12.75 17.25V15.0635C12.75 14.2262 13.0999 13.427 13.7152 12.8591L16 10.75V13.75H17.25C18.3546 13.75 19.25 14.6454 19.25 15.75V17.25Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>
							Summarize
						</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<svg
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.25 9.25V6.75C9.25 6.19772 8.80228 5.75 8.25 5.75H5.75C5.19772 5.75 4.75 6.19772 4.75 6.75V9.25C4.75 9.80228 5.19772 10.25 5.75 10.25H8.25C8.80228 10.25 9.25 9.80228 9.25 9.25Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M9.25 18.25H5.75C5.19772 18.25 4.75 17.8023 4.75 17.25V13.75"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 6.75H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 14.75H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 9.25H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 17.25H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M8 16.25L7.42383 16.7301C7.59297 16.9331 7.85641 17.0321 8.11735 16.9908C8.37829 16.9494 8.59824 16.7738 8.69636 16.5285L8 16.25ZM10.8011 13.2587C11.0821 12.9543 11.0631 12.4799 10.7587 12.1989C10.4543 11.9179 9.97985 11.9369 9.6989 12.2413L10.8011 13.2587ZM7.32617 14.2699C7.06099 13.9517 6.58807 13.9087 6.26986 14.1738C5.95165 14.439 5.90866 14.9119 6.17383 15.2301L7.32617 14.2699ZM8.69636 16.5285C9.03866 15.6728 9.56133 14.855 10.0115 14.2398C10.2345 13.9351 10.4349 13.6865 10.5785 13.5152C10.6503 13.4296 10.7076 13.3637 10.7462 13.32C10.7655 13.2981 10.7801 13.2819 10.7894 13.2716C10.7941 13.2664 10.7974 13.2627 10.7994 13.2606C10.8004 13.2595 10.801 13.2588 10.8013 13.2585C10.8015 13.2583 10.8015 13.2583 10.8015 13.2583C10.8015 13.2583 10.8014 13.2584 10.8014 13.2584C10.8013 13.2585 10.8013 13.2585 10.8012 13.2586C10.8012 13.2586 10.8011 13.2587 10.25 12.75C9.6989 12.2413 9.69881 12.2414 9.69872 12.2415C9.69868 12.2415 9.69858 12.2416 9.6985 12.2417C9.69835 12.2419 9.69817 12.2421 9.69797 12.2423C9.69757 12.2427 9.69708 12.2433 9.6965 12.2439C9.69534 12.2452 9.69382 12.2468 9.69194 12.2489C9.68819 12.253 9.68303 12.2587 9.67653 12.2658C9.66352 12.2802 9.64515 12.3007 9.62195 12.327C9.57558 12.3795 9.50986 12.4551 9.42926 12.5512C9.26825 12.7432 9.04679 13.0181 8.80098 13.354C8.31367 14.02 7.71134 14.9522 7.30364 15.9715L8.69636 16.5285ZM6.17383 15.2301L7.42383 16.7301L8.57617 15.7699L7.32617 14.2699L6.17383 15.2301Z"
									fill="currentColor"
								></path>
							</svg>

							Find action items
						</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<svg
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.25 9.25V6.75C9.25 6.19772 8.80228 5.75 8.25 5.75H5.75C5.19772 5.75 4.75 6.19772 4.75 6.75V9.25C4.75 9.80228 5.19772 10.25 5.75 10.25H8.25C8.80228 10.25 9.25 9.80228 9.25 9.25Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M9.25 18.25H5.75C5.19772 18.25 4.75 17.8023 4.75 17.25V13.75"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 6.75H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 14.75H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 9.25H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 17.25H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M8 16.25L7.42383 16.7301C7.59297 16.9331 7.85641 17.0321 8.11735 16.9908C8.37829 16.9494 8.59824 16.7738 8.69636 16.5285L8 16.25ZM10.8011 13.2587C11.0821 12.9543 11.0631 12.4799 10.7587 12.1989C10.4543 11.9179 9.97985 11.9369 9.6989 12.2413L10.8011 13.2587ZM7.32617 14.2699C7.06099 13.9517 6.58807 13.9087 6.26986 14.1738C5.95165 14.439 5.90866 14.9119 6.17383 15.2301L7.32617 14.2699ZM8.69636 16.5285C9.03866 15.6728 9.56133 14.855 10.0115 14.2398C10.2345 13.9351 10.4349 13.6865 10.5785 13.5152C10.6503 13.4296 10.7076 13.3637 10.7462 13.32C10.7655 13.2981 10.7801 13.2819 10.7894 13.2716C10.7941 13.2664 10.7974 13.2627 10.7994 13.2606C10.8004 13.2595 10.801 13.2588 10.8013 13.2585C10.8015 13.2583 10.8015 13.2583 10.8015 13.2583C10.8015 13.2583 10.8014 13.2584 10.8014 13.2584C10.8013 13.2585 10.8013 13.2585 10.8012 13.2586C10.8012 13.2586 10.8011 13.2587 10.25 12.75C9.6989 12.2413 9.69881 12.2414 9.69872 12.2415C9.69868 12.2415 9.69858 12.2416 9.6985 12.2417C9.69835 12.2419 9.69817 12.2421 9.69797 12.2423C9.69757 12.2427 9.69708 12.2433 9.6965 12.2439C9.69534 12.2452 9.69382 12.2468 9.69194 12.2489C9.68819 12.253 9.68303 12.2587 9.67653 12.2658C9.66352 12.2802 9.64515 12.3007 9.62195 12.327C9.57558 12.3795 9.50986 12.4551 9.42926 12.5512C9.26825 12.7432 9.04679 13.0181 8.80098 13.354C8.31367 14.02 7.71134 14.9522 7.30364 15.9715L8.69636 16.5285ZM6.17383 15.2301L7.42383 16.7301L8.57617 15.7699L7.32617 14.2699L6.17383 15.2301Z"
									fill="currentColor"
								></path>
							</svg>

							Create audit
						</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<svg
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.25 9.25V6.75C9.25 6.19772 8.80228 5.75 8.25 5.75H5.75C5.19772 5.75 4.75 6.19772 4.75 6.75V9.25C4.75 9.80228 5.19772 10.25 5.75 10.25H8.25C8.80228 10.25 9.25 9.80228 9.25 9.25Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M9.25 18.25H5.75C5.19772 18.25 4.75 17.8023 4.75 17.25V13.75"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 6.75H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 14.75H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 9.25H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M12.75 17.25H19.25"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
								<path
									d="M8 16.25L7.42383 16.7301C7.59297 16.9331 7.85641 17.0321 8.11735 16.9908C8.37829 16.9494 8.59824 16.7738 8.69636 16.5285L8 16.25ZM10.8011 13.2587C11.0821 12.9543 11.0631 12.4799 10.7587 12.1989C10.4543 11.9179 9.97985 11.9369 9.6989 12.2413L10.8011 13.2587ZM7.32617 14.2699C7.06099 13.9517 6.58807 13.9087 6.26986 14.1738C5.95165 14.439 5.90866 14.9119 6.17383 15.2301L7.32617 14.2699ZM8.69636 16.5285C9.03866 15.6728 9.56133 14.855 10.0115 14.2398C10.2345 13.9351 10.4349 13.6865 10.5785 13.5152C10.6503 13.4296 10.7076 13.3637 10.7462 13.32C10.7655 13.2981 10.7801 13.2819 10.7894 13.2716C10.7941 13.2664 10.7974 13.2627 10.7994 13.2606C10.8004 13.2595 10.801 13.2588 10.8013 13.2585C10.8015 13.2583 10.8015 13.2583 10.8015 13.2583C10.8015 13.2583 10.8014 13.2584 10.8014 13.2584C10.8013 13.2585 10.8013 13.2585 10.8012 13.2586C10.8012 13.2586 10.8011 13.2587 10.25 12.75C9.6989 12.2413 9.69881 12.2414 9.69872 12.2415C9.69868 12.2415 9.69858 12.2416 9.6985 12.2417C9.69835 12.2419 9.69817 12.2421 9.69797 12.2423C9.69757 12.2427 9.69708 12.2433 9.6965 12.2439C9.69534 12.2452 9.69382 12.2468 9.69194 12.2489C9.68819 12.253 9.68303 12.2587 9.67653 12.2658C9.66352 12.2802 9.64515 12.3007 9.62195 12.327C9.57558 12.3795 9.50986 12.4551 9.42926 12.5512C9.26825 12.7432 9.04679 13.0181 8.80098 13.354C8.31367 14.02 7.71134 14.9522 7.30364 15.9715L8.69636 16.5285ZM6.17383 15.2301L7.42383 16.7301L8.57617 15.7699L7.32617 14.2699L6.17383 15.2301Z"
									fill="currentColor"
								></path>
							</svg>

							Create SOW
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
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Archive
						</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<ArrowRightCircleIcon
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Move
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
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Share
						</a>
					</MenuItem>
					<MenuItem v-slot="{ active }">
						<a
							href="#"
							:class="[
								active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
								'group flex items-center px-4 py-2 text-sm',
							]"
						>
							<HeartIcon
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Add to favorites
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
							<TrashIcon
								class="mr-3 h-5 w-5 text-[#9382ff] group-hover:text-gray-500"
								aria-hidden="true"
							/>
							Delete
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
		ArrowUpCircleIcon,
		ChevronDownIcon,
		DocumentDuplicateIcon,
		HeartIcon,
		PencilSquareIcon,
		TrashIcon,
		UserPlusIcon,
	} from '@heroicons/vue/20/solid';

	const loading = ref(false);
</script>
