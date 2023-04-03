import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { format } from 'date-fns';

const test = false;

const tray_key = test
	? 'bf2d37099d0b4d59bdf52ee88f05faef222946f102064753abc50be648775156'
	: 'c872e7dfb9404c1a8c29757b8e5715e0d20af44d95264c819be3fdab09f1f447';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);
	const { data: User, error: userError } = await supabase
		.from('User')
		.select('systemRole,Account(trayWorkspaceId)')
		.eq('id', user.id)
		.limit(1)
		.single();

	var date = new Date(Date.now());
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	var d = new Date(new Date().getFullYear(), 0, 1);

	let filters = {};
	if (User.systemRole === 'super_admin') {
	} else {
		filters = {
			workspaces: [User.Account.trayWorkspaceId],
		};
	}

	const { data: response } = await $fetch(
		'https://api.tray.io/insights/v1/executions/kpis',
		{
			method: 'post',
			headers: {
				Authorization: `Bearer ${tray_key}`,
				'Content-Type': 'application/json',
			},
			body: {
				endPeriod: new Date(Date.now()),
				filters,
				startPeriod: firstDay,
			},
		}
	);
	const data = response.kpis.reduce((obj, item) => {
		obj[item.name] = item.value;
		return obj;
	}, {});
	return data;
});
