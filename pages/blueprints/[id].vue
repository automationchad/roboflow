<script setup>
	import {
		LinkIcon,
		ArrowTopRightOnSquareIcon,
	} from '@heroicons/vue/24/outline';
	import { format } from 'date-fns';
	import {
		ArrowDownCircleIcon,
		CheckCircleIcon,
	} from '@heroicons/vue/20/solid';
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	const user = attrs.user;
	const profile = attrs.profile;
	const route = useRoute();
	const loading = ref(false);
	const allAccess = ref(false);
	const templates = ref([]);
	const workspace = ref('');

	if (user) {
		if (profile) {
			allAccess.value = profile.workspaces.all_access;
			templates.value = profile.workspaces.templates;
			workspace.value = profile.workspaces;
		}
		loading.value = false;
	}

	const {
		pending,
		data: product,
		refresh,
	} = await $fetch(`/api/blueprints/${route.params.id}`);

	const handleDownload = async () => {
		loading.value = true;
		const data = await $fetch(`/api/workspaces/${user.id}`, {
			method: 'post',
			body: {
				workspace: profile.workspaces,
				blueprint: product,
				user: profile,
			},
		});
		if (data) {
			loading.value = false;
			location.reload();
		}
	};

	const { data: reviews } = await $fetch(`/api/reviews`);

	const exists =
		templates.value.filter((o) => o === product.tray_project_id).length > 0;
</script>

<script>
	export default {
		data() {
			return {
				success: false,
				showLoginModal: false,
				showOtpModal: false,
			};
		},

		computed: {},
		methods: {
			handleOtpModal() {
				this.showOtpModal = true;
				setTimeout(() => {
					this.showOtpModal = false;
				}, 2000);
			},
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
				if (tasks < 1000) return 1000 * 0.047;
				if (tasks < 5000) return 1000 * 0.047 + 4000 * 0.033;
				if (tasks < 10000) return 1000 * 0.047 + 4000 * 0.033 + 5000 * 0.02303;
				if (tasks < 50000)
					return 1000 * 0.047 + 4000 * 0.033 + 5000 * 0.02303 + 40000 * 0.01612;
				if (tasks < 100000)
					return (
						1000 * 0.047 +
						4000 * 0.033 +
						5000 * 0.02303 +
						40000 * 0.01612 +
						50000 * 0.1128
					);
				if (tasks < 500000)
					return (
						1000 * 0.047 +
						4000 * 0.033 +
						5000 * 0.02303 +
						40000 * 0.01612 +
						50000 * 0.1128 +
						400000 * 0.0079
					);
				if (tasks < 1000000)
					return (
						1000 * 0.047 +
						4000 * 0.033 +
						5000 * 0.02303 +
						40000 * 0.01612 +
						50000 * 0.1128 +
						400000 * 0.0079 +
						500000 * 0.0053
					);
			},
		},
		components: { CheckCircleIcon, ArrowDownCircleIcon },
	};
</script>

