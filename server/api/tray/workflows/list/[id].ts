import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);
	const currentDate = new Date();
	const firstDay = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

	const { data: User } = await supabase
		.from('User')
		.select('id,Account(trayBearerToken)')
		.eq('id', user.id);

	const tray_key = User.Account.trayBearerToken
		? User.Account.trayBearerToken
		: 'c872e7dfb9404c1a8c29757b8e5715e0d20af44d95264c819be3fdab09f1f447';

	const { id } = event.context.params;
	const filters = id !== 'null' ? { workspaces: [id] } : {};

	const data = await $fetch('https://api.tray.io/insights/v1/list/workflows', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${tray_key}`,
		},
		body: JSON.stringify({
			startPeriod: firstDay,
			endPeriod: currentDate,
			first: 200,
			filters,
		}),
	});

	return data;
});
