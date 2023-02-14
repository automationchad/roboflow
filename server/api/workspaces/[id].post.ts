import { serverSupabaseUser } from '#supabase/server';
import { createClient } from '@supabase/supabase-js';
const supabase_url = 'https://nsfipxnlucvgchlkqvqw.supabase.co';
const anon_key =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZmlweG5sdWN2Z2NobGtxdnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NjA0MzgsImV4cCI6MTk5MDQzNjQzOH0.ieuplz2wsoohp3BSuHsm9BNNlAIWHZqGnd2kBLcpQbk';
const client = createClient(supabase_url, anon_key);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	let newArr = body.workspace.templates;
	newArr.push(body.blueprint.tray_project_id);
	const before_length = newArr.length;
	newArr = [...new Set(newArr)];
	const after_length = newArr.length;

	const { error: upsert_error } = await client
		.from('workspaces')
		.update({ templates: newArr })
		.eq('id', body.workspace.id);

	const { data: tray } = await $fetch(
		'https://bbdf8feb-cc29-4044-be80-9b9107c3c051.trayapp.io',
		{
			method: 'post',
			body: {
        user: body.user,
				workspace_id: body.workspace.tray_workspace_id,
				template_id: body.blueprint.tray_project_id,
				duplicates: after_length < before_length,
			},
		}
	);

	return { upsert_error };
});
