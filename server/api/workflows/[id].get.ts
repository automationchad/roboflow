export default defineEventHandler(async (event) => {
	const query = await getQuery(event);
	var date = new Date(Date.now());
	var firstDay = new Date(date.getFullYear(), 1, 1);
	var d = new Date(new Date().getFullYear(), 0, 1);
	const filters = true ? { workspaces: [event.context.params.id] } : {};
	const data = await $fetch('https://api.tray.io/insights/v1/list/workflows', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer ee71577b6e594df68ab917b6b307c5cffc3bc015f2a34406a3d07b2a5ab0918b',
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
