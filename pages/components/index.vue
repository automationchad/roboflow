<script setup>
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	const user = attrs.user;
	const profile = attrs.profile;
	const loading = ref(true);
	const username = ref('');
	const allAccess = ref(false);
	const templates = ref([]);

	if (user) {
		if (profile) {
			username.value = profile.username;
			allAccess.value = profile.workspaces.all_access;
			templates.value = profile.workspaces.templates;
		}
		loading.value = false;
	}

	let { data: components } = await useFetch(`/api/components`);
	components = components.value.data;

	const softwares = [
		...new Set(
			components
				.filter((o) => o.categories.includes('sales'))
				.map((o) => o.connectors)
				.flat(1)
		),
	].map((o) => {
		return { name: o, id: o };
	});

	const tabs = [
		{
			name: 'Finance',
			url: 'finance',
			description:
				'Heroes, feature sections, newsletter sign up forms — everything you need to build beautiful marketing websites.',
			children: [
				...new Set(
					components
						.filter((o) => o.categories.includes('finance'))
						.map((o) => o.connectors)
						.flat(1)
				),
			].map((o) => {
				return { name: o, id: o };
			}),
		},
		{
			name: 'Sales',
			url: 'sales',
			description:
				'Form layouts, tables, modal dialogs — everything you need to build beautiful responsive web applications.',
			children: [
				...new Set(
					components
						.filter((o) => o.categories.includes('sales'))
						.map((o) => o.connectors)
						.flat(1)
				),
			].map((o) => {
				return { name: o, id: o };
			}),
		},
		{
			name: 'Marketing',
			url: 'marketing',
			description:
				'Form layouts, tables, modal dialogs — everything you need to build beautiful responsive web applications.',
			children: [
				...new Set(
					components
						.filter((o) => o.categories.includes('marketing'))
						.map((o) => o.connectors)
						.flat(1)
				),
			].map((o) => {
				return { name: o, id: o };
			}),
		},
	];
</script>

