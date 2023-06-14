<script setup>
	import { UserCircleIcon as UserCircleIconMini } from '@heroicons/vue/20/solid';

	import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
	import {
		ArchiveBoxIcon,
		ArrowRightCircleIcon,
		ArrowUpCircleIcon,
		ChevronDownIcon,
		DocumentDuplicateIcon,
		HeartIcon,
		PencilSquareIcon,
		TrashIcon,
		UserPlusIcon,
	} from '@heroicons/vue/20/solid';

	import showdown from 'showdown';
	const converter = await new showdown.Converter();

	const convert = (text) => {
		const formatted = converter.makeHtml(text);
		return formatted;
	};

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const route = useRoute();

	const loading = ref(false);
	const writing = ref(false);
	const finished = ref(false);
	const copied = ref(false);
	const shouldType = ref(true);

	let typedText = ref(''); // This will hold our text from API
	let aiResponse = ''; // This will hold the raw text from API

	const prompt = ref('');
	const stored_prompt = ref('');
	const stored_subtype = ref('');
	const stored_ai_response = ref(false);

	const { data: Ticket, ticketError: error } = await supabase
		.from('Ticket')
		.select('status')
		.eq('id', route.params.id)
		.limit(1)
		.single();

	async function typewriterEffect() {
		shouldType.value = true;
		writing.value = true;
		for (let i = 0; i < aiResponse.length; i++) {
			if (!shouldType.value) {
				break; // Stop typing if shouldType is false
			}
			typedText.value += aiResponse.charAt(i);
			await new Promise((resolve) => setTimeout(resolve, Math.random() * 50)); // Wait for 100ms
		}
		writing.value = false;
		loading.value = false;
		finished.value = true;
	}

	async function sendAIRequest(subtype, ai_response) {
		const url = '/api/tray/tracy';
		stored_subtype.value = subtype;
		stored_ai_response.value = ai_response;
		const data = {
			type: 'AI',
			subtype,
			ticketId: route.params.id,
		};

		if (subtype === 'longer' && ai_response) {
			data.prompt = aiResponse;
		} else if (subtype === 'reply') {
			data.context = aiResponse;
			data.prompt = stored_prompt.value;
		} else {
			data.prompt = stored_prompt.value;
		}

		try {
			const response = await $fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: data,
			});
			const result = await response;
			return result.content;
		} catch (error) {
			console.error('Error:', error);
		}
	}

	const handleAIRequest = async (subtype, ai_response) => {
		if (!ai_response) {
			aiResponse = '';
		}
		typedText.value = '';
		finished.value = false;
		loading.value = true;
		if (prompt.value !== '') {
			stored_prompt.value = prompt.value;
		}
		prompt.value = '';
		aiResponse = await sendAIRequest(subtype, ai_response);
		typewriterEffect();
	};

	const handleAIRetry = async () => {
		loading.value = true;
		aiResponse = await sendAIRequest(
			stored_subtype.value,
			stored_ai_response.value
		);
		typewriterEffect();
	};

	async function copyResponseToClipboard() {
		try {
			await navigator.clipboard.writeText(aiResponse);
			copied.value = true;
			setTimeout(() => {
				copied.value = false;
			}, 2000);
			console.log('API response copied to clipboard');
		} catch (err) {
			console.log('Failed to copy text: ', err);
		}
	}

	const handleCommentAdd = async (thread_id) => {
		loading.value = true;
		finished.value = false;
		stored_prompt.value = prompt.value;
		prompt.value = '';
		typedText.value = '';
		try {
			const { data, error: insertCommentError } = await supabase
				.from('Comment')
				.insert([
					{
						text: aiResponse,
						createdBy: '21e266c0-8d4a-454b-a815-f604212430e2',
						ticketId: route.params.id,
						threadId: thread_id,
						activity_type: 'ai_comment',
					},
				]);

			if (insertCommentError) {
				console.error('Error inserting comment:', insertCommentError);
			} else {
				console.log('Comment created successfully');
			}
		} catch (error) {
			alert(error.message);
		} finally {
			prompt.value = '';
			aiResponse = '';
			loading.value = false;
		}
	};
