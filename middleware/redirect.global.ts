export default defineNuxtRouteMiddleware(async (to, from) => {
	try {
		const user = useSupabaseUser();
		const supabase = useSupabaseClient();

		// If user.value is null (user is not logged in), redirect to login
		// unless we're already trying to navigate from "/dashboard/new" to prevent a potential loop
		// if (
		// 	(to.path !== '/' && to.path !== '/password' && to.path !== '/login') ||
		// 	to.path.includes('protectedRoute')
		// ) {
		// 	if (user.value) {
		// 		return;
		// 	}
		// 	return navigateTo('/login');
		// }

		

		// if (userError) {
		// 	console.error('Error retrieving user:', userError);
		// 	// Redirect to an error page or log the user out
		// 	return navigateTo('/error');
		// }

		// // If the user does not have an account and they are coming from the login page, redirect them to create a new organization
		// // Added an additional check to ensure we're not already at '/dashboard/new' to prevent a potential infinite loop
		// // if (
		// // 	!userData?.accountId &&
		// // 	from.path === '/login' &&
		// // 	to.path !== '/dashboard/new'
		// // ) {
		// // 	console.log(
		// // 		'User does not have an associated Account, redirecting to create a new organization'
		// // 	);
		// // 	return navigateTo('/dashboard/new');
		// // }

		// let account = null;

		// if (userData?.accountId) {
		// 	const { data: accountData, error: accountError } = await supabase
		// 		.from('Account')
		// 		.select('id, type')
		// 		.eq('id', userData.accountId)
		// 		.limit(1)
		// 		.single();

		// 	account = accountData;
		// }

		// if (
		// 	account &&
		// 	account.type !== 'super_admin' &&
		// 	to.params.organization !== undefined &&
		// 	to.params.organization !== account.id
		// ) {
		// 	// If the user is not a super admin, redirect them to a "not authorized" page
		// 	return navigateTo('/dashboard/projects');
		// }
	} catch (error) {
		console.error('An error occurred in the route middleware:', error);
		// Redirect to an error page
		// return navigateTo('/error');
	}
});
