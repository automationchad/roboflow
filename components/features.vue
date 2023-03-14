<template>
	<div class="relative">
		<div class="bg-white py-24 sm:py-32">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:text-center">
					<p
						class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
					>
						Your Automation Center of Excellence
					</p>
					<p class="mt-6 text-lg leading-8 text-gray-600">
						We build the digital plumbing between your software stack without
						exposing you to the complexity that actually makes it work.
					</p>
				</div>
				<div class="mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
					<dl
						class="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-16"
					>
						<div
							v-for="feature in features"
							:key="feature.name"
							class="relative pl-16"
						>
							<dt
								class="text-center text-base font-semibold leading-7 text-gray-900"
							>
								<div class="flex justify-center text-center">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-center"
									>
										<component
											:is="feature.icon"
											class="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</div>
								</div>
							</dt>
							<dd class="mt-2 text-center text-base leading-7 text-gray-600">
								{{ feature.description }}
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
		<div class="bg-white py-12 sm:py-16">
			<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div
					class="relative overflow-hidden bg-gray-900 py-20 px-6 shadow-xl sm:rounded-3xl sm:py-24 sm:px-10 md:px-12 lg:px-20"
				>
					<img
						class="absolute inset-0 h-full w-full object-cover brightness-150 saturate-0"
						src="https://images.unsplash.com/photo-1601381718415-a05fb0a261f3?ixid=MXwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8ODl8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1216&q=80"
						alt=""
					/>
					<div class="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
					<svg
						viewBox="0 0 1097 845"
						aria-hidden="true"
						class="absolute -top-56 -left-80 w-[68.5625rem] transform-gpu blur-3xl"
					>
						<path
							fill="url(#68eb76c4-2bc9-4928-860e-70adf05719f4)"
							fill-opacity=".45"
							d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
						/>
						<defs>
							<linearGradient
								id="68eb76c4-2bc9-4928-860e-70adf05719f4"
								x1="1097.04"
								x2="-141.165"
								y1=".22"
								y2="363.075"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#776FFF" />
								<stop offset="1" stop-color="#FF4694" />
							</linearGradient>
						</defs>
					</svg>
					<svg
						viewBox="0 0 1097 845"
						aria-hidden="true"
						class="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:w-[68.5625rem] md:transform-gpu md:blur-3xl"
					>
						<path
							fill="url(#68eb76c4-2bc9-4928-860e-70adf05719f4)"
							fill-opacity=".25"
							d="M301.174 646.641 193.541 844.786 0 546.172l301.174 100.469 193.845-356.855c1.241 164.891 42.802 431.935 199.124 180.978 195.402-313.696 143.295-588.18 284.729-419.266 113.148 135.13 124.068 367.989 115.378 467.527L811.753 372.553l20.102 451.119-530.681-177.031Z"
						/>
					</svg>
					<div class="relative mx-auto max-w-2xl lg:mx-0">
						<img
							class="h-12 w-auto"
							src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
							alt=""
						/>
						<figure>
							<blockquote
								class="mt-6 text-lg font-semibold text-white sm:text-xl sm:leading-8"
							>
								<p>
									“Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
									expedita voluptas culpa sapiente alias molestiae. Numquam
									corrupti in laborum sed rerum et corporis.”
								</p>
							</blockquote>
							<figcaption class="mt-6 text-base text-white">
								<div class="font-semibold">Judith Black</div>
								<div class="mt-1">CEO of Workcation</div>
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		ArrowPathIcon,
		CloudArrowUpIcon,
		FingerPrintIcon,
		LockClosedIcon,
	} from '@heroicons/vue/24/outline';

	const features = [
		{
			name: 'Push to deploy',
			description:
				"Subscribe to a plan & request as many designs as you'd like.",
			icon: CloudArrowUpIcon,
		},
		{
			name: 'SSL certificates',
			description:
				'Receive your design within a few business days on average, Monday to Friday.',
			icon: LockClosedIcon,
		},
		{
			name: 'Simple queues',
			description: "We'll revise the designs until you're 100% satisfied.",
			icon: ArrowPathIcon,
		},
	];
</script>
