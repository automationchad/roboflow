import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);
	const currentDate = new Date();
	const firstDay = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

	const tray_key = process.env.TRAY_IM_KEY;

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
