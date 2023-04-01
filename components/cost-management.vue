<template>
	<div class="">
		<div role="tabpanel">
			<div class="mt-8">
				<div class="block">
					<div class="">
						<div class="flex w-full">
							<div class="sc-gsnTZi w-1/3">
								<p class="sc-kLLXSd text-base text-slate-200">PLAN</p>
								<h3 class="my-8 text-2xl font-semibold text-white">
									${{ monthly_base }}.00
								</h3>
							</div>
							<div class="sc-gsnTZi w-1/3">
								<p class="sc-kLLXSd text-base text-slate-200">TASKS</p>
								<h3 class="my-8 text-2xl font-semibold text-white">
									${{ taskPrice(100000) }}.00
								</h3>
							</div>

							<div class="sc-gsnTZi w-1/3">
								<p class="sc-kLLXSd text-base text-slate-200">TOTAL COST</p>
								<h3 class="my-8 text-2xl font-semibold text-white">
									${{ taskPrice(100000) + monthly_base }}.00
								</h3>
							</div>
						</div>
						<div class="sc-gsnTZi mb-4 text-white">Mar 27 - Apr 27 2023</div>
					</div>
				</div>
				<div display="flex" class="sc-gsnTZi esrEWY">
					<div class="sc-gsnTZi gwIZYl">
						<div class="sc-ckMVTt jUiJgh">
							<div display="flex" class="sc-gsnTZi eMxiQG">
								<h4 class="sc-fbPSWO bOtoTi">Run Minutes</h4>
								<div class="sc-TRNrF iPuFes"></div>
							</div>
							<hr
								orientation="horizontal"
								role="separator"
								class="sc-lbOyJj hSZvBg"
							/>
							<div display="flex" class="sc-gsnTZi hsHyHg">
								<div display="flex" class="sc-gsnTZi cnqWna">
									<div class="sc-gsnTZi kJQFiu">
										<div class="sc-gsnTZi kJQFiu">
											<p class="sc-kLLXSd eZQsKN">0/240</p>
										</div>
										<div class="sc-gsnTZi kJQFiu">
											<p class="sc-kLLXSd iZhyin">Plan minutes used</p>
										</div>
									</div>
								</div>
								<div class="sc-gsnTZi lfbUMF">
									<div class="sc-gsnTZi ctQzQb">
										<div class="sc-hiMGwR dkaYIm">
											<svg class="sc-bBXxYQ bNugWl"></svg>
										</div>
									</div>
									<div display="flex" class="sc-gsnTZi fMimhH">
										<p class="sc-kLLXSd dKpaiX">0 Self-hosted minutes</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="sc-gsnTZi hEMNGs">
						<div class="sc-ckMVTt jUiJgh">
							<div display="flex" class="sc-gsnTZi eMxiQG">
								<h4 class="sc-fbPSWO bOtoTi">Assistant user seats</h4>
								<div class="sc-TRNrF iPuFes"></div>
							</div>
							<hr
								orientation="horizontal"
								role="separator"
								class="sc-lbOyJj hSZvBg"
							/>
							<div class="sc-gsnTZi cPuxZH">
								<p class="sc-kLLXSd dNFiIX">
									Assistant seat pricing is not active yet.
								</p>
								<p class="sc-kLLXSd iZhyin">
									Assistant use won't be charged for the time being.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

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

	import { format } from 'date-fns';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

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
