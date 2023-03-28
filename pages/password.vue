<template>
	<!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
	<div class="flex min-h-full">
		<div
			class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
		>
			<div class="mx-auto w-full max-w-sm lg:w-96">
				<div>
					<img
						class="h-12 w-auto"
						src="~/assets/images/logo.png"
						alt="Your Company"
					/>
					<h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
						Password reset
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
								Check your email for reset instructions
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
				<div class="mt-8">
					<div class="mt-6">
						<div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
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
								<button
									@click="forgotPassword()"
									class="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{{ 'Send reset link' }}
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
	import {
		CheckCircleIcon,
		XMarkIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	definePageMeta({ middleware: ['auth'] });
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const email = ref('');
	const password = ref('');
	const company_name = ref('');
	const first_name = ref('');
	const last_name = ref('');
	const isSignUp = ref(false);
	const is_error = ref(false);
	const is_success = ref(false);
	const error_message = ref('');

	const forgotPassword = async () => {
		const { data, error } = await supabase.auth.resetPasswordForEmail(
			email.value,
			{
				redirectTo: 'http://localhost:3000/password-reset',
			}
		);
		if (error) {
			is_error.value = true;
			error_message.value = error;
			is_success.value = false;
		} else {
			is_success.value = true;
			error_message.value = '';
			is_error.value = false;
		}
		email.value = '';
		console.log('data', data);
		console.log('error', error);
	};

	onMounted(() => {
		watchEffect(() => {
			if (user.value) {
				navigateTo('/home');
			}
		});
	});
</script>
