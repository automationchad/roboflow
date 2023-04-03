<template>
	<div>
		<section class="bg-gray-50 dark:bg-gray-900">
			<div
				class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
			>
				<a
					href="#"
					class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
				>
					<img class="mr-2 h-8 w-8" src="~/assets/images/logo.png" alt="logo" />
					Motis Group
				</a>
				<div
					class="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0"
				>
					<h2
						class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl"
					>
						Change Password
					</h2>
					<div
						class="rounded-md bg-red-50 p-4"
						v-if="passwordError || is_error"
					>
						<div class="flex">
							<div class="flex-shrink-0">
								<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
							</div>
							<div class="ml-3">
								<h3 class="text-sm font-medium text-red-800">
									{{ error_message || 'Passwords do not match!' }}
								</h3>
							</div>
						</div>
					</div>
					<form
						class="mt-4 space-y-4 md:space-y-5 lg:mt-5"
						@submit.prevent="passwordReset()"
					>
						<div>
							<label
								for="password"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>New Password</label
							>
							<input
								v-model="password1"
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
								required
							/>
						</div>
						<div>
							<label
								for="confirm-password"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>Confirm password</label
							>
							<input
								v-model="password2"
								type="password"
								name="confirm-password"
								id="confirm-password"
								placeholder="••••••••"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
								required=""
							/>
						</div>

						<button
							:disabled="formInvalid"
							type="submit"
							class="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
						>
							{{ loading ? 'Loading' : 'Reset password' }}
						</button>
					</form>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { XCircleIcon } from '@heroicons/vue/20/solid';
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();
	const password1 = ref('');
	const password2 = ref('');
	const loading = ref(false);
	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);

	const passwordError = computed(() => {
		if (password2.value === '') return false;
		else return password1.value !== password2.value;
	});

	const formInvalid = computed(() => {
		return passwordError.value;
	});

	const passwordReset = async () => {
		loading.value = true;
		const { data, error } = await supabase.auth.updateUser({
			password: password.value,
		});
		if (error) {
			is_error.value = true;
			error_message.value = error;
			console.log(error);
			is_success.value = false;
			navigateTo('/password');
		} else {
			let { data: User, error: userError } = await supabase
				.from('User')
				.select('accountId')
				.eq('id', user.value.id)
				.limit(1)
				.single();
			navigateTo(`/${User.accountId}/dashboard`);
		}
	};

	// https://nsfipxnlucvgchlkqvqw.supabase.co/auth/v1/verify?token=212aafbc2290f39dccb8cd2741c4f0f797dd09547d71d3a99d80a866&type=recovery&redirect_to=http://localhost:3000/password-reset
</script>
