<template>
	<div class="">
		<div class="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
			<div class="mx-auto max-w-2xl sm:text-center">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Support
				</h2>
				<p class="mt-2 text-lg leading-8 text-gray-600">
					Have a question about Motis Group or an issue with your purchase? Get
					in touch and we’ll help you out.
				</p>
			</div>
			<div class="mx-auto mt-20 max-w-lg space-y-16">
				<div class="flex gap-x-6">
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600"
					>
						<ChatBubbleLeftRightIcon
							class="h-6 w-6 text-white"
							aria-hidden="true"
						/>
					</div>
					<div>
						<h3 class="text-base font-semibold leading-7 text-gray-900">
							Sales support
						</h3>
						<p class="mt-2 text-sm leading-7 text-gray-600">
							If you need help with something related to your purchase (didn't
							get your receipt, entered the wrong email at purchase, need a
							refund, etc.) please
							<a
								class="font-bold text-indigo-600 underline"
								href="mailto:support@motis.group"
								target="_blank"
								>email us</a
							>
							and we will do everything we can to take care of you.
						</p>
						<p class="mt-4">
							<a
								target="_blank"
								href="mailto:support@motis.group"
								class="text-sm font-semibold leading-6 text-indigo-600"
								>Contact us <span aria-hidden="true">&rarr;</span></a
							>
						</p>
					</div>
				</div>
				<div class="flex gap-x-6">
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600"
					>
						<BugAntIcon class="h-6 w-6 text-white" aria-hidden="true" />
					</div>
					<div>
						<h3 class="text-base font-semibold leading-7 text-gray-900">
							Bug reports
						</h3>
						<p class="mt-2 text-sm leading-7 text-gray-600">
							If you find a bug with an automation that you'd like to report for
							us to fix, please
							<a
								href="/account/requests"
								target="_blank"
								rel="noopener noreferrer"
								>create a request</a
							>
							in your account.
						</p>
						<p class="mt-4">
							<a
								href="/account/requests"
								target="_blank"
								class="text-sm font-semibold leading-6 text-indigo-600"
								>Report a bug <span aria-hidden="true">&rarr;</span></a
							>
						</p>
					</div>
				</div>
				<div class="flex gap-x-6">
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600"
					>
						<ComputerDesktopIcon
							class="h-6 w-6 text-white"
							aria-hidden="true"
						/>
					</div>
					<div>
						<h3 class="text-base font-semibold leading-7 text-gray-900">
							Technical support
						</h3>
						<p class="mt-2 leading-7 text-gray-600">
							If you have questions about things like integrating a component
							into your project, tweaking a design in a particular way,
							accomplishing some interactive behavior with JavaScript, etc., we
							recommend joining the Tailwind UI Discord community and asking
							your question to the group.
						</p>
						<p class="mt-4">
							<a
								href="#"
								class="text-sm font-semibold leading-6 text-indigo-600"
								>Join our Discord <span aria-hidden="true">&rarr;</span></a
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		BugAntIcon,
		ChatBubbleLeftRightIcon,
		ComputerDesktopIcon,
	} from '@heroicons/vue/24/outline';
</script>
