<template>
	<div class="mb-8">
		<div class="container my-4 max-w-4xl space-y-8">
			<form @submit.prevent="handleOrgNameUpdate">
				<div
					class="bg-scale-100 border-scale-400 overflow-hidden rounded-md border shadow dark:border-white/5 dark:bg-white/5"
				>
					<div class="divide-scale-400 flex flex-col gap-0 divide-y">
						<div
							class="undefined block grid grid-cols-12 gap-6 px-8 py-8 opacity-100"
						>
							<label class="text-scale-1200 col-span-12 text-sm lg:col-span-5"
								>General settings</label
							>
							<div
								class="undefined undefined relative col-span-12 flex flex-col gap-6 lg:col-span-7"
							>
								<div
									class="grid gap-2 text-sm leading-4 md:grid md:grid-cols-12"
								>
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label
											class="text-scale-1100 block text-sm leading-4"
											for="name"
											>Organization name</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													v-model="changedOrgName"
													id="name"
													name=""
													type="text"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-3 py-2 text-sm leading-4 shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
												/>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
										></p>
									</div>
								</div>
								<div class="mt-4">
									<div class="flex flex-row gap-6 text-sm leading-4">
										<div class="">
											<button
												type="button"
												id="isOptedIntoAi"
												name="isOptedIntoAi"
												class="focus:ring-scale-400 bg-scale-500 hover:bg-scale-700 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent p-0 outline-none transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-current"
											>
												<span
													aria-hidden="true"
													class="bg-scale-100 dark:bg-scale-900 inline-block !h-5 h-5 !w-5 w-5 rounded-full shadow ring-0 transition duration-200 ease-in-out"
												></span>
											</button>
										</div>
										<div class="order-2 col-span-4 flex flex-col space-y-2">
											<label
												class="text-scale-1100 block text-sm leading-4"
												for="isOptedIntoAi"
												>Opt-in to sending anonymous data to OpenAI</label
											>
											<p
												class="text-scale-900 mt-2 text-sm leading-4 leading-normal"
												id="isOptedIntoAi-description"
											>
												By opting into sending anonymous data, Supabase AI can
												improve the answers it shows you
											</p>
											<p
												data-state="hide"
												class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm leading-4 text-red-900 transition-all"
											></p>
										</div>
									</div>
									<div data-state="closed">
										<div
											class="ml-16 flex cursor-pointer items-center space-x-2"
											type="button"
											aria-controls="radix-175"
											aria-expanded="false"
											data-state="closed"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon transition-all"
											>
												<polyline points="9 18 15 12 9 6"></polyline>
											</svg>
											<p class="text-scale-1000 text-sm underline">
												Important information regarding opting in
											</p>
										</div>
										<div
											data-state="closed"
											id="radix-175"
											class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal"
											style="
												--radix-collapsible-content-height: 532px;
												--radix-collapsible-content-width: 474.171875px;
											"
											hidden=""
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="border-scale-400 border-t"></div>
					<div class="flex px-8 py-4">
						<div class="flex w-full items-center justify-end gap-2">
							<div class="flex items-center gap-2">
								<button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									disabled=""
									type="reset"
								>
									<span class="truncate">Cancel</span></button
								><button
									class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
									:disabled="!showSave"
									type="submit"
								>
									<svg
										v-if="loading"
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 animate-spin"
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

									<span class="truncate">Save</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div
						class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
					>
						<div
							class="bg-panel-header-light dark:bg-panel-header-dark border-panel-border-light dark:border-panel-border-dark border-b"
						>
							<div class="flex items-center px-6 py-4">
								<p class="uppercase">Danger Zone</p>
							</div>
						</div>
						<div class="bg-panel-body-light dark:bg-panel-body-dark">
							<div class="px-6 py-4">
								<div
									class="btext-red-1200 relative flex items-start space-x-4 rounded-md border border-red-700 bg-red-200 px-6 py-4 dark:bg-red-100"
								>
									<div class="text-red-900">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<polygon
												points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
											></polygon>
											<line x1="12" y1="8" x2="12" y2="12"></line>
											<line x1="12" y1="16" x2="12.01" y2="16"></line>
										</svg>
									</div>
									<div class="flex flex-1 items-center justify-between">
										<div>
											<h3 class="text-red-1200 mb-1 block text-sm font-normal">
												<span class="text-red-900"
													>Deleting this organization will also remove its
													projects</span
												>
											</h3>
											<div class="text-red-1100 text-xs">
												<p class="text-red-900">
													Make sure you have made a backup if you want to keep
													your data
												</p>
												<div class="mt-2">
													<button
														@click="deleteConfirm = true"
														class="font-regular text-red-1100 bordershadow-red-700 hover:bordershadow-red-900 hover:text-lo-contrast relative inline-flex cursor-pointer items-center space-x-2 rounded bg-red-200 px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-red-600 focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-red-700"
														type="button"
													>
														<span class="truncate">Delete organization</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<SuccessModal
				v-if="is_success"
				@close="is_success = false"
				:title="success_message"
				:description="''"
			/>
		</transition>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<ErrorModal
				v-if="is_error"
				@close="is_error = false"
				:title="'Error: '"
				:description="error_message"
			/>
		</transition>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0"
			enter-to-class="transform opacity-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100"
			leave-to-class="transform opacity-0"
		>
			<DeleteOrgConfirm
				v-if="deleteConfirm"
				@cancel="deleteConfirm = false"
				:command="''"
				:description="orgName"
			/>
		</transition>
	</div>
</template>

<script setup>

	const route = useRoute();
	const supabase = useSupabaseClient();

	const orgName = ref('');

	const changedOrgName = ref('');

	const deleteConfirm = ref(false);

	

	const loading = ref(false);

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('');

	const getData = async () => {
		try {
			const { data: accountData, error: accountError } = await supabase
				.from('organizations')
				.select('name')
				.eq('id', route.params.organization)
				.limit(1)
				.single();
			if (accountError) throw new Error(accountError.message);
			orgName.value = accountData.name;
			changedOrgName.value = accountData.name;
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
		}
	};

	await getData();

	const handleOrgNameUpdate = async () => {
		try {
			loading.value = true;
			const { error } = await supabase
				.from('organizations')
				.update({ name: changedOrgName.value })
				.eq('id', route.params.organization);
			if (error) throw new Error(error.message);
			loading.value = false;
			is_success.value = true;
			success_message.value = 'Organization name updated';
			await getData();
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
		}
	};

	const showSave = computed(() => {
		return (
			orgName.value !== '' &&
			orgName.value !== changedOrgName.value &&
			loading.value !== true
		);
	});

	const deleteOrganization = async () => {
		try {
			loading.value = true;
			const { error } = await supabase
				.from('organizations')
				.delete()
				.eq('id', route.params.organization);
			if (error) throw new Error(error.message);
			loading.value = false;
			is_success.value = true;
			success_message.value = 'Organization deleted';
			await getData();
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message;
		}
	};
</script>
