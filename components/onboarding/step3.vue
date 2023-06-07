<template>
	<form>
		<div class="space-y-12">
			<div class="border-b border-white/10 pb-12">
				<h2 class="text-base font-semibold leading-7 text-white">
					Notifications
				</h2>
				<p class="mt-1 text-sm leading-6 text-gray-400">
					We'll always let you know about important changes, but you pick what
					else you want to hear about.
				</p>

				<div class="mt-10 space-y-10">
					<fieldset>
						<legend class="text-sm font-semibold leading-6 text-white">
							By Email
						</legend>
						<div class="mt-6 space-y-6">
							<div class="relative flex gap-x-3">
								<div class="flex h-6 items-center">
									<input
										id="comments"
										name="comments"
										type="checkbox"
										class="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
									/>
								</div>
								<div class="text-sm leading-6">
									<label for="comments" class="font-medium text-white"
										>Comments</label
									>
									<p class="text-gray-400">
										Get notified when someones posts a comment on a posting.
									</p>
								</div>
							</div>
							<div class="relative flex gap-x-3">
								<div class="flex h-6 items-center">
									<input
										id="candidates"
										name="candidates"
										type="checkbox"
										class="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
									/>
								</div>
								<div class="text-sm leading-6">
									<label for="candidates" class="font-medium text-white"
										>Candidates</label
									>
									<p class="text-gray-400">
										Get notified when a candidate applies for a job.
									</p>
								</div>
							</div>
							<div class="relative flex gap-x-3">
								<div class="flex h-6 items-center">
									<input
										id="offers"
										name="offers"
										type="checkbox"
										class="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
									/>
								</div>
								<div class="text-sm leading-6">
									<label for="offers" class="font-medium text-white"
										>Offers</label
									>
									<p class="text-gray-400">
										Get notified when a candidate accepts or rejects an offer.
									</p>
								</div>
							</div>
						</div>
					</fieldset>
					<fieldset>
						<legend class="text-sm font-semibold leading-6 text-white">
							Push Notifications
						</legend>
						<p class="mt-1 text-sm leading-6 text-gray-400">
							These are delivered via SMS to your mobile phone.
						</p>
						<div class="mt-6 space-y-6">
							<div class="flex items-center gap-x-3">
								<input
									id="push-everything"
									name="push-notifications"
									type="radio"
									class="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
								/>
								<label
									for="push-everything"
									class="block text-sm font-medium leading-6 text-white"
									>Everything</label
								>
							</div>
							<div class="flex items-center gap-x-3">
								<input
									id="push-email"
									name="push-notifications"
									type="radio"
									class="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
								/>
								<label
									for="push-email"
									class="block text-sm font-medium leading-6 text-white"
									>Same as email</label
								>
							</div>
							<div class="flex items-center gap-x-3">
								<input
									id="push-nothing"
									name="push-notifications"
									type="radio"
									class="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
								/>
								<label
									for="push-nothing"
									class="block text-sm font-medium leading-6 text-white"
									>No push notifications</label
								>
							</div>
						</div>
					</fieldset>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-6">
			<button
				@click="handlePrevious"
				class="text-sm font-semibold leading-6 text-white"
			>
				Previous
			</button>
			<button
				@click="handleFinish"
				type="submit"
				class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
			>
				Finish
			</button>
		</div>
	</form>
</template>

<script setup>
	import { ref } from 'vue';


	const emit = defineEmits(['previous', 'next']);

	const username = ref('');

	const handlePrevious = () => {
		emit('previous');
	};

	const handleSave = () => {
		emit('next');
	};

	const props = defineProps({
		formData: Object,
		saveData: Function,
	});
</script>
