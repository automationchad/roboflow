<template>
	<div
		class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
	>
		<div
			@click="$emit('close-modal'), (error_message = '')"
			class="fixed inset-0 left-0 top-0 h-full w-full bg-gray-500/25 backdrop-blur-md transition-opacity duration-700 dark:bg-black/25"
		></div>
		<div class="flex h-full w-full items-start justify-center overflow-y-auto">
			<div
				class="w-[800px] transform overflow-hidden rounded-lg bg-white pb-4 text-left shadow-xl transition-all dark:bg-slate-900 sm:my-8"
			>
				<div class="relative w-full flex-1 overflow-y-auto">
					<div class="bg-slate-50 px-8 py-6 dark:bg-slate-800 sm:px-10">
						<div class="flex items-center justify-between">
							<div
								class="flex items-center text-lg leading-6 text-gray-900 dark:text-white"
							>
								<img src="~/assets/images/logo.png" class="mr-3 h-6 w-6" />
								Motis Support
							</div>
							<div
								class="ml-3 inline-flex items-center rounded-md border border-slate-200 bg-slate-700 px-2 py-1 text-xs shadow-sm dark:border-slate-600 dark:text-white"
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

				<form
					class="space-y-6"
					@submit.prevent="handleSubmit({ name, brief, type, link })"
				>
					<div>
						<div class="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
							<div
								class="col-span-2 mb-10 space-y-8 border-b border-gray-200 px-10 py-10"
							>
								<div class="sm:col-span-2">
									<Listbox as="div" v-model="selectedTicket">
										<ListboxLabel
											class="block text-sm leading-6 text-gray-600 dark:text-slate-400"
											>What area do you need help in?</ListboxLabel
										>
										<div class="relative mt-2">
											<ListboxButton
												class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white dark:ring-slate-700 sm:text-sm sm:leading-6"
											>
												<span class="inline-flex w-full truncate">
													<span class="truncate">{{
														selectedTicket.title
													}}</span>
												</span>
												<span
													class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
												>
													<ChevronUpDownIcon
														class="h-5 w-5 text-gray-400"
														aria-hidden="true"
													/>
												</span>
											</ListboxButton>

											<transition
												leave-active-class="transition ease-in duration-100"
												leave-from-class="opacity-100"
												leave-to-class="opacity-0"
											>
												<ListboxOptions
													class="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 sm:text-sm"
												>
													<ListboxOption
														as="template"
														v-for="ticketType in ticketTypes"
														:key="ticketType.id"
														:value="ticketType"
														v-slot="{ active, selected }"
													>
														<li
															:class="[
																active ? 'bg-slate-50 dark:bg-slate-700' : '',
																selected
																	? 'bg-slate-200 dark:bg-slate-600'
																	: '',
																'relative cursor-default select-none py-2 pl-3 pr-9 transition-colors',
															]"
														>
															<div class="flex flex-col">
																<span
																	:class="[
																		selected
																			? 'text-gray-600 dark:text-slate-400'
																			: 'text-gray-400 dark:text-slate-400',
																		active
																			? 'text-gray-800 dark:text-white'
																			: '',
																		'truncate',
																	]"
																	>{{ ticketType.title }}</span
																><span
																	:class="[
																		active
																			? 'text-gray-600 dark:text-slate-300'
																			: 'text-gray-500 dark:text-slate-300',
																		'truncate text-xs',
																	]"
																	>{{ ticketType.desc }}</span
																>
															</div>
														</li>
													</ListboxOption>
												</ListboxOptions>
											</transition>
										</div>
									</Listbox>
									<p class="mt-1 text-sm text-slate-500">
										You are on the
										<span class="capitalize">{{ retainer.tier }}</span> tier
									</p>
								</div>
								<div class="sm:col-span-2">
									<Disclosure
										v-slot="{ open }"
										as="div"
										class="rounded-lg border border-gray-200 p-4 dark:border-slate-700 dark:bg-slate-800"
									>
										<div class="flex w-full justify-between">
											<div
												class="flex items-center text-sm dark:text-slate-100"
											>
												<ExclamationCircleIcon class="mr-4 h-5 w-5" />
												Expected response times are based on your plan's tier
											</div>
											<DisclosureButton
												class="flex rounded-lg text-left text-sm font-medium text-slate-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 dark:text-slate-100"
											>
												<svg
													v-if="!open"
													class="h-5 w-5"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M4.75 14.75V19.25H9.25"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M19.25 9.25V4.75H14.75"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M5 19L10.25 13.75"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M19 5L13.75 10.25"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path></svg
												><svg
													v-else
													class="h-5 w-5"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M10.25 18.25V13.75H5.75"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M13.75 5.75V10.25H18.25"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M4.75 19.25L10.25 13.75"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
													<path
														d="M19.25 4.75L13.75 10.25"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
												</svg>
											</DisclosureButton>
										</div>
										<transition
											enter-active-class="transition duration-200 ease-in-out"
											enter-from-class="transform -translate-y-4"
											enter-to-class="transform translate-y-0"
											leave-active-class="transition duration-100 ease-in-out"
											leave-from-class="transform translate-y-0"
											leave-to-class="transform -translate-y-4"
											><DisclosurePanel
												class="pt-4 text-sm text-gray-500 transition-all dark:text-slate-300"
											>
												Basic tier support is available within the community and
												officially by the team on a best efforts basis, though
												we cannot guarantee a response time. For a guaranteed
												response time we recommend upgrading to the Growth tier.
												Enhanced SLAs for support are available on our
												Enterprise Tier.
												<div class="mt-4 flex space-x-2">
													<NuxtLink
														to="/settings/billing"
														class="rounded-md border border-indigo-400 bg-indigo-600 px-3 py-1.5 text-xs text-white transition-all hover:bg-indigo-500 hover:shadow-sm"
													>
														Upgrade plan
													</NuxtLink>
													<a
														href="https://calendly.com/motis-group/intro"
														target="_blank"
														class="inline-flex items-center rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-800 shadow-sm transition-colors hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700"
													>
														<svg
															class="mr-1 h-4 w-4"
															fill="none"
															viewBox="0 0 24 24"
														>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M9.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V14.75"
															></path>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M19.25 9.25V4.75H14.75"
															></path>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="1.5"
																d="M19 5L11.75 12.25"
															></path>
														</svg>
														Enquire about Enterprise
													</a>
												</div>
											</DisclosurePanel></transition
										>
									</Disclosure>
								</div>
							</div>
							<div class="col-span-2 space-y-6 px-10">
								<div class="sm:col-span-2">
									<label
										for="name"
										class="block text-sm font-normal leading-6 text-gray-600 dark:text-slate-300"
										>Subject</label
									>
									<div class="mt-2.5">
										<input
											v-model="name"
											required
											type="text"
											name="text"
											id="name"
											placeholder="A brief summary of the project / issue"
											class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:placeholder:text-slate-400 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div class="sm:col-span-2">
									<div
										class="flex items-center justify-between text-sm text-slate-400"
									>
										<label
											for="message"
											class="block text-sm leading-6 text-gray-600 dark:text-slate-300"
											>Message</label
										>5000 character limit
									</div>

									<div class="mt-2.5">
										<textarea
											v-model="brief"
											required
											name="message"
											id="message"
											rows="4"
											max="5000"
											placeholder="Describe the issue you're facing, along with any relevant information. Please be as detailed and specific as possible."
											class="block w-full rounded-md border-0 px-3.5 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:placeholder:text-slate-400 sm:text-sm sm:leading-6"
										/>
									</div>
									<p
										:class="[
											brief === ''
												? 'mt-2 opacity-100 '
												: '-mb-6 -translate-y-3 opacity-0',
											'text-sm text-red-900 transition-all dark:text-red-500',
										]"
									>
										Please add a message about the issue that you're facing
									</p>
								</div>
								<div class="sm:col-span-2">
									<label
										for="desired-date"
										class="block text-sm leading-6 text-gray-600 dark:text-slate-300"
										>Desired deadline</label
									>
									<div class="relative mt-2 rounded-md shadow-sm">
										<input
											v-model="due_date"
											type="date"
											name="desired-date"
											id="desired-date"
											:min="format(addDays(new Date(), 7), 'yyyy-MM-dd')"
											class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="flex-shrink-0 border-t border-gray-200 px-10 py-5">
						<div class="flex justify-end space-x-3">
							<button
								type="button"
								class="rounded-md bg-white px-3 py-2 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800"
								@click="emit('close-modal')"
							>
								Cancel
							</button>
							<button
								type="submit"
								:disabled="loading"
								class="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{{ loading ? 'Loading' : 'Create' }}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

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
		ChevronUpDownIcon,
		ChevronUpIcon,
		ExclamationCircleIcon,
	} from '@heroicons/vue/20/solid';
	import { CheckIcon } from '@heroicons/vue/24/outline';
	const emit = defineEmits(['close-modal', 'ticket-submit']);
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const open = ref(true);
	const name = ref('');
	const brief = ref(null);
	const link = ref('');
	const type = ref('');
	const due_date = ref('');
	const ticketTypes = [
		{
			id: 'bug',
			title: 'Modify an existing automation',
			desc: 'Small-scale request such as an automation bug fix, small or straightforward change to an existing process',
		},
		{
			id: 'new',
			title: 'Create a new automation project',
			desc: 'You have a project recommendation, an idea, major process change request, or any other larger initiative.',
		},
		{
			id: 'dashboard_bug',
			title: 'Dashboard bug',
			desc: 'Issues with Motis dashboard',
		},
		{
			id: 'performance_issues',
			title: 'Perfomance issues',
			desc: 'Reporting of performance issues is only available on the Enterprise tier',
		},
		{
			id: 'sales_inquiry',
			title: 'Sales enquiry',
			desc: 'Questions about pricing, paid plans and Enterprise plans.',
		},
		{
			id: 'billing',
			title: 'Billing',
			desc: 'Issues with credit card charges | invoices | overcharging',
		},
		{
			id: 'abuse',
			title: 'Abuse report',
			desc: 'Report abuse of a Motis project or Motis brand',
		},
	];
	const selectedTicket = ref(ticketTypes[0]);
	const loading = ref(false);
	const error_occurred = ref(false);
	const route = useRoute();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,type,Subscription(*))`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const accountId =
		User.Account.type === 'super_admin' ? route.params.team : User.Account.id;
	const teamId =
		User.Account.type === 'super_admin'
			? User.defaultTeamId
			: route.params.team;

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

		const { data, error } = await supabase.from('Ticket').insert([
			{
				name: body.name,
				type: selectedTicket.value.id,
				status: 'backlog',
				createdBy: user.value.id,
				dueDate: due_date.value,
				accountId: accountId,
				teamId: teamId,
				desc: body.brief + (link.value ? `\n [Video link](${link.value})` : ''),
			},
		]);

		emit('ticket-submit');
		emit('close-modal');
		name.value = '';
		brief.value = '';
		link.value = '';
		type.value = '';
		loading.value = false;
	};

	// Fetch User data

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');
</script>
