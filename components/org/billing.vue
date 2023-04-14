<template>
	<div class="mx-auto w-full">
		<div
			class="max-w-4xl rounded border border-slate-200  dark:border-slate-800 dark:bg-slate-900"
		>
			<warning-access :role="User.systemRole" />

			<div class="mt-8 space-y-6 px-6">
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
								<!-- <div>
								<h2
									id="payment-details-heading"
									class="text-lg font-medium leading-6 text-gray-900 dark:text-white"
								>
									Billing information
								</h2>
							</div> -->
								<label
									for="email-address"
									class="mb-2 block text-sm font-medium leading-6 text-gray-900 dark:text-white"
									>Billing email</label
								>
								<Disclosure
									as="li"
									v-slot="{ open }"
									class="flex items-start justify-between"
								>
									<div class="w-full" v-if="!open">
										<div
											class="block rounded-md border-0 bg-slate-100 px-3 py-1.5 text-slate-600 ring-1 ring-inset ring-slate-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 sm:text-sm sm:leading-6"
										>
											{{ state.email }}
										</div>
									</div>

									<DisclosurePanel
										class="flex flex-grow items-center justify-between text-sm text-gray-500"
									>
										<div class="w-full">
											<div class="flex items-center justify-between">
												<div
													class="mr-2 block w-full rounded-md border-0 bg-white px-3 py-1.5 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-slate-800 dark:text-white dark:ring-slate-700 sm:text-sm sm:leading-6"
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
												<div class="flex items-center space-x-2">
													<DisclosureButton
														@click="handleReset()"
														class="rounded-md border border-indigo-600 bg-white p-2 text-indigo-600"
													>
														<XMarkIcon class="h-5 w-5" />
													</DisclosureButton>
													<DisclosureButton
														@click="
															handleUpdateStripe(
																User.Account.stripeCustomerId,
																{
																	email: state.email,
																}
															)
														"
														:disabled="loading"
														class="rounded-md bg-indigo-600 p-2 text-white"
													>
														<CheckIcon class="h-5 w-5" />
													</DisclosureButton>
												</div>
											</div>
										</div>
									</DisclosurePanel>
									<div class="ml-2">
										<DisclosureButton class="p-2" v-if="!open">
											<PencilIcon class="h-4 w-4 dark:text-slate-400" />
										</DisclosureButton>
									</div>
								</Disclosure>
								<p class="mt-2 text-xs text-slate-600 dark:text-slate-500">
									The invoices will be sent to this email
								</p>
							</div>
						</div>
					</fieldset>
				</section>
			</div>
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
		CheckIcon,
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
		PencilIcon,
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
