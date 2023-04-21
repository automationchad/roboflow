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

	const tray_key = User.Account
		? 'd65c23cd63324565b2541cd6fad80f585510039a5d3d4bd59b3021f7ef97c268'
		: 'd65c23cd63324565b2541cd6fad80f585510039a5d3d4bd59b3021f7ef97c268';
	const { id } = event.context.params;
	const filters = id !== 'null' ? { workspaces: [id] } : {};

	const { data } = await $fetch(
		'https://api.tray.io/insights/v1/executions/timeseries',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tray_key}`,
			},
			body: JSON.stringify({
				metric: 'WORKFLOW_EXECUTIONS',
				startPeriod: firstDay,
				endPeriod: currentDate,
				filters,
			}),
		}
	);

	const response = data.timeseries
		.map((obj) => {
			const { series, ...rest } = obj;
			return rest;
		})
		.reduce((acc, curr) => {
			acc[curr.name] = curr.totalValue;
			return acc;
		}, {});

	const count = Object.values(response).reduce((acc, curr) => {
		return typeof curr === 'number' ? acc + curr : acc;
	}, 0);

	return { response, count };
});
