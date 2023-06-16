<script setup>
	definePageMeta({ layout: 'public', middleware: ['auth'] });

	const route = useRoute();

	const base_url = 'https://app.motis.group';

	const test_url = 'http://localhost:3000';

	const test = true;

	const redirectTo = route.query.returnTo
		? `${test ? test_url : base_url}/join/${route.query.returnTo}`
		: `${test ? test_url : base_url}/dashboard/projects`;

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	if (user.value) {
		navigateTo(`/dashboard/projects`);
	}

	const invitation = ref(null);
	const email = ref('');
	const password = ref('');

	const passwordInputFocused = ref(false);

	const startedTyping = ref(false);

	const showPassword = ref(false);

	const showError = ref(false);
	const showSuccess = ref(false);

	const is_error = ref(false);
	const is_success = ref(false);
	const error_message = ref('');
	const loading = ref(false);

	watch(async () => {
		if (user.value) {
			navigateTo(`/dashboard/projects`);
		}
	});

	const showPasswordHandle = (event) => {
		event.stopPropagation();
		showPassword.value = !showPassword.value;
	};

	const passwordValid = computed(() => {
		if (!startedTyping.value) {
			return { isValid: true, message: '' };
		}
		if (startedTyping.value && password.value.length === 0) {
			return { isValid: false, message: 'Password is a required field' };
		}
		// Check if password is long enough
		if (password.value.length <= 7) {
			return {
				isValid: false,
				message: 'Password must be longer than 7 characters.',
			};
		}

		// Check for uppercase letter
		if (!/[A-Z]/.test(password.value)) {
			return {
				isValid: false,
				message: 'Password must contain at least 1 uppercase letter.',
			};
		}

		// Check for lowercase letter
		if (!/[a-z]/.test(password.value)) {
			return {
				isValid: false,
				message: 'Password must contain at least 1 lowercase letter.',
			};
		}

		// Check for number
		if (!/[0-9]/.test(password.value)) {
			return {
				isValid: false,
				message: 'Password must contain at least 1 number.',
			};
		}

		// Check for special character
		if (!/[!<>@#\$%]/.test(password.value)) {
			return {
				isValid: false,
				message:
					'Password must contain at least 1 special character (!<>@#$%).',
			};
		}

		return { isValid: true, message: 'Password is valid.' };
	});

	const signUp = async (oauth) => {
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
				if (invitationError) {
					throw new Error(invitationError.message);
				}
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
				throw new Error(error.message);
			}

			loading.value = false;
			is_success.value = true;
			showSuccess.value = true;
		} catch (err) {
			console.error(err);
			is_error.value = true;
			error_message.value = err.message;
			showError.value = true;
			loading.value = false;
		} finally {
			email.value = '';
			password.value = '';
		}
	};

	const handleSignUpProvider = async (provider) => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: redirectTo,
				},
			});
			if (error) {
				throw new Error(error.message);
			}
			loading.value = false;
		} catch (error) {
			loading.value = false;
			error_message.value = error;
			is_error.value = true;
			console.log('error', error);
		}
	};
</script>

