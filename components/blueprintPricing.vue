<script setup>
	const handleCheckout = async (product, workspace) => {
		const { url } = await $fetch('/api/checkout', {
			method: 'post',
			body: {
				product: product,
				project_id: product.tray_project_id,
				workspace_id: workspace.id,
				customer: workspace.stripe_customer_id,
			},
		});

		location.href = url;
	};
</script>

<script>
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
	import { PlusIcon } from '@heroicons/vue/24/outline';

	export default {
		props: {
			price: Number,
			authed: Boolean,
			allAccess: Boolean,
			name: String,
			software: String,
			reviews: Array,
			summary: String,
			product: Object,
			workspace: Object,
		},
		components: { TabGroup, TabList, Tab, TabPanels, TabPanel, PlusIcon },
		methods: {
			abbreviatedNumber(number) {
				const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
				const tier = (Math.log10(Math.abs(number)) / 3) | 0;
				if (tier === 0) {
					return number;
				}
				const suffix = SI_SYMBOL[tier];
				const scale = 10 ** (tier * 3);
				const scaled = number / scale;
				const length = scaled.toFixed(1).toString();
				const precision = length > 3 ? 0 : 1;
				return scaled.toFixed(precision) + suffix;
			},
			taskPrice(tasks) {
				let pricing = [...Array(8)].fill(undefined).map((_, i) => {
					const initial_value = 0.047;
					const decay_rate = 0.7;
					return initial_value * (1 - decay_rate) ** i;
				});

				if (tasks <= 1000) return tasks * pricing[0];
				if (tasks > 1000 && tasks <= 5000)
					return 1000 * pricing[0] + (tasks - 1000) * pricing[1];
				if (tasks > 5000 && tasks <= 10000)
					return (
						1000 * pricing[0] + 5000 * pricing[1] + (tasks - 5000) * pricing[2]
					);
				if (tasks > 10000 && tasks <= 50000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						(tasks - 10000) * pricing[3]
					);
				if (tasks > 50000 && tasks <= 100000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						(tasks - 50000) * pricing[4]
					);
				if (tasks > 100000 && tasks <= 500000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						100000 * pricing[4] +
						(tasks - 100000) * pricing[5]
					);
				if (tasks > 500000 && tasks <= 1000000)
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						100000 * pricing[4] +
						500000 * pricing[5] +
						(tasks - 500000) * pricing[6]
					);
				else
					return (
						1000 * pricing[0] +
						5000 * pricing[1] +
						10000 * pricing[2] +
						50000 * pricing[3] +
						100000 * pricing[4] +
						500000 * pricing[5] +
						1000000 * pricing[6] +
						(tasks - 1000000) * pricing[7]
					);
			},
		},
	};
</script>

