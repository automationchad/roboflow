<script setup>
	import {
		PencilIcon,
		ArrowTopRightOnSquareIcon,
		TrashIcon,
	} from '@heroicons/vue/24/outline';

	definePageMeta({ layout: 'clients', middleware: ['auth'] });

	import { PlusIcon, UserCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';

	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
	} from '@headlessui/vue';

	import {
		CheckIcon,
		CheckCircleIcon,
		ChevronDownIcon,
	} from '@heroicons/vue/20/solid';
	import { is } from 'date-fns/locale';

	const countries = getCountries();
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const imageSrc = ref(null);
	const fileInput = ref(null);
	const selectedFile = ref(null);
	const updating_loading = ref(false);
	const profile_updating_loading = ref(false);
	const avatarSuccess = ref(false);

	const email = ref('');

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');

	const firstName = ref('');
	const lastName = ref('');

	const originalFirstName = ref('');
	const originalLastName = ref('');

	const options = ref([
		{ id: 'dark', name: 'Dark' },
		{ id: 'light', name: 'Light' },
	]);

	const selectedOption = ref(options.value[0]);

	// Create a reactive reference to store the theme
	let isDarkMode;

	// Check if localStorage is defined
	if (typeof localStorage !== 'undefined') {
		selectedOption.value = options.value.find(
			(v) => v.id === localStorage.theme
		);
	}

	watchEffect(() => {
		if (typeof window !== 'undefined') {
			if (selectedOption.value.id === 'dark') {
				document.documentElement.classList.remove('light');
				document.documentElement.classList.add('dark');
				if (typeof localStorage !== 'undefined') {
					localStorage.theme = 'dark';
				}
			} else {
				document.documentElement.classList.remove('dark');
				document.documentElement.classList.add('light');
				if (typeof localStorage !== 'undefined') {
					localStorage.theme = 'light';
				}
			}
		}
	});

	const getData = async () => {
		const { data: User, error: userError } = await supabase
			.from('users')
			.select(
				`*,organizations (
			     id,
				 name
			   )`
			)
			.limit(1)
			.single();
		originalFirstName.value = User.first_name;
		originalLastName.value = User.last_name;
		firstName.value = User.first_name;
		lastName.value = User.last_name;
		email.value = User.primary_email;
	};

	await getData();

	const avatarUrl = ref(null);
	const updatedPhoto = ref(false);

	const showSave = computed(() => {
		if (
			firstName.value !== originalFirstName.value ||
			lastName.value !== originalLastName.value ||
			updatedPhoto.value
		)
			return true;
		else return false;
	});

	const reset = () => {
		firstName.value = originalFirstName.value;
		lastName.value = originalLastName.value;
	};

	const getAvatar = async (avatar) => {
		const {
			data: [File],
			error: fileError,
		} = await supabase.storage.from('avatars').list(`${avatar}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'updated_at', order: 'desc' },
			search: `${user.value.id}`,
		});
		if (File) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from('avatars')
				.getPublicUrl(`${user.value.id}/${File.name}`);
			return publicUrl;
		} else return null;
	};

	avatarUrl.value = await getAvatar(user.value.id);

	const uploadImage = async (event) => {
		const file = event.target.files[0];
		if (file) {
			imageSrc.value = URL.createObjectURL(file);
			selectedFile.value = file;
			updatedPhoto.value = true;
		}
	};

	const handleAvatarUpdate = async () => {
		if (!selectedFile.value) {
			console.error('No image selected');
			return;
		}

		try {
			updating_loading.value = true;
			const regex = /[^\\&?]+\.(jpg|jpeg|gif|png|webp)$/i;
			const extension = selectedFile.value.name.match(regex);
			const fileName = `${user.value.id}-${Date.now()}.${extension[1]}`;

			const filePath = `/${user.value.id}/${fileName}`;

			const { data: File, error: fileError } = await supabase.storage
				.from('avatars')
				.list(`${user.value.id}`, {
					limit: 100,
					offset: 0,
					sortBy: { column: 'updated_at', order: 'desc' },
				});

			if (File.length > 0) {
				const arr = File.map((o) => {
					const userId = o.name.split('-').slice(0, -1).join('-');
					return `${userId}/${o.name}`;
				});
				console.log(arr);
				const { data, error } = await supabase.storage
					.from('avatars')
					.remove(arr);
			}

			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, selectedFile.value);

			if (uploadError) {
				console.error('Error uploading image:', uploadError);
				return;
			}
			const { error: userUpdateError } = await supabase
				.from('User')
				.update({
					avatarPath: `https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/avatars/${user.value.id}/${fileName}`,
				})
				.eq('id', user.value.id);
			if (userUpdateError) {
				console.error('Error updating user', uploadError);
				return;
			}
		} catch (error) {
			alert(error.message);
		} finally {
			avatarUrl.value = await getAvatar(user.value.id);
			updatedPhoto.value = false;
			avatarSuccess.value = true;
			updating_loading.value = false;
			fileInput.value = '';
			setTimeout(() => {
				avatarSuccess.value = false;
				imageSrc.value = null;
			}, 1000);
		}
	};
	const removeImage = async () => {
		imageSrc.value = null;
		avatarUrl.value = null;
		const { data: File, error: fileError } = await supabase.storage
			.from('avatars')
			.list(`${user.value.id}`, {
				limit: 100,
				offset: 0,
				sortBy: { column: 'updated_at', order: 'desc' },
			});

		if (File.length > 0) {
			const arr = File.map((o) => {
				const userId = o.name.split('-').slice(0, -1).join('-');
				return `${userId}/${o.name}`;
			});

			const { data, error } = await supabase.storage
				.from('avatars')
				.remove(arr);
		}
		updatedPhoto.value = false;
		fileInput.value = '';
	};

	async function updateUserField(fieldName, fieldValue) {
		const { data, error } = await supabase
			.from('User')
			.update({ [fieldName]: fieldValue })
			.eq('id', user.value.id);

		if (error) {
			console.error(error);
		}
		return data;
	}

	async function updateUserFields() {
		try {
			profile_updating_loading.value = true;
			const { data, error } = await supabase
				.from('User')
				.update({ firstName: firstName.value, lastName: lastName.value })
				.eq('id', user.value.id);

			if (error) {
				is_error.value = true;
				error_message.value = error.message;
				throw new Error(error.message);
			}
			await getData();
		} catch (error) {
			console.error(error);
		} finally {
			is_error.value = false;
			error_message.value = '';
			profile_updating_loading.value = false;
			is_success.value = true;
			success_message.value = 'Profile updated successfully';
		}
	}
</script>

<template>
	<div class="flex-1 flex-grow overflow-auto">
		<div class="my-2">
			<article class="max-w-4xl p-4">
				<section>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div
									class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
								>
									<div class="flex items-center px-6 py-4">
										<h5 class="mb-0">Account Information</h5>
									</div>
								</div>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div class="px-6 py-4">
										<div class="space-y-2">
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														>Username</label
													>
												</div>
												<div class="col-span-8">
													<div class="">
														<div class="relative">
															<input
																disabled=""
																id=""
																name=""
																type="text"
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																readonly=""
																:value="email.split('@')[0]"
															/>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
												</div>
											</div>
											<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
												<div class="col-span-4 flex flex-col space-y-2">
													<label class="text-scale-1100 block text-sm" for=""
														>Email</label
													>
												</div>
												<div class="col-span-8">
													<div class="">
														<div class="relative">
															<input
																disabled=""
																id=""
																name=""
																type="text"
																class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm opacity-50 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
																readonly=""
																:value="email"
															/>
														</div>
													</div>
													<p
														data-state="hide"
														class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
													></p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section>
					<section class="section-block mb-8">
						<div
							class="border-panel-border-light bg-panel-header-light dark:border-panel-border-dark dark:bg-panel-header-dark flex h-12 items-center overflow-hidden border-b px-6"
						>
							<div class="flex-1 text-left"><h6>Profile</h6></div>
							<transition
								enter-active-class="transition ease-out duration-100"
								enter-from-class="transform opacity-0"
								enter-to-class="transform opacity-100 "
								leave-active-class="transition ease-in duration-75"
								leave-from-class="transform opacity-100 "
								leave-to-class="transform opacity-0"
							>
								<div
									v-if="showSave"
									:class="['flex cursor-default  transition duration-150']"
								>
									<button
										@click="reset"
										class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									>
										<span class="truncate">Cancel</span></button
									><button
										@click="updateUserFields()"
										:disabled="profile_updating_loading"
										class="font-regular hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative ml-2 inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:border-green-500 focus-visible:outline-4 focus-visible:outline-offset-1 disabled:opacity-50"
										type="button"
									>
										<svg
											v-if="profile_updating_loading"
											class="h-4 w-4 animate-spin"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M12 4.75V6.25"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M17.1266 6.87347L16.0659 7.93413"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M19.25 12L17.75 12"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M17.1266 17.1265L16.0659 16.0659"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M12 17.75V19.25"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M7.9342 16.0659L6.87354 17.1265"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M6.25 12L4.75 12"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M7.9342 7.93413L6.87354 6.87347"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</svg>

										<span class="truncate">Save</span>
									</button>
								</div>
							</transition>
						</div>
						<div class="Form section-block--body px-6 py-3">
							<form novalidate="" class="form">
								<div class="form-group w-full">
									<label for="uniforms-0002-0000" class="">First name</label
									><input
										class="form-control text-sm"
										id="uniforms-0002-0000"
										name="first_name"
										placeholder=""
										type="text"
										v-model="firstName"
									/>
								</div>
								<div class="form-group w-full">
									<label for="uniforms-0002-0001" class="">Last name</label
									><input
										class="form-control text-sm"
										id="uniforms-0002-0001"
										name="last_name"
										placeholder=""
										type="text"
										v-model="lastName"
									/>
								</div>
								<div class="form-group w-full">
									<label for="uniforms-0002-0001" class="">Avatar</label>
									<div
										class="whitespace-wrap mt-2 flex items-center gap-x-3 break-all pl-3 text-xs"
									>
										<div class="relative h-14 w-14">
											<div
												v-if="!imageSrc && !avatarUrl"
												class="relative h-14 w-14 rounded-full border border-slate-700"
												aria-hidden="true"
											></div>

											<img
												v-else
												class="relative h-14 w-14 rounded-full object-cover text-gray-300"
												:src="imageSrc || avatarUrl"
											/>
											<div
												v-if="!avatarUrl && !updating_loading && !imageSrc"
												class="absolute inset-0 flex items-center justify-center opacity-60 hover:opacity-100"
											>
												<PlusIcon
													class="h-6 w-6 cursor-pointer text-gray-900 dark:text-white"
												/>
											</div>
											<input
												v-if="!avatarUrl"
												type="file"
												accept="image/png, image/jpeg, image/webp, image/gif"
												ref="fileInput"
												@change="uploadImage"
												class="absolute left-0 top-0 h-full w-full opacity-0 file:h-full file:w-full file:cursor-pointer group-hover:cursor-pointer"
											/>
											<svg
												v-if="avatarUrl && !updating_loading"
												@click="removeImage"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												class="absolute -right-1.5 -top-1.5 h-4 w-4 cursor-pointer rounded-full border border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600"
											>
												<path
													d="M7.822 7l2.509-2.503a.586.586 0 00-.829-.828L7 6.177 4.497 3.67a.586.586 0 10-.828.828L6.177 7 3.67 9.502a.583.583 0 00.19.957.584.584 0 00.638-.128L7 7.822l2.502 2.509a.583.583 0 00.957-.19.583.583 0 00-.128-.639L7.822 7z"
													fill="currentColor"
												></path>
											</svg>
										</div>
										<div
											class="flex items-center space-x-2"
											v-if="!updating_loading"
										>
											<button
												v-if="updatedPhoto"
												:disabled="!updatedPhoto || updating_loading"
												@click="removeImage()"
												type="button"
												class="group relative rounded-md px-1 py-1 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-800"
											>
												<span v-if="!updating_loading"
													><XMarkIcon class="h-4 w-4"
												/></span>
											</button>

											<button
												v-if="updatedPhoto"
												:disabled="!updatedPhoto || updating_loading"
												@click="handleAvatarUpdate()"
												type="button"
												class="hover:bg-indigo- group relative rounded-md bg-indigo-600 px-1 py-1 text-sm font-normal text-white shadow-sm dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-800"
											>
												<span v-if="!updating_loading"
													><CheckIcon class="h-4 w-4"
												/></span>
											</button>
										</div>
										<div
											v-if="updating_loading && !avatarSuccess"
											:disabled="updating_loading"
											class="group relative rounded-md px-1 py-1 text-sm font-normal text-gray-900 dark:text-white"
										>
											<loading-spinner :show-text="false" />
										</div>
										<div
											v-else-if="avatarSuccess"
											class="group relative rounded-md px-1 py-1 text-sm font-normal text-green-500"
										>
											<success-spinner :show-text="false" />
										</div>
									</div>
								</div>
							</form>
						</div>
					</section>
				</section>
				<section>
					<div class="relative">
						<div class="transition-opacity duration-300">
							<div
								class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
							>
								<div
									class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
								>
									<div class="flex items-center px-6 py-4"><h5>Theme</h5></div>
								</div>
								<div class="bg-panel-body-light dark:bg-panel-body-dark">
									<div class="px-6 py-4">
										<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
											<div class="col-span-4 flex flex-col space-y-2">
												<label class="text-scale-1100 block text-sm" for=""
													>Interface theme</label
												>
											</div>
											<div class="col-span-8" style="width: 50%">
												<Listbox class="" as="div" v-model="selectedOption">
													<ListboxButton
														class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 aria-expanded:border-scale-900 aria-expanded:ring-scale-400 relative box-border block w-full rounded-md border border bg-none px-4 py-2 pl-10 indent-px text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current aria-expanded:ring-2"
													>
														<span
															class="flex w-full flex-row items-center space-x-3"
															><div
																class="text-scale-1100 pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
															>
																<svg
																	v-if="selectedOption.id === 'dark'"
																	xmlns="http://www.w3.org/2000/svg"
																	width="21"
																	height="21"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon"
																>
																	<path
																		d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
																	></path>
																</svg>
																<svg
																	v-else
																	xmlns="http://www.w3.org/2000/svg"
																	width="21"
																	height="21"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon"
																>
																	<circle cx="12" cy="12" r="5"></circle>
																	<line x1="12" y1="1" x2="12" y2="3"></line>
																	<line x1="12" y1="21" x2="12" y2="23"></line>
																	<line
																		x1="4.22"
																		y1="4.22"
																		x2="5.64"
																		y2="5.64"
																	></line>
																	<line
																		x1="18.36"
																		y1="18.36"
																		x2="19.78"
																		y2="19.78"
																	></line>
																	<line x1="1" y1="12" x2="3" y2="12"></line>
																	<line x1="21" y1="12" x2="23" y2="12"></line>
																	<line
																		x1="4.22"
																		y1="19.78"
																		x2="5.64"
																		y2="18.36"
																	></line>
																	<line
																		x1="18.36"
																		y1="5.64"
																		x2="19.78"
																		y2="4.22"
																	></line>
																</svg>
															</div>
															<span class="truncate">{{
																selectedOption.name
															}}</span></span
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
													</ListboxButton>
													<ListboxOptions
														data-radix-popper-content-wrapper=""
														style="
															position: fixed;
															left: 0px;
															top: 0px;
															transform: translate(501.5px, 603px);
															min-width: max-content;
															will-change: transform;
															z-index: 10;
														"
														><div
															data-side="bottom"
															data-align="center"
															role="menu"
															aria-orientation="vertical"
															data-state="open"
															data-radix-menu-content=""
															dir="ltr"
															id="radix-949"
															aria-labelledby="radix-939"
															class="bg-scale-100 dark:bg-scale-300 origin-dropdown data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide z-10 max-h-60 overflow-hidden overflow-y-scroll rounded-md border border-solid border-gray-100 py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
															tabindex="-1"
															data-orientation="vertical"
															style="
																outline: none;

																pointer-events: auto;
															"
														>
															<ListboxOption
																as="div"
																v-for="option in options"
																:key="option"
																:value="option"
																v-slot="{ active, selected }"
															>
																<li
																	class="w-listbox text-scale-900 hover:bg-scale-300 dark:hover:bg-scale-500 focus:bg-scale-300 dark:focus:bg-scale-500 focus:text-scale-1200 relative cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none"
																>
																	<div class="flex items-center space-x-3">
																		<span>{{ option.name }}</span>
																	</div>
																	<span
																		class="text-brand-900 text-brand-900 absolute inset-y-0 right-0 flex items-center pr-3"
																		><svg
																			v-show="selected"
																			xmlns="http://www.w3.org/2000/svg"
																			width="21"
																			height="21"
																			viewBox="0 0 24 24"
																			fill="none"
																			stroke="currentColor"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			class="sbui-icon h-5 w-5"
																			aria-hidden="true"
																		>
																			<polyline
																				points="20 6 9 17 4 12"
																			></polyline></svg
																	></span>
																</li>
															</ListboxOption></div
													></ListboxOptions>
												</Listbox>
												<p
													data-state="hide"
													class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
												></p>
												<p
													class="text-scale-900 mt-2 text-sm leading-normal"
													id="-description"
												>
													Choose a theme preference
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</article>
		</div>
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
