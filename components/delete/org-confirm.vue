<template>
	<div
		@click="loading ? '' : emits('cancel')"
		class="data-open:animate-overlay-show data-closed:animate-overlay-hide fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-gray-600/60"
	>
		<div
			@click.stop
			class="bg-scale-100 dark:bg-scale-300 border-scale-300 dark:border-scale-500 data-open:animate-overlay-show data-closed:animate-overlay-hide relative my-4 rounded-md border shadow-xl sm:w-full sm:max-w-sm sm:align-middle"
		>
			<div
				class="bg-scale-200 dark:bg-scale-400 border-scale-300 dark:border-scale-500 space-y-1 border-b px-4 py-3 sm:px-5"
			>
				<div class="flex items-baseline gap-2">
					<h5 class="text-scale-1200 text-sm">Delete organisation</h5>
					<span class="text-scale-900 text-xs">Are you sure?</span>
				</div>
			</div>
			<form @submit.prevent="handleDeleteConfirm">
				<div class="space-y-4 py-3">
					<div class="px-5">
						<p class="text-scale-900 text-sm">
							This action <span class="text-scale-1200">cannot</span> be undone.
							This will permanently delete the
							<span class="text-scale-1200">{{ description }}</span>
							organization and remove all of its projects.
						</p>
					</div>
					<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
					<div class="px-5">
						<div class="grid w-full gap-2 text-sm md:grid md:grid-cols-12">
							<div class="col-span-12 flex flex-row justify-between space-x-2">
								<label class="text-scale-1100 block text-sm" for="orgName"
									><span
										>Please type
										<span class="font-bold">{{ description }}</span> to
										confirm</span
									></label
								>
							</div>
							<div class="col-span-12">
								<div class="">
									<div class="relative">
										<input
											id="orgName"
											v-model="orgName"
											@blur="startedTyping = true"
											@focus="passwordInputFocused = true"
											placeholder="Enter the string above"
											type="text"
											:class="[
												isInvalid
													? 'border-red-700 bg-red-100 placeholder:text-red-600 focus:ring-red-500'
													: 'focus:border-scale-900 focus:ring-scale-400',
												'text-scale-1200  placeholder-scale-800 box-border block w-full rounded-md border  px-4 py-2 text-sm shadow-sm outline-none transition-all  focus:shadow-md focus:ring-2 focus:ring-current ',
											]"
										/>
										<div
											class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
										>
											<div
												class="pointer-events-none inset-y-0 right-3 flex items-center pl-2 pr-2 text-red-900"
											>
												<svg
													v-if="isInvalid"
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													class="sbui-icon"
												>
													<circle cx="12" cy="12" r="10"></circle>
													<line x1="12" y1="8" x2="12" y2="12"></line>
													<line x1="12" y1="16" x2="12.01" y2="16"></line>
												</svg>
											</div>
										</div>
									</div>
								</div>
								<p
									:class="[
										isInvalid
											? 'animate-slide-down-normal mt-2 opacity-100'
											: 'animate-slide-up-normal opacity-0',
										'text-sm text-red-900 transition-all',
									]"
								>
									{{
										isInvalid
											? 'Value entered does not match the value above.'
											: ''
									}}
								</p>
							</div>
						</div>
					</div>
					<div class="bg-scale-300 dark:bg-scale-500 my-2 h-px w-full"></div>
					<div class="px-5">
						<button
							:disabled="disableButton"
							class="font-regular text-red-1100 bordershadow-red-700 hover:bordershadow-red-900 hover:text-lo-contrast relative flex inline-flex w-full items-center items-center justify-center space-x-2 rounded bg-red-200 px-3 py-2 text-center text-sm leading-4 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-red-600 focus-visible:outline-4 focus-visible:outline-offset-1 focus-visible:outline-red-700"
							type="submit"
						>
							<svg
								v-if="loading"
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 animate-spin"
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

							<span class="truncate"
								>I understand, delete this organization</span
							>
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({ description: String, command: String });
	const emits = defineEmits(['cancel', 'confirm']);

	const orgName = ref('');

	const passwordInputFocused = ref(false);
	const startedTyping = ref(false);

	const loading = ref(false);

	const isInvalid = computed(() => {
		if (!startedTyping.value) return false;
		if (startedTyping.value && orgName.value !== props.description) return true;
		return false;
	});

	const disableButton = computed(() => {
		if (loading.value) return true;
		if (orgName.value !== props.description) return true;
		return false;
	});

	const handleDeleteConfirm = (e) => {
		if (orgName.value !== props.description) return;
		loading.value = true;
		setTimeout(() => {
			emits('confirm');
			loading.value = false;
		}, 1000);
	};
</script>
