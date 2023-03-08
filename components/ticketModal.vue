<template>
	<TransitionRoot as="template" :show="open">
		<Dialog as="div" class="relative z-50" @close="$emit('close-modal')">
			<div class="fixed inset-0" />

			<div class="fixed inset-0">
				<div class="absolute inset-0">
					<div
						class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
					>
						<TransitionChild
							as="template"
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enter-from="translate-x-full"
							enter-to="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leave-from="translate-x-0"
							leave-to="translate-x-full"
						>
							<DialogPanel class="pointer-events-auto w-screen max-w-2xl">
								<div
									class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
								>
									<div class="flex-1">
										<!-- Header -->
										<div class="bg-gray-50 px-4 py-6 sm:px-6">
											<div class="flex items-start justify-between space-x-3">
												<div class="space-y-1">
													<DialogTitle
														class="text-base font-semibold leading-6 text-gray-900"
														>{{ card.name }}</DialogTitle
													>
												</div>
												<div class="flex h-7 items-center">
													<button
														type="button"
														class="text-gray-400 hover:text-gray-500"
														@click="emit('close-modal')"
													>
														<span class="sr-only">Close panel</span>
														<XMarkIcon class="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>

										<!-- Divider container -->
										<div
											class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0"
										>
											<!-- Project name -->

											<!-- Project description -->
											<div
												class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
											>
												<div>
													<label
														for="project-description"
														class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>Description</label
													>
												</div>
												<div class="sm:col-span-2">
													<textarea
														disabled
														:value="card.desc"
														id="project-description"
														name="project-description"
														rows="3"
														class="block w-full rounded-md border-0 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div
												v-if="false"
												class="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
											>
												<div>
													<label
														for="project-name"
														class="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
														>Project video</label
													>
												</div>

												<div class="sm:col-span-2">
													<div
														class="relative h-0 overflow-hidden rounded-lg pb-48"
													>
														<iframe
															src="https://www.loom.com/embed/23bc4fa5b0874e438e8346c92bdad161"
															frameborder="0"
															webkitallowfullscreen
															mozallowfullscreen
															allowfullscreen
															style="
																position: absolute;
																top: 0;
																left: 0;
																width: 100%;
																height: 100%;
															"
														></iframe>
													</div>
												</div>
											</div>

											<!-- Comments -->
											<fieldset
												class="space-y-2 overflow-y-auto px-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5"
											>
												<legend class="sr-only">Comments</legend>
												<div
													class="text-sm font-medium leading-6 text-gray-900"
													aria-hidden="true"
												>
													Comments
												</div>
												<div class="space-y-6 overflow-y-auto sm:col-span-2">
													<div class="mb-4">
														<div class="mt-2">
															<textarea
																v-model="comment_text"
																rows="4"
																name="comment"
																placeholder="Add a comment..."
																id="comment"
																class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
															/>
														</div>
														<div class="mt-2 flex flex-shrink-0 justify-end">
															<button
																@click="handleCommentAdd(card.id, comment_text)"
																class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
															>
																Post
															</button>
														</div>
													</div>
													<div class="h-[450px] overflow-y-auto">
														<CommentFeed
															:card="card"
															:key="feedKey"
															v-if="!loading"
															@delete-comment="handleDeleteComment"
														/>
														<div
															v-else
															class="relative block w-full rounded-lg border border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
														>
															<div class="flex items-center justify-center">
																<svg
																	class="mr-3 h-5 w-5 animate-spin text-gray-500"
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																>
																	<circle
																		class="opacity-25"
																		cx="12"
																		cy="12"
																		r="10"
																		stroke="currentColor"
																		stroke-width="4"
																	></circle>
																	<path
																		class="opacity-75"
																		fill="currentColor"
																		d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
																	></path>
																</svg>
																<span class="text-sm text-gray-500"
																	>Loading comments...</span
																>
															</div>
														</div>
													</div>

													<!-- <div class="space-y-5 sm:mt-0">
														<div class="relative flex items-start">
															<div class="absolute flex h-6 items-center">
																<input
																	id="public-access"
																	name="privacy"
																	aria-describedby="public-access-description"
																	type="radio"
																	class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
																	checked=""
																/>
															</div>
															<div class="pl-7">
																<label
																	for="public-access"
																	class="text-sm font-medium leading-6 text-gray-900"
																	>Public access</label
																>
																<p
																	id="public-access-description"
																	class="text-sm text-gray-500"
																>
																	Everyone with the link will see this project
																</p>
															</div>
														</div>
														<div class="relative flex items-start">
															<div class="absolute flex h-6 items-center">
																<input
																	id="restricted-access"
																	name="privacy"
																	aria-describedby="restricted-access-description"
																	type="radio"
																	class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
																/>
															</div>
															<div class="pl-7">
																<label
																	for="restricted-access"
																	class="text-sm font-medium leading-6 text-gray-900"
																	>Private to Project Members</label
																>
																<p
																	id="restricted-access-description"
																	class="text-sm text-gray-500"
																>
																	Only members of this project would be able to
																	access
																</p>
															</div>
														</div>
														<div class="relative flex items-start">
															<div class="absolute flex h-6 items-center">
																<input
																	id="private-access"
																	name="privacy"
																	aria-describedby="private-access-description"
																	type="radio"
																	class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
																/>
															</div>
															<div class="pl-7">
																<label
																	for="private-access"
																	class="text-sm font-medium leading-6 text-gray-900"
																	>Private to you</label
																>
																<p
																	id="private-access-description"
																	class="text-sm text-gray-500"
																>
																	You are the only one able to access this
																	project
																</p>
															</div>
														</div>
													</div>
													<hr class="border-gray-200" />
													<div
														class="space-between sm:space-between flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0"
													>
														<div class="flex-1">
															<a
																href="#"
																class="group flex items-center space-x-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-900"
															>
																<LinkIcon
																	class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
																	aria-hidden="true"
																/>
																<span>Copy link</span>
															</a>
														</div>
														<div>
															<a
																href="#"
																class="group flex items-center space-x-2.5 text-sm text-gray-500 hover:text-gray-900"
															>
																<QuestionMarkCircleIcon
																	class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
																<span>Learn more about sharing</span>
															</a>
														</div>
													</div> -->
												</div>
											</fieldset>
										</div>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import { XMarkIcon } from '@heroicons/vue/24/outline';
	import {
		LinkIcon,
		PlusIcon,
		QuestionMarkCircleIcon,
	} from '@heroicons/vue/20/solid';

	const props = defineProps(['card', 'open', 'comments']);

	const emit = defineEmits(['close-modal', 'show-otp-modal']);

	const test = false;
	const user = test
		? ref({ email: 'automation@motis.group' })
		: useSupabaseUser();
	const auth = `key=8ec73785de7fe1ccc3f8c83aa07f85bd&token=ATTA9da8c99ddba28fd8b218a814b05c0dc3b05c7be57eb004508cc37467b6a162e914BB2F03`;

	const comment_text = ref('');

	const feedKey = ref(0);
	const loading = ref(false);

	const handleDeleteComment = () => {
		loading.value = true;
		setTimeout(() => {
			feedKey.value++;
			loading.value = false;
		}, 1000);
	};

	const handleCommentAdd = async (card_id, text) => {
		const comment = await $fetch(
			`https://api.trello.com/1/cards/${card_id}/actions/comments?text=${
				`\{${user.value.email}\} --- ` + text
			}&${auth}`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
			}
		)
			.then((response) => {
				console.log(response);
				return response;
			})
			.catch((err) => console.error(err));
		comment_text.value = '';
		loading.value = true;
		setTimeout(() => {
			feedKey.value++;
			loading.value = false;
		}, 1000);

		return comment;
	};
</script>
