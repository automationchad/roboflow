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

	const getAvatar = async () => {
		if (User.avatarPath) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from('avatars')
				.getPublicUrl(`${user.value.id}`);
			return publicUrl;
		} else return null;
	};

	const avatarUrl = await getAvatar();

	const uploadImage = async (event) => {
		const file = event.target.files[0];
		if (file) {
			imageSrc.value = URL.createObjectURL(file);
			selectedFile.value = file;
			console.log(file);
		}
	};

	const handleAvatarUpdate = async () => {
		if (!selectedFile.value) {
			console.error('No image selected');
			return;
		}
		try {
			const { error: deleteError } = await supabase.storage
				.from('avatars')
				.remove([User.avatarPath]);

			if (deleteError) {
				console.error('Error uploading image:', uploadError);
				return;
			}

			const fileName = `${user.value.id}`;
			const filePath = `${fileName}`;
			const { error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, selectedFile.value, { upsert: true });

			if (uploadError) {
				console.error('Error uploading image:', uploadError);
				return;
			}
			const { error: userUpdateError } = await supabase
				.from('User')
				.update({ avatarPath: fileName })
				.eq('id', user.value.id);
			if (userUpdateError) {
				console.error('Error updating user', uploadError);
				return;
			}
		} catch (error) {
			alert(error.message);
		} finally {
			avatarSuccess.value = true;

			fileInput.value = '';
		}
	};
	const removeImage = () => {
		imageSrc.value = null;
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
										<PencilIcon class="h-5 w-5" />
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
										<PencilIcon class="h-5 w-5" />
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
													class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
										<PencilIcon class="h-5 w-5" />
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
										<PencilIcon class="h-5 w-5" />
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
											<div class="relative h-12 w-12">
												<UserCircleIcon
													v-if="!imageSrc && !avatarUrl"
													class="relative h-12 w-12 text-gray-300"
													aria-hidden="true"
												/>

												<img
													v-else
													class="relative h-12 w-12 rounded-full object-cover text-gray-300"
													:src="imageSrc || avatarUrl"
												/>
												<div
													class="absolute inset-0 flex items-center justify-center opacity-60 hover:opacity-100"
												>
													<PlusIcon class="h-6 w-6 cursor-pointer text-white" />
												</div>
												<input
													type="file"
													accept="image/*"
													ref="fileInput"
													@change="uploadImage"
													class="absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0 group-hover:cursor-pointer"
												/>
											</div>

											<button
												:disabled="!imageSrc"
												@click="handleAvatarUpdate()"
												type="button"
												class="group relative rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:hover:bg-white"
											>
												Change
											</button>
											<div
												v-if="avatarSuccess"
												class="flex items-center text-green-500"
											>
												<CheckCircleIcon class="mr-1 h-4 w-4" />Success!
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
