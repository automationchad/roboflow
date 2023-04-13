import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { format } from 'date-fns';

const test = false;

const tray_key = test
	? 'bf2d37099d0b4d59bdf52ee88f05faef222946f102064753abc50be648775156'
	: 'c872e7dfb9404c1a8c29757b8e5715e0d20af44d95264c819be3fdab09f1f447';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);
	const currentDate = new Date();
	const firstDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);

	const { id } = event.context.params;
	const filters = id !== 'null' ? { workspaces: [id] } : {};

	const { data: response } = await $fetch(
		'https://api.tray.io/insights/v1/executions/kpis',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tray_key}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				endPeriod: currentDate,
				filters,
				startPeriod: firstDay,
			}),
		}
	);

	const data = response.kpis.reduce((obj, { name, value }) => {
		obj[name] = value;
		return obj;
	}, {});

	if (!data) {
		return {
			'Active Workflows': 0,
			'Data Volume': 0,
			'End Users': 0,
			'Solution Instances': 0,
			Solutions: 0,
			'Task Runs': 0,
		};
	} else return data;
});
