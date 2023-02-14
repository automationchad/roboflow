<template>
	<div class="relative z-10">
		<transition
			enter="ease-out duration-300"
			enter-from="opacity-0"
			enter-to="opacity-100"
			leave="ease-in duration-200"
			leave-from="opacity-100"
			leave-to="opacity-0"
		>
			<div
				@click="$emit('close-modal'), (error_message = '')"
				class="fixed inset-0 bg-gray-500/25 transition-opacity dark:bg-black/75"
			>
				<div class="fixed inset-0 z-10 overflow-y-auto">
					<div
						class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
					>
						<transition
							@click.stop
							enter="ease-out duration-300"
							enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enter-to="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leave-from="opacity-100 translate-y-0 sm:scale-100"
							leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div
								class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-slate-800 sm:my-8 sm:w-full sm:max-w-md sm:p-10"
							>
								<div class="">
									<h3
										class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
									>
										Login or Signup
									</h3>
									<p class="mt-4 text-sm text-gray-600 dark:text-slate-500">
										Create or log in to an existing Motis account.
									</p>
									<p class="mt-2 text-sm text-gray-600 dark:text-slate-500">
										Enter your email address and we’ll send you a magic log in
										link.
									</p>
								</div>

								<div class="mt-6 space-y-6">
									<div>
										<div
											class="relative mt-1 rounded-md shadow-sm dark:bg-slate-700"
										>
											<div
												class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 peer-focus:text-slate-200 dark:text-slate-600"
											>
												<EnvelopeIcon class="h-5 w-5" aria-hidden="true" />
											</div>
											<input
												v-model="email"
												id="email"
												name="email"
												type="email"
												autocomplete="email"
												required
												placeholder="Enter your email address..."
												class="peer block w-full rounded-md border-gray-300 pl-10 placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:text-sm"
											/>
										</div>
										<div
											v-if="error_message != ''"
											class="mt-3 text-xs text-rose-500"
										>
											Error: {{ error_message }}
										</div>
									</div>

									<div>
										<button
											:disabled="loading"
											@click="handleLogin"
											class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											<span>{{ loading ? 'Loading' : 'Send magic link' }}</span>
										</button>
									</div>
								</div>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup>
	import { CheckIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';
	const emit = defineEmits(['close-modal', 'show-otp-modal']);
	const open = ref(true);
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const email = ref('');
	const loading = ref(false);
	const error_occurred = ref(false);
	const error_message = ref('');
	const handleLogin = async () => {
		try {
			loading.value = true;
			const { error } = await supabase.auth.signInWithOtp({
				email: email.value,
				options: { shouldCreateUser: true },
			});
			if (error) {
				error_occurred.value = true;
				error_message.value = error.error_description || error.message;
				throw error;
			}
			emit('close-modal');
			emit('show-otp-modal');
		} catch (error) {
			error_occurred.value = true;
			error_message.value = error.error_description || error.message;
			// emit('close-modal', error.error_description || error.message);
		} finally {
			loading.value = false;
		}
	};
</script>

<script>
	export default {
		props: ['showModal'],
	};
</script>
