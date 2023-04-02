<template>
	<div class="">
		<div role="tabpanel">
			<div class="mt-8">
				<div class="block">
					<div class="">
						<div class="flex w-full">
							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base text-slate-600 dark:text-slate-200"
								>
									PLAN
								</p>
								<h3 class="my-8 text-2xl font-semibold dark:text-white">
									${{ monthly_base }}.00
								</h3>
							</div>
							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base text-slate-600 dark:text-slate-200"
								>
									TASKS
								</p>
								<h3 class="my-8 text-2xl font-semibold dark:text-white">
									${{ taskPrice(0) }}.00
								</h3>
							</div>

							<div class="sc-gsnTZi w-1/3">
								<p
									class="sc-kLLXSd text-base text-slate-600 dark:text-slate-200"
								>
									TOTAL COST
								</p>
								<h3 class="my-8 text-2xl font-semibold dark:text-white">
									${{ taskPrice(100000) + monthly_base }}.00
								</h3>
							</div>
						</div>
						<div class="sc-gsnTZi mb-4 dark:text-white">
							{{
								format(new Date(), 'MMM d') +
								' - ' +
								format(addDays(new Date(), 30), 'MMM d yyyy')
							}}
						</div>
					</div>
				</div>
				<div class="grid grid-cols-2 gap-8">
					<div class="gwIZYl bg-gray-50 p-6 dark:bg-slate-800">
						<div class="sc-ckMVTt jUiJgh">
							<div
								class="sc-gsnTZi eMxiQG border-b border-gray-300 pb-3 dark:border-slate-600"
							>
								<h4 class="bOtoTi text-base font-semibold dark:text-white">
									Run Minutes
								</h4>
								<div class="sc-TRNrF iPuFes"></div>
							</div>

							<div class="my-4 text-slate-600 dark:text-slate-300">
								<div class="flex">
									<div>
										<div>
											<p
												class="text-3xl font-semibold text-slate-800 dark:text-white"
											>
												{{ current_usage.toLocaleString() }}/{{
													task_entitlement.toLocaleString()
												}}
											</p>
										</div>
										<div>
											<p class="text-sm">Plan tasks used</p>
										</div>
									</div>
								</div>
								<div class="mt-2">
									<div class="">
										<div class="sc-hiMGwR dkaYIm">
											<progress
												id="file"
												:value="(current_usage / task_entitlement) * 100"
												max="100"
											>
												{{ (current_usage / task_entitlement) * 100 }}%
											</progress>
										</div>
									</div>
									<div class="flex">
										<p class="text-sm">0 Self-hosted minutes</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="bg-gray-50 p-6 dark:bg-slate-800">
						<div class="sc-ckMVTt jUiJgh">
							<div
								display="flex"
								class="sc-gsnTZi eMxiQG border-b border-gray-300 pb-3 dark:border-slate-600"
							>
								<h4 class="text-md font-semibold dark:text-white">
									Assistant user seats
								</h4>
							</div>

							<div class="my-4 text-sm text-slate-600 dark:text-slate-300">
								<p class="">Assistant seat pricing is not active yet.</p>
								<p>Assistant use won't be charged for the time being.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	progress[value] {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 0.5rem;
	}

	progress[value]::-webkit-progress-bar {
		background-color: hsl(221, 100%, 96%);
		border-radius: 0.5rem;

		overflow: hidden;
	}

	progress[value]::-webkit-progress-value {
		background-image: -webkit-linear-gradient(
				top,
				rgba(255, 255, 255, 0.25),
				rgba(0, 0, 0, 0.25)
			),
			-webkit-linear-gradient(left, rgb(58, 0, 204), rgb(75, 228, 255));

		border-radius: 0.5rem;
		background-size: 35px 20px, 100% 100%, 100% 100%;
	}
</style>

<script setup>
	import { ref } from 'vue';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
	} from '@headlessui/vue';
	import {
		MagnifyingGlassIcon,
		QuestionMarkCircleIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	import {
		Bars3Icon,
		BellIcon,
		ExclamationTriangleIcon,
		CogIcon,
		CreditCardIcon,
		SparklesIcon,
		KeyIcon,
		SquaresPlusIcon,
		UserCircleIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format, addDays } from 'date-fns';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const task_entitlement = 100000;
	const current_usage = 50000;

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 billingEmail,
		 stripeCustomerId,
		 trayWorkspaceId,
		 Subscription(*),
		 Team (
			id,
			name
		 )
	   )`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const tiers = 10;
	const monthly_base = 150;

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

	const pricing = [...Array(tiers)]
		.fill(undefined)
		.map((_, i) => {
			const initial_value = 0.005;
			const decay_rate = 0.2;
			return initial_value * (1 - decay_rate) ** i;
		})
		.map((o, i) => {
			const initial_value = 0.05;
			const start_tier = 1000000;
			return {
				quantity: multiplyAndDouble(start_tier, tiers)[i],
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
		return price;
	};
</script>
