<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
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
		ArchiveBoxIcon,
		Bars3BottomLeftIcon,
		Bars4Icon,
		ClockIcon,
		HomeIcon,
		UserCircleIcon as UserCircleIconOutline,
		FaceFrownIcon,
		FaceSmileIcon,
		FireIcon,
		HandThumbUpIcon,
		HeartIcon,
		PaperClipIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		BellIcon,
		CalendarIcon,
		ChatBubbleLeftEllipsisIcon,
		CheckCircleIcon,
		LockOpenIcon,
		TrashIcon,
		LockClosedIcon,
		MagnifyingGlassIcon,
		PencilIcon,
		TagIcon,
		UserCircleIcon as UserCircleIconMini,
	} from '@heroicons/vue/20/solid';

	import showdown from 'showdown';
	import { format, formatDistanceStrict, formatDistance } from 'date-fns';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();
	const props = defineProps(['open', 'comments']);

	const converter = await new showdown.Converter();
	const loading = ref(true);

	const ticketAvatar = ref(null);

	const currentAvatar = ref(null);

	const assignedToAvatar = ref(null);

	const comments = ref([]);
	const comment_text = ref('');
	const reply_text = ref('');

	const imageSrc = ref(null);
	const fileInput = ref(null);
	const selectedFile = ref(null);

	const commentImageId = ref('');
	const showImageModal = ref(false);

	const showImage = (id) => {
		commentImageId.value = id;
		showImageModal.value = true;
	};

	const toggleModal = () => {
		showImageModal.value = !showImageModal.value;
	};

	const ticketDate = (timestamp) => {
		const createdDate = new Date(timestamp);
		const today = new Date();

		if (
			createdDate.getDate() === today.getDate() &&
			createdDate.getMonth() === today.getMonth() &&
			createdDate.getFullYear() === today.getFullYear()
		) {
			// Created date is today
			return format(createdDate, 'hh:mm aa');
		} else {
			// Created date is not today
			return format(createdDate, 'MMM dd, hh:mm aa');
		}
	};

	const styles = {
		bug: 'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		billing:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		new: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		sales_inquiry:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 type,
		 stripeCustomerId,
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

	let { data: Ticket, error } = await supabase
		.from('Ticket')
		.select(
			'*, Team(id,name), Comment(*,User(firstName,lastName,systemRole,id,avatarPath,country,jobTitle,badges),Comment(*,User(firstName,lastName,systemRole,id,avatarPath,country,jobTitle,badges))), User(*)'
		)
		.eq('id', route.params.id)
		.limit(1)
		.single();

	const dueDate = computed(() => {
		return formatDistance(new Date(Ticket.dueDate), new Date(), {
			addPrefix: true,
		});
	});

	if (!Ticket) {
		navigateTo('/ticket-not-found');
	}

	const input = ref(Ticket.desc);

	const { data: AssignedTo, error: assignedError } = await supabase
		.from('User')
		.select('*')
		.eq('id', Ticket.assignedTo)
		.limit(1)
		.single();

	const uploadImage = (event) => {
		const file = event.target.files[0];
		if (file) {
			imageSrc.value = URL.createObjectURL(file);
			selectedFile.value = file;
		}
	};

	const removeImage = () => {
		imageSrc.value = null;
		selectedFile.value = null;
		fileInput.value = '';
	};

	const getTicketAttachments = async (id) => {
		const { data: files, error: fileError } = await supabase.storage
			.from('images')
			.list(`attachments`, {
				limit: 100,
				offset: 0,
				sortBy: { column: 'updated_at', order: 'desc' },
				search: `${id}`,
			});

		let images = [];

		for (const file of files) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from('images')
				.getPublicUrl(`attachments/${file.name}`);

			images.push(publicUrl);
		}

		return images;
	};

	const getAvatarUrl = async (avatar) => {
		const {
			data: [File],
			error: fileError,
		} = await supabase.storage.from('avatars').list(`${avatar}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'updated_at', order: 'desc' },
			search: `${avatar}`,
		});

		if (File) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from('avatars')
				.getPublicUrl(`/${avatar}/${File.name}`);

			return publicUrl;
		} else return '';
	};

	const getCommentImageUrl = async (id) => {
		const {
			data: [File],
			error: fileError,
		} = await supabase.storage.from('images').list(`comments`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'updated_at', order: 'desc' },
			search: `${id}`,
		});

		console.log(File);
		if (File) {
			const {
				data: { publicUrl },
			} = await supabase.storage
				.from('images')
				.getPublicUrl(`/comments/${File.name}`);

			return publicUrl;
		} else return '';
	};

	const fetchComments = async () => {
		let { data: Ticket, error } = await supabase
			.from('Ticket')
			.select(
				'*,Team(id,name), Comment(*,User(firstName,lastName,systemRole,id,avatarPath,country,jobTitle,badges),Comment(*,User(firstName,lastName,systemRole,id,avatarPath,country,jobTitle,badges))), User(*)'
			)
			.eq('id', route.params.id)
			.limit(1)
			.single();

		let comments = Ticket.Comment;
		let commentList = [];
		let replyList = [];

		for (const comment of comments) {
			let commentObj = {
				...comment,
				avatarUrl: '',
				attachments: [], // Create an empty array to hold files
				Comment: [], // Create an empty array to hold replies
			};

			// Check if this is a reply to another comment
			if (comment.threadId) {
				replyList.push(commentObj);
			} else {
				commentList.push(commentObj);
			}
		}

		// Load avatar URLs asynchronously and update the comment data
		const promises = [];
		for (const comment of commentList) {
			let promise = getAvatarUrl(comment.createdBy).then(
				(avatarUrl) => (comment.avatarUrl = avatarUrl)
			);
			promises.push(promise);
			promise = getCommentImageUrl(comment.id).then((imageUrl) =>
				comment.attachments.push(imageUrl)
			);
			promises.push(promise);
		}

		for (const reply of replyList) {
			let promise = getAvatarUrl(reply.createdBy).then(
				(avatarUrl) => (reply.avatarUrl = avatarUrl)
			);
			promises.push(promise);
			promises.push(promise);
			promise = getCommentImageUrl(reply.id).then((imageUrl) =>
				reply.attachments.push(imageUrl)
			);
			promises.push(promise);
		}

		await Promise.all(promises);

		// Sort the commentList array in descending order by createdOn date
		commentList.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));

		// Loop through the replyList and add each reply to the appropriate comment
		for (const reply of replyList) {
			const parentComment = commentList.find(
				(comment) => comment.id === reply.threadId
			);
			if (parentComment) {
				parentComment.Comment.push(reply);
			}
			parentComment.Comment.sort(
				(a, b) => new Date(a.createdOn) - new Date(b.createdOn)
			);
		}

		// Sort the replies within each parent comment in descending order by createdOn date

		return commentList;
	};

	const ticketAttachments = ref([]);

	ticketAttachments.value = await getTicketAttachments(Ticket.id);
	console.log(ticketAttachments.value);

	ticketAvatar.value = await getAvatarUrl(Ticket.createdBy);
	currentAvatar.value = await getAvatarUrl(user.value.id);
	assignedToAvatar.value = await getAvatarUrl(Ticket.assignedTo);

	comments.value = await fetchComments();

	if (comments.value) {
		loading.value = false;
	}

	const convert = (text) => {
		let converter = new showdown.Converter();
		const formatted = converter.makeHtml(text);
		return formatted;
	};

	const handleCommentAdd = async (thread_id) => {
		loading.value = true;

		try {
			if (selectedFile.value) {
				const { data, error: insertError } = await supabase
					.from('Comment')
					.insert([
						{
							text: thread_id ? reply_text.value : comment_text.value,
							createdBy: user.value.id,
							ticketId: Ticket.id,
							threadId: thread_id,
							attachment: true,
						},
					])
					.select();

				const regex = /[^\\&?]+\.(jpg|jpeg|gif|png|webp)$/i;
				const extension = selectedFile.value.name.match(regex);
				const fileName = `${data[0].id}.${extension[1]}`;
				const filePath = `comments/${fileName}`;
				const { error: uploadError } = await supabase.storage
					.from('images')
					.upload(filePath, selectedFile.value, { upsert: true });

				if (uploadError) {
					console.error('Error uploading image:', uploadError);
					return;
				}
				if (insertError) {
					console.error('Error inserting comment:', insertError);
				} else {
					console.log('Image uploaded and comment created successfully');
					removeImage();
				}
			} else {
				const { data, error: insertError } = await supabase
					.from('Comment')
					.insert([
						{
							text: thread_id ? reply_text.value : comment_text.value,
							createdBy: user.value.id,
							ticketId: Ticket.id,
							threadId: thread_id,
						},
					]);

				if (insertError) {
					console.error('Error inserting comment:', insertError);
				} else {
					console.log('Comment created successfully');
					removeImage();
				}
			}
		} catch (error) {
			alert(error.message);
		} finally {
			comment_text.value = '';
			reply_text.value = '';
			comments.value = await fetchComments();
			loading.value = false;
		}
	};

	const handleDescUpdate = async () => {
		const { data, error } = await supabase
			.from('Ticket')
			.update({ desc: input.value })
			.eq('id', route.params.id);
	};

	const handleTicketClose = async (status) => {
		const ticket_status = status !== 'done' ? 'done' : 'backlog';
		const { data, error } = await supabase
			.from('Ticket')
			.update({ status: ticket_status })
			.eq('id', route.params.id);
		navigateTo(`/${route.params.team}/tickets`);
	};

	const handleDelete = async (id, arr) => {
		loading.value = true;
		try {
			if (arr) {
				const { data, error: deleteError } = await supabase
					.from('Comment')
					.delete()
					.eq('id', id);
			} else {
				const { data, error } = await supabase
					.from('Comment')
					.update({ text: 'This message was deleted.', deleted: true })
					.eq('id', id);
			}
		} catch (error) {
			alert(error.message);
		} finally {
			const data = await fetchComments();
			comments.value = data;
			loading.value = false;
		}
	};

	const handleTicketDelete = async (id) => {
		try {
			const { data, error: deleteError } = await supabase
				.from('Ticket')
				.delete()
				.eq('id', id);
		} catch (error) {
			alert(error.message);
		} finally {
			navigateTo(`/tickets`);
		}
	};
</script>

<template>
	<div class="flex min-h-full">
		<div class="flex w-0 flex-1 flex-col">
			<main class="flex-1">
				<div class="py-8 xl:py-10">
					<div
						class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3"
					>
						<div
							class="dark:border-slate-800 xl:col-span-2 xl:border-gray-200 xl:pr-8"
						>
							<div>
								<div>
									<div class="grid grid-cols-7 justify-between md:space-x-4">
										<div class="col-span-7">
											<footer
												class="mb-4 flex w-full items-center"
												id="posted-by"
											>
												<img
													v-if="ticketAvatar"
													:src="ticketAvatar"
													class="mr-2 flex h-12 w-12 items-center justify-center rounded-full object-cover"
												/>

												<div
													v-else
													class="mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800"
												>
													<div class="text-white">
														{{ Ticket.User.firstName[0]
														}}{{ Ticket.User.lastName[0] }}
													</div>
												</div>

												<div class="">
													<div class="flex items-center">
														<span
															class="mr-1 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
														>
															{{ Ticket.User.firstName }}
															{{ Ticket.User.lastName }}
														</span>

														<span
															class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
														>
															{{ ticketDate(Ticket.createdOn) }}
															<!-- {{ Ticket.User.jobTitle }} -->
														</span>
													</div>
													<div class="space-x-1">
														<span
															v-for="badge in Ticket.User.badges"
															:key="badge.id"
															:class="[
																badge.id,
																'py-0.25 rounded-md border border-gray-900/10 px-1 text-xs dark:text-black/70',
															]"
															>{{ badge.text }}</span
														>
													</div>
												</div>
											</footer>
											<h1
												class="text-2xl font-bold text-gray-900 dark:text-white"
											>
												{{ Ticket.name }}
											</h1>
										</div>
									</div>
									<aside class="mt-8 xl:hidden">
										<div
											class="col-span-2 mt-4 flex items-center justify-end space-x-3 md:mt-0"
										>
											<button
												@click="handleTicketClose(Ticket.status)"
												type="button"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-800"
											>
												<CheckCircleIcon
													class="-ml-0.5 h-5 w-5 text-green-500"
													aria-hidden="true"
												/>
												Close ticket
											</button>

											<!-- <button
												type="button"
												@click="handleTicketDelete()"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>
												<TrashIcon
													class="-ml-0.5 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												Delete
											</button> -->
										</div>
										<h2 class="sr-only">Details</h2>
										<div class="space-y-5">
											<div class="flex items-center space-x-2">
												<LockOpenIcon
													class="h-5 w-5 text-green-500"
													aria-hidden="true"
												/>
												<span class="text-sm font-medium text-green-700"
													>Open Ticket</span
												>
											</div>

											<div class="flex items-center space-x-2">
												<CalendarIcon
													class="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												<span
													class="text-sm font-medium text-gray-900 dark:text-white"
													>Created on
													<span>{{
														format(new Date(Ticket.createdOn), 'MMM dd, yyyy')
													}}</span></span
												>
											</div>
											<div class="flex items-center space-x-2">
												<CalendarIcon
													class="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												<span
													class="text-sm font-medium text-gray-900 dark:text-white"
													>Created on
													<span>{{
														format(new Date(Ticket.createdOn), 'MMM dd, yyyy')
													}}</span></span
												>
											</div>
										</div>
										<div
											class="mt-6 space-y-8 border-b border-t border-gray-200 py-6 dark:border-slate-800"
										>
											<div>
												<h2
													class="text-sm font-normal text-gray-500 dark:text-white"
												>
													Assignees
												</h2>
												<ul role="list" class="mt-3 space-y-3">
													<li class="flex justify-start">
														<a href="#" class="flex items-center space-x-3">
															<div class="flex-shrink-0">
																<img
																	class="h-5 w-5 rounded-full object-cover"
																	:src="assignedToAvatar"
																	alt=""
																/>
															</div>
															<div
																class="text-sm font-medium text-gray-900 dark:text-white"
															>
																{{ AssignedTo.firstName }}
																{{ AssignedTo.lastName }}
															</div>
														</a>
													</li>
												</ul>
											</div>
											<div>
												<h2 class="text-sm font-medium text-gray-500">Type</h2>
												<ul role="list" class="mt-2 leading-8">
													<li class="inline">
														<a
															:class="[
																styles[Ticket.type],
																'relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset',
															]"
														>
															<div class="text-xs font-semibold">
																{{ Ticket.type }}
															</div>
														</a>
														{{ ' ' }}
													</li>
												</ul>
											</div>
										</div>
									</aside>
									<div class="xl:pb-0">
										<h2 class="sr-only">Description</h2>

										<Disclosure v-slot="{ open }" as="div">
											<DisclosurePanel class="mt-4 flex items-start space-x-4">
												<div class="min-w-0 flex-1">
													<div class="relative">
														<div
															class="rounded-lg p-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-slate-800"
														>
															<label for="comment" class="sr-only"
																>Edit description</label
															>
															<textarea
																v-model="input"
																@input="update"
																name="comment"
																id="comment"
																class="h-content w-full max-w-full border-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white sm:py-1.5 sm:leading-6"
																placeholder="Reply..."
															></textarea>

															<!-- Spacer element to match the height of the toolbar -->
															<div class="p-2" aria-hidden="true">
																<!-- Matches height of button in toolbar (1px border + 36px content height) -->
																<div class="p-4 py-px">
																	<div class="h-9" />
																</div>
															</div>
														</div>

														<div
															class="absolute inset-x-0 bottom-0 flex justify-end p-2"
														>
															<div
																class="flex flex-shrink-0 items-center space-x-2"
															>
																<DisclosureButton
																	class="inline-flex items-center rounded-md border border-gray-300 p-2 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:border-transparent dark:bg-slate-800 dark:text-white"
																>
																	<svg
																		class="h-6 w-6"
																		fill="none"
																		viewBox="0 0 24 24"
																	>
																		<path
																			stroke="currentColor"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="1.5"
																			d="M17.25 6.75L6.75 17.25"
																		></path>
																		<path
																			stroke="currentColor"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																			stroke-width="1.5"
																			d="M6.75 6.75L17.25 17.25"
																		></path>
																	</svg>
																</DisclosureButton>
																<DisclosureButton
																	type="button"
																	@click="handleDescUpdate()"
																	class="inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:text-indigo-400"
																>
																	<svg
																		class="h-6 w-6"
																		viewBox="0 0 24 24"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M7.75 12.75L10 15.25L16.25 8.75"
																			stroke="currentColor"
																			stroke-width="1.5"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																		></path>
																	</svg>
																</DisclosureButton>
															</div>
														</div>
													</div>
												</div>
											</DisclosurePanel>
											<div class="my-4 flex justify-between">
												<div
													class="prose mr-auto w-full dark:prose-invert"
													v-html="convert(input)"
												></div>
												<div class="">
													<DisclosureButton
														v-if="!open && Ticket.createdBy === user.id"
														class="flex items-center text-xs font-semibold text-gray-800 dark:text-white"
													>
														<div
															data-v-164b91a0=""
															data-test="open-reply-button"
															class="flex items-center"
														>
															<svg
																class="h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M19.25 19.25H13.75"
																></path>
															</svg>
														</div>
													</DisclosureButton>
												</div>
											</div>
										</Disclosure>
									</div>
									<div class="mt-6" v-if="ticketAttachments.length > 0">
										<div class="mb-2">
											<svg
												width="25"
												height="24"
												viewBox="0 0 25 24"
												class="dark:text-slate-400"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M19.4496 11.9511L13.3335 17.8601C11.4156 19.7131 8.30597 19.7131 6.38804 17.8601C4.46306 16.0003 4.47116 12.9826 6.4061 11.1325L12.0503 5.70078C13.3626 4.43293 15.4902 4.43292 16.8025 5.70075C18.1196 6.97324 18.114 9.038 16.7901 10.3039L11.0824 15.7858C10.374 16.4702 9.22538 16.4702 8.51694 15.7858C7.80849 15.1013 7.80849 13.9916 8.51695 13.3071L13.2435 8.74069"
													stroke="currentColor"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												></path>
											</svg>
										</div>

										<div class="grid grid-cols-5 gap-x-4">
											<button
												v-for="image in ticketAttachments"
												class=""
												@click="
													(commentImageId = image), (showImageModal = true)
												"
											>
												<img
													:src="image"
													:alt="image"
													class="h-full w-auto rounded-md object-cover"
												/>
											</button>
										</div>
									</div>
									<div class="mt-2 py-3 text-xs xl:pb-0 xl:pt-6">
										<NuxtLink
											:to="`/${route.params.team}/tickets`"
											class="rounded-md border border-indigo-500 bg-indigo-100 px-2 py-1 font-normal text-indigo-600 transition-colors dark:bg-indigo-800 dark:text-indigo-100 dark:hover:border-indigo-400 dark:hover:text-white"
											>{{ Ticket.Team.name }}</NuxtLink
										>
									</div>
								</div>
							</div>
							<section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
								<div>
									<div class="divide-gray-200 dark:divide-slate-800">
										<div class="pb-4">
											<h2
												id="activity-title"
												class="text-md font-medium text-gray-900 dark:text-white"
											>
												{{ comments.filter((o) => !o.deleted).length }}
												comment{{
													comments.filter((o) => !o.deleted).length > 1
														? 's'
														: ''
												}}
											</h2>
											<div class="mt-3">
												<div
													class="flex space-x-3 rounded-lg p-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:ring-slate-800"
												>
													<div class="flex-shrink-0">
														<div class="relative">
															<img
																v-if="currentAvatar"
																class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 object-cover text-xs"
																:src="currentAvatar"
																alt=""
															/>
															<div
																v-else
																class="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 object-cover text-xs text-white"
															>
																{{ User.firstName[0] }}
															</div>
														</div>
													</div>
													<div class="min-w-0 flex-1">
														<form
															@submit.prevent="handleCommentAdd(null)"
															class=""
														>
															<div>
																<label for="comment" class="sr-only"
																	>Comment</label
																>
																<textarea
																	v-model="comment_text"
																	id="comment"
																	name="comment"
																	rows="3"
																	class="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white sm:py-1.5 sm:text-base sm:leading-6"
																	placeholder="Message ticket"
																/>
															</div>
															<div
																class="mt-6 flex items-end justify-end space-x-4"
															>
																<div
																	v-if="!imageSrc"
																	class="relative ml-auto flex h-10 w-10 cursor-pointer items-center justify-center p-2 text-slate-900 dark:text-slate-200"
																>
																	<span class="cursor-pointer"
																		><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V16M4.75 16V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V12.25L16.5856 9.43947C15.7663 8.48581 14.2815 8.51598 13.5013 9.50017L13.4914 9.51294C13.3977 9.63414 11.9621 11.4909 10.9257 12.8094M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L10.9257 12.8094M10.9257 12.8094L12.25 14.25M10.9257 12.8094C10.9221 12.814 10.9186 12.8185 10.915 12.823" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M17 14.75V19.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M19.25 17L14.75 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
</span>

																	<input
																		type="file"
																		accept="image/*"
																		@change="uploadImage"
																		ref="fileInput"
																		data-test="image-input"
																		class="absolute h-full w-full opacity-0 file:cursor-pointer"
																	/>
																</div>
																<div v-else class="relative ml-auto h-full">
																	<img
																		:src="imageSrc"
																		width="40"
																		height="40"
																		alt=""
																		loading="eager"
																		class="h-10 rounded object-cover"
																	/>
																	<div
																		class="absolute left-0 top-0 h-10 w-10 rounded border border-slate-200 opacity-20"
																	></div>
																	<!---->
																	<button
																		v-if="!loading"
																		@click="removeImage"
																		class="absolute -right-1.5 -top-1.5 h-4 w-4 cursor-pointer rounded-full border border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600"
																		:disabled="loading"
																	>
																		<svg
																			fill="none"
																			xmlns="http://www.w3.org/2000/svg"
																			class="h-4 w-4"
																		>
																			<path
																				d="M7.822 7l2.509-2.503a.586.586 0 00-.829-.828L7 6.177 4.497 3.67a.586.586 0 10-.828.828L6.177 7 3.67 9.502a.583.583 0 00.19.957.584.584 0 00.638-.128L7 7.822l2.502 2.509a.583.583 0 00.957-.19.583.583 0 00-.128-.639L7.822 7z"
																				fill="currentColor"
																			></path>
																		</svg>
																	</button>
																</div>

																<button
																	:disabled="comment_text === ''"
																	type="submit"
																	class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-indigo-600 bg-indigo-700 p-2 text-sm font-semibold text-white shadow-sm hover:border-indigo-500 hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
																>
																	<svg
																		class="h-5 w-5"
																		viewBox="0 0 24 24"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M9.875 13.625L15 19.25L19.25 4.75L4.75 10L9.875 13.625ZM9.875 13.625L12.25 11.75"
																			stroke="currentColor"
																			stroke-width="1.5"
																			stroke-linecap="round"
																			stroke-linejoin="round"
																		></path>
																	</svg>
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>

										<div class="pt-6">
											<!-- Activity feed-->
											<div class="flex" v-if="!loading">
												<div
													v-if="comments.length <= 0"
													class="flex w-full rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm font-semibold text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-800 dark:text-white"
												>
													No comments yet
												</div>

												<section
													class="w-full bg-white dark:bg-transparent"
													v-else
												>
													<div class="mx-auto">
														<article
															v-for="activityItem in comments"
															:key="activityItem.id"
															id="parent-comment"
															class="mb-6 rounded-lg bg-white text-base dark:bg-transparent"
														>
															<div
																class=""
																v-if="
																	!activityItem.deleted ||
																	activityItem.Comment.length > 0
																"
															>
																<footer
																	v-if="!activityItem.deleted"
																	class="mb-2 flex items-center justify-between"
																>
																	<div class="flex items-center">
																		<div
																			class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																		>
																			<img
																				v-if="activityItem.avatarUrl"
																				class="mr-2 h-5 w-5 rounded-full object-cover"
																				:src="activityItem.avatarUrl"
																				alt=""
																			/>
																			<div
																				v-else
																				class="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-sky-600/20 bg-sky-100 text-xs text-sky-500"
																			>
																				<UserCircleIconMini
																					class="m-0 h-5 w-5"
																				/>
																			</div>

																			{{ activityItem.User.firstName }}
																			{{ activityItem.User.lastName }}
																			<div class="ml-2 mr-1 space-x-1">
																				<span
																					v-for="badge in activityItem.User.badges.slice(
																						0,
																						1
																					)"
																					:key="badge.id"
																					:class="[
																						badge.id,
																						'py-0.25 rounded-md border border-gray-900/10 px-1 text-xs dark:text-black/70',
																					]"
																					>{{ badge.text }}</span
																				>
																				<span
																					v-if="
																						activityItem.User.badges.length - 1
																					"
																					class="rounded-md border border-gray-600 px-1.5 text-xs text-gray-400"
																					>+{{
																						activityItem.User.badges.length - 1
																					}}</span
																				>
																			</div>

																			<span
																				class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
																			>
																				{{ ticketDate(activityItem.createdOn) }}
																			</span>
																		</div>
																	</div>

																	<div
																		class="flex space-x-1"
																		v-if="activityItem.createdBy === User.id"
																	>
																		<button
																			class="text-slate-400 transition-colors hover:text-indigo-400"
																		>
																			<svg
																				class="h-5 w-5"
																				fill="none"
																				viewBox="0 0 24 24"
																			>
																				<path
																					stroke="currentColor"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																					stroke-width="1.5"
																					d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
																				></path>
																				<path
																					stroke="currentColor"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																					stroke-width="1.5"
																					d="M19.25 19.25H13.75"
																				></path>
																			</svg>
																		</button>
																		<button
																			@click="handleDelete(activityItem.id)"
																			class="text-slate-400 transition-colors hover:text-rose-400"
																		>
																			<svg
																				class="h-5 w-5"
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
																		</button>
																	</div>
																	<div class="flex space-x-1" v-else>
																		<button
																			class="text-slate-400 transition-colors hover:text-indigo-400"
																		>
																			<svg
																				class="h-5 w-5"
																				viewBox="0 0 24 24"
																				fill="none"
																				xmlns="http://www.w3.org/2000/svg"
																			>
																				<path
																					d="M4.75 5.75V19.25"
																					stroke="currentColor"
																					stroke-width="1.5"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																				></path>
																				<path
																					d="M19.25 15.25V5.75C19.25 5.75 18.5 6.25 16 6.25C13.5 6.25 12 4.75 9 4.75C6 4.75 4.75 5.75 4.75 5.75V15.25C4.75 15.25 6.5 14.25 9 14.25C11.5 14.25 13.5 16.25 16 16.25C18.5 16.25 19.25 15.25 19.25 15.25Z"
																					stroke="currentColor"
																					stroke-width="1.5"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																				></path>
																			</svg>
																		</button>
																	</div>
																</footer>
																<div
																	:class="[
																		activityItem.deleted
																			? 'text-gray-400 dark:text-gray-400'
																			: 'text-gray-900 dark:text-gray-200',
																		'prose pb-2 font-normal dark:prose-invert',
																	]"
																	v-html="convert(activityItem.text)"
																></div>
																<div
																	v-if="
																		activityItem.attachment &&
																		!activityItem.deleted
																	"
																	data-test="war_room_comment_text"
																	class="mt-1 flex overflow-hidden"
																>
																	<button
																		@click="
																			(commentImageId =
																				activityItem.attachment),
																				(showImageModal = true)
																		"
																	>
																		<img
																			v-for="image in activityItem.attachments"
																			:src="image"
																			:alt="activityItem.id"
																			data-test="comment-image"
																			class="max-h-48 max-w-full cursor-pointer rounded-lg"
																		/>
																	</button>
																</div>
															</div>

															<div
																class="ml-2 border-l border-slate-300 dark:border-slate-700"
																v-if="activityItem.Comment.length > 0"
															>
																<article
																	v-for="reply in activityItem.Comment"
																	id="reply-messages"
																	:key="reply.id"
																	class="my-6 w-full pl-2 text-base lg:pl-4"
																>
																	<footer
																		class="mb-2 flex items-center justify-between"
																	>
																		<div class="flex items-center">
																			<div
																				class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																			>
																				<div v-if="reply.avatarUrl">
																					<img
																						class="mr-2 h-5 w-5 rounded-full object-cover"
																						:src="reply.avatarUrl"
																						alt="Jese Leos"
																					/>
																				</div>

																				<div
																					v-else
																					class="mr-2 h-5 w-5 rounded-full bg-slate-300"
																				></div>

																				{{ reply.User.firstName }}
																				{{ reply.User.lastName }}
																				<div class="ml-2 mr-1 space-x-1">
																					<span
																						v-for="badge in reply.User.badges.slice(
																							0,
																							1
																						)"
																						:key="badge.id"
																						:class="[
																							badge.id,
																							'py-0.25 rounded-md border border-gray-900/10 px-1 text-xs dark:text-black/70',
																						]"
																						>{{ badge.text }}</span
																					>
																					<span
																						class="rounded-md border border-gray-600 px-1.5 text-xs text-gray-400"
																						>+{{
																							reply.User.badges.length - 1
																						}}</span
																					>
																				</div>

																				<span
																					class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
																				>
																					{{
																						formatDistance(
																							new Date(reply.createdOn),
																							new Date(),
																							{ addSuffix: true }
																						)
																					}}
																				</span>
																			</div>
																		</div>

																		<div
																			class="flex space-x-1"
																			v-if="reply.createdBy === User.id"
																		>
																			<button
																				class="text-slate-400 transition-colors hover:text-indigo-400"
																			>
																				<svg
																					class="h-5 w-5"
																					fill="none"
																					viewBox="0 0 24 24"
																				>
																					<path
																						stroke="currentColor"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																						stroke-width="1.5"
																						d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z"
																					></path>
																					<path
																						stroke="currentColor"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																						stroke-width="1.5"
																						d="M19.25 19.25H13.75"
																					></path>
																				</svg>
																			</button>
																			<button
																				@click="
																					handleDelete(
																						reply.id,
																						activityItem.Comment
																					)
																				"
																				class="text-slate-400 transition-colors hover:text-rose-400"
																			>
																				<svg
																					class="h-5 w-5"
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
																			</button>
																		</div>
																		<div class="flex space-x-1" v-else>
																			<button
																				class="text-slate-400 transition-colors hover:text-indigo-400"
																			>
																				<svg
																					class="h-5 w-5"
																					viewBox="0 0 24 24"
																					fill="none"
																					xmlns="http://www.w3.org/2000/svg"
																				>
																					<path
																						d="M4.75 5.75V19.25"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																					<path
																						d="M19.25 15.25V5.75C19.25 5.75 18.5 6.25 16 6.25C13.5 6.25 12 4.75 9 4.75C6 4.75 4.75 5.75 4.75 5.75V15.25C4.75 15.25 6.5 14.25 9 14.25C11.5 14.25 13.5 16.25 16 16.25C18.5 16.25 19.25 15.25 19.25 15.25Z"
																						stroke="currentColor"
																						stroke-width="1.5"
																						stroke-linecap="round"
																						stroke-linejoin="round"
																					></path>
																				</svg>
																			</button>
																		</div>
																	</footer>
																	<p
																		class="text-base text-gray-900 dark:text-slate-100"
																	>
																		{{ reply.text }}
																	</p>
																</article>
															</div>
															<div
																class="mt-2"
																v-if="
																	!activityItem.deleted ||
																	activityItem.Comment.length > 0
																"
															>
																<Disclosure v-slot="{ open }">
																	<div
																		class="flex items-center justify-between"
																	>
																		<DisclosureButton
																			class="flex items-center text-xs font-semibold text-gray-800 dark:text-white"
																		>
																			<div
																				data-v-164b91a0=""
																				data-test="open-reply-button"
																				class="flex items-center"
																			>
																				<svg
																					data-v-164b91a0=""
																					viewBox="0 0 16 16"
																					fill="none"
																					xmlns="http://www.w3.org/2000/svg"
																					class="mr-1 h-4 w-4"
																				>
																					<path
																						data-v-164b91a0=""
																						d="M13.74 12.793a4.668 4.668 0 00-1.827-7.046 5.333 5.333 0 10-9.46 4.193l-.926.92a.667.667 0 00-.14.727A.667.667 0 002 12h3.793A4.667 4.667 0 0010 14.667h4a.667.667 0 00.613-.414.667.667 0 00-.14-.726l-.733-.734zM5.333 10c.001.223.02.446.054.667h-1.78l.233-.227a.666.666 0 000-.947 3.953 3.953 0 01-1.173-2.826 4 4 0 014-4 3.96 3.96 0 013.766 2.666H10A4.667 4.667 0 005.333 10zm7.027 3.333l.033.034H10a3.334 3.334 0 112.36-.974.667.667 0 00-.2.467.666.666 0 00.2.473z"
																						fill="currentColor"
																					></path>
																				</svg>
																				Reply
																			</div>
																		</DisclosureButton>

																		<!-- <p
																				class="mr-2 text-xs text-gray-500 dark:text-slate-400"
																			>
																				{{
																					format(
																						new Date(activityItem.createdOn),
																						'MMM dd, hh:mm aa'
																					)
																				}}
																			</p> -->
																	</div>

																	<DisclosurePanel
																		class="mt-3 flex items-start space-x-4"
																	>
																		<div class="min-w-0 flex-1">
																			<form
																				@submit.prevent="
																					handleCommentAdd(activityItem.id)
																				"
																				class="relative"
																			>
																				<div
																					class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-slate-800"
																				>
																					<label for="comment" class="sr-only"
																						>Reply...</label
																					>
																					<textarea
																						v-model="reply_text"
																						name="comment"
																						id="comment"
																						class="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-slate-400 focus:ring-0 dark:text-white sm:py-1.5 sm:text-sm sm:leading-6"
																						placeholder="Reply..."
																					/>

																					<!-- Spacer element to match the height of the toolbar -->
																					<div class="py-2" aria-hidden="true">
																						<!-- Matches height of button in toolbar (1px border + 36px content height) -->
																						<div class="py-px">
																							<div class="h-9" />
																						</div>
																					</div>
																				</div>

																				<div
																					class="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2"
																				>
																					<div
																						class="flex flex-shrink-0 items-center space-x-2"
																					>
																						<DisclosureButton
																							class="inline-flex items-center rounded-md border border-gray-300 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
																						>
																							<svg
																								class="h-5 w-5"
																								fill="none"
																								viewBox="0 0 24 24"
																							>
																								<path
																									stroke="currentColor"
																									stroke-linecap="round"
																									stroke-linejoin="round"
																									stroke-width="1.5"
																									d="M17.25 6.75L6.75 17.25"
																								></path>
																								<path
																									stroke="currentColor"
																									stroke-linecap="round"
																									stroke-linejoin="round"
																									stroke-width="1.5"
																									d="M6.75 6.75L17.25 17.25"
																								></path>
																							</svg>
																						</DisclosureButton>
																						<button
																							type="submit"
																							class="inline-flex items-center rounded-md border border-indigo-500 bg-indigo-600 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:text-indigo-400"
																						>
																							<svg
																								class="h-5 w-5"
																								viewBox="0 0 24 24"
																								fill="none"
																								xmlns="http://www.w3.org/2000/svg"
																							>
																								<path
																									d="M9.875 13.625L15 19.25L19.25 4.75L4.75 10L9.875 13.625ZM9.875 13.625L12.25 11.75"
																									stroke="currentColor"
																									stroke-width="1.5"
																									stroke-linecap="round"
																									stroke-linejoin="round"
																								></path>
																							</svg>
																						</button>
																					</div>
																				</div>
																			</form>
																		</div>
																	</DisclosurePanel>
																</Disclosure>
															</div>
														</article>
													</div>
												</section>
											</div>
											<div
												v-else
												class="relative flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-slate-700"
											>
												<loading-spinner />
											</div>
											<!-- Comment Box  -->
										</div>
									</div>
								</div>
							</section>
						</div>
						<aside class="hidden xl:block xl:pl-8">
							<div
								class="mb-8 mt-4 flex items-center justify-between space-x-3 md:mt-0"
							>
								<button
									@click="handleTicketClose(Ticket.status)"
									type="button"
									class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800 dark:hover:text-white dark:hover:ring-slate-600"
								>
									<CheckCircleIcon
										class="-ml-0.5 h-5 w-5 text-green-500"
										aria-hidden="true"
									/>

									{{
										Ticket.status !== 'done' ? 'Close ticket' : 'Open ticket'
									}}
								</button>
								<button
									v-if="User.Account.type === 'super_admin'"
									@click="handleTicketDelete(Ticket.id)"
									type="button"
									class="inline-flex justify-center gap-x-1.5 rounded-md bg-white p-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 dark:bg-red-800 dark:text-red-300 dark:ring-red-700 dark:hover:bg-red-800 dark:hover:text-red-100 dark:hover:ring-red-600"
								>
									<svg
										class="h-5 w-5"
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
								</button>

								<!-- <button
												type="button"
												@click="handleTicketDelete()"
												class="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>
												<TrashIcon
													class="-ml-0.5 h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
												Delete
											</button> -->
							</div>
							<h2 class="sr-only">Details</h2>
							<div class="space-y-3">
								<div
									class="flex items-center space-x-2"
									v-if="Ticket.status !== 'done'"
								>
									<svg
										class="h-6 w-6 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M5.75 11.75C5.75 11.1977 6.19772 10.75 6.75 10.75H17.25C17.8023 10.75 18.25 11.1977 18.25 11.75V17.25C18.25 18.3546 17.3546 19.25 16.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V11.75Z"
										></path>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M7.75 10.5V9.84343C7.75 8.61493 7.70093 7.29883 8.42416 6.30578C8.99862 5.51699 10.0568 4.75 12 4.75C14 4.75 15.25 6.25 15.25 6.25"
										></path>
									</svg>

									<span class="text-sm text-green-700">Open Ticket</span>
								</div>
								<div class="flex items-center space-x-2" v-else>
									<svg
										class="h-6 w-6 text-red-500"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M5.75 11.75C5.75 11.1977 6.19772 10.75 6.75 10.75H17.25C17.8023 10.75 18.25 11.1977 18.25 11.75V17.25C18.25 18.3546 17.3546 19.25 16.25 19.25H7.75C6.64543 19.25 5.75 18.3546 5.75 17.25V11.75Z"
										></path>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M7.75 10.5V10.3427C7.75 8.78147 7.65607 7.04125 8.74646 5.9239C9.36829 5.2867 10.3745 4.75 12 4.75C13.6255 4.75 14.6317 5.2867 15.2535 5.9239C16.3439 7.04125 16.25 8.78147 16.25 10.3427V10.5"
										></path>
									</svg>

									<span class="text-sm text-red-700">Closed Ticket</span>
								</div>

								<!-- <div class="flex items-center space-x-2">
									<CalendarIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<span class="text-sm text-gray-900 dark:text-slate-300"
										>Created
										<span>{{
											format(new Date(Ticket.createdOn), 'MMM dd, yyyy')
										}}</span></span
									>
								</div> -->
								<div class="flex items-center space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6  text-gray-400"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M19.25 9.25v-.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h2.5m5.75-5.5V15l1.25 1.25M8 4.75v3.5m8-3.5v3.5m-1 11a4.25 4.25 0 1 1 0-8.5 4.25 4.25 0 0 1 0 8.5Z"
										></path>
									</svg>

									<span class="text-sm text-gray-900 dark:text-slate-300"
										>Due in <span>{{ dueDate }}</span></span
									>
								</div>
							</div>
							<div
								class="mt-6 space-y-8 border-t border-gray-200 py-6 dark:border-slate-700"
							>
								<div>
									<h2
										class="text-sm font-normal text-gray-500 dark:text-slate-400"
									>
										Assignees
									</h2>
									<ul role="list" class="mt-3 space-y-3">
										<li class="flex justify-start">
											<a class="flex items-center space-x-3">
												<div class="flex-shrink-0">
													<img
														v-if="assignedToAvatar"
														class="h-5 w-5 rounded-full object-cover"
														:src="assignedToAvatar"
														alt=""
													/>
													<div
														v-else
														class="flex h-5 w-5 items-center justify-center rounded-full border border-slate-600 bg-slate-700 text-center text-xs text-slate-400"
													>
														{{ AssignedTo.firstName[0] }}
													</div>
												</div>
												<div
													class="text-sm font-medium text-gray-900 dark:text-slate-100"
												>
													{{ AssignedTo.firstName }} {{ AssignedTo.lastName }}
												</div>
											</a>
										</li>
									</ul>
								</div>
								<div>
									<h2
										class="text-sm font-normal text-gray-500 dark:text-slate-400"
									>
										Type
									</h2>
									<ul role="list" class="mt-2 leading-8">
										<li class="inline">
											<a
												:class="[
													styles[Ticket.type],
													'relative inline-flex items-center rounded-full px-2.5 py-1 ring-1 ring-inset',
												]"
											>
												<div class="text-xs font-medium capitalize">
													{{ Ticket.type }}
												</div>
											</a>
											{{ ' ' }}
										</li>
									</ul>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</main>
		</div>
		<ImageModal
			:isOpen="showImageModal"
			:imageSrc="commentImageId"
			:imageAlt="commentImageId"
			:toggleModal="toggleModal"
		/>
	</div>
</template>

<style scoped>
	.mg_admin {
		background: conic-gradient(
			from 171.52deg at 50% 50%,
			#f0f1f6 0deg,
			#a0b9cc 90deg,
			#dde5f0 180deg,
			#c5e6f9 234.26deg,
			#a7b5bb 270deg,
			#ecf1f4 1turn
		);
	}

	.member {
		background: linear-gradient(
			0.311turn,
			#cf9a8c,
			#eabcb1 24.38%,
			#f5c9c0 50%,
			#eabcb1 77.15%,
			#cf9a8c
		);
	}

	.mg_officer {
		background: linear-gradient(
			0.311turn,
			#e3bc5a,
			#e9d8ab 25%,
			#f4e9c4 50%,
			#e9d8ab 75%,
			#e3bc5a
		);
	}
</style>
