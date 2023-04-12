<script setup>
	import { reactive, onMounted, ref } from 'vue';
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
		DocumentArrowDownIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		ArrowPathIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	import { format } from 'date-fns';

	definePageMeta({ middleware: ['auth'] });

	const state = reactive({
		docs: [],
		loading: true,
	});

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const orgs = ref([]);
	const org_id = ref('');
	const fileName = ref('');
	const isFileSelected = ref(false);
	const uploading = ref(false);
	const refresh = ref(false);
	const uploadSuccess = ref(false);
	const files = ref();
	const deleteLoading = ref(false);

	const { data: User, error: UserError } = await supabase
		.from('User')
		.select('systemRole,Account(id,type,Subscription(*))')
		.eq('id', user.value.id)
		.single();

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	const fetchDropdownItems = async () => {
		// Check if the dropdown items have already been fetched
		if (orgs.value.length > 0) {
			return;
		}

		uploading.value = true;
		const { data: Account, error } = await supabase
			.from('Account')
			.select('id,name');

		orgs.value = Account;
		uploading.value = false;
	};

	const fetchData = async () => {
		const { data } = await supabase.storage
			.from('files')
			.list(`client_files/${route.params.organization}`, {
				offset: 0,
				sortBy: { column: 'name', order: 'asc' },
			});
		return data;
	};

	onMounted(async () => {
		state.docs = await fetchData();
		state.loading = false;
	});

	const handleFileChange = (event) => {
		// Set the file name and update the submit button state
		const file = event.target.files[0];
		fileName.value = file.name;
		isFileSelected.value = true;
	};

	const uploadFile = async (evt) => {
		const maxSize = 1024 * 1024 * 10;
		files.value = evt.target.files;
		const org_id =
			User.Account.type === 'super_admin'
				? org_id.value
				: route.params.organization;
		try {
			uploading.value = true;

			if (!files.value || files.value.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files.value[0];
			if (file.size > maxSize) {
				throw new Error('File too large.');
				files.value = '';
			}
			const fileExt = file.name.split('.').pop();
			const fileName = `${file.name}.${fileExt}`;
			const filePath = `client_files/${org_id}/${fileName}`;

			let { error: uploadError } = await supabase.storage
				.from('files')
				.upload(filePath, file, { upsert: true });

			if (uploadError) throw uploadError;
		} catch (error) {
			alert(error.message);
		} finally {
			uploading.value = false;
			uploadSuccess.value = true;
			state.loading = true;
			state.docs = await fetchData();
			setTimeout(() => {
				uploadSuccess.value = false;
			}, 2000);
			state.loading = false;
		}
	};

	const handleRefresh = async () => {
		state.loading = true;
		state.docs = await fetchData();
		state.loading = false;
	};

	const handleDownload = async (file_name, folder) => {
		const {
			data: { signedUrl },
			error,
		} = await supabase.storage
			.from('files')
			.createSignedUrl(`client_files/${folder}/${file_name}`, 60);
		window.open(signedUrl, '_blank').focus();
	};

	const handleFileDelete = async (file_name, folder) => {
		state.loading = true;
		const { data, error } = await supabase.storage
			.from('files')
			.remove([`client_files/${folder}/${file_name}`]);
		state.docs = await fetchData();
		state.loading = false;
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

<template>
	<div>
		<div class="">
			<div class="">
				<div class="">
					<div class="">
						<h2
							id="billing-history-heading"
							class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
						>
							Documentation
						</h2>
						<form class="mt-4 grid grid-cols-3">
							<div
								class="flex flex-col"
								v-if="User.Account.type === 'super_admin'"
							>
								<label class="text-sm">Organization</label>

								<select
									id="location"
									name="location"
									required
									@click="fetchDropdownItems"
									:disabled="uploading"
									placeholder="Choose org"
									v-model="org_id"
									:class="[
										uploading ? 'animate-pulse bg-gray-100' : '',
										'mt-2 block w-full  rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6',
									]"
								>
									<option v-for="org in orgs" :key="org.id" :value="org.id">
										{{ org.name }}
									</option>
								</select>
							</div>

							<div class="col-span-3">
								<div
									class="mt-8 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-white/25"
								>
									<loading-spinner v-if="uploading" />
									<success-text v-else-if="uploadSuccess" />
									<div v-else class="text-center">
										<div class=""></div>
										<div
											v-if="
												retainer.tier === 'enterprise' &&
												retainer.status !== 'paused'
											"
											class="flex text-sm leading-6 text-gray-600 dark:text-slate-300"
										>
											<label
												for="file"
												class="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input
													:disabled="
														retainer.tier !== 'enterprise' &&
														retainer.status === 'paused'
													"
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
										<div
											v-else
											class="flex text-sm leading-6 text-gray-600 dark:text-slate-300"
										>
											<p>
												Documentation uploads are available on our Enterprise
												Tier.
											</p>
										</div>

										<p
											v-if="
												retainer.tier === 'enterprise' &&
												retainer.status !== 'paused'
											"
											class="text-xs leading-5 text-gray-600 dark:text-slate-500"
										>
											PDF, JPG, GIF up to 10MB
										</p>
										<div
											class="mt-4 flex items-center justify-center space-x-2"
											v-else
										>
											<NuxtLink
												to="/settings/billing"
												class="rounded-md border border-indigo-400 bg-indigo-600 px-3 py-1.5 text-xs text-white transition-all hover:bg-indigo-500 hover:shadow-sm"
											>
												Upgrade plan
											</NuxtLink>
											<a
												href="https://calendly.com/motis-group/intro"
												target="_blank"
												class="inline-flex items-center rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-800 shadow-sm transition-colors hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700"
											>
												<svg
													class="mr-1 h-4 w-4"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M9.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V14.75"
													></path>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M19.25 9.25V4.75H14.75"
													></path>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M19 5L11.75 12.25"
													></path>
												</svg>
												Enquire about Enterprise
											</a>
										</div>

										{{ fileName }}
									</div>
								</div>
							</div>
						</form>
					</div>

					<div class="">
						<warning-access :role="User.systemRole" />
						<div class="mt-8 space-y-6 lg:px-0">
							<section aria-labelledby="billing-history-heading">
								<div class="sm:overflow-hidden">
									<div class="mt-6 flex flex-col bg-white dark:bg-slate-800">
										<div class="overflow-x-auto">
											<div class="inline-block min-w-full pt-2 align-middle">
												<div class="overflow-hidden">
													<div
														class="mb-4 flex items-center justify-start space-x-3 px-2 text-sm dark:text-slate-300"
													>
														<button
															class="inline-flex items-center rounded-md px-2 py-0.5 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700"
															@click="handleRefresh()"
														>
															<svg
																v-if="!state.loading"
																class="mr-1 h-5 w-5 dark:text-slate-500"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M11.25 14.75L8.75 17M8.75 17L11.25 19.25M8.75 17H13.25C16.5637 17 19.25 14.3137 19.25 11V10.75"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M15.25 7H10.75C7.43629 7 4.75 9.68629 4.75 13V13.25M15.25 7L12.75 9.25M15.25 7L12.75 4.75"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
															</svg>
															<svg
																v-else
																class="mr-1 h-5 w-5 animate-spin dark:text-slate-500"
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
																></path></svg
															>Refresh</button
														><button
															class="inline-flex items-center rounded-md px-2 py-0.5 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700"
														>
															<svg
																class="mr-1 h-5 w-5 dark:text-slate-500"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M19.25 4.75H4.75L9.31174 10.4522C9.59544 10.8068 9.75 11.2474 9.75 11.7016V18.25C9.75 18.8023 10.1977 19.25 10.75 19.25H13.25C13.8023 19.25 14.25 18.8023 14.25 18.25V11.7016C14.25 11.2474 14.4046 10.8068 14.6883 10.4522L19.25 4.75Z"
																></path>
															</svg>
															Filter
														</button>
														<button
															class="inline-flex items-center rounded-md px-2 py-0.5 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700"
														>
															<svg
																class="mr-1 h-5 w-5 dark:text-slate-500"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M6.5 6C6.5 6.27614 6.27614 6.5 6 6.5C5.72386 6.5 5.5 6.27614 5.5 6C5.5 5.72386 5.72386 5.5 6 5.5C6.27614 5.5 6.5 5.72386 6.5 6Z"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M6.5 12C6.5 12.2761 6.27614 12.5 6 12.5C5.72386 12.5 5.5 12.2761 5.5 12C5.5 11.7239 5.72386 11.5 6 11.5C6.27614 11.5 6.5 11.7239 6.5 12Z"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M6.5 18C6.5 18.2761 6.27614 18.5 6 18.5C5.72386 18.5 5.5 18.2761 5.5 18C5.5 17.7239 5.72386 17.5 6 17.5C6.27614 17.5 6.5 17.7239 6.5 18Z"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M9.75 6H18.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M9.75 12H18.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M9.75 18H18.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
															</svg>

															Sort
														</button>
													</div>
													<table
														class="w-full table-fixed divide-y divide-gray-200 dark:divide-slate-600"
													>
														<thead class="bg-gray-50 dark:bg-transparent">
															<tr class="border-b border-slate-600">
																<th
																	scope="col"
																	class="w-1/2 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
																>
																	Name
																</th>
																<th
																	scope="col"
																	class="w-1/5 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
																>
																	Created
																</th>
																<th
																	scope="col"
																	class="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
																>
																	Filetype
																</th>
																<th
																	scope="col"
																	class="w-1/8 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
																></th>

																<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
															</tr>
														</thead>

														<tbody
															class="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-transparent"
														>
															<tr v-for="doc in state.docs" :key="doc.id">
																<td
																	scope="col"
																	class="whitespace-wrap flex items-center px-6 py-2 text-sm font-normal text-gray-900 dark:text-white"
																>
																	<button
																		class="flex items-center"
																		@click="
																			handleDownload(doc.name, User.Account.id)
																		"
																	>
																		{{ doc.name.split('.')[0] }}
																		<DocumentArrowDownIcon
																			class="ml-0.5 h-5 w-5 text-indigo-500"
																		/></button
																	><span class="ml-2 text-xs text-gray-400">{{
																		formatBytes(doc.metadata.size)
																	}}</span>
																</td>
																<td
																	class="whitespace-wrap px-6 py-2 text-sm text-gray-500 dark:text-slate-200"
																>
																	<span>{{
																		format(
																			new Date(doc.created_at),
																			'MMM dd, yyyy'
																		)
																	}}</span>
																</td>
																<td
																	class="whitespace-nowrap px-6 py-2 text-sm uppercase text-gray-500 dark:text-slate-200"
																>
																	{{ doc.metadata.mimetype.split('/')[1] }}
																</td>
																<td
																	class="whitespace-nowrap px-6 py-2 text-right text-sm uppercase text-gray-500 dark:text-slate-200"
																>
																	<button
																		:disabled="deleteLoading"
																		@click="
																			handleFileDelete(
																				doc.name,
																				User.Account.id
																			)
																		"
																	>
																		<svg
																			v-if="!deleteLoading"
																			class="h-5 w-5 transition-colors hover:text-rose-900"
																			viewBox="0 0 24 24"
																			fill="none"
																			xmlns="http://www.w3.org/2000/svg"
																		>
																			<path
																				d="M5.75 7.75L6.59115 17.4233C6.68102 18.4568 7.54622 19.25 8.58363 19.25H14.4164C15.4538 19.25 16.319 18.4568 16.4088 17.4233L17.25 7.75H5.75Z"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M9.75 10.75V16.25"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M13.25 10.75V16.25"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M8.75 7.75V6.75C8.75 5.64543 9.64543 4.75 10.75 4.75H12.25C13.3546 4.75 14.25 5.64543 14.25 6.75V7.75"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																			<path
																				d="M4.75 7.75H18.25"
																				stroke="currentColor"
																				stroke-width="1.5"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																			></path>
																		</svg>
																		<svg
																			v-else
																			class="h-5 w-5 animate-spin"
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
																	</button>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
