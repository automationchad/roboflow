<template>
	<div class="bg-white py-24 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="text-base font-semibold leading-7 text-indigo-600">
					Pricing
				</h2>
				<p
					class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
				>
					Memberships levels
				</p>
			</div>
			<p
				class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
			>
				Get unlimited automation requests and revisions. No expensive hourly
				billing or contracts, cancel anytime. Choose a plan that's right for
				you.
			</p>
			<div class="mt-16 flex justify-center">
				<RadioGroup
					v-model="frequency"
					class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
				>
					<RadioGroupLabel class="sr-only">Payment frequency</RadioGroupLabel>
					<RadioGroupOption
						as="template"
						v-for="option in frequencies"
						:key="option.value"
						:value="option"
						v-slot="{ checked }"
					>
						<div
							:class="[
								checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
								'cursor-pointer rounded-full py-1 px-2.5',
							]"
						>
							<span>{{ option.label }}</span>
						</div>
					</RadioGroupOption>
				</RadioGroup>
			</div>
			<div
				class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
			>
				<div
					v-for="tier in tiers"
					:key="tier.id"
					:class="[
						tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
						tier.mostPopular
							? 'ring-2 ring-indigo-600'
							: 'ring-1 ring-gray-200',
						'rounded-3xl p-8 ring-1 xl:p-10',
					]"
				>
					<div class="flex items-center justify-between gap-x-4">
						<h3
							:id="tier.id"
							:class="[
								tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
								tier.featured ? 'text-white' : 'text-gray-900',
								'text-lg font-semibold leading-8',
							]"
						>
							{{ tier.name }}
						</h3>
						<p
							v-if="tier.mostPopular"
							class="rounded-full bg-indigo-600/10 py-1 px-2.5 text-xs font-semibold leading-5 text-indigo-600"
						>
							Most popular
						</p>
					</div>

					<p
						:class="[
							tier.featured ? 'text-gray-300' : 'text-gray-600',
							'mt-4 text-sm leading-6',
						]"
					>
						{{ tier.description }}
					</p>
					<p class="mt-6 flex items-baseline gap-x-1">
						<span
							:class="[
								tier.featured ? 'text-white' : 'text-gray-900',
								'text-4xl font-bold tracking-tight',
							]"
							>{{
								typeof tier.price === 'string'
									? tier.price
									: tier.price[frequency.value]
							}}</span
						>
						<span
							v-if="typeof tier.price !== 'string'"
							:class="[
								tier.featured ? 'text-gray-300' : 'text-gray-600',
								'text-sm font-semibold leading-6',
							]"
							>{{ frequency.priceSuffix }}</span
						>
					</p>
					<a
						v-if="!user"
						@click="$emit('open-modal')"
						:aria-describedby="tier.id"
						:class="[
							tier.featured
								? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
								: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
							'mt-6 block cursor-pointer rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
						]"
					>
						{{ tier.cta }}
					</a>
					<!-- <a
						v-else-if="user && !profile?.workspaces.all_access"
						@click="handleCheckout(product, profile?.workspaces)"
						:aria-describedby="tier.id"
						:class="[
							tier.featured
								? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
								: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
							'mt-6 block cursor-pointer rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
						]"
					>
						{{ tier.cta }}
					</a> -->
					<a
						v-else-if="user && !profile?.workspaces.all_access"
						href="/consulting/contact"
						:aria-describedby="tier.id"
						:class="[
							tier.featured
								? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
								: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
							'mt-6 block cursor-pointer rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
						]"
					>
						{{ tier.cta }}
					</a>
					<a
						v-else
						disabled
						:aria-describedby="tier.id"
						:class="[
							tier.featured
								? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
								: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
							'mt-6 block cursor-pointer rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
						]"
					>
						{{ 'Already purchased' }}
					</a>
					<ul
						role="list"
						:class="[
							tier.featured ? 'text-gray-300' : 'text-gray-600',
							'mt-8 space-y-3 text-sm leading-6 xl:mt-10',
						]"
					>
						<li
							v-for="feature in tier.features"
							:key="feature"
							class="flex gap-x-3"
						>
							<CheckIcon
								:class="[
									tier.featured ? 'text-white' : 'text-indigo-600',
									'h-6 w-5 flex-none',
								]"
								aria-hidden="true"
							/>
							{{ feature }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		RadioGroup,
		RadioGroupLabel,
		RadioGroupOption,
	} from '@headlessui/vue';
	import { CheckIcon } from '@heroicons/vue/20/solid';
	const props = defineProps({
		user: { type: Object, required: true },
		profile: { type: Object, required: true },
	});

	const product = {
		tray_project_id: null,
	};

	const frequencies = [
		{ value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
		{ value: 'quarterly', label: 'Quarterly', priceSuffix: '/quarter' },
	];
	const tiers = [
		{
			name: 'Support',
			id: 'tier-freelancer',
			href: '#',
			price: { monthly: '$4,000', quarterly: '$10,800' },
			description: 'For stalled startups that need more resource capacity.',
			features: [
				'Unlimited requests',
				'Unlimited changes',
				'Simple edits & changes',
				'One project at a time',
				'Weekly session calls',
				'48-hour support response time',
			],
			featured: false,
			mostPopular: false,
			cta: 'Book a call',
		},
		{
			name: 'Growth',
			id: 'tier-startup',
			href: '#',
			price: { monthly: '$7,200', quarterly: '$19,500' },
			description:
				'For companies that need automation engineers for complex workflows.',
			features: [
				'Unlimited requests',
				'Unlimited changes',
				'Full scale projects',
				'Multiple projects at a time',
				'Bi-weekly session calls',
				'24-hour support response time',
			],
			featured: false,
			mostPopular: true,
			cta: 'Book a call',
		},
		{
			name: 'Enterprise',
			id: 'tier-enterprise',
			href: '/consulting/contact',
			price: 'Custom',
			description: 'Dedicated support and infrastructure for your company.',
			features: [
				'Unlimited requests',
				'Unlimited changes',
				'Full scale projects',
				'Multiple projects at a time',
				'Bi-weekly session calls',
				'1-hour, dedicated support response time',
				'Custom reporting tools',
			],
			featured: true,
			mostPopular: false,
			cta: 'Book a call',
		},
	];

	const frequency = ref(frequencies[0]);

	const handleCheckout = async (product, workspace) => {
		const { url } = await $fetch('/api/checkout', {
			method: 'post',
			body: {
				type: 'retainer',
				frequency,
				product: product,
				project_id: product.tray_project_id,
				workspace_id: workspace.id,
				customer: workspace.stripe_customer_id,
			},
		});
		location.href = url;
	};
</script>
