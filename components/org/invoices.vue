<template>
	<div class="">
		<div class="mt-8 space-y-6 lg:px-0">
			<loading-spinner v-if="state.loading" />
			<!-- Billing history -->
			<section aria-labelledby="billing-history-heading" v-else>
				<div class="sm:overflow-hidden">
					<div
						class="flex max-w-4xl flex-col rounded border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
					>
						<div class="overflow-x-auto">
							<div class="inline-block min-w-full pt-2 align-middle">
								<div class="overflow-hidden">
									<table class="w-full">
										<thead class="bg-gray-50 dark:bg-transparent">
											<tr class="border-b border-slate-800">
												<th
													scope="col"
													class="w-1/5 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Date
												</th>
												<th
													scope="col"
													class="w-1/5 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Invoice number
												</th>
												<th
													scope="col"
													class="w-1/5 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Amount due
												</th>
												<th
													scope="col"
													class="w-1/5 px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
												>
													Status
												</th>
												<th
													scope="col"
													class="w-1/5 px-6 py-3 text-right text-sm font-medium text-gray-900 dark:text-slate-400"
												></th>
											</tr>
										</thead>

										<tbody
											class="divide-y divide-gray-200 bg-white dark:divide-slate-800 dark:bg-transparent"
										>
											<tr v-for="invoice in invoices" :key="invoice.id">
												<td
													class="whitespace-nowrap px-6 py-3 text-sm font-normal text-gray-900 dark:text-white"
												>
													<div class="flex items-center">
														{{
															format(
																new Date(
																	(invoice.due_date
																		? invoice.due_date
																		: invoice.created) * 1000
																),
																'dd/MM/yyyy, HH:mm:ss'
															)
														}}
														<div
															v-if="
																invoice.due_date >
																	new Date().getTime() / 1000 &&
																invoice.status !== 'void' &&
																invoice.status !== 'paid'
															"
															class="ml-3 flex items-center text-xs text-rose-600"
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																class="mr-0.5 h-4 w-4"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M19.25 9.25v-.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h2.5m5.75-5.5V15l1.25 1.25M8 4.75v3.5m8-3.5v3.5m-1 11a4.25 4.25 0 1 1 0-8.5 4.25 4.25 0 0 1 0 8.5Z"
																></path>
															</svg>

															{{
																formatDistance(
																	invoice.due_date * 1000,
																	new Date()
																)
															}}
														</div>
														<div
															v-else-if="
																invoice.due_date <= new Date().getTime() &&
																invoice.status !== 'void' &&
																invoice.status !== 'paid'
															"
															class="ml-3 flex items-center text-xs text-rose-600"
														>
															<svg
																class="mr-0.5 h-4 w-4"
																viewBox="0 0 24 24"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M5.25 4.75L4.75 5.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M12 8.75V12L14.25 14.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M19.1295 13.3166C18.4024 17.2541 14.621 19.8566 10.6835 19.1295C6.746 18.4024 4.14348 14.621 4.8706 10.6835C5.59772 6.746 9.37914 4.14348 13.3166 4.8706"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M7 18L5.75 19.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M17 18L18.25 19.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M18 4.75V7.25"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
																<path
																	d="M18.5 10C18.5 10.2761 18.2761 10.5 18 10.5C17.7239 10.5 17.5 10.2761 17.5 10C17.5 9.72386 17.7239 9.5 18 9.5C18.2761 9.5 18.5 9.72386 18.5 10Z"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																></path>
															</svg>

															{{
																formatDistance(
																	invoice.due_date * 1000,
																	new Date()
																)
															}}
															overdue
														</div>
													</div>
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
													class="whitespace-nowrap px-6 py-2 text-xs text-gray-500 dark:text-slate-200"
												>
													<span
														:class="[
															styles[invoice.status],
															'rounded-full px-2 capitalize ring-1 ',
														]"
														>{{ invoice.status }}</span
													>
												</td>
												<td
													class="whitespace-nowrap px-6 py-2 text-right text-sm font-medium"
												>
													<a
														v-if="invoice.invoice_pdf"
														:href="invoice.invoice_pdf"
														download
														class="flex items-center justify-end text-indigo-600 hover:text-indigo-900 dark:text-indigo-100 dark:hover:text-indigo-50"
														><div
															class="rounded border border-indigo-400 bg-indigo-100 dark:bg-indigo-600"
														>
															<svg
																class="h-5 w-5"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M4.75 14.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V14.75"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M12 14.25L12 4.75"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M8.75 10.75L12 14.25L15.25 10.75"
																></path>
															</svg>
														</div>
													</a>
												</td>
											</tr>
											<tr class="" v-if="invoices.length === 0 && !loading">
												<td
													class="col-span-6 p-3 py-12 text-center"
													colspan="6"
												>
													<p class="text-scale-1000">
														No payouts for this organization yet
													</p>
												</td>
											</tr>
											<tr class="" v-else>
												<td
													class="col-span-6 p-3 py-12 text-center"
													colspan="6"
												>
													<p
														class="text-scale-1000 flex items-center justify-center"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															class="mr-2 h-4 w-4 animate-spin"
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
														Checking for payouts
													</p>
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

	import { format, formatDistance } from 'date-fns';

	const invoices = ref([]);

	const loading = ref(true);

	const route = useRoute();

	const supabase = useSupabaseClient();

	let { data: accountData, error: accountError } = await supabase
		.from('clients')
		.select(`id, stripe_customer_id`)
		.eq('id', route.params.client_id)
		.limit(1)
		.single();

	const styles = {
		uncollectible:
			'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		paid: 'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		open: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		void: 'bg-purple-100 dark:bg-purple-700 dark:ring-purple-500 ring-purple-300  text-purple-900 dark:text-purple-200',
	};
	const getInvoices = async () => {
		const { data } = await $fetch(
			`/api/stripe/invoices/${accountData.stripe_customer_id}`
		);
		return data;
	};

	const getData = async () => {
		invoices.value = await getInvoices();
		loading.value = false;
	};

	getData();
</script>
