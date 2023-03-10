<template>
	<div class="relative isolate bg-white py-24 sm:py-32" id="save">
		<div
			class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
			aria-hidden="true"
		>
			<svg class="mx-auto w-[72.1875rem]" viewBox="0 0 1155 678">
				<path
					fill="url(#083c110e-60c8-42bb-a9db-29bba74cc569)"
					fill-opacity=".3"
					d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
				/>
				<defs>
					<linearGradient
						id="083c110e-60c8-42bb-a9db-29bba74cc569"
						x1="1155.49"
						x2="-78.208"
						y1=".177"
						y2="474.645"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#9089FC" />
						<stop offset="1" stop-color="#FF80B5" />
					</linearGradient>
				</defs>
			</svg>
		</div>
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl sm:text-center">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Save money on your existing license
				</h2>
				<p class="mt-6 text-lg leading-8 text-gray-600">
					Considering selling a kindey to renew with your automation platform?
					Don't.

					<br />
					Migrate to our Tray.io account and only pay for what you actually use.
				</p>
			</div>
			<div
				class="mx-auto mt-16 max-w-2xl rounded-3xl bg-white/40 ring-1 ring-gray-200 backdrop-blur-md sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
			>
				<div class="p-8 sm:p-10 lg:flex-auto">
					<h3 class="text-2xl font-bold tracking-tight text-gray-900">
						Calculate my savings
					</h3>
					<p class="mt-6 text-base leading-7 text-gray-600">
						Estimate how much you could save by migrating your license with our
						migration calculator.
					</p>
					<div class="" v-if="false">
						<div class="mt-8 flow-root">
							<div class="-my-2 overflow-x-auto">
								<div class="inline-block min-w-full py-2 align-middle">
									<table class="min-w-full divide-y divide-gray-300">
										<thead>
											<tr>
												<th
													scope="col"
													class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
												>
													Quantity
												</th>
												<th
													scope="col"
													class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
												>
													$/unit
												</th>
												<th
													scope="col"
													class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
												>
													Band cost
												</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-200">
											<tr v-for="(price, idx) in pricing" :key="price.quantity">
												<td
													class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
												>
													{{ abbreviatedNumber(price.quantity) }}
												</td>
												<td
													class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
												>
													{{ Number(price.price.toFixed(8)) }}
												</td>
												<td
													class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
												>
													{{
														`${idx > 0 ? 'Next' : 'First'} ${
															idx > 0
																? price.quantity - pricing[idx - 1].quantity
																: price.quantity
														} x ${price.price} = $${(
															(idx > 0
																? price.quantity - pricing[idx - 1].quantity
																: price.quantity) * price.price
														)
															.toFixed(2)
															.toLocaleString()}`
													}}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div class="mt-8 grid grid-cols-2 gap-4">
						<div class="col-span-1">
							<label
								for="current-spend"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Current yearly spend</label
							>
							<div class="relative mt-2 rounded-md shadow-sm">
								<div
									class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
								>
									<span class="text-gray-500 sm:text-sm">$</span>
								</div>
								<input
									v-model="current_spend"
									max="3000000"
									type="number"
									name="current-spend"
									id="current-spend"
									class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="0.00"
									aria-describedby="current-spend-current"
								/>
								<div
									class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
								>
									<span
										class="text-gray-500 sm:text-sm"
										id="current-spend-currency"
										>USD</span
									>
								</div>
							</div>
						</div>
						<div class="col-span-1">
							<label
								for="task-number"
								class="block text-sm font-medium leading-6 text-gray-900"
								>Est. monthly tasks</label
							>
							<div class="relative mt-2 rounded-md shadow-sm">
								<input
									v-model="est_tasks"
									type="number"
									name="task-number"
									id="task-number"
									class="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="10000000"
								/>
								<div
									class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
								>
									<BoltIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
								</div>
							</div>
						</div>
					</div>
					<div class="mt-10 flex items-center gap-x-4">
						<h4
							class="flex-none text-sm font-semibold leading-6 text-indigo-600"
						>
							Say goodbye to complicated licenses
						</h4>
						<div class="h-px flex-auto bg-gray-100" />
					</div>
					<ul
						role="list"
						class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
					>
						<li
							v-for="feature in includedFeatures"
							:key="feature"
							class="flex gap-x-3"
						>
							<CheckIcon
								class="h-6 w-5 flex-none text-indigo-600"
								aria-hidden="true"
							/>
							{{ feature }}
						</li>
					</ul>
				</div>
				<div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
					<div
						class="costs h-full rounded-2xl border border-gray-900/5 bg-white py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16"
					>
						<div class="mb-4 flex justify-center">
							<RadioGroup
								v-model="selected_frequency"
								class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
							>
								<RadioGroupLabel class="sr-only"
									>Payment frequency</RadioGroupLabel
								>
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
						<div class="mx-auto min-w-[300px] px-8">
							<p class="text-base font-semibold text-gray-600">
								Estimated {{ selected_frequency.value }}
								{{ current_spend > 0 ? 'savings' : 'costs' }} *
							</p>
							<p class="mt-6 flex items-baseline justify-center gap-x-2">
								<span
									:class="[
										totalSavings(current_spend, est_tasks) > 0
											? 'text-gray-900'
											: 'text-rose-600',
										'text-5xl font-bold tracking-tight ',
									]"
									>${{
										Math.round(
											totalSavings(current_spend, est_tasks)
										).toLocaleString()
									}}</span
								>
								<span
									class="text-sm font-semibold leading-6 tracking-wide text-gray-600"
									>USD</span
								>
							</p>
							<div class="mt-8">
								<div
									class="flex justify-between border-t border-gray-300 py-2 text-xs text-gray-600"
								>
									<span>Current</span
									><span
										>${{
											Math.round(
												selected_frequency.id === 1
													? current_spend / 12
													: current_spend
											).toLocaleString()
										}}</span
									>
								</div>
								<div
									class="flex justify-between border-t border-gray-300 py-2 text-xs text-gray-600"
								>
									<span>Estimated</span
									><span
										>${{
											Math.round(taskPrice(est_tasks)).toLocaleString()
										}}</span
									>
								</div>
								<div
									class=""
									v-if="profile?.workspaces?.domain === 'motis.group'"
								>
									<div
										class="flex justify-between border-t border-gray-300 py-2 text-xs text-gray-600"
									>
										<span>Tray Cost</span
										><span class="text-rose-600"
											>(${{
												Math.round(trayCosts(est_tasks)).toLocaleString()
											}})</span
										>
									</div>
									<div
										class="flex justify-between border-t border-gray-300 py-2 text-xs text-gray-600"
									>
										<span>Motis Profit</span
										><span class="text-green-600"
											>${{
												Math.round(
													taskPrice(est_tasks) - trayCosts(est_tasks)
												).toLocaleString()
											}}</span
										>
									</div>
								</div>
							</div>
							<a
								href="https://calendly.com/motis-group/migration"
								target="_blank"
								class="mt-8 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Get access
							</a>
							<a
								v-if="false"
								href="https://calendly.com/motis-group/migration"
								target="_blank"
								class="block w-full py-3 text-xs text-gray-700"
								>Book a call</a
							>
							<p class="mt-6 text-xs leading-5 text-gray-600">
								* Your actual savings may vary.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { CheckIcon, BoltIcon } from '@heroicons/vue/24/outline';
	import {
		RadioGroup,
		RadioGroupDescription,
		RadioGroupOption,
	} from '@headlessui/vue';

	const current_spend = ref(0);
	const est_tasks = ref(0);

	const frequencies = [
		{ value: 'monthly', id: 1, label: 'Monthly', priceSuffix: '/month' },
		{ value: 'annual', id: 12, label: 'Annually', priceSuffix: '/year' },
	];

	const selected_frequency = ref(frequencies[0]);

	const curr_spend_actual = ref(
		selected_frequency.value.id === 1
			? current_spend.value / 12
			: current_spend.value
	);

	const includedFeatures = [
		'Monthly billing, cancel anytime',
		'No upfront costs to deploy workflows',
		'Only pay when you run tasks',
		'Predict your costs with transparency',
	];

	const abbreviatedNumber = (number) => {
		const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
		const tier = (Math.log10(Math.abs(number)) / 3) | 0;
		if (tier === 0) {
			return number;
		}
		const suffix = SI_SYMBOL[tier];
		const scale = 10 ** (tier * 3);
		const scaled = number / scale;
		const length = scaled.toFixed(1).toString();
		const precision = length > 3 ? 0 : 0;
		return scaled.toFixed(precision) + suffix;
	};

	const multiplyAndDouble = (startNumber, tier_num) => {
		let results = [];
		let currentNumber = startNumber;
		results.push(startNumber);
		while (currentNumber <= startNumber ** tier_num) {
			currentNumber = currentNumber * 5;
			results.push(currentNumber);
			let nextNumber = currentNumber * 2;
			results.push(nextNumber);
			currentNumber = nextNumber;
		}
		return results;
	};

	const tiers = 6;
	const monthly_base = 125;

	const pricing = [...Array(tiers)]
		.fill(undefined)
		.map((_, i) => {
			const initial_value = 0.005;
			const decay_rate = 0.2;
			return initial_value * (1 - decay_rate) ** i;
		})
		.map((o, i) => {
			const initial_value = 0.05;

			return {
				quantity: multiplyAndDouble(1000000, tiers)[i],
				price: o,
			};
		});

	const taskPrice = (quantity) => {
		let price = 0;
		let remainingQuantity = quantity;
		for (let i = 0; i < pricing.length; i++) {
			let tier = pricing[i];
			let tierQuantity = tier.quantity;
			let tierPrice = tier.price;
			if (remainingQuantity <= tierQuantity) {
				price += remainingQuantity * tierPrice;
				break;
			} else {
				price += tierQuantity * tierPrice;
				remainingQuantity -= tierQuantity;
			}
		}
		return (price + monthly_base) * selected_frequency.value.id;
	};

	const trayCosts = (quantity) => {
		let price = 0;
		const trayPricing = [
			{ quantity: 1000000, price: 2.04 / 1000 },
			{ quantity: 3000000, price: 1.8 / 1000 },
			{ quantity: 10000000, price: 1.56 / 1000 },
			{ quantity: 20000000, price: 1.2 / 1000 },
			{ quantity: 40000000, price: 0.96 / 1000 },
		];
		let remainingQuantity = quantity;
		for (let i = 0; i < trayPricing.length; i++) {
			let tier = trayPricing[i];
			let tierQuantity = tier.quantity;
			let tierPrice = tier.price;
			if (remainingQuantity <= tierQuantity) {
				price += remainingQuantity * tierPrice;
				break;
			} else {
				price += tierQuantity * tierPrice;
				remainingQuantity -= tierQuantity;
			}
		}
		return price * selected_frequency.value.id;
	};

	const totalSavings = (current, tasks) => {
		let currentSpend;
		if (selected_frequency.value.id === 1) {
			currentSpend = current / 12;
		} else currentSpend = current;
		if (currentSpend > 0) return currentSpend - taskPrice(tasks);
		else return Math.abs(currentSpend - taskPrice(tasks));
	};
</script>

<style scoped>
	.costs {
		box-shadow: 0 0 0 1px white;
	}
</style>
