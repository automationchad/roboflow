import { createClient } from '@supabase/supabase-js';

const supabase_url = 'https://nsfipxnlucvgchlkqvqw.supabase.co';
const anon_key =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZmlweG5sdWN2Z2NobGtxdnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ4NjA0MzgsImV4cCI6MTk5MDQzNjQzOH0.ieuplz2wsoohp3BSuHsm9BNNlAIWHZqGnd2kBLcpQbk';
const client = createClient(supabase_url, anon_key);

const getBlueprints = async () => {
	const { data, error } = await client
		.from('products')
		.select('*')
		.eq('type', 'blueprint')
		.eq('active', true)
		.order('updated_at', { ascending: false });
	return data;
};

const getImages = async (id) => {
	const { data, error } = await client.storage
		.from('images')
		.list(`blueprints/${id}`, {
			limit: 3,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});
	if (data != null) {
		return (
			data
				// .filter((o) => o.name !== ".emptyFolderPlaceholder")
				.map((o) => {
					return {
						url: `${supabase_url}/storage/v1/object/public/images/blueprints/${id}/${o.name}`,
						alt: o.name,
					};
				})
		);
	} else {
		alert('Error loading images');
		console.log(error);
	}
};

export default defineEventHandler(async (event) => {
	let data = await getBlueprints();
	for (let blueprint of data) {
		blueprint.images = await getImages(blueprint.id);
	}
	return { data };
});
