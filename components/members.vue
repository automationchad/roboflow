<template>
	<div>
		<main class="py-10">
			<div class="">
				<div class="bg-slate-900 p-6">
					<div class="flex items-center border-b border-slate-700 pb-4">
						<div class="flex-auto">
							<h1
								class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
							>
								Members
							</h1>
						</div>
						<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<button
								type="button"
								class="flex items-center rounded-md bg-indigo-600 py-2 px-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-800"
							>
								<PlusCircleIcon class="mr-2 h-5 w-5" />
								Add
							</button>
						</div>
					</div>
					<div class="mt-8">
						<ul>
							<li
								v-for="person in User.Account.User"
								:key="person.email"
								class="flex items-center justify-between"
							>
								<div class="flex items-center">
									<img
										class="h-10 w-10 rounded-full"
										src="https://lh3.googleusercontent.com/a-/ACB-R5TTqPhkUP-vcn7xt5m8mvEJT_VcGEgyESDLBtw3sujEXNMq_mTUPz4201MRcwHhlkXtuoCRoTSuZ9AZlo5JsYOoIpwfsKfwXXcZw4E9gf4ig_TMomyB-YgySd0yVAqQr4-D8Pty1bnr_6crM7OcBY6vGp9LMN8DB7pF0K7RgoiGoJ0_txrgF_UzqCHs34xqM-hRj4iPZBhCTFOFnbXIsaGfLMyfElVKBAluaY75C1tSP3NkxSbzSsWRIGRGXcz-poVxKQjR4_dwvCLi97DSKM1Yzw4Qt13aSLsSHPxXT49oa3gM7lBjX5ARYy0hUKlV7VyUAJKHjO-_be4vJBhMPW_Nt7I5b5BSqX3IEDfjSVdlQue_CU2t-plxLiPmfVl9wuB6vsroGsoOnOjK4HZCMkGOoHxE40rx0einTiVJHkqDRg2aWQhNXRv2-x8kGaFk9pTesQOPtUE04uPqsd-f_Dg-nXfMBVMV4LDschhSorO5NoBnSAIBiX4Ccz5o7rlC_gFIh5FizoO2c0u6gW90WlYkA3kOlgKhocF5IxBpAhCTnrl4juZPDsSSugT_xVEeXQoGn18aPhNtnGtgDWsFKOjwPfK0HQFrBPj2p8jaTwoUNBqvfmsjqLhTuh1ncYwToTs9r6QKkIhk2LlcLXe5S3Qcy225BLRVnemLOSARC60xe62RjFC4_YlpXznL10XhKVXdmnM5CjZsEzHXrl721pZy4g68ozcgTbMGgectfzNA7Sx3WnaThqsHXFaA0pB0AdbffdLRqCi8j909_uTvGMCDOuktY9DZuQLtbGv9kgvEpn0JxcI6ODtEXejTxjftRbHJRWtgIpqPgtmGusCNHrtzXhF7wRR66L0kshqP3i1KRjhI_uSAVv1NKWsnMCXMruinTjVSvN5KI5P_fkO1aGFv5E-68XZS8gy-6UAVHCLufrmCm0ieE1ioZEaZ=s96-c"
										alt=""
									/>
								</div>
								<div class="ml-4 flex-grow">
									<div class="flex flex-col space-x-2 text-white">
										{{ person.firstName }} {{ person.lastName }}
										{{ person.id === user.id ? '(You)' : '' }}
										<small class="text-slate-300">{{ person.email }}</small>
									</div>
								</div>
								<div class="flex flex-grow-0 space-x-4 pl-8">
									<Listbox
										as="div"
										v-model="selected"
										disabled
										class="w-[160px]"
									>
										<div class="relative">
											<ListboxButton
												class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:cursor-not-allowed dark:bg-transparent dark:text-slate-400 dark:ring-slate-700 sm:text-sm sm:leading-6"
											>
												<span class="block truncate">{{ selected.name }}</span>
												<span
													class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
												>
													<ChevronDownIcon
														class="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</span>
											</ListboxButton>

											<transition
												leave-active-class="transition ease-in duration-100"
												leave-from-class="opacity-100"
												leave-to-class="opacity-0"
											>
												<ListboxOptions
													class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
												>
													<ListboxOption
														as="template"
														v-for="person in people"
														:key="person.id"
														:value="person"
														v-slot="{ active, selected }"
													>
														<li
															:class="[
																active
																	? 'bg-indigo-600 text-white'
																	: 'text-gray-900',
																'relative cursor-default select-none py-2 pl-3 pr-9',
															]"
														>
															<span
																:class="[
																	selected ? 'font-semibold' : 'font-normal',
																	'block truncate',
																]"
																>{{ person.name }}</span
															>

															<span
																v-if="selected"
																:class="[
																	active ? 'text-white' : 'text-indigo-600',
																	'absolute inset-y-0 right-0 flex items-center pr-4',
																]"
															>
																<CheckIcon class="h-5 w-5" aria-hidden="true" />
															</span>
														</li>
													</ListboxOption>
												</ListboxOptions>
											</transition>
										</div>
									</Listbox>
									<button
										class="rounded-lg bg-slate-700 p-2 text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-800"
										:disabled="true"
									>
										<TrashIcon class="h-5 w-5" />
									</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
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
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		PlusCircleIcon,
		ChartPieIcon,
		Cog6ToothIcon,
		DocumentDuplicateIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		TrashIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
		Account (
	     id,
		 User (
			*
		 )
	   )
	 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	// const { data: images } = await client.storage
	// 	.from('images')
	// 	.list(`blueprints/${event.context.params.id}`, {
	// 		limit: 100,
	// 		offset: 0,
	// 		sortBy: { column: 'name', order: 'asc' },
	// 	});
	const people = [
		{ id: 1, name: 'Owner' },
		{ id: 2, name: 'Arlene Mccoy' },
	];

	const selected = ref(people[0]);
	console.log(User);
</script>
