import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const client = serverSupabaseClient(event);
	let { data: components, error } = await client
		.from('products')
		.select('*')
		.eq('type', 'component')
		.eq('active', true);

	for (let component of components) {
		const { data: images } = await client.storage
			.from('images')
			.list(`blueprints/${component.id}`, {
				limit: 3,
				offset: 0,
				sortBy: { column: 'name', order: 'asc' },
			});
		component.images = images
			?.filter((o) => o.name !== '.emptyFolderPlaceholder')
			.map((o) => {
				return {
					url: `${process.env.SUPABASE_URL}/storage/v1/object/public/images/blueprints/${component.id}/${o.name}`,
					alt: o.name,
				};
			});
	}
	return { data: components };
});
