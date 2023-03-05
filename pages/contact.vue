<script setup>
	import Airtable from 'airtable';
	import { differenceInDays } from 'date-fns';
	import {
		BuildingOffice2Icon,
		EnvelopeIcon,
		PhoneIcon,
		MapPinIcon,
		PaperClipIcon,
		QueueListIcon,
		GlobeAmericasIcon,
		SparklesIcon,
		ViewfinderCircleIcon,
		ClockIcon,
	} from '@heroicons/vue/24/outline';
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	console.log(attrs);
	const user = attrs.user;
	const profile = attrs.profile;

	const base = new Airtable({ apiKey: 'keyBl2UOzLvshshLp' }).base(
		'appkU7PnQUq7lePwf'
	);

	let requests = [];

	const table = base('sprints');

	const getSprints = async () => {
		const records = await table
			.select({
				view: 'viwjRdvlzpCwm0OuK',
				sort: [{ field: 'est_finish_date', direction: 'asc' }],
			})
			.firstPage();
		requests = records.map((o) => {
			return { uuid: o.id, fields: o.fields };
		});
	};

	await getSprints();
	const route = useRoute();
	const maxSpots = 6;

	const spotsCalc = async () => {
		var arrNum = Math.abs(maxSpots - requests.length);
		let remaining_days;
		if (maxSpots <= requests.length) {
			remaining_days = differenceInDays(
				new Date(),
				new Date(requests[arrNum].fields.est_finish_date)
			);
		} else remaining_days = 0;
		return {
			spots: requests.length >= maxSpots ? 0 : maxSpots - requests.length,
			remaining_days,
		};
	};

	const spotsLeft = await spotsCalc();
</script>

<template>
	<div class="relative isolate h-full bg-gray-900">
		<Navbar
			class=""
			@open-modal="showLoginModal = true"
			:user="user"
			:profile="profile"
		/>
		<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
			<div
				class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:py-48 lg:px-8"
			>
				<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
					<div
						class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2"
					>
						<svg
							class="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
							aria-hidden="true"
						>
							<defs>
								<pattern
									id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
									width="200"
									height="200"
									x="100%"
									y="-1"
									patternUnits="userSpaceOnUse"
								>
									<path d="M130 200V.5M.5 .5H200" fill="none" />
								</pattern>
							</defs>
							<svg x="100%" y="-1" class="overflow-visible fill-gray-800/20">
								<path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
							</svg>
							<rect
								width="100%"
								height="100%"
								stroke-width="0"
								fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
							/>
						</svg>
						<svg
							class="absolute top-[calc(100%-13rem)] -left-56 w-[72.1875rem] transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
							viewBox="0 0 1155 678"
							aria-hidden="true"
						>
							<path
								fill="url(#0a9a5302-e517-46c6-85f0-d826aa6a313e)"
								fill-opacity=".2"
								d="M317.219 159.025 203.852 0 0 239.659l317.219-80.634 204.172 286.402c1.307-132.337 45.083-346.658 209.733-145.248C936.936 551.942 882.053 772.234 1031.02 636.67c119.18-108.452 130.68-295.338 121.53-375.224L855 379l21.173-362.054-558.954 142.079Z"
							/>
							<defs>
								<linearGradient
									id="0a9a5302-e517-46c6-85f0-d826aa6a313e"
									x1="1155.49"
									x2="-78.208"
									y1="677.823"
									y2="203.355"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#4F46E5" />
									<stop offset="1" stop-color="#80CAFF" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<h2 class="flex items-center space-x-4">
						<h2 class="text-3xl font-bold tracking-tight text-white">
							Get in touch
						</h2>
						<div
							:class="[
								spotsLeft.spots > 0 ? 'badge' : 'err-badge',
								'flex items-center rounded-full px-3 py-0.5 shadow-md',
							]"
						>
							<ClockIcon class="mr-1 h-4 w-4" v-if="!spotsLeft.spots > 0" />
							<p class="text-xs font-normal">
								{{
									spotsLeft.spots > 0
										? `${spotsLeft.spots} spot${
												spotsLeft.spots > 1 ? 's' : ''
										  } left`
										: ` ${spotsLeft.remaining_days} days`
								}}
							</p>
						</div>
					</h2>
					<p class="mt-6 text-lg leading-8 text-gray-300">
						{{
							spotsLeft.spots > 0
								? `Please fill out the answers on this form so we can get you in touch with the appropriate member of our team.`
								: `Unfortunately, we're at capacity. Please submit your request and we'll reach out when availablity opens up.`
						}}
					</p>
					<dl class="mt-10 space-y-4 text-base leading-7 text-gray-300">
						<div class="flex gap-x-4">
							<dt class="flex-none">
								<span class="sr-only">Telephone</span>

								<MapPinIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
							</dt>
							<dd>Remote</dd>
						</div>
						<!-- <div class="flex gap-x-4">
							<dt class="flex-none">
								<span class="sr-only">Telephone</span>
								<PhoneIcon class="h-7 w-6 text-gray-400" aria-hidden="true" />
							</dt>
							<dd>
								<a class="hover:text-white" href="tel:+1 (555) 234-5678"
									>+1 (424) 395-8724</a
								>
							</dd>
						</div> -->
						<div class="flex gap-x-4">
							<dt class="flex-none">
								<span class="sr-only">Email</span>
								<EnvelopeIcon
									class="h-7 w-6 text-gray-400"
									aria-hidden="true"
								/>
							</dt>
							<dd>
								<a class="hover:text-white" href="mailto:hello@motis.group"
									>hello@motis.group</a
								>
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<ContactSection :requests="requests" :user="user" />
		</div>
	</div>
</template>

<style scoped>
	.err-badge {
		background-image: radial-gradient(
				49% 81% at 45% 47%,
				#ffe20345 0%,
				#073aff00 100%
			),
			radial-gradient(113% 91% at 17% -2%, #ff5a00ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at 83% 7%, #ffdb00ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at -6% 74%, #ff0049ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at 111% 84%, #ff7000ff 0%, #ff0000ff 100%);
		color: rgb(0, 0, 0);
	}
	.badge {
		background-image: radial-gradient(
				18% 28% at 24% 50%,
				#cefaffff 7%,
				#073aff00 100%
			),
			radial-gradient(18% 28% at 18% 71%, #ffffff59 6%, #073aff00 100%),
			radial-gradient(70% 53% at 36% 76%, #73f2ffff 0%, #073aff00 100%),
			radial-gradient(42% 53% at 15% 94%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(42% 53% at 34% 72%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(18% 28% at 35% 87%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(31% 43% at 7% 98%, #ffffffff 24%, #073aff00 100%),
			radial-gradient(21% 37% at 72% 23%, #d3ff6d9c 24%, #073aff00 100%),
			radial-gradient(35% 56% at 91% 74%, #8a4ffff5 9%, #073aff00 100%),
			radial-gradient(74% 86% at 67% 38%, #6dffaef5 24%, #073aff00 100%),
			linear-gradient(125deg, #4eb5ffff 1%, #4c00fcff 100%);
		color: #00373e;
	}
</style>
