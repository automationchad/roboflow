<template>
	<div class="max-w-2xl">
		<warning-access :role="User.systemRole" />

		<div class="mt-8 space-y-6">
			<loading-spinner v-if="state.loading" />
			<section v-else aria-labelledby="payment-details-heading">
				<fieldset
					:disabled="
						User.systemRole !== 'owner' && User.systemRole !== 'super_admin'
					"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden sm:rounded-md">
						<div class="pb-6">
							<div>
								<h2
									id="payment-details-heading"
									class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
								>
									Billing information
								</h2>
							</div>

							<div class="mt-6 grid grid-cols-4 gap-6">
								<div class="col-span-4 sm:col-span-2">
									<label
										for="email-address"
										class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
										>Billing email</label
									>

									<div
										class="mt-2 block rounded-md border-0 dark:bg-slate-800 py-1.5 px-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-slate-800 dark:text-white dark:ring-slate-700 sm:text-sm sm:leading-6"
									>
										
										<input
											
											v-model="state.email"
											type="text"
											name="email-address"
											id="email-address"
											autocomplete="email"
											class="w-full border-none bg-transparent p-0 text-sm focus:ring-0"
										/>
									</div>

									<p class="mt-2 text-xs text-slate-600 dark:text-slate-300">
										The invoices will be sent to this email
									</p>
								</div>
							</div>
						</div>
						<div class="space-x-4 px-4 py-3 text-right sm:px-6">
							<button
								@click="handleReset()"
								class="inline-flex justify-center rounded-md border border-slate-400 py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:text-slate-300"
							>
								Cancel
							</button>
							<button
								@click="
									handleUpdateStripe(User.Account.stripeCustomerId, {
										email: state.email,
									})
								"
								:disabled="loading"
								class="inline-flex justify-center rounded-md bg-gray-900 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-slate-700"
							>
								{{ loading ? 'Loading' : 'Submit' }}
							</button>
						</div>
					</div>
				</fieldset>
			</section>
		</div>
	</div>
</template>

<script setup>
	import { reactive, onMounted, ref } from 'vue';
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

	const state = reactive({
		customer: null,
		loading: true,
	});

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(`systemRole,Account(id,stripeCustomerId,Subscription(*))`)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const fetchData = async () => {
		const data = await $fetch(
			`/api/stripe/customer/${User.Account.stripeCustomerId}`
		);
		return data;
	};

	const handleReset = async () => {
		state.customer = await fetchData();
		state.loading = false;
		state.email = state.customer.email;
	};

	const customer = ref();
	const billingEmail = ref();

	onMounted(async () => {
		state.customer = await fetchData();
		state.loading = false;
		state.email = state.customer.email;
	});

	const handleUpdateStripe = async (customer, values) => {
		state.loading = true;
		const { data } = await $fetch('/api/stripe/customer/update', {
			method: 'post',
			body: {
				customer,
				values,
			},
		});
		state.loading = false;
		return data;
	};
</script>
