import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { format } from 'date-fns';

const test = false;

const tray_key = test
	? 'bf2d37099d0b4d59bdf52ee88f05faef222946f102064753abc50be648775156'
	: 'c872e7dfb9404c1a8c29757b8e5715e0d20af44d95264c819be3fdab09f1f447';

export default defineEventHandler(async (event) => {
	const currentDate = new Date();
	const firstDay = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);

	const { id } = event.context.params;
	const filters = id !== 'null' ? { workspaces: [id] } : {};

	const response = await $fetch(
		'https://api.tray.io/insights/v1/executions/timeseries',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tray_key}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				endPeriod: currentDate,
				filters,
				metric: 'TASK_RUNS',
				startPeriod: firstDay,
			}),
		}
	);

	const data = Object.values(
		response.data.timeseries
			.flatMap((o) =>
				o.series.map(({ value }) => ({
					date: value[0],
					value: value[1],
				}))
			)
			.reduce((acc, { date, value }) => {
				const formattedDate = date.split('T')[0];
				if (!acc[formattedDate]) {
					acc[formattedDate] = { date: formattedDate, value: 0 };
				}
				acc[formattedDate].value += value;
				return acc;
			}, {})
	).map(({ date, value }) => ({
		date: format(new Date(date), 'dd MMM'),
		value,
	}));

	return data;
});
