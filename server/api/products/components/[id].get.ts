import { serverSupabaseClient } from '#supabase/server';

const getBlueprintById = async (uuid) => {
	const { data, error } = await client
		.from('products')
		.select('*')
		.eq('id', uuid)
		.eq('type', 'component')
		.eq('active', true)
		.limit(1)
		.single();
	return data;
};

const getImages = async (id) => {
	const { data, error } = await client.storage
		.from('images')
		.list(`blueprints/${id}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});
	if (data != null) {
		return data
			.filter((o) => o.name !== '.emptyFolderPlaceholder')
			.map((o) => {
				return {
					url: `${supabase_url}/storage/v1/object/public/images/blueprints/${id}/${o.name}`,
					alt: o.name,
				};
			});
	} else {
		alert('Error loading images');
		console.log(error);
	}
};

const getFiles = async (id) => {
	const { data, error } = await client.storage
		.from('files')
		.list(`blueprints/${id}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});
	if (data != null) {
		return data
			.filter((o) => o.name !== '.emptyFolderPlaceholder')
			.map((o) => {
				return {
					url: `${supabase_url}/storage/v1/object/public/files/blueprints/${id}/${o.name}`,
					alt: o.name,
				};
			});
	} else {
		alert('Error loading images');
		console.log(error);
	}
};

export default defineEventHandler(async (event) => {
	const client = serverSupabaseClient(event);
	let { data: component } = await client
		.from('products')
		.select('*')
		.eq('id', event.context.params.id)
		.eq('type', 'component')
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
	component.images = images
		.filter((o) => o.name !== '.emptyFolderPlaceholder')
		.map((o) => {
			return {
				url: `${process.env.SUPABASE_URL}/storage/v1/object/public/images/blueprints/${event.context.params.id}/${o.name}`,
				alt: o.name,
			};
		});
	const { data: files } = await client.storage
		.from('files')
		.list(`blueprints/${event.context.params.id}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});
	component.documentation = files
		.filter((o) => o.name !== '.emptyFolderPlaceholder')
		.map((o) => {
			return {
				url: `${process.env.SUPABASE_URL}/storage/v1/object/public/files/blueprints/${event.context.params.id}/${o.name}`,
				alt: o.name,
			};
		});
	return { data: component };
});
