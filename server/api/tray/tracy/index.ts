import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { format } from 'date-fns';

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);

	const url = 'https://4eda75de-ddba-49df-8550-766d1b91f0f1.trayapp.io';

	const body = await readBody(event);

	const response = await $fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});
	const result = await response;
	return result;

	return { response };
});
