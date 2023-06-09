<template>
	<div>
		<main class="max-w-5xl">
			<div class="">
				<div class="dark:bg-slate-900">
					<Disclosure
						as="div"
						class="border-b border-slate-300 pb-4 dark:border-slate-700"
						v-slot="{ open }"
						><div class="flex items-center justify-start">
							<div class="flex-auto">
								<h1
									class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
								>
									Members
								</h1>
							</div>
							<div class="group relative sm:mt-0 sm:flex-none">
								<div
									v-if="isAddingDisabled"
									id="tooltip-default"
									role="tooltip"
									class="absolute bottom-0 left-1/2 z-10 m-4 mx-auto flex w-[200px] -translate-x-1/2 translate-y-full flex-col rounded-lg border border-slate-300 bg-white px-4 py-4 text-xs font-normal text-slate-500 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 dark:border-slate-800 dark:bg-gray-900 dark:text-white"
								>
									<span class="text-left text-slate-900 dark:text-white">
										As a "<span class="capitalize">{{ User.systemRole }}</span
										>" you don't have permissions to send invites.
									</span>
								</div>
								<DisclosureButton
									:disabled="isAddingDisabled"
									v-if="!open"
									type="button"
									class="flex items-center rounded-md border border-slate-300 px-4 py-2 text-center text-sm font-normal shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-transparent dark:bg-slate-800 dark:text-white"
								>
									<PlusCircleIcon class="mr-2 h-5 w-5" /> Add
								</DisclosureButton>

								<DisclosureButton
									v-else
									class="flex items-center rounded-md border border-slate-300 px-2 py-2 text-center text-sm font-normal shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-transparent dark:bg-slate-800 dark:text-white"
									><XMarkIcon class="h-5 w-5"
								/></DisclosureButton>
							</div>
						</div>
						<DisclosurePanel
							class="flex flex-grow items-center justify-between pb-2 pt-4 text-sm text-gray-500"
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
										class="mr-2 block w-full rounded-md border-0 bg-gray-50 py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
								v-for="person in users"
								:key="person.email"
								v-if="users.length > 0"
								class="flex items-center justify-between"
							>
								<div class="flex items-center">
									<img
										class="h-8 w-8 rounded-full"
										src="https://lh3.googleusercontent.com/a-/ACB-R5TTqPhkUP-vcn7xt5m8mvEJT_VcGEgyESDLBtw3sujEXNMq_mTUPz4201MRcwHhlkXtuoCRoTSuZ9AZlo5JsYOoIpwfsKfwXXcZw4E9gf4ig_TMomyB-YgySd0yVAqQr4-D8Pty1bnr_6crM7OcBY6vGp9LMN8DB7pF0K7RgoiGoJ0_txrgF_UzqCHs34xqM-hRj4iPZBhCTFOFnbXIsaGfLMyfElVKBAluaY75C1tSP3NkxSbzSsWRIGRGXcz-poVxKQjR4_dwvCLi97DSKM1Yzw4Qt13aSLsSHPxXT49oa3gM7lBjX5ARYy0hUKlV7VyUAJKHjO-_be4vJBhMPW_Nt7I5b5BSqX3IEDfjSVdlQue_CU2t-plxLiPmfVl9wuB6vsroGsoOnOjK4HZCMkGOoHxE40rx0einTiVJHkqDRg2aWQhNXRv2-x8kGaFk9pTesQOPtUE04uPqsd-f_Dg-nXfMBVMV4LDschhSorO5NoBnSAIBiX4Ccz5o7rlC_gFIh5FizoO2c0u6gW90WlYkA3kOlgKhocF5IxBpAhCTnrl4juZPDsSSugT_xVEeXQoGn18aPhNtnGtgDWsFKOjwPfK0HQFrBPj2p8jaTwoUNBqvfmsjqLhTuh1ncYwToTs9r6QKkIhk2LlcLXe5S3Qcy225BLRVnemLOSARC60xe62RjFC4_YlpXznL10XhKVXdmnM5CjZsEzHXrl721pZy4g68ozcgTbMGgectfzNA7Sx3WnaThqsHXFaA0pB0AdbffdLRqCi8j909_uTvGMCDOuktY9DZuQLtbGv9kgvEpn0JxcI6ODtEXejTxjftRbHJRWtgIpqPgtmGusCNHrtzXhF7wRR66L0kshqP3i1KRjhI_uSAVv1NKWsnMCXMruinTjVSvN5KI5P_fkO1aGFv5E-68XZS8gy-6UAVHCLufrmCm0ieE1ioZEaZ=s96-c"
										alt=""
									/>
								</div>
								<div class="ml-4 flex-grow">
									<NuxtLink
										:to="`/profile/${person.id}`"
										class="flex flex-col space-x-2 text-sm dark:text-white"
										v-if="!person.token"
									>
										{{ person.firstName }} {{ person.lastName }}
										{{ person.id === user.id ? '(You)' : ''
										}}<small class="text-gray-700 dark:text-slate-300">{{
											person.email
										}}</small>
									</NuxtLink>
									<div class="text-sm dark:text-white" v-else>
										{{ person.email }}
									</div>
								</div>
								<div
									class="flex flex-grow-0 items-center space-x-4 pl-8 text-sm"
								>
									<div class="flex items-center space-x-4" v-if="person.token">
										<div class="text-slate-400">Invite pending</div>
										<button @click="copyToClipboard(person.confirm_url)">
											<LinkIcon class="h-5 w-5 text-slate-400" />
										</button>
									</div>

									<Listbox
										as="div"
										class="w-[160px]"
										v-model="selectedRoles[person.id]"
									>
										<div class="relative">
											<ListboxButton
												:disabled="isEditRoleDisabled(person)"
												class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 dark:bg-transparent dark:text-slate-400 dark:ring-slate-700 dark:disabled:bg-slate-600 sm:text-sm sm:leading-6"
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
														v-slot="{ active }"
													>
														<li
															@click="editUserRole(person.id, role.id)"
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
										:disabled="isDeleteDisabled(person)"
										@click="deleteUser(person)"
									>
										<TrashIcon class="h-5 w-5" />
									</button>
								</div>
							</li>
							<li v-else class="flex items-center justify-center text-sm">No users</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<SuccessModal
				v-if="is_success"
				@close="is_success = false"
				:title="success_message"
				:description="''"
			/>
		</transition>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<ErrorModal
				v-if="is_error"
				@close="is_error = false"
				:title="'Error: '"
				:description="error_message"
			/>
		</transition>
	</div>
