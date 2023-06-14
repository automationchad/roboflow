<template>
	<div class="bg-scale-100 flex flex-1 flex-col">
		<div class="absolute top-0 mx-auto w-full px-8 pt-6 sm:px-6 lg:px-8">
			<nav class="relative flex items-center justify-between sm:h-10">
				<div class="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
					<div class="flex w-full items-center justify-between md:w-auto">
						<a href="https://supabase.com"
							><span
								style="
									box-sizing: border-box;
									display: inline-block;
									overflow: hidden;
									width: initial;
									height: initial;
									background: none;
									opacity: 1;
									border: 0px;
									margin: 0px;
									padding: 0px;
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
										border: 0px;
										margin: 0px;
										padding: 0px;
										max-width: 100%;
									"
									><img
										alt=""
										aria-hidden="true"
										src="~/assets/images/logo.png"
										class="h-8 w-auto sm:h-10"
										style="
											display: block;
											background: none;
											opacity: 1;
											border: 0px;
											margin: 0px;
											padding: 0px;
										" /></span></span
						></a>
					</div>
				</div>
				<div class="hidden items-center space-x-3 md:ml-10 md:flex md:pr-4">
					<a target="_blank" rel="noreferrer" href="https://supabase.com/docs"
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
						<h1 class="mb-2 mt-8 text-2xl lg:text-3xl">Welcome back</h1>
						<h2 class="text-scale-1100 text-sm">Sign in to your account</h2>
					</div>
					<div class="flex flex-col gap-5">
						<button
							class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-4 py-2 text-center text-base shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="sbui-icon"
							>
								<path
									d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
								></path></svg
							><span class="truncate">Continue with GitHub</span></button
						><a href="/dashboard/sign-in-sso"
							><button
								class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded bg-transparent px-4 py-2 text-center text-base shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon"
								>
									<rect
										x="3"
										y="11"
										width="18"
										height="11"
										rx="2"
										ry="2"
									></rect>
									<path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg
								><span class="truncate">Continue with SSO</span>
							</button></a
						>
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
						<form id="signIn-form">
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
													value="tracy@motis.group"
													push::1.36.10::listener="1"
												/>
												<div
													data-lastpass-icon-root="true"
													style="
														position: relative !important;
														height: 0px !important;
														width: 0px !important;
														float: left !important;
													"
												></div>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
									</div>
								</div>
								<div class="relative">
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
														autocomplete="current-password"
														id="password"
														name="password"
														placeholder="••••••••"
														type="password"
														class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
														value="jJ8zld&amp;e^#Ey2mA%"
														push::1.36.10::listener="1"
													/>
													<div
														data-lastpass-icon-root="true"
														style="
															position: relative !important;
															height: 0px !important;
															width: 0px !important;
															float: left !important;
														"
													></div>
												</div>
											</div>
											<p
												data-state="hide"
												class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
											></p>
										</div>
									</div>
									<a
										class="text-scale-900 absolute right-0 top-0 text-sm"
										href="/dashboard/forgot-password"
										push::1.36.10::listener="1"
										>Forgot Password?</a
									>
								</div>
								<div class="self-center">
									<div>
										<iframe
											src="https://newassets.hcaptcha.com/captcha/v1/37e8b5f/static/hcaptcha.html#frame=checkbox&amp;id=1tone9e80eid&amp;host=supabase.com&amp;sentry=true&amp;reportapi=https%3A%2F%2Faccounts.hcaptcha.com&amp;recaptchacompat=true&amp;custom=false&amp;hl=en&amp;tplinks=on&amp;sitekey=4ca1fdb9-c9c9-4495-ba50-c85fc0e7ec1f&amp;size=invisible&amp;theme=light&amp;origin=https%3A%2F%2Fsupabase.com"
											tabindex="0"
											frameborder="0"
											scrolling="no"
											title="Widget containing checkbox for hCaptcha security challenge"
											aria-hidden="true"
											data-hcaptcha-widget-id="1tone9e80eid"
											data-hcaptcha-response=""
											style="display: none"
										></iframe
										><textarea
											id="g-recaptcha-response-1tone9e80eid"
											name="g-recaptcha-response"
											style="display: none"
										></textarea
										><textarea
											id="h-captcha-response-1tone9e80eid"
											name="h-captcha-response"
											style="display: none"
										></textarea>
									</div>
								</div>
								<button
									form="signIn-form"
									class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-4 py-2 text-center text-base text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="submit"
									@keyup.enter="login()"
									@click="login()"
								>
									<span class="truncate">Sign In</span>
								</button>
							</div>
						</form>
					</div>
					<div class="my-8 self-center text-sm">
						<div>
							<span class="text-scale-1000">Don't have an account?</span>
							<a
								class="text-scale-1200 hover:text-scale-1100 underline transition"
								href="/"
								>Sign Up Now</a
							>
						</div>
					</div>
				</div>
				<div class="sm:text-center">
					<p class="text-scale-900 text-xs sm:mx-auto sm:max-w-sm">
						By continuing, you agree to Motis Group's
						<a
							class="hover:text-scale-1100 underline"
							href="https://supabase.com/terms"
							>Terms of Service</a
						>
						and
						<a
							class="hover:text-scale-1100 underline"
							href="https://supabase.com/privacy"
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
						Working with Motis Group has been one of the best dev experiences
						I've had lately. Incredibly easy to set up, great documentation, and
						so many fewer hoops to jump through than the competition. I
						definitely plan to use it on any and all future projects.
					</blockquote>
					<a
						href="https://twitter.com/thatguy_tex/status/1497602628410388480"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-4"
						><img
							src="https://supabase.com/images/twitter-profiles/09HouOSt_400x400.jpg"
							alt="thatguy_tex"
							class="h-12 w-12 rounded-full"
						/>
						<div class="flex flex-col">
							<cite
								class="text-scale-1100 whitespace-nowrap font-medium not-italic"
								>@thatguy_tex</cite
							>
						</div></a
					>
				</div>
			</aside>
		</div>
	</div>
</template>

<script setup>
	import { XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';

	definePageMeta({ layout: 'public', middleware: ['auth'] });

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const email = ref('');
	const password = ref('');
	const is_error = ref(false);
	const loading = ref(false);
	const error_message = ref('');

	const route = useRoute();
	const router = useRouter();

	const base_url = 'https://app.motis.group';

	const test_url = 'http://localhost:3000';

	const test = true;

	const redirectTo = route.query.returnTo
		? `${test ? test_url : base_url}/join/${route.query.returnTo}`
		: `${test ? test_url : base_url}/dashboard/projects`;

	const login = async () => {
		loading.value = true;
		const { user, error } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value,
			options: {
				emailRedirectTo: redirectTo,
			},
		});
		if (error != null) {
			loading.value = false;
			is_error.value = true;
			error_message.value = error;
		}
		console.log('error', error);
	};

	const handleLoginProvider = async (provider) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: redirectTo,
			},
		});
		if (error != null) {
			is_error.value = true;
			error_message.value = error;
		}
		console.log('error', error);
	};

	onMounted(() => {
		watchEffect(async () => {
			if (user.value) {
				const { data: user_data, error } = await supabase
					.from('User')
					.select('accountId')
					.eq('id', user.value.id)
					.limit(1)
					.single();
				if (error) {
					console.log(error);
					return;
				} else if (user_data.accountId) {
					router.push(`/dashboard/projects`);
				} else {
					router.push(`/dashboard/new`);
				}
			}
		});
	});
</script>
