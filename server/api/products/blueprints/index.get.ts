import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const client = serverSupabaseClient(event);
	let { data: blueprints, error } = await client
		.from('products')
		.select('*')
		.eq('type', 'blueprint')
		.eq('active', true)
		.order('updated_at', { ascending: false });

	for (let blueprint of blueprints) {
		const { data: images } = await client.storage
			.from('images')
			.list(`blueprints/${blueprint.id}`, {
				limit: 3,
				offset: 0,
				sortBy: { column: 'name', order: 'asc' },
			}) ?? [];
		blueprint.images = images
			.filter((o) => o.name !== '.emptyFolderPlaceholder')
			.map((o) => {
				return {
					url: `${process.env.SUPABASE_URL}/storage/v1/object/public/images/blueprints/${blueprint.id}/${o.name}`,
					alt: o.name,
				};
			});
	}
	return { data: blueprints };
});
