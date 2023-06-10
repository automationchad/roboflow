<template>
	<div class="mb-8">
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
								<div
									data-lastpass-icon-root="true"
									style="
										position: relative !important;
										height: 0px !important;
										width: 0px !important;
										float: left !important;
									"
								></div>
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
						<button data-state="closed">
							<button
								class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								type="button"
							>
								<span class="truncate">Invite</span>
							</button>
						</button>
					</div>
					<div>
						<button data-state="closed">
							<button
								class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								disabled=""
								type="button"
							>
								<span class="truncate">Leave team</span>
							</button>
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
									<tr>
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
								<tbody>
									<tr class="">
										<td>
											<div class="flex items-center space-x-4">
												<div>
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
																src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2740%27%20height=%2740%27/%3e"
																style="
																	display: block;
																	max-width: 100%;
																	width: initial;
																	height: initial;
																	background: none;
																	opacity: 1;
																	border: 0px;
																	margin: 0px;
																	padding: 0px;
																" /></span
														><img
															srcset="
																/dashboard/_next/image?url=https%3A%2F%2Fgithub.com%2Fautomationchad.png%3Fsize%3D80&amp;w=48&amp;q=75 1x,
																/dashboard/_next/image?url=https%3A%2F%2Fgithub.com%2Fautomationchad.png%3Fsize%3D80&amp;w=96&amp;q=75 2x
															"
															src="/dashboard/_next/image?url=https%3A%2F%2Fgithub.com%2Fautomationchad.png%3Fsize%3D80&amp;w=96&amp;q=75"
															decoding="async"
															data-nimg="intrinsic"
															class="rounded-full border"
															style="
																position: absolute;
																inset: 0px;
																box-sizing: border-box;
																padding: 0px;
																border: none;
																margin: auto;
																display: block;
																width: 0px;
																height: 0px;
																min-width: 100%;
																max-width: 100%;
																min-height: 100%;
																max-height: 100%;
															"
													/></span>
												</div>
												<div>
													<p class="text-scale-1200">automationchad</p>
													<p class="text-scale-1100">will.marzella@tray.io</p>
												</div>
											</div>
										</td>
										<td></td>
										<td>
											<button
												data-state="delayed-open"
												class="w-[140px]"
												aria-describedby="radix-199"
											>
												<div
													class="pointer-events-none grid gap-2 text-sm md:grid md:grid-cols-12"
												>
													<div class="col-span-12">
														<div class="">
															<button
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 indent-px text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
																name=""
																id=""
																type="button"
																aria-haspopup="menu"
																aria-expanded="false"
																data-state="closed"
																data-disabled=""
																disabled=""
															>
																<span
																	class="flex w-full flex-row items-center space-x-3"
																	><span class="truncate">Owner</span></span
																><span
																	class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
																	><svg
																		class="text-scale-600 h-5 w-5"
																		xmlns="http://www.w3.org/2000/svg"
																		viewBox="0 0 20 20"
																		fill="currentColor"
																		aria-hidden="true"
																	>
																		<path
																			fill-rule="evenodd"
																			d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
																			clip-rule="evenodd"
																		></path></svg
																></span>
															</button>
														</div>
														<p
															data-state="hide"
															class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
														></p>
													</div>
												</div>
											</button>
										</td>
										<td></td>
									</tr>
									<tr
										class="bg-panel-secondary-light dark:bg-panel-secondary-dark"
									>
										<td colspan="4"><p class="text-scale-1100">1 user</p></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
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

	let { data: Scopes, error: ScopesError } = await supabase
		.from('Scopes')
		.select('*')
		.eq('systemRole', User.systemRole)
		.single();

	const isAddingDisabled = true;

	const isEditRoleDisabled = (user) => {
		if (!Scopes.scopes.split(',').includes('users:edit')) return true;
		else if (
			User.Account.User.filter((o) => o.systemRole === 'owner').length === 1 &&
			Scopes.scopes.split(',').includes('admin:edit') &&
			user.systemRole === 'owner'
		)
			return true;
		else return false;
	};
	const isDeleteDisabled = (user) => {
		if (!Scopes.scopes.split(',').includes('users:delete')) return true;
		else if (
			User.Account.User.filter((o) => o.systemRole === 'owner').length === 1 &&
			Scopes.scopes.split(',').includes('admin:delete') &&
			user.systemRole === 'owner'
		)
			return true;
		else return false;
	};

	let { data: Invitation, error: InvitationError } = await supabase
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
					email: inviteeEmail.value,
					systemRole: 'member',
					createdBy: User.id,
					expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
					account: User.accountId,
					workspaceId: User.defaultTeamId,
				},
			])
			.select('*');
		if (error) {
			alert(error.details);
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
		{ id: 'contributor', name: 'Contributor' },
		{ id: 'viewer', name: 'Viewer' },
	];
</script>
