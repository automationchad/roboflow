<template>
	<div
		class="relative isolate overflow-hidden bg-white py-24 sm:py-32"
		id="info"
	>
		<svg
			viewBox="0 0 801 1036"
			aria-hidden="true"
			class="absolute -top-80 left-[max(6rem,33%)] -z-10 w-[50.0625rem] transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
		>
			<path
				fill="url(#bba7d695-d9bb-4e8a-a43b-2b951b4ac9c0)"
				fill-opacity=".3"
				d="m282.279 843.371 32.285 192.609-313.61-25.32 281.325-167.289-58.145-346.888c94.5 92.653 277.002 213.246 251.009-45.597C442.651 127.331 248.072 10.369 449.268.891c160.956-7.583 301.235 116.434 351.256 179.39L507.001 307.557l270.983 241.04-495.705 294.774Z"
			/>
			<defs>
				<linearGradient
					id="bba7d695-d9bb-4e8a-a43b-2b951b4ac9c0"
					x1="508.179"
					x2="-28.677"
					y1="-116.221"
					y2="1091.63"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#9089FC" />
					<stop offset="1" stop-color="#FF80B5" />
				</linearGradient>
			</defs>
		</svg>

		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl lg:mx-0">
				<h1
					class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
				>
					It’s “you’ll never go back” better
				</h1>
				<p class="mt-6 text-xl leading-8 text-gray-700">
					Motis Group replaces unreliable freelancers and expensive agencies for
					one flat monthly fee, with automations delivered so fast that it will
					blow your mind.
				</p>
			</div>

			<div
				class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12"
			>
				<div class="relative lg:order-last lg:col-span-5">
					<svg
						class="absolute -top-[40rem] left-1 -z-10 h-[64rem] w-[175.5rem] -translate-x-1/2 stroke-gray-900/10 [mask-image:radial-gradient(64rem_64rem_at_111.5rem_0%,white,transparent)]"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="e87443c8-56e4-4c20-9111-55b82fa704e3"
								width="200"
								height="200"
								patternUnits="userSpaceOnUse"
							>
								<path d="M0.5 0V200M200 0.5L0 0.499983" />
							</pattern>
						</defs>
						<rect
							width="100%"
							height="100%"
							stroke-width="0"
							fill="url(#e87443c8-56e4-4c20-9111-55b82fa704e3)"
						/>
					</svg>
					<figure class="border-l border-indigo-600 pl-8">
						<blockquote
							class="text-xl font-semibold leading-8 tracking-tight text-gray-900"
						>
							<p>“{{ caseStudy.fields.quote }}”</p>
						</blockquote>
						<figcaption class="mt-8 flex gap-x-4">
							<img
								:src="caseStudy.fields.customerPhoto[0].url"
								alt=""
								class="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50"
							/>
							<div class="text-sm leading-6">
								<div class="font-semibold text-gray-900">
									{{ caseStudy.fields.customerName }}
								</div>
								<div class="text-gray-600">
									{{ caseStudy.fields.customerTitle }}
								</div>
							</div>
						</figcaption>
					</figure>
				</div>
				<div
					class="prose max-w-xl text-base leading-7 text-gray-700 lg:col-span-7"
				>
					<!-- <p>
							As your business expands, your resources become more scarce. You
							have less time to do all things you want to do, to make the
							decisions you need to make, to service your customers the way they
							deserve to be serviced. The paradox of business is this:
						</p> -->

					<!-- <div class="my-4 border-l-4 border-yellow-400 bg-yellow-50 px-4">
							<div class="flex items-center">
								<div class="flex-shrink-0">
									<ExclamationTriangleIcon
										class="h-5 w-5 text-yellow-400"
										aria-hidden="true"
									/>
								</div>
								<div class="ml-3">
									<p class="text-sm text-yellow-700">
										The faster you are growing, the tighter cash usually is. So
										the businesses that need cash most, have it least!
									</p>
								</div>
							</div>
						</div> -->
					<!-- <p>
							The key to freeing up cash flow is building capacity. By extending
							capacity, you allow more sales and gross margin to accumulate so
							you can make the investments needed for next stage growth.
						</p>
						<p>
							Automation isn't about making things easier. It isn't about
							because it's new or tech-forward. It's not even about cutting
							costs...
						</p>
						<p class="font-bold text-indigo-600">
							The key to the automation is to extend capacity by building high
							leverage systems.
						</p> -->
					<!-- <p>
							Motis Group replaces unreliable freelancers and expensive agencies
							for one flat monthly fee, with automations delivered so fast that
							it will blow your mind.
						</p> -->

					<ul role="list" class="mt-8 max-w-xl space-y-8 text-gray-600">
						<li class="flex gap-x-3">
							<VideoCameraSlashIcon
								class="mt-1 h-5 w-5 flex-none text-indigo-600"
							/>

							<span
								><strong class="font-semibold text-gray-900"
									>Totally Async.</strong
								>
								Don't like meetings? We don't either; so much so that we've
								outlawed them completely.</span
							>
						</li>
						<li class="flex gap-x-3">
							<QueueListIcon class="mt-1 h-5 w-5 flex-none text-indigo-600" />
							<span
								><strong class="font-semibold text-gray-900"
									>Manage with Trello</strong
								>
								Manage your design board using Trello. View active, queued and
								completed tasks with ease.</span
							>
						</li>
						<li class="flex gap-x-3">
							<UserGroupIcon class="mt-1 h-5 w-5 flex-none text-indigo-600" />

							<span
								><strong class="font-semibold text-gray-900"
									>Invite unlimited team members</strong
								>
								Invite your entire team, so anyone can submit requests and track
								their progress.</span
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		CloudArrowUpIcon,
		LockClosedIcon,
		ServerIcon,
	} from '@heroicons/vue/20/solid';

	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
	} from '@headlessui/vue';
	import {
		MinusSmallIcon,
		PlusSmallIcon,
		ExclamationTriangleIcon,
		ChevronRightIcon,
		VideoCameraSlashIcon,
		WindowIcon,
        QueueListIcon,
		CreditCardIcon,
        UserGroupIcon
	} from '@heroicons/vue/24/outline';
</script>

<script>
	export default {
		props: ['caseStudy'],
	};
</script>
