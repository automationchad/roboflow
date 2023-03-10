<template>
	<div class="">
		<Navbar
			class=""
			@open-modal="showLoginModal = true"
			:user="user"
			:profile="profile"
		/>
		<div class="">
			<div
				class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20"
			>
				<div
					class="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-40 lg:px-8"
				>
					<div class="px-6 lg:px-0 lg:pt-4">
						<div class="mx-auto max-w-2xl">
							<div class="max-w-lg">
								<h1
									class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
								>
									<p>AutomationOps,</p>
									<p>as a service.</p>
								</h1>
								<p class="mt-6 text-lg leading-8 text-gray-600">
									We’re a dev shop assisting fast growing companies with process
									automation and software interoperability.
								</p>
								<div class="mt-10 flex items-center gap-x-6">
									<a
										v-if="
											!profile ||
											profile?.workspaces.billing_email === user?.email
										"
										href="#pricing"
										class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>See plans</a
									>
									<a
										v-else
										href="/account/requests"
										class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>Go to requests <span aria-hidden="true">→</span></a
									>

									<a
										v-if="
											!profile ||
											profile.workspaces.billing_email === user.email
										"
										href="#save"
										class="text-sm font-semibold leading-6 text-gray-900"
										>Save on your license <span aria-hidden="true">→</span></a
									>
								</div>
							</div>
						</div>
					</div>
					<div
						class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen"
					>
						<div
							class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
							aria-hidden="true"
						/>
						<div class="shadow-lg md:rounded-3xl">
							<div
								class="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]"
							>
								<div
									class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
									aria-hidden="true"
								/>
								<div class="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
									<div class="mx-auto max-w-2xl md:mx-0 md:max-w-none">
										<div
											class="w-screen overflow-hidden rounded-tl-xl bg-[#292D3E]"
										>
											<div class="flex bg-gray-800/40 ring-1 ring-white/5">
												<div
													class="-mb-px flex text-sm font-medium leading-6 text-gray-400"
												>
													<div
														class="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 py-2 px-4 text-white"
													>
														NotificationSetting.robot
													</div>
													<div class="border-r border-gray-600/10 py-2 px-4">
														App.jsx
													</div>
												</div>
											</div>

											<div
												class="max-h-[400px] overflow-hidden bg-none px-6 pt-6 pb-14 font-mono text-sm text-slate-200"
											></div>
										</div>
									</div>
									<div
										class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
										aria-hidden="true"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32"
				/>
			</div>
		</div>
		<Logos />

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
						Your Automation Center of Excellence
					</h1>
					<p class="mt-6 text-xl leading-8 text-gray-700">
						We build the digital plumbing between your software stack without
						exposing you to the complexity that actually makes it work.
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
								<p>“{{ featured_case_study.fields.quote }}”</p>
							</blockquote>
							<figcaption class="mt-8 flex gap-x-4">
								<img
									:src="featured_case_study.fields.customerPhoto[0].url"
									alt=""
									class="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50"
								/>
								<div class="text-sm leading-6">
									<div class="font-semibold text-gray-900">
										{{ featured_case_study.fields.customerName }}
									</div>
									<div class="text-gray-600">
										{{ featured_case_study.fields.customerTitle }}
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
									outlawed them completely. Submit as many automation requests
									as you like through our ticketing dashboard.</span
								>
							</li>
							<li class="flex gap-x-3">
								<CreditCardIcon
									class="mt-1 h-5 w-5 flex-none text-indigo-600"
								/>
								<span
									><strong class="font-semibold text-gray-900"
										>Flat Monthly Rate.</strong
									>
									No fluctuating costs or hidden fees or worrying about every
									billable hour. We offer a fixed price to give you peace of
									mind as you grow your business.</span
								>
							</li>
							<li class="flex gap-x-3">
								<WindowIcon class="mt-1 h-5 w-5 flex-none text-indigo-600" />

								<span
									><strong class="font-semibold text-gray-900"
										>Production–Ready Code.</strong
									>
									We work in Javascript and Python, which means we create a real
									working automation. No mock-ups that you have to to pay
									someone to code-up later. This is a lot faster, more
									predicable and saves you a lot of money. It's the
									future.</span
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<consulting-scope />
		<projects />
		<consulting-pricing
			v-if="profile?.workspaces.billing_email === user?.email"
			@open-modal="showLoginModal = true"
			:user="user"
			:profile="profile"
		/>
		<cost-saver />
		<div class="bg-white" id="faq">
			<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
				<div class="mx-auto">
					<h2
						class="text-2xl font-bold leading-10 tracking-tight text-gray-900"
					>
						Frequently asked questions
					</h2>
					<div
						v-for="sub_category in sub_categories"
						:key="sub_category"
						class="mt-12"
					>
						<h3
							class="text-sm font-semibold capitalize leading-7 text-slate-400"
						>
							{{ sub_category.substr(sub_category.indexOf('- ') + 1) }}
						</h3>
						<dl class="space-y-6 divide-y divide-gray-900/10">
							<Disclosure
								as="div"
								v-for="faq in faqs.filter(
									(o) => o.fields.sub_category === sub_category
								)"
								:key="faq.fields.question"
								class="pt-6"
								v-slot="{ open }"
							>
								<dt>
									<DisclosureButton
										class="flex w-full items-start justify-between text-left text-gray-900"
									>
										<span class="text-base font-semibold leading-7">{{
											faq.fields.question
										}}</span>
										<span class="ml-6 flex h-7 items-center">
											<PlusSmallIcon
												v-if="!open"
												class="h-6 w-6"
												aria-hidden="true"
											/>
											<MinusSmallIcon
												v-else
												class="h-6 w-6"
												aria-hidden="true"
											/>
										</span>
									</DisclosureButton>
								</dt>
								<DisclosurePanel as="dd" class="mt-2 pr-12">
									<p
										class="w-full text-base leading-7 text-gray-600"
										v-html="convert(faq.fields.answer)"
									></p>
								</DisclosurePanel>
							</Disclosure>
						</dl>
					</div>
				</div>
			</div>
		</div>
		<Cta v-if="!profile" />
		<FooterContent />
		<LoginModal
			v-show="showLoginModal"
			@close-modal="showLoginModal = false"
			@show-otp-modal="handleOtpModal()"
		/>
		<otpModal v-show="showOtpModal" />
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
		CreditCardIcon,
	} from '@heroicons/vue/24/outline';

	import Airtable from 'airtable';
	import showdown from 'showdown';
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	const user = useSupabaseUser();
	const profile = attrs.profile;

	const converter = new showdown.Converter();
	const base = new Airtable({ apiKey: 'keyBl2UOzLvshshLp' }).base(
		'appkU7PnQUq7lePwf'
	);

	let faqs = [];

	const table = base('faqs');

	const getRecords = async () => {
		const records = await table
			.select({
				view: 'viwYfjdlWPJq1q6Ix',
				sort: [{ field: 'last_updated', direction: 'desc' }],
			})
			.firstPage();
		faqs = records.map((o) => {
			return { uuid: o.id, fields: o.fields };
		});
	};

	await getRecords();

	const sub_categories = [
		...new Set(faqs.map((item) => item.fields.sub_category)),
	].sort();

	let case_studies = [];
	const code = "console.log('Hello World!')";

	// shiki
	// 	.getHighlighter({
	// 		theme: 'material-theme-palenight',
	// 	})
	// 	.then((highlighter) => {
	// 		return highlighter.codeToHtml(`console.log('Hello world!')`, {
	// 			lang: 'js',
	// 		});
	// 	});

	const table2 = base('case_studies');
	const getCaseStudy = async () => {
		const records = await table2
			.select({
				view: 'viwHYYzg65fLzBI0c',
				sort: [{ field: 'last_updated', direction: 'desc' }],
			})
			.firstPage();
		case_studies = records.map((o) => {
			return { uuid: o.id, fields: o.fields };
		});
	};

	await getCaseStudy();
	const featured_case_study = await case_studies.find((o) => o.fields.featured);
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
		methods: {
			handleOtpModal() {
				this.showOtpModal = true;
				setTimeout(() => {
					this.showOtpModal = false;
				}, 2000);
			},
			convert(text) {
				let converter = new showdown.Converter();
				return (this.htmlData = converter.makeHtml(text));
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
		},
		components: {
			WindowIcon,
			CreditCardIcon,
		},
	};
</script>
