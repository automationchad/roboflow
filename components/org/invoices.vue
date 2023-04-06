<template>
	<div class="">
		<warning-access :role="User.systemRole" />
		<div class="mt-8 space-y-6 lg:px-0">
			<loading-spinner v-if="state.loading" />
			<!-- Billing history -->
			<section aria-labelledby="billing-history-heading" v-else>
				<div class="sm:overflow-hidden">
					<div class="">
						<h2
							id="billing-history-heading"
							class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
						>
							Invoices
						</h2>
					</div>
					<div class="mt-6 flex flex-col bg-white dark:bg-slate-800">
						<div class="overflow-x-auto">
							<div class="inline-block min-w-full pt-2 align-middle">
								<div class="overflow-hidden">
									<table
										class="min-w-full divide-y divide-gray-200 dark:divide-slate-600"
									>
										<thead class="bg-gray-50 dark:bg-transparent">
											<tr class="border-b border-slate-600">
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Date
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Reference Number
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Amount
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Receipt
												</th>
												<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
											</tr>
											<tr class="px-6" v-if="state.invoices.length === 0">
												<th
													colspan="4"
													class="py-24 text-sm font-normal text-slate-300"
												>
													No invoices
												</th>
											</tr>
										</thead>

										<tbody
											class="divide-y divide-gray-200 bg-white dark:divide-slate-700 dark:bg-transparent"
										>
											<tr v-for="invoice in state.invoices" :key="invoice.id">
												<td
													class="whitespace-nowrap px-6 py-2 text-sm font-normal text-gray-900 dark:text-white"
												>
													<span>{{
														format(
															new Date(invoice.created * 1000),
															'MMM dd, yyyy'
														)
													}}</span>
												</td>
												<td
													class="whitespace-nowrap px-6 py-2 font-mono text-sm text-gray-500 dark:text-slate-200"
												>
													{{ invoice.number }}
												</td>
												<td
													class="whitespace-nowrap px-6 py-2 text-sm text-gray-500 dark:text-slate-200"
												>
													${{ (invoice.amount_due / 100).toLocaleString() }}
												</td>
												<td
													class="whitespace-nowrap px-6 py-2 text-sm font-medium"
												>
													<a
														:href="invoice.hosted_invoice_url"
														target="_blank"
														class="text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200 flex items-center hover:text-indigo-900"
														>Receipt<svg
															class="h-4 w-4 ml-1"
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
													</a>
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
</template>

<script setup>
	import { reactive, onMounted, ref } from 'vue';
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

	const state = reactive({
		invoices: [],
		loading: true,
	});

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(`systemRole,Account(stripeCustomerId)`)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const fetchData = async () => {
		const { data } = await $fetch(
			`/api/stripe/invoices/${User.Account.stripeCustomerId}`
		);
		return data;
	};

	onMounted(async () => {
		state.invoices = await fetchData();
		state.loading = false;
	});
</script>
