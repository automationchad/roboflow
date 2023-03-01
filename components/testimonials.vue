<template>
	<div class="relative isolate bg-white pt-24 pb-32 sm:pt-32" id="testimonials">
		<div
			class="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
		>
			<svg
				viewBox="0 0 1313 771"
				aria-hidden="true"
				class="ml-[-22rem] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] xl:ml-0 xl:mr-[calc(50%-12rem)]"
			>
				<use href="#bc169a03-3518-42d4-ab1e-d3eadac65edc" />
			</svg>
		</div>
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-xl text-center">
				<h2
					class="text-lg font-semibold leading-8 tracking-tight text-indigo-600"
				>
					Testimonials
				</h2>
				<p
					class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
				>
					We have worked with thousands of amazing people
				</p>
			</div>
			<div
				class="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4"
			>
				<figure
					class="col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1"
				>
					<blockquote
						class="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900"
					>
						<p>{{ `“${featuredTestimonial.body}”` }}</p>
					</blockquote>
					<figcaption
						class="flex items-center gap-x-4 border-t border-gray-900/10 py-4 px-6"
					>
						<img
							class="h-10 w-10 flex-none rounded-full bg-gray-50"
							:src="featuredTestimonial.author.imageUrl"
							alt=""
						/>
						<div class="flex-auto">
							<div class="font-semibold">
								{{ featuredTestimonial.author.name }}
							</div>
							<div class="text-gray-600">
								{{ `@${featuredTestimonial.author.handle}` }}
							</div>
						</div>
						<img
							class="h-10 w-auto flex-none"
							:src="featuredTestimonial.author.logoUrl"
							alt=""
						/>
					</figcaption>
				</figure>
				<div
					v-for="(columnGroup, columnGroupIdx) in testimonials"
					:key="columnGroupIdx"
					class="space-y-8 xl:contents xl:space-y-0"
				>
					<div
						v-for="(column, columnIdx) in columnGroup"
						:key="columnIdx"
						:class="[
							(columnGroupIdx === 0 && columnIdx === 0) ||
							(columnGroupIdx === testimonials.length - 1 &&
								columnIdx === columnGroup.length - 1)
								? 'xl:row-span-2'
								: 'xl:row-start-1',
							'space-y-8',
						]"
					>
						<figure
							v-for="testimonial in column"
							:key="testimonial.author.handle"
							class="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
						>
							<blockquote class="text-gray-900">
								<p>{{ `“${testimonial.body}”` }}</p>
							</blockquote>
							<figcaption class="mt-6 flex items-center gap-x-4">
								<img
									class="h-10 w-10 rounded-full bg-gray-50"
									:src="testimonial.author.imageUrl"
									alt=""
								/>
								<div>
									<div class="font-semibold">{{ testimonial.author.name }}</div>
									<div class="text-gray-600">
										{{ `@${testimonial.author.handle}` }}
									</div>
								</div>
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['featuredTestimonial', 'testimonials'],
	};
</script>

<script setup>
	const featuredTestimonial = {
		body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
		author: {
			name: 'Brenna Goyette',
			handle: 'brennagoyette',
			imageUrl:
				'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
			logoUrl: 'https://tailwindui.com/img/logos/savvycal-logo-gray-900.svg',
		},
	};
	const testimonials = [
		[
			[
				{
					body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
					author: {
						name: 'Leslie Alexander',
						handle: 'lesliealexander',
						imageUrl:
							'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
					},
				},
				// More testimonials...
			],
			[
				{
					body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
					author: {
						name: 'Lindsay Walton',
						handle: 'lindsaywalton',
						imageUrl:
							'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
					},
				},
				// More testimonials...
			],
		],
		[
			[
				{
					body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
					author: {
						name: 'Tom Cook',
						handle: 'tomcook',
						imageUrl:
							'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
					},
				},
				// More testimonials...
			],
			[
				{
					body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
					author: {
						name: 'Leonard Krasner',
						handle: 'leonardkrasner',
						imageUrl:
							'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
					},
				},
				// More testimonials...
			],
		],
	];
</script>
