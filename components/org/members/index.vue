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
	import { is } from 'date-fns/locale';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();

	const deleteCommand = ref('');
	const deleteDescription = ref('');

	const users = ref([]);
	const selectedRoles = reactive({});

	const showInvite = ref(false);
	const showDelete = ref(false);
	const userToDelete = ref(null);
	const inviteeEmail = ref('');
	const loading = ref(true);

	const currentUser = ref(null);

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');

	const account = ref(null);

	const scopes = ref({});

	const handleError = (msg) => {
		error_message.value = msg;
		is_error.value = true;
	};

	const handleSuccess = (msg) => {
		success_message.value = msg;
		is_success.value = true;
		fetchData();
	};

	const fetchFromStorage = async (storageName, searchParam) => {
		const {
			data: [File],
			error: fileError,
		} = await supabase.storage.from(storageName).list(`${searchParam}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'updated_at', order: 'desc' },
			search: `${searchParam}`,
		});

		if (File) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from(storageName)
				.getPublicUrl(`/${searchParam}/${File.name}`);

			return publicUrl;
		} else return '';
	};

	const getAvatarUrl = async (avatar) => fetchFromStorage('avatars', avatar);

	async function fetchData() {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select(`id, User(*)`)
			.eq('id', route.params.organization)
			.limit(1)
			.single();

		const { data: invitationData, error: invitationError } = await supabase
			.from('Invitation')
			.select('*')
			.eq('account', route.params.organization);

		const { data: userData, error: userError } = await supabase
			.from('User')
			.select(`*`)
			.eq('id', user.value.id)
			.limit(1)
			.single();

		const { data: scopesData, error: scopesError } = await supabase
			.from('Scopes')
			.select('*')
			.eq('systemRole', userData.systemRole)
			.limit(1)
			.single();

		account.value = accountData;
		scopes.value = scopesData;
		users.value = accountData.User.concat(invitationData);
		currentUser.value = userData;

		const promises = [];
		for (const user of users.value) {
			let promise = getAvatarUrl(user.id).then(
				(avatarUrl) => (user.avatarUrl = avatarUrl)
			);
			promises.push(promise);
		}

		await Promise.all(promises);

		for (let user of users.value) {
			selectedRoles[user.id] = ref(user.systemRole);
		}

		loading.value = false;
	}

	await fetchData();

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

	const handleDeleteConfirm = (person) => {
		showDelete.value = true;
		userToDelete.value = person;
		deleteCommand.value =
			person.status === 'pending' ? 'Revoke invite' : 'Delete user';
		deleteDescription.value =
			person.status === 'pending'
				? 'revoke the user invite'
				: 'delete the selected user';
	};

	const isAddingDisabled = computed(() => {
		const currentUserScopes = scopes.value.scopes.split(',');
		// Check if the current user has the 'users:add' scope
		if (!currentUserScopes.includes('users:create')) return true;

		// Check if the current user is a viewer
		if (user.systemRole === 'viewer') return true;

		return false;
	});

	const isEditRoleDisabled = (selectedUser) => {
		const currentUserScopes = scopes.value.scopes.split(',');

		// Check if the current user has the 'users:edit' scope
		if (!currentUserScopes.includes('users:edit')) return true;

		if (selectedUser.status === 'pending') return true;

		// Check if the current user is trying to edit their own role
		if (user.value.id === selectedUser.id) return true;

		if (
			selectedUser.systemRole === 'owner' &&
			account.value.User.filter((o) => o.systemRole === 'owner').length === 1
		)
			return true;

		// Check if the current user is an admin and the selected user is an owner
		if (
			currentUser.systemRole === 'admin' &&
			selectedUser.systemRole === 'owner'
		)
			return true;

		// Check if the current user is a contributor or viewer
		// Add the relevant checks here

		return false;
	};

	const isDeleteDisabled = (selectedUser) => {
		const currentUserScopes = scopes.value.scopes.split(',');

		// Check if the current user has the 'users:delete' scope
		if (!currentUserScopes.includes('users:delete')) return true;

		// Check if the current user is trying to delete their own account
		if (user.value.id === selectedUser.id) return true;

		if (users.value.length <= 1) return true;

		if (
			users.value.length ===
			users.value.filter((o) => o.systemRole === 'owner').length
		)
			return true;

		if (
			users.value.filter((o) => o.systemRole === 'owner').length === 1 &&
			selectedUser.systemRole === 'owner'
		)
			return true;

		if (
			selectedUser.systemRole === 'owner' &&
			selectedUser.status !== 'pending' &&
			users.value.filter((o) => o.systemRole === 'owner').length === 1
		)
			return true;

		// Check if the current user is an admin and the selected user is an owner
		if (
			currentUser.systemRole === 'admin' &&
			selectedUser.systemRole === 'owner'
		)
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

	const copyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text) // write the text to the clipboard
			.then(() => {
				console.log('Text copied to clipboard'); // log a message indicating that the text was copied
			})
			.catch((err) => {
				console.error('Error copying text to clipboard: ', err); // log an error message if there was an error copying the text
			});
		is_success.value = true;
		is_error.value = false;
		success_message.value = 'Copied invite link to clipboard';
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
		try {
			loading.value = true;
			if (isDeleteDisabled(person)) {
				throw new Error('User is not allowed to be deleted');
			}

			if (person.status === 'pending') {
				const { error: inviteDeleteError } = await supabase
					.from('Invitation')
					.delete()
					.eq('id', person.id);
				if (inviteDeleteError) {
					throw new Error(
						inviteDeleteError.message || inviteDeleteError.toString()
					);
				}
			} else {
				const { error: userDeleteError } = await supabase
					.from('User')
					.delete()
					.eq('id', person.id);

				if (userDeleteError) {
					throw new Error(
						userDeleteError.message || userDeleteError.toString()
					);
				}
			}
		} catch (error) {
			is_success.value = false;
			is_error.value = true;
			error_message.value = error.message || error.toString();

			console.error(error);
		} finally {
			loading.value = false;
			showDelete.value = false;
			users.value = users.value.filter((u) => u.id !== person.id);

			is_success.value = true;
			success_message.value = 'User deleted successfully';
			console.log('User deleted successfully');
		}
	}

	const sendInvitation = async () => {
		try {
			loading.value = true;
			// Try to insert the invitation
			const { data: userData, error: userError } = await supabase
				.from('User')
				.select('email')
				.eq('email', inviteeEmail.value);

			if (userData.length > 0) {
				inviteeEmail.value = '';
				throw new Error('User already exists');
			}
			const { data: invitation, error } = await supabase
				.from('Invitation')
				.insert([
					{
						email: inviteeEmail.value,
						systemRole: accountData.User.length === 0 ? 'owner' : 'contributor',
						createdBy: user.value.id,
						expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
						account: route.params.organization,
					},
				])
				.select('*');

			if (error) {
				throw new Error(error.message || error.toString());
			} else {
				users.value.push(invitation[0]);
				is_error.value = false;
				inviteeEmail.value = '';
				success_message.value = 'Invitation sent successfully';
				is_success.value = true;
			}
			loading.value = false;
		} catch (error) {
			is_success.value = false;
			is_error.value = true;
			error_message.value = error.message || error.toString();
			loading.value = false;
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

<template>
	<div class="container my-4 max-w-4xl space-y-8">
		<div class="flex justify-between">
			<div class="grid gap-2 text-sm leading-4 md:grid md:grid-cols-12">
				<div class="col-span-12">
					<div class="">
						<div class="relative">
							<input
								id="email"
								name="email"
								placeholder="Filter members"
								type="text"
								class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 pl-10 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
								value=""
							/>
							<div
								class="text-scale-1100 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<circle cx="11" cy="11" r="8"></circle>
									<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
								</svg>
							</div>
						</div>
					</div>
					<p
						data-state="hide"
						class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
					></p>
				</div>
			</div>
			<div class="flex items-center space-x-4">
				<div>
					<button @click="showInvite = true" :disabled="isAddingDisabled">
						<div
							class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-indigo-400 focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
						>
							<span class="truncate">Invite</span>
						</div>
					</button>
				</div>
				<div>
					<button data-state="closed">
						<div
							class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							disabled=""
							type="button"
						>
							<span class="truncate">Leave team</span>
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="container my-4 max-w-4xl space-y-8">
		<div class="rounded">
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div class="table-container">
						<table class="table">
							<thead>
								<tr class="">
									<th class="p-3 px-4 text-left">User</th>
									<th class="p-3 px-4 text-left"></th>
									<th class="flex items-center space-x-2 p-3 px-4 text-left">
										<span>Role</span
										><svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon hover:text-scale-1200 cursor-pointer transition"
										>
											<circle cx="12" cy="12" r="10"></circle>
											<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
											<line x1="12" y1="17" x2="12.01" y2="17"></line>
										</svg>
									</th>
									<th class="p-3 px-4 text-left"></th>
								</tr>
							</thead>
							<tbody class="dark:text-white">
								<tr
									class="relative bg-white/90"
									v-for="user in users"
									:key="user.id"
								>
									<td>
										<div class="flex items-center space-x-4">
											<div v-if="user.avatarUrl">
												<span
													style="
														box-sizing: border-box;
														display: inline-block;
														overflow: hidden;
														width: initial;
														height: initial;
														background: none;
														opacity: 1;
														border: 0px;
														margin: 0px;
														padding: 0px;
														position: relative;
														max-width: 100%;
													"
													><span
														style="
															box-sizing: border-box;
															display: block;
															width: initial;
															height: initial;
															background: none;
															opacity: 1;
															border: 0px;
															margin: 0px;
															padding: 0px;
															max-width: 100%;
														"
														><img
															alt=""
															aria-hidden="true"
															:src="user.avatarUrl"
															class="h-10 w-10 rounded-full object-cover"
															style="
																display: block;
																background: none;
																opacity: 1;
																border: 0px;
																margin: 0px;
																padding: 0px;
															" /></span
												></span>
											</div>
											<div v-else>
												<span
													class="border-scale-700 flex rounded-full border-2 p-2"
													><svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<path
															d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
														></path>
														<circle cx="12" cy="7" r="4"></circle></svg
												></span>
											</div>
											<div>
												<p class="text-slate-900">
													{{ user.firstName }} {{ user.lastName }}
													{{ user.id === currentUser.id ? '(You)' : '' }}
												</p>
												<p class="text-slate-500">{{ user.email }}</p>
											</div>
										</div>
									</td>
									<td>
										<span
											v-if="
												user.expires &&
												new Date(user.expires) > new Date() &&
												user.status === 'pending'
											"
											class="inline-flex items-center rounded-full border border-yellow-400 bg-yellow-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:border-yellow-700"
											>Invited</span
										>
										<span
											v-else-if="
												user.expires &&
												new Date(user.expires) < new Date() &&
												user.status === 'pending'
											"
											class="inline-flex items-center rounded-full border border-red-400 bg-red-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:border-red-700"
											>Expired</span
										>
									</td>
									<td class="">
										<div class="relative w-[140px]">
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div class="group col-span-12">
													<Listbox as="div" v-model="selectedRoles[user.id]">
														<div>
															<ListboxButton
																:disabled="isEditRoleDisabled(user)"
																:class="[
																	'text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 relative box-border block w-full cursor-pointer rounded-md border bg-none px-4 py-2 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current disabled:opacity-50 aria-expanded:ring-2',
																]"
																><span
																	class="flex w-full flex-row items-center space-x-3"
																	><span class="truncate capitalize">{{
																		user.systemRole
																	}}</span></span
																>

																<span
																	class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
																>
																	<ChevronDownIcon
																		class="h-5 w-5 text-gray-200"
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
																			@click="editUserRole(user.id, role.id)"
																			:class="[
																				active
																					? 'bg-indigo-600 text-white'
																					: 'text-gray-900',
																				'relative cursor-default select-none py-2 pl-3 pr-9',
																			]"
																		>
																			<span
																				:class="[
																					user.systemRole === role.id
																						? 'font-semibold'
																						: 'font-normal',
																					'block truncate',
																				]"
																				>{{ role.name }}</span
																			>

																			<span
																				v-if="user.systemRole === role.id"
																				:class="[
																					active
																						? 'text-white'
																						: 'text-indigo-600',
																					'absolute inset-y-0 right-0 flex items-center pr-4',
																				]"
																			>
																				<CheckIcon
																					class="h-5 w-5"
																					aria-hidden="true"
																				/>
																			</span>
																		</li>
																	</ListboxOption>
																</ListboxOptions>
															</transition>
														</div>
													</Listbox>
													<p
														v-if="user.status === 'pending'"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal absolute left-1/2 top-14 z-10 rounded-md bg-white px-2 py-1 text-xs text-slate-900 opacity-0 shadow-sm transition-all group-hover:opacity-100"
													>
														Role can only be changed after the user has accepted
														the invite
													</p>
												</div>
											</div>
										</div>
									</td>
									<td>
										<Menu
											as="div"
											class="relative flex items-center justify-end"
											v-if="!isEditRoleDisabled(user)"
										>
											<MenuButton
												class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
												><span
													class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													><svg
														xmlns="http://www.w3.org/2000/svg"
														width="14"
														height="14"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														class="sbui-icon"
													>
														<circle cx="12" cy="12" r="1"></circle>
														<circle cx="19" cy="12" r="1"></circle>
														<circle cx="5" cy="12" r="1"></circle></svg></span
											></MenuButton>
											<MenuItems
												class="absolute right-2 top-6 z-40 w-48 min-w-fit space-y-3 divide-y divide-gray-200 rounded border bg-white py-1.5 shadow-lg focus:outline-none"
											>
												<MenuItem
													v-slot="{ active }"
													v-if="user.status === 'active'"
													:disabled="isDeleteDisabled(user)"
													:class="[
														active ? 'bg-slate-100' : '',
														'text-body-light focus:bg-selection focus:text-body flex items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
													]"
												>
													<button
														@click="handleDeleteConfirm(user)"
														:class="[
															active ? 'bg-slate-100' : '',
															isDeleteDisabled(user)
																? 'cursor-not-allowed opacity-50'
																: '',
															'flex w-full items-center space-x-2 border-none px-4 py-1.5 text-left text-sm transition transition-colors focus:outline-none disabled:cursor-not-allowed',
														]"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon"
														>
															<polyline points="3 6 5 6 21 6"></polyline>
															<path
																d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
															></path></svg
														><span><p>Remove member</p></span>
													</button>
												</MenuItem>
												<MenuItem
													v-slot="{ active }"
													v-if="user.status === 'pending'"
													:disabled="isDeleteDisabled(user)"
													:class="[
														active ? 'bg-slate-100' : '',
														'text-body-light focus:bg-selection focus:text-body flex items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
													]"
												>
													<button
														@click="deleteUser(user)"
														:disabled="isDeleteDisabled(user)"
														:class="[
															active ? 'bg-slate-100' : '',
															isDeleteDisabled(user)
																? 'cursor-not-allowed opacity-50'
																: '',
															'flex w-full items-center space-x-2 border-none px-4 py-1.5 text-left text-sm transition transition-colors focus:outline-none disabled:cursor-not-allowed',
														]"
													>
														<div class="flex flex-col">
															<p>Cancel invitation</p>
															<p class="block opacity-50">
																Revoke this invitation.
															</p>
														</div>
													</button>
												</MenuItem>

												<MenuItem
													v-if="
														user.confirm_url &&
														new Date(user.expires) > new Date()
													"
													v-slot="{ active }"
													:class="[
														active ? 'bg-slate-100' : '',
														'text-body-light focus:bg-selection focus:text-body flex items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
													]"
												>
													<button
														@click="
															copyToClipboard(
																`https://app.motis.group/join/${user.token}`
															)
														"
														:class="[
															active
																? 'bg-slate-100'
																: 'disabled:cursor-not-allowed',
															'flex w-full items-center space-x-2 border-none px-4 py-1.5 text-left text-sm transition transition-colors focus:outline-none disabled:cursor-not-allowed',
														]"
													>
														<div class="flex flex-col">
															<p>Copy link</p>
															<p class="block opacity-50">
																Copy link to this invite.
															</p>
														</div>
													</button>
												</MenuItem>

												<MenuItem
													v-else-if="
														user.confirm_url &&
														new Date(user.expires) < new Date()
													"
													v-slot="{ active }"
													:class="[
														active ? 'bg-slate-100' : '',
														'text-body-light focus:bg-selection focus:text-body flex items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
													]"
												>
													<button
														@click="copyToClipboard(user.confirm_url)"
														:class="[
															active
																? 'bg-slate-100'
																: 'disabled:cursor-not-allowed',
															'flex w-full items-center space-x-2 border-none px-4 py-1.5 text-left text-sm transition transition-colors focus:outline-none disabled:cursor-not-allowed',
														]"
													>
														<div class="flex flex-col">
															<p>Resend invitation</p>
															<p class="block opacity-50">
																Invites expire after 24 hours.
															</p>
														</div>
													</button>
												</MenuItem>
											</MenuItems>
										</Menu>
									</td>
								</tr>

								<tr class="dark:bg-panel-secondary-dark bg-white/90">
									<td colspan="4">
										<p class="text-scale-1100">
											{{ users.length }} user{{ users.length > 1 ? 's' : '' }}
										</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<OrgMembersInviteModal
		v-if="showInvite"
		@close="showInvite = false"
		@error="handleError"
		@invite-sent="handleSuccess"
	/>
	<MembersScopesModal v-if="false" />
	<DeleteConfirm
		v-if="showDelete"
		@cancel="showDelete = false"
		@confirm="deleteUser(userToDelete)"
		:command="deleteCommand"
		:description="deleteDescription"
	/>

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
</template>

