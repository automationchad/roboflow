<template>
	<div>
		<main class="py-10">
			<div class="">
				<div class="p-6 dark:bg-slate-900">
					<Disclosure
						as="div"
						class="border-b border-slate-300 pb-4 dark:border-slate-700"
						v-slot="{ open }"
						><div class="flex items-center">
							<div class="flex-auto">
								<h1
									class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
								>
									Members
								</h1>
							</div>
							<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
								<DisclosureButton
									v-if="!open"
									type="button"
									class="flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm font-normal shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-transparent dark:bg-slate-800 dark:text-white"
								>
									<PlusCircleIcon class="mr-2 h-5 w-5" /> Add
								</DisclosureButton>
								<DisclosureButton
									v-else
									class="flex items-center rounded-md border border-slate-300 py-2 px-2 text-center text-sm font-normal shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-transparent dark:bg-slate-800 dark:text-white"
									><XMarkIcon class="h-5 w-5"
								/></DisclosureButton>
							</div>
						</div>
						<DisclosurePanel
							class="flex flex-grow items-center justify-between pt-4 pb-2 text-sm text-gray-500"
						>
							<div class="w-full">
								<label for="email" class="block text-sm leading-6 text-gray-900"
									>Email</label
								>
								<div class="mt-2 flex justify-between">
									<input
										v-model="inviteeEmail"
										type="email"
										name="email"
										id="email"
										class="mr-2 block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="you@example.com"
									/>
									<DisclosureButton
										@click="sendInvitation()"
										class="rounded-md bg-indigo-600 p-2 text-white"
									>
										<CheckIcon class="h-5 w-5" />
									</DisclosureButton>
								</div>
							</div>
						</DisclosurePanel>
					</Disclosure>

					<div class="mt-8">
						<ul class="space-y-4">
							<li
								v-for="person in moveUserToFront(
									User.Account.User.concat(Invitation)
								)"
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
									<div
										class="flex flex-col space-x-2 dark:text-white"
										v-if="!person.token"
									>
										{{ person.firstName }} {{ person.lastName }}
										{{ person.id === user.id ? '(You)' : ''
										}}<small class="text-gray-700 dark:text-slate-300">{{
											person.email
										}}</small>
									</div>
									<div class="" v-else>{{ person.email }}</div>
								</div>
								<div class="flex flex-grow-0 space-x-4 pl-8">
									<Listbox
										as="div"
										:disabled="person.id === user.id"
										class="w-[160px]"
									>
										<div class="relative">
											<ListboxButton
												class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:bg-transparent dark:text-slate-400 dark:ring-slate-700 sm:text-sm sm:leading-6"
											>
												<span class="block truncate capitalize">{{
													person.systemRole
												}}</span>
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
														v-for="role in roles"
														:key="role.id"
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
																	person.systemRole === role.id
																		? 'font-semibold'
																		: 'font-normal',
																	'block truncate',
																]"
																>{{ role.name }}</span
															>

															<span
																v-if="person.systemRole === role.id"
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
										class="rounded-lg p-2 text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-600 dark:bg-slate-700 dark:text-slate-400 dark:disabled:bg-slate-800"
										:disabled="person.id === user.id"
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
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
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
		CheckIcon,
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

	let { data: Invitation, error } = await supabase
		.from('Invitation')
		.select('*')
		.eq('account', User.Account.id);

	function moveUserToFront(arr) {
		const orgIndex = arr.findIndex((obj) => obj.id === user.value.id);
		if (orgIndex > -1) {
			const orgObj = arr.splice(orgIndex, 1)[0];
			arr.unshift(orgObj);
		}
		return arr;
	}

	const inviteeEmail = ref('');

	function addMemberModifier(email) {
		const atIndex = email.indexOf('@');
		if (atIndex === -1) {
			// If the email doesn't contain an '@' symbol, it's not a valid email
			return null;
		}

		const username = email.slice(0, atIndex);
		const domain = email.slice(atIndex);

		return username + '+member' + domain;
	}

	const sendInvitation = async () => {
		const { data: invitation, error } = await supabase
			.from('Invitation')
			.insert([
				{
					email: addMemberModifier(inviteeEmail.value),
					account: User.accountId,
				},
			])
			.select('*');
		if (error) {
			alert(error);
			console.error(error);
			return;
		}
		const invitationLink = `https://example.com/signup?token=${invitation.token}`;
		const emailBody = `You've been invited to join our Supabase account! Click this link to sign up: ${invitationLink}`;
		// Send email using your preferred email service or library
	};

	const roles = [
		{ id: 'owner', name: 'Owner' },
		{ id: 'admin', name: 'Administrator' },
		{ id: 'member', name: 'Member' },
	];
</script>
