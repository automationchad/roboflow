<template>
	<div class="">
		<div
			class="mb-8 max-h-[400px] overflow-y-scroll rounded border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
		>
			<div class="bg-panel-body-light dark:bg-panel-body-dark w-full">
				<div class="bg-panel-header-light dark:bg-panel-header-dark w-full">
					<div class="rounded">
						<div class="flex w-full items-center justify-between px-6 py-3">
							<div class="flex items-center space-x-4">
								<div
									class="flex h-8 w-8 items-center justify-center rounded bg-slate-50 dark:bg-slate-800"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M15.75 8.75L19.25 12L15.75 15.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M8.25 8.75L4.75 12L8.25 15.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>
								</div>
								<h5 class="mb-0">Workflows</h5>
							</div>
							<div class="">
								<span>{{ state.data.length }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="overflow-hidden">
					<div
						v-for="workflow in state.data"
						:key="workflow.id"
						class="border-t border-slate-200 dark:border-slate-800 flex"
					>
						<div
							class="text-scale-1200 w-2/3 whitespace-nowrap px-6 py-3 text-sm"
						>
							<span class="max-w-[200px] truncate text-ellipsis">{{
								workflow.id
							}}</span>
						</div>
						<div
							class="text-scale-1200 hidden w-1/6 whitespace-nowrap p-3 text-sm lg:table-cell"
						>
							{{ workflow.name }}
						</div>
						<div class="text-scale-1200 w-1/6 px-6 py-3 text-right text-sm">
							<span> </span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="space-y-6 lg:px-0" v-if="false">
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
														class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
													>
														Name
													</th>
													<th
														scope="col"
														class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
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
														<loading-spinner />
													</th>
												</tr>
											</tbody>

											<tbody
												v-else
												class="divide-y divide-gray-200 dark:divide-slate-700 dark:bg-transparent"
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
														class="flex items-center whitespace-nowrap px-6 py-2 text-sm font-normal text-gray-900 dark:text-white"
													>
														<span
															class="max-w-[200px] truncate text-ellipsis"
															>{{ workflow.id }}</span
														>
													</td>
													<!-- <td
														class="whitespace-nowrap px-6 py-2 text-sm text-gray-500 dark:text-slate-200"
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
														class="whitespace-nowrap px-6 py-2 text-sm text-gray-500 dark:text-slate-200"
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
		User.Account.type === 'super_admin' ? null : User.Account.trayWorkspaceId;

	async function fetchData() {
		const { elements: data } = await $fetch(
			`/api/tray/workflows/list/${workspaceId}`
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
