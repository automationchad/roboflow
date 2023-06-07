export default defineNuxtRouteMiddleware(async (to, from) => {
	const user = useSupabaseUser();

	if (
		(to.path !== '/' && to.path !== '/password' && to.path !== '/login') ||
		to.path.includes('protectedRoute')
	) {
		if (user.value) {
			return;
		}
		return navigateTo('/login');
	}
});