</script>

<template>
	<div class="space-y-3">
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
			><div
				v-if="aiResponse || loading"
				:class="[
					'ai_shadow shadow-inset mg_ai w-full rounded-r-lg rounded-t-lg rounded-bl-sm  bg-[#1C1B2C]/60 px-4 py-3 text-sm leading-7 text-slate-700 shadow-[#9643FF]/25 ring-1 ring-inset ring-black/5 ring-purple-400 dark:prose-invert dark:bg-[#1C1B2C] dark:text-gray-200 dark:ring-white/5',
				]"
				id="ai-response"
			>
				<div class="flex items-start space-x-1">
					<img
						src="~/assets/images/giovanni_ai_profile.png"
						alt="Tracy AI"
						class="mr-2 mt-1 h-5 w-5 rounded-full object-cover"
					/>

					<div class="flex">
						<div class="flex items-center" v-if="loading && !writing">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-1 mt-1 h-5 w-5 animate-spin text-white"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M12 4.75v1.5m5.126.624L16 8m3.25 4h-1.5m-.624 5.126-1.768-1.768M12 16.75v2.5m-3.36-3.891-1.768 1.768M7.25 12h-2.5m3.891-3.358L6.874 6.874"
								></path>
							</svg>
						</div>
						<div class="flex flex-wrap">
							<div
								v-html="convert(typedText)"
								class="mg_ai-text inline-block"
							></div>
						</div>
					</div>
				</div>
			</div>
		</transition>

		<div class="flex w-full">
			<Menu as="div" class="relative inline-block w-full" v-slot="{ open }">
				<div
					class="ai_shadow inline-flex w-full justify-start gap-x-1.5 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-slate-800 dark:bg-white/5"
				>
					<div
						class="relative inline-flex w-full items-center justify-start rounded-md"
					>
						<MenuButton :disabled="loading" @click="open = true"
							><svg
								:class="[
									'h-6 w-6 text-[#9382ff] transition-colors duration-200',
								]"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.75 13C14 13 14 7.75 14 7.75C14 7.75 14 13 18.25 13C14 13 14 18.25 14 18.25C14 18.25 14 13 9.75 13Z"
									fill="currentColor"
								></path>
								<path
									d="M5.75 8C8 8 8 5.75 8 5.75C8 5.75 8 8 10.25 8C8 8 8 10.25 8 10.25C8 10.25 8 8 5.75 8Z"
									fill="currentColor"
								></path>
								<path
									d="M7.75 16.25H7.76M18.25 5.75H18.26M18.25 18.25H18.26M14 7.75C14 7.75 14 13 9.75 13C14 13 14 18.25 14 18.25C14 18.25 14 13 18.25 13C14 13 14 7.75 14 7.75ZM8 5.75C8 5.75 8 8 5.75 8C8 8 8 10.25 8 10.25C8 10.25 8 8 10.25 8C8 8 8 5.75 8 5.75Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path></svg
						></MenuButton>
						<input
							:disabled="loading"
							type="text"
							v-model="prompt"
							name="prompt"
							id="prompt"
							:class="[
								loading
									? 'placeholder:text-[#9382ff]'
									: 'placeholder:text-indigo-300',
								'block w-full border-0  bg-transparent py-1.5 pr-4 font-normal text-slate-900 placeholder:font-normal visited:bg-transparent focus:border-0 focus:ring-0  active:bg-transparent dark:text-white sm:text-sm sm:leading-6',
							]"
							:placeholder="
								loading
									? 'AI is writing...'
									: aiResponse
									? 'Tell Gio what to do next...'
									: 'Ask Gio to write anything...'
							"
						/>
						<div class="flex items-center space-x-1">
							<button
								@click="handleAIRequest('reply', true)"
								v-if="aiResponse && !writing"
								:disabled="loading || !prompt"
								class="group bg-none text-[#9382ff] transition-colors disabled:text-indigo-200/50"
							>
								<svg
									class="h-5 w-5 bg-transparent"
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
									></path>
								</svg>
							</button>
							<button
								v-if="!writing"
								:disabled="loading || !prompt"
								class="group bg-none text-[#9382ff] transition-colors disabled:text-indigo-200/50"
								@click="handleAIRequest"
							>
								<svg
									class="h-5 w-5 bg-transparent"
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
							</button>
							<button
								@click="shouldType = !shouldType"
								v-else
								class="group bg-none text-[#9382ff] transition-colors disabled:text-indigo-200/50"
							>
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
									<rect
										width="12.5"
										height="12.5"
										x="5.75"
										y="5.75"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										rx="1"
									></rect>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<transition
					v-show="!loading || finished || open"
					enter-active-class="transition ease-out duration-100"
					enter-from-class="transform opacity-0 scale-95"
					enter-to-class="transform opacity-100 scale-100"
					leave-active-class="transition ease-in duration-75"
					leave-from-class="transform opacity-100 scale-100"
					leave-to-class="transform opacity-0 scale-95"
				>
					<MenuItems
						static
						v-if="!typedText"
						class="absolute left-0 z-10 mt-2 max-h-72 w-56 origin-top-left divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none dark:divide-white/10 dark:bg-[#06051A] dark:ring-white/10"
					>
						<div class="py-1">
							<div
								class="flex items-center px-4 py-2 text-xs font-medium dark:text-white"
							>
								Generate from ticket
							</div>
							<MenuItem v-slot="{ active }">
								<button
									@click="
										handleAIRequest('summarize'), (stored_prompt = 'summarize')
									"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11.25 11.25C11.25 12.3546 10.3546 13.25 9.25 13.25H6.75C5.64543 13.25 4.75 12.3546 4.75 11.25V9.06349C4.75 8.2262 5.09991 7.427 5.71516 6.85908L8 4.75V7.75H9.25C10.3546 7.75 11.25 8.64543 11.25 9.75V11.25Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M19.25 17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H14.75C13.6454 19.25 12.75 18.3546 12.75 17.25V15.0635C12.75 14.2262 13.0999 13.427 13.7152 12.8591L16 10.75V13.75H17.25C18.3546 13.75 19.25 14.6454 19.25 15.75V17.25Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>
									Summarize
								</button>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<button
									@click="handleAIRequest('action_items', false)"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
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

									Find action items
								</button>
							</MenuItem>

							<MenuItem v-slot="{ active }">
								<button
									@click="
										handleAIRequest('sow_create', false),
											(stored_prompt = 'sow_create')
									"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
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

									Create SOW
								</button>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<button
									@click="
										handleAIRequest('invoice_create', false),
											(stored_prompt = 'invoice_create')
									"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mr-3 h-5 w-5 text-[#9382ff]"
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

									Create invoice
								</button>
							</MenuItem>
						</div>
						<div class="py-1" v-if="false">
							<div
								class="flex items-center px-4 py-2 text-xs font-medium dark:text-white"
							>
								Edit or review comment
							</div>
							<MenuItem v-slot="{ active }">
								<a
									href="#"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5.04509 16.705L16.707 5.04302C17.0976 4.65249 17.7307 4.65249 18.1213 5.04301L18.957 5.8788C19.3476 6.26933 19.3476 6.90249 18.957 7.29302L7.29509 18.955C6.90457 19.3455 6.2714 19.3455 5.88088 18.955L5.04509 18.1192C4.65457 17.7287 4.65457 17.0955 5.04509 16.705Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M15 7L17 9"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>

									Improve writing
								</a>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<a
									href="#"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
										></path>
									</svg>

									Fix spelling & grammar
								</a>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<a
									href="#"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<ArrowRightCircleIcon
										class="mr-3 h-5 w-5 text-[#9382ff]"
										aria-hidden="true"
									/>
									Make shorter
								</a>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<button
									href="#"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<ArrowRightCircleIcon
										class="mr-3 h-5 w-5 text-[#9382ff]"
										aria-hidden="true"
									/>
									Make longer
								</button>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<a
									href="#"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M17 4.75C17 5.89705 15.8971 7 14.75 7C15.8971 7 17 8.10295 17 9.25C17 8.10295 18.1029 7 19.25 7C18.1029 7 17 5.89705 17 4.75Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M17 14.75C17 15.8971 15.8971 17 14.75 17C15.8971 17 17 18.1029 17 19.25C17 18.1029 18.1029 17 19.25 17C18.1029 17 17 15.8971 17 14.75Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M9 7.75C9 9.91666 6.91666 12 4.75 12C6.91666 12 9 14.0833 9 16.25C9 14.0833 11.0833 12 13.25 12C11.0833 12 9 9.91666 9 7.75Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>

									Simplify language
								</a>
							</MenuItem>
						</div>
					</MenuItems>
					<MenuItems
						static
						v-else
						class="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none dark:divide-white/10 dark:bg-[#06051A] dark:ring-white/10"
					>
						<div class="py-1">
							<MenuItem v-slot="{ active }">
								<button
									@click="
										handleCommentAdd(null),
											(open = false),
											(showDiv = false),
											(typedText = ''),
											(prompt = '')
									"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-white"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"
										></path>
									</svg>

									Done
								</button>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<button
									@click="copyResponseToClipboard(), (open = false)"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										:class="[
											copied ? 'text-lime-400' : 'text-[#9382ff]',
											'mr-3 h-5 w-5 ',
										]"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M6.5 15.25V15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5V6.5"
										></path>
										<rect
											width="10.5"
											height="10.5"
											x="8.75"
											y="8.75"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											rx="2"
										></rect>
									</svg>

									{{ copied ? 'Copied!' : 'Copy' }}
								</button>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<button
									href="#"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
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

									Continue writing
								</button>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<button
									@click="handleAIRequest('longer', true)"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 text-[#9382ff]"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M4.75 5.75H14.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M4.75 18.25H14.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M4.75 12H19.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>

									Make longer
								</button>
							</MenuItem>
						</div>
						<div class="py-1">
							<MenuItem v-slot="{ active }">
								<button
									@click="
										(aiResponse = ''),
											(typedText = ''),
											(open = false),
											(finished = false),
											handleAIRetry(stored_subtype, stored_ai_response)
									"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-white"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M9.25 4.75L4.75 9L9.25 13.25"
										></path>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M5.5 9H15.25C17.4591 9 19.25 10.7909 19.25 13V19.25"
										></path>
									</svg>

									Try again
								</button>
							</MenuItem>
							<MenuItem v-slot="{ active }">
								<button
									@click="
										(finished = false),
											(open = false),
											(showDiv = false),
											(aiResponse = ''),
											(typedText = ''),
											(prompt = '')
									"
									:class="[
										active
											? 'bg-gray-100 text-gray-900 dark:bg-white/5 dark:text-white'
											: 'text-gray-700 dark:text-gray-300',
										'group flex w-full items-center px-4 py-2 text-sm',
									]"
								>
									<svg
										class="mr-3 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-white"
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

									Close
								</button>
							</MenuItem>
						</div>
					</MenuItems>
				</transition>
			</Menu>
		</div>
	</div>
</template>

const menuItems = [];

<style scoped>
	.ai_shadow {
		box-shadow: inset 0px -5px 20px 0 rgba(150, 67, 255, 0.15);
		border: 1px solid rgba(187, 150, 255, 0.358);
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
		background: linear-gradient(135deg, #f5e8fa 0%, #e5f7fa 50%, #e6def8 100%);
		-webkit-background-clip: text;
		background-clip: text;
		background-size: 200% 100%;
		-webkit-text-fill-color: transparent;
	}
</style>
