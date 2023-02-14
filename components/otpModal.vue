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
				@click="$emit('close-modal')"
				class="fixed inset-0 transition-opacity"
			>
				<div class="fixed inset-x-0 bottom-0 z-10 overflow-y-auto">
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
								class="relative transform overflow-hidden rounded-lg bg-black dark:bg-white px-4 py-4 text-left shadow-xl transition-all sm:my-8 sm:px-6 border border-gray-200/20"
							>
								<div class="flex items-center text-white dark:text-black">
									<EnvelopeIcon class="h-5 w-5 mr-1" />
									<div class="">
										Check your inbox, we've sent you a magic log in link!
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
	
</script>

<script>
	export default {
		props: ['showModal'],
	};
</script>
