<script setup>
	import { ArrowDownCircleIcon } from '@heroicons/vue/24/outline';
	import { CheckCircleIcon } from '@heroicons/vue/24/outline';
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

	let { data: blueprints } = await useFetch(`/api/blueprints`);
	blueprints = blueprints.value.data;
</script>

<template>
	<div class="">
		<div class="">
			<!-- <div
				class="absolute inset-x-0 top-0 z-10 overflow-hidden pl-[50%] lg:hidden"
			></div> -->
			<div
				v-if="!user"
				class="relative right-0 -mt-[5.75rem] overflow-hidden bg-slate-50 px-48 pt-12 dark:bg-[#0A101E] md:pt-[5.75rem]"
			>
				<!-- <div
					class="absolute inset-y-0 hidden w-full min-w-[1360px] bg-[url('/img/beams-templates-header.png')] bg-[length:2000px_100%] bg-[position:calc(50%_+_220px)_-50px] bg-no-repeat lg:block"
				></div> -->
				<div class="max-w-container mx-auto px-4 pt-4 sm:px-6 lg:flex lg:px-8">
					<div
						class="relative mx-auto max-w-[40rem] pb-16 pt-16 lg:mx-0 lg:w-[40rem] lg:max-w-none lg:flex-none lg:pb-24 lg:pr-4 lg:pt-20"
					>
						<h1 class="text-base font-semibold leading-7 text-sky-500">
							By the engineers of Tray.io
						</h1>
						<p
							class="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-black dark:text-white sm:text-5xl sm:leading-[3.5rem]"
						>
							Modern integration blueprints, crafted with Tray.io
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
								><span class="ml-2.5">Tray.io</span>
							</div>
							<div
								class="ml-6 flex items-center text-sm font-medium text-slate-500"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									view-box="0 0 512 512"
									class="h-4 w-4 text-slate-400"
								>
									<path
										fill="#111"
										fill-opacity="1"
										d="M379.9294434,366.462677H135.6262665c-34.7477951,0-34.7477951-52.7503357,0-52.7503357h244.3031769C415.3113403,313.7123413,415.3113403,366.462677,379.9294434,366.462677z M389.748291,198.6721344l-61.0731201,41.2457428c-28.9603882,19.5740356-58.4223328-24.0158386-29.4619446-43.5898132l61.0731201-41.2457428C389.3727722,135.4229584,418.8347168,179.0127716,389.748291,198.6721344z M459.3392639,395.0712891c0,4.9779358-1.9806213,9.7557068-5.5046692,13.2850037l-45.3913879,45.3913574c-3.5240479,3.5187988-8.3018188,5.5046997-13.2902527,5.5046997H116.8470688c-4.9884644,0-9.7662277-1.9859009-13.2902908-5.5046997l-45.3913536-45.3913574c-3.5240555-3.5292969-5.5046959-8.3070679-5.5046959-13.2850037v-278.12677c0-4.988472,1.9806404-9.7662277,5.5046959-13.2850189l45.3913612-45.4018898c3.5240555-3.5187874,8.3018188-5.4994316,13.2902832-5.4994316h278.3058777c4.9884338,0,9.7662048,1.9806366,13.2902527,5.4994316l45.3913879,45.4018898c3.5240479,3.5187912,5.5046692,8.2965622,5.5046692,13.2850189V395.0712891z M497.972229,73.2914734l-59.2649841-59.2649727c-8.9793091-8.9793224-21.1578979-14.0238533-33.8565674-14.0238533H107.1071625c-12.705574,0-24.8896561,5.0516768-33.8710022,14.0382986L14.0172186,73.2967453C5.0411372,82.2780991,0,94.4516373,0,107.151947v297.701355c0,12.7003174,5.046412,24.8896484,14.0277586,33.8604736l59.256916,59.2569275c8.9811172,8.9811096,21.1621246,14.0266418,33.8633423,14.0266418h297.7081299c12.6985474,0,24.8770447-5.0444946,33.8562622-14.0237122l59.2598267-59.2598572C506.9535828,429.742981,512,417.5536194,512,404.853302V107.1575012C512,94.4552765,506.954071,82.2733002,497.972229,73.2914734z M250.8561554,218.1255493c-0.000061,35.2069092-52.6608276,35.2069092-52.6607666,0c0-26.5118866-39.7962341-26.5118866-39.7962341,0c-0.0000763,35.2069092-52.6608429,35.2069092-52.6607742,0C110.973175,121.3407974,246.2958527,122.2234268,250.8561554,218.1255493z"
									/>
								</svg>
								<span class="ml-2.5">Robocorp</span>
							</div>
						</div>
						<p class="mt-4 text-base leading-7 text-slate-600">
							Visually-stunning, easy to customize integration blueprints built
							with Tray.io. The perfect starting point for your next biz ops
							project and the ultimate resource for learning how experts build
							low-code API integrations.
						</p>
						<div class="mt-8 flex gap-4">
							<a
								href="#browse"
								class="inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-sm font-semibold text-white hover:bg-slate-700"
								><span
									>Browse <span class="hidden sm:inline">blueprints</span>
									<span aria-hidden="true" class="text-slate-400 sm:inline"
										>→</span
									></span
								></a
							><a
								class="hover:ring-slate-900/15 inline-flex justify-center rounded-lg bg-white/0 py-3 px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25"
								href="/all-access"
								><span
									>Get <span class="hidden sm:inline">everything</span> with
									all-access
									<span aria-hidden="true" class="text-black/25 sm:inline"
										>→</span
									></span
								></a
							>
						</div>
					</div>
					<div class="relative z-10 hidden lg:block">
						<div class="mt-6 flex">
							<div class="relative flex-shrink-0 p-4">
								<div
									class="relative z-10 overflow-hidden rounded shadow-xl ring-1 ring-slate-900/5"
								>
									<img
										class="h-[404px] w-[336px] object-cover"
										src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
									/>
								</div>
								<div class="z-0">
									<div
										class="absolute left-0 -right-12 top-0 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute -top-8 bottom-0 left-12 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute left-0 -right-12 bottom-14 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute right-0 -top-2 -bottom-8 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute bottom-full right-10 -mb-px flex h-8 items-end overflow-hidden"
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
							<div class="relative mt-14 flex-shrink-0 p-4">
								<div
									class="overflow-hidden rounded shadow-xl ring-1 ring-slate-900/5"
								>
									<img
										class="h-[404px] w-[336px] object-cover"
										src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3432&q=80"
									/>
								</div>
								<div>
									<div
										class="absolute -left-4 -right-8 top-0 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute right-0 -top-20 -bottom-12 w-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_top,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute -left-4 -right-8 bottom-0 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
									<div
										class="absolute top-[calc(100%-1px)] right-10 -mb-px flex h-8 items-start overflow-hidden"
									>
										<div class="-mt-px flex h-[2px] w-80 -scale-x-100">
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
							<div class="relative flex-shrink-0 p-4">
								<div
									class="overflow-hidden rounded shadow-xl ring-1 ring-slate-900/5"
								>
									<img
										class="h-[404px] w-[336px] object-cover"
										src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2376&q=80"
									/>
								</div>
								<div>
									<div
										class="absolute -left-12 -right-8 top-0 h-px bg-slate-900/[0.1] [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="relative z-20 sm:z-auto">
					<div class="max-w-container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
						<div
							class="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
						>
							<div class="flex">
								<div class="p-0.5">
									<svg
										class="h-10 w-10 shrink-0 transform-cpu rounded-lg shadow-md shadow-sky-500/[.12]"
										viewBox="0 0 40 40"
										fill="none"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M.75 8A7.25 7.25 0 018 .75h24A7.25 7.25 0 0139.25 8v24A7.25 7.25 0 0132 39.25H8A7.25 7.25 0 01.75 32V8z"
											class="fill-sky-50 stroke-sky-500 dark:fill-slate-900"
										></path>
										<path
											opacity="0.4"
											d="M17.25 33.25h-8.5a2 2 0 01-2-2V8.75a2 2 0 012-2h22.5a2 2 0 012 2v1m-4 3h-18.5"
											class="stroke-sky-500/40"
										></path>
										<path
											d="M31.25 12.75h-8.5a2 2 0 00-2 2v16.5a2 2 0 002 2h8.5a2 2 0 002-2v-16.5a2 2 0 00-2-2z"
											class="fill-white stroke-sky-500 dark:fill-black"
										></path>
										<path d="M26.75 30.25h.5" class="stroke-sky-500"></path>
									</svg>
								</div>
								<div class="ml-6">
									<h2
										class="text-sm font-semibold leading-6 text-slate-900 dark:text-white"
									>
										Built with modern technologies
									</h2>
									<p class="mt-2 text-sm leading-6 text-slate-700">
										Each blueprint is a well-structured Tray.io project, giving
										you a Tray workspace that’s productive and enjoyable to work
										in.
									</p>
								</div>
							</div>
							<div class="flex">
								<div class="p-0.5">
									<svg
										class="h-10 w-10 shrink-0 transform-cpu rounded-lg shadow-md shadow-sky-500/[.12]"
										viewBox="0 0 40 40"
										fill="none"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M.75 8A7.25 7.25 0 018 .75h24A7.25 7.25 0 0139.25 8v24A7.25 7.25 0 0132 39.25H8A7.25 7.25 0 01.75 32V8z"
											class="fill-sky-50 stroke-sky-500 dark:fill-slate-800"
										></path>
										<path
											d="M24.847 33.25L19.82 20.113c-.324-.846.543-1.656 1.351-1.261L33.25 24.75l-6.426 2-1.977 6.5z"
											class="fill-white stroke-sky-500 dark:fill-black"
										></path>
										<path
											d="M33.25 20.25V9.75a3 3 0 00-3-3H9.75a3 3 0 00-3 3v20.5a3 3 0 003 3h10.5"
											class="stroke-sky-500/40"
										></path>
										<path d="M11.75 11.75v16.5" class="stroke-sky-500"></path>
									</svg>
								</div>
								<div class="ml-6">
									<h2
										class="text-sm font-semibold leading-6 text-slate-900 dark:text-white"
									>
										Easy to customize
									</h2>
									<p class="mt-2 text-sm leading-6 text-slate-700">
										Everything is built using low-code modules, just open the
										workflow in Tray and change whatever you want.
									</p>
								</div>
							</div>
							<div class="flex">
								<div class="p-0.5">
									<svg
										class="h-10 w-10 shrink-0 transform-cpu rounded-lg shadow-md shadow-sky-500/[.12]"
										viewBox="0 0 40 40"
										fill="none"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M.75 8A7.25 7.25 0 018 .75h24A7.25 7.25 0 0139.25 8v24A7.25 7.25 0 0132 39.25H8A7.25 7.25 0 01.75 32V8z"
											class="fill-sky-50 stroke-sky-500 dark:fill-black"
										></path>
										<path
											d="M31.817 26a13.194 13.194 0 001.433-6c0-7.318-5.932-13.25-13.25-13.25S6.75 12.682 6.75 20c0 2.16.517 4.199 1.433 6"
											class="stroke-sky-500/40"
										></path>
										<path
											d="M15.75 18a4.25 4.25 0 108.5 0 4.25 4.25 0 00-8.5 0z"
											class="fill-white stroke-sky-500 dark:fill-black"
										></path>
										<path
											d="M28.982 29.74c-.994-2.29-4.638-3.99-8.982-3.99-4.344 0-7.989 1.7-8.982 3.99A13.202 13.202 0 0020 33.25c3.466 0 6.62-1.33 8.982-3.51z"
											class="fill-white stroke-sky-500 dark:fill-black"
										></path>
									</svg>
								</div>
								<div class="ml-6">
									<h2
										class="text-sm font-semibold leading-6 text-slate-900 dark:text-white"
									>
										Built by experts
									</h2>
									<p class="mt-2 text-sm leading-6 text-slate-700">
										All of the blueprints follow integration best practices,
										because they're written by the same team who created and
										maintain the Tray.io platform.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="pointer-events-none absolute inset-0 shadow-[inset_0_-1px_1px_rgba(0,0,0,0.06)]"
				></div>
			</div>
			<div id="browse" class="relative px-4 dark:bg-[#0A101E] sm:px-6 lg:px-0">
				<div
					class="mx-auto mt-20 w-full max-w-[40rem] space-y-8 divide-y divide-slate-900/10 sm:space-y-10 lg:max-w-none lg:space-y-24 lg:divide-y-0"
				>
					<section
						v-for="(product, i) in blueprints"
						:key="product?.id"
						:id="`product-${product?.id}`"
						:class="[i > 0 ? 'pt-12 sm:pt-16 lg:pt-0' : 'group']"
					>
						<div
							class="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:gap-0"
						>
							<div
								class="group sm:pt-2 md:pr-6 lg:relative lg:ml-auto lg:w-[19.5rem] lg:flex-none lg:pr-0 lg:pl-8"
							>
								<h2
									class="text-base font-semibold text-slate-900 dark:text-white"
								>
									<a :href="'/blueprints/' + product.id"
										><span class="absolute inset-0 lg:left-8"></span
										>{{ product.name }}</a
									>
								</h2>
								<p class="text-sm capitalize leading-6 text-slate-600">
									{{ product.category }} template
								</p>
								<p class="mt-3 text-sm leading-6 text-slate-600">
									{{ product.summary }}
								</p>
								<div class="mt-4 h-px w-6 bg-slate-300"></div>
								<a
									:href="'/blueprints/' + product.id"
									v-if="
										user &&
										templates.filter((o) => o === product.tray_project_id)
											.length > 0
									"
									class="relative mt-4 inline-flex items-center justify-center text-sm font-semibold text-slate-900 dark:text-white"
									><CheckCircleIcon class="mr-2 h-6 w-6 stroke-current" />
									Downloaded</a
								>
								<a
									:href="'/blueprints/' + product.id"
									v-else-if="
										user &&
										allAccess &&
										!(
											templates.filter((o) => o === product.tray_project_id)
												.length > 0
										)
									"
									class="relative mt-4 inline-flex items-center justify-center text-sm font-semibold text-slate-900 group-hover:text-sky-600"
									><ArrowDownCircleIcon class="mr-2 h-6 w-6 stroke-current" />
									Download</a
								>
								<p v-else class="mt-4 text-sm leading-6 text-slate-600">
									<strong class="font-semibold text-slate-900"
										>${{ (product.setup_fee / 100).toLocaleString() }}</strong
									>
									or included with all-access
								</p>
							</div>
							<div
								class="lg:relative lg:mr-auto lg:flex lg:min-w-0 lg:overflow-x-auto"
							>
								<div
									class="sticky left-0 z-10 hidden w-8 flex-none lg:block"
								></div>
								<div
									class="lg:relative lg:flex lg:flex-none lg:items-start lg:pr-8"
								>
									<a
										tabindex="-1"
										class="hidden lg:absolute lg:inset-y-0 lg:-left-8 lg:right-8 lg:z-10 lg:block"
										:href="'/blueprints/' + product.id"
										><span class="sr-only">View Salient template</span></a
									><img
										v-for="(image, i) in product.images[0]
											? product.images
											: [
													{
														url: 'https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/images/blueprints/1/187shots_so.png',
														alt: 'shots',
													},
													{
														url: 'https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/images/blueprints/1/187shots_so.png',
														alt: 'shots',
													},
													{
														url: 'https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/images/blueprints/1/187shots_so.png',
														alt: 'shots',
													},
											  ]"
										:key="image"
										:src="image.url"
										:alt="image.alt"
										:class="[
											i > 0 ? 'lg:ml-8 lg:block' : '',
											'w-full rounded-xl bg-slate-100 object-cover lg:w-[19.1666666rem] lg:flex-none',
										]"
									/>
								</div>
							</div>
						</div>
					</section>
					<div v-if="!user" class="">
						<section
							v-for="(product, i) in blueprints.slice(0, 1)"
							:key="product.id"
							:class="[true ? 'pt-12 sm:pt-16 lg:pt-0' : 'relative']"
						>
							<div
								class="relative grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:flex lg:gap-0"
							>
								<NuxtLink
									:to="'/contact'"
									class="group absolute inset-0 z-10 col-span-1 flex h-full w-auto items-center justify-center bg-slate-900/40 py-24 text-center text-white hover:bg-black/30"
								>
									<div class="flex flex-col space-y-4">
										<h2 class="text-2xl font-semibold">
											Want to see your software's name here?
										</h2>
										<button
											class="flex items-center justify-center rounded bg-indigo-700 px-3 py-2 text-sm group-hover:bg-indigo-600"
										>
											<div class="mr-2">Click to apply</div>
											<div
												aria-hidden="true"
												class="text-white/25 dark:text-black/25"
											>
												→
											</div>
										</button>
									</div>
								</NuxtLink>
								<div
									class="blur-sm sm:pt-2 md:pr-6 lg:relative lg:ml-auto lg:w-[19.5rem] lg:flex-none lg:pr-0 lg:pl-8"
								>
									<h2 class="text-base font-semibold text-slate-900">
										<a :href="'/blueprints/' + product.id"
											><span class="absolute inset-0 lg:left-8"></span
											>{{ product.name }}</a
										>
									</h2>
									<p class="text-sm capitalize leading-6 text-slate-600">
										{{ product.category }} template
									</p>
									<p class="mt-3 text-sm leading-6 text-slate-600">
										{{ product.summary }}
									</p>
									<div class="mt-4 h-px w-6 bg-slate-300"></div>
									<a
										v-if="user"
										href="https://tailwindui.com/templates/salient/download"
										class="relative mt-4 inline-flex items-center justify-center text-sm font-semibold text-slate-900 hover:text-sky-600"
										><svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											class="mr-2 h-6 w-6 stroke-current"
										>
											<circle cx="12" cy="12" r="9" stroke-width="1.5"></circle>
											<path
												d="M9 12.75L12 15.75M12 15.75L15 12.75M12 15.75L12 8.25"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path></svg
										>Download</a
									>
									<p v-else class="mt-4 text-sm leading-6 text-slate-600">
										<strong class="font-semibold text-slate-900"
											>${{ product.setup_fee }}</strong
										>
										or included with all-access
									</p>
								</div>
								<div
									class="blur-sm grayscale lg:relative lg:mr-auto lg:flex lg:min-w-0 lg:overflow-x-auto"
								>
									<div
										class="sticky left-0 z-10 hidden w-8 flex-none lg:block"
									></div>
									<div
										class="lg:relative lg:flex lg:flex-none lg:items-start lg:pr-8"
									>
										<a
											tabindex="-1"
											class="hidden lg:absolute lg:inset-y-0 lg:-left-8 lg:right-8 lg:block"
											:href="'/blueprints/' + product.id"
											><span class="sr-only">View Salient template</span></a
										><img
											v-for="(image, i) in product.images"
											:key="image"
											:src="image.url"
											alt="This is a preview image"
											width="560"
											height="380"
											:class="[
												i > 0 ? 'lg:ml-8 lg:block' : '',
												'w-full rounded-xl bg-slate-100 lg:w-[19.1666666rem] lg:flex-none ',
											]"
										/>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>

			<FooterContent class="dark:bg-[#0A101E]" />
		</div>
	</div>
</template>
