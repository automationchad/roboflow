export default defineNuxtRouteMiddleware((to, _from) => {
	if ((to.path !== '/' && to.path !== '/password' && to.path !== '/login') || to.path.includes('protectedRoute')) {
		const user = useSupabaseUser();
		if (user.value) {
			return;
		}
		return navigateTo('/');
	}
});
