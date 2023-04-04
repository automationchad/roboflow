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
												<tr class="px-6" v-if="docs.length === 0">
													<th
														colspan="4"
														class="py-24 text-sm font-normal text-slate-300"
													>
														No docs
													</th>
												</tr>
											</thead>

											<tbody
												class="divide-y divide-slate-200 bg-slate-50 dark:bg-transparent"
											>
												<tr v-for="doc in docs" :key="doc">
													<td
														class="flex items-center whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-900 dark:text-white"
													>
														<span
															><button
																class="flex items-center hover:underline"
																@click="getUrl(User.accountId, doc.name)"
															>
																{{ doc.name.split('.')[0]
																}}<ArrowUpOnSquareIcon class="ml-1 h-4 w-4" /></button
														></span>
													</td>
													<td
														class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500 dark:text-slate-200"
													>
														{{
															format(new Date(doc.updated_at), 'MMM dd, yyyy') +
															' at ' +
															format(new Date(doc.updated_at), 'hh:mm')
														}}
													</td>
													<td
														class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500 dark:text-slate-200"
													>
														<span
															class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-900 ring-1 ring-indigo-300"
														>
															{{ doc.metadata.mimetype }}
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
		ArrowUpOnSquareIcon,
		ExclamationTriangleIcon,
		CogIcon,
		CreditCardIcon,
		SparklesIcon,
		KeyIcon,
		LinkIcon,
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
		.select('accountId')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const { data: docs } = await supabase.storage
		.from('files')
		.list(`client_files/${User.accountId}`, {
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});

	const getUrl = async (account_id, doc_name) => {
		const { data, error } = await supabase.storage
			.from('files')
			.createSignedUrl(`/client_files/${account_id}/${doc_name}`, 120);
		window.open(data.signedUrl, '_blank').focus();
	};
</script>
