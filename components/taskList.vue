<template>
	<div class="">
		<div class="space-y-6 lg:px-0">
			<!-- Workflows -->
			<!-- <div class="flex items-center justify-end">
				<a
					:href="`/${User.Account.id}/tickets/${User.defaultTeamId}`"
					class="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white"
				>
					New Workflow
				</a>
			</div> -->
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
														class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
													>
														Name
													</th>
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
													>
														Updated
													</th>
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
													>
														Type
													</th>

													<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
												</tr>
												<tr
													class="px-6"
													v-if="
														workflows.filter((obj) => {
															const name = obj.name.toLowerCase();
															return name.includes(search_term.toLowerCase());
														}).length === 0
													"
												>
													<th
														colspan="4"
														class="py-24 text-sm font-normal text-slate-300"
													>
														No tickets
													</th>
												</tr>
											</thead>

											<tbody
												class="divide-y divide-slate-200 bg-slate-50 dark:bg-transparent"
											>
												<tr
													v-for="workflow in workflows.filter((obj) => {
														const name = obj.name.toLowerCase();
														return name.includes(search_term.toLowerCase());
													})"
													:key="workflow.id"
												>
													<td
														class="flex items-center whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-900 dark:text-white"
													>
														<span
															><a
																:href="`/${User.Account.id}/tickets/${workflow.id}`"
																>{{ workflow.name }}</a
															></span
														>
													</td>
													<td
														class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500 dark:text-slate-200"
													>
														{{
															format(
																new Date(workflow.updatedOn),
																'MMM dd, yyyy'
															) +
															' at ' +
															format(new Date(workflow.updatedOn), 'hh:mm')
														}}
													</td>
													<td
														class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500 dark:text-slate-200"
													>
														<span
															class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
														>
															<svg
																class="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
																fill="currentColor"
																viewBox="0 0 8 8"
															>
																<circle cx="4" cy="4" r="3" />
															</svg>
															{{ workflow.type }}
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
				<section aria-labelledby="billing-history-heading" v-if="false">
					<div class="bg-white p-6 dark:bg-slate-800 sm:overflow-hidden">
						<div class="">
							<h2
								id="billing-history-heading"
								class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
							>
								Invoices
							</h2>
						</div>
						<div class="mt-6 flex flex-col">
							<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div class="inline-block min-w-full py-2 align-middle">
									<div class="overflow-hidden">
										<table
											class="min-w-full divide-y divide-gray-200 dark:divide-slate-600"
										>
											<thead class="bg-gray-50 dark:bg-transparent">
												<tr class="border-b border-slate-600">
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
													>
														Workflow
													</th>
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
													>
														Updated
													</th>
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
													>
														Tasks
													</th>

													<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
												</tr>
												<tr class="px-6" v-if="workflows.length === 0">
													<th
														colspan="4"
														class="py-24 text-sm font-normal text-slate-300"
													>
														No workflows
													</th>
												</tr>
											</thead>

											<tbody
												class="divide-y divide-gray-200 bg-white dark:bg-transparent"
											>
												<tr v-for="workflow in workflows" :key="workflow.id">
													<td
														class="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-900 dark:text-white"
													>
														<span>{{ workflow.name }}</span>
													</td>
													<td
														class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-slate-200"
													>
														{{
															format(
																new Date(workflow.lastModified),
																'MMM dd, yyyy'
															) +
															' at ' +
															format(new Date(workflow.lastModified), 'hh:mm')
														}}
													</td>
													<td
														class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-slate-200"
													>
														<span
															class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800"
														>
															<svg
																class="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
																fill="currentColor"
																viewBox="0 0 8 8"
															>
																<circle cx="4" cy="4" r="3" />
															</svg>
															{{ abbreviatedNumber(10000) }}
														</span>
													</td>
													<td
														class="whitespace-nowrap px-6 py-4 text-sm font-medium"
													>
														<a
															:href="workflow.hosted_invoice_url"
															target="_blank"
															class="text-indigo-600 hover:text-indigo-900"
															>Docs</a
														>
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

	const abbreviatedNumber = (number) => {
		const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
		const tier = (Math.log10(Math.abs(number)) / 3) | 0;
		if (tier === 0) {
			return number;
		}
		const suffix = SI_SYMBOL[tier];
		const scale = 10 ** (tier * 3);
		const scaled = number / scale;
		const length = scaled.toFixed(1).toString();
		const precision = length > 3 ? 0 : 1;
		return scaled.toFixed(precision) + suffix;
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
		     id,
			 Ticket (
			*
		 ),
			 billingEmail,
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

	const search_term = ref('');

	const { data } = await $fetch(
		`/api/workflows/${User.Account.trayWorkspaceId}`
	);
	let workflows = [];
	if (data.viewer) {
		workflows = User.Account.Ticket;
	}
</script>
