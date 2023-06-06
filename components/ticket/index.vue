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
		Switch,
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
	const dealSize = ref(0);

	const ticketAttachments = ref([]);
	const aiResponse = ref('');

	const commentImageId = ref('');
	const showImageModal = ref(false);

	// const aiEnabled = ref(Ticket.ai_enabled);

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
		referral:
			'bg-pink-100 dark:bg-pink-700 dark:ring-pink-500 ring-pink-300  text-pink-900 dark:text-pink-200',
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
			'*, Team(id,name), Comment(*,User(firstName,lastName,systemRole,id,avatarPath,country,jobTitle,badges,email),Comment(*,User(firstName,lastName,systemRole,id,avatarPath,country,jobTitle,badges))), User(*)'
		)
		.eq('id', route.params.id)
		.limit(1)
		.single();

	dealSize.value = Ticket.deal_size;

	const input = ref(Ticket.desc);

	if (!Ticket) {
		navigateTo('/ticket-not-found');
	}

	const dueDate = computed(() => {
		return formatDistance(new Date(Ticket.dueDate), new Date(), {
			addPrefix: true,
		});
	});

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

	// const handleAIToggle = async (id) => {
	// 	const { data, error } = await supabase
	// 		.from('Ticket')
	// 		.update({ ai_enabled: !aiEnabled.value })
	// 		.eq('id', id);
	// };

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
					console.error(
						'Error inserting comment with attachment:',
						insertError
					);
				} else {
					console.log('Image uploaded and comment created successfully');
					removeImage();
				}
			} else {
				const { data, error: insertCommentError } = await supabase
					.from('Comment')
					.insert([
						{
							text: thread_id !== null ? reply_text.value : comment_text.value,
							createdBy: user.value.id,
							ticketId: Ticket.id,
							threadId: thread_id,
						},
					]);

				if (insertCommentError) {
					console.error('Error inserting comment:', insertCommentError);
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

	const handleDealSizeUpdate = async () => {
		loading.value = true;
		const { data, error } = await supabase
			.from('Ticket')
			.update({ deal_size: parseInt(dealSize.value) })
			.eq('id', route.params.id);
		loading.value = false;
	};

	// const handleTicketClose = async (status) => {
	// 	const ticket_status = status !== 'done' ? 'done' : 'backlog';
	// 	const { data, error } = await supabase
	// 		.from('Ticket')
	// 		.update({ status: ticket_status })
	// 		.eq('id', route.params.id);
	// 	navigateTo(`/${route.params.team}/tickets`);
	// };

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

	// const handleTicketDelete = async (id) => {
	// 	try {
	// 		const { data, error: deleteError } = await supabase
	// 			.from('Ticket')
	// 			.delete()
	// 			.eq('id', id);
	// 	} catch (error) {
	// 		alert(error.message);
	// 	} finally {
	// 		navigateTo(`/tickets`);
	// 	}
	// };
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
											<header
												class="mb-4 flex w-full items-center"
												id="posted-by"
											>
												<div class="relative" v-if="ticketAvatar">
													<img
														:src="ticketAvatar"
														class="relative mr-2 flex h-12 w-12 items-center justify-center rounded-full object-cover"
													/>
													<img
														src="~/assets/images/logo.png"
														alt=""
														class="absolute bottom-0 right-1 h-5 w-5 rounded-full object-cover"
													/>
												</div>

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
														<NuxtLink
															:to="`/profile/${Ticket.User.id}`"
															class="mr-1 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
														>
															{{ Ticket.User.firstName }}
															{{ Ticket.User.lastName }}
														</NuxtLink>

														<span
															class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
														>
															{{ formatDateDistance(Ticket.createdOn) }}
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
															><span :class="`${badge.id}-text`">{{
																badge.text
															}}</span></span
														>
													</div>
												</div>
											</header>
											<div
												class="mb-2 mt-5 flex items-center space-x-2 text-xs capitalize text-sky-400"
											>
												<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24">
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M12 4.75L13.75 10.25H19.25L14.75 13.75L16.25 19.25L12 15.75L7.75 19.25L9.25 13.75L4.75 10.25H10.25L12 4.75Z"
													></path>
												</svg>

												{{ Ticket.User.companyName }} {{ Ticket.type }}
											</div>
											<h1
												class="text-2xl font-semibold text-gray-900 dark:text-white"
											>
												<div class="" v-if="Ticket.type === 'referral'">
													{{ Ticket.User.firstName }}
													<span class="text-slate-400">referred</span>
													{{ Ticket.name }}
													<span class="text-slate-400">for a</span>
													${{ abbreviatedNumber(dealSize) }}
													<span class="text-slate-400">deal</span>
												</div>
												<div class="" v-else>{{ Ticket.name }}</div>
											</h1>
										</div>
									</div>
									<!-- Aside for smaller screens -->
									<aside class="mt-8 xl:hidden">
										<h2 class="sr-only">Details</h2>
										<div class="space-y-5">
											<div class="flex items-center space-x-2">
												<svg
													class="h-5 w-5 text-white"
													aria-hidden="true"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M16.0753 17.7902C15.4999 16.5 13.6564 15.75 12 15.75C10.3436 15.75 8.49988 16.5 7.92468 17.7902"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M11.75 12.25L14.25 9.75"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
												</svg>

												<ticket-stage-change
													:status="Ticket.status"
													:enabled="User.Account.type === 'super_admin'"
												/>
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
									<div class="mt-16 text-white">
										<button>Up and down</button>
									</div>
								</div>
							</div>
							<section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
								<div>
									<div class="divide-gray-200 dark:divide-slate-800">
										<div class="space-y-3 pb-4">
											<div class="flex justify-end">
												<div
													class="flex items-center rounded-full border border-[#423455] bg-[#1A1B2C] pl-2 pr-3 text-sm text-white"
												>
													<svg
														class="mr-0.5 h-5 w-5"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<defs>
															<linearGradient
																id="gradient"
																x1="0%"
																y1="0%"
																x2="0%"
																y2="100%"
															>
																<stop offset="0%" stop-color="#7000FF" />
																<stop offset="100%" stop-color="#00C2FF" />
															</linearGradient>
														</defs>
														<path
															d="M12 18.25C15.866 18.25 19.25 16.1552 19.25 11.5C19.25 6.84483 15.866 4.75 12 4.75C8.13401 4.75 4.75 6.84483 4.75 11.5C4.75 13.2675 5.23783 14.6659 6.05464 15.7206C6.29358 16.0292 6.38851 16.4392 6.2231 16.7926C6.12235 17.0079 6.01633 17.2134 5.90792 17.4082C5.45369 18.2242 6.07951 19.4131 6.99526 19.2297C8.0113 19.0263 9.14752 18.722 10.0954 18.2738C10.2933 18.1803 10.5134 18.1439 10.7305 18.1714C11.145 18.224 11.5695 18.25 12 18.25Z"
															stroke="url(#gradient)"
															stroke-width="1.5"
															stroke-linecap="round"
															stroke-linejoin="round"
														></path>
													</svg>

													#ask-motis
												</div>
											</div>
											<TicketAiModal
												:comment="comment_text"
												:enabled="Ticket.ai_enabled"
											/>
											<div class="">
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
																	class="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-white/30 focus:ring-0 dark:text-white sm:py-1.5 sm:text-sm sm:leading-6"
																	placeholder="Press 'ctrl' for Tracy AI"
																/>
															</div>
															<div
																class="mt-6 flex items-end justify-end space-x-4"
															>
																<div class="flex space-x-4">
																	<div
																		v-if="!imageSrc"
																		class="relative ml-auto flex h-10 w-10 cursor-pointer items-center justify-center p-2 text-slate-900 dark:text-slate-200"
																	>
																		<span class="cursor-pointer"
																			><svg
																				class="h-6 w-6"
																				viewBox="0 0 24 24"
																				fill="none"
																				xmlns="http://www.w3.org/2000/svg"
																			>
																				<path
																					d="M11.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V16M4.75 16V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V12.25L16.5856 9.43947C15.7663 8.48581 14.2815 8.51598 13.5013 9.50017L13.4914 9.51294C13.3977 9.63414 11.9621 11.4909 10.9257 12.8094M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L10.9257 12.8094M10.9257 12.8094L12.25 14.25M10.9257 12.8094C10.9221 12.814 10.9186 12.8185 10.915 12.823"
																					stroke="currentColor"
																					stroke-width="1.5"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																				></path>
																				<path
																					d="M17 14.75V19.25"
																					stroke="currentColor"
																					stroke-width="1.5"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																				></path>
																				<path
																					d="M19.25 17L14.75 17"
																					stroke="currentColor"
																					stroke-width="1.5"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																				></path>
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
													No activity yet
												</div>

												<section
													class="w-full bg-white dark:bg-transparent"
													v-else
												>
													<div class="mx-auto">
														<div class="">
															<article
																v-for="(
																	activityItem, activityItemIdx
																) in comments"
																:key="activityItem.id"
																id="parent-comment"
																class="relative mb-6 rounded-lg text-base"
															>
																<div
																	v-if="activityItemIdx < comments.length - 1"
																	:class="[
																		activityItemIdx === comments.length
																			? 'h-6'
																			: '-bottom-6',
																		'absolute left-0 top-0 flex w-6 justify-center',
																	]"
																>
																	<div
																		class="w-px bg-gradient-to-b from-slate-300/10 via-slate-300/20 to-slate-300/10"
																	/>
																</div>
																<div
																	v-if="
																		activityItem.activity_type ===
																			'user_comment' ||
																		activityItem.activity_type === 'ai_comment'
																	"
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
																						class="relative z-0 mr-2 h-6 w-6 rounded-full object-cover ring-8 ring-white dark:ring-[#020014]"
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
																					<div
																						class="ml-2 mr-1 flex items-center space-x-1"
																					>
																						<div
																							v-for="badge in activityItem.User.badges.slice(
																								0,
																								1
																							)"
																							:key="badge.id"
																							:class="[
																								badge.id,
																								'py-0.25 flex items-center justify-center rounded-md px-1 leading-4',
																							]"
																						>
																							<span
																								:class="`${badge.id}-text flex items-center`"
																								><svg
																									v-if="badge.id === 'mg_ai'"
																									class="h-3 w-3"
																									viewBox="0 0 24 24"
																									fill="none"
																									xmlns="http://www.w3.org/2000/svg"
																								>
																									<path
																										d="M9.75 13C14 13 14 7.75 14 7.75C14 7.75 14 13 18.25 13C14 13 14 18.25 14 18.25C14 18.25 14 13 9.75 13Z"
																										fill="#8900ff"
																									></path>
																									<path
																										d="M5.75 8C8 8 8 5.75 8 5.75C8 5.75 8 8 10.25 8C8 8 8 10.25 8 10.25C8 10.25 8 8 5.75 8Z"
																										fill="#8900ff"
																									></path>
																									<path
																										d="M7.75 16.25H7.76M18.25 5.75H18.26M18.25 18.25H18.26M14 7.75C14 7.75 14 13 9.75 13C14 13 14 18.25 14 18.25C14 18.25 14 13 18.25 13C14 13 14 7.75 14 7.75ZM8 5.75C8 5.75 8 8 5.75 8C8 8 8 10.25 8 10.25C8 10.25 8 8 10.25 8C8 8 8 5.75 8 5.75Z"
																										stroke="#8900ff"
																										stroke-width="1.5"
																										stroke-linecap="round"
																										stroke-linejoin="round"
																									></path></svg
																								>{{ badge.text }}</span
																							>
																						</div>
																						<div
																							v-if="
																								activityItem.User.badges
																									.length - 1
																							"
																							class="badge-extra rounded-md border border-gray-600 px-1.5 leading-4 text-gray-400"
																						>
																							+{{
																								activityItem.User.badges
																									.length - 1
																							}}
																						</div>
																					</div>

																					<span
																						class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
																					>
																						{{
																							formatDateDistance(
																								activityItem.createdOn
																							)
																						}}
																					</span>
																				</div>
																			</div>

																			<div
																				class="flex space-x-1"
																				v-if="
																					activityItem.createdBy === User.id ||
																					User.systemRole === 'super_admin'
																				"
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
																							activityItem.id,
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
																		<div
																			:class="[
																				activityItem.User.id === User.id
																					? 'prose-invert bg-[#4CA2FF] text-white ring-white/5 dark:bg-[#0166C8]'
																					: 'bg-[#E6E5EB] ring-black/5 dark:prose-invert dark:bg-[#1C1B2C] dark:text-gray-200 dark:ring-white/5',
																				activityItem.activity_type ===
																				'ai_comment'
																					? 'ai_shadow shadow-inset shadow-[#9643FF]/25'
																					: '',
																				activityItem.deleted
																					? 'text-black/30 dark:text-white/50'
																					: '',
																				'ml-8 rounded-b-lg rounded-r-lg rounded-tl-sm px-4 py-3 text-sm leading-7 ring-1 ring-inset',
																			]"
																			v-html="convert(activityItem.text)"
																		></div>
																		<div class="mt-2 pl-8">
																			<a
																				v-if="
																					activityItem.text.includes('below') &&
																					activityItem.User.systemRole ===
																						'super_admin'
																				"
																				:href="`https://calendly.com/motis-group/partners?name=${
																					Ticket.User.firstName +
																					' ' +
																					Ticket.User.lastName
																				}&email=${
																					Ticket.User.email
																				}&utm_source=${Ticket.id}`"
																				target="_blank"
																				class="rounded-md border border-indigo-500 bg-indigo-100 px-2 py-1 text-xs font-normal text-indigo-600 transition-colors dark:bg-indigo-800 dark:text-indigo-100 dark:hover:border-indigo-400 dark:hover:text-white"
																				>Schedule a call</a
																			>
																		</div>
																		<div
																			v-if="
																				activityItem.attachment &&
																				!activityItem.deleted
																			"
																			class="my-3 flex overflow-hidden pl-8"
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
																		class="ml-4"
																		v-if="activityItem.Comment.length > 0"
																	>
																		<article
																			v-for="(
																				reply, idx
																			) in activityItem.Comment"
																			id="reply-messages"
																			:key="reply.id"
																			class="relative my-6 pl-2 text-base lg:pl-4"
																		>
																			<div
																				v-if="
																					idx < activityItem.Comment.length - 1
																				"
																				:class="[
																					activityItemIdx === comments.length
																						? 'h-6 '
																						: '-bottom-6',
																					'absolute  left-0 top-0 flex w-12 justify-center',
																				]"
																			>
																				<div
																					class="w-px bg-gradient-to-b from-slate-300/0 via-slate-300/20 to-slate-300/0"
																				/>
																			</div>
																			<footer
																				class="mb-2 flex items-center justify-between"
																			>
																				<div class="flex items-center">
																					<div
																						class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																					>
																						<div
																							v-if="reply.avatarUrl"
																							class=""
																						>
																							<img
																								class="relative z-50 mr-2 h-6 w-6 rounded-full object-cover ring-8 ring-white dark:ring-[#020014]"
																								:src="reply.avatarUrl"
																								:alt="
																									reply.User.firstName +
																									' ' +
																									reply.User.lastName
																								"
																							/>
																						</div>

																						<div
																							v-else
																							class="mr-2 h-5 w-5 rounded-full bg-slate-300"
																						></div>

																						{{ reply.User.firstName }}
																						{{ reply.User.lastName }}
																						<div
																							class="ml-2 mr-1 flex items-center space-x-1"
																						>
																							<div
																								v-for="badge in reply.User.badges.slice(
																									0,
																									1
																								)"
																								:key="badge.id"
																								:class="[
																									badge.id,
																									'py-0.25 flex items-center justify-center rounded-md px-1 text-xs',
																								]"
																							>
																								<span
																									:class="`${badge.id}-text flex items-center`"
																									><svg
																										v-if="badge.id === 'mg_ai'"
																										class="h-4 w-4"
																										viewBox="0 0 24 24"
																										fill="none"
																										xmlns="http://www.w3.org/2000/svg"
																									>
																										<path
																											d="M9.75 13C14 13 14 7.75 14 7.75C14 7.75 14 13 18.25 13C14 13 14 18.25 14 18.25C14 18.25 14 13 9.75 13Z"
																											fill="#8900ff"
																										></path>
																										<path
																											d="M5.75 8C8 8 8 5.75 8 5.75C8 5.75 8 8 10.25 8C8 8 8 10.25 8 10.25C8 10.25 8 8 5.75 8Z"
																											fill="#8900ff"
																										></path>
																										<path
																											d="M7.75 16.25H7.76M18.25 5.75H18.26M18.25 18.25H18.26M14 7.75C14 7.75 14 13 9.75 13C14 13 14 18.25 14 18.25C14 18.25 14 13 18.25 13C14 13 14 7.75 14 7.75ZM8 5.75C8 5.75 8 8 5.75 8C8 8 8 10.25 8 10.25C8 10.25 8 8 10.25 8C8 8 8 5.75 8 5.75Z"
																											stroke="#8900ff"
																											stroke-width="1.5"
																											stroke-linecap="round"
																											stroke-linejoin="round"
																										></path></svg
																									>{{ badge.text }}</span
																								>
																							</div>

																							<div
																								v-if="
																									reply.User.badges.length > 1
																								"
																								class="badge-extra rounded-md border border-gray-600 px-1.5 leading-4 text-black/40 dark:text-gray-400"
																							>
																								+{{
																									reply.User.badges.length - 1
																								}}
																							</div>
																						</div>

																						<span
																							class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
																						>
																							{{
																								formatDateDistance(
																									reply.createdOn
																								)
																							}}
																						</span>
																					</div>
																				</div>

																				<div
																					class="flex space-x-1"
																					v-if="
																						reply.createdBy === User.id ||
																						(User.systemRole ===
																							'super_admin' &&
																							reply.activity_type ===
																								'ai_comment')
																					"
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
																				:class="[
																					reply.User.id === User.id
																						? 'prose-invert bg-[#4CA2FF] text-white ring-white/5 dark:prose-invert dark:bg-[#0166C8]'
																						: 'prose bg-[#E6E5EB] ring-black/5 dark:prose-invert dark:bg-[#1C1B2C] dark:ring-white/5',
																					reply.activity_type === 'ai_comment'
																						? 'ai_shadow shadow-inset shadow-[#9643FF]/25'
																						: '',
																					'ml-8 rounded-b-lg rounded-r-lg rounded-tl-sm px-4 py-3 text-sm leading-7 ring-1 ring-inset',
																				]"
																			>
																				{{ reply.text }}
																			</p>
																			<div class="mt-2 pl-8">
																				<NuxtLink
																					v-if="
																						reply.text.includes('below') &&
																						reply.User.systemRole ===
																							'super_admin'
																					"
																					:to="`https://calendly.com/motis-group/partners?name=${
																						Ticket.User.firstName +
																						' ' +
																						Ticket.User.lastName
																					}&email=${
																						Ticket.User.email
																					}&utm_source=${Ticket.id}`"
																					target="_blank"
																					class="rounded-md border border-indigo-500 bg-indigo-100 px-2 py-1 text-xs font-normal text-indigo-600 transition-colors dark:bg-indigo-800 dark:text-indigo-100 dark:hover:border-indigo-400 dark:hover:text-white"
																					>Schedule a call</NuxtLink
																				>
																			</div>
																		</article>
																	</div>
																	<div
																		id="reply-to-comment"
																		class="mt-2"
																		v-if="
																			!activityItem.deleted ||
																			activityItem.Comment.length > 0
																		"
																	>
																		<Disclosure v-slot="{ open }">
																			<div
																				class="flex items-center justify-start pl-8"
																			>
																				<img
																					:src="currentAvatar"
																					alt=""
																					class="h-5 w-5 rounded-full object-cover"
																				/>

																				<DisclosureButton
																					class="ml-2 flex items-center text-xs font-normal text-gray-800 transition-colors dark:text-white dark:hover:text-[#9382ff]"
																				>
																					<div class="flex items-center">
																						<svg
																							class="mr-0.5 h-4 w-4"
																							viewBox="0 0 24 24"
																							fill="none"
																							xmlns="http://www.w3.org/2000/svg"
																						>
																							<path
																								d="M4.75 11L11.25 4.75V9.25C19.25 9.25 19.25 15 19.25 19.25C17 13 11.25 12.75 11.25 12.75V17.25L4.75 11Z"
																								stroke="currentColor"
																								stroke-width="1.5"
																								stroke-linecap="round"
																								stroke-linejoin="round"
																							></path></svg
																						><span>Comment as &nbsp;</span
																						><span class="font-medium"
																							>{{ User.firstName }}
																							{{ User.lastName }}</span
																						>
																					</div>
																				</DisclosureButton>
																			</div>

																			<DisclosurePanel
																				class="mt-3 flex items-start space-x-4 pl-8"
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
																							<label
																								for="comment"
																								class="sr-only"
																								>Reply...</label
																							>
																							<textarea
																								v-model="reply_text"
																								name="comment"
																								id="comment"
																								class="block w-full resize-none border-0 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder:text-slate-400 focus:ring-0 dark:text-white sm:py-2 sm:leading-6"
																								placeholder="Reply..."
																							/>

																							<!-- Spacer element to match the height of the toolbar -->
																							<div
																								class="py-2"
																								aria-hidden="true"
																							>
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
																</div>
																<div v-else>
																	<div class="py-2">
																		<footer
																			class="mb-2 flex items-center justify-between"
																		>
																			<div class="flex items-center">
																				<div
																					class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
																				>
																					<img
																						v-if="activityItem.avatarUrl"
																						class="z-10 mr-2 h-5 w-5 rounded-full object-cover ring-8 ring-white dark:ring-[#020015]"
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
																					<div
																						class="mr-1 flex items-center space-x-1"
																					>
																						{{ activityItem.User.firstName }}
																						{{ activityItem.User.lastName }}
																					</div>
																					<div
																						class="font-normal text-slate-400"
																					>
																						{{ activityItem.text }}
																					</div>

																					<span
																						class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
																					>
																						{{
																							formatDateDistance(
																								activityItem.createdOn
																							)
																						}}
																					</span>
																				</div>
																			</div>
																		</footer>

																		<div
																			v-if="
																				activityItem.attachment &&
																				!activityItem.deleted
																			"
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
																</div>
															</article>
														</div>
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
						<!-- Ticket details big -->
						<aside class="hidden xl:block xl:pl-8">
							<h2 class="sr-only">Details</h2>
							<div class="space-y-3">
								<div
									class="flex items-center space-x-2 text-sm dark:text-white"
								>
									<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24">
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M19.25 11.75L17.6644 6.20056C17.4191 5.34195 16.6344 4.75 15.7414 4.75H8.2586C7.36564 4.75 6.58087 5.34196 6.33555 6.20056L4.75 11.75"
										></path>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M10.2142 12.3689C9.95611 12.0327 9.59467 11.75 9.17085 11.75H4.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V11.75H14.8291C14.4053 11.75 14.0439 12.0327 13.7858 12.3689C13.3745 12.9046 12.7276 13.25 12 13.25C11.2724 13.25 10.6255 12.9046 10.2142 12.3689Z"
										></path>
									</svg>

									<NuxtLink
										:to="`/${route.params.team}/tickets`"
										:class="[
											styles[Ticket.type],
											'rounded-md px-2 py-1 font-normal capitalize ring-1 ring-inset transition-colors',
										]"
										>{{ Ticket.type }}</NuxtLink
									>
								</div>
								<div class="flex items-center space-x-2 dark:text-white">
									<svg
										class="h-6 w-6"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9.25 9.25V6.75C9.25 6.19772 8.80228 5.75 8.25 5.75H5.75C5.19772 5.75 4.75 6.19772 4.75 6.75V9.25C4.75 9.80228 5.19772 10.25 5.75 10.25H8.25C8.80228 10.25 9.25 9.80228 9.25 9.25Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M9.25 18.25H5.75C5.19772 18.25 4.75 17.8023 4.75 17.25V13.75"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M12.75 6.75H19.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M12.75 14.75H19.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M12.75 9.25H19.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M12.75 17.25H19.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M8 16.25L7.42383 16.7301C7.59297 16.9331 7.85641 17.0321 8.11735 16.9908C8.37829 16.9494 8.59824 16.7738 8.69636 16.5285L8 16.25ZM10.8011 13.2587C11.0821 12.9543 11.0631 12.4799 10.7587 12.1989C10.4543 11.9179 9.97985 11.9369 9.6989 12.2413L10.8011 13.2587ZM7.32617 14.2699C7.06099 13.9517 6.58807 13.9087 6.26986 14.1738C5.95165 14.439 5.90866 14.9119 6.17383 15.2301L7.32617 14.2699ZM8.69636 16.5285C9.03866 15.6728 9.56133 14.855 10.0115 14.2398C10.2345 13.9351 10.4349 13.6865 10.5785 13.5152C10.6503 13.4296 10.7076 13.3637 10.7462 13.32C10.7655 13.2981 10.7801 13.2819 10.7894 13.2716C10.7941 13.2664 10.7974 13.2627 10.7994 13.2606C10.8004 13.2595 10.801 13.2588 10.8013 13.2585C10.8015 13.2583 10.8015 13.2583 10.8015 13.2583C10.8015 13.2583 10.8014 13.2584 10.8014 13.2584C10.8013 13.2585 10.8013 13.2585 10.8012 13.2586C10.8012 13.2586 10.8011 13.2587 10.25 12.75C9.6989 12.2413 9.69881 12.2414 9.69872 12.2415C9.69868 12.2415 9.69858 12.2416 9.6985 12.2417C9.69835 12.2419 9.69817 12.2421 9.69797 12.2423C9.69757 12.2427 9.69708 12.2433 9.6965 12.2439C9.69534 12.2452 9.69382 12.2468 9.69194 12.2489C9.68819 12.253 9.68303 12.2587 9.67653 12.2658C9.66352 12.2802 9.64515 12.3007 9.62195 12.327C9.57558 12.3795 9.50986 12.4551 9.42926 12.5512C9.26825 12.7432 9.04679 13.0181 8.80098 13.354C8.31367 14.02 7.71134 14.9522 7.30364 15.9715L8.69636 16.5285ZM6.17383 15.2301L7.42383 16.7301L8.57617 15.7699L7.32617 14.2699L6.17383 15.2301Z"
											fill="currentColor"
										></path>
									</svg>

									<ticket-stage-change
										:status="Ticket.status"
										:enabled="User.Account.type === 'super_admin'"
									/>
								</div>
								<div class="flex items-center space-x-2 dark:text-white">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M19.25 12.25v-3.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v6.5a2 2 0 0 0 2 2h12.5m0 0-1.5-1.5m1.5 1.5L17.75 19m-3.5-7c0 1.795-1.007 3.25-2.25 3.25S9.75 13.795 9.75 12 10.757 8.75 12 8.75s2.25 1.455 2.25 3.25Z"
										></path>
									</svg>
									<div class="relative w-full rounded-md shadow-sm">
										<div
											class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
										>
											<span class="text-gray-500 sm:text-sm">$</span>
										</div>
										<input
											:disabled="!User.Account.type === 'super_admin'"
											type="text"
											v-model="dealSize"
											name="price"
											id="price"
											class="w-full rounded-md border-0 bg-white py-1.5 pl-7 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-60 group-disabled:opacity-50 dark:bg-slate-800 dark:text-white dark:ring-white/10 sm:text-sm sm:leading-6"
											placeholder="0.00"
											aria-describedby="price-currency"
										/>
										<div
											class="absolute inset-y-0 right-0 flex items-center pr-3"
										>
											<button class="relative" @click="handleDealSizeUpdate()">
												<svg
													v-if="!loading"
													class="h-4 w-4"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M12 10V15.25"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M9.75 11.25L12 9L14.25 11.25"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
												</svg>
												<svg
													v-else
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
											</button>
										</div>
									</div>
								</div>

								<div class="flex items-center space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-gray-400 dark:text-slate-300"
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

									<span class="text-sm text-gray-500 dark:text-slate-400"
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
	.ai_shadow {
		box-shadow: inset 0px -5px 20px 0 rgba(150, 67, 255, 0.15);
		border: 1px solid rgba(201, 150, 255, 0.16);
	}
	:deep p a {
		color: #9382ff;
	}
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
		border: solid 1px rgba(255, 255, 255, 0.3);
		color: #000000ab;
	}

	.badge-extra {
		font-size: 10px;
	}

	.mg_admin-text {
		font-size: 10px;
	}

	.mg_ai {
		color: transparent;
		background: #2a004f;
		border: 1px solid #aa00eda0;

		transition: 0.3s cubic-bezier(0.6, 0.6, 0, 1) opacity,
			0.3s cubic-bezier(0.6, 0.6, 0, 1) transform;
	}

	.mg_ai-text {
		animation: hue-rotate 3s ease-in-out infinite;
		background: linear-gradient(135deg, #aa00ed 0%, #2fe3fe 50%, #8900ff 100%);
		-webkit-background-clip: text;
		background-clip: text;
		background-size: 200% 100%;
		font-size: 10px;
		-webkit-text-fill-color: transparent;
	}

	.svg-gradient {
		width: 24px;
		height: 24px;
		background: linear-gradient(to bottom, #7000ff, #00c2ff);
		-webkit-mask: url(#mask) center / contain no-repeat;
		mask: url(#mask) center / contain no-repeat;
	}

	@keyframes hue-rotate {
		0% {
			background-position: 0%;
		}
		100% {
			background-position: 200%;
		}
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
		color: #000000ab;
		border: solid 1px rgba(0, 0, 0, 0.3);
		font-size: 10px;
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
		color: #000000ab;
		border: solid 1px rgba(0, 0, 0, 0.3);
		font-size: 10px;
	}

	.partner {
		background: linear-gradient(
			0.311turn,
			#e3bc5a,
			#e9d8ab 25%,
			#f4e9c4 50%,
			#e9d8ab 75%,
			#e3bc5a
		);
		color: #000000ab;
		border: solid 1px rgba(0, 0, 0, 0.3);
		font-size: 10px;
	}
</style>