</template>

<script setup>
	import { reactive, ref, watch, watchEffect } from 'vue';

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
		LinkIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');

	let selectedRoles = reactive({});

	const { data: accountData, error: accountError } = await supabase
		.from('Account')
		.select(
			`id, User(
			*
			)`
		)
		.eq('id', route.params.organization)
		.limit(1)
		.single();

	let { data: Invitation, error: InvitationError } = await supabase
		.from('Invitation')
		.select('*')
		.eq('account', route.params.organization);

	const users = ref(moveUserToFront(accountData.User.concat(Invitation)));

	for (let user of users.value) {
		selectedRoles[user.id] = ref(user.systemRole);
	}

	watchEffect(() => {
		for (let user of users.value) {
			selectedRoles[user.id] = ref(user.systemRole);
		}
	});

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

	watch(
		selectedRoles,
		async (newRoles, oldRoles) => {
			for (let userId in newRoles) {
				if (newRoles[userId] !== oldRoles[userId]) {
					// The role for this user has changed, so update the backend.
					await editUserRole(userId, newRoles[userId]);
				}
			}
		},
		{ deep: true }
	);

	let { data: Scopes, error: ScopesError } = await supabase
		.from('Scopes')
		.select('*')
		.eq('systemRole', User.systemRole)
		.single();

	const isAddingDisabled = computed(() => {
		const currentUserScopes = Scopes.scopes.split(',');

		// Check if the current user has the 'users:add' scope
		if (!currentUserScopes.includes('users:create')) return true;

		// Check if the current user is a viewer
		if (User.systemRole === 'viewer') return true;

		return false;
	});

	const isEditRoleDisabled = (selectedUser) => {
		const currentUserScopes = Scopes.scopes.split(',');

		// Check if the current user has the 'users:edit' scope
		if (!currentUserScopes.includes('users:edit')) return true;

		if (selectedUser.status === 'pending') return true;

		// Check if the current user is trying to edit their own role
		if (user.value.id === selectedUser.id) return true;

		// Check if the current user is an admin and the selected user is an owner
		if (User.systemRole === 'admin' && selectedUser.systemRole === 'owner')
			return true;

		// Check if the current user is a contributor or viewer
		// Add the relevant checks here

		return false;
	};

	const isDeleteDisabled = (selectedUser) => {
		const currentUserScopes = Scopes.scopes.split(',');

		// Check if the current user has the 'users:delete' scope
		if (!currentUserScopes.includes('users:delete')) return true;

		// Check if the current user is trying to delete their own account
		if (user.value.id === selectedUser.id) return true;

		// Check if the current user is an admin and the selected user is an owner
		if (User.systemRole === 'admin' && selectedUser.systemRole === 'owner')
			return true;

		// Check if the current user is a contributor or viewer
		// Add the relevant checks here

		return false;
	};

	function moveUserToFront(arr) {
		const orgIndex = arr.findIndex((obj) => obj.id === user.value.id);
		if (orgIndex > -1) {
			const orgObj = arr.splice(orgIndex, 1)[0];
			arr.unshift(orgObj);
		}
		return arr;
	}

	const inviteeEmail = ref('');

	const copyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text) // write the text to the clipboard
			.then(() => {
				console.log('Text copied to clipboard'); // log a message indicating that the text was copied
			})
			.catch((err) => {
				console.error('Error copying text to clipboard: ', err); // log an error message if there was an error copying the text
			});
	};

	// Function to edit user role
	async function editUserRole(userId, newRole) {
		if (isEditRoleDisabled(userId)) {
			console.error('User is not allowed to edit roles');
			return;
		}

		const { error } = await supabase
			.from('User')
			.update({ systemRole: newRole })
			.eq('id', userId);

		if (error) {
			is_success.value = false;
			is_error.value = true;
			error_message.value = 'Error updating user role';
			console.error('Error updating user role:', error);
		} else {
			// Update the local user data as well
			const user = users.value.find((u) => u.id === userId);
			if (user) {
				user.systemRole = newRole;
			}
			is_success.value = true;
			success_message.value = 'User role updated successfully';
			console.log('User role updated successfully');
		}
	}

	// Function to delete user
	async function deleteUser(person) {
		if (isDeleteDisabled(person)) {
			console.error('User is not allowed to be deleted');
			return;
		}

		let error;

		if (person.status === 'pending') {
			const response = await supabase
				.from('Invitation')
				.delete()
				.eq('id', person.id);

			error = response.error;
		} else {
			const response = await supabase.from('User').delete().eq('id', person.id);

			error = response.error;
		}

		if (error) {
			is_success.value = false;
			is_error.value = true;
			error_message.value = error.message || error.toString();;
			console.error('Error deleting user:', error);
		} else {
			// Update the local user data as well
			users.value = users.value.filter((u) => u.id !== person.id);
			is_success.value = true;
			success_message.value = 'User deleted successfully';
			console.log('User deleted successfully');
		}
	}

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
		try {
			// Try to insert the invitation
			const { data: invitation, error } = await supabase
				.from('Invitation')
				.insert([
					{
						email: inviteeEmail.value,
						systemRole: 'contributor',
						createdBy: user.value.id,
						expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
						account: route.params.organization,
					},
				])
				.select('*');
			// If there was an error inserting the invitation, log the error and alert the user
			if (error) {
				is_success.value = false;
				error_message.value = error.message || error.toString();
				is_error.value = true;
				inviteeEmail.value = '';
				console.error('Error inserting invitation:', error);
				return;
			} else {
				// Update the local invitations data as well
				users.value.push(invitation[0]);
				is_error.value = false;
				inviteeEmail.value = '';
				success_message.value = 'Invitation sent successfully';
				is_success.value = true;
				console.log('Invitation sent successfully');
			}

			// Create the invitation link and email body
			const invitationLink = `https://example.com/signup?token=${invitation.token}`;
			const emailBody = `You've been invited to join our Supabase account! Click this link to sign up: ${invitationLink}`;

			// Send email using your preferred email service or library
		} catch (error) {
			// Catch any unexpected errors and log them
			is_success.value = false;
			is_error.value = true;
			error_message.value =
				'An unexpected error occurred:' + error.message || error.toString();
			console.error('An unexpected error occurred:', error);
		}
	};

	const roles = [
		{ id: 'super_admin', name: 'Super Admin' },
		{ id: 'owner', name: 'Owner' },
		{ id: 'admin', name: 'Administrator' },
		{ id: 'contributor', name: 'Contributor' },
		{ id: 'viewer', name: 'Viewer' },
	];
</script>
