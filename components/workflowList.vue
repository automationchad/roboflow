<template>
	<div class="">
		<div
			class="mt-4 rounded-md bg-red-50 p-4"
			v-if="User.systemRole !== 'owner' && User.systemRole !== 'super_admin'"
		>
			<div class="flex">
				<div class="flex-shrink-0">
					<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-red-800">
						You currently don't have access to change billing details
					</h3>

					<span class="mt-2 text-sm text-red-700">
						Contact an owner to request these changes.
					</span>
				</div>
			</div>
		</div>
		<div class="mt-4 space-y-6 lg:px-0">
			<!-- Workflows -->
			<div class="flex items-center justify-end">
				<button class="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white">
					New Workflow
				</button>
			</div>
			<div class="grid grid-cols-2 gap-8">
				<section>
					<div class="bg-white p-6 dark:bg-slate-800 sm:overflow-hidden">
						<div class="-mx-6">
							<div class="relative mt-2 flex items-center">
								<div
									class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
								>
									<MagnifyingGlassIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</div>
								<input
									v-model="search_term"
									type="text"
									name="search"
									id="search"
									class="block w-full rounded-md border-0 py-1.5 pr-14 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
									<kbd
										class="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400"
										>⌘K</kbd
									>
								</div>
							</div>
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
														No workflows
													</th>
												</tr>
											</thead>

											<tbody
												class="divide-y divide-gray-200 bg-white dark:bg-transparent"
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
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 140 140"
															class="mr-1 h-4 w-4 flex-none text-slate-400"
														>
															<g id="Artwork_2">
																<path
																	fill="currentColor"
																	d="M97.57,.02c-21.35,.62-38.8,19.3-38.8,40.66v6.32h20v-6.76c0-10.45,7.91-19.48,18.34-20.19,12.7-.87,23.08,10.57,20.71,23.72-1.72,9.49-10.24,16.23-19.88,16.23H40.24c-18.2,0-36.34,14.54-39.56,32.46-4.57,25.41,14.53,47.54,38.71,47.54h7.38v-20h-7.04c-10.41,0-19.43-7.77-20.38-18.13-1.08-11.86,8.27-21.87,19.91-21.87h19.5v60h20v-60h19.32c21.37,0,40.04-17.45,40.66-38.8C139.42,18.16,120.61-.66,97.57,.02Z"
																/>
															</g>
														</svg>
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
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section aria-labelledby="billing-history-heading">
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

	const { data: payments } = await $fetch(
		`/api/stripe/invoices/${User.Account.stripeCustomerId}`
	);

	const { data } = await $fetch(
		`/api/workflows/${User.Account.trayWorkspaceId}`
	);
	let workflows = [];
	if (data.viewer) {
		workflows = data?.viewer?.workspaceWorkflows?.edges?.map((o) => o.node);
	}
</script>