<template>
	<div>
		<div class="relative bg-slate-50 px-48 dark:bg-[#121c30]">
			<div class="absolute inset-0 overflow-hidden">
				<img src="" alt="" class="absolute bottom-0 hidden lg:block" /><img
					:src="product.images?.[0]?.url"
					alt=""
					class="absolute -top-[7rem] left-1/2 -ml-[16rem] w-[60.4375rem] max-w-none sm:-ml-[10rem] md:-ml-[16rem] lg:-top-[10rem] lg:-ml-[22rem] lg:hidden"
				/>
			</div>
			<div class="relative">
				<div
					class="max-w-container relative mx-auto px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20"
				>
					<div
						class="mx-auto grid max-w-[40rem] grid-cols-1 gap-y-16 gap-x-8 lg:max-w-none lg:grid-cols-3"
					>
						<div class="flex flex-col lg:pb-6">
							<h1
								class="mt-4 text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-[3.5rem]"
							>
								{{ product.name }}
							</h1>
							<p
								class="order-first text-base font-semibold leading-7 text-sky-500"
							>
								{{ product.category }}
							</p>
							<p
								class="mt-6 text-base leading-7 text-slate-700 dark:text-slate-400"
							>
								{{ product.description }}
							</p>
							<div class="mt-6 flex flex-wrap">
								<div
									class="flex items-center text-sm font-medium text-slate-500"
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
							<div v-if="!allAccess && !exists" class="mt-10 flex gap-4">
								<a
									href="https://pocket.tailwindui.com"
									class="inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-sm font-semibold text-white hover:bg-slate-700"
									target="_blank"
									><span
										><span class="inline-flex items-center"
											><span>Documentation</span
											><svg
												viewBox="0 0 20 20"
												class="ml-1.5 h-5 w-5 fill-slate-400"
												fill-rule="evenodd"
												clip-rule="evenodd"
											>
												<path
													d="M7 3.25H3.25v13.5h13.5V13h-1.5v2.25H4.75V4.75H7v-1.5Zm9.75 0H10v1.5h4.19l-5.72 5.72 1.06 1.06 5.72-5.72V10h1.5V3.25Z"
												></path></svg></span></span></a
								><a
									href="#pricing"
									class="hover:ring-slate-900/15 inline-flex justify-center rounded-lg bg-white/0 py-3 px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25"
									><span
										>Get this template
										<span aria-hidden="true" class="text-black/25"
											>→</span
										></span
									></a
								>
							</div>
							<div v-else class="mt-10 flex gap-4">
								<button
									v-if="!exists && allAccess"
									@click="handleDownload"
									class="inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-sm font-semibold text-white hover:bg-slate-700"
								>
									<span
										><span class="flex items-center"
											><div class="flex items-center" v-if="!loading">
												Download
												<ArrowDownCircleIcon
													class="ml-1.5 h-5 w-5 fill-slate-400"
												/>
											</div>
											<span class="flex items-center" v-else>
												<svg
													class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														class="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														stroke-width="4"
													></circle>
													<path
														class="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													></path>
												</svg>

												Processing...</span
											></span
										></span
									></button
								><button
									disabled
									v-else-if="exists"
									class="inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-sm font-semibold text-slate-200"
								>
									<span
										><span class="flex items-center"
											>Downloaded
											<CheckCircleIcon class="ml-1.5 h-5 w-5" /> </span
									></span></button
								><a
									:href="product.documentation?.[0]?.url ?? ''"
									class="hover:ring-slate-900/15 inline-flex justify-center rounded-lg py-3 px-4 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25 dark:bg-white/10 dark:text-white"
									target="_blank"
									><span
										><span class="flex items-center"
											>Documentation<svg
												viewBox="0 0 20 20"
												class="ml-1.5 h-5 w-5 fill-slate-400"
												fill-rule="evenodd"
												clip-rule="evenodd"
											>
												<path
													d="M7 3.25H3.25v13.5h13.5V13h-1.5v2.25H4.75V4.75H7v-1.5Zm9.75 0H10v1.5h4.19l-5.72 5.72 1.06 1.06 5.72-5.72V10h1.5V3.25Z"
												></path></svg></span></span
								></a>
							</div>
						</div>
						<div class="relative lg:col-span-2">
							<img
								:src="product.images?.[0]?.url"
								width="1600"
								height="1280"
								class="relative z-20 -mb-36 aspect-[853/682] max-w-[853px] rounded-xl bg-slate-200 object-cover shadow-xl shadow-black/5 ring-1 ring-slate-900/5 dark:bg-black sm:-mb-16 lg:-mb-8 xl:-mb-16"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="absolute inset-x-0 bottom-0 h-px overflow-hidden">
				<div
					class="absolute -right-8 bottom-0 -left-8 h-px bg-slate-900/[0.1]"
				></div>
			</div>
		</div>
		<div
			class="max-w-container mx-auto mt-52 w-full px-4 pb-20 dark:bg-[#0A101E] sm:mt-36 sm:px-6 sm:pb-24 lg:mt-28 lg:px-8 lg:pb-32 xl:mt-36"
		>
			<div
				class="mx-auto max-w-[40rem] space-y-20 divide-y divide-slate-200 dark:divide-slate-800 sm:space-y-24 lg:max-w-none lg:space-y-32"
			>
				<section
					class="grid grid-cols-1 items-baseline gap-y-10 gap-x-6 px-48 lg:grid-cols-3"
				>
					<h2
						class="text-2xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white"
					>
						What’s included
					</h2>
					<div
						class="prose prose-slate max-w-2xl space-y-10 prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:text-slate-400 dark:prose-strong:text-white lg:col-span-2"
					>
						<div
							class="prose dark:prose-invert [&>:first-child]:mt-0 [&>:last-child]:mb-0"
						>
							<p>
								{{ product.name }} is a {{ product.category }} template built
								with Tray.io, designed and built by the Motis Group team. It’s
								production-ready and easy to customize, making it the perfect
								starting point for your business process needs.
							</p>
							<p>
								We’ve taken much care with the code, so it’s also an invaluable
								resource if you want to study how experts build integrations
								using the Tray.io platform.
							</p>
						</div>
						<p>
							<strong>Built by experts</strong> — you can trust that all of the
							code is written following integration best practices, because it’s
							written by the same team who created and maintain the framework.
						</p>
						<p>
							<strong>Easy to customize</strong> — everything is styled with
							utility classes, directly in the markup. No configuration
							variables or complex CSS to wrestle with, just open the markup in
							your editor and change whatever you want.
						</p>
						<p>
							<strong>Built with Next.js</strong> —&nbsp;the template is a
							well-structured, thoughtfully componentized Next.js project,
							giving you a codebase that’s productive and enjoyable to work in.
						</p>
						<p>
							<strong>Keyboard accessible</strong> — everything we build is
							keyboard accessible, and we carefully craft the markup to deliver
							the best screenreader experience we know how.
						</p>
						<p>
							<strong>Production-ready</strong> —&nbsp;rigorously tested in the
							latest versions of all browsers to handle lots of edge-cases you
							might easily miss yourself.
						</p>
						<p>
							<strong>Simple to deploy</strong> — production-ready and easily
							deployed anywhere that you can deploy a Next.js application, like
							Vercel or Netlify.
						</p>
					</div>
				</section>
				<section
					class="grid grid-cols-1 gap-y-10 gap-x-6 px-48 pt-10 lg:grid-cols-3"
				>
					<h2
						class="text-2xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white"
					>
						Screenshots
					</h2>
					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
						<img
							:key="image"
							v-for="image in product.images"
							:src="image.url"
							:alt="image.filename"
							class="aspect-[384/246] overflow-hidden rounded-lg bg-slate-200 object-cover ring-1 ring-slate-900/10"
						/>
					</div>
				</section>
				<section
					class="grid grid-cols-1 gap-y-10 gap-x-6 px-48 pt-10 lg:grid-cols-3"
				>
					<h2
						class="text-2xl font-semibold leading-9 tracking-tight text-slate-900 dark:text-white"
					>
						Built for developers
					</h2>
					<div
						class="prose prose-slate max-w-none prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600 dark:bg-[#0A101E] dark:prose-invert lg:col-span-2"
					>
						<p>
							Our templates are thoughtfully crafted with the latest and
							greatest versions of the tools we love so that they are easy to
							maintain, and fun to actually work on.
						</p>
						<div class="not-prose mt-6">
							<ul class="grid grid-cols-2 gap-x-8 gap-y-6 text-slate-500">
								<li>
									<strong class="font-semibold text-slate-900 dark:text-white"
										>v{{ product.version }}</strong
									>
									(Updated
									{{ format(new Date(product.updated_at), 'MMM do, yyyy') }})
								</li>
								<li>
									<strong class="font-semibold text-slate-900 dark:text-white"
										>Estimated </strong
									>{{ abbreviatedNumber(product.estimated_tasks) }}
									monthly tasks
								</li>
								<li>
									<strong class="font-semibold text-slate-900 dark:text-white"
										>Setup time:</strong
									>
									{{ product.setup_time }} min
								</li>

								<li>
									<strong
										class="font-semibold text-sky-700 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-500"
										><a
											:href="product.documentation?.[0]?.url"
											target="_blank"
											class="flex items-center"
											>Documentation<ArrowTopRightOnSquareIcon
												class="ml-1 h-5 w-5" /></a
									></strong>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<blueprint-pricing
					v-if="!exists && !allAccess"
					@open-modal="showLoginModal = true"
					:product="product"
					:authed="user ? true : false"
					:workspace="workspace"
					:price="product.setup_fee"
					:summary="product.summary"
					:name="product.name"
					:software="product.category"
					:reviews="reviews"
				/>
				<Faq />
			</div>
		</div>

		<FooterContent />
		<LoginModal
			v-show="showLoginModal"
			@close-modal="showLoginModal = false"
			@show-otp-modal="handleOtpModal()"
		/>
		<otpModal v-show="showOtpModal" />
	</div>
</template>
