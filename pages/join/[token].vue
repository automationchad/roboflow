<template>
	<div class="h-screen" v-if="false">
		<div
			class="grid h-full grid-cols-1 items-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24"
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
						<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
										class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
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
										class="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6"
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

							<div class="sm:col-span-2">
								<button
									:disabled="loading"
									@keyup.enter="signUp()"
									@click="signUp()"
									class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
				:title="success_message"
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

	<div
		class="bg-scale-200 flex h-full min-h-screen w-full flex-col place-items-center items-center justify-center gap-8 px-5"
	>
		<a class="flex items-center justify-center gap-4" href="/projects"
			><img
				src="~/assets/images/logo.png"
				alt="Motis Group"
				class="block h-[24px] cursor-pointer rounded"
		/></a>
		<div
			class="border-scale-400 bg-scale-100 mx-auto overflow-hidden rounded-md border text-center shadow md:w-[400px]"
		>
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div class="flex flex-col gap-2 px-6 py-8">
						<p class="text-scale-1200 text-sm">You have been invited to join</p>
						<p class="text-scale-1200 text-3xl">{{ orgName }}</p>
						<p class="text-scale-900 text-sm">an organization on Motis</p>
						<p class="text-xs text-slate-500">Invited by: {{ invitedBy }}</p>
					</div>
					<div class="border-scale-400 bg-scale-100 border-t" v-if="sameEmail">
						<div class="flex flex-col gap-4 px-6 py-4">
							<div
								class="text-scale-1100 flex flex-col items-center justify-center gap-3 text-sm"
							>
								<p>
									Your email address will.marzella@tray.io does not match the
									email address this invitation was sent to.
								</p>
								<p class="text-scale-900">
									To accept this invitation, you will need to
									<button class="text-indigo-500 cursor-pointer">sign out</button> and then
									create a new account.
								</p>
							</div>
							<div class="flex flex-col gap-3">
								<p class="text-scale-900 text-xs">
									You will need to sign in to accept this invitation
								</p>
								<div class="flex justify-center gap-3">
									<a
										href="/?returnTo=%2Fjoin%3Ftoken%3Dyfckp-kublo-oxrso-pjxxx%26slug%3Dgujvascqmaqhbcsazlwd"
										><button
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<span class="truncate">Sign in</span>
										</button></a
									><a
										href="/?returnTo=%2Fjoin%3Ftoken%3Dyfckp-kublo-oxrso-pjxxx%26slug%3Dgujvascqmaqhbcsazlwd"
										><button
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<span class="truncate">Create an account</span>
										</button></a
									>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="border-scale-400 bg-scale-100 border-t">
						<div class="flex flex-col gap-4 px-6 py-4">
							<div
								class="text-scale-1100 flex flex-col items-center justify-center gap-3 text-sm"
							>
								<p>
									There was an error requesting details for this invitation.
								</p>
							</div>
							<div class="flex flex-col gap-3">
								<p class="text-scale-900 text-xs">
									You will need to sign in to accept this invitation
								</p>
								<div class="flex justify-center gap-3">
									<a
										href="/?returnTo=%2Fjoin%3Ftoken%3Dyfckp-kublo-oxrso-pjxxx%26slug%3Dgujvascqmaqhbcsazlwd"
										><button
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<span class="truncate">Sign in</span>
										</button></a
									><a
										href="/?returnTo=%2Fjoin%3Ftoken%3Dyfckp-kublo-oxrso-pjxxx%26slug%3Dgujvascqmaqhbcsazlwd"
										><button
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											type="button"
										>
											<span class="truncate">Create an account</span>
										</button></a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div
		class="bg-scale-200 flex h-full min-h-screen w-full flex-col place-items-center items-center justify-center gap-8 px-5"
	>
		<a class="flex items-center justify-center gap-4" href="/projects"
			><img
				src="/img/supabase-logo.svg"
				alt="Supabase"
				class="block h-[24px] cursor-pointer rounded"
		/></a>
		<div
			class="border-scale-400 bg-scale-100 mx-auto overflow-hidden rounded-md border text-center shadow md:w-[400px]"
		>
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div class="flex flex-col gap-2 px-6 py-8">
						<p class="text-scale-1200 text-sm">You have been invited to join</p>
						<p class="text-3xl text-slate-300">{{ orgName }}</p>
						<p class="text-scale-900 text-sm">an organization on Supabase</p>
						<p class="text-scale-900 text-xs">
							organization slug: gujvascqmaqhbcsazlwd
						</p>
					</div>
					<div class="border-scale-400 bg-scale-100 border-t">
						<div class="flex flex-col gap-4 px-6 py-4">
							<div
								class="text-scale-1100 flex flex-col items-center justify-center gap-3 text-sm"
							>
								<p>
									Your email address will.marzella@tray.io does not match the
									email address this invitation was sent to.
								</p>
								<p class="text-scale-900">
									To accept this invitation, you will need to
									<a class="text-brand-900 cursor-pointer">sign out</a> and then
									sign in or create a new account using the same email address
									used in the invitation.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({ layout: 'public', middleware: ['auth'] });

	import { XCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid';
	const route = useRoute();
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();
	const invitation = ref(null);
	const email = ref('');
	const password = ref('');

	const first_name = ref('');
	const last_name = ref('');
	const is_success = ref(false);
	const is_error = ref(false);
	const error_message = ref('');
	const success_message = ref('');
	const loading = ref(false);

	const sameEmail = ref(false);

	const invitedBy = ref('');
	const orgName = ref('');

	const token = route.params.token;

	const getData = async () => {
		try {
			if (user.value) {
				sameEmail.value = true;
			}
			const { data: invitationData, error: invitationError } = await supabase
				.from('Invitation')
				.select('*,Account(name),User(email)')
				.eq('token', token)
				.single();
			if (invitationError) {
				throw new Error(invitationError);
			}
			if (
				!invitationData ||
				invitationData.status !== 'pending' ||
				invitationData.expires < new Date(Date.now())
			) {
				throw new Error('Invitation not found');
			}

			invitedBy.value = invitationData.User.email;
			orgName.value = invitationData.Account.name;
		} catch (error) {
			console.error(error);
			navigateTo('/invitation-not-found');
		}
	};

	await getData();

	// if (!token) {
	// 	navigateTo('/invitation-not-found');
	// }

	// onMounted(async () => {
	// 	try {
	// 		const { data, error } = await supabase
	// 			.from('Invitation')
	// 			.select('*')
	// 			.eq('token', token)
	// 			.single();
	// 		if (error) {
	// 			console.error(error);
	// 			navigateTo('/invitation-not-found');
	// 			return;
	// 		}
	// 		if (
	// 			!data ||
	// 			data.status !== 'pending' ||
	// 			data.expires < new Date(Date.now())
	// 		) {
	// 			navigateTo('/invitation-not-found');
	// 			return;
	// 		}
	// 		invitation.value = data;
	// 	} catch (err) {
	// 		console.error(err);
	// 		navigateTo('/invitation-not-found');
	// 	}
	// });

	// onMounted(() => {
	// 	watchEffect(async () => {
	// 		if (user.value) {
	// 			navigateTo(`/invitation-not-found`);
	// 		}
	// 	});
	// });

	const signUp = async () => {
		try {
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
				error_message.value = error.message;
				alert(error.message);
				return;
			}

			loading.value = false;
			is_success.value = true;
			success_message.value = 'Account created successfully!';

			const { error: updateError } = await supabase
				.from('Invitation')
				.delete()
				.eq('id', invitation.value.id);

			if (updateError) {
				is_error.value = true;
				error_message.value = updateError.message;
				console.error(updateError);
				return;
			}
		} catch (err) {
			console.error(err);
			is_error.value = true;
			error_message.value = err.message;
		}
	};
</script>
