import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const query = await getQuery(event);
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);

	let { data: User, error: userError } = await supabase
		.from('User')
		.select('systemRole,defaultTeamId,Account(*,Subscription(*),Ticket(count))')
		.eq('id', user.id)
		.limit(1)
		.single();
	var date = new Date(Date.now());
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var d = new Date(new Date().getFullYear(), 0, 1);
	const test = false;
	const tray_key = test
		? 'bf2d37099d0b4d59bdf52ee88f05faef222946f102064753abc50be648775156'
		: 'c872e7dfb9404c1a8c29757b8e5715e0d20af44d95264c819be3fdab09f1f447';
	const filters =
		User?.Account.type === 'super_admin'
			? {}
			: { workspaces: [event.context.params.id] };
	const data = await $fetch('https://api.tray.io/insights/v1/list/workflows', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${tray_key}`,
		},
		body: {
			startPeriod: firstDay,
			endPeriod: new Date(Date.now()),
			first: 200,
			filters,
		},
	});
	return data;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
