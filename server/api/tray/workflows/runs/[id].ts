import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const currentDate = new Date();
	const firstDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	const test = false;
	const tray_key = test
		? 'bf2d37099d0b4d59bdf52ee88f05faef222946f102064753abc50be648775156'
		: 'c872e7dfb9404c1a8c29757b8e5715e0d20af44d95264c819be3fdab09f1f447';
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
