<template>
	<div class="h-screen" v-if="!user">
		<div
			class="grid h-full grid-cols-1 items-start px-4 pt-24 sm:px-6 lg:px-20 xl:px-24"
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
					<div class="mt-6 text-gray-900 dark:text-white" v-if="!is_success">
						<form
							@submit.prevent="signUp()"
							class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
						>
							<div class="sm:col-span-2">
								<label for="email" class="block text-sm font-medium leading-6"
									>Email address</label
								>
								<div class="mt-2">
									<input
										v-model="email"
										id="email"
										required
										name="email"
										type="email"
										autocomplete="email"
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
									type="submit"
									class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
						</form>
					</div>
					<div v-else class="relative">
						<div
							class="absolute top-0 w-full opacity-100 delay-300 duration-500"
						>
							<div
								class="bg-brand-300 dark:bg-brand-100 border-brand-700 relative flex w-full items-start space-x-4 rounded-md border px-6 py-4"
							>
								<div class="text-brand-900">
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
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
										<polyline points="22 4 12 14.01 9 11.01"></polyline>
									</svg>
								</div>
								<div class="flex flex-1 items-center justify-between">
									<div>
										<h3 class="text-brand-1200 mb-1 block text-sm font-normal">
											Check your email to confirm
										</h3>
										<div class="text-brand-1100 text-xs">
											You've successfully signed up. Please check your email to
											confirm your account before signing in to the Supabase
											dashboard
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
				:title="'Successfully created profile'"
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
	</div>
</template>

<script setup>
	definePageMeta({ middleware: ['auth'], layout: 'public' });

	import {
		CheckCircleIcon,
		XMarkIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	const route = useRoute();

	const base_url = 'https://app.motis.group';

	const test_url = 'http://localhost:3000';

	const test = true;

	const redirectTo = route.query.returnTo
		? `${test ? test_url : base_url}/join/${route.query.returnTo}`
		: `${test ? test_url : base_url}/dashboard/projects`;

	console.log(redirectTo);

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	if (user.value) {
		navigateTo(`/dashboard/projects`);
	}

	const invitation = ref(null);
	const email = ref('');
	const password = ref('');

	const is_error = ref(false);
	const is_success = ref(false);
	const error_message = ref('');
	const loading = ref(false);

	onMounted(() => {
		watchEffect(async () => {
			if (user.value) {
				navigateTo(`/dashboard/projects`);
			}
		});
	});

	const signUp = async () => {
		try {
			loading.value = true;
			if (!email.value || !password.value) {
				throw new Error('Please fill in all fields');
			}
			let role = 'owner';
			if (route.query.returnTo) {
				const { data: invitation, error: invitationError } = await supabase
					.from('Invitation')
					.select('systemRole')
					.eq('token', route.query.returnTo)
					.limit(1)
					.single();
				role = invitation?.systemRole || 'owner';
			}

			const { user, error } = await supabase.auth.signUp({
				email: email.value,
				password: password.value,
				options: {
					emailRedirectTo: redirectTo,
					data: {
						role,
					},
				},
			});

			if (error) {
				throw new Error(error);
			} else {
				loading.value = false;
				is_success.value = true;
			}
		} catch (err) {
			console.error(err);
			is_error.value = true;
			error_message.value = err.message;
			loading.value = false;
		} finally {
			email.value = '';
			password.value = '';
		}
	};
</script>
