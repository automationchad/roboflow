<template>
	<div class="relative z-50">
		<transition
			enter="ease-out duration-700"
			enter-from="opacity-0"
			enter-to="opacity-100"
			leave="ease-in duration-700"
			leave-from="opacity-100"
			leave-to="opacity-0"
		>
			<div
				@click="$emit('close-modal'), (error_message = '')"
				class="fixed inset-0 bg-gray-500/25 backdrop-blur-md transition-opacity duration-700 dark:bg-black/75"
			>
				<div class="fixed inset-0 z-10 overflow-y-auto">
					<div
						class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
					>
						<transition
							@click.stop
							enter="ease-out duration-300"
							enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enter-to="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leave-from="opacity-100 translate-y-0 sm:scale-100"
							leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div
								class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-md sm:p-10"
							>
								<div class="">
									<h3
										class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
									>
										Create a new request
									</h3>
									<!-- <p class="mt-4 text-sm text-gray-600 dark:text-slate-500">
										Create or log in to an existing Motis account.
									</p> -->
								</div>

								<form class="mt-6 space-y-6">
									<div>
										<div
											class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2"
										>
											<div class="sm:col-span-2">
												<label
													for="name"
													class="block text-sm font-semibold leading-6 text-gray-900"
													>Name {{ ' '
													}}<span class="text-rose-700">*</span></label
												>
												<div class="mt-2.5">
													<input
														v-model="name"
														required
														type="text"
														name="text"
														id="name"
														class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div class="sm:col-span-2">
												<label
													for="location"
													class="block text-sm font-medium leading-6 text-gray-900"
													>Priority {{ ' ' }}
													<span class="text-rose-700">*</span></label
												>
												<select
													id="location"
													name="location"
													class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
												>
													<option>Low</option>
													<option selected="">Medium</option>
													<option>High</option>
												</select>
											</div>
											<div class="sm:col-span-2">
												<label
													for="message"
													class="block text-sm font-semibold leading-6 text-gray-900"
													>Brief {{ ' '
													}}<span class="text-rose-700">*</span></label
												>
												<div class="mt-2.5">
													<textarea
														v-model="brief"
														required
														name="message"
														id="message"
														rows="4"
														class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
											<div class="sm:col-span-2">
												<div class="flex justify-between">
													<label
														for="url"
														class="block text-sm font-medium leading-6 text-gray-900"
														>Loom link</label
													>
													<span
														class="text-sm leading-6 text-gray-500"
														id="url-optional"
														>Optional</span
													>
												</div>
												<div class="mt-2.5">
													<input
														type="url"
														name="url"
														id="url"
														class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
										</div>
									</div>

									<div>
										<button
											type="submit"
											:disabled="loading"
											@click="handleSubmit"
											class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											<span>{{ loading ? 'Loading' : 'Create ticket' }}</span>
										</button>
									</div>
								</form>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</transition>
	</div>
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
	import { CheckIcon } from '@heroicons/vue/24/outline';
	const emit = defineEmits(['close-modal', 'show-otp-modal']);
	const open = ref(true);
	const name = ref('');
	const brief = ref('');
	const loading = ref(false);
	const error_occurred = ref(false);
	const handleSubmit = async () => {
		try {
			loading.value = true;

			// emit('close-modal');
			// emit('show-otp-modal');
		} catch (error) {
			error_occurred.value = true;
			error_message.value = error.error_description || error.message;
			// emit('close-modal', error.error_description || error.message);
		} finally {
			loading.value = false;
		}
	};
</script>
