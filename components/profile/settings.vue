<script setup>
	import {
		PencilIcon,
		ArrowTopRightOnSquareIcon,
		TrashIcon,
	} from '@heroicons/vue/24/outline';

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

	const countries = getCountries();
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const imageSrc = ref(null);
	const fileInput = ref(null);
	const selectedFile = ref(null);
	const updating_loading = ref(false);
	const avatarSuccess = ref(false);

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
			     id,
				 name,
				 Subscription(*),
				 Team (
					id,
					name
				 )
			   )`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const firstName = ref(User.firstName);
	const lastName = ref(User.lastName);
	const companyName = ref(User.companyName);
	const jobTitle = ref(User.jobTitle);
	const country = ref(User.country ?? 'United States');
	const avatarUrl = ref(null);
	const updatedPhoto = ref(false);

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
	console.log(avatarUrl.value);

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
			return null;
		}
		return data;
		location.reload();
	}
</script>

<template>
	<div class="">
		<div role="tabpanel" class="mt-4">
			<div class="space-y-8">
				<div class="dark:text-white" id="profile">
					<div class="">
						<div class="mb-4 flex border-b border-slate-300 py-8">
							<h4 class="font-semibold">Personal info</h4>
							<div class="sc-TRNrF iPuFes"></div>
						</div>

						<ul class="space-y-4">
							<li class="">
								<div class="">
									<div class="flex flex-col">
										<small>User ID</small>{{ User.id }}
									</div>
								</div>
							</li>
							<Disclosure
								as="li"
								v-slot="{ open }"
								class="flex items-center justify-between"
							>
								<div class="" v-if="!open">
									<div class="flex flex-col">
										<small>First name</small>{{ firstName }}
									</div>
								</div>
								<DisclosurePanel
									class="flex flex-grow items-center justify-between text-sm text-gray-500"
								>
									<div class="w-full">
										<div class="flex justify-between">
											<input
												type="text"
												name="first-name"
												id="first-name"
												class="mr-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
												v-model="firstName"
											/>
											<div class="flex items-center space-x-2">
												<DisclosureButton
													class="rounded-md border border-indigo-600 bg-white p-2 text-indigo-600"
												>
													<XMarkIcon class="h-5 w-5" />
												</DisclosureButton>
												<DisclosureButton
													@click="updateUserField('firstName', firstName)"
													class="rounded-md bg-indigo-600 p-2 text-white"
												>
													<CheckIcon class="h-5 w-5" />
												</DisclosureButton>
											</div>
										</div>
									</div>
								</DisclosurePanel>
								<div class="ml-2">
									<DisclosureButton class="p-2" v-if="!open">
										<PencilIcon class="h-4 w-4 dark:text-slate-400" />
									</DisclosureButton>
								</div>
							</Disclosure>
							<Disclosure
								as="li"
								v-slot="{ open }"
								class="flex items-center justify-between"
							>
								<div class="" v-if="!open">
									<div class="flex flex-col">
										<small>Last name</small>{{ lastName }}
									</div>
								</div>
								<DisclosurePanel
									class="flex flex-grow items-center justify-between text-sm text-gray-500"
								>
									<div class="w-full">
										<div class="flex justify-between">
											<input
												type="text"
												name="last-name"
												id="last-name"
												class="mr-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
												v-model="lastName"
											/>
											<div class="flex items-center space-x-2">
												<DisclosureButton
													class="rounded-md border border-indigo-600 bg-white p-2 text-indigo-600"
												>
													<XMarkIcon class="h-5 w-5" />
												</DisclosureButton>
												<DisclosureButton
													@click="updateUserField('lastName', lastName)"
													class="rounded-md bg-indigo-600 p-2 text-white"
												>
													<CheckIcon class="h-5 w-5" />
												</DisclosureButton>
											</div>
										</div>
									</div>
								</DisclosurePanel>
								<div class="ml-2">
									<DisclosureButton class="p-2" v-if="!open">
										<PencilIcon class="h-4 w-4 dark:text-slate-400" />
									</DisclosureButton>
								</div>
							</Disclosure>
							<li class="flex items-center justify-between">
								<div class="w-full">
									<div class="flex flex-col">
										<small>Country</small>
										<Listbox as="div" v-model="country">
											<div class="relative mt-2">
												<ListboxButton
													class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-800 dark:text-white dark:ring-slate-700 sm:text-sm sm:leading-6"
												>
													<span class="block truncate">{{ country }}</span>
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
															v-for="option in countries"
															:key="option"
															:value="option"
															@click="updateUserField('country', option)"
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
																	>{{ option }}</span
																>

																<span
																	v-if="selected"
																	:class="[
																		active ? 'text-white' : 'text-indigo-600',
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
									</div>
								</div>
							</li>
							<Disclosure
								as="li"
								v-slot="{ open }"
								class="flex items-center justify-between"
							>
								<div class="" v-if="!open">
									<div class="flex flex-col">
										<small>Company</small>{{ companyName }}
									</div>
								</div>
								<DisclosurePanel
									class="flex flex-grow items-center justify-between text-sm text-gray-500"
								>
									<div class="w-full">
										<div class="flex justify-between">
											<input
												type="text"
												name="last-name"
												id="last-name"
												class="mr-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
												v-model="companyName"
											/>
											<div class="flex items-center space-x-2">
												<DisclosureButton
													class="rounded-md border border-indigo-600 bg-white p-2 text-indigo-600"
												>
													<XMarkIcon class="h-5 w-5" />
												</DisclosureButton>
												<DisclosureButton
													@click="updateUserField('companyName', companyName)"
													class="rounded-md bg-indigo-600 p-2 text-white"
												>
													<CheckIcon class="h-5 w-5" />
												</DisclosureButton>
											</div>
										</div>
									</div>
								</DisclosurePanel>
								<div class="ml-2">
									<DisclosureButton class="p-2" v-if="!open">
										<PencilIcon class="h-4 w-4 dark:text-slate-400" />
									</DisclosureButton>
								</div>
							</Disclosure>
							<Disclosure
								as="li"
								v-slot="{ open }"
								class="flex items-center justify-between"
							>
								<div class="" v-if="!open">
									<div class="flex flex-col">
										<small>Job title</small>{{ jobTitle ?? 'null' }}
									</div>
								</div>
								<DisclosurePanel
									class="flex flex-grow items-center justify-between text-sm text-gray-500"
								>
									<div class="w-full">
										<div class="flex justify-between">
											<input
												type="text"
												name="last-name"
												id="last-name"
												class="mr-2 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
												v-model="jobTitle"
											/>
											<div class="flex items-center space-x-2">
												<DisclosureButton
													class="rounded-md border border-indigo-600 bg-white p-2 text-indigo-600"
												>
													<XMarkIcon class="h-5 w-5" />
												</DisclosureButton>
												<DisclosureButton
													@click="updateUserField('jobTitle', jobTitle)"
													class="rounded-md bg-indigo-600 p-2 text-white"
												>
													<CheckIcon class="h-5 w-5" />
												</DisclosureButton>
											</div>
										</div>
									</div>
								</DisclosurePanel>
								<div class="ml-2">
									<DisclosureButton class="p-2" v-if="!open">
										<PencilIcon class="h-4 w-4 dark:text-slate-400" />
									</DisclosureButton>
								</div>
							</Disclosure>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										<small>Email</small>{{ User.email }}
									</div>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										<small>Avatar</small>
										<div
											class="whitespace-wrap mt-2 flex items-center gap-x-3 break-all text-xs"
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
												<div v-if="!avatarUrl && !updating_loading && !imageSrc"
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
													class="absolute left-0 top-0 h-full w-full file:cursor-pointer file:h-full file:w-full opacity-0 group-hover:cursor-pointer"
												/>
												<svg
													v-if="(avatarUrl && !updating_loading)"
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
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										Password<small
											>Manage password at
											<a
												href="/password-reset"
												target="_blank"
												class="text-indigo-500"
												>app.motis.group/password-reset</a
											></small
										>
									</div>
								</div>
								<div class="sc-bWXABl dfOvOR">
									<a href="/password-reset" target="_blank" class="p-1"
										><ArrowTopRightOnSquareIcon
											class="ml-2 h-5 w-5 text-indigo-500"
									/></a>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div id="danger">
					<div>
						<div
							class="mb-4 flex border-b border-slate-300 py-8 dark:text-white"
						>
							<h4 class="font-semibold">Danger zone</h4>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex flex-col dark:text-white">
								Delete user account<small class="text-slate-600"
									>Delete your private workspace and all workspaces where you
									are the only member. This action cannot be reverted.</small
								>
							</div>

							<div class="ml-2">
								<button class="rounded-lg bg-red-100 p-1 dark:bg-red-800">
									<TrashIcon class="h-5 w-5 text-red-600 dark:text-red-200" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="text-slate-500">
					<div class="flex flex-col">
						<small
							>Motis Group<a
								href="https://robocorp.com/terms-of-use"
								target="_blank"
								rel="noreferrer"
								class="text-indigo-500"
							>
								terms of use</a
							>
							and<a
								href="https://robocorp.com/privacy-policy"
								target="_blank"
								rel="noreferrer"
								class="text-indigo-500"
							>
								privacy policy</a
							></small
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	small {
		color: rgb(156, 171, 183);
	}
</style>
