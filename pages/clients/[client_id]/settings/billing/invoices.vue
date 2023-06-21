<script setup>
	definePageMeta({ layout: 'client-settings', middleware: ['auth'] });

	import { reactive, onMounted, ref } from 'vue';

	import { format, formatDistance } from 'date-fns';

	const invoices = ref([]);

	const loading = ref(true);

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const styles = {
		uncollectible:
			'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		paid: 'bg-green-100 dark:bg-green-700 dark:ring-green-500 ring-green-300 text-green-900 dark:text-green-200',
		open: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		void: 'bg-purple-100 dark:bg-purple-700 dark:ring-purple-500 ring-purple-300  text-purple-900 dark:text-purple-200',
	};

	const getInvoices = async () => {
		let { data: accountData, error: accountError } = await supabase
			.from('clients')
			.select(`id, stripe_customer_id`)
			.eq('id', route.params.client_id)
			.limit(1)
			.single();

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

<template>
	<main class="flex-1 overflow-y-auto" style="max-height: 100vh">
		<div class="content h-full w-full overflow-y-auto">
			<div class="mx-auto w-full">
				<div class="container max-w-4xl space-y-8 p-4">
					<div class="space-y-2">
						<h4 class="text-lg">Invoices</h4>
						<div class="text-scale-1000 text-sm">
							To manage your billing address, emails or Tax ID, head to your
							<a href="/org/gujvascqmaqhbcsazlwd/billing"
								><span
									class="hover:text-green-1000 text-sm text-green-900 transition"
									>organization settings</span
								>.</a
							>
						</div>
						<div class="container my-4 max-w-4xl space-y-1">
							<div class="relative">
								<div class="transition-opacity duration-300">
									<div class="table-container">
										<table class="table">
											<thead>
												<tr>
													<th class="p-3 px-4 text-left"></th>
													<th class="p-3 px-4 text-left">Date</th>
													<th class="p-3 px-4 text-left">Amount due</th>
													<th class="p-3 px-4 text-left">Invoice number</th>
													<th class="flex items-center p-3 px-4 text-left">
														Status
													</th>
													<th class="p-3 px-4 text-left text-right"></th>
												</tr>
											</thead>
											<tbody>
												<tr
													class=""
													v-for="invoice in invoices"
													:key="invoice.id"
												>
													<td>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															class="sbui-icon"
														>
															<path
																d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
															></path>
															<polyline points="14 2 14 8 20 8"></polyline>
															<line x1="16" y1="13" x2="8" y2="13"></line>
															<line x1="16" y1="17" x2="8" y2="17"></line>
															<polyline points="10 9 9 9 8 9"></polyline>
														</svg>
													</td>
													<td>
														<p>
															{{
																format(
																	new Date(invoice.created * 1000),
																	'dd/LL/yyyy, HH:mm:ss'
																)
															}}
														</p>
													</td>
													<td>
														<p>
															${{
																formatAccounting(
																	invoice.amount_paid / 100,
																	false
																)
															}}
														</p>
													</td>
													<td>
														<p>{{ invoice.number }}</p>
													</td>
													<td>
														<button data-state="closed">
															<span
																:class="[
																	styles[invoice.status],
																	'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset',
																]"
																>{{ invoice.status }}</span
															>
														</button>
													</td>
													<td class="align-right">
														<div
															class="flex items-center justify-end space-x-2"
														>
															<a
																:href="invoice.hosted_invoice_url"
																target="_blank"
																class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																type="button"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="16"
																	height="16"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-width="1.5"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon"
																>
																	<path
																		d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
																	></path>
																	<polyline
																		points="7 10 12 15 17 10"
																	></polyline>
																	<line x1="12" y1="15" x2="12" y2="3"></line>
																</svg>
															</a>
														</div>
													</td>
												</tr>

												<tr class="" v-if="invoices.length > 0 && !loading">
													<td colspan="6">
														<div class="flex items-center justify-between">
															<p class="text-sm opacity-50">
																Showing 1 to
																{{
																	invoices.length < 10 ? invoices.length : 10
																}}
																out of {{ invoices.length }} invoices
															</p>
															<div class="flex items-center space-x-2">
																<button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																	disabled=""
																	type="button"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="14"
																		height="14"
																		viewBox="0 0 24 24"
																		fill="none"
																		stroke="currentColor"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		class="sbui-icon"
																	>
																		<polyline
																			points="15 18 9 12 15 6"
																		></polyline>
																	</svg></button
																><button
																	class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																	type="button"
																>
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="14"
																		height="14"
																		viewBox="0 0 24 24"
																		fill="none"
																		stroke="currentColor"
																		stroke-linecap="round"
																		stroke-linejoin="round"
																		class="sbui-icon"
																	>
																		<polyline
																			points="9 18 15 12 9 6"
																		></polyline>
																	</svg>
																</button>
															</div>
														</div>
													</td>
												</tr>
												<tr class="" v-else-if="invoices.length === 0 && !loading">
													<td
														class="col-span-6 p-3 py-12 text-center"
														colspan="6"
													>
														<p class="text-scale-1000">
															No invoices for this client yet
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
															Checking for invoices
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
				</div>
			</div>
		</div>
	</main>
</template>
