<template>
	<div class="h-screen" v-if="!user">
		<div
			class="grid h-full grid-cols-1 items-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24"
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
						Sign in to your account
					</h2>
					<p class="mt-2 text-sm text-gray-600 dark:text-slate-400">
						Or
						{{ ' ' }}
						<a
							href="/"
							class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
							>create a new account</a
						>
					</p>
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
					<div>
						<div>
							<div class="mt-2 grid grid-cols-2 gap-3">
								<div>
									<button
										@click="handleLoginProvider('google')"
										class="inline-flex w-full justify-center dark:bg-slate-900 dark:text-white dark:ring-slate-700 rounded-md bg-white px-3 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors focus:outline-offset-0"
									>
										<span class="sr-only">Sign in with Google</span>
										<svg
											class="h-5 w-5"
											viewBox="0 0 24 24"
											fill="currentColor"
											stroke="none"
										>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M23.52 12.273c0-.852-.076-1.669-.219-2.454H12v4.641h6.459a5.52 5.52 0 0 1-2.395 3.621v3.012h3.877c2.27-2.089 3.579-5.166 3.579-8.82Z"
												fill="#4285F4"
											></path>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M12 24c3.24 0 5.956-1.075 7.941-2.907l-3.877-3.012c-1.075.72-2.45 1.147-4.064 1.147-3.125 0-5.77-2.112-6.715-4.948h-4.01v3.11A11.996 11.996 0 0 0 12 24Z"
												fill="#34A853"
											></path>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M5.285 14.28A7.213 7.213 0 0 1 4.91 12c0-.79.136-1.56.376-2.28V6.61H1.276A11.995 11.995 0 0 0 0 12c0 1.936.464 3.77 1.276 5.39l4.01-3.11Z"
												fill="#FBBC05"
											></path>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M12 4.773c1.761 0 3.344.606 4.587 1.794l3.442-3.44C17.951 1.188 15.235 0 12 0A11.996 11.996 0 0 0 1.277 6.61l4.01 3.11C6.228 6.884 8.874 4.773 12 4.773Z"
												fill="#EA4335"
											></path>
										</svg>
									</button>
								</div>

								<div>
									<button
										@click="handleLoginProvider('github')"
										class="inline-flex dark:bg-slate-900 dark:text-white dark:ring-slate-700 w-full justify-center rounded-md bg-white px-3 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
									>
										<span class="sr-only">Sign in with GitHub</span>
										<svg
											class="h-5 w-5"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fill-rule="evenodd"
												d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>

						<div class="relative mt-6">
							<div
								class="absolute inset-0 flex items-center"
								aria-hidden="true"
							>
								<div class="w-full border-t border-gray-300 dark:border-slate-600" />
							</div>
							<div class="relative flex justify-center text-sm">
								<span class="bg-white px-2 text-gray-500 dark:text-white dark:bg-[#020014]"
									>Or continue with</span
								>
							</div>
						</div>
					</div>

					<div class="mt-6">
						<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div class="sm:col-span-2">
								<label
									for="email"
									class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
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
										class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-900 dark:text-white dark:ring-slate-700 sm:text-sm sm:leading-6"
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
										class="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
										>Forgot your password?</a
									>
								</div>
							</div>

							<div class="sm:col-span-2">
								<button
									:disabled="loading"
									@keyup.enter="login()"
									@click="login()"
									class="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

									{{ loading ? 'Loading' : 'Log in' }}
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
	import { XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';

	definePageMeta({ middleware: ['auth'] });

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

	const email = ref('');
	const password = ref('');
	const is_error = ref(false);
	const loading = ref(false);
	const error_message = ref('');

	const login = async () => {
		loading.value = true;
		const { user, error } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		});
		if (error != null) {
			loading.value = false;
			is_error.value = true;
			error_message.value = error;
		}
		console.log('user', user);
		console.log('error', error);
	};

	const handleLoginProvider = async (provider) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: 'http://localhost:3000/login',
			},
		});
		if (error != null) {
			is_error.value = true;
			error_message.value = error;
		}
		console.log('user', data);
		console.log('error', error);
	};

	onMounted(async () => {
		watchEffect(async () => {
			if (user.value) {
				let { data: User, error: userError } = await supabase
					.from('User')
					.select('accountId')
					.eq('id', user.value.id)
					.limit(1)
					.single();
				navigateTo(`/${User.accountId}/dashboard`);
			}
		});
	});
</script>
