import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { format } from 'date-fns';

const test = true;

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);
	const currentDate = new Date();
	const firstDay = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

	const tray_key = process.env.TRAY_IM_KEY;

	const { id } = event.context.params;
	const filters = id != 'null' ? { workspaces: [id] } : {};

	const response = await $fetch(
		'https://api.tray.io/insights/v1/executions/timeseries',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${tray_key}`,
				'Content-Type': 'application/json',
				// 'x-tray-admin-impersonate': '50db4b31-139a-4e2f-80c2-030479fcf96e',
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

	data.pop();

	const count = data.reduce((acc, curr) => {
		return typeof curr.value === 'number' ? acc + curr.value : acc;
	}, 0);

	return { data, count };
});
