<template>
	<div class="h-screen" v-if="!user">
		<div
			class="grid h-full grid-cols-1 items-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24"
		>
			<div class="col-span-1 mx-auto w-full max-w-sm lg:w-96">
				<div>
					<img
						class="h-12 w-auto"
						src="~/assets/images/logo.png"
						alt="Your Company"
					/>
					<h2
						class="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
					>
						Create your account
					</h2>
					<p class="mt-2 text-sm text-gray-600 dark:text-slate-300">
						Or
						{{ ' ' }}
						<a
							href="/login"
							class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
							>login to an existing account</a
						>
					</p>
				</div>

				<div class="mt-8">
					<div class="rounded-md bg-green-50 p-4" v-if="is_success">
						<div class="flex">
							<div class="flex-shrink-0">
								<CheckCircleIcon
									class="h-5 w-5 text-green-400"
									aria-hidden="true"
								/>
							</div>
							<div class="ml-3">
								<p class="text-sm text-green-600">
									Success, check your email for verification link!
								</p>
							</div>
							<div class="ml-auto pl-3">
								<div class="-mx-1.5 -my-1.5">
									<button
										@click="is_success = false"
										type="button"
										class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
									>
										<span class="sr-only">Dismiss</span>
										<XMarkIcon class="h-5 w-5" aria-hidden="true" />
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="rounded-md bg-red-50 p-4" v-if="is_error">
						<div class="flex">
							<div class="flex-shrink-0">
								<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-red-800">
									{{ error_message }}
								</h3>
							</div>
						</div>
					</div>
					<div class="mt-6 text-gray-900 dark:text-white">
						<div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
							<div>
								<label
									for="first-name"
									class="block text-sm font-semibold leading-6"
									>First name</label
								>
								<div class="mt-2.5">
									<input
										v-model="first_name"
										type="text"
										name="first-name"
										id="first-name"
										autocomplete="given-name"
										class="block w-full rounded-md border-0 py-2 px-3.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									for="last-name"
									class="block text-sm font-semibold leading-6"
									>Last name</label
								>
								<div class="mt-2.5">
									<input
										v-model="last_name"
										type="text"
										name="last-name"
										id="last-name"
										autocomplete="family-name"
										class="block w-full rounded-md border-0 py-2 px-3.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label
									for="company"
									class="block text-sm font-semibold leading-6"
									>Company</label
								>
								<div class="mt-2.5">
									<input
										v-model="company_name"
										type="text"
										name="company"
										id="company"
										autocomplete="organization"
										class="block w-full rounded-md border-0 py-2 px-3.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label for="email" class="block text-sm font-medium leading-6"
									>Email address</label
								>
								<div class="mt-2">
									<input
										v-model="email"
										id="email"
										name="email"
										type="email"
										autocomplete="email"
										required=""
										class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="sm:col-span-2">
								<label
									for="password"
									class="block text-sm font-medium leading-6"
									>Password</label
								>
								<div class="mt-2">
									<input
										v-model="password"
										id="password"
										name="password"
										type="password"
										autocomplete="current-password"
										required=""
										class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="sm:col-span-2">
								<button
									:disabled="loading"
									@click="signUp()"
									class="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									<svg
										v-if="loading"
										class="mr-1 h-5 w-5 animate-spin"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 4.75V6.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M17.1266 6.87347L16.0659 7.93413"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M19.25 12L17.75 12"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M17.1266 17.1265L16.0659 16.0659"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M12 17.75V19.25"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M7.9342 16.0659L6.87354 17.1265"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M6.25 12L4.75 12"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M7.9342 7.93413L6.87354 6.87347"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>
									{{ loading ? 'Loading' : 'Sign up' }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({ middleware: ['auth'] });

	import {
		CheckCircleIcon,
		XMarkIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	const route = useRoute();

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	if (user.value) {
		let { data: User, error: userError } = await supabase
			.from('User')
			.select('accountId')
			.eq('id', user.value.id)
			.limit(1)
			.single();
		navigateTo(`/${User.accountId}/dashboard`);
	}

	const invitation = ref(null);
	const email = ref('');
	const password = ref('');
	const company_name = ref('');
	const first_name = ref('');
	const last_name = ref('');

	const is_error = ref(false);
	const is_success = ref(false);
	const error_message = ref('');
	const loading = ref(false);

	onMounted(() => {
		watchEffect(async () => {
			if (user.value) {
				let { data: User, error: userError } = await supabase
					.from('User')
					.select(`accountId`)
					.eq('id', user.value.id)
					.limit(1)
					.single();
				navigateTo(`/${User.accountId}/dashboard`);
			}
		});
	});

	const signUp = async () => {
		loading.value = true;
		const customer = await $fetch('/api/stripe/customer/create', {
			method: 'post',
			body: {
				email: email.value,
				company_name: company_name.value,
			},
		});

		const subscription = await $fetch('/api/stripe/subscription/create', {
			method: 'post',
			body: {
				customer,
			},
		});

		const { user, error } = await supabase.auth.signUp({
			email: email.value,
			password: password.value,
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
			is_error.value = true;
			error_message.value = error;
			alert(error);
		} else {
			loading.value = false;
			is_success.value = true;
		}
		email.value = '';
		password.value = '';
		company_name.value = '';
		first_name.value = '';
		last_name.value = '';
		console.log('user', user);
		console.log('error', error);
	};

	const linkAccounts = async () => {
		loading.value = true;
		// Link the invitee's account to the admin user's account using Supabase auth
		const { user, error } = await supabase.auth.signUp({
			email: invitation.value.email,
			password: password.value,
			options: {
				data: {
					first_name: first_name.value,
					last_name: last_name.value,
					account_id: invitation.account,
					company_name: company_name.value,
					stripe_customer_id: '',
					stripe_subscription_id: '',
					stripe_plan: '',
				},
			},
		});
		if (error) {
			alert(error);
			console.error(error);
			return;
		}

		// Update the status of the invitation to "accepted"
		const { error: updateError } = await supabase
			.from('Invitation')
			.update({ status: 'accepted' })
			.eq('id', invitation.value.id);
		if (updateError) {
			console.error(updateError);
			return;
		}
		loading.value = false;
		alert('Success!');
	};
</script>
