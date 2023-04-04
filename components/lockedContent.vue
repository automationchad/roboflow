<template>
	<div class="relative z-10">
		<div
			class="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"
		/>

		<div class="fixed inset-0 z-10 overflow-y-auto">
			<div
				class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
			>
				<div
					class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
				>
					<div class="text-center">
						<LockClosedIcon class="mx-auto h-8 w-8 text-gray-400" />

						<h3 class="mt-2 text-sm font-semibold text-gray-900">
							No plan selected
						</h3>
						<p class="mt-1 text-sm text-gray-500">
							Get started by subscribing to a plan.
						</p>
						<div class="mt-6">
							<a
								href="/settings"
								class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<CreditCardIcon
									class="-ml-0.5 mr-1.5 h-5 w-5"
									aria-hidden="true"
								/>
								Subscribe
							</a>
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
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import { CheckIcon, CreditCardIcon } from '@heroicons/vue/24/outline';
	import { LockClosedIcon } from '@heroicons/vue/20/solid';

	const open = ref(true);

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 stripeCustomerId,
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

	

	const handleCheckout = async (product, type, customer, subscription) => {
		const { url } = await $fetch('/api/stripe/checkout', {
			method: 'post',
			body: {
				customer,
				subscription,
				product,
				type,
			},
		});
		location.href = url;
	};
</script>
