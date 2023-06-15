<script setup>
	const props = defineProps({
		activityItem: {
			type: Object,
			required: true,
			default: () => ({}),
		},
		activityItemIdx: {
			type: Number,
			required: true,
		},
		comments: {
			type: Array,
			required: true,
			default: () => [],
		},
	});

	const emits = defineEmits(['updated']);

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
		UserCircleIcon as UserCircleIconMini,
	} from '@heroicons/vue/20/solid';
	import showdown from 'showdown';
	import { format, formatDistanceStrict, formatDistance } from 'date-fns';

	// Define all constants and reactive variables
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const route = useRoute();

	const publishingOptions = [
		{
			title: 'AI Enabled',
			ai: true,
			description: 'This comment will trigger a reply from Tracy.',
			current: true,
		},
		{
			title: 'AI Disabled',
			description: 'This comment will be posted without a reply from tracy.',
			ai: false,
			current: false,
		},
	];

	const selected = ref(publishingOptions[0]);

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

	const ticketAttachments = ref([]);
	const aiResponse = ref('');
	const showDiv = ref(false);

	const commentImageId = ref('');
	const showImageModal = ref(false);

	const waveSurferOption = {
		height: 50,
		progressColor: '#ffffff',
		waveColor: '#fffffab3',
		cursorWidth: 0,
		barWidth: 2,
		hideScrollbar: true,
		mediaControls: false,
		backend: 'MediaElement',
		scrollParent: true,
		xhr: {
			mode: 'no-cors',
		},
	};
	const refWaveSurfer = ref(null);

	const playing = ref(false);

	function play() {
		playing.value = true;
		refWaveSurfer.value.waveSurfer.play();
	}

	function pause() {
		playing.value = false;
		refWaveSurfer.value.waveSurfer.pause();
	}

	const query = ref('');

	// const aiEnabled = ref(Ticket.ai_enabled);

	const showImage = (id) => {
		commentImageId.value = id;
		showImageModal.value = true;
	};

	const toggleModal = () => {
		showImageModal.value = !showImageModal.value;
	};

	let { data: User, error: userError } = await supabase
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

	let { data: Ticket, error: ticketError } = await supabase
		.from('Ticket')
		.select(
			'*, Comment(*,User(firstName,lastName,systemRole,id,avatarPath,jobTitle,badges,email),Comment(*,User(firstName,lastName,systemRole,id,avatarPath,jobTitle,badges))), User(*)'
		)
		.eq('id', route.params.id)
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
	// const getTicketAttachments = async (id) => fetchFromStorage('images', `attachments/${id}`);

	// const getAvatarUrl = async (avatar) => {
	// 	const {
	// 		data: [File],
	// 		error: fileError,
	// 	} = await supabase.storage.from('avatars').list(`${avatar}`, {
	// 		limit: 100,
	// 		offset: 0,
	// 		sortBy: { column: 'updated_at', order: 'desc' },
	// 		search: `${avatar}`,
	// 	});

	// 	if (File) {
	// 		const {
	// 			data: { publicUrl },
	// 		} = await supabase.storage
	// 			.from('avatars')
	// 			.getPublicUrl(`/${avatar}/${File.name}`);

	// 		return publicUrl;
	// 	} else return '';
	// };

	// const getCommentImageUrl = async (id) => {
	// 	const {
	// 		data: [File],
	// 		error: fileError,
	// 	} = await supabase.storage.from('images').list(`comments`, {
	// 		limit: 100,
	// 		offset: 0,
	// 		sortBy: { column: 'updated_at', order: 'desc' },
	// 		search: `${id}`,
	// 	});

	// 	if (File) {
	// 		const {
	// 			data: { publicUrl },
	// 		} = await supabase.storage
	// 			.from('images')
	// 			.getPublicUrl(`/comments/${File.name}`);

	// 		return publicUrl;
	// 	} else return '';
	// };

	// ticketAvatar.value = await getAvatarUrl(Ticket.createdBy);
	currentAvatar.value = await getAvatarUrl(user.value.id);
	assignedToAvatar.value = await getAvatarUrl(Ticket.assignedTo);

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
			emits('updated');
			loading.value = false;
		}
	};

	const handleDelete = async (id, arr) => {
		loading.value = true;
		try {
			if (arr) {
				const { data, error } = await supabase
					.from('Comment')
					.update({ text: 'This message was deleted.', deleted: true })
					.eq('id', id);
			} else {
				const { data, error: deleteError } = await supabase
					.from('Comment')
					.delete()
					.eq('id', id);
			}
		} catch (error) {
			alert(error.message);
		} finally {
			emits('updated');
			loading.value = false;
		}
	};
