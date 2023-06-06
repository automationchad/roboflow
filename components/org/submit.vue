<script setup>
	import { ref } from 'vue';
	import { format, addDays } from 'date-fns';
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionChild,
		TransitionRoot,
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
	} from '@headlessui/vue';
	import {
		XMarkIcon,
		XCircleIcon,
		ChevronUpDownIcon,
		ChevronUpIcon,
		ExclamationCircleIcon,
	} from '@heroicons/vue/20/solid';
	import { CheckIcon } from '@heroicons/vue/24/outline';
	const emit = defineEmits(['close-modal', 'org-submit']);
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const open = ref(true);

	const form_responses = ref({
		name: '',

		email: '',
		options: {
			partner: false,
			tray_workspace: false,
			ai_enabled: false,
		},
	});

	const name = ref('');
	const brief = ref(null);
	const link = ref('');
	const type = ref('');
	const due_date = ref('');

	const loading = ref(false);
	const error_occurred = ref(false);
	const error_message = ref('');
	const duped_name = ref('');
	const route = useRoute();

	const imageSrc = ref([]);
	const fileInput = ref(null);
	const selectedFiles = ref([]);

	const cancelAll = () => {
		name.value = '';
		brief.value = null;
		imageSrc.value = [];
		selectedFiles.value = [];
		link.value = '';
		type.value = '';
		loading.value = false;
		fileInput.value = '';
	};

	const handleSubmit = async (body) => {
		loading.value = true;
		try {
			const { data, error } = await supabase
				.from('Account')
				.insert([
					{
						name: body.name,
						type: body.options.partner ? 'partner' : 'client',
						ai_enabled: body.options.ai_enabled,
                        status: 'active'
					},
				])
				.select();
			if (!error) {
				emit('org-submit');
				emit('close-modal');
				name.value = '';
				brief.value = null;
				link.value = '';
				type.value = '';
				loading.value = false;
			} else {
				loading.value = false;
				duped_name.value = body.name;
				error_occurred.value = true;
				error_message.value = error.message;
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<template>
	<div
		class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
	>
		<div
			@click="
				$emit('close-modal'), (error_message = ''), (error_occurred = false)
			"
			class="fixed inset-0 left-0 top-0 h-full w-full bg-gray-500/25 backdrop-blur-md transition-opacity duration-700 dark:bg-black/25"
		></div>
		<div class="flex h-full w-full items-start justify-center overflow-y-auto">
			<div class="mt-12">
				<div class="relative w-full flex-1 overflow-y-auto">
					<div class="py-6">
						<div class="flex items-center justify-between">
							<div
								class="flex items-center text-lg leading-6 text-gray-900 dark:text-white"
							>
								<img src="~/assets/images/logo.png" class="mr-3 h-6 w-6" />
								Motis Support
							</div>
							<div
								class="ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-xs shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
							>
								<span class="relative mr-1.5 flex h-2 w-2">
									<span
										class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
									></span>
									<span
										class="relative inline-flex h-2 w-2 rounded-full bg-green-500"
									></span>
								</span>
								All systems operational
							</div>
						</div>
					</div>
				</div>
				<div
					class="w-[800px] transform overflow-hidden rounded-lg border border-gray-200 bg-white pb-4 text-left shadow-xl transition-all dark:border-slate-800 dark:bg-slate-900 sm:my-8"
				>
					<form
						class="space-y-6"
						@submit.prevent="handleSubmit(form_responses)"
					>
						<div>
							<div class="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
								<div class="col-span-2 space-y-6 px-10 py-10">
									<div class="sm:col-span-2">
										<label
											for="name"
											class="block text-sm font-normal leading-6 text-gray-600 dark:text-slate-300"
											>Client name</label
										>
										<div class="mt-2.5">
											<input
												v-model="form_responses.name"
												required
												type="text"
												name="text"
												id="name"
												placeholder="Name of the company"
												:class="[
													error_message.includes(
														'duplicate key value violates unique constraint'
													) && form_responses.name === duped_name
														? 'ring-rose-400 focus:ring-rose-600'
														: 'focus:ring-indigo-600 dark:ring-slate-700',
													`block w-full rounded-md border-0 px-3.5 py-2
											text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
											placeholder:text-gray-400 focus:ring-2 focus:ring-inset
											 dark:bg-slate-800
											dark:text-slate-100 
											dark:placeholder:text-slate-400 sm:text-sm sm:leading-6`,
												]"
											/>
										</div>
										<p
											class="mt-1 text-xs text-rose-600 flex items-center"
											v-if="
												error_message.includes(
													'duplicate key value violates unique constraint'
												) && form_responses.name === duped_name
											"
										><ExclamationCircleIcon class="h-4 w-4 mr-1"/>
											Duplicate name found
										</p>
									</div>
									<div class="sm:col-span-2">
										<label
											for="name"
											class="block text-sm font-normal leading-6 text-gray-600 dark:text-slate-300"
											>Organization representative</label
										>
										<div class="mt-2.5">
											<input
												v-model="form_responses.email"
												required
												type="email"
												name="text"
												id="name"
												placeholder="The email of the representative"
												class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:placeholder:text-slate-400 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div class="sm:col-span-2">
										<label
											for="name"
											class="block text-sm font-normal leading-6 text-gray-600 dark:text-slate-300"
											>Options</label
										>
										<fieldset class="mt-2.5">
											<legend class="sr-only">Organization options</legend>
											<div class="space-y-5">
												<div class="relative flex items-start">
													<div class="flex h-6 items-center">
														<input
															v-model="form_responses.options.partner"
															id="comments"
															aria-describedby="comments-description"
															name="comments"
															type="checkbox"
															class="h-4 w-4 rounded border-gray-300 text-[#9382ff] focus:ring-[#9382ff] dark:border-slate-700 dark:bg-slate-800"
														/>
													</div>
													<div class="ml-3 text-sm leading-6">
														<label
															for="comments"
															class="font-medium text-gray-900 dark:text-white"
															>Create partner</label
														>
														{{ ' ' }}
														<span
															id="comments-description"
															class="text-gray-500 dark:text-slate-400"
															><span class="sr-only">Create partner </span>so
															they can start referring business</span
														>
													</div>
												</div>
												<div class="relative flex items-start">
													<div class="flex h-6 items-center">
														<input
															v-model="form_responses.tray_workspace"
															id="tray-workspace"
															aria-describedby="tray-workspace-description"
															name="tray-workspace"
															type="checkbox"
															class="h-4 w-4 rounded border-gray-300 text-[#9382ff] focus:ring-[#9382ff] dark:border-slate-700 dark:bg-slate-800"
														/>
													</div>
													<div class="ml-3 text-sm leading-6">
														<label
															for="tray-workspace"
															class="font-medium text-gray-900 dark:text-white"
															>Create Tray workspace</label
														>
														{{ ' ' }}
														<span
															id="tray-workspace-description"
															class="text-gray-500 dark:text-slate-400"
															><span class="sr-only"
																>Create Tray workspace </span
															>so we can start building in their account</span
														>
													</div>
												</div>
												<div class="relative flex items-start">
													<div class="flex h-6 items-center">
														<input
															v-model="form_responses.ai_enabled"
															id="ai-enabled"
															aria-describedby="ai-enabled-description"
															name="ai-enabled"
															type="checkbox"
															class="h-4 w-4 rounded border-gray-300 text-[#9382ff] focus:ring-[#9382ff] dark:border-slate-700 dark:bg-slate-800"
														/>
													</div>
													<div class="ml-3 text-sm leading-6">
														<label
															for="ai-enabled"
															class="font-medium text-gray-900 dark:text-white"
															>Enable AI</label
														>
														{{ ' ' }}
														<span
															id="ai-enabled-description"
															class="text-gray-500 dark:text-slate-400"
															><span class="sr-only">Enable AI </span>so that
															tickets will receive replies from Tracy
															automatically</span
														>
													</div>
												</div>
											</div>
										</fieldset>
									</div>
								</div>
							</div>
						</div>
						
						<div class="flex-shrink-0 px-10 py-5">
							<div class="flex justify-end space-x-3">
								<button
									type="button"
									class="rounded-md bg-white p-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
									@click="emit('close-modal'), cancelAll()"
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
								</button>
								<button
									type="submit"
									:disabled="loading"
									class="inline-flex justify-center rounded-md bg-indigo-600 p-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									<svg
										v-if="loading"
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
										></path></svg
									><svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24">
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"
										></path>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M12 15.5V12.75"
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
</template>
