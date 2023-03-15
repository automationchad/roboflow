<template>
	<div class="bg-white py-24 sm:py-32 dark:bg-black">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-3xl sm:text-center">
				<h2 class="text-base font-semibold leading-7 text-indigo-600">
					Everything you need
				</h2>
				<p
					class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"
				>
					Membership benefits
				</p>
				<p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-500">
					Perks so good you'll never need to go anywhere else for your
					automations. Seriously.
				</p>
				<div class="mt-12">
					<a
						href="#pricing"
						class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>See plans</a
					>
				</div>
			</div>
		</div>
		<div class="relative overflow-hidden pt-16">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<img
					src="~/assets/images/screenshot.png"
					alt="App screenshot"
					class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
					width="2432"
					height="1442"
				/>
				<div class="relative" aria-hidden="true">
					<div
						class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%] dark:from-black"
					/>
				</div>
			</div>
		</div>
		<div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
			<dl
				class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 dark:text-gray-500 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
			>
				<div
					v-for="feature in features"
					:key="feature.name"
					class="relative pl-9"
				>
					<dt class="inline font-semibold text-gray-900 dark:text-gray-100">
						<component
							:is="feature.icon"
							class="absolute top-1 left-1 h-5 w-5 text-indigo-600 dark:text-indigo-500"
							aria-hidden="true"
						/>
						{{ feature.name }}
					</dt>
					{{ ' ' }}
					<dd class="inline">{{ feature.description }}</dd>
				</div>
			</dl>
		</div>
	</div>
</template>

<script setup>
	import {
		ArrowPathIcon,
		CloudArrowUpIcon,
		Cog6ToothIcon,
		CreditCardIcon,
		ShieldCheckIcon,
		SquaresPlusIcon,
		TicketIcon,
		BoltIcon,
		FingerPrintIcon,
		LockClosedIcon,
		ServerIcon,
	} from '@heroicons/vue/20/solid';

	const features = [
		{
			name: 'Design board',
			description:
				"Add as many automation requests to your board as you'd like.",
			icon: TicketIcon,
		},
		{
			name: 'Lightning fast delivery',
			description:
				'Get your automation one at a time in just a few days on average.',
			icon: BoltIcon,
		},
		{
			name: 'Fixed monthly rate',
			description: 'No surprises here! Pay the same fixed price each month.',
			icon: CreditCardIcon,
		},
		{
			name: 'Top-notch quality',
			description:
				'Insane automation quality at your fingertips whenever you need it.',
			icon: ShieldCheckIcon,
		},
		{
			name: 'Flexible and scalable',
			description:
				'Scale up or down as needed, and pause or cancel at anytime.',
			icon: SquaresPlusIcon,
		},
		{
			name: 'Unique and all yours',
			description:
				'Each of your automations is made especially for you and is 100% yours.',
			icon: FingerPrintIcon,
		},
	];
</script>