<template>
	<div>
		<div
			id="pricing"
			class="relative overflow-hidden bg-slate-50 px-48 pt-24 pb-20 dark:bg-[#0A101E] lg:pb-24 xl:pb-32"
		>
			<img
				src=""
				alt=""
				class="absolute top-0 left-1/2 -ml-[40rem] w-[90.4375rem] max-w-none"
			/>
			<div
				class="absolute inset-x-0 bottom-0 h-96 text-slate-600/10 [mask-image:linear-gradient(to_bottom,transparent,white)]"
			>
				<svg
					class="absolute inset-0 h-full w-full"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<pattern
							id="pricing-pattern"
							width="32"
							height="32"
							patternUnits="userSpaceOnUse"
							x="50%"
							y="100%"
							patternTransform="translate(0 -1)"
						>
							<path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#pricing-pattern)"></rect>
				</svg>
			</div>
			<div class="max-w-container relative mx-auto px-4 sm:px-6 lg:px-8">
				<section class="mx-auto max-w-[40rem] lg:max-w-none">
					<div class="max-w-3xl1 pr-12">
						<h2 class="text-base font-semibold leading-7 text-sky-500">
							Pricing
						</h2>
						<p
							class="mt-4 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
						>
							Get just one or get ’em all.
						</p>
						<p class="mt-4 max-w-xl text-base leading-8 text-slate-700">
							Every blueprint includes free setup by our team, and can be used
							for unlimited tasks.
						</p>
						<div class="mt-9 flex flex-wrap">
							<div class="flex items-center text-sm font-medium text-slate-500">
								<svg
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 flex-none stroke-current text-slate-400"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<ellipse cx="16" cy="16" rx="13" ry="5"></ellipse>
									<ellipse
										cx="16"
										cy="16"
										rx="13"
										ry="5"
										transform="rotate(60 16 16)"
									></ellipse>
									<ellipse
										rx="13"
										ry="5"
										transform="matrix(-.5 .86603 .86603 .5 16 16)"
									></ellipse>
									<circle cx="16" cy="16" r="2"></circle></svg
								><span class="ml-2.5">React</span>
							</div>
							<div
								class="ml-6 flex items-center text-sm font-medium text-slate-500"
							>
								<svg
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 flex-none stroke-current text-slate-400"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<defs>
										<linearGradient
											id="next-icon-gradient-a"
											x1="15.125"
											y1="18.25"
											x2="24.25"
											y2="27.375"
											gradientUnits="userSpaceOnUse"
										>
											<stop offset=".24" stop-color="currentColor"></stop>
											<stop
												offset="1"
												stop-color="currentColor"
												stop-opacity="0"
											></stop>
										</linearGradient>
										<linearGradient
											id="next-icon-gradient-b"
											x1="20.5"
											y1="11.25"
											x2="20.5"
											y2="18.25"
											gradientUnits="userSpaceOnUse"
										>
											<stop stop-color="currentColor"></stop>
											<stop
												offset="1"
												stop-color="currentColor"
												stop-opacity="0"
											></stop>
										</linearGradient>
									</defs>
									<path
										d="M16.25 28.5c6.765 0 12.25-5.485 12.25-12.25S23.015 4 16.25 4 4 9.485 4 16.25 9.485 28.5 16.25 28.5Z"
									></path>
									<path
										d="M12 21.5V12l12.25 14.25"
										stroke="url(#next-icon-gradient-a)"
									></path>
									<path
										d="M21.25 12a.75.75 0 1 0-1.5 0v8.17l1.5 1.64V12Z"
										fill="url(#next-icon-gradient-b)"
										stroke-width="0"
									></path></svg
								><span class="ml-2.5">Next.js</span>
							</div>
						</div>
					</div>
					<div
						class="mt-16 lg:mt-0 lg:flex lg:flex-row-reverse lg:items-center"
					>
						<div
							class="relative z-10 -mx-4 shadow-lg ring-1 ring-slate-900/10 sm:mx-0 sm:rounded-3xl lg:w-1/2 lg:flex-none"
						>
							<div
								class="absolute -bottom-px left-1/2 -ml-48 flex h-[2px] w-96"
							>
								<div class="w-full flex-none blur-sm"></div>
								<div class="-ml-[100%] w-full flex-none blur-[1px]"></div>
								<div class="-ml-[100%] w-full flex-none blur-sm"></div>
								<div class="-ml-[100%] w-full flex-none blur-[1px]"></div>
							</div>
							<div
								class="relative bg-white px-4 py-10 dark:bg-slate-800 sm:rounded-3xl sm:px-10"
							>
								<div class="flex items-center justify-between">
									<h3 class="text-base font-semibold text-sky-500">
										Get with all-access
									</h3>
									<button
										v-if="!authed"
										@click="$emit('open-modal')"
										class="inline-flex justify-center rounded-lg bg-slate-900 py-2 px-3 text-sm font-semibold text-white hover:bg-slate-700"
									>
										<span
											>Get all-access <span aria-hidden="true">→</span></span
										>
									</button>
									<a
										v-else
										class="inline-flex justify-center rounded-lg bg-slate-900 py-2 px-3 text-sm font-semibold text-white hover:bg-slate-700"
										href="https://calendly.com/motis-group/all-access"
										><span
											>Get all-access <span aria-hidden="true">→</span></span
										></a
									>
								</div>
								<div class="mt-3 flex items-center">
									<p
										class="text-[2.5rem] leading-none text-slate-900 dark:text-white"
									>
										$<span class="font-bold">{{
											(30000).toLocaleString()
										}}</span>
									</p>
									<p class="ml-3 text-sm">
										<span class="font-semibold text-slate-900 dark:text-white"
											>one-time payment</span
										><br /><span class="text-slate-500">plus local taxes</span>
									</p>
								</div>
								<p class="mt-6 text-sm leading-6 text-slate-600">
									Get lifetime access to every one of our automation blueprints
									as well as all of our components for a single one-time
									purchase.
								</p>
								<h4 class="sr-only">All-access features</h4>
								<ul
									class="mt-10 space-y-8 border-t border-slate-900/10 pt-10 text-sm leading-6 text-slate-700"
								>
									<li class="flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 32 32"
											class="h-8 w-8 flex-none"
										>
											<path
												d="M0 0h32v32H0z"
												class="fill-white dark:fill-slate-800"
											></path>
											<rect
												width="23"
												height="22"
												x="3"
												y="5"
												stroke="#0EA5E9"
												stroke-linejoin="round"
												stroke-width="1.5"
												rx="2"
											></rect>
											<rect
												width="10"
												height="18"
												x="19"
												y="9"
												class="fill-[#E0F2FE] dark:fill-slate-700"
												stroke="#0EA5E9"
												stroke-linejoin="round"
												stroke-width="1.5"
												rx="2"
											></rect>
											<circle cx="6" cy="8" r="1" fill="#0EA5E9"></circle>
											<circle cx="9" cy="8" r="1" fill="#0EA5E9"></circle>
											<path
												stroke="#0EA5E9"
												stroke-width="1.5"
												d="M3 11h16"
											></path>
										</svg>
										<p class="ml-5">
											<strong
												class="font-semibold text-slate-900 dark:text-white"
												>Every software blueprint</strong
											>
											— beautifully designed, expertly crafted API integrations
											built with the modern serveless technologies like Tray.io.
										</p>
									</li>
									<li class="flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 32 32"
											class="h-8 w-8 flex-none"
										>
											<path
												d="M0 0h32v32H0z"
												class="fill-white dark:fill-slate-800"
											></path>
											<path
												class="fill-[#E0F2FE] dark:fill-slate-700"
												d="M23 22l7-4v7l-7 4v-7zM9 22l7-4v7l-7 4v-7zM16 11l7-4v7l-7 4v-7zM2 18l7 4v7l-7-4v-7zM9 7l7 4v7l-7-4V7zM16 18l7 4v7l-7-4v-7z"
											></path>
											<path
												fill="#0EA5E9"
												d="M16 3l.372-.651a.75.75 0 00-.744 0L16 3zm7 4h.75a.75.75 0 00-.378-.651L23 7zM9 7l-.372-.651A.75.75 0 008.25 7H9zM2 18l-.372-.651A.75.75 0 001.25 18H2zm28 0h.75a.75.75 0 00-.378-.651L30 18zm0 7l.372.651A.75.75 0 0030.75 25H30zm-7 4l-.372.651a.75.75 0 00.744 0L23 29zM9 29l-.372.651a.75.75 0 00.744 0L9 29zm-7-4h-.75c0 .27.144.518.378.651L2 25zM15.628 3.651l7 4 .744-1.302-7-4-.744 1.302zm7 2.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zm-7-2.698l7-4-.744-1.302-7 4 .744 1.302zm-.744 7l7 4 .744-1.302-7-4-.744 1.302zm7 2.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zm-7-2.698l7-4-.744-1.302-7 4 .744 1.302zm20.256-4l7 4 .744-1.302-7-4-.744 1.302zm7 2.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zm-7-2.698l7-4-.744-1.302-7 4 .744 1.302zm13.256 5.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zM30.75 25v-7h-1.5v7h1.5zm-15.122-.651l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zM2.75 25v-7h-1.5v7h1.5zm14 0v-7h-1.5v7h1.5zM8.25 7v7h1.5V7h-1.5zm14 0v7h1.5V7h-1.5zm-7 4v7h1.5v-7h-1.5zm-7 11v7h1.5v-7h-1.5zm14 0v7h1.5v-7h-1.5z"
											></path>
										</svg>
										<p class="ml-5">
											<strong class="font-semibold text-slate-900"
												>Over 300+ components</strong
											>
											— everything you need to build automations for marketing,
											sales, customer success and more.
										</p>
									</li>
									<li class="flex">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 32 32"
											class="h-8 w-8 flex-none"
										>
											<path
												d="M0 0h32v32H0z"
												class="fill-white dark:fill-slate-800"
											></path>
											<path
												class="fill-[#E0F2FE] dark:fill-slate-700"
												d="M13.168 18.828a4 4 0 110-5.656L15.997 16l1.5-1.5 1.328-1.328a4 4 0 110 5.656L15.996 16l-1.499 1.5-1.329 1.328z"
											></path>
											<path
												stroke="#0EA5E9"
												stroke-linecap="round"
												stroke-width="1.5"
												d="M14.497 17.5l-1.329 1.328a4 4 0 110-5.656l5.657 5.656a4 4 0 100-5.656L17.496 14.5"
											></path>
											<circle
												cx="16"
												cy="16"
												r="14"
												stroke="#0EA5E9"
												stroke-width="1.5"
											></circle>
										</svg>
										<p class="ml-5">
											<strong class="font-semibold text-slate-900"
												>Lifetime access</strong
											>
											— get instant access to everything we have today, plus any
											new components and blueprints we add in the future.
										</p>
									</li>
								</ul>
								<div
									class="relative mt-10 flex rounded-xl border border-slate-600/10 bg-slate-50 p-6"
								>
									<svg
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										class="h-8 w-8 flex-none"
										stroke="#94A3B8"
										stroke-width="1.5"
									>
										<circle
											cx="11"
											cy="16"
											r="3.25"
											fill="#94A3B8"
											fill-opacity=".2"
										></circle>
										<circle
											cx="21"
											cy="13"
											r="3.25"
											fill="#94A3B8"
											fill-opacity=".2"
										></circle>
										<path
											d="M28.909 19c.223-.964.341-1.968.341-3 0-7.318-5.932-13.25-13.25-13.25S2.75 8.682 2.75 16c0 1.032.118 2.036.341 3"
											stroke-linecap="round"
										></path>
										<path
											d="m18.031 29.016-2.187.109s-1.475-.118-1.827-.29c-1.049-.51-.579-2.915 0-3.95 1.157-2.064 3.752-5.135 7.125-5.135h.024c2.5 0 4.404 1.687 5.692 3.401-1.963 2.975-5.161 5.276-8.827 5.865Z"
											fill="#94A3B8"
											fill-opacity=".2"
											stroke-linejoin="round"
										></path>
										<path
											d="m14.001 24.913.016-.027c.26-.465.593-.98.991-1.5-1.042-.918-2.374-1.636-3.988-1.636H11c-2.094 0-3.847 1.208-5.055 2.492a12.987 12.987 0 0 0 7.987 4.595l.057-.016c-1.004-.534-.555-2.868.012-3.908Z"
											fill="#94A3B8"
											fill-opacity=".2"
											stroke-linejoin="round"
										></path>
									</svg>
									<p class="ml-5 text-sm leading-6 text-slate-700">
										<strong class="font-semibold text-slate-900"
											>Available for teams</strong
										>
										— get access to all of our templates and components plus any
										future updates for your entire team.
									</p>
								</div>
							</div>
						</div>
						<div class="relative mt-10 lg:mt-0 lg:w-1/2 lg:flex-none">
							<div
								class="absolute -inset-y-8 -left-2 w-px bg-slate-900/10 sm:left-0"
							></div>
							<div
								class="absolute -inset-y-8 -right-2 w-px bg-slate-900/10 sm:right-0 lg:hidden"
							></div>
							<div
								class="absolute -inset-x-8 top-0 h-px bg-slate-900/10 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
							></div>
							<div
								class="absolute -inset-x-8 bottom-0 h-px bg-slate-900/10 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
							></div>
							<div class="px-2 py-8 sm:px-8">
								<div class="mx-auto max-w-[28.75rem]">
									<div class="flex items-center justify-between">
										<h3 class="text-base font-semibold text-slate-500">
											<span class="text-slate-900">{{ name }}</span
											><span class="hidden sm:inline"> — </span
											><span class="block text-sm sm:inline sm:text-base"
												>Expansion pack</span
											>
										</h3>
										<button
											@click="$emit('open-modal')"
											v-if="!authed"
											class="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20"
										>
											<span
												>{{ 'Get template' }}
												<span aria-hidden="true" class="text-black/25"
													>→</span
												></span
											>
										</button>
										<button
											v-else
											@click="handleCheckout(product, workspace)"
											class="inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:ring-slate-900/20 active:scale-95"
										>
											<span
												>{{ 'Get template' }}
												<span aria-hidden="true" class="text-black/25"
													>→</span
												></span
											>
										</button>
									</div>
									<div
										class="mt-2 grid grid-cols-5 items-center justify-between"
									>
										<div class="col-span-2">
											<span class="text-2xl text-slate-900"
												>$<span class="font-bold">{{
													(product.setup_fee / 100).toLocaleString()
												}}</span></span
											><span class="ml-2 text-sm text-slate-500"
												>setup fee</span
											>
										</div>
										<div class="col-span-1">
											<span
												class="pointer-events-none flex h-12 items-center justify-center"
												aria-hidden="true"
											>
												<PlusIcon
													class="h-6 w-6 text-indigo-600 dark:text-indigo-300"
													aria-hidden="true"
												/>
											</span>
										</div>

										<div class="col-span-2">
											<span class="text-2xl text-slate-900"
												>$<span class="font-bold">{{
													Math.ceil(
														taskPrice(product.estimated_tasks)
													).toLocaleString()
												}}</span></span
											><span class="ml-2 text-sm text-slate-500"
												>per month</span
											>
										</div>
									</div>
									<p class="mt-2 text-sm leading-6 text-slate-700">
										{{ summary }}
									</p>
								</div>
							</div>
							<div class="relative py-10 px-2 sm:px-8">
								<div
									class="absolute -inset-x-8 top-0 h-px bg-slate-900/10 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
								></div>
								<ul
									role="list"
									class="mx-auto max-w-[28.75rem] space-y-8 text-sm leading-6 text-slate-700"
								>
									<li class="flex">
										<svg
											class="h-6 w-6 flex-none fill-slate-400"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7.672 12.122a1 1 0 0 0-1.344 1.481l1.344-1.48Zm9.98-3.22a1 1 0 0 0-1.304-1.517L17.652 8.9Zm-6.882 7.383-.673.74a1 1 0 0 0 1.579-.317l-.906-.423Zm.906.423c1.382-2.961 3.428-5.616 5.976-7.807l-1.304-1.516c-2.752 2.366-4.976 5.245-6.485 8.477l1.813.846Zm-5.348-3.105 3.77 3.423 1.344-1.481-3.77-3.423-1.344 1.481Z"
											></path>
										</svg>
										<p class="ml-3">
											<strong class="font-semibold text-slate-900"
												>Unlimited projects</strong
											>
											— buy once and use this template for as many projects as
											you need, both personal and commercial.
										</p>
									</li>
									<li class="flex">
										<svg
											class="h-6 w-6 flex-none fill-slate-400"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7.672 12.122a1 1 0 0 0-1.344 1.481l1.344-1.48Zm9.98-3.22a1 1 0 0 0-1.304-1.517L17.652 8.9Zm-6.882 7.383-.673.74a1 1 0 0 0 1.579-.317l-.906-.423Zm.906.423c1.382-2.961 3.428-5.616 5.976-7.807l-1.304-1.516c-2.752 2.366-4.976 5.245-6.485 8.477l1.813.846Zm-5.348-3.105 3.77 3.423 1.344-1.481-3.77-3.423-1.344 1.481Z"
											></path>
										</svg>
										<p class="ml-3">
											<strong class="font-semibold text-slate-900"
												>Free updates</strong
											>
											— any updates we make to the template are included with
											your original purchase.
										</p>
									</li>
									<li class="flex">
										<svg
											class="h-6 w-6 flex-none fill-slate-400"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M7.672 12.122a1 1 0 0 0-1.344 1.481l1.344-1.48Zm9.98-3.22a1 1 0 0 0-1.304-1.517L17.652 8.9Zm-6.882 7.383-.673.74a1 1 0 0 0 1.579-.317l-.906-.423Zm.906.423c1.382-2.961 3.428-5.616 5.976-7.807l-1.304-1.516c-2.752 2.366-4.976 5.245-6.485 8.477l1.813.846Zm-5.348-3.105 3.77 3.423 1.344-1.481-3.77-3.423-1.344 1.481Z"
											></path>
										</svg>
										<p class="ml-3">
											<strong class="font-semibold text-slate-900"
												>Simple .zip file</strong
											>
											— templates are delivered as a simple archive you can
											unzip and start playing with right away.
										</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section class="mt-20 lg:mt-24">
					<h2 class="sr-only">Testimonials</h2>
					<TabGroup
						as="div"
						class="mx-auto max-w-[40rem] lg:max-w-[50rem]"
						:defaultIndex="1"
					>
						<TabList
							as="div"
							class="flex justify-center space-x-4 pt-2"
							aria-orientation="horizontal"
						>
							<Tab
								v-for="review in reviews"
								:key="review.uuid"
								v-slot="{ selected }"
								class="focus:outline-none active:outline-none"
							>
								<div
									:class="[
										selected ? '-translate-y-2' : 'opacity-40',
										'h-12 w-12 overflow-hidden rounded-full bg-slate-100 shadow-md ring-2 ring-white transition',
									]"
								>
									<img :src="review.fields.customerPhoto[0].url" alt="" /><span
										class="sr-only"
										>{{ review.fields.customerName }}</span
									>
								</div>
							</Tab>
						</TabList>
						<TabPanels class="mt-10">
							<TabPanel
								v-for="review in reviews"
								:key="review.uuid"
								class="text-center"
							>
								<blockquote class="text-2xl leading-9 text-slate-900">
									<p class="before:content-['“'] after:content-['”']">
										{{ review.fields.quote }}
									</p>
								</blockquote>
								<figcaption class="mt-8">
									<span
										class="block text-base font-medium leading-7 text-slate-900"
										>{{ review.fields.customerName }}</span
									><span class="text-sm text-slate-600"
										><a
											href="https://twitter.com/benbarbersmith/status/1527291090889371651"
											>{{ review.fields.customerTitle }}</a
										></span
									>
								</figcaption>
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</section>
			</div>
		</div>
	</div>
</template>
