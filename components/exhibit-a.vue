<script setup>
	const terms = [
		{
			title: 'Products Provided On-Demand',
			description: ``,
			children: [
				{
					title: 'License Grant',
					description: ` Subject to the terms of this Agreement, Motis Group will make the Motis Group owned Product available to Company and its Subscription Users for use On-Demand, and grants Company, during the Subscription Term only, a non-exclusive, revocable, non-transferable right to use and modify the Motis Group owned Product solely for Company’s own internal business purposes.`,
				},
				{
					title: 'Regulated Data in Relation to Motis Group Products',
					description: `The On-Demand service is not configured to receive and store certain types of government regulated, controlled or similarly restricted data (“Regulated Data”), including without limitation technical data controlled by International Traffic in Arms Regulations and personal health information under the Health Insurance Portability and Accountability Act. Neither Company nor any Subscription Users shall use the Motis Group owned Product to store Regulated Data or provide access to or submit any Regulated Data to Motis Group when requesting support services or otherwise. Motis Group reserves the right to suspend or terminate the Subscription immediately if Company is found to be in violation of this Section.`,
				},
			],
		},
		{
			title: 'Products Provided On-Site',
			description: ``,
			children: [
				{
					title: 'License Grant',
					description: `Subject to the terms of this Agreement, Motis Group will make the Motis Group owned Product available to Company and its Subscription Users for use at the Company’s premises or on a Company-controlled server within a third party data center, and grants Company, during the Subscription Term only, a non-exclusive, revocable, non-transferable (except as provided in Section 23 of the Agreement) right to install, use and modify the Motis Group owned Product solely for Company’s own internal business purposes.`,
				},
				{
					title: 'Delivery',
					description: `Motis Group shall electronically deliver or make available the Motis Group owned Product and the information necessary for Company’s use and installation of the Motis Group owned Product.`,
				},
			],
		},
		{
			title: 'Glossary',
			description: ``,
			children: [
				{
					title: '',
					description: `“On-Demand” means hosting on an Motis Group-controlled or shared server within a third party data center`,
				},
				{
					title: '',
					description: `“On-Site” means hosting at the Company’s premises or on a Company-controlled server within a third party data center`,
				},
				{
					title: '',
					description: `“Company Data” means any data, information or material stored by Company in the Product.`,
				},
				{
					title: '',
					description: `“Subscription User” means an individual employee, contractor or agent of Company authorized to use the applicable Product for which a Subscription has been purchased and who has been given a user identification and password.`,
				},
				{
					title: '',
					description: `“Subscription” means Company’s right to use the Product for the Subscription Term, per the terms of the Agreement and the related Product Order Form(s).`,
				},
				{
					title: '',
					description: ` “Subscription Term” means the period of time which Company may access the applicable Product as set forth in a Product Order Form.`,
				},
			],
		},
	];
</script>

<template>
	<div>
		<div class="bg-white py-32 px-6 lg:px-8">
			<div class="prose mx-auto max-w-3xl text-base leading-7 text-gray-700">
				<h2>EXHIBIT A</h2>
				<h3>TERMS OF USE OF MOTIS GROUP PRODUCTS</h3>
				<ol>
					<li v-for="term in terms" :key="term">
						<strong>{{ term.title }}</strong
						>:
						{{ term.description }}
						<ul>
							<li v-for="child in term.children" :key="child">
								<strong>{{ child.title }}</strong
								>{{ `${child.title ? ': ' : ''} ${child.description}` }}
							</li>
						</ul>
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>
