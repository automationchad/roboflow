<template>
	<div class="h-screen">
		<div
			class="grid h-full grid-cols-1 items-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24"
		>
			<div class="col-span-1 mx-auto w-full max-w-sm lg:w-96" v-if="!loading">
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
				</div>
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
				<div class="mt-2 rounded-md bg-red-50 p-4" v-if="is_error">
					<div class="flex">
						<div class="flex-shrink-0">
							<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
						</div>
						<div class="ml-3">
							<div class="text-sm text-red-700">
								{{ error_message }}
							</div>
						</div>
						<div class="ml-auto pl-3">
							<div class="-mx-1.5 -my-1.5">
								<button
									@click="is_error = false"
									type="button"
									class="inline-flex rounded-md bg-rose-50 p-1.5 text-rose-500 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 focus:ring-offset-rose-50"
								>
									<span class="sr-only">Dismiss</span>
									<XMarkIcon class="h-5 w-5" aria-hidden="true" />
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-8">
					<div class="mt-6">
						<div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
							<div class="dark:text-white">
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
							<div class="dark:text-white">
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
									for="password"
									class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
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
										class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:text-white dark:ring-slate-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div class="flex items-center justify-between sm:col-span-2">
								<div class="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-slate-600 dark:bg-slate-800"
									/>
									<label
										for="remember-me"
										class="ml-2 block text-sm text-gray-900 dark:text-gray-300"
										>Remember me</label
									>
								</div>

								<div class="text-sm">
									<a
										href="/password"
										class="font-medium text-indigo-600 hover:text-indigo-500"
										>Forgot your password?</a
									>
								</div>
							</div>

							<div class="sm:col-span-2">
								<button
									:disabled="loading"
									@keyup.enter="signUp()"
									@click="signUp()"
									class="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{{ loading ? 'Loading' : 'Create' }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="col-span-1 mx-auto w-full max-w-sm lg:w-96">
				<LoadingIcon />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';
	const route = useRoute();
	const user = useSupabaseUser();
	if (user.value) {
		navigateTo('/invitation-not-found');
	}

	const supabase = useSupabaseClient();
	const invitation = ref(null);
	const email = ref('');
	const password = ref('');
	const company_name = ref('');
	const first_name = ref('');
	const last_name = ref('');
	const is_success = ref(false);
	const is_error = ref(false);
	const error_message = ref('');
	const loading = ref(false);

	onMounted(async () => {
		const token = route.params.token;
		if (!token) {
			navigateTo('/invitation-not-found');
		}
		const { data, error } = await supabase
			.from('Invitation')
			.select('*')
			.eq('token', token)
			.single();
		if (error) {
			console.error(error);
			navigateTo('/invitation-not-found');
		}
		if (
			!data ||
			data.status !== 'pending' ||
			data.expires < new Date(Date.now())
		) {
			navigateTo('/invitation-not-found');
		}
		invitation.value = data;
	});

	onMounted(() => {
		watchEffect(async () => {
			if (user.value) {
				navigateTo(`/invitation-not-found`);
			}
		});
	});

	const signUp = async () => {
		const { user, error } = await supabase.auth.signUp({
			email: invitation.value.email,
			password: password.value,
			options: {
				data: {
					first_name: first_name.value,
					last_name: last_name.value,
					token: invitation.value.token,
					account_id: invitation.value.account,
					team_id: invitation.value.workspaceId,
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
			const { error: updateError } = await supabase
				.from('Invitation')
				.delete()
				.eq('id', invitation.value.id);
			if (updateError) {
				is_error.value = true;
				error_message.value = updateError;
				console.error(updateError);
				return;
			}
		}
	};
</script>
