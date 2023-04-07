<template>
	<div class="">
		<div class="space-y-6 lg:px-0">
			<div class="grid grid-cols-1 gap-8">
				<section>
					<div class="p-6 dark:bg-slate-800 sm:overflow-hidden">
						<div class="flex flex-col">
							<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div class="inline-block min-w-full py-2 align-middle">
									<div class="overflow-hidden">
										<table
											class="min-w-full divide-y divide-gray-200 dark:divide-slate-600"
										>
											<thead class="bg-slate-50 dark:bg-transparent">
												<tr class="border-b border-slate-400">
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-medium  text-gray-900 dark:text-slate-400"
													>
														Name
													</th>
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-medium  text-gray-900 dark:text-slate-400"
													>
														Updated
													</th>
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-medium  text-gray-900 dark:text-slate-400"
													>
														Type
													</th>

													<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
												</tr>
												<tr class="px-6" v-if="tickets.length === 0">
													<th
														colspan="4"
														class="py-24 text-sm font-normal text-slate-300"
													>
														No tickets
													</th>
												</tr>
											</thead>

											<tbody
												class="divide-y divide-slate-200 dark:divide-slate-700 bg-slate-50 dark:bg-transparent"
											>
												<tr v-for="ticket in tickets" :key="ticket.id">
													<td
														class="flex items-center whitespace-nowrap px-6 py-2 text-sm font-normal text-gray-900 dark:text-white"
													>
														<span
															><a
																class="hover:underline"
																:href="`/${User.defaultTeamId}/tickets/${ticket.id}`"
																>{{ ticket.name }}</a
															></span
														>
													</td>
													<td
														class="whitespace-nowrap px-6 py-2 text-left text-sm text-gray-500 dark:text-slate-200"
													>
														{{
															format(
																new Date(ticket.updatedOn),
																'MMM dd, yyyy'
															) +
															' at ' +
															format(new Date(ticket.updatedOn), 'hh:mm')
														}}
													</td>
													<td
														class="whitespace-nowrap px-6 py-2 text-left text-sm text-gray-500 dark:text-slate-200"
													>
														<span
															v-if="ticket.type === 'bug'"
															class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium capitalize text-purple-900 ring-1 ring-purple-300"
														>
															<BugAntIcon
																class="mr-1 h-4 w-4 text-purple-500"
															/>

															{{ ticket.type }}
														</span>
														<span
															v-else
															class="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium capitalize text-sky-900 ring-1 ring-sky-300"
														>
															<SparklesIcon class="mr-1 h-4 w-4 text-sky-500" />
															{{ ticket.type }}
														</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
	} from '@headlessui/vue';
	import {
		MagnifyingGlassIcon,
		QuestionMarkCircleIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	import {
		Bars3Icon,
		BellIcon,
		BugAntIcon,
		ExclamationTriangleIcon,
		CogIcon,
		CreditCardIcon,
		SparklesIcon,
		KeyIcon,
		SquaresPlusIcon,
		UserCircleIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format } from 'date-fns';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();


	const search_term = ref('');

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
		     id,
			 type,
			 Ticket (
			*
		 ),
			 stripeCustomerId,
			 trayWorkspaceId,
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

	let { data: Ticket, error } = await supabase.from('Ticket').select('*');

	let tickets =
		User.Account.type === 'super_admin'
			? Ticket.sort((a, b) => b['priority'] - a['priority'])
			: User.Account.Ticket;
</script>