</script>

<template>
	<div class="">
		<article
			id="parent-comment"
			class="relative rounded-lg bg-[#F8F8FB] text-base dark:bg-[#020014]"
		>
			<div
				v-if="props.activityItemIdx < props.comments.length - 1"
				:class="[
					props.activityItemIdx === props.comments.length ? 'h-6' : '-bottom-6',
					'absolute left-0 top-0 flex w-6 justify-center',
				]"
			>
				<div
					class="w-px bg-gradient-to-b from-slate-300/10 via-slate-300/20 to-slate-300/10"
				/>
			</div>
			<div
				v-if="
					props.activityItem.type === 'user' || props.activityItem.type === 'ai'
				"
			>
				<div
					class=""
					v-if="
						!props.activityItem.deleted ||
						props.activityItem?.Comment.length > 0
					"
				>
					<footer
						v-if="!props.activityItem.deleted"
						class="mb-2 flex items-center justify-between"
					>
						<div class="flex items-center">
							<div
								class="text-gray-1000 mr-3 inline-flex items-center text-sm font-medium dark:text-white"
							>
								<img
									v-if="props.activityItem.avatarUrl"
									class="relative z-0 mr-2 h-6 w-6 rounded-full object-cover ring-8 ring-[#F8F8FB] dark:ring-[#020014]"
									:src="props.activityItem.avatarUrl"
									alt=""
								/>
								<div
									v-else
									class="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-sky-600/20 bg-sky-100 text-xs text-sky-500"
								>
									<UserCircleIconMini class="m-0 h-5 w-5" />
								</div>
								<NuxtLink :to="'/profile/' + props.activityItem.User.id"
									>{{
										props.activityItem.User.firstName
											? props.activityItem.User.firstName
											: props.activityItem.User.email
									}}
									{{
										props.activityItem.User.lastName
											? props.activityItem.User.lastName
											: ''
									}}</NuxtLink
								>

								<div class="ml-2 mr-1 flex items-center space-x-1">
									<div
										v-for="badge in props.activityItem.User.badges.slice(0, 1)"
										:key="badge.id"
										:class="[
											badge.id,
											'py-0.25 flex items-center justify-center rounded-md px-1 leading-4',
										]"
									>
										<span :class="`${badge.id}-text flex items-center`"
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
										v-if="props.activityItem.User.badges.length - 1"
										class="badge-extra rounded-md border border-gray-600 px-1.5 leading-4 text-gray-400"
									>
										+{{ props.activityItem.User.badges.length - 1 }}
									</div>
								</div>

								<span
									class="relative inline-flex pl-4 text-sm font-normal text-gray-900 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
								>
									{{ formatDateDistance(props.activityItem.createdOn) }}
								</span>
							</div>
						</div>

						<div
							class="flex space-x-1"
							v-if="
								props.activityItem.createdBy === User.id ||
								User.systemRole === 'super_admin'
							"
						>
							<button
								class="text-slate-400 transition-colors hover:text-indigo-400"
							>
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
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
										props.activityItem.id,
										props.activityItem.Comment.length > 0
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
							props.activityItem.User.id === User.id
								? 'prose-invert bg-[#4CA2FF] text-white ring-white/5 dark:bg-[#0166C8]'
								: 'bg-[#E6E5EB] ring-black/5 dark:prose-invert dark:bg-[#1C1B2C] dark:text-gray-200   dark:ring-white/5',
							props.activityItem.type === 'ai'
								? 'ai_shadow  shadow-inset shadow-[#9643FF]/25'
								: '',
							props.activityItem.deleted
								? 'text-black/30 dark:text-white/50'
								: '',
							'ml-8 rounded-b-lg rounded-r-lg rounded-tl-sm px-4 py-3 text-sm leading-7 ring-1 ring-inset',
						]"
						v-html="convert(props.activityItem.text)"
					></div>
					<div class="mt-2 pl-8">
						<a
							v-if="
								props.activityItem.text.includes('below') &&
								props.activityItem.User.systemRole === 'super_admin'
							"
							:href="`https://calendly.com/motis-group/partners?name=${
								Ticket.User.firstName + ' ' + Ticket.User.lastName
							}&email=${Ticket.User.email}&utm_source=${Ticket.id}`"
							target="_blank"
							class="rounded-md border border-indigo-500 bg-indigo-100 px-2 py-1 text-xs font-normal text-indigo-600 transition-colors dark:bg-indigo-800 dark:text-indigo-100 dark:hover:border-indigo-400 dark:hover:text-white"
							>Schedule a call</a
						>
					</div>
					<div
						v-if="props.activityItem.attachment && !props.activityItem.deleted"
						class="my-3 flex overflow-hidden pl-8"
					>
						<button
							@click="
								(commentImageId = props.activityItem.attachment),
									(showImageModal = true)
							"
						>
							<img
								v-for="image in props.activityItem.attachments"
								:src="image"
								:alt="props.activityItem.id"
								data-test="comment-image"
								class="max-h-48 max-w-full cursor-pointer rounded-lg"
							/>
						</button>
					</div>
				</div>

				<div class="ml-4" v-if="props.activityItem?.Comment">
					<article
						v-for="(reply, idx) in props.activityItem?.Comment"
						id="reply-messages"
						:key="reply.id"
						class="relative my-6 pl-2 text-base lg:pl-4"
					>
						<div
							v-if="idx < props.activityItem?.Comment.length - 1"
							:class="[
								props.activityItemIdx === props.comments.length
									? 'h-6 '
									: '-bottom-6',
								'absolute  left-0 top-0 flex w-12 justify-center',
							]"
						>
							<div
								class="w-px bg-gradient-to-b from-slate-300/0 via-slate-300/20 to-slate-300/0"
							/>
						</div>
						<header class="mb-2 flex items-center justify-between">
							<div class="flex items-center">
								<div
									class="mr-3 inline-flex items-center text-sm font-medium text-gray-1000 dark:text-white"
								>
									<div v-if="reply.avatarUrl" class="">
										<img
											class="relative z-50 mr-2 h-6 w-6 rounded-full object-cover ring-8 ring-[#F8F8FB] dark:ring-[#020014]"
											:src="reply.avatarUrl"
											:alt="reply.User.firstName + ' ' + reply.User.lastName"
										/>
									</div>

									<div
										v-else
										class="mr-2 h-5 w-5 rounded-full bg-slate-300"
									></div>
									<NuxtLink :to="'/profile/' + reply.User.id"
										>{{ reply.User.firstName }}
										{{ reply.User.lastName }}</NuxtLink
									>

									<div class="ml-2 mr-1 flex items-center space-x-1">
										<div
											v-for="badge in reply.User.badges.slice(0, 1)"
											:key="badge.id"
											:class="[
												badge.id,
												'py-0.25 flex items-center justify-center rounded-md px-1 text-xs',
											]"
										>
											<span :class="`${badge.id}-text flex items-center`"
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
											v-if="reply.User.badges.length > 1"
											class="badge-extra rounded-md border border-gray-600 px-1.5 leading-4 text-gray-900 dark:text-gray-400"
										>
											+{{ reply.User.badges.length - 1 }}
										</div>
									</div>

									<span
										class="relative inline-flex pl-4 text-sm font-normal text-gray-900 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
									>
										{{ formatDateDistance(reply.createdOn) }}
									</span>
								</div>
							</div>

							<div
								class="flex space-x-1"
								v-if="
									reply.createdBy === User.id ||
									(User.systemRole === 'super_admin' && reply.type === 'ai')
								"
							>
								<button
									class="text-slate-400 transition-colors hover:text-indigo-400"
								>
									<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
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
									@click="handleDelete(reply.id, reply.Comment.length > 0)"
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
						</header>
						<div
							:class="[
								reply.User.id === User.id
									? ' bg-[#4CA2FF] text-white ring-white/5 dark:bg-[#0166C8]'
									: ' bg-[#E6E5EB] text-gray-1000 ring-black/5 dark:bg-[#1C1B2C] dark:text-white dark:ring-white/5',
								reply.type === 'ai'
									? 'ai_shadow shadow-inset shadow-[#9643FF]/25'
									: '',
								'ml-8 rounded-b-lg rounded-r-lg rounded-tl-sm px-4  py-3 text-sm leading-7 ring-1 ring-inset',
							]"
						>
							{{ reply.text }}
						</div>

						<div class="mt-2 pl-8">
							<NuxtLink
								v-if="
									reply.text.includes('below') &&
									reply.User.systemRole === 'super_admin'
								"
								:to="`https://calendly.com/motis-group/partners?name=${
									Ticket.User.firstName + ' ' + Ticket.User.lastName
								}&email=${Ticket.User.email}&utm_source=${Ticket.id}`"
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
					v-if="!props.activityItem.deleted || props.activityItem?.Comment"
				>
					<Disclosure v-slot="{ open }">
						<div class="flex items-center justify-start pl-8">
							<img
								v-if="currentAvatar"
								:src="currentAvatar"
								alt=""
								class="h-5 w-5 rounded-full object-cover"
							/>
							<div
								v-else
								class="flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-center text-xs text-white"
							>
								{{ User.email[0] }}
							</div>

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
									><span>Reply as &nbsp;</span
									><span class="font-medium"
										>{{ User.firstName ? User.firstName : User.email }}
										{{ User.lastName ? User.lastName : '' }}</span
									>
								</div>
							</DisclosureButton>
						</div>

						<DisclosurePanel class="mt-3 flex items-start space-x-4 pl-8">
							<div class="min-w-0 flex-1">
								<div class="relative">
									<div
										class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 dark:ring-slate-800"
									>
										<label for="comment" class="sr-only">Reply...</label>
										<textarea
											v-model="reply_text"
											name="comment"
											id="comment"
											class="block w-full resize-none border-0 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder:text-slate-400 focus:ring-0 dark:text-white sm:py-2 sm:leading-6"
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
										<div class="flex flex-shrink-0 items-center space-x-2">
											<DisclosureButton
												class="inline-flex items-center rounded-md border border-gray-300 p-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-700"
											>
												<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
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
												@click="handleCommentAdd(props.activityItem.id)"
												:disabled="reply_text.length < 1"
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
											</DisclosureButton>
										</div>
									</div>
								</div>
							</div>
						</DisclosurePanel>
					</Disclosure>
				</div>
			</div>
			<div class="" v-else-if="props.activityItem.type === 'audio'">
				<div
					:class="[
						props.activityItem.User.id === User.id
							? 'prose-invert bg-[#4CA2FF] text-white ring-white/5 dark:bg-[#0166C8]'
							: 'bg-[#E6E5EB] ring-black/5 dark:prose-invert dark:bg-[#1C1B2C] dark:text-gray-200 dark:ring-white/5',
						props.activityItem.type === 'ai'
							? 'ai_shadow shadow-inset shadow-[#9643FF]/25'
							: '',
						props.activityItem.deleted
							? 'text-black/30 dark:text-white/50'
							: '',
						'ml-8 rounded-b-lg rounded-r-lg rounded-tl-sm px-4 py-3 text-sm leading-7 ring-1 ring-inset',
					]"
				>
					<div class="flex items-center space-x-2">
						<WaveSurfer
							ref="refWaveSurfer"
							src="/demo.mp3"
							:options="waveSurferOption"
						/>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="py-2">
					<footer class="mb-2 flex items-center justify-between">
						<div class="flex items-center">
							<div
								class="mr-3 inline-flex items-center text-sm font-medium text-gray-900 dark:text-white"
							>
								<img
									v-if="props.activityItem.avatarUrl"
									class="z-10 mr-2 h-5 w-5 rounded-full object-cover ring-8 ring-white dark:ring-[#020015]"
									:src="props.activityItem.avatarUrl"
									alt=""
								/>
								<div
									v-else
									class="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-sky-600/20 bg-sky-100 text-xs text-sky-500"
								>
									<UserCircleIconMini class="m-0 h-5 w-5" />
								</div>
								<div class="mr-1 flex items-center space-x-1">
									{{ props.activityItem.User.firstName }}
									{{ props.activityItem.User.lastName }}
								</div>
								<div class="font-normal text-slate-400">
									{{ props.activityItem.text }}
								</div>

								<span
									class="relative inline-flex pl-4 text-sm font-normal text-gray-600 before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
								>
									{{ formatDateDistance(props.activityItem.createdOn) }}
								</span>
							</div>
						</div>
					</footer>

					<div
						v-if="props.activityItem.attachment && !props.activityItem.deleted"
						class="mt-1 flex overflow-hidden"
					>
						<button
							@click="
								(commentImageId = props.activityItem.attachment),
									(showImageModal = true)
							"
						>
							<img
								v-for="image in props.activityItem.attachments"
								:src="image"
								:alt="props.activityItem.id"
								data-test="comment-image"
								class="max-h-48 max-w-full cursor-pointer rounded-lg"
							/>
						</button>
					</div>
				</div>
			</div>
		</article>
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
