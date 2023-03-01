<template>
	<div class="bg-white py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Our team
				</h2>
				<p class="mt-6 text-lg leading-8 text-gray-600">
					We’re a fully-remote, cross-functional team of {{ people.length }}
					{{ people.length > 1 ? 'people' : 'person' }}.
				</p>
			</div>
			<ul
				role="list"
				class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-y-16 gap-x-8 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6"
			>
				<li v-for="person in people" :key="person.id">
					<img
						class="mx-auto h-24 w-24 rounded-full"
						:src="person.fields.image[0].url"
						alt=""
					/>
					<h3
						class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900"
					>
						{{ person.fields.name }}
					</h3>
					<p class="text-sm leading-6 text-gray-600">
						{{ person.fields.role }}
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
	import Airtable from 'airtable';

	const base = new Airtable({ apiKey: 'keyBl2UOzLvshshLp' }).base(
		'appkU7PnQUq7lePwf'
	);
	let people = [];

	const table = base('team');

	const getRecords = async () => {
		const records = await table.select({}).firstPage();
		people = records.map((o) => {
			return { uuid: o.id, fields: o.fields };
		});
	};

	await getRecords();
</script>
