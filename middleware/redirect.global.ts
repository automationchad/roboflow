export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = await useSupabaseUser();
	const supabase = await useSupabaseClient();

	if (user.value) {
		let { data: User, error: userError } = await supabase
			.from('User')
			.select('defaultTeamId,accountId,Account(type)')
			.eq('id', user.value.id)
			.limit(1)
			.single();

		const org_id = User?.accountId;
		const team_id =
			User?.Account.type === 'super_admin'
				? User.accountId
				: User?.defaultTeamId;

		if (to.path === '/documentation') {
			return navigateTo(`/${org_id}/documentation`);
		} else if (to.path === '/dashboard') {
			return navigateTo(`/${org_id}/dashboard`);
		} else if (to.path === '/settings/billing') {
			return navigateTo(`/${org_id}/settings/billing`);
		} else if (to.path === '/settings/billing/update') {
			return navigateTo(`/${org_id}/settings/billing/update`);
		} else if (to.path === '/tickets') {
			return navigateTo(`/${team_id}/tickets`);
		}
	}
});
