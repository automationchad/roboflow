<template>
	<div>
		<div class="bg-white">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl">
					<h2
						class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
					>
						Documentation
					</h2>
					<p class="mt-2 text-lg leading-8 text-gray-600">
						A collection of all documents for workflows
					</p>
					<form @submit.prevent="uploadFile(event)">
						<div class="flex flex-col">
							<label>Organization</label>
							<select
								required
								@click="fetchDropdownItems"
								:disabled="uploading"
								v-model="org"
							>
								<option v-if="uploading"><uploading-spinner /></option>
								<option v-for="org in orgs" :key="org.id" :value="org.id">
									{{ org.name }}
								</option>
							</select>
						</div>

						<div class="col-span-full">
							<div
								class="mt-8 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
							>
								<div class="text-center">
									<PhotoIcon
										class="mx-auto h-12 w-12 text-gray-300"
										aria-hidden="true"
									/>
									<div class="mt-4 flex text-sm leading-6 text-gray-600">
										<label
											for="file"
											class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input
												id="file"
												required
												name="file"
												@change="uploadFile"
												type="file"
												class="sr-only"
											/>
										</label>

										<p class="pl-1">or drag and drop</p>
									</div>
									<p class="text-xs leading-5 text-gray-600">
										PNG, JPG, GIF up to 10MB
									</p>
									{{ fileName }}
								</div>
							</div>
						</div>
						<button type="submit" :disabled="!isFileSelected">Save</button>
					</form>

					<div
						class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"
					>
						<article
							v-for="doc in docs"
							:key="doc.id"
							class="flex max-w-xl flex-col items-start justify-between"
						>
							<div class="flex items-center gap-x-4 text-xs">
								<!-- {{ format(new Date(doc.createdOn), 'MMMM dd, yyyy') }} -->
								<span
									class="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600"
									>{{ doc.id }}</span
								>
							</div>
							<div
								class="group relative mt-3 flex w-full items-center justify-between"
							>
								<h3 class="text-lg font-semibold leading-6 text-gray-900">
									<span>
										<span class="absolute inset-0" />
										{{ doc.name }}
									</span>
								</h3>
								<Menu as="div" class="relative inline-block text-left">
									<div>
										<MenuButton
											class="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
										>
											<span class="sr-only">Open options</span>
											<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24">
												<path
													fill="currentColor"
													d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
												></path>
												<path
													fill="currentColor"
													d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
												></path>
												<path
													fill="currentColor"
													d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
												></path>
											</svg>
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
											class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
										>
											<div class="py-1">
												<MenuItem v-slot="{ active }">
													<a
														href="#"
														:class="[
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm',
														]"
														>Read PPD</a
													>
												</MenuItem>
												<MenuItem v-slot="{ active }">
													<a
														href="#"
														:class="[
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm',
														]"
														>Watch video</a
													>
												</MenuItem>
												<MenuItem v-slot="{ active }">
													<a
														href="#"
														:class="[
															active
																? 'bg-gray-100 text-gray-900'
																: 'text-gray-700',
															'block px-4 py-2 text-sm',
														]"
														>Workflow Link</a
													>
												</MenuItem>
											</div>
										</MenuItems>
									</transition>
								</Menu>
							</div>
							<div
								class="my-5 w-full whitespace-pre-wrap border-l-2 border-indigo-700 bg-indigo-50 py-3 pl-4 text-sm leading-6 text-indigo-900 line-clamp-3"
							>
								{{ doc.id }}
							</div>

							<div class="relative mt-8 flex items-center gap-x-4" v-if="false">
								<img
									:src="''"
									alt=""
									class="h-10 w-10 rounded-full bg-gray-50"
								/>
								<div class="text-sm leading-6">
									<p class="font-semibold text-gray-900">
										<!-- <a :href="doc.createdBy">
										<span class="absolute inset-0" />
										{{ doc.User.firstName }} {{ doc.User.lastName }}
									</a> -->
									</p>
									<p class="text-gray-600">{{ doc }}</p>
								</div>
							</div>
						</article>
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
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		ChartPieIcon,
		Cog6ToothIcon,
		DocumentDuplicateIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	definePageMeta({ middleware: ['auth'] });

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const orgs = ref([]);
	const org = ref('');
	const fileName = ref('');
	const isFileSelected = ref(false);
	const uploading = ref(false);
	const files = ref();

	const fetchDropdownItems = async () => {
		// Check if the dropdown items have already been fetched
		if (orgs.value.length > 0) {
			return;
		}

		uploading.value = true;
		const { data: Account, error } = await supabase.from('Account').select('*');

		orgs.value = Account;
		uploading.value = false;
		console.log(Account);
	};

	const { data: docs } = await supabase.storage
		.from('files')
		.list(`client_files/${route.params.organization}`, {
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});

	const handleFileChange = (event) => {
		// Set the file name and update the submit button state
		const file = event.target.files[0];
		fileName.value = file.name;
		isFileSelected.value = true;
	};

	const uploadFile = async (evt) => {
		files.value = evt.target.files;
		try {
			uploading.value = true;

			if (!files.value || files.value.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files.value[0];
			const fileExt = file.name.split('.').pop();
			const fileName = `${file.name}.${fileExt}`;
			const filePath = `client_files/${route.params.organization}/${fileName}`;

			let { error: uploadError } = await supabase.storage
				.from('files')
				.upload(filePath, file);

			if (uploadError) throw uploadError;

			
		} catch (error) {
			alert(error.message);
		} finally {
			uploading.value = false;
		}
	};

	// const activeSub =
	// 	User.Account.Subscription[0].status === 'active' &&
	// 	User.Account.Subscription[0].plan.metadata.plan !== 'Free';

	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
	});

	const userNavigation = [
		{ name: 'Your profile', href: '#' },
		{ name: 'Sign out', href: '#' },
	];
</script>
