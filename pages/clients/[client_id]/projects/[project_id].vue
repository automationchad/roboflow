<script setup>
	definePageMeta({ layout: 'client-editor', middleware: ['auth'] });
	// Import all necessary libraries and components
	import { ref, computed } from 'vue';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Combobox,
		ComboboxButton,
		ComboboxInput,
		ComboboxLabel,
		ComboboxOption,
		ComboboxOptions,
		Switch,
	} from '@headlessui/vue';

	import {
		CheckCircleIcon,
		CheckIcon,
		ChevronUpDownIcon,
		UserCircleIcon,
	} from '@heroicons/vue/20/solid';
	import showdown from 'showdown';

	// Define all constants and reactive variables
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const route = useRoute();
	const props = defineProps(['open', 'comments']);

	const converter = new showdown.Converter();
	const loading = ref(true);

	const ticketLoading = ref(false);

	const showProjectModal = ref(false);

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

	const showDiv = ref(false);

	const assignedTo = ref({
		id: '',
		first_name: '',
		last_name: '',
		primary_email: '',
	});

	const project = ref(null);

	const comment_text = ref('');
	const reply_text = ref('');

	const ticketAvatar = ref('');
	const currentAvatar = ref('');
	const assignedToAvatar = ref('');

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
			styles: 'bg-red-100 text-red-700 ring-red-200',
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

	const notSaved = computed(() => {
		if (
			input.value !== project.value.description ||
			dealSize.value !== project.value.deal_size ||
			selectedStage.value.id !== project.value.status
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

	const getTicket = async () => {
		try {
			let { data: projectData, error: projectError } = await supabase
				.from('projects')
				.select(
					`id, name, description, partner_status, type, status, severity, assigned_id, created_at, due_date, users(id,first_name,last_name,username,badges), clients(id,name), comments(id, text,thread_id,type,users(first_name,last_name,username,badges),created_at), activity(text,type,created_at, users(first_name,last_name,username,primary_email))`
				)
				.eq('id', route.params.project_id)
				.limit(1)
				.single();

			project.value = projectData;
			// ticketLoading.value = Ticket.ticketLoading;
			// partnerPayoutAmount.value = Ticket.partner_payout_amount;
			// selectedStage.value = stages.find((o) => o.id === Ticket?.status);
			// dealSize.value = Ticket.deal_size;
			input.value = project.value.description;
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
		}
	};

	await getTicket();

	const shouldDisable = (id, index) => {
		// if (

		// 	(selectedIndex.value < 4 && index > selectedIndex.value + 1)
		// ) {
		// 	return true;
		// }
		return false;
	};

	const handleTicketEdit = async () => {
		try {
			const { data, error } = await supabase
				.from('projects')
				.update({
					status: selectedStage.value.id,
					description: input.value,
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
		input.value = project.value.description;
		dealSize.value = project.value.deal_size;
		selectedStage.value = stages.find((o) => o.id === project.value.status);
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
		return formatDistance(new Date(project.value.due_date), new Date(), {
			addPrefix: true,
		});
	});

	// const getAssignedTo = async () => {
	// 	const { data, error } = await supabase
	// 		.from('users')
	// 		.select('*')
	// 		.eq('id', project.value.assigned_id)
	// 		.limit(1)
	// 		.single();
	// 	if (error) {
	// 		throw new Error(error.message);
	// 	}
	// 	assignedTo.value = data;
	// };

	// await getAssignedTo();

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

	const fetchComments = async (comments) => {
		let formatted = [];

		// First pass: Create an entry for each parent comment and prepare for replies
		comments.forEach((comment) => {
			// Only add to top-level if there's no parent (thread_id is null)
			if (comment.thread_id === null) {
				formatted.push({ ...comment, replies: [] });
			}
		});

		// Second pass: Assign replies to their parent comments
		comments.forEach((comment) => {
			if (comment.thread_id !== null) {
				// Find parent and add to its replies
				let parent = formatted.find((c) => c.id === comment.thread_id);
				if (parent) {
					parent.replies.push(comment);
				}
			}
		});

		return formatted;
	};

	comments.value = await fetchComments(project.value.comments);

	console.log(comments.value);

	const convert = (text) => {
		const formatted = converter.makeHtml(text);
		return formatted;
	};

	const handleCommentAdd = async (thread_id) => {
		try {
			if (selectedFile.value) {
				const { data, error: insertError } = await supabase
					.from('comments')
					.insert([
						{
							text: thread_id ? reply_text.value : comment_text.value,
							created_by: user.value.id,
							project_id: project.value.id,
							thread_id: thread_id,
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
							created_by: user.value.id,
							project_id: project.value.id,
							thread_id,
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

	ticketAvatar.value = await getAvatarUrl(project.value.users.id);
	currentAvatar.value = await getAvatarUrl(user.value.id);
	// assignedToAvatar.value = await getAvatarUrl(ticket.value.assignedTo);

	// console.log(ticket.value.Activity);

	onMounted(async () => {
		// ticketAttachments.value = await getTicketAttachments(ticket.value.id);
		// ticketAvatar.value = await getAvatarUrl(ticket.value.createdBy);
		// currentAvatar.value = await getAvatarUrl(user.value.id);
		loading.value = false;
	});
</script>

<template>
	<div class="storage-container flex flex-grow p-4">
		<div
			class="bg-scale-200 border-panel-border-light dark:border-panel-border-dark flex h-full w-full flex-col rounded-md border"
		>
			<div
				class="border-panel-border-light bg-panel-header-light dark:border-panel-border-dark dark:bg-panel-header-dark flex h-[40px] items-center justify-between rounded-t-md border-b px-2"
			>
				<div class="flex items-center">
					<button
						class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-25 opacity-50 shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
						disabled=""
						type="button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="sbui-icon"
						>
							<polyline points="15 18 9 12 15 6"></polyline>
						</svg>
					</button>
					<div class="group">
						<div class="flex cursor-pointer items-center">
							<p class="ml-3 truncate text-sm">images</p>
							<div
								class="ml-3 flex items-center space-x-2 opacity-0 transition group-hover:opacity-100"
							>
								<button
									class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
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
										<path
											d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
										></path></svg
									><span class="truncate">Navigate</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="flex items-center space-x-4">
					<div class="flex items-center space-x-1">
						<button
							class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative mr-2 inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
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
								<polyline points="23 4 23 10 17 10"></polyline>
								<polyline points="1 20 1 14 7 14"></polyline>
								<path
									d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
								></path></svg
							><span class="truncate">Reload</span></button
						><button
							type="button"
							id="radix-486"
							aria-haspopup="menu"
							aria-expanded="false"
							data-state="closed"
							class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
						>
							<span
								class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<path
										d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"
									></path></svg
								><span class="truncate">View as</span></span
							></button
						><button
							type="button"
							id="radix-487"
							aria-haspopup="menu"
							aria-expanded="false"
							data-state="closed"
							class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
						>
							<span
								class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<polyline points="7 13 12 18 17 13"></polyline>
									<polyline points="7 6 12 11 17 6"></polyline></svg
								><span class="truncate">Sort by</span></span
							></button
						><button
							type="button"
							id="radix-488"
							aria-haspopup="menu"
							aria-expanded="false"
							data-state="closed"
							class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
						>
							<span
								class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<polyline points="17 11 12 6 7 11"></polyline>
									<polyline points="17 18 12 13 7 18"></polyline></svg
								><span class="truncate">Sort Order</span></span
							>
						</button>
					</div>
					<div
						class="border-panel-border-light dark:border-panel-border-dark h-6 border-r"
					></div>
					<div class="flex items-center space-x-1">
						<div class="hidden"><input type="file" multiple="" /></div>
						<button data-state="closed" class="w-full">
							<button
								class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line></svg
								><span class="truncate">Upload files</span>
							</button></button
						><button data-state="closed" class="w-full">
							<button
								class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<path
										d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
									></path>
									<line x1="12" y1="11" x2="12" y2="17"></line>
									<line x1="9" y1="14" x2="15" y2="14"></line></svg
								><span class="truncate">Create folder</span>
							</button>
						</button>
					</div>
				</div>
			</div>
			<div class="flex h-full" style="height: 883px">
				<div
					class="file-explorer flex h-full w-full flex-grow justify-between overflow-x-auto"
				>
					<div class="flex">
						<!-- Main content -->
						<div
							style="width: 800px"
							class="border-panel-border-light dark:border-panel-border-dark hide-scrollbar relative flex flex-shrink-0 flex-col overflow-auto border-r px-5 py-3"
						>
							<div class="relative flex flex-grow flex-col">
								<div class="flex-grow">
									<div class="">
										<div>
											<div>
												<div
													class="grid grid-cols-7 justify-between md:space-x-4"
												>
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
																	<span
																		class="text-gray-1000 mr-1 inline-flex items-center text-sm font-medium dark:text-white"
																	>
																		{{
																			project.users.first_name &&
																			project.users?.last_name
																				? project.users.first_name +
																				  ' ' +
																				  project.users.last_name
																				: project.users.primary_email.split(
																						'@'
																				  )[0]
																		}}
																	</span>

																	<span
																		class="text-gray-1000 relative inline-flex pl-4 text-sm font-normal before:absolute before:left-1 before:top-2 before:h-[2px] before:w-[2px] before:bg-slate-400 before:content-[''] dark:text-slate-400"
																	>
																		{{
																			formatDateDistance(
																				project.created_at || new Date()
																			)
																		}}
																	</span>
																</div>
																<div class="space-x-1">
																	<span
																		v-for="badge in project.users.badges"
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

														<h1
															class="text-gray-1000 max-w-5xl text-2xl font-semibold dark:text-white"
														>
															<div class="" v-if="project.type === 'referral'">
																{{
																	project.users.first_name
																		? project.users.first_name
																		: project.users.primary_email
																}}
																<span class="text-slate-400">referred</span>
																{{ project.name }}
															</div>
															<div class="" v-else>{{ project.name }}</div>
														</h1>
													</div>
												</div>

												<div class="xl:pb-0">
													<h2 class="sr-only">Description</h2>

													<Disclosure v-slot="{ open }" as="div">
														<div
															v-if="enabled"
															class="my-4 grid max-w-5xl grid-cols-8 pr-4"
														>
															<DisclosurePanel
																static
																as="div"
																class="col-span-8"
															>
																<textarea
																	v-model="input"
																	@input="update"
																	name="comment"
																	id="comment"
																	class="min-h-36 prose -mx-3 -mt-2 block w-full max-w-none border-none bg-transparent font-sans text-base leading-7 text-sky-600 placeholder:text-gray-800 focus:ring-0 dark:text-white"
																	placeholder="Reply..."
																></textarea>
															</DisclosurePanel>
														</div>

														<div
															class="my-4 grid max-w-5xl grid-cols-8 pr-4"
															v-else
														>
															<div class="col-span-8">
																<article
																	class="prose max-w-none dark:prose-invert"
																	v-html="convert(input)"
																></article>
															</div>
														</div>
													</Disclosure>
												</div>
											</div>
										</div>
										<section
											aria-labelledby="activity-title"
											class="mt-8 xl:mt-10"
										>
											<div>
												<div class="divide-gray-200 dark:divide-slate-800">
													<div class="space-y-3 pb-4">
														<div class="flex justify-between"></div>
													</div>

													<div class="pt-6">
														<!-- Comments feed-->
														<div class="flex" v-if="!loading">
															<div
																v-if="comments.length <= 0"
																class="text-gray-1000 flex w-full rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm font-semibold hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-800 dark:text-white"
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
																		) in comments"
																		:key="activityItem.id"
																		:activity-item="activityItem"
																		:activity-item-idx="activityItemIdx"
																		:comments="comments"
																		@updated="fetchComments"
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
								</div>
							</div>
						</div>
						<div
							style="width: 500px"
							class="border-panel-border-light dark:border-panel-border-dark hide-scrollbar relative flex flex-shrink-0 flex-col overflow-auto border-r"
						>
							<div class="relative flex flex-grow flex-col">
								<div class="flex-grow">
									<div style="overflow: visible; height: 0px; width: 0px">
										<div
											style="
												position: relative;
												height: 883px;
												width: 500px;
												overflow: visible;
												will-change: transform;
												direction: ltr;
											"
											class="px-5"
										>
											<div style="height: 111px; width: 100%">
												<aside class="">
													<div
														class="py-3 space-y-8 dark:border-slate-700"
													>
														<div>
															<h2
																class="text-gray-1000 text-sm font-semibold leading-6"
															>
																Activity
															</h2>
															<ul role="list" class="mt-6 space-y-6">
																<li
																	v-for="(
																		activityItem, activityItemIdx
																	) in project.activity"
																	:key="activityItem.id"
																	class="relative flex gap-x-4"
																>
																	<div
																		:class="[
																			activityItemIdx ===
																			project.activity.length - 1
																				? 'h-6'
																				: '-bottom-6',
																			'absolute left-0 top-0 flex w-6 justify-center',
																		]"
																	>
																		<div class="w-px bg-gray-400" />
																	</div>
																	<template
																		v-if="activityItem.type === 'commented'"
																	>
																		<img
																			:src="activityItem.person.imageUrl"
																			alt=""
																			class="relative mt-3 h-6 w-6 flex-none rounded-full bg-slate-50"
																		/>
																		<div
																			class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200"
																		>
																			<div class="flex justify-between gap-x-4">
																				<div
																					class="py-0.5 text-xs leading-5 text-gray-800"
																				>
																					<span
																						class="text-gray-1000 font-medium"
																						>{{
																							activityItem.person.name
																						}}</span
																					>
																					commented
																				</div>
																				<span
																					class="flex-none py-0.5 text-xs leading-5 text-gray-800"
																					>{{ activityItem.created_at }}</span
																				>
																			</div>
																			<p
																				class="text-sm leading-6 text-gray-800"
																			>
																				{{ activityItem.comment }}
																			</p>
																		</div>
																	</template>
																	<template
																		v-else-if="
																			activityItem.type === 'event_cost'
																		"
																	>
																		<img
																			:src="activityItem.person.imageUrl"
																			alt=""
																			class="relative mt-3 h-6 w-6 flex-none rounded-full bg-slate-50"
																		/>
																		<div
																			class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200"
																		>
																			<div class="flex justify-between gap-x-4">
																				<div
																					class="py-0.5 text-xs leading-5 text-gray-800"
																				>
																					<span
																						class="text-gray-1000 font-medium"
																						>{{
																							activityItem.person.name
																						}}</span
																					>
																					commented
																				</div>
																				<span
																					class="flex-none py-0.5 text-xs leading-5 text-gray-800"
																					>{{ activityItem.created_at }}</span
																				>
																			</div>
																			<p
																				class="text-sm leading-6 text-gray-800"
																			>
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
																			class="flex-auto py-0.5 text-xs leading-5 text-gray-800"
																		>
																			<span
																				class="text-gray-1000 font-medium"
																				>{{
																					activityItem.users.username ??
																					activityItem.users.primary_email
																				}}</span
																			>
																			{{ activityItem.text }}
																		</p>
																		<span
																			class="flex-none py-0.5 text-xs leading-5 text-gray-800"
																			>{{
																				formatDateDistance(
																					new Date(activityItem.created_at) ||
																						new Date()
																				)
																			}}</span
																		>
																	</template>
																</li>
																<li
																	v-if="enabled"
																	class="relative flex gap-x-4"
																>
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
																						class="text-gray-1000 w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 group-disabled:opacity-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 sm:text-xs sm:leading-6"
																						:display-value="
																							(person) => person?.name
																						"
																					/>
																					<ComboboxButton
																						:disabled="!enabled"
																						class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 text-xs focus:outline-none"
																					>
																						<ChevronUpDownIcon
																							class="h-5 w-5 text-gray-800"
																							aria-hidden="true"
																						/>
																					</ComboboxButton>

																					<ComboboxOptions
																						v-if="filteredPeople.length > 0"
																						class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900 dark:ring-white/20 sm:text-sm"
																					>
																						<ComboboxOption
																							v-for="(
																								person, idx
																							) in filteredPeople"
																							:key="person.id"
																							:value="person"
																							:disabled="
																								shouldDisable(
																									selectedStage.id,
																									idx
																								)
																							"
																							as="template"
																							v-slot="{ active, selected }"
																						>
																							<li
																								:class="[
																									shouldDisable(
																										selectedStage.id,
																										idx
																									)
																										? 'cursor-not-allowed opacity-50'
																										: '',
																									'relative flex cursor-default select-none py-2 pl-8 pr-4',
																									active
																										? 'bg-indigo-600 text-white dark:text-white'
																										: 'text-gray-1000 dark:text-slate-300',
																								]"
																							>
																								<span
																									:class="[
																										'block truncate text-xs',
																										selected &&
																											'font-semibold ',
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
																											shouldDisable(
																												selectedStage.id,
																												idx
																											)
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
									</div>
								</div>
								<div
									style="position: absolute; inset: 0px; pointer-events: none"
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
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
		<ProjectModal v-if="showProjectModal" @close="showProjectModal = false" />
	</div>
</template>
