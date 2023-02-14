<script setup>
	import Airtable from 'airtable';

	const user = useSupabaseUser();
	console.log(user);

	const base = new Airtable({ apiKey: 'keyBl2UOzLvshshLp' }).base(
		'appkU7PnQUq7lePwf'
	);
	let requests = [];

	const table = base('sprints');

	const getSprints = async () => {
		const records = await table
			.select({
				view: 'viwjRdvlzpCwm0OuK',
				sort: [{ field: 'est_finish_date', direction: 'asc' }],
			})
			.firstPage();
		requests = records.map((o) => {
			return { uuid: o.id, fields: o.fields };
		});
	};

	await getSprints();
	const route = useRoute();
	console.log(route.query);
</script>

<template>
	<div>
		<ContactSection
			:requests="requests"
			:user="user"
			:type="route.query.type"
		/>
	</div>
</template>
