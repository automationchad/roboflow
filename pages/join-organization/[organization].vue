<template>
	<div class="flex h-screen">
		<div
			class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
		>
			<div class="mx-auto w-full max-w-sm lg:w-96" v-if="invitation">
				<div>
					<img
						class="h-12 w-auto"
						src="~/assets/images/logo.png"
						alt="Your Company"
					/>
					<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
						Create your account
					</h2>
					<p class="mt-2 text-sm text-gray-600">
						You've been invited to join our account!
					</p>
				</div>

				<div class="mt-8">
					<div class="mt-6">
						<div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
							<div>
								<label
									for="first-name"
									class="block text-sm font-semibold leading-6 text-gray-900"
									>First name</label
								>
								<div class="mt-2.5">
									<input
										v-model="first_name"
										type="text"
										name="first-name"
										id="first-name"
										autocomplete="given-name"
										class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									for="last-name"
									class="block text-sm font-semibold leading-6 text-gray-900"
									>Last name</label
								>
								<div class="mt-2.5">
									<input
										v-model="last_name"
										type="text"
										name="last-name"
										id="last-name"
										autocomplete="family-name"
										class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="sm:col-span-2">
								<label
									for="password"
									class="block text-sm font-medium leading-6 text-gray-900"
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
										class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="sm:col-span-2">
								<button
									:disabled="loading"
									@click="linkAccounts()"
									class="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{{ loading ? 'Loading' : 'Join org' }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mx-auto w-full max-w-sm lg:w-96" v-else>
				<div>
					<img
						class="h-12 w-auto"
						src="~/assets/images/logo.png"
						alt="Your Company"
					/>
					<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
						Create your account
					</h2>
					<p class="mt-2 text-sm text-gray-600">
						Or
						{{ ' ' }}
						<a
							href="/login"
							class="font-medium text-indigo-600 hover:text-indigo-500"
							>login to an existing account</a
						>
					</p>
				</div>

				<div class="mt-8">
					<div class="mt-6">
						<div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
							<div>
								<label
									for="first-name"
									class="block text-sm font-semibold leading-6 text-gray-900"
									>First name</label
								>
								<div class="mt-2.5">
									<input
										v-model="first_name"
										type="text"
										name="first-name"
										id="first-name"
										autocomplete="given-name"
										class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div>
								<label
									for="last-name"
									class="block text-sm font-semibold leading-6 text-gray-900"
									>Last name</label
								>
								<div class="mt-2.5">
									<input
										v-model="last_name"
										type="text"
										name="last-name"
										id="last-name"
										autocomplete="family-name"
										class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label
									for="company"
									class="block text-sm font-semibold leading-6 text-gray-900"
									>Company</label
								>
								<div class="mt-2.5">
									<input
										v-model="company_name"
										type="text"
										name="company"
										id="company"
										autocomplete="organization"
										class="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div class="sm:col-span-2">
								<label
									for="email"
									class="block text-sm font-medium leading-6 text-gray-900"
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
										class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="sm:col-span-2">
								<label
									for="password"
									class="block text-sm font-medium leading-6 text-gray-900"
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
										class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="sm:col-span-2">
								<button
									:disabled="loading"
									@click="signUp()"
									class="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{{ loading ? 'Loading' : 'Sign up' }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="relative hidden w-0 flex-1 lg:block">
			<img
				class="absolute inset-0 h-full w-full object-cover"
				src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
				alt=""
			/>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({ middleware: ['auth'] });
	const route = useRoute();
	console.log(route.query);

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const invitation = ref(null);
	const email = ref('');
	const password = ref('swimming123');
	const company_name = ref('');
	const first_name = ref('Juliet');
	const last_name = ref('Smith');

	const isSignUp = ref(true);
	const error = ref(false);
	const error_message = ref('');
	const loading = ref(false);

	onMounted(async () => {
		const token = route.query.token;
		if (!token) {
			return;
		}
		const { data, error } = await supabase
			.from('Invitation')
			.select('*')
			.eq('token', token)
			.single();
		if (error) {
			console.error(error);
			return;
		}
		if (!data || data.status !== 'pending') {
			return;
		}
		invitation.value = data;
		console.log(data);
	});

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
					account_id: null,
					stripe_customer_id: customer.id,
					stripe_subscription_id: subscription.id,
					stripe_plan: subscription.plan,
				},
			},
		});
		if (error) {
			error.value = true;
			error_message.value = error;
			alert(error);
		} else {
			loading.value = false;
			alert('Success, check your email for verification link');
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