<style scoped>
	.table-container table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
	}
	.table {
		display: table;
	}
	table {
		text-indent: 0;
		border-color: inherit;
		border-collapse: collapse;
	}

	.table-container table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
	}

	.table-container table span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.table-container thead th {
		font-size: 0.875rem /* 14px */;
		line-height: 1.25rem /* 20px */;
		font-weight: 400;
		border-bottom-width: 1px;
		border-top-width: 1px;
	}

	.table-container thead th:first-child {
		@apply rounded rounded-b-none rounded-r-none pl-6;
		@apply border-l;
	}

	.table-container thead th:last-child {
		@apply rounded rounded-b-none rounded-l-none pr-6;
		@apply border-r;
	}

	.table-container tbody .tr--link {
		@apply cursor-pointer transition-colors;
	}

	.table-container tbody td {
		@apply border-b p-3 px-4 text-sm;
	}

	.table-container tbody td:first-child {
		@apply border-b border-l pl-6;
	}

	.table-container tbody td:last-child {
		@apply border-b border-r pr-6;
	}

	.table-container tbody tr:last-child td:first-child {
		border-radius: 0.25rem; /* rounded */
		border-top-left-radius: 0; /* rounded-l-none */
		border-bottom-left-radius: 0; /* rounded-l-none */
		border-top-right-radius: 0; /* rounded-t-none */
		border-bottom-right-radius: 0.25rem;
	}

	.table-container tbody tr:last-child td:last-child {
		border-radius: 0.25rem; /* rounded */
		border-top-left-radius: 0; /* rounded-l-none */
		border-bottom-left-radius: 0; /* rounded-l-none */
		border-top-right-radius: 0; /* rounded-t-none */
		border-bottom-right-radius: 0.25rem;
	}

	.table-container--borderless thead th {
		border-top: none;
	}

	.table-container--borderless thead th:first-child {
		border-left: none;
	}

	.table-container--borderless thead th:last-child {
		border-right: none;
	}

	.table-container--borderless tbody td:first-child {
		border-left: none;
	}

	.table-container--borderless tbody td:last-child {
		border-right: none;
	}

	.table-container--borderless tbody tr:last-child td {
		border-bottom: none;
	}

	.table-container tbody td:first-child {
		border-bottom-width: 1px;
		border-left-width: 1px;
		border-color: var(--colors-scale5);
		padding-left: 1.5rem;
	}
	.table-container tbody td {
		border-bottom-width: 1px;
		border-color: var(--colors-scale5);
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--colors-gray11);
	}

	.table-container tbody td:last-child {
		border-bottom-width: 1px;
		border-right-width: 1px px;
		border-color: var(--colors-scale5);
		padding-right: 1.5rem;
	}

	.table-container table span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.bordershadow-scale-600 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #dfe3e6 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-1000 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #7375ed 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>
