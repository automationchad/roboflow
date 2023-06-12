<script setup>
	definePageMeta({ layout: 'public' });

	const route = useRoute();

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

	const token = route.params.token;

	if (!token) {
		navigateTo('/invitation-not-found');
	}

	const getData = async () => {
		try {
			const { data: invitationData, error: invitationError } = await supabase
				.from('Invitation')
				.select('*,Account(name),User(email)')
				.eq('token', token)
				.limit(1)
				.single();

			if (invitationError) {
				navigateTo('/invitation-not-found');
				throw new Error(invitationError);
			}

			invitedBy.value = invitationData.User.email;
			orgName.value = invitationData.Account.name;

			if (
				!invitationData ||
				invitationData.status !== 'pending' ||
				invitationData.expires < new Date(Date.now())
			) {
				navigateTo('/invitation-not-found');
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
					navigateTo('/dashboard/projects');
					throw new Error('User already exists with organization');
				}

				const { error: userUpdateError } = await supabase
					.from('User')
					.update({ accountId: invitationData.account })
					.eq('id', user.value.id);

				if (userUpdateError) {
					throw new Error(
						userUpdateError.message || userUpdateError.toString()
					);
				}

				const { error: invitationDeleteError } = await supabase
					.from('Invitation')
					.delete()
					.eq('id', invitationData.id);

				if (invitationDeleteError) {
					throw new Error(
						invitationDeleteError.message || invitationDeleteError.toString()
					);
				}
				navigateTo('/dashboard/projects');
			}
		} catch (error) {
			console.error(error.message);
			// navigateTo('/invitation-not-found');
		}
	};

	onMounted(async () => {
		await getData();
	});

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
								v-if="!sameEmail && user"
								class="text-scale-1100 flex flex-col items-center justify-center gap-3 text-sm"
							>
								<p>
									Your email address {{ user.email }} does not match the email
									address this invitation was sent to.
								</p>
								<p class="text-scale-900">
									To accept this invitation, you will need to
									<button class="cursor-pointer text-indigo-500">
										sign out
									</button>
									and then create a new account.
								</p>
							</div>
							<div
								v-else
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
									<NuxtLink @click="signOut" :to="`/login?returnTo=${token}`"
										><div
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										>
											<span class="truncate">Sign in</span>
										</div></NuxtLink
									><NuxtLink @click="signOut" :to="`/?returnTo=${token}`"
										><div
											class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
										>
											<span class="truncate">Create an account</span>
										</div></NuxtLink
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
