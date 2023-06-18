import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { format } from 'date-fns';

export default defineEventHandler(async (event) => {
	const tray_key = process.env.TRAY_IM_KEY;
	const body = await readBody(event);

	const response = await $fetch(
		'https://862ee363-f3b2-4baf-9b75-36efed6c63fe.trayapp.io',
		{
			method: 'POST',
			body,
		}
	);
	return response;
});
