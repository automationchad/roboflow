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
									class="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl"
								>
									<p>Unlimited automation</p>
									<p>on-demand</p>
								</h1>
								<p
									class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400"
								>
									Your outsourced business operations team extending business
									capacity with automation.
								</p>
								<div class="mt-10 flex items-center gap-x-6">
									<a
										v-if="
											!profile ||
											profile?.workspaces?.billing_email === user?.email
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
											profile?.workspaces?.billing_email === user?.email
										"
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
							class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 dark:ring-blue-800 ring-indigo-50 dark:bg-black md:-mr-20 lg:-mr-36"
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
		ExclamationTriangleIcon,
		ChevronRightIcon,
		VideoCameraSlashIcon,
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