<template>
	<div class="bg-scale-100 flex flex-1 flex-col">
		<div class="absolute top-0 mx-auto w-full px-8 pt-6 sm:px-6 lg:px-8">
			<nav class="relative flex items-center justify-between sm:h-10">
				<div class="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
					<div class="flex w-full items-center justify-between md:w-auto">
						<a href="/dashboard/projects"
							><span
								style="
									box-sizing: border-box;
									display: inline-block;
									overflow: hidden;
									width: initial;
									height: initial;
									background: none;
									opacity: 1;
									border: 0;
									margin: 0;
									padding: 0;
									position: relative;
									max-width: 100%;
								"
								><span
									style="
										box-sizing: border-box;
										display: block;
										width: initial;
										height: initial;
										background: none;
										opacity: 1;
										border: 0;
										margin: 0;
										padding: 0;
										max-width: 100%;
									"
									><img
										style="
											display: block;
											max-width: 100%;

											background: none;
											opacity: 1;
											border: 0;
											margin: 0;
											padding: 0;
										"
										alt=""
										class="h-10 w-10"
										aria-hidden="true"
										src="~/assets/images/logo.png" /></span></span
						></a>
					</div>
				</div>
				<div class="hidden items-center space-x-3 md:ml-10 md:flex md:pr-4">
					<a
						target="_blank"
						rel="noreferrer"
						href="https://Motis Group.com/docs"
						><button
							class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="sbui-icon"
							>
								<path
									d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
								></path>
								<polyline points="14 2 14 8 20 8"></polyline>
								<line x1="16" y1="13" x2="8" y2="13"></line>
								<line x1="16" y1="17" x2="8" y2="17"></line>
								<polyline points="10 9 9 9 8 9"></polyline></svg
							><span class="truncate">Documentation</span>
						</button></a
					>
				</div>
			</nav>
		</div>
		<div class="flex flex-1">
			<main
				class="bg-scale-200 border-scale-500 flex flex-1 flex-shrink-0 flex-col items-center border-r px-5 pb-8 pt-16 shadow-lg"
			>
				<div class="flex w-[330px] flex-1 flex-col justify-center sm:w-[384px]">
					<div class="mb-10">
						<h1 class="mb-2 mt-8 text-2xl lg:text-3xl">Get started</h1>
						<h2 class="text-scale-1100 text-sm">Create a new account</h2>
					</div>
					<div class="flex flex-col gap-5">
						<button
							@click="handleSignUpProvider('google')"
							class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-4 py-2 text-center text-base shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
						>
							<svg
								class="h-4 w-4"
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
								></path></svg
							><span class="truncate">Continue with Google</span>
						</button>
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="border-scale-700 w-full border-t"></div>
							</div>
							<div class="relative flex justify-center text-sm">
								<span class="bg-scale-200 text-scale-1200 px-2 text-sm"
									>or</span
								>
							</div>
						</div>
						<div class="relative">
							<div
								v-if="showSuccess"
								class="absolute top-0 w-full delay-300 duration-500"
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
											<h3
												class="text-brand-1200 mb-1 block text-sm font-normal"
											>
												Check your email to confirm
											</h3>
											<div class="text-brand-1100 text-xs">
												You've successfully signed up. Please check your email
												to confirm your account before signing in to the Motis
												Group dashboard
											</div>
										</div>
									</div>
								</div>
							</div>
							<form
								v-else
								@submit.prevent="signUp(false)"
								id="signUp-form"
								class="max-h-[1000px] w-full overflow-x-visible py-1 opacity-100 transition-all duration-500"
							>
								<div class="flex flex-col gap-4">
									<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
										<div
											class="col-span-12 flex flex-row justify-between space-x-2"
										>
											<label class="text-scale-1100 block text-sm" for="email"
												>Email</label
											>
										</div>
										<div class="col-span-12">
											<div class="">
												<div class="relative">
													<input
														autocomplete="email"
														id="email"
														name="email"
														placeholder="you@example.com"
														type="email"
														class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
														v-model="email"
													/>
												</div>
											</div>
											<p
												data-state="hide"
												class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
											></p>
										</div>
									</div>
									<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
										<div
											class="col-span-12 flex flex-row justify-between space-x-2"
										>
											<label
												class="text-scale-1100 block text-sm"
												for="password"
												>Password</label
											>
										</div>
										<div class="col-span-12">
											<div class="">
												<div class="relative">
													<input
														@blur="startedTyping = true"
														@focus="passwordInputFocused = true"
														autocomplete="new-password"
														id="password"
														name="password"
														placeholder="••••••••"
														:type="showPassword ? 'text' : 'password'"
														:class="[
															!passwordValid.isValid
																? ' border-red-700 bg-red-100 placeholder:text-red-600 focus:ring-red-500'
																: 'border-scale-700 focus:border-scale-900 focus:ring-scale-400 bg-scaleA-200  placeholder-scale-800',
															'text-scale-1200  box-border block w-full rounded-md border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current',
														]"
														v-model="password"
													/>
													<div
														class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
													>
														<button
															@click.prevent="showPasswordHandle"
															class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative !mr-1 inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														>
															<svg
																v-if="!showPassword"
																width="14"
																height="14"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M19.25 12C19.25 13 17.5 18.25 12 18.25C6.5 18.25 4.75 13 4.75 12C4.75 11 6.5 5.75 12 5.75C17.5 5.75 19.25 11 19.25 12Z"
																></path>
																<circle
																	cx="12"
																	cy="12"
																	r="2.25"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																></circle></svg
															><svg
																v-else
																width="14"
																height="14"
																fill="none"
																viewBox="0 0 24 24"
															>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M18.6247 10C19.0646 10.8986 19.25 11.6745 19.25 12C19.25 13 17.5 18.25 12 18.25C11.2686 18.25 10.6035 18.1572 10 17.9938M7 16.2686C5.36209 14.6693 4.75 12.5914 4.75 12C4.75 11 6.5 5.75 12 5.75C13.7947 5.75 15.1901 6.30902 16.2558 7.09698"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M19.25 4.75L4.75 19.25"
																></path>
																<path
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	stroke-width="1.5"
																	d="M10.409 13.591C9.53033 12.7123 9.53033 11.2877 10.409 10.409C11.2877 9.5303 12.7123 9.5303 13.591 10.409"
																></path>
															</svg>
														</button>
													</div>
												</div>
											</div>
											<transition
												enter-active-class="transition ease-out duration-100"
												enter-from-class="transform opacity-0 translate-y-8"
												enter-to-class="transform opacity-100"
												leave-active-class="transition ease-in duration-75"
												leave-from-class="transform opacity-100"
												leave-to-class="transform opacity-0 translate-y-8"
											>
												<p
													v-if="startedTyping && !passwordValid.isValid"
													:class="['mt-2 text-sm text-red-900 transition-all']"
												>
													{{ passwordValid.message }}
												</p>
											</transition>
										</div>
									</div>
									<div
										:class="[
											passwordInputFocused
												? 'max-h-[100px] opacity-100'
												: 'max-h-[0px] opacity-0',
											'duration-400 overflow-y-hidden transition-all',
										]"
									>
										<div class="text-sm">
											<div
												:class="[
													!/[A-Z]/.test(password)
														? 'text-scale-900'
														: 'text-scale-1100',
													'flex items-center gap-1 space-x-1.5 transition duration-200',
												]"
											>
												<svg
													v-if="!/[A-Z]/.test(password)"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
													></path>
												</svg>
												<svg
													v-else
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
														fill-rule="evenodd"
														clip-rule="evenodd"
													></path>
												</svg>
												<p class="text-sm">Uppercase letter</p>
											</div>
											<div
												:class="[
													!/[a-z]/.test(password)
														? 'text-scale-900'
														: 'text-scale-1100',
													'flex items-center gap-1 space-x-1.5 transition duration-200',
												]"
											>
												<svg
													v-if="!/[a-z]/.test(password)"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
													></path>
												</svg>
												<svg
													v-else
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
														fill-rule="evenodd"
														clip-rule="evenodd"
													></path>
												</svg>
												<p class="text-sm">Lowercase letter</p>
											</div>
											<div
												:class="[
													!/[0-9]/.test(password)
														? 'text-scale-900'
														: 'text-scale-1100',
													'flex items-center gap-1 space-x-1.5 transition duration-200',
												]"
											>
												<svg
													v-if="!/[0-9]/.test(password)"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
													></path>
												</svg>
												<svg
													v-else
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
														fill-rule="evenodd"
														clip-rule="evenodd"
													></path>
												</svg>
												<p class="text-sm">Number</p>
											</div>
											<div
												:class="[
													!/[!<>@#\$%]/.test(password)
														? 'text-scale-900'
														: 'text-scale-1100',
													'flex items-center gap-1 space-x-1.5 transition duration-200',
												]"
											>
												<svg
													v-if="!/[!<>@#\$%]/.test(password)"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
													></path>
												</svg>
												<svg
													v-else
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
														fill-rule="evenodd"
														clip-rule="evenodd"
													></path>
												</svg>
												<p class="text-sm">
													Special character (e.g. !?&lt;&gt;@#$%)
												</p>
											</div>
											<div
												:class="[
													password.length < 7
														? 'text-scale-900'
														: 'text-scale-1100',
													'flex items-center gap-1 space-x-1.5 transition duration-200',
												]"
											>
												<svg
													v-if="password.length < 7"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													stroke="currentColor"
													stroke-width="1.5"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
													></path>
												</svg>
												<svg
													v-else
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
													class="h-4 w-4"
												>
													<path
														d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
														fill-rule="evenodd"
														clip-rule="evenodd"
													></path>
												</svg>
												<p class="text-sm">&gt; 7 characters</p>
											</div>
										</div>
									</div>

									<button
										type="submit"
										class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-4 py-2 text-center text-base text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
										:disabled="!passwordValid.isValid"
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

										<span class="truncate">{{ 'Sign Up' }}</span>
									</button>
								</div>
							</form>
						</div>
					</div>
					<div class="my-8 self-center text-sm">
						<span class="text-scale-1000">Have an account?</span>
						<a
							class="text-scale-1200 hover:text-scale-1100 underline transition"
							href="/login"
							>Sign In Now</a
						>
					</div>
				</div>
				<div class="sm:text-center">
					<p class="text-scale-900 text-xs sm:mx-auto sm:max-w-sm">
						By continuing, you agree to Motis Group's<!-- -->
						<a
							class="hover:text-scale-1100 underline"
							href="https://Motis Group.com/terms"
							>Terms of Service</a
						>
						<!-- -->and<!-- -->
						<a
							class="hover:text-scale-1100 underline"
							href="https://Motis Group.com/privacy"
							>Privacy Policy</a
						>, and to receive periodic emails with updates.
					</p>
				</div>
			</main>
			<aside
				class="hidden flex-1 flex-shrink basis-1/4 flex-col items-center justify-center xl:flex"
			>
				<div class="relative flex flex-col gap-6">
					<div class="absolute -left-11 -top-12 select-none">
						<span class="text-scale-600 text-[160px] leading-none">“</span>
					</div>
					<blockquote class="z-10 max-w-lg text-3xl">
						Y'all @Motis Group + @nextjs is amazing! 🙌 Barely an hour into a
						proof-of-concept and already have most of the functionality in
						place. 🤯🤯🤯
					</blockquote>
					<a
						href="https://twitter.com/justinjunodev/status/1500264302749622273"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-4"
						><img
							src="https://Motis Group.com/images/twitter-profiles/9k_ZB9OO_400x400.jpg"
							alt="justinjunodev"
							class="h-12 w-12 rounded-full"
						/>
						<div class="flex flex-col">
							<cite
								class="text-scale-1100 whitespace-nowrap font-medium not-italic"
								>@justinjunodev</cite
							>
						</div></a
					>
				</div>
			</aside>
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
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<LoadingModalSmall
				v-if="loading"
				:title="'Signing up...'"
				:description="''"
			/>
		</transition>
	</div>
</template>
