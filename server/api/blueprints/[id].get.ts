import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const client = serverSupabaseClient(event);
	let { data: blueprint } = await client
		.from('products')
		.select('*')
		.eq('id', event.context.params.id)
		.eq('type', 'blueprint')
		.eq('active', true)
		.limit(1)
		.single();

	const { data: images } = await client.storage
		.from('images')
		.list(`blueprints/${event.context.params.id}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});

	blueprint.images = images
		.filter((o) => o.name !== '.emptyFolderPlaceholder')
		.map((o) => {
			return {
				url: `${process.env.SUPABASE_URL}/storage/v1/object/public/images/blueprints/${event.context.params.id}/${o.name}`,
				alt: o.name,
			};
		});

	const { data: documentation } = await client.storage
		.from('files')
		.list(`blueprints/${event.context.params.id}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});

	blueprint.documentation = documentation
		.filter((o) => o.name !== '.emptyFolderPlaceholder')
		.map((o) => {
			return {
				url: `${process.env.SUPABASE_URL}/storage/v1/object/public/files/blueprints/${event.context.params.id}/${o.name}`,
				alt: o.name,
			};
		});
	return { data: blueprint };
});
