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
								<div class="mt-10">
									
									<h1
										class=" text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl"
									>
										<p>Unlimited automation</p>
										<p>on-demand</p>
									</h1>
								</div>

								<div class="mt-8 flex flex-wrap">
									<div
										class="flex items-center text-sm font-medium text-slate-500"
									>
									
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 140 140"
											class="h-6 w-6 flex-none text-slate-400"
										>
											<g id="Artwork_2">
												<path
													fill="currentColor"
													d="M97.57,.02c-21.35,.62-38.8,19.3-38.8,40.66v6.32h20v-6.76c0-10.45,7.91-19.48,18.34-20.19,12.7-.87,23.08,10.57,20.71,23.72-1.72,9.49-10.24,16.23-19.88,16.23H40.24c-18.2,0-36.34,14.54-39.56,32.46-4.57,25.41,14.53,47.54,38.71,47.54h7.38v-20h-7.04c-10.41,0-19.43-7.77-20.38-18.13-1.08-11.86,8.27-21.87,19.91-21.87h19.5v60h20v-60h19.32c21.37,0,40.04-17.45,40.66-38.8C139.42,18.16,120.61-.66,97.57,.02Z"
												/>
											</g></svg
										><span class="ml-2.5">Tray.io</span>
									</div>
									<div
										class="ml-6 flex items-center text-sm font-medium text-slate-500"
									>
										<svg
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											class="h-8 w-8 flex-none text-slate-400"
											viewBox="0 0 256 256"
										>
											<path
												d="M26 69.6104C26 45.5251 45.5251 26 69.6105 26H186.39C210.475 26 230 45.5251 230 69.6105V186.39C230 210.475 210.475 230 186.39 230H69.6104C45.5251 230 26 210.475 26 186.39V69.6104Z"
												class="fill-slate-400 dark:fill-slate-400"
											/>
											<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M106.012 99.3387H149.988C152.394 99.3387 154.308 97.3909 154.334 95.0017C154.334 92.6124 152.394 90.6647 150.014 90.6647H106.012C103.632 90.6647 101.692 92.6124 101.692 95.0017C101.692 97.3909 103.632 99.3387 106.012 99.3387ZM131.285 119.05C131.285 121.907 133.588 124.218 136.433 124.218C139.253 124.218 141.581 121.907 141.581 119.05C141.581 116.193 139.279 113.882 136.433 113.882C133.588 113.882 131.285 116.193 131.285 119.05ZM114.445 119.05C114.445 121.907 116.747 124.218 119.593 124.218C122.438 124.218 124.741 121.907 124.741 119.05C124.741 116.193 122.438 113.882 119.593 113.882C116.747 113.882 114.445 116.193 114.445 119.05ZM173.942 92.8981C175.158 103.39 170.139 112.817 162.12 117.959C161.241 118.531 161.06 119.621 161.732 120.452C167.604 127.361 171.433 136.087 172.209 145.695C172.312 146.682 171.562 147.513 170.579 147.513H85.421C84.4639 147.513 83.7137 146.656 83.7913 145.695C84.5932 136.087 88.3958 127.361 94.2938 120.452C94.9663 119.647 94.7853 118.557 93.9057 117.985C85.3434 112.506 80.1956 102.169 82.3944 90.8465C84.4897 80.0169 93.0262 71.8882 103.891 70.304C109.168 69.5249 114.186 70.356 118.558 72.3557C124.585 75.1085 131.415 75.1345 137.442 72.3557C141.839 70.33 146.91 69.499 152.213 70.304C163.543 71.9921 172.623 81.4712 173.942 92.8981ZM85.9383 155.304H170.062C171.096 155.304 171.872 156.239 171.691 157.278C167.992 178.132 149.859 194 128 194C106.141 194 88.0078 178.158 84.3086 157.278C84.1276 156.239 84.9036 155.304 85.9383 155.304ZM69.0464 99.1829C60.8203 102.559 55 110.61 55 120.063V123.777C55 133.23 60.8462 141.255 69.0464 144.657C70.1329 145.098 71.3228 144.319 71.3228 143.124V100.715C71.3228 99.5464 70.1329 98.7414 69.0464 99.1829ZM184.677 100.715C184.677 99.5204 185.867 98.7413 186.954 99.1828C195.18 102.585 201 110.61 201 120.063V123.777C201 133.23 195.18 141.28 186.954 144.657C185.867 145.098 184.677 144.293 184.677 143.124V100.715Z"
												class="fill-white dark:fill-black"
											/></svg
										><span class="ml-2.5">Robocorp</span>
									</div>
									<div
										class="ml-6 flex items-center text-sm font-medium text-slate-500"
									>
										<svg
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6 flex-none stroke-current text-slate-400"
											viewBox="0 0 256 256"
										>
											<g>
												<path
													d="M128.080089,-0.000183105 C135.311053,0.0131003068 142.422517,0.624138494 149.335663,1.77979593 L149.335663,1.77979593 L149.335663,76.2997796 L202.166953,23.6044907 C208.002065,27.7488446 213.460883,32.3582023 218.507811,37.3926715 C223.557281,42.4271407 228.192318,47.8867213 232.346817,53.7047992 L232.346817,53.7047992 L179.512985,106.400063 L254.227854,106.400063 C255.387249,113.29414 256,120.36111 256,127.587243 L256,127.587243 L256,127.759881 C256,134.986013 255.387249,142.066204 254.227854,148.960282 L254.227854,148.960282 L179.500273,148.960282 L232.346817,201.642324 C228.192318,207.460402 223.557281,212.919983 218.523066,217.954452 L218.523066,217.954452 L218.507811,217.954452 C213.460883,222.988921 208.002065,227.6115 202.182208,231.742607 L202.182208,231.742607 L149.335663,179.04709 L149.335663,253.5672 C142.435229,254.723036 135.323765,255.333244 128.092802,255.348499 L128.092802,255.348499 L127.907197,255.348499 C120.673691,255.333244 113.590195,254.723036 106.677048,253.5672 L106.677048,253.5672 L106.677048,179.04709 L53.8457596,231.742607 C42.1780766,223.466917 31.977435,213.278734 23.6658953,201.642324 L23.6658953,201.642324 L76.4997269,148.960282 L1.78485803,148.960282 C0.612750404,142.052729 0,134.946095 0,127.719963 L0,127.719963 L0,127.349037 C0.0121454869,125.473817 0.134939797,123.182933 0.311311815,120.812834 L0.36577283,120.099764 C0.887996182,113.428547 1.78485803,106.400063 1.78485803,106.400063 L1.78485803,106.400063 L76.4997269,106.400063 L23.6658953,53.7047992 C27.8076812,47.8867213 32.4300059,42.4403618 37.4769335,37.4193681 L37.4769335,37.4193681 L37.5023588,37.3926715 C42.5391163,32.3582023 48.0106469,27.7488446 53.8457596,23.6044907 L53.8457596,23.6044907 L106.677048,76.2997796 L106.677048,1.77979593 C113.590195,0.624138494 120.688946,0.0131003068 127.932622,-0.000183105 L127.932622,-0.000183105 L128.080089,-0.000183105 Z M128.067377,95.7600714 L127.945335,95.7600714 C118.436262,95.7600714 109.32891,97.5001809 100.910584,100.661566 C97.7553011,109.043534 96.0085811,118.129275 95.9958684,127.613685 L95.9958684,127.733184 C96.0085811,137.217594 97.7553011,146.303589 100.923296,154.685303 C109.32891,157.846943 118.436262,159.587052 127.945335,159.587052 L128.067377,159.587052 C137.576449,159.587052 146.683802,157.846943 155.089415,154.685303 C158.257411,146.290368 160.004131,137.217594 160.004131,127.733184 L160.004131,127.613685 C160.004131,118.129275 158.257411,109.043534 155.089415,100.661566 C146.683802,97.5001809 137.576449,95.7600714 128.067377,95.7600714 Z"
													fill="currentColor"
													fill-rule="nonzero"
												></path>
											</g></svg
										><span class="ml-2.5">Zapier</span>
									</div>
								</div>
								<p
									class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
								>
									Your outsourced business operations team extending business
									capacity with automation.
								</p>
								<div class="mt-10 flex items-center gap-x-6">
									<a
										href="#pricing"
										class="flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										><SparklesIcon class="mr-1 h-5 w-5" />See plans</a
									>

									<a
										href="#save"
										class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
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
							class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 dark:bg-black dark:ring-blue-800 md:-mr-20 lg:-mr-36"
							aria-hidden="true"
						/>
						<div class="shadow-lg md:rounded-3xl">
							<div
								class="bg-sky-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]"
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
												class="max-h-[400px] overflow-hidden whitespace-pre-wrap bg-none px-6 pt-6 pb-14 font-mono text-sm text-slate-200"
											>
												<code>
													<pre>{{ code }}</pre>
												</code>
											</div>
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
					class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white dark:from-black sm:h-32"
				/>
			</div>
		</div>
		<Logos />
		<features />
		<features2 :case-study="featured_case_study" />
		<consulting-scope />
		<benefits/>
		<!-- <projects /> -->
		<consulting-pricing
			v-if="profile?.workspaces?.billing_email === user?.email"
			@open-modal="showLoginModal = true"
			:user="user"
			:profile="profile"
		/>
		<cost-saver />
		<!-- <how-it-works /> -->
		<div class="bg-white dark:bg-black" id="faq">
			<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
				<div class="mx-auto">
					<h2
						class="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-gray-400"
					>
						Frequently asked questions
					</h2>
					<div
						v-for="sub_category in sub_categories"
						:key="sub_category"
						class="mt-12"
					>
						<h3
							class="text-sm font-semibold capitalize leading-7 text-slate-400 dark:text-indigo-600"
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
										class="flex w-full items-start justify-between text-left text-gray-900 dark:text-slate-300"
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
		RadioGroupLabel,
	} from '@headlessui/vue';
	import {
		MinusSmallIcon,
		PlusSmallIcon,
		SparklesIcon,
		QueueListIcon,
		WindowIcon,
		CreditCardIcon,
	} from '@heroicons/vue/24/outline';

	import Airtable from 'airtable';
	import showdown from 'showdown';

	import { HighCode } from 'vue-highlight-code';
	import 'vue-highlight-code/dist/style.css';
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	const user = useSupabaseUser();
	const profile = attrs.profile;

	const converter = new showdown.Converter();
	const base = new Airtable({ apiKey: 'keyBl2UOzLvshshLp' }).base(
		'appkU7PnQUq7lePwf'
	);
	const maxSpots = 12;
	const spotsTaken = 12;
	const spotsLeft = maxSpots - spotsTaken;

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
	const code = `*** Settings ***
Documentation       Orders robots from RobotSpareBin Industries Inc.

Library             RPA.Robocorp.Vault
Library             RPA.Browser.Selenium    auto_close=\${FALSE}
Library             RPA.HTTP
Library             RPA.Tables
Library             RPA.PDF


*** Tasks ***
Place orders on website
    Open website
    Get orders


*** Keywords ***
Open website
    Open Available Browser    https://robotsparebinindustries.com/#/robot-order
    Wait Until Element Is Visible    css:div.modal-dialog
    Click Button When Visible    css:button.btn-dark

Get orders
    Download    https://robotsparebinindustries.com/orders.csv    overwrite=True
    \${orders}=    Read table from CSV    orders.csv
    FOR    \${order}    IN    @{orders}
        Fill the form    \${order}
    END

Fill the form
    [Arguments]    \${order}
    Select From List By Value    head    \${order}[Head]
    Select Radio Button    stacked    \${order}[Body]
    Input Text 
    Input Text    address    \${order}[Address]
`;

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
			HighCode,
		},
	};
</script>
