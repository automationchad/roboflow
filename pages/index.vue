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
							<div>
								<label
									for="first-name"
									class="block text-sm font-semibold leading-6"
									>First name</label
								>
								<div class="mt-2.5">
									<input
										v-model="first_name"
										required
										type="text"
										name="first-name"
										id="first-name"
										autocomplete="given-name"
										class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
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
										required
										name="last-name"
										id="last-name"
										autocomplete="family-name"
										class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
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
										required
										name="company"
										id="company"
										autocomplete="organization"
										class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
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
						<form
							id="signUp-form"
							class="pointer-events-none max-h-[100px] w-full overflow-y-hidden py-1 opacity-0 transition-all duration-500"
							push::1.36.4::listener="1"
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
													value="tracy@motis.group"
													push::1.36.4::listener="1"
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
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div
										class="col-span-12 flex flex-row justify-between space-x-2"
									>
										<label class="text-scale-1100 block text-sm" for="password"
											>Password</label
										>
									</div>
									<div class="col-span-12">
										<div class="">
											<div class="relative">
												<input
													autocomplete="new-password"
													id="password"
													name="password"
													placeholder="••••••••"
													type="password"
													class="text-scale-1200 focus:border-scale-900 focus:ring-scale-400 placeholder-scale-800 bg-scaleA-200 border-scale-700 box-border block w-full rounded-md border border px-4 py-2 text-sm shadow-sm outline-none transition-all focus:shadow-md focus:ring-2 focus:ring-current"
													value="z^@3C2HLm1iA4nuL"
													push::1.36.4::listener="1"
												/>
												<div
													class="absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1"
												>
													<button
														class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative !mr-1 inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														type="button"
														push::1.36.4::listener="1"
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
																d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
															></path>
															<circle cx="12" cy="12" r="3"></circle>
														</svg>
													</button>
												</div>
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
								<div
									class="duration-400 max-h-[500px] overflow-y-hidden transition-all"
								>
									<div class="text-sm">
										<div
											class="text-scale-1100 flex items-center gap-1 space-x-1.5 transition duration-200"
										>
											<svg
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
											class="text-scale-1100 flex items-center gap-1 space-x-1.5 transition duration-200"
										>
											<svg
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
											class="text-scale-1100 flex items-center gap-1 space-x-1.5 transition duration-200"
										>
											<svg
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
											class="text-scale-1100 flex items-center gap-1 space-x-1.5 transition duration-200"
										>
											<svg
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
											class="text-scale-1100 flex items-center gap-1 space-x-1.5 transition duration-200"
										>
											<svg
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
								<div class="self-center">
									<div>
										<iframe
											src="https://newassets.hcaptcha.com/captcha/v1/2220dfa/static/hcaptcha.html#frame=checkbox&amp;id=220ygdmg3gwr&amp;host=app.supabase.com&amp;sentry=true&amp;reportapi=https%3A%2F%2Faccounts.hcaptcha.com&amp;recaptchacompat=true&amp;custom=false&amp;hl=en&amp;tplinks=on&amp;sitekey=4ca1fdb9-c9c9-4495-ba50-c85fc0e7ec1f&amp;size=invisible&amp;theme=light&amp;origin=https%3A%2F%2Fapp.supabase.com"
											tabindex="0"
											frameborder="0"
											scrolling="no"
											title="Widget containing checkbox for hCaptcha security challenge"
											aria-hidden="true"
											data-hcaptcha-widget-id="220ygdmg3gwr"
											data-hcaptcha-response="P1_eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.hKdwYXNza2V5xQQb4T0cQMc6u8_47Egq6O5ApB7Xp3iG_LXqcZsgDl-UoFsXo_mKgZGEjOZ6C2aTzypQCOM7V1aU0A59noDimDaLS0wCP6cD4j0if9n8bu-HyrToyHsEKdpNEBDfPoN5tPWRWoU5sSya_aNGaLh56Yy_twhAI-3icd0dyiCqZEUgi1KamGI5O-GgV8p7RJpwZCiy-i7BTS3PP-BCx53x2u61fROh8DATAMBj-Fbli3myfzF3wTyjkzQCgjEjShWT7yGpd8IhuJr0SDniqm7K4d_-CuBQ8puMQ6nu5Bu4Y2wjvtSuBxwDloGd57JVJk5aKmlAGuI0OiH2cQtYqlKCj4jRKX5fk5ZwdX_yi5kcV1G0a6mtJPYxmg5MYJgp4wraUOMUvLNelzCqX83HJkVFWXem4zUjbULEgEbkhHWv1DPYxq28NNZOGaQEpBJf1BOEka2sexuiB990Bx1bC9THAT38VZrWlk3Fu_qFAzLYLlgdLp-dF3cnUcEIhXeAK64dDTRIQc0EcCRkLPOKEMngmwFCo0K5pu8JbcHKlrAngW1qWnlB-Y2JuWUJ4X0_-ak1OvMuDPhIjavY2RiUkA9NZrHq6oWWUyik4-XwEh2NJuFgsY4-hBUz8Adv1lKTvZpacLVleJzWGuiCRoMyBDiiUBzEF2ZHkXxv3OcR_MqUychZtzY9lzaLikVqP_6nkdkW5Sl1rKuUsQu9u3_fcN5gVDEI9PZhWDWVGDgcC6MI_G5OcGbTqAVyrSEoIVZ8mrQlgKrL6uzmZAC9ZUm_wFKoPwsS4tYFkbnPDRUHDHO0BluqzpWRlpWeI1muw6B_-xxLbjFLX4DtnLDx4gnRE7oHVDCjRUoW-5PB7224BFAj60NINfvEHEhfjgtU9qgLX-0XIFqr9YGJxtqVCe12xQ4Bfy3xO9qqHPtHvmUwtVtj8EK-yrPTgqEwYw100t4i5fdv-BEzaEVolFYSCPvHQUxESpGK7drqgw9rRXRQcpeRpHY52uCYbA15pd0l5uGdv-osgD4lljsrTHcn1BnFXHIqFoiio34V4STszXNy_Bs94cGNrIEpuy1uQF62aMB1nnkVboOygi0OsOIXRi-33T2XCT6tHnOy2opclVN5pPk3LiuKgB9FH6xCLvQRy5TCdiBb_aDNgFGgdU5Hw81Pcq5xHUr53SkFu7Idb_38SnUuwFQwGUORJVHz4dkOZGKUzzuVh0eWtl7LwTFhmoci3k_eI4LH9xJNxgfIl-0gAmfII4Ldwc1A3yvQ-RQ5dQN-nd97LEqAbpFs8ndlPwv4WHd4aAlo0rZZqSZkZbY6srzzXrlgbmx0_OLotJYnJ9BhGPs2vc8omKtqze58Iv3XNzqI-u9MS-D137wqZAQZ-Y8tuo-tAyy26mQgkU0y2dDKDaNleHDOZIYJKqhzaGFyZF9pZM4NO2QponBkAA.oZf0lhsdarcS3tiWchQSYY-h0E8gPmOgQ2YjBH7zjZw"
											style="display: none"
										></iframe
										><textarea
											id="g-recaptcha-response-220ygdmg3gwr"
											name="g-recaptcha-response"
											style="display: none"
										></textarea
										><textarea
											id="h-captcha-response-220ygdmg3gwr"
											name="h-captcha-response"
											style="display: none"
										></textarea>
									</div>
								</div>
								<button
									form="signUp-form"
									class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative flex inline-flex w-full cursor-pointer items-center items-center justify-center space-x-2 rounded px-4 py-2 text-center text-base text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="submit"
									push::1.36.4::listener="1"
								>
									<span class="truncate">Sign Up</span>
								</button>
							</div>
						</form>
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
		try {
			loading.value = true;

			const customer = await $fetch('/api/stripe/customer/create', {
				method: 'post',
				body: {
					email: email.value,
					company_name: company_name.value,
				},
			});

			if (!customer || customer.error) {
				throw new Error(
					customer.error ? customer.error : 'Error creating customer'
				);
			}

			const subscription = await $fetch('/api/stripe/subscription/create', {
				method: 'post',
				body: {
					customer,
				},
			});

			if (!subscription || subscription.error) {
				throw new Error(
					subscription.error
						? subscription.error
						: 'Error creating subscription'
				);
			}

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
				throw new Error(error);
			} else {
				loading.value = false;
				is_success.value = true;
			}
		} catch (err) {
			console.error(err);
			is_error.value = true;
			error_message.value = err.message;
			alert(err.message);
			loading.value = false;
		} finally {
			email.value = '';
			password.value = '';
			company_name.value = '';
			first_name.value = '';
			last_name.value = '';
		}
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
