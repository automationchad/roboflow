import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { format } from 'date-fns';

const test = true;

const tray_key = test
	? 'ca1703e63f9e4fe8829bfe8144f8cc5229f476511bc24288b514333311220b46'
	: 'c872e7dfb9404c1a8c29757b8e5715e0d20af44d95264c819be3fdab09f1f447';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);
	const currentDate = new Date();
	const firstDay = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

	const { id } = event.context.params;
	const filters = id !== 'null' ? { workspaces: [id] } : {};

	const tray_key = process.env.TRAY_IM_KEY;

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
