<script setup>
	import {
		StarIcon,
		PlusIcon,
		CheckIcon,
		QuestionMarkCircleIcon,
		ExclamationCircleIcon,
		FireIcon,
	} from '@heroicons/vue/20/solid';
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue';
	import { format } from 'date-fns';
	import { useAttrs } from 'vue';

	const route = useRoute();
	const supabase = useSupabaseClient();
	const attrs = useAttrs();
	const user = attrs.user;
	const profile = attrs.profile;
	const loading = ref(false);
	const exists = ref(false);
	const allAccess = ref(false);
	const templates = ref([]);
	const workspace = ref({});

	if (user) {
		if (profile) {
			allAccess.value = profile.workspaces.all_access;
			templates.value = profile.workspaces.templates;
			workspace.value = profile.workspaces;
		}
		loading.value = false;
	}

	let { data: product } = await $fetch(`/api/components/${route.params.id}`);

	exists.value =
		templates.value.filter((o) => o === product.tray_project_id).length > 0;

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
</script>

<template>
	<main class="col-span-4 min-h-screen overflow-auto dark:bg-[#0A101E]">
		<div class="mx-auto px-4 pb-16 pt-10 sm:px-6 lg:px-8">
			<!-- <Breadcrumbs :product="product" /> -->
		</div>
		<div class="sm:px-46 mx-auto mb-16 h-full px-48 lg:px-48">
			<!-- Product -->
			<div
				class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-6 xl:gap-x-16"
			>
				<!-- Product image -->
				<div class="lg:col-span-4 lg:row-end-1">
					<TabGroup as="div" class="flex flex-col-reverse">
						<!-- Image selector -->
						<div
							class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none"
						>
							<TabList class="grid grid-cols-4 gap-6">
								<Tab
									v-for="image in product.images"
									:key="image.url"
									class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
									v-slot="{ selected }"
								>
									<span class="sr-only"> {{ image.alt }} </span>
									<span class="absolute inset-0 overflow-hidden rounded-md">
										<img
											:src="image.url"
											alt=""
											class="h-full w-full object-cover object-center"
										/>
									</span>
									<span
										:class="[
											selected ? 'ring-indigo-500' : 'ring-transparent',
											'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
										]"
										aria-hidden="true"
									/>
								</Tab>
							</TabList>
						</div>

						<TabPanels class="aspect-w-1 aspect-h-1 w-full">
							<TabPanel v-for="image in product.images" :key="image.id">
								<img
									:src="image.url"
									:alt="image.alt"
									class="h-full w-full object-cover object-center sm:rounded-lg"
								/>
								<!-- <video
								v-else
								class="h-full w-full bg-black object-contain object-center sm:rounded-lg"
								controls
							>
								<source :src="image.url" type="video/mp4" />
								Your browser does not support HTML video.
							</video> -->
							</TabPanel>
						</TabPanels>
					</TabGroup>
					<!-- <div
            class="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100"
          >
            <img
              :src="product.imageSrc[0].url"
              :alt="product.imageAlt"
              class="object-cover object-center"
            />
          </div> -->
				</div>

				<!-- Product details -->
				<div
					class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none"
				>
					<div class="flex flex-col-reverse">
						<div class="">
							<h1
								class="text-3xl font-medium tracking-tight text-gray-900 dark:text-white"
							>
								{{ product.name }}
							</h1>
							<h2 id="information-heading" class="sr-only">
								Product information
							</h2>
							<p class="mt-2 text-xs text-cyan-700">
								<span
									class="rounded-full bg-indigo-300 px-1 text-sm text-indigo-600 dark:bg-indigo-600 dark:text-indigo-300"
									>v{{ product.version ? product.version + '.0' : '1.0' }}</span
								>
								(Updated
								<time :datetime="product.updated_at">{{
									format(new Date(product.updated_at), 'MMM do, yyyy')
								}}</time
								>)
							</p>
							<p class="mt-6 font-normal text-slate-500 dark:text-slate-400">
								{{ product.summary }}
							</p>
							<div class="mx-auto mt-4 w-full max-w-lg space-y-8 lg:mx-0">
								<div class="">
									<h2 class="sr-only">Price</h2>
									<p v-if="!exists" class="grid grid-cols-5 space-x-3">
										<span class="flex flex-col">
											<span
												class="text-3xl font-bold tracking-tight dark:text-gray-200"
												>{{
													product.setup_fee === 0
														? 'NO'
														: `$${(product.setup_fee / 100).toLocaleString()}`
												}}</span
											>
											<span
												class="mt-2 text-base font-medium text-indigo-400 dark:text-indigo-200"
												>Setup fee</span
											>
											<span class="sr-only">plus</span>
										</span>
										<span
											v-if="product.product_sub_type !== 'module'"
											class="pointer-events-none flex h-12 items-center justify-center"
											aria-hidden="true"
										>
											<PlusIcon
												class="h-6 w-6 text-indigo-600 dark:text-indigo-300"
												aria-hidden="true"
											/>
										</span>
										<span
											class="col-span-2"
											v-if="product.product_sub_type !== 'module'"
										>
											<span class="flex flex-col">
												<span
													class="flex items-center text-3xl font-bold tracking-tight dark:text-gray-200"
													>${{
														Math.round(
															taskPrice(product.estimated_tasks)
														).toLocaleString()
													}}<a
														class="group relative ml-2 flex cursor-pointer hover:text-gray-300"
														><QuestionMarkCircleIcon class="h-5 w-5" />
														<div
															class="absolute left-5 ml-2 w-24 whitespace-normal rounded bg-white px-3 py-1 text-xs font-normal tracking-normal text-black opacity-0 transition-opacity group-hover:opacity-100"
														>
															Est. monthly tasks:
															{{ abbreviatedNumber(product.estimated_tasks) }}
														</div></a
													></span
												>
												<div
													class="mt-2 flex items-center text-base font-medium text-indigo-400 dark:text-indigo-200"
												>
													<span>Per month</span>
												</div>
											</span>
										</span>
									</p>
								</div>

								<!-- <ul
                role="list"
                class="grid gap-px overflow-hidden rounded sm:grid-cols-2"
              >
                <li
                  v-for="item in checklist"
                  :key="item"
                  class="flex items-center space-x-3 bg-indigo-800 bg-opacity-50 py-4 px-4 text-sm text-white"
                >
                  <CheckIcon
                    class="h-4 w-4 text-indigo-300"
                    aria-hidden="true"
                  />
                  <span>{{ item }}</span>
                </li>
              </ul> -->
							</div>
						</div>

						<!-- <div>
						<h3 class="sr-only">Reviews</h3>
						<div class="flex items-center">
							<FireIcon
								v-for="rating in [0, 1, 2, 3, 4]"
								:key="rating"
								:class="[
									5 > rating
										? 5 > 3
											? 'text-rose-500'
											: 'text-orange-500'
										: 'text-gray-300 dark:text-gray-700',
									'h-5 w-5 flex-shrink-0',
								]"
								aria-hidden="true"
							/>
						</div>
						<p class="sr-only">{{ 5 }} out of 5 stars</p>
					</div> -->
					</div>

					<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4">
						<button
							v-if="!allAccess"
							:disabled="exists"
							@click="
								user
									? handleCheckout(product, workspace)
									: (showLoginModal = true)
							"
							type="button"
							:class="[
								exists && workspace
									? 'bg-gray-500'
									: 'bg-indigo-600 hover:bg-indigo-700',
								'flex w-full items-center justify-center rounded-md border border-transparent  py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50',
							]"
						>
							{{
								exists && workspace
									? 'Downloaded'
									: `Pay $${(product.setup_fee / 100).toLocaleString()}`
							}}
						</button>
						<button
							v-else
							:disabled="exists || loading"
							@click="workspace ? handleDownload() : (showLoginModal = true)"
							type="button"
							:class="[
								exists && workspace
									? 'bg-gray-500'
									: 'bg-indigo-600 hover:bg-indigo-700',
								'flex w-full items-center justify-center rounded-md border border-transparent  py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50',
							]"
						>
							{{ exists && workspace ? 'Downloaded' : `Download` }}
						</button>
						<!-- <div class="flex justify-center">
						<a
							:href="
								'https://calendly.com/willmarzella/session?a1=' + product.name
							"
							class="cursor-pointer rounded-md border border-transparent py-3 px-8 text-center text-base font-medium text-indigo-700 underline underline-offset-2 hover:text-indigo-600"
						>
							Book a call
						</a>
					</div> -->
					</div>
					<div
						class="mt-10 border-t border-gray-200 pt-10 dark:border-gray-800"
					>
						<h3 class="text-sm font-medium text-gray-900 dark:text-white">
							Description
						</h3>
						<div class="prose prose-sm mt-4 text-slate-500 dark:text-slate-400">
							{{ product.description }}
							<!-- <ul role="list">
							<li
								v-for="connector in product.fields.highlights
									.split('-')
									.slice(1)"
								:key="connector"
							>
								{{ `${connector}` }}
							</li>
						</ul> -->
						</div>
					</div>
					<div
						class="mt-10 border-t border-gray-200 pt-10 dark:border-gray-800"
					>
						<h3 class="text-sm font-medium text-gray-900 dark:text-white">
							Prerequisites
						</h3>
						<div class="prose prose-sm mt-4 text-slate-500 dark:text-slate-400">
							<ul role="list" class="list-disc">
								<li
									v-for="connector in product.category.split(',')"
									:key="connector"
									class=""
								>
									You can authenticate with
									<span class="capitalize">{{ connector }}</span>
								</li>
							</ul>

							<div class="rounded-md bg-yellow-50 px-1">
								<div class="flex">
									<div class="flex-shrink-0">
										<ExclamationTriangleIcon
											class="h-5 w-5 text-yellow-400"
											aria-hidden="true"
										/>
									</div>
									<div class="ml-3">
										<!-- <div class="mt-1 text-sm text-yellow-700">
										<p>
											By buying this template you acknowledge you have an active
											license{{
												product.fields.connectors.split(',').length > 0
													? 's'
													: ''
											}}
											with
											{{
												product.fields.connectors
													.split(',')
													.map((o, i, arr) => {
														if (i + 1 === arr.length) {
															return ` and ${o}`;
														} else if (i + 1 === arr.length - 1) return `${o}`;
														else return `${o}, `;
													})
													.join('')
											}}.
										</p>
									</div> -->
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						class="mt-10 border-t border-gray-200 pt-10 dark:border-gray-800"
					>
						<!-- <h3 class="text-sm font-medium text-gray-900 dark:text-white">
						License
					</h3>
					<p class="mt-4 text-sm text-gray-500 dark:text-slate-400">
						For personal and professional use. You cannot resell or redistribute
						these templates in their original or modified state.
						<a href="" class="font-medium text-indigo-600 hover:text-indigo-500"
							>Read full license</a
						>
					</p> -->
					</div>

					<!-- <div class="mt-10 border-t border-gray-200 pt-10 dark:border-gray-800">
          <h3 class="text-sm font-medium text-gray-900">Share</h3>
          <ul role="list" class="mt-4 flex items-center space-x-6">
            <li>
              <a
                href="#"
                class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Share on Facebook</span>
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Share on Instagram</span>
                <svg
                  class="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Share on Twitter</span>
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div> -->
				</div>

				<div
					v-if="false"
					class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none"
				>
					<TabGroup as="div">
						<div class="border-b border-gray-200">
							<TabList class="-mb-px flex space-x-8">
								<Tab as="template" v-slot="{ selected }">
									<button
										:class="[
											selected
												? 'border-indigo-600 text-indigo-600'
												: 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
											'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
										]"
									>
										Customer Reviews
									</button>
								</Tab>
								<Tab as="template" v-slot="{ selected }">
									<button
										:class="[
											selected
												? 'border-indigo-600 text-indigo-600'
												: 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
											'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
										]"
									>
										FAQ
									</button>
								</Tab>
								<Tab as="template" v-slot="{ selected }">
									<button
										:class="[
											selected
												? 'border-indigo-600 text-indigo-600'
												: 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
											'whitespace-nowrap border-b-2 py-6 text-sm font-medium',
										]"
									>
										License
									</button>
								</Tab>
							</TabList>
						</div>
						<TabPanels as="template">
							<TabPanel class="-mb-10">
								<h3 class="sr-only">Customer Reviews</h3>

								<!-- <div
								v-for="(review, reviewIdx) in reviews.featured"
								:key="review.id"
								class="flex space-x-4 text-sm text-gray-500"
							>
								<div class="flex-none py-10">
									<img
										:src="review.avatarSrc"
										alt=""
										class="h-10 w-10 rounded-full bg-gray-100"
									/>
								</div>
								<div
									:class="[
										reviewIdx === 0 ? '' : 'border-t border-gray-200',
										'py-10',
									]"
								>
									<h3 class="font-medium text-gray-900">
										{{ review.author }}
									</h3>
									<p>
										<time :datetime="review.datetime">{{ review.date }}</time>
									</p>

									<div class="mt-4 flex items-center">
										<StarIcon
											v-for="rating in [0, 1, 2, 3, 4]"
											:key="rating"
											:class="[
												review.rating > rating
													? 'text-yellow-400'
													: 'text-gray-300',
												'h-5 w-5 flex-shrink-0',
											]"
											aria-hidden="true"
										/>
									</div>
									<p class="sr-only">{{ review.rating }} out of 5 stars</p>

									<div
										class="prose prose-sm mt-4 max-w-none text-gray-500"
										v-html="review.content"
									/>
								</div>
							</div> -->
							</TabPanel>

							<TabPanel class="text-sm text-gray-500">
								<h3 class="sr-only">Frequently Asked Questions</h3>

								<dl>
									<template v-for="faq in faqs" :key="faq.question">
										<dt class="mt-10 font-medium text-gray-900">
											{{ faq.question }}
										</dt>
										<dd class="prose prose-sm mt-2 max-w-none text-gray-500">
											<p>{{ faq.answer }}</p>
										</dd>
									</template>
								</dl>
							</TabPanel>

							<TabPanel class="pt-10">
								<h3 class="sr-only">License</h3>

								<div
									class="prose prose-sm max-w-none text-gray-500"
									v-html="license.content"
								/>
							</TabPanel>
						</TabPanels>
					</TabGroup>
				</div>
			</div>
		</div>
		<LoginModal
			v-show="showLoginModal"
			@close-modal="showLoginModal = false"
			@show-otp-modal="handleOtpModal()"
		/>
		<otpModal v-show="showOtpModal" />
	</main>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				success: false,
				showLoginModal: false,
				showOtpModal: false,
			};
		},
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
