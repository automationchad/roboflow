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
								class="relative transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-lg"
							>
								<div class="relative w-full flex-1 overflow-y-auto">
									<div class="bg-gray-50 py-6 px-4 sm:px-6">
										<div class="flex items-center justify-between">
											<div
												class="text-base font-semibold leading-6 text-gray-900"
											>
												New Project
											</div>
											<div class="ml-3 flex h-7 items-center">
												<button
													type="button"
													class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
													@click="emit('close-modal')"
												>
													<span class="sr-only">Close panel</span>
													<XMarkIcon class="h-6 w-6" aria-hidden="true" />
												</button>
											</div>
										</div>
										<div class="mt-1">
											<p class="text-sm text-gray-500">
												Get started by filling in the information below to
												create your new project.
											</p>
										</div>
									</div>
								</div>

								<form
									class="space-y-6 p-10"
									@submit.prevent="
										handleSubmit({ name, brief, type, link, auth, listId })
									"
								>
									<div>
										<div
											class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2"
										>
											<div class="sm:col-span-2">
												<label
													for="name"
													class="block text-sm font-semibold leading-6 text-gray-900"
													>Title {{ ' '
													}}<span class="text-rose-700">*</span></label
												>
												<div class="mt-2.5">
													<input
														v-model="name"
														required
														type="text"
														name="text"
														id="name"
														placeholder="A brief summary of the project / issue"
														class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div class="sm:col-span-2">
												<div>
													<label class="text-sm font-semibold text-gray-900"
														>Type {{ ' ' }}
														<span class="text-rose-700">*</span></label
													>

													<fieldset class="mt-4">
														<legend class="sr-only">Notification method</legend>
														<div
															class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10"
														>
															<div
																v-for="ticketType in ticketTypes"
																:key="ticketType.id"
																class="flex items-center"
															>
																<input
																	:id="ticketType.id"
																	v-model="type"
																	type="radio"
																	:value="ticketType.id"
																	:checked="ticketType.id === 'mod'"
																	class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
																/>
																<label
																	:for="ticketType.id"
																	class="ml-3 block text-sm font-medium leading-6 text-gray-900"
																	>{{ ticketType.title }}</label
																>
															</div>
														</div>
													</fieldset>
													<div
														class="prose mt-2 rounded-lg bg-gray-50 p-4 text-xs text-gray-500"
													>
														<p>
															<strong>💎 New:</strong> If you have a project
															recommendation, an idea, major process change
															request, or any other larger initiative.
														</p>
														<p>
															<strong>👾 Mod:</strong> Small-scale request such
															as a bug fix, troubleshooting issue, small or
															straightforward change to an existing process
														</p>
													</div>
												</div>
											</div>
											<div class="sm:col-span-2">
												<label
													for="message"
													class="block text-sm font-semibold leading-6 text-gray-900"
													>Description {{ ' '
													}}<span class="text-rose-700">*</span></label
												>
												<div class="mt-2.5">
													<textarea
														v-model="brief"
														required
														name="message"
														id="message"
														rows="4"
														placeholder="Summary statement of the project / issue"
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
														v-model="link"
														type="url"
														name="url"
														id="url"
														class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
										</div>
									</div>
									<div class="flex-shrink-0 border-t border-gray-200 py-5">
										<div class="flex justify-end space-x-3">
											<button
												type="button"
												class="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												@click="emit('close-modal')"
											>
												Cancel
											</button>
											<button
												type="submit"
												:disabled="loading"
												class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											>
												{{ loading ? 'Loading' : 'Create' }}
											</button>
										</div>
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
	import { XMarkIcon } from '@heroicons/vue/20/solid';
	import { CheckIcon } from '@heroicons/vue/24/outline';
	const emit = defineEmits(['close-modal', 'ticket-submit']);
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const open = ref(true);
	const name = ref('');
	const brief = ref('');
	const link = ref('');
	const type = ref('');
	const loading = ref(false);
	const error_occurred = ref(false);
	const route = useRoute();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id)`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const ticketTypes = [
		{ id: 'bug', title: '👾 Mod' },
		{ id: 'new', title: '💎 New' },
	];

	function addWorkDays(startDate, days) {
		if (isNaN(days)) {
			console.log('Value provided for "days" was not a number');
			return;
		}
		if (!(startDate instanceof Date)) {
			console.log('Value provided for "startDate" was not a Date object');
			return;
		}
		// Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
		var dow = startDate.getDay();
		var daysToAdd = parseInt(days);
		// If the current day is Sunday add one day
		if (dow == 0) daysToAdd++;
		// If the start date plus the additional days falls on or after the closest Saturday calculate weekends
		if (dow + daysToAdd >= 6) {
			//Subtract days in current working week from work days
			var remainingWorkDays = daysToAdd - (5 - dow);
			//Add current working week's weekend
			daysToAdd += 2;
			if (remainingWorkDays > 5) {
				//Add two days for each working week by calculating how many weeks are included
				daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
				//Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
				if (remainingWorkDays % 5 == 0) daysToAdd -= 2;
			}
		}
		startDate.setDate(startDate.getDate() + daysToAdd);
		return startDate;
	}

	const handleSubmit = async (body) => {
		loading.value = true;
		var due_date = addWorkDays(new Date(), 5);

		const { data, error } = await supabase.from('Ticket').insert([
			{
				name: body.name,
				type: body.type,
				status: 'backlog',
				createdBy: user.value.id,
				dueDate: due_date,
				accountId: route.params.organization,
				desc: body.brief + (link.value ? `\n [Video link](${link.value})` : ''),
			},
		]);

		// if (link !== '') {
		// 	await $fetch(
		// 		`https://api.trello.com/1/cards/${card.id}/attachments?url=${body.link}&name=videolink&${body.auth}`,
		// 		{
		// 			method: 'POST',
		// 			headers: {
		// 				Accept: 'application/json',
		// 			},
		// 		}
		// 	)
		// 		.then((response) => {
		// 			return response;
		// 		})
		// 		.catch((err) => console.error(err));
		// }
		emit('ticket-submit');
		emit('close-modal');
		
	};
</script>

<script>
	export default {
		props: ['listId', 'auth'],
	};
</script>
