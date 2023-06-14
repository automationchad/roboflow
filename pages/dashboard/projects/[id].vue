<script setup>
	// Import all necessary libraries and components
	import { ref, computed } from 'vue';
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
		Combobox,
		ComboboxButton,
		ComboboxInput,
		ComboboxLabel,
		ComboboxOption,
		ComboboxOptions,
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
		CheckIcon,
		ChevronDownIcon,
		ChevronUpDownIcon,
		UserCircleIcon,
	} from '@heroicons/vue/20/solid';
	import showdown from 'showdown';
	import { format, formatDistanceStrict, formatDistance } from 'date-fns';
	import { is } from 'date-fns/locale';

	// Define all constants and reactive variables
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();
	const route = useRoute();
	const props = defineProps(['open', 'comments']);

	const publishingOptions = [
		{
			title: 'AI Enabled',
			ai: true,
			description: 'This comment will trigger a reply from Tracy.',
			current: true,
		},
		{
			title: 'AI Disabled',
			description: 'This comment will be posted without a reply from Tracy.',
			ai: false,
			current: false,
		},
	];

	const selected = ref(publishingOptions[0]);
	const converter = new showdown.Converter();
	const loading = ref(true);

	const ticketLoading = ref(false);

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');
	const showConfirm = ref(false);
	const comments = ref([]);
	const dealSize = ref(0);
	const partnerPayoutAmount = ref(0);
	const enabled = ref(false);
	const query = ref('');
	const selectedStage = ref({
		id: 'proposal_submitted',
		name: 'Proposal Submitted',
	});
	const imageSrc = ref(null);
	const selectedFile = ref(null);
	const fileInput = ref(null);
	const input = ref('');
	const aiResponse = ref('');
	const showDiv = ref(false);
	const commentImageId = ref('');
	const showImageModal = ref(false);
	const assignedTo = ref(null);
	const ticket = ref(null);
	const User = ref({});

	const comment_text = ref('');
	const reply_text = ref('');

	const ticketAvatar = ref('');
	const currentAvatar = ref('');
	const assignedToAvatar = ref('');

	const ticketAttachments = ref([]);

	// Styles
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

	const partnerStages = {
		use_case_review: {
			id: 'use_case_review',
			name: 'Use Case Review',
			styles: 'bg-blue-100 text-blue-600 ring-blue-400/20',
		},
		sow_sent: {
			id: 'sow_sent',
			name: 'SOW Sent',
			styles: 'bg-green-100 text-green-400 ring-green-100',
		},
		closed_won: {
			id: 'closed_won',
			name: 'Closed Won',
			styles: 'bg-teal-100 text-teal-400 ring-teal-100',
		},
		closed_lost: {
			id: 'closed_lost',
			name: 'Closed Lost',
			styles: 'bg-red-100 text-white ring-red-100',
		},
		payout_pending: {
			id: 'payout_pending',
			name: 'Payout Pending',
			styles: 'bg-yellow-100 text-black ring-yellow-100',
		},
		payout_paid: {
			id: 'payout_paid',
			name: 'Payout Paid',
			styles: 'bg-purple-100 text-white ring-purple-100',
		},
	};

	const stages = [
		{
			id: 'initial_review',
			name: 'Initial Review',
			partner_id: 'use_case_review',
		},
		{
			id: 'requirements_gathering',
			name: 'Requirements Gathering',
			partner_id: 'use_case_review',
		},
		{ id: 'contract_pending', name: 'SOW Sent', partner_id: 'sow_sent' },
		{ id: 'invoice_pending', name: 'Invoice Sent' },
		{ id: 'invoice_paid', name: 'Invoice Paid' },
		{ id: 'solution_design', name: 'Solution Design' },
		{ id: 'in_development', name: 'In Development' },
		{ id: 'unit_testing', name: 'Unit Testing' },
		{ id: 'integration_testing', name: 'Integration Testing' },
		{ id: 'user_acceptance_testing', name: 'User Acceptance Testing' },
		{ id: 'bug_fixing', name: 'Bug Fixing' },
		{ id: 'deployment_preparation', name: 'Deployment Preparation' },
		{ id: 'in_deployment', name: 'In Deployment' },
		{ id: 'post_deployment_review', name: 'Post Deployment Review' },
		{ id: 'maintenance_mode', name: 'Maintenance Mode' },
		{ id: 'upgrades_and_enhancements', name: 'Upgrades and Enhancements' },
		{ id: 'project_on_hold', name: 'Project On Hold' },
		{ id: 'project_cancelled', name: 'Project Cancelled' },
		{ id: 'project_completed', name: 'Project Completed' },
	];

	// Computed values
	const selectedIndex = computed(() =>
		stages.findIndex((person) => person.id === selectedStage.value.id)
	);
	const notSaved = computed(() => {
		if (
			input.value !== ticket?.value?.desc ||
			dealSize.value !== ticket.value.deal_size ||
			selectedStage.value.id !== ticket.value.status
		) {
			return true;
		}
		return false;
	});

	const filteredPeople = computed(() =>
		query.value === ''
			? stages
			: stages.filter((person) => {
					return person.name.toLowerCase().includes(query.value.toLowerCase());
			  })
	);

	// Functions

	const getUser = async () => {
		let { data: userData, error: userError } = await supabase
			.from('User')
			.select(
				`*,Account (
	     id,
		 type,
		 stripeCustomerId
	   )`
			)
			.eq('id', user.value.id)
			.limit(1)
			.single();

		User.value = userData;
	};

	await getUser();

	const getTicket = async () => {
		try {
			let { data: Ticket, error: ticketError } = await supabase
				.from('Ticket')
				.select(
					'*, Account(id,name), Comment(*,User(firstName,lastName,systemRole,id,avatarPath,jobTitle,badges,email),Comment(*,User(firstName,lastName,systemRole,id,avatarPath,jobTitle,badges))), User(*, Account(id,name))'
				)
				.eq('id', route.params.id)
				.limit(1)
				.single();

			if (!Ticket) {
				navigateTo('/ticket-not-found');
				throw new Error('Ticket not found');
			}
			ticket.value = Ticket;
			ticketLoading.value = Ticket.ticketLoading;
			partnerPayoutAmount.value = Ticket.partner_payout_amount;
			selectedStage.value = stages.find((o) => o.id === Ticket?.status);
			dealSize.value = Ticket.deal_size;
			input.value = Ticket.desc;
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
		}
	};

	await getTicket();

	const shouldDisable = (id, index) => {
		if (
			index < 5 ||
			(selectedIndex.value < 4 && index > selectedIndex.value + 1)
		) {
			return true;
		}
		return false;
	};

	const handleTicketEdit = async () => {
		try {
			const { data, error } = await supabase
				.from('Ticket')
				.update({
					status: selectedStage.value.id,
					desc: input.value,
					deal_size: parseInt(dealSize.value),
					partner_payout_amount: parseInt(dealSize.value) * 0.1,
					updatedOn: new Date(),
					lastUpdatedBy: user.value.id,
				})
				.eq('id', route.params.id);
			if (error) {
				throw new Error(error.message);
			}
			is_success.value = true;
			success_message.value = 'Ticket updated successfully';
			enabled.value = false;
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
			console.log(error);
		}
	};

	const handleCancelEdit = () => {
		input.value = ticket.value.desc;
		dealSize.value = ticket.value.deal_size;
		enabled.value = false;
		showConfirm.value = false;
	};

	const handleCancelConfirm = () => {
		if (notSaved.value) {
			showConfirm.value = true;
		} else {
			handleCancelEdit();
		}
	};

	const dueDate = computed(() => {
		return formatDistance(new Date(ticket.value.dueDate), new Date(), {
			addPrefix: true,
		});
	});

	const getAssignedTo = async () => {
		const { data, error } = await supabase
			.from('User')
			.select('*')
			.eq('id', ticket.value.assignedTo)
			.limit(1)
			.single();
		if (error) {
			throw new Error(error.message);
		}
		assignedTo.value = data;
	};
	await getAssignedTo();

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

	// Define a general function to fetch from Supabase storage
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

	// Refactor getAvatarUrl, getCommentImageUrl, and getTicketAttachments
	// to use the general fetchFromStorage function
	const getAvatarUrl = async (avatar) => fetchFromStorage('avatars', avatar);
	const getCommentImageUrl = async (id) =>
		fetchFromStorage('images', `comments/${id}`);

	const fetchComments = async () => {
		let { data: Ticket, error } = await supabase
			.from('Ticket')
			.select(
				'*, Account(id,name), Comment(*,User(firstName,lastName,systemRole,id,avatarPath,badges),Comment(*,User(firstName,lastName,systemRole,id,avatarPath,badges))), User(*,Account(id,name))'
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

	comments.value = await fetchComments();

	const convert = (text) => {
		const formatted = converter.makeHtml(text);
		return formatted;
	};

	const handleCommentAdd = async (thread_id) => {
		try {
			if (selectedFile.value) {
				const { data, error: insertError } = await supabase
					.from('Comment')
					.insert([
						{
							text: thread_id ? reply_text.value : comment_text.value,
							createdBy: user.value.id,
							ticketId: ticket.value.id,
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
							ticketId: ticket.value.id,
							threadId: thread_id,
							ai_enabled: selected.value.ai,
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
		}
	};

	ticketAttachments.value = await getTicketAttachments(ticket.value.id);
	ticketAvatar.value = await getAvatarUrl(ticket.value.createdBy);
	currentAvatar.value = await getAvatarUrl(user.value.id);
	assignedToAvatar.value = await getAvatarUrl(ticket.value.assignedTo);

	onMounted(async () => {
		ticketAttachments.value = await getTicketAttachments(ticket.value.id);
		ticketAvatar.value = await getAvatarUrl(ticket.value.createdBy);
		currentAvatar.value = await getAvatarUrl(user.value.id);
		loading.value = false;
	});
</script>

<template>
	<div class="flex min-h-full">
		<div class="flex w-0 flex-1 flex-col">
			<main class="flex-1">
				<div class="px-5 py-5">
					<div class="mx-auto xl:grid xl:grid-cols-3">
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
														alt="Ticket avatar"
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
													class="mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 dark:border-white dark:bg-slate-800 dark:text-white"
												>
													<svg
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
														<circle cx="12" cy="7" r="4"></circle>
													</svg>
												</div>

												<div class="">
													<div class="flex items-center">
														<NuxtLink
															:to="`/profile/${ticket?.User?.id}`"
															class="mr-1 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
														>
															{{
																ticket?.User?.firstName &&
																ticket?.User?.lastName
																	? ticket?.User?.firstName +
																	  ' ' +
																	  ticket?.User?.lastName
																	: ticket?.User?.email.split('@')[0]
															}}
														</NuxtLink>

														<span
															class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
														>
															{{
																formatDateDistance(
																	ticket?.createdOn || new Date()
																)
															}}
														</span>
													</div>
													<div class="space-x-1">
														<span
															v-for="badge in ticket?.User?.badges"
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
											<!-- <div
												class="mb-2 mt-5 flex items-center space-x-2 text-xs text-sky-400"
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

												{{ ticket.Account.name }} {{ ticket.type }}
											</div> -->
											<h1
												class="max-w-5xl text-2xl font-semibold text-gray-900 dark:text-white"
											>
												<div class="" v-if="ticket?.type === 'referral'">
													{{
														ticket?.User?.firstName
															? ticket?.User?.firstName
															: ticket?.User?.email
													}}
													<span class="text-slate-400">referred</span>
													{{ ticket?.name }}
												</div>
												<div class="" v-else>{{ ticket?.name }}</div>
											</h1>
										</div>
									</div>
									<!-- Aside for smaller screens -->

									<div class="xl:pb-0">
										<h2 class="sr-only">Description</h2>

										<Disclosure v-slot="{ open }" as="div">
											<div
												v-if="enabled"
												class="my-4 grid max-w-5xl grid-cols-8 pr-4"
											>
												<DisclosurePanel static as="div" class="col-span-8">
													<textarea
														v-model="input"
														@input="update"
														name="comment"
														id="comment"
														class="min-h-36 prose -mx-3 -mt-2 block w-full max-w-none border-none bg-transparent font-sans text-base leading-7 text-sky-600 placeholder:text-gray-400 focus:ring-0 dark:text-white"
														placeholder="Reply..."
													></textarea>
												</DisclosurePanel>
											</div>

											<div class="my-4 grid max-w-5xl grid-cols-8 pr-4" v-else>
												<div class="col-span-8">
													<article
														class="prose max-w-none dark:prose-invert"
														v-html="convert(input)"
													></article>
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
									<div
										class="mt-16 flex items-center space-x-2 text-sm dark:text-white"
									>
										<NuxtLink
											:to="`/${route.params.organization}/tickets`"
											:class="[
												styles[ticket?.type],
												'rounded-md px-2 py-1 font-normal capitalize ring-1 ring-inset transition-colors',
											]"
											>{{ ticket?.type }}</NuxtLink
										>
									</div>
								</div>
							</div>
							<section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
								<div>
									<div class="divide-gray-200 dark:divide-slate-800">
										<div class="space-y-3 pb-4">
											<div class="flex justify-between">
												<div class="flex items-center dark:text-slate-300">
													{{
														ticket?.Comment?.filter(
															(o) => o.activity_type !== 'event'
														).length
													}}
													comment{{
														ticket?.Comment?.filter(
															(o) => o.activity_type !== 'event'
														).length > 0
															? 's'
															: ''
													}}
												</div>
												<button
													@click="showDiv = !showDiv"
													class="flex items-center rounded-full border border-gray-300 bg-white pl-2 pr-3 text-sm text-gray-800 shadow-sm dark:border-[#423455] dark:bg-[#1A1B2C] dark:text-white"
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
												</button>
											</div>
											<transition
												enter-active-class="transition ease-out duration-100"
												enter-from-class="transform opacity-0 scale-95"
												enter-to-class="transform opacity-100 scale-100"
												leave-active-class="transition ease-in duration-75"
												leave-from-class="transform opacity-100 scale-100"
												leave-to-class="transform opacity-0 scale-95"
												><TicketAiModal v-if="showDiv"
											/></transition>

											<transition
												enter-active-class="transition ease-out duration-100"
												enter-from-class="transform opacity-0 scale-95"
												enter-to-class="transform opacity-100 scale-100"
												leave-active-class="transition ease-in duration-75"
												leave-from-class="transform opacity-100 scale-100"
												leave-to-class="transform opacity-0 scale-95"
												><div class="">
													<div
														class="flex space-x-3 rounded-lg bg-white/80 p-4 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-white/5 dark:ring-white/5"
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
																	{{ user.email[0].toUpperCase() }}
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
																		class="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-black/40 focus:ring-0 dark:text-white dark:placeholder:text-white/30 sm:py-1.5 sm:text-sm sm:leading-6"
																		placeholder="Add a comment"
																	/>
																</div>
																<div
																	class="mt-6 flex items-end justify-between space-x-4"
																>
																	<Listbox
																		as="div"
																		v-model="selected"
																		class="-ml-10"
																		v-slot="{ open }"
																	>
																		<ListboxLabel class="sr-only"
																			>Change published status</ListboxLabel
																		>
																		<div class="relative">
																			<ListboxButton
																				class="inline-flex divide-x divide-indigo-700 rounded-md shadow-sm"
																			>
																				<div
																					:class="[
																						selected.ai
																							? 'mg_ai'
																							: 'border border-white/10 bg-white/5 text-white',
																						'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-1 shadow-sm',
																					]"
																				>
																					<svg
																						v-if="selected.ai"
																						class="h-5 w-5"
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
																						></path>
																					</svg>

																					<p
																						:class="[
																							selected.ai
																								? 'mg_ai-button-text text-sm'
																								: '',
																							'text-xs',
																						]"
																					>
																						{{ selected.title }}
																					</p>
																					<ChevronDownIcon
																						:class="[
																							open ? 'rotate-180' : '',
																							'h-4 w-4 text-[#8900ff] transition-transform',
																						]"
																					/>
																				</div>
																			</ListboxButton>

																			<transition
																				leave-active-class="transition ease-in duration-100"
																				leave-from-class="opacity-100"
																				leave-to-class="opacity-0"
																			>
																				<ListboxOptions
																					class="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900 dark:ring-white/10"
																				>
																					<ListboxOption
																						as="template"
																						v-for="option in publishingOptions"
																						:key="option.title"
																						:value="option"
																						v-slot="{ active, selected }"
																					>
																						<li
																							:class="[
																								active
																									? 'bg-white/5 text-white'
																									: 'text-sm text-white',
																								'cursor-default select-none p-4 text-sm',
																							]"
																						>
																							<div class="flex flex-col">
																								<div
																									class="flex justify-between"
																								>
																									<p
																										:class="
																											selected
																												? 'font-semibold'
																												: 'font-normal'
																										"
																									>
																										{{ option.title }}
																									</p>
																									<span
																										v-if="selected"
																										:class="
																											active
																												? 'text-white'
																												: 'text-indigo-600'
																										"
																									>
																										<CheckIcon
																											class="h-5 w-5"
																											aria-hidden="true"
																										/>
																									</span>
																								</div>
																								<p
																									:class="[
																										active
																											? 'text-indigo-200'
																											: 'text-gray-500',
																										'mt-2',
																									]"
																								>
																									{{ option.description }}
																								</p>
																							</div>
																						</li>
																					</ListboxOption>
																				</ListboxOptions>
																			</transition>
																		</div>
																	</Listbox>
																	<div
																		class="flex items-center justify-end space-x-4"
																	>
																		<div
																			v-if="!imageSrc"
																			class="relative ml-auto flex cursor-pointer items-center justify-center rounded-md border px-2.5 py-1 text-slate-900 dark:border-white/5 dark:bg-white/5 dark:text-slate-200"
																		>
																			<div
																				class="flex cursor-pointer items-center text-xs"
																			>
																				<svg
																					class="h-4 w-4"
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
																				<span class="ml-1 truncate"
																					>Add image</span
																				>
																			</div>

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
																			class="inline-flex items-center justify-center rounded-md border border-indigo-600 bg-indigo-700 px-2.5 py-1 text-xs font-normal text-white shadow-sm hover:border-indigo-500 hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
																		>
																			<svg
																				class="h-4 w-4"
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
																			<span class="ml-1 truncate">Comment</span>
																		</button>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div></transition
											>
										</div>

										<div class="pt-6">
											<!-- Comments feed-->
											<div class="flex" v-if="!loading">
												<div
													v-if="comments.length <= 0"
													class="flex w-full rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm font-semibold text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-800 dark:text-white"
												>
													No comments yet
												</div>

												<section
													class="w-full bg-slate-50 dark:bg-transparent"
													v-else
												>
													<div class="mx-auto space-y-6">
														<ticket-comment
															v-for="(
																activityItem, activityItemIdx
															) in comments.filter(
																(o) => !o.activity_type.includes('event')
															)"
															:key="activityItem.id"
															:activity-item="activityItem"
															:activity-item-idx="activityItemIdx"
															:comments="
																comments.filter(
																	(o) => !o.activity_type.includes('event')
																)
															"
															@updated="getComments"
														/>
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
						<!-- ticket details big -->
						<aside class="hidden w-full xl:block xl:pl-8">
							<h2 class="sr-only">Details</h2>
							<div class="flex items-center justify-between py-3">
								<div class="flex items-center space-x-2">
									<div
										:class="[
											enabled ? 'mg_ai ' : 'bg-slate-100 ring-1 ring-slate-200',
											'w-16 truncate rounded-md px-2.5 py-1 text-center text-xs shadow-sm',
										]"
									>
										<span
											:class="[
												enabled ? 'mg_ai-button-text' : '',
												'truncate text-xs',
											]"
											>{{ enabled ? 'Editing' : `Edited` }}</span
										>
									</div>
									<Switch
										v-model="enabled"
										:disabled="User?.Account?.type !== 'super_admin'"
										:class="[
											enabled ? 'bg-indigo-600' : 'bg-gray-200',
											'relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:pointer-events-none ',
										]"
									>
										<span class="sr-only">Use setting</span>
										<span
											aria-hidden="true"
											:class="[
												enabled ? 'translate-x-3' : 'translate-x-0',
												'pointer-events-none inline-block h-3 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
											]"
										/>
									</Switch>
								</div>

								<div class="space-x-2">
									<button
										v-if="notSaved"
										:disabled="!enabled"
										@click="handleCancelConfirm"
										class="inline-flex items-center justify-center rounded-md bg-slate-100 p-1 text-xs font-normal shadow-sm ring-1 ring-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
									>
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24">
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
									</button>
									<button
										:disabled="!enabled"
										@click="handleTicketEdit()"
										class="mg_ai inline-flex items-center justify-center rounded-md bg-indigo-700 p-1 text-xs font-normal shadow-sm hover:border-indigo-500 hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50"
									>
										<svg
											class="h-4 w-4 text-[#9382ff]"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V9.82843C19.25 9.29799 19.0393 8.78929 18.6642 8.41421L15.5858 5.33579C15.2107 4.96071 14.702 4.75 14.1716 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25Z"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M8.75 19V15.75C8.75 15.1977 9.19772 14.75 9.75 14.75H14.25C14.8023 14.75 15.25 15.1977 15.25 15.75V19"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
											<path
												d="M8.75 5V8.25"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</svg>
									</button>
								</div>
							</div>
							<div class="space-y-3">
								<div class="" id="partner-summary">
									<div class="lg:col-start-3 lg:row-end-1">
										<h2 class="sr-only">Summary</h2>
										<div
											class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-900/5 dark:bg-white/5 dark:ring-white/5"
										>
											<dl class="flex flex-wrap">
												<div class="flex-auto pl-6 pt-6">
													<dt
														class="text-sm font-semibold leading-6 text-slate-500"
													>
														Payout Bonus
													</dt>
													<dd
														class="mt-1 text-base font-semibold leading-6 text-gray-900 dark:text-white"
													>
														{{
															!partnerPayoutAmount
																? 'Pending'
																: `$${formatAccounting(dealSize * 0.1)}`
														}}
													</dd>
												</div>
												<div class="flex-none self-end px-6 pt-4">
													<dt class="sr-only">Status</dt>
													<dd
														:class="[
															partnerStages[ticket?.partner_status].styles,
															'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ',
														]"
													>
														{{ partnerStages[ticket?.partner_status].name }}
													</dd>
												</div>
												<div
													class="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6 dark:border-white/5"
												>
													<dt class="flex-none">
														<span class="sr-only">Client</span>
														<img
															v-if="assignedToAvatar"
															:src="assignedToAvatar"
															class="h-5 w-5 rounded-full object-cover"
															alt=""
														/>

														<UserCircleIcon
															v-else
															class="h-5 w-6 text-gray-400"
															aria-hidden="true"
														/>
													</dt>

													<dd
														class="text-sm font-medium leading-6 text-gray-900 dark:text-white"
													>
														{{
															assignedTo.firstName && assignedTo.lastName
																? assignedTo.firstName +
																  ' ' +
																  assignedTo.lastName
																: assignedTo.email
														}}
													</dd>
												</div>
												<div class="mt-4 flex w-full flex-none gap-x-4 px-6">
													<dt class="flex-none">
														<span class="sr-only">Due date</span>

														<svg
															xmlns="http://www.w3.org/2000/svg"
															class="h-5 w-6 text-gray-400"
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
													</dt>
													<dd
														class="text-sm leading-6 text-gray-500 dark:text-slate-400"
													>
														Due in <span>{{ dueDate }}</span>
													</dd>
												</div>
												<div
													class="mt-4 flex w-full flex-none items-center gap-x-4 px-6"
												>
													<dt class="flex-none">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															class="h-5 w-6 text-gray-400"
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
													</dt>
													<dd class="w-full">
														<div
															class="relative w-full rounded-md shadow-sm"
															v-if="enabled"
														>
															<input
																type="text"
																v-model="dealSize"
																name="price"
																id="price"
																class="w-full rounded-md border-0 bg-white py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:opacity-60 group-disabled:opacity-50 dark:bg-slate-800 dark:text-white dark:ring-white/10 sm:text-sm sm:leading-6"
																placeholder="0.00"
																aria-describedby="price-currency"
															/>
														</div>
														<div
															v-else
															class="text-sm leading-6 text-gray-500 dark:text-slate-400"
														>
															{{
																dealSize
																	? formatAccounting(dealSize, true)
																	: 'Pending'
															}}
														</div>
													</dd>
												</div>
											</dl>
											<div class="mt-6 border-t border-gray-900/5 px-6 py-6">
												<dt
													class="mt-0 text-sm font-medium leading-6 text-gray-900"
												></dt>
												<dd
													class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
												>
													<ul
														role="list"
														class="divide-y divide-gray-100 rounded-md border border-gray-200"
													>
														<li
															class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
														>
															<div class="flex w-0 flex-1 items-center">
																<svg
																	class="h-5 w-5 flex-shrink-0 text-gray-400"
																	viewBox="0 0 24 24"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M4.75 15.75L8.25 19.25"
																		stroke="currentColor"
																		stroke-width="1.5"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																	></path>
																	<path
																		d="M8.25 15.75L4.75 19.25"
																		stroke="currentColor"
																		stroke-width="1.5"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																	></path>
																	<path
																		d="M11.75 19.25H15.25"
																		stroke="currentColor"
																		stroke-width="1.5"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																	></path>
																	<path
																		d="M8.75 8.75H15.25"
																		stroke="currentColor"
																		stroke-width="1.5"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																	></path>
																	<path
																		d="M9.75 11.75H14.25"
																		stroke="currentColor"
																		stroke-width="1.5"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																	></path>
																	<path
																		d="M19.25 19.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V12.25"
																		stroke="currentColor"
																		stroke-width="1.5"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																	></path>
																</svg>

																<div
																	class="ml-4 flex min-w-0 flex-1 gap-2 text-xs"
																>
																	<span class="truncate font-medium">SOW</span>
																	<span class="flex-shrink-0 text-gray-400"
																		>2.4MB</span
																	>
																</div>
															</div>
															<div class="ml-4 flex-shrink-0">
																<a
																	href="#"
																	class="text-xs font-medium text-indigo-600 hover:text-indigo-500"
																	>Download</a
																>
															</div>
														</li>
														<li
															class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
														>
															<div class="flex w-0 flex-1 items-center">
																<svg
																	class="h-5 w-5 flex-shrink-0 text-gray-400"
																	xmlns="http://www.w3.org/2000/svg"
																	width="24"
																	height="24"
																	fill="none"
																	viewBox="0 0 24 24"
																>
																	<path
																		stroke="currentColor"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		stroke-width="1.5"
																		d="M13.75 4.75h-8v14.5l1.599-1.243a1 1 0 0 1 1.272.036L10 19.25l1.341-1.174a1 1 0 0 1 1.318 0L14 19.25l1.379-1.207a1 1 0 0 1 1.272-.036l1.599 1.243v-9m-4.5-5.5 4.5 5.5m-4.5-5.5v3.5a2 2 0 0 0 2 2h2.5"
																	></path>
																</svg>

																<div class="ml-4 flex min-w-0 flex-1 gap-2">
																	<span class="truncate font-medium"
																		>Payout Invoice</span
																	>
																	<span class="flex-shrink-0 text-gray-400"
																		>4.5mb</span
																	>
																</div>
															</div>
															<div class="ml-4 flex-shrink-0">
																<a
																	href="#"
																	class="text-xs font-medium text-indigo-600 hover:text-indigo-500"
																	>Download</a
																>
															</div>
														</li>
													</ul>
												</dd>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="mt-6 space-y-8 py-6 dark:border-slate-700">
								<div>
									<h2 class="text-sm font-semibold leading-6 text-gray-900">
										Activity
									</h2>
									<ul role="list" class="mt-6 space-y-6">
										<li
											v-for="(activityItem, activityItemIdx) in comments.filter(
												(o) => o.activity_type.includes('event')
											)"
											:key="activityItem.id"
											class="relative flex gap-x-4"
										>
											<div
												:class="[
													activityItemIdx ===
													comments.filter((o) =>
														o.activity_type.includes('event')
													).length -
														1
														? 'h-6'
														: '-bottom-6',
													'absolute left-0 top-0 flex w-6 justify-center',
												]"
											>
												<div class="w-px bg-gray-200" />
											</div>
											<template v-if="activityItem.type === 'commented'">
												<img
													:src="activityItem.person.imageUrl"
													alt=""
													class="relative mt-3 h-6 w-6 flex-none rounded-full bg-slate-50"
												/>
												<div
													class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200"
												>
													<div class="flex justify-between gap-x-4">
														<div class="py-0.5 text-xs leading-5 text-gray-500">
															<span class="font-medium text-gray-900">{{
																activityItem.person.name
															}}</span>
															commented
														</div>
														<time
															class="flex-none py-0.5 text-xs leading-5 text-gray-500"
															>{{ activityItem.createdOn }}</time
														>
													</div>
													<p class="text-sm leading-6 text-gray-500">
														{{ activityItem.comment }}
													</p>
												</div>
											</template>
											<template v-else-if="activityItem.type === 'event_cost'">
												<img
													:src="activityItem.person.imageUrl"
													alt=""
													class="relative mt-3 h-6 w-6 flex-none rounded-full bg-slate-50"
												/>
												<div
													class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200"
												>
													<div class="flex justify-between gap-x-4">
														<div class="py-0.5 text-xs leading-5 text-gray-500">
															<span class="font-medium text-gray-900">{{
																activityItem.person.name
															}}</span>
															commented
														</div>
														<time
															class="flex-none py-0.5 text-xs leading-5 text-gray-500"
															>{{ activityItem.createdOn }}</time
														>
													</div>
													<p class="text-sm leading-6 text-gray-500">
														{{ activityItem.comment }}
													</p>
												</div>
											</template>
											<template v-else>
												<div
													class="relative flex h-6 w-6 flex-none items-center justify-center bg-slate-50"
												>
													<CheckCircleIcon
														v-if="activityItem.type === 'paid'"
														class="h-6 w-6 text-indigo-600"
														aria-hidden="true"
													/>
													<div
														v-else
														class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
													/>
												</div>
												<p
													class="flex-auto py-0.5 text-xs leading-5 text-gray-500"
												>
													<span class="font-medium text-gray-900">{{
														activityItem.User?.firstName +
														' ' +
														activityItem.User?.lastName
													}}</span>
													{{ activityItem.text }}
												</p>
												<span
													class="flex-none py-0.5 text-xs leading-5 text-gray-500"
													>{{
														formatDateDistance(activityItem.createdOn) + ' ago'
													}}</span
												>
											</template>
										</li>
										<li v-if="enabled" class="relative flex gap-x-4">
											<div
												:class="[
													false ? 'h-6' : '-top-6',
													'absolute bottom-2 left-0 flex w-6 justify-center',
												]"
											>
												<div class="w-px bg-gray-200" />
											</div>
											<div class="flex flex-auto items-center">
												<div
													class="relative mr-4 flex h-6 w-6 flex-none items-center justify-center bg-slate-50"
												>
													<div
														class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"
													/>
												</div>
												<p class="flex-auto">
													<Combobox
														as="div"
														v-model="selectedStage"
														class="group"
														:disabled="!enabled"
													>
														<div class="relative">
															<ComboboxInput
																:disabled="!enabled"
																class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 group-disabled:opacity-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 sm:text-xs sm:leading-6"
																:display-value="(person) => person?.name"
															/>
															<ComboboxButton
																:disabled="!enabled"
																class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 text-xs focus:outline-none"
															>
																<ChevronUpDownIcon
																	class="h-5 w-5 text-gray-400"
																	aria-hidden="true"
																/>
															</ComboboxButton>

															<ComboboxOptions
																v-if="filteredPeople.length > 0"
																class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900 dark:ring-white/20 sm:text-sm"
															>
																<ComboboxOption
																	v-for="(person, idx) in filteredPeople"
																	:key="person.id"
																	:value="person"
																	:disabled="
																		shouldDisable(selectedStage.id, idx)
																	"
																	as="template"
																	v-slot="{ active, selected }"
																>
																	<li
																		:class="[
																			shouldDisable(selectedStage.id, idx)
																				? 'cursor-not-allowed opacity-50'
																				: '',
																			'relative flex cursor-default select-none py-2 pl-8 pr-4',
																			active
																				? 'bg-indigo-600 text-white dark:text-white'
																				: 'text-gray-900 dark:text-slate-300',
																		]"
																	>
																		<span
																			:class="[
																				'block truncate text-xs',
																				selected && 'font-semibold ',
																			]"
																		>
																			{{ person.name }}
																		</span>

																		<span
																			v-if="selected"
																			:class="[
																				'absolute inset-y-0 left-0 flex items-center pl-1.5',
																				active
																					? 'text-white dark:text-white'
																					: 'text-indigo-600',
																			]"
																		>
																			<CheckIcon
																				class="h-5 w-5"
																				aria-hidden="true"
																			/>
																		</span>
																		<span
																			v-else
																			class="absolute inset-y-0 left-0 flex items-center pl-1.5"
																			><svg
																				v-if="
																					shouldDisable(selectedStage.id, idx)
																				"
																				class="h-5 w-5"
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
																					d="M7 7L17 17"
																					stroke="currentColor"
																					stroke-width="1.5"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																				></path></svg
																		></span>
																	</li>
																</ComboboxOption>
															</ComboboxOptions>
														</div>
													</Combobox>
												</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</main>
		</div>
		<DeleteConfirm
			v-if="showConfirm"
			@cancel="showConfirm = false"
			@confirm="handleCancelEdit"
			:command="'close'"
			:description="'There are unsaved changes. Are you sure you want to close the panel? Your changes will be lost.'"
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
		<LoadingModal v-if="ticketLoading" />
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
		--tw-ring-color: #aa00eda0;
		--tw-ring-inset: inset;
		box-shadow: var(--tw-ring-inset) 0 0 0
			calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
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

	.mg_ai-button-text {
		animation: hue-rotate 3s ease-in-out infinite;
		background: linear-gradient(135deg, #aa00ed 0%, #2fe3fe 50%, #8900ff 100%);
		-webkit-background-clip: text;
		background-clip: text;
		background-size: 200% 100%;

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
