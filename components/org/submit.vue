<script setup>
	import { ref } from 'vue';

	import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';

	const emit = defineEmits(['close-modal', 'org-submit', 'error']);
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const open = ref(true);

	const form_responses = ref({
		name: '',
		email: '',
		options: {
			partner: false,
		},
	});

	const loading = ref(false);
	const error_occurred = ref(false);
	const error_message = ref('');
	const duped_name = ref('');
	const route = useRoute();

	const cancelAll = () => {
		form_responses.value = {
			name: '',
			email: '',
			options: {
				partner: false,
			},
		};
		loading.value = false;
	};

	const handleSubmit = async (body) => {
		try {
			loading.value = true;

			// Insert account data
			const { data: accountData, error: accountError } = await supabase
				.from('Account')
				.insert([
					{
						name: body.name,
						type: body.options.partner ? 'partner' : 'client',
						status: 'active',
					},
				])
				.select();

			if (accountError) {
				throw new Error(accountError.message);
			}

			// Create Stripe customer
			const customer = await $fetch('/api/stripe/customer/create', {
				method: 'post',
				body: {
					email: body.email,
					company_name: body.name,
				},
			});

			if (!customer || customer.error) {
				throw new Error(
					customer.error ? customer.error : 'Error creating customer'
				);
			}

			// Create Stripe subscription
			if (!body.options.partner) {
				const subscription = await $fetch('/api/stripe/subscription/create', {
					method: 'post',
					body: {
						customer,
					},
				});

				if (!subscription || subscription.error) {
					throw new Error(
						subscription.error
							? subscription.error
							: 'Error creating subscription'
					);
				}
			}

			// Sign in with OTP
			const { data, error } = await supabase.auth.signInWithOtp({
				email: 'example@email.com',
				options: {
					data: {
						first_name: first_name.value,
						last_name: last_name.value,
						company_name: company_name.value,
						stripe_customer_id: customer.id,
						stripe_subscription_id: subscription.id,
						stripe_plan: subscription.plan,
					},
				},
			});

			if (error) {
				throw new Error(error.message);
			}

			emit('org-submit');
			emit('close-modal');
			form_responses.value = {
				name: '',
				email: '',
				options: {
					partner: false,
				},
			};
			loading.value = false;
		} catch (error) {
			console.log(error);
			loading.value = false;
			duped_name.value = body.name;
			error_occurred.value = true;
			error_message.value = error.message;
			emit('error', error.message); // Emit the error up to the parent
		}
	};
</script>

<template>
	<div
		class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center"
	>
		<div
			@click="
				$emit('close-modal'), (error_message = ''), (error_occurred = false)
			"
			class="dark:bg-black/25 fixed inset-0 left-0 top-0 h-full w-full bg-gray-500/25 backdrop-blur-md transition-opacity duration-700"
		></div>
		<div class="flex h-full w-full items-start justify-center overflow-y-auto">
			<div class="mt-12">
				<div class="relative w-full flex-1 overflow-y-auto">
					<div class="py-6">
						<div class="flex items-center justify-between">
							<div
								class="flex items-center text-lg leading-6 text-gray-900 dark:text-white"
							>
								<img src="~/assets/images/logo.png" class="mr-3 h-6 w-6" />
								Create a new client
							</div>
							<div
								class="ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-xs shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
							>
								<span class="relative mr-1.5 flex h-2 w-2">
									<span
										class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
									></span>
									<span
										class="relative inline-flex h-2 w-2 rounded-full bg-green-500"
									></span>
								</span>
								All systems operational
							</div>
						</div>
					</div>
				</div>
				<div
					class="max-w-2xl transform overflow-hidden rounded-lg border border-gray-200 bg-white pb-4 text-left shadow-xl transition-all dark:border-slate-800 dark:bg-slate-900 sm:my-8"
				>
					<div class="flex justify-end">
						<button
							type="button"
							class="rounded-md p-2 text-sm font-normal text-gray-900 dark:text-slate-300 dark:ring-slate-700"
							@click="emit('close-modal'), cancelAll()"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24">
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M17.25 6.75L6.75 17.25"
								></path>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M6.75 6.75L17.25 17.25"
								></path>
							</svg>
						</button>
					</div>
					<form class="" @submit.prevent="handleSubmit(form_responses)">
						<div>
							<div class="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
								<div class="col-span-2 space-y-6 px-10 pb-10">
									<div class="sm:col-span-2">
										<label
											for="name"
											class="block text-sm font-normal leading-6 text-gray-600 dark:text-slate-300"
											>Client name</label
										>
										<div class="mt-2.5">
											<input
												v-model="form_responses.name"
												required
												type="text"
												name="text"
												id="name"
												placeholder="Name of the company"
												:class="[
													error_message.includes(
														'duplicate key value violates unique constraint'
													) && form_responses.name === duped_name
														? 'ring-rose-400 focus:ring-rose-600'
														: 'focus:ring-indigo-600 dark:ring-slate-700',
													`block w-full rounded-md border-0 px-3.5 py-2
											text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
											placeholder:text-gray-400 focus:ring-2 focus:ring-inset
											 dark:bg-slate-800
											dark:text-slate-100 
											dark:placeholder:text-slate-400 sm:text-sm sm:leading-6`,
												]"
											/>
										</div>
										<p
											class="mt-1 flex items-center text-xs text-rose-600"
											v-if="
												error_message.includes(
													'duplicate key value violates unique constraint'
												) && form_responses.name === duped_name
											"
										>
											<ExclamationCircleIcon class="mr-1 h-4 w-4" />
											Duplicate name found
										</p>
										<div class="relative mt-2 flex items-start">
											<div class="flex h-6 items-center">
												<input
													v-model="form_responses.options.partner"
													id="comments"
													aria-describedby="comments-description"
													name="comments"
													type="checkbox"
													class="focus:ring-[#9382ff] h-4 w-4 rounded border-gray-300 text-[#9382ff] dark:border-slate-700 dark:bg-slate-800"
												/>
											</div>
											<div class="ml-3 text-sm leading-6">
												<label
													for="comments"
													class="font-medium text-gray-900 dark:text-white"
													>Partner Account</label
												>
												{{ ' ' }}
												<span
													id="comments-description"
													class="text-gray-500 dark:text-slate-400"
													><span class="sr-only">Create partner </span>so they
													can start referring business</span
												>
											</div>
										</div>
									</div>
									<div class="sm:col-span-2">
										<label
											for="name"
											class="block text-sm font-normal leading-6 text-gray-600 dark:text-slate-300"
											>Org owner</label
										>
										<div class="mt-2.5">
											<input
												v-model="form_responses.email"
												required
												type="email"
												name="text"
												id="name"
												placeholder="The email of the owner"
												class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:placeholder:text-slate-400 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="flex-shrink-0 px-10 pb-5">
							<div class="flex w-full space-x-3">
								<button
									type="submit"
									:disabled="loading"
									class="inline-flex w-full justify-center rounded-md bg-indigo-600 p-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Submit
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
