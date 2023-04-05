<template>
	<div class="">
		<div class="space-y-6 lg:px-0">
			<!-- Workflows -->

			<div class="grid grid-cols-1 gap-8">
				<section>
					<div class="p-6 dark:bg-slate-800 sm:overflow-hidden">
						<div class="flex flex-col">
							<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div class="inline-block min-w-full py-2 align-middle">
									<div class="max-h-[300px] overflow-y-auto">
										<table class="min-w-full table-auto divide-y">
											<thead
												class="sticky top-0 border-b border-slate-600 bg-gray-50 dark:bg-slate-800"
											>
												<tr class="">
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
														Desc
													</th>
												</tr>
											</thead>
											<tbody v-if="state.loading">
												<tr class="px-6">
													<th
														colspan="4"
														class="py-36 text-center text-sm font-normal"
													>
														<loading-icon />
													</th>
												</tr>
											</tbody>

											<tbody
												v-else
												class="divide-y divide-gray-200 dark:bg-transparent"
											>
												<tr
													class="px-6"
													v-if="!state.loading && state.data.length === 0"
												>
													<th
														colspan="4"
														class="py-24 text-sm font-normal text-slate-300"
													>
														No workflows
													</th>
												</tr>
												<tr v-for="workflow in state.data" :key="workflow.id">
													<td
														class="flex items-center whitespace-nowrap px-6 py-4 text-sm font-normal text-gray-900 dark:text-white"
													>
														<span
															class="max-w-[200px] truncate text-ellipsis"
															>{{ workflow.id }}</span
														>
													</td>
													<!-- <td
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
													</td> -->
													<td
														class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-slate-200"
													>
														{{ workflow.name }}
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
	import { reactive, onMounted } from 'vue';
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

	const state = reactive({
		data: [],
		loading: true,
	});

	const { data: User } = await supabase
		.from('User')
		.select('Account(type,trayWorkspaceId)')
		.eq('id', user.value.id)
		.limit(1)
		.single();
	const workspaceId =
		User.Account.type === 'super_admin' ? 'null' : User.Account.trayWorkspaceId;

	async function fetchData() {
		const { elements: data } = await $fetch(
			`/api/tray/workflows/${workspaceId}`
		);
		return data;
	}

	onMounted(async () => {
		state.data = await fetchData();
		state.loading = false;
	});

	const workflows = state.data;
	const loading = state.loading;
</script>
