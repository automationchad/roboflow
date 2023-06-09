<template>
	<div>
		<Head>
			<Title>Motis Group | Org Clients</Title>
		</Head>
		<div>
			<div>
				<div class="">
					<div class="lg:px-8">
						<div class="mx-auto flex flex-col lg:max-w-7xl">
							<main class="max-w-7xl flex-1">
								<div class="relative mx-auto">
									<div class="pb-16 pt-10">
										<div class="px-4 sm:px-6 lg:px-0">
											<h1
												class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
											>
												Client organizations
											</h1>
										</div>
										<div class="px-4 sm:px-6 lg:px-0">
											<div class="py-6">
												<div class="mt-8 space-y-6 lg:px-0">
													<section aria-labelledby="clients">
														<div class="sm:overflow-hidden">
															<div class="flex max-w-5xl flex-col">
																<div class="overflow-x-auto">
																	<div
																		class="inline-block min-w-full pt-2 align-middle"
																	>
																		<div class="overflow-hidden">
																			<div
																				class="border-panel-border-light dark:border-panel-border-dark mb-8 w-full overflow-hidden rounded border border-slate-200 dark:border-slate-800 dark:bg-slate-900"
																			>
																				<div
																					class="bg-panel-body-light dark:bg-panel-body-dark"
																				>
																					<div
																						class="flex items-center justify-between px-6 pt-4"
																					>
																						<div class="flex flex-col">
																							<h3
																								class="mb-0 text-xl dark:text-slate-100"
																							>
																								Client organizations
																							</h3>
																						</div>
																						<div
																							class="flex flex-col items-end space-y-2"
																						>
																							<button
																								@click="showSubmitModal = true"
																								class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
																								type="button"
																							>
																								<span class="truncate"
																									>New organization</span
																								>
																							</button>
																						</div>
																					</div>
																					<div class="mt-2 px-6 pb-4"></div>
																					<div
																						class="dark:border-panel-border-dark relative flex items-center border-t border-slate-100 px-6 py-3 text-slate-500 dark:border-slate-800"
																					>
																						<div class="w-[40%]">
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Name
																							</p>
																						</div>

																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Type
																							</p>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Status
																							</p>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<p
																								class="text-scale-900 text-xs uppercase"
																							>
																								Tasks
																							</p>
																						</div>
																					</div>
																					<NuxtLink
																						v-for="(team, idx) in teams"
																						:to="`/${team.id}/dashboard`"
																						:key="team.name"
																						class="dark:border-panel-border-dark hover:bg-white/[2%] relative flex items-center border-t border-slate-100 px-6 py-3 transition-colors dark:border-slate-800 dark:text-slate-200"
																					>
																						<div
																							class="flex w-[40%] items-center gap-3"
																						>
																							<span class="text-sm">{{
																								team.name +
																								(team.name === User.Account.name
																									? ' (You)'
																									: '')
																							}}</span>
																						</div>

																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<span
																								class="rounded-full border border-slate-400 bg-slate-500 px-2 text-xs capitalize text-slate-100"
																								>{{
																									team.type.replace(/_/g, ' ')
																								}}</span
																							>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<span
																								:class="[
																									styles[team.status],
																									'rounded-full px-2 text-xs capitalize ring-1 ',
																								]"
																								>{{ team.status }}</span
																							>
																						</div>
																						<div
																							class="flex w-[20%] justify-end"
																						>
																							<div
																								v-if="team.Ticket[0].count"
																								class="flex items-center justify-center rounded-full bg-rose-900 px-2 py-0.5 text-xs leading-none"
																							>
																								{{ team.Ticket[0].count }}
																							</div>
																						</div>
																					</NuxtLink>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</section>
												</div>
											</div>
										</div>
									</div>
								</div>
							</main>
						</div>
					</div>
				</div>
			</div>
		</div>

		<transition
			enter-active-class="transition duration-300 ease-in-out"
			enter-from-class="transform -translate-y-10 opacity-0 scale-95"
			enter-to-class="transform translate-y-0 opacity-100 scale-100"
			leave-active-class="transition duration-300 ease-in-out"
			leave-from-class="transform translate-y-0 opacity-100 scale-100"
			leave-to-class="transform -translate-y-10 opacity-0 scale-95"
			><SuccessModal
				:title="'Successfully created account'"
				:description="''"
				v-if="is_success"
				@close="is_success = false"
		/></transition>

		<transition
			enter-active-class="transition duration-200 ease-in-out"
			enter-from-class="transform -translate-y-10 opacity-0 scale-95"
			enter-to-class="transform translate-y-0 opacity-100 scale-100"
			leave-active-class="transition duration-200 ease-in-out"
			leave-from-class="transform translate-y-0 opacity-100 scale-100"
			leave-to-class="transform -translate-y-10 opacity-0 scale-95"
			><ErrorModal
				:title="errorMessage"
				:description="''"
				v-if="is_error"
				@close="is_error = false"
		/></transition>
		<transition
			enter-active-class="transition duration-200 ease-in-out"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition duration-200 ease-in-out"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
			><org-submit
				v-show="showSubmitModal"
				@close-modal="showSubmitModal = false"
				@org-submit="handleSubmit"
				@error="handleError"
		/></transition>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	const is_success = ref(false);
	const is_error = ref(false);

	const errorMessage = ref('');

	const teams = ref([]);

	const handleError = (msg) => {
		errorMessage.value = msg;
		is_error.value = true;
	};

	const handleSubmit = async () => {
		await getData();
		is_success.value = true;
	};

	const showSubmitModal = ref(false);

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const styles = {
		active:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		pending:
			'bg-yellow-100 dark:bg-yellow-700 dark:ring-yellow-500 ring-yellow-300  text-yellow-900 dark:text-yellow-200',
		deleted:
			'bg-slate-100 dark:bg-slate-700 dark:ring-slate-500 ring-slate-300  text-slate-900 dark:text-slate-200',
		inactive:
			'bg-amber-100 dark:bg-amber-700 dark:ring-amber-500 ring-amber-300  text-amber-900 dark:text-amber-200',
		cancelled:
			'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		delinquent:
			'bg-rose-100 dark:bg-rose-700 dark:ring-rose-500 ring-rose-300 text-rose-900 dark:text-rose-200',
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
			Account (
			     id,
				 name,
				 type,
				 Subscription(*),
				 Team (
					id,
					name
				 ),
				 Ticket (count)
			   )
			 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const getData = async () => {
		const { data: Account, error: accountError } = await supabase
			.from('Account')
			.select('*,Ticket(count)');
		teams.value = Account;
	};

	onMounted(async () => {
		await getData();
	});
</script>
