<script setup>
	import { format } from 'date-fns';
	definePageMeta({
		middleware: 'auth',
	});
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();
	const loading = ref(true);
	const username = ref('');
	const allAccess = ref(false);
	const templates = ref([]);
	const charges = ref([]);

	if (user.value) {
		let { data } = await supabase
			.from('profiles')
			.select(
				`username,
	   			workspaces (
	     					id, stripe_customer_id)`
			)
			.eq('id', user.value.id)

			.single();

		if (data) {
			username.value = data.username;
			const charges_result = await $fetch(
				`/api/charges/${data.workspaces.stripe_customer_id}`
			);
			console.log(charges_result);
			charges.value = charges_result;
		}
		loading.value = false;
	}
	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
	});
</script>

<template>
	<div>
		<div class="relative pb-24 dark:bg-[#0A101E]">
			<div
				class="mx-auto max-w-[40rem] space-y-16 divide-y divide-slate-100 pt-20 dark:divide-slate-800"
			>
				<section class="px-4 sm:px-6 lg:px-8">
					<div
						class="flex items-center text-base font-semibold leading-7 text-slate-900"
					>
						<svg
							class="h-8 w-8 flex-none"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16 29.25c7.318 0 13.25-5.932 13.25-13.25S23.318 2.75 16 2.75 2.75 8.682 2.75 16 8.682 29.25 16 29.25Z"
								class="fill-white dark:fill-slate-800"
								stroke="#0EA5E9"
								stroke-width="1.5"
							></path>
							<path
								class="fill-white dark:fill-slate-700"
								d="M8.75 12.75a3 3 0 0 1 3-3h8.5a3 3 0 0 1 3 3v6.5a3 3 0 0 1-3 3h-8.5a3 3 0 0 1-3-3v-6.5Z"
								stroke="#0EA5E9"
								stroke-width="1.5"
							></path>
							<path
								d="M10.28 10.22a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm12.5 1.06a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm-13.56 0 4.835 4.836 1.061-1.06-4.836-4.836-1.06 1.06Zm12.5-1.06-4.836 4.835 1.06 1.061 4.836-4.836-1.06-1.06Zm-7.664 5.896a2.75 2.75 0 0 0 3.889 0l-1.061-1.06a1.25 1.25 0 0 1-1.768 0l-1.06 1.06Z"
								fill="#0EA5E9"
							></path>
						</svg>
						<h2 class="ml-4 dark:text-white">Email address</h2>
					</div>
					<div
						class="prose prose-sm prose-slate mt-3 max-w-none prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:prose-invert"
					>
						<p>
							Update your email address associated with your account. This email
							is not associated with billing. If you want to update your company
							billing address, contact
							<a href="mailto:support@motis.group">support@motis.group</a>.
						</p>
					</div>
					<form action="/account-settings/email" class="mt-8">
						<div class="">
							<input
								v-model="username"
								type="email"
								id="email"
								class="mt-2 block h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:text-sm"
								required=""
							/>
						</div>
						<div
							class="mt-4 sm:flex sm:items-center sm:space-x-4 sm:space-x-reverse"
						>
							<button
								type="submit"
								class="inline-flex justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
							>
								<span>Update email</span>
							</button>
						</div>
					</form>
				</section>

				<section class="px-4 pt-16 sm:px-6 lg:px-8">
					<div
						class="flex items-center text-base font-semibold leading-7 text-slate-900"
					>
						<svg
							class="h-8 w-8 flex-none"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
							class="fill-[#F0F9FF] dark:fill-slate-800"
								d="M16 29.25c7.318 0 13.25-5.932 13.25-13.25S23.318 2.75 16 2.75 2.75 8.682 2.75 16 8.682 29.25 16 29.25Z"
								
								stroke="#0EA5E9"
								stroke-width="1.5"
							></path>
							<circle cx="16" cy="16" r="7" class="fill-white dark:fill-slate-700"></circle>
							<path
								d="M9.707 13a7.251 7.251 0 0 1 13.852 3 7.25 7.25 0 0 1-13.298 4"
								stroke="#0EA5E9"
								stroke-width="1.5"
								stroke-linecap="round"
							></path>
							<path
								d="m12.867 12.28-3.28.74-.393-3.34M15.75 12.75v3.5l2.5 2"
								stroke="#0EA5E9"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</svg>
						<h2 class="ml-4 dark:text-white">Purchase history</h2>
					</div>
					<div
						class="prose prose-sm prose-slate mt-3 max-w-none prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:prose-invert"
					>
						<p>
							To create a more detailed invoice with any extra information you
							need to include for your own accounting purposes, click the "View
							Receipt" link, and then select the "Edit business address" option.
						</p>
					</div>
					<table
						class="mt-8 w-full rounded-lg bg-white text-sm leading-6 shadow ring-1 ring-gray-900/5 dark:bg-slate-800 dark:ring-gray-100/10"
					>
						<caption class="sr-only">
							Purchase history
						</caption>
						<thead
							class="border-b border-slate-200 text-left text-slate-900 dark:border-slate-700"
						>
							<tr>
								<th class="w-0 py-3 pl-4 font-semibold dark:text-white sm:pl-6">
									Date
								</th>
								<th class="w-full py-3 pl-6 font-semibold dark:text-white">
									Status
								</th>
								<th
									class="hidden w-0 py-3 pl-6 text-right font-semibold dark:text-white sm:table-cell"
								>
									Price
								</th>
								<th class="w-0 py-3 pl-6 pr-4 sm:pr-6">
									<span class="sr-only">Receipt</span>
								</th>
							</tr>
						</thead>
						<tbody class="whitespace-nowrap">
							<tr
								v-for="charge in charges.data"
								:key="charge"
								class="border-t border-slate-200 first:border-0 dark:border-slate-700"
							>
								<td
									class="py-3 pl-4 align-top text-slate-600 dark:text-slate-500 sm:pl-6"
								>
									{{ format(new Date(charge.created * 1000), 'yyyy-MM-dd') }}
								</td>
								<td class="max-w-0 py-3 pl-6 text-slate-900 dark:text-white">
									<div class="flex items-center truncate">
										<div class="">
											{{
												charge.description ? charge.description : 'Blueprint'
											}}
										</div>

										<div class="ml-1 text-xs">
											<div
												v-if="charge.status && !charge.refunded"
												class="flex items-center rounded-lg bg-lime-200 px-2 capitalize text-lime-700"
											>
												{{ charge.status
												}}<svg
													class="h-4 w-4"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M7.75 12.75L10 15.25L16.25 8.75"
														stroke="currentColor"
														stroke-width="1.5"
														stroke-linecap="round"
														stroke-linejoin="round"
													></path>
												</svg>
											</div>
											<div
												v-else-if="charge.refunded"
												class="flex items-center rounded-lg bg-gray-200 px-2 capitalize text-gray-700"
											>
												{{ 'Refunded'
												}}<svg class="h-3 w-3" fill="none" viewBox="0 0 24 24">
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M9.25 4.75L4.75 9L9.25 13.25"
													></path>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M5.5 9H15.25C17.4591 9 19.25 10.7909 19.25 13V19.25"
													></path>
												</svg>
											</div>
											<div
												v-else
												class="rounded-lg bg-gray-200 px-2 capitalize text-gray-700"
											>
												{{ 'Failed' }}
											</div>
										</div>
									</div>
									<div class="font-semibold sm:hidden">
										${{ charge.amount / 100 }}
									</div>
								</td>
								<td
									class="hidden py-3 pl-6 text-right font-semibold tabular-nums text-slate-900 dark:text-white sm:table-cell"
								>
									<span class=""
										>${{ (charge.amount / 100).toLocaleString() }}</span
									>
								</td>
								<td class="py-3 pl-6 pr-4 align-top sm:pr-6">
									<a
										:href="charge.receipt_url"
										target="_blank"
										class="font-semibold text-sky-500 hover:text-sky-600"
									>
										Receipt
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
		</div>
	</div>
</template>
