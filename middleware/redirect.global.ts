export default defineNuxtRouteMiddleware(async (to, from) => {
	try {
		const user = useSupabaseUser();
		const supabase = useSupabaseClient();

		if (user.value) {
			let { data: userData, error: userError } = await supabase
				.from('User')
				.select(
					'defaultTeamId,accountId,Account(id,type,hasCompletedOnboarding)'
				)
				.eq('id', user.value.id)
				.limit(1)
				.single();

			if (userError) {
				console.error('Error retrieving user:', userError);
				// Redirect to an error page or log the user out
				return navigateTo('/error');
			}

			if (to.path.includes('/join-organization')) {
				return navigateTo(`/dashboard/projects`);
			}

			if (
				userData?.Account.type !== 'super_admin' &&
				to.params.organization !== undefined &&
				to.params.organization !== userData?.Account.id
			) {
				// If the user is not a super admin, redirect them to a "not authorized" page
				return navigateTo('/not-authorized');
			}

			const org_id = userData.Account.id;

			if (
				!userData.Account.hasCompletedOnboarding &&
				to.path !== `/${org_id}/onboarding`
			) {
				// If the user has not completed onboarding, redirect them to the onboarding page
				return navigateTo(`/${org_id}/onboarding`);
			} else if (
				to.path === `/${org_id}/onboarding` &&
				userData.Account.hasCompletedOnboarding
			) {
				// If the user has completed onboarding, redirect them to the dashboard
				return navigateTo(`/dashboard/projects`);
			}
		}
	} catch (error) {
		console.error('An error occurred in the route middleware:', error);
		// Redirect to an error page
		return navigateTo('/error');
	}
});