<template>
	<div class="">
		<div
			v-if="!user"
			class="relative -mt-[5.75rem] overflow-hidden bg-slate-50 pt-12 md:pt-[5.75rem]"
		>
			<div class="max-w-container mx-auto px-48 pt-4 lg:flex">
				<div
					class="relative mx-auto max-w-[40rem] pb-16 pt-16 lg:mx-0 lg:w-[40rem] lg:max-w-none lg:flex-none lg:pb-24 lg:pr-4 lg:pt-20"
				>
					<h1 class="text-base font-semibold leading-7 text-indigo-600">
						By the makers of Tailwind CSS
					</h1>
					<p
						class="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-black sm:text-5xl sm:leading-[3.5rem]"
					>
						Beautiful UI components, crafted with Tailwind CSS.
					</p>
					<div class="mt-4 flex flex-wrap">
						<div class="flex items-center text-sm font-medium text-slate-500">
							<svg
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 flex-none stroke-current text-slate-400"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M5 4.15h22.5l-2 20.5-9.25 4-9.25-4-2-20.5Z"></path>
								<path
									d="M20.5 9.15H12v5.5h8.5v6l-4.25 2-4.25-2v-2.5"
								></path></svg
							><span class="ml-2.5">HTML</span>
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
								<path
									d="M19.924 5 16 11.644 12.075 5H3l13 23L29 5h-9.076Z"
								></path>
								<path
									d="M19.879 5 16 11.26 12.121 5H8l8 13 8-13h-4.121Z"
								></path></svg
							><span class="ml-2.5">Vue</span>
						</div>
					</div>
					<p class="mt-4 text-base leading-7 text-slate-600">
						Over 500+ professionally designed, fully responsive, expertly
						crafted component examples you can drop into your Tailwind projects
						and customize to your heart’s content.
					</p>
					<div class="mt-8 flex gap-4">
						<a
							class="inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-sm font-semibold text-white hover:bg-slate-700"
							href="/preview"
							><span
								>Live preview
								<span aria-hidden="true" class="text-slate-400 sm:inline"
									>→</span
								></span
							></a
						><a
							class="hover:ring-slate-900/15 inline-flex justify-center rounded-lg bg-white/0 py-3 px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25"
							href="/documentation"
							><span
								>Documentation
								<span aria-hidden="true" class="text-black/25 sm:inline"
									>→</span
								></span
							></a
						>
					</div>
				</div>
				<div class="relative z-10 mt-12 hidden select-none lg:flex">
					<div class="z-20 flex flex-col">
						<div class="relative p-4">
							<div
								class="pointer-events-auto relative z-10 w-[24.125rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-700 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
							>
								<div>
									<div class="flex items-center py-2.5 px-3.5 text-slate-400">
										<svg
											class="mr-2 h-5 w-5 stroke-slate-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
											></path></svg
										>Search projects...
									</div>
									<div class="border-t border-slate-400/20 py-3 px-3.5">
										<div
											class="mb-1.5 text-[0.6875rem] font-semibold text-slate-500"
										>
											Recent searches
										</div>
										<div class="flex items-center rounded-md p-1.5">
											<svg
												class="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
												></path></svg
											>Tailwind Labs / Website Redesign
										</div>
										<div
											class="flex items-center rounded-md bg-indigo-600 p-1.5 text-white"
										>
											<svg
												class="mr-2.5 h-5 w-5 flex-none stroke-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
												></path></svg
											>Laravel LLC / Conference Branding
										</div>
									</div>
									<div class="border-t border-slate-400/20 py-3 px-3.5">
										<div class="flex items-center rounded-md p-1.5">
											<svg
												class="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path
													d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												></path></svg
											>Add new file...
										</div>
										<div class="flex items-center rounded-md p-1.5">
											<svg
												class="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path
													d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
												></path></svg
											>Add new folder...
										</div>
										<div class="flex items-center rounded-md p-1.5">
											<svg
												class="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path
													d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
												></path></svg
											>Add hashtag...
										</div>
										<div class="flex items-center rounded-md p-1.5">
											<svg
												class="mr-2.5 h-5 w-5 flex-none stroke-slate-400"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path
													d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
												></path></svg
											>Add label...
										</div>
									</div>
								</div>
							</div>
							<div class="z-0">
								<div
									class="absolute -right-[95%] left-0 top-8 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
								></div>
								<div
									class="absolute right-0 -top-2 -bottom-16 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
								></div>
								<div
									class="absolute -right-2/3 top-px -mb-px flex h-8 items-end overflow-hidden"
								>
									<div class="-mb-px flex h-[2px] w-80 -scale-x-100">
										<div
											class="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"
										></div>
										<div
											class="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"
										></div>
									</div>
								</div>
							</div>
						</div>
						<div class="relative ml-6 flex items-center justify-end">
							<div class="relative p-4">
								<div
									class="pointer-events-auto h-6 w-10 rounded-full bg-slate-900/10 p-1 ring-1 ring-inset ring-slate-900/5 transition duration-200 ease-in-out"
								>
									<div
										class="h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out"
									></div>
								</div>
								<div class="z-0">
									<div
										class="absolute left-0 -top-full bottom-2/3 w-px bg-slate-900/[0.2] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
								</div>
							</div>
							<div class="relative p-4">
								<div
									class="pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900"
								>
									<div class="flex py-2 px-3">
										<svg class="mr-2.5 h-5 w-5 flex-none fill-slate-400">
											<path
												d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"
											></path></svg
										>Bookmark
									</div>
									<div class="border-l border-slate-400/20 py-2 px-2.5">
										12k
									</div>
								</div>
								<div class="z-0">
									<div
										class="absolute -top-12 right-0 -bottom-8 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute -top-12 left-0 -bottom-8 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
								</div>
							</div>
							<div class="relative p-4">
								<div
									class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
								>
									Button A
								</div>
							</div>
							<div class="z-0">
								<div
									class="absolute -left-12 -right-4 top-0 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
								></div>
								<div
									class="absolute left-0 -right-4 bottom-0 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
								></div>
							</div>
						</div>
					</div>
					<div class="relative z-10 mt-8">
						<div class="relative p-4">
							<div
								class="w-[19.875rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
							>
								<div class="flex items-center p-4 pb-0">
									<img
										src="https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80"
										alt=""
										class="h-10 w-10 flex-none rounded-full"
									/>
									<div class="ml-4 flex-auto">
										<div class="font-medium">Emily Selman</div>
										<div class="mt-1 text-slate-500">
											Sent you an invite to connect.
										</div>
									</div>
								</div>
								<div class="flex gap-3 p-4">
									<div
										class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
									>
										Accept
									</div>
									<div
										class="pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
									>
										Decline
									</div>
								</div>
							</div>
							<div class="z-0">
								<div
									class="absolute -right-4 -left-12 bottom-0 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
								></div>
								<div
									class="absolute left-[21.875rem] -bottom-16 -top-2 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
								></div>
							</div>
						</div>
						<div class="relative p-4">
							<div
								class="w-[24.5rem] divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10"
							>
								<div class="flex items-center p-4">
									<img
										src="https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80"
										alt=""
										class="h-10 w-10 flex-none rounded-full"
									/>
									<div class="ml-4 flex-auto">
										<div class="font-medium">Leonard Krasner</div>
										<div class="mt-1 text-slate-700">@leonardkrasner</div>
									</div>
									<div
										class="pointer-events-auto ml-4 flex-none rounded-md py-[0.3125rem] px-2 font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
									>
										View
									</div>
								</div>
								<div class="flex items-center p-4">
									<img
										src="https://images.unsplash.com/photo-1676310483825-daa08914445e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80"
										alt=""
										class="h-10 w-10 flex-none rounded-full"
									/>
									<div class="ml-4 flex-auto">
										<div class="font-medium">Floyd Miles</div>
										<div class="mt-1 text-slate-700">@floydmiles</div>
									</div>
									<div
										class="pointer-events-auto ml-4 flex-none rounded-md py-[0.3125rem] px-2 font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
									>
										View
									</div>
								</div>
								<div class="p-4">
									<div
										class="pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
									>
										View all
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="relative z-20 px-48 sm:z-auto">
				<div class="max-w-container mx-auto pb-16">
					<div
						class="relative mx-auto grid max-w-[40rem] grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
					>
						<div class="flex">
							<div class="p-0.5">
								<svg
									class="h-10 w-10 shrink-0 transform-cpu rounded-lg shadow-md shadow-indigo-500/[.12]"
									viewBox="0 0 40 40"
									fill="none"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M.75 8A7.25 7.25 0 018 .75h24A7.25 7.25 0 0139.25 8v24A7.25 7.25 0 0132 39.25H8A7.25 7.25 0 01.75 32V8z"
										class="fill-indigo-50 stroke-indigo-500"
									></path>
									<path
										d="M27 25.335L30.25 27l-6.603 3.382a8 8 0 01-7.294 0L9.75 27 13 25.335m14-6.999L30.25 20l-6.603 3.382a8 8 0 01-7.294 0L9.75 20 13 18.336"
										class="stroke-indigo-500/50"
									></path>
									<path
										d="M9.75 13l9.338-4.783a2 2 0 011.824 0L30.25 13l-6.603 3.382a8 8 0 01-7.294 0L9.75 13z"
										class="stroke-indigo-500"
									></path>
								</svg>
							</div>
							<div class="ml-6">
								<h2 class="text-sm font-semibold leading-6 text-slate-900">
									500+ Components
								</h2>
								<p class="mt-2 text-sm leading-6 text-slate-700">
									Beautifully designed, expertly crafted components that follow
									all accessibility best practices and are easy to customize.
								</p>
							</div>
						</div>
						<div class="flex">
							<div class="p-0.5">
								<svg
									class="h-10 w-10 shrink-0 transform-cpu rounded-lg shadow-md shadow-indigo-500/[.12]"
									viewBox="0 0 40 40"
									fill="none"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M.75 8A7.25 7.25 0 018 .75h24A7.25 7.25 0 0139.25 8v24A7.25 7.25 0 0132 39.25H8A7.25 7.25 0 01.75 32V8z"
										class="fill-indigo-50 stroke-indigo-500"
									></path>
									<path
										d="M22.25 11.75l-4.5 16.5"
										class="stroke-indigo-500/50"
									></path>
									<path
										d="M16.25 7.75h-.5a4 4 0 00-4 4v4.007a3 3 0 01-.88 2.122 3 3 0 000 4.242 3 3 0 01.88 2.122v4.007a4 4 0 004 4h.5m7.5-24.5h.5a4 4 0 014 4v4.007a3.002 3.002 0 00.878 2.122 3 3 0 010 4.242 3 3 0 00-.878 2.122v4.007a4 4 0 01-4 4h-.5"
										class="stroke-indigo-500"
									></path>
								</svg>
							</div>
							<div class="ml-6">
								<h2 class="text-sm font-semibold leading-6 text-slate-900">
									React, Vue, and HTML
								</h2>
								<p class="mt-2 text-sm leading-6 text-slate-700">
									Interactive examples for React and Vue powered by Headless UI,
									plus vanilla HTML if you’d rather write any necessary JS
									yourself.
								</p>
							</div>
						</div>
						<div class="flex">
							<div class="p-0.5">
								<svg
									class="h-10 w-10 shrink-0 transform-cpu rounded-lg shadow-md shadow-indigo-500/[.12]"
									viewBox="0 0 40 40"
									fill="none"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M.75 8A7.25 7.25 0 018 .75h24A7.25 7.25 0 0139.25 8v24A7.25 7.25 0 0132 39.25H8A7.25 7.25 0 01.75 32V8z"
										class="fill-indigo-50 stroke-indigo-500"
									></path>
									<path
										d="M7.75 21.25v-1.5a4 4 0 014-4h7.5m5 5v7.5a4 4 0 01-4 4h-1.5M27.75 32.25h.5a4 4 0 004-4v-10.5m-10-10h-10.5a4 4 0 00-4 4v.5"
										class="stroke-indigo-500/50"
									></path>
									<path d="M31.5 8.5l-23 23" class="stroke-indigo-500"></path>
									<path
										d="M25.75 7.75h4.5a2 2 0 012 2v4.5m-18 18h-4.5a2 2 0 01-2-2v-4.5"
										class="stroke-indigo-500"
									></path>
								</svg>
							</div>
							<div class="ml-6">
								<h2 class="text-sm font-semibold leading-6 text-slate-900">
									Fully Responsive
								</h2>
								<p class="mt-2 text-sm leading-6 text-slate-700">
									Every example is fully responsive and carefully designed and
									implemented to look great at any screen size.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="sticky top-0 z-10 overflow-x-auto whitespace-nowrap border-b border-transparent bg-white px-48 shadow-sm transition duration-100"
		>
			<div
				class="max-w-container mx-auto flex justify-between space-x-8 py-4 text-sm font-semibold leading-6 text-slate-900"
			>
				<div class="flex space-x-8">
					<a v-for="tab in tabs" :key="tab" :href="`#${tab.url}`">{{
						tab.name
					}}</a>
				</div>
				<div v-if="!user" class="flex space-x-8">
					<a href="#pricing">Pricing</a
					><a href="#faqs"
						><abbr title="Frequently asked questions">FAQs</abbr></a
					>
				</div>
			</div>
		</div>
		<div
			class="max-w-container sm:px-46 relative mx-auto w-full space-y-20 px-48 pt-20 pb-20 lg:px-48"
		>
			<section
				v-for="tab in tabs"
				:key="tab"
				:id="tab.url"
				class="scroll-mt-28"
			>
				<h2 class="text-xl font-bold text-slate-900">{{ tab.name }}</h2>
				<p class="mt-3 text-sm leading-7 text-slate-500">
					{{ tab.description }}
				</p>
				<div
					class="mt-10 divide-y divide-slate-100 border-t border-slate-100 lg:mt-12"
				>
					<section
						v-for="section in tab.children"
						:key="section"
						id="product-marketing-sections"
						class="grid scroll-mt-12 grid-cols-1 gap-x-8 gap-y-10 py-10 lg:py-12 xl:grid-cols-4"
					>
						<h3 class="text-base font-semibold capitalize text-slate-900">
							{{ section.name }}
						</h3>
						<ul
							class="col-span-3 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 sm:gap-y-10 md:grid-cols-3 xl:gap-x-8"
						>
							<li
								v-for="component in components.filter(
									(o) =>
										o.connectors.includes(section.id) &&
										o.categories.includes(tab.url)
								)"
								:key="component"
							>
								<div
									class="group relative before:absolute before:-inset-2.5 before:rounded-[20px] before:bg-gray-50 before:opacity-0 hover:before:opacity-100"
								>
									<div
										class="relative aspect-[2/1] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-900/10"
									>
										<img
											:src="component.images[0]?.url"
											:alt="component.images[0]?.alt"
											class="absolute inset-0 h-full w-full object-cover"
										/>
									</div>
									<h4
										class="mt-4 max-w-full overflow-hidden truncate text-ellipsis whitespace-nowrap text-sm font-medium text-slate-900 group-hover:text-indigo-600"
									>
										<a :href="`/components/${component.id}`" class=""
											><span class="absolute -inset-2.5 z-10"></span>
											<div class="relative">{{ component.name }}</div></a
										>
									</h4>
									<p class="relative mt-1.5 text-xs font-medium text-slate-500">
										12 components
									</p>
									<p
										v-if="isWithinLast30Days(component.created_at) && !user"
										class="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-sky-500 bg-opacity-90 py-0.5 px-1.5 text-[0.625rem] font-semibold uppercase leading-4 tracking-wide text-white"
									>
										New
									</p>
									<p
										v-if="!templates.includes(`${component.tray_project_id}`)"
										class="pointer-events-none absolute top-3 right-3 flex items-center justify-center rounded-full bg-gray-900 bg-opacity-30 p-1 text-white"
									>
										<span class="sr-only"
											>PNG previews only, upgrade to get the HTML.</span
										><svg
											aria-hidden="true"
											viewBox="0 0 24 24"
											fill="none"
											class="h-6 w-6"
										>
											<path
												d="M5.75 11.75a1 1 0 011-1h10.5a1 1 0 011 1v5.5a2 2 0 01-2 2h-8.5a2 2 0 01-2-2v-5.5zM7.75 10.5v-.157c0-1.562-.094-3.302.996-4.42C9.368 5.288 10.374 4.75 12 4.75c1.626 0 2.632.537 3.254 1.174 1.09 1.117.996 2.857.996 4.419v.157"
												stroke="#fff"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</svg>
									</p>
								</div>
							</li>
						</ul>
					</section>
				</div>
			</section>
		</div>
		<Faq v-if="!user" />
		<FooterContent />
	</div>
</template>

<script>
	export default {
		methods: {
			isWithinLast30Days(timestamp) {
				const now = Date.now();
				const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
				return (
					new Date(timestamp) >= thirtyDaysAgo && new Date(timestamp) <= now
				);
			},
		},
	};
</script>
