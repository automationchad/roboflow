import Contentful from 'contentful';
const client = Contentful.createClient({
	space: 'yq73w84rdxyy',
	environment: 'master', // defaults to 'master' if not set
	accessToken: 'p_slG5p5web18gdJPyLGtrBgR5eyluyMr7aXVmUbheU',
});

export default defineEventHandler(async (event) => {
	const data = await client
		.getEntries({
			content_type: 'article',
			limit: 1000,
			order: '-fields.createdDate',
		})
		.then((response) => response.items);
	return { data };
});
