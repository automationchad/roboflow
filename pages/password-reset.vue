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
					<form class="mt-4 space-y-4 md:space-y-5 lg:mt-5" action="#">
						<div>
							<label
								for="email"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>Your email</label
							>
							<input
								disabled
								type="email"
								name="email"
								:value="User.email"
								id="email"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
								placeholder="name@company.com"
								required=""
							/>
						</div>
						<div>
							<label
								for="password"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>New Password</label
							>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
								required=""
							/>
						</div>
						<div>
							<label
								for="confirm-password"
								class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
								>Confirm password</label
							>
							<input
								type="confirm-password"
								name="confirm-password"
								id="confirm-password"
								placeholder="••••••••"
								class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
								required=""
							/>
						</div>
						<div class="flex items-start">
							<div class="flex h-5 items-center">
								<input
									id="newsletter"
									aria-describedby="newsletter"
									type="checkbox"
									class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-indigo-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-indigo-600"
									required=""
								/>
							</div>
							<div class="ml-3 text-sm">
								<label
									for="newsletter"
									class="font-light text-gray-500 dark:text-gray-300"
									>I accept the
									<a
										class="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
										href="#"
										>Terms and Conditions</a
									></label
								>
							</div>
						</div>
						<button
							type="submit"
							class="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
						>
							Reset passwod
						</button>
					</form>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 name,
		 Subscription(*),
		 Team (
			id,
			name
		 )
	   )`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();
</script>
