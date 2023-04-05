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
			<!-- Billing history -->
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
													Date
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
												>
													Reference Number
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
												>
													Amount
												</th>
												<th
													scope="col"
													class="px-6 py-3 text-left text-sm font-normal uppercase text-gray-900 dark:text-slate-400"
												>
													Receipt
												</th>
												<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
											</tr>
											<tr class="px-6" v-if="payments.length === 0">
												<th colspan="4" class="py-24 text-slate-300 font-normal text-sm">No invoices</th>
											</tr>
										</thead>

										<tbody
											class="divide-y divide-gray-200 bg-white dark:bg-transparent"
										>
											<tr v-for="payment in payments" :key="payment.id">
												<td
													class="whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-900 dark:text-white"
												>
													<span>{{
														format(
															new Date(payment.created * 1000),
															'MMM dd, yyyy'
														)
													}}</span>
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-slate-200"
												>
													{{ payment.number }}
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-slate-200"
												>
													${{ (payment.amount_due / 100).toLocaleString() }}
												</td>
												<td
													class="whitespace-nowrap px-6 py-4 text-sm font-medium"
												>
													<a
														:href="payment.hosted_invoice_url"
														target="_blank"
														class="text-indigo-600 hover:text-indigo-900"
														>View receipt</a
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

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(`systemRole,Account(stripeCustomerId)`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const { data: payments } = await $fetch(
		`/api/stripe/invoices/${User.Account.stripeCustomerId}`
	);
</script>
