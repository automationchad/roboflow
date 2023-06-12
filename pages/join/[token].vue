<script setup>
	import { is } from 'date-fns/locale';

	definePageMeta({ layout: 'public' });

	const route = useRoute();
	const router = useRouter();

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const is_success = ref(false);
	const is_error = ref(false);
	const error_message = ref('');
	const success_message = ref('');
	const loading = ref(false);

	const sameEmail = ref(false);

	const invitedBy = ref('');
	const orgName = ref('');
	const orgId = ref(null);
	const inviteId = ref(null);

	const token = route.params.token;

	// const navigateTo = async (path) => {
	// 	await router.push(path).catch((err) => {
	// 		if (err.name !== 'NavigationDuplicated') {
	// 			console.error(err);
	// 		}
	// 	});
	// };

	const { data: userData, error: userError } = await supabase
		.from('User')
		.select('accountId')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	if (userError) {
		throw new Error(userError.message || userError.toString());
	}

	if (userData.accountId !== null) {
		router.push('/dashboard/projects');
	}

	const acceptInvite = async () => {
		try {
			loading.value = true;
			const { error: userUpdateError } = await supabase
				.from('User')
				.update({ accountId: orgId.value })
				.eq('id', user.value.id);

			if (userUpdateError) {
				throw new Error(userUpdateError.message || userUpdateError.toString());
			}

			const { error: invitationDeleteError } = await supabase
				.from('Invitation')
				.delete()
				.eq('id', inviteId.value);

			if (invitationDeleteError) {
				throw new Error(
					invitationDeleteError.message || invitationDeleteError.toString()
				);
			}
			is_success.value = true;
			success_message.value = 'Invitation accepted';
			loading.value = false;
			router.push('/dashboard/projects');
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message || error.toString();
			console.error(error);
			loading.value = false;
		}
	};

	const declineInvite = async () => {
		loading.value = true;
		try {
			const { error: invitationDeleteError } = await supabase
				.from('Invitation')
				.update({ status: 'declined' })
				.eq('id', invitationData.id);

			if (invitationDeleteError) {
				throw new Error(
					invitationDeleteError.message || invitationDeleteError.toString()
				);
			}
			// await navigateTo('/dashboard/projects');
		} catch (error) {
			console.error(error);
		}
	};

	const getData = async () => {
		try {
			if (!token) {
				throw new Error('No token provided');
			}

			const { data: invitationData, error: invitationError } = await supabase
				.from('Invitation')
				.select('*,Account(name),User(email)')
				.eq('token', token)
				.limit(1)
				.single();

			if (invitationError) {
				throw new Error(invitationError.message || invitationError.toString());
			}
			inviteId.value = invitationData.id;
			invitedBy.value = invitationData.User.email;
			orgName.value = invitationData.Account.name;
			orgId.value = invitationData.account;

			console.log(invitationData);

			if (
				!invitationData ||
				invitationData.status !== 'pending' ||
				new Date(invitationData.expires) < new Date(Date.now())
			) {
				throw new Error('Invitation not found');
			}

			if (user.value && user.value.email === invitationData.email) {
				sameEmail.value = true;
			}

			if (sameEmail.value) {
				const { data: userData, error: userError } = await supabase
					.from('User')
					.select('*')
					.eq('email', invitationData.email)
					.is('accountId', null);

				if (userError) {
					throw new Error(userError.message || userError.toString());
				}

				if (!userData) {
					throw new Error('User already exists with organization');
				}
			}
		} catch (error) {
			is_error.value = true;
			error_message.value = error.message.toString();
			console.error(error.message);
			// router.push('/invitation-not-found');
		}
	};

	await getData();

	watch(
		() => user.value,
		async (newValue, oldValue) => {
			// If the user is logged in
			if (newValue) {
				await getData();
				// Redirect to dashboard
			}
		},
		{ immediate: true } // This option will run the watcher immediately upon page load
	);

	const signOut = async () => {
		await supabase.auth.signOut();
	};

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
</script>

<template>
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
						<p class="text-scale-900 text-sm">an organization on Motis Group</p>
						<p class="text-xs text-slate-500">Invited by: {{ invitedBy }}</p>
					</div>
					<div class="border-scale-400 bg-scale-100 border-t">
						<div class="flex flex-col gap-4 px-6 py-4">
							<div
								v-if="!sameEmail"
								class="text-scale-1100 flex flex-col items-center justify-center gap-3 text-sm"
							>
								<p v-if="user">
									Your email address {{ user.email }} does not match the email
									address this invitation was sent to.
								</p>
								<p v-else>
									There was an error requesting details for this invitation.
								</p>
								<p class="text-scale-900">
									To accept this invitation, you will need to
									<button
										@click="signOut"
										class="cursor-pointer text-indigo-500"
									>
										sign out
									</button>
									and then create a new account.
								</p>
								<div class="flex flex-col gap-3">
									<p class="text-scale-900 text-xs">
										You will need to sign in to accept this invitation
									</p>
									<div class="flex justify-center gap-3">
										<NuxtLink :to="`/login?returnTo=${token}`"
											><div
												class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											>
												<span class="truncate">Sign in</span>
											</div></NuxtLink
										><NuxtLink :to="`/?returnTo=${token}`"
											><div
												class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
											>
												<span class="truncate">Create an account</span>
											</div></NuxtLink
										>
									</div>
								</div>
							</div>

							<div
								v-else-if="sameEmail && user"
								class="flex flex-row items-center justify-center gap-3"
							>
								<button
									@click="declineInvite"
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								>
									<span class="truncate">Decline</span></button
								><button
									@click="acceptInvite"
									class="font-regular bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-indigo-400 focus-visible:outline-4 focus-visible:outline-offset-1"
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
										<polyline points="9 11 12 14 22 4"></polyline>
										<path
											d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
										></path></svg
									><span class="truncate">Join organization</span>
								</button>
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

<style scoped>
	.bordershadow-scale-600 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #dfe3e6 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-1000 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #7375ed 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-900 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #e59fe9 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>
