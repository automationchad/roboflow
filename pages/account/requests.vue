<template>
	<div>
		<div class="relative h-full">
			<Navbar
				class=""
				@open-modal="showLoginModal = true"
				:user="user"
				:profile="profile"
			/>
			<div class="mx-auto grid max-w-7xl py-24 sm:py-32">
				<div class="mb-8 border-b border-gray-200 bg-white py-5">
					<div
						class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
					>
						<div class="ml-4 mt-2">
							<h3 class="text-base font-semibold leading-6 text-gray-900">
								Requests
							</h3>
						</div>
						<div class="ml-4 mt-2 flex-shrink-0">
							<button
								type="button"
								@click="showSubmitModal = true"
								class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Create new request
							</button>
						</div>
					</div>
				</div>
				<div v-if="people.length === 0" class="text-center">
					<TicketIcon class="mx-auto h-12 w-12 text-gray-400" />

					<h3 class="mt-2 text-sm font-semibold text-gray-900">No requests</h3>
					<p class="mt-1 text-sm text-gray-500">
						Get started by creating a new requests.
					</p>
					<div class="mt-6">
						<button
							type="button"
							@click="showSubmitModal = true"
							class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							<PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
							New Request
						</button>
					</div>
				</div>
				<div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div
						v-for="person in people"
						:key="person.email"
						class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
					>
						<div class="flex-shrink-0">
							<img
								class="h-10 w-10 rounded-full"
								:src="person.imageUrl"
								alt=""
							/>
						</div>
						<div class="min-w-0 flex-1">
							<a href="#" class="focus:outline-none">
								<span class="absolute inset-0" aria-hidden="true" />
								<p class="text-sm font-medium text-gray-900">
									{{ person.name }}
								</p>
								<p class="truncate text-sm text-gray-500">{{ person.role }}</p>
							</a>
						</div>
					</div>
				</div>
			</div>
			<RequestSubmit
				v-show="showSubmitModal"
				@close-modal="showSubmitModal = false"
			/>
		</div>
	</div>
</template>

<script setup>
	import { PlusIcon, TicketIcon } from '@heroicons/vue/24/outline';
	import { useAttrs } from 'vue';
	const attrs = useAttrs();
	const user = attrs.user;
	const profile = attrs.profile;
	// if (!user) {
	// 	navigateTo('/');
	// }
	const people = [
		{
			name: 'Leslie Alexander',
			email: 'leslie.alexander@example.com',
			role: 'Co-Founder / CEO',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		// {
		// 	name: 'Leslie Alexander',
		// 	email: 'leslie.alexander@example.com',
		// 	role: 'Co-Founder / CEO',
		// 	imageUrl:
		// 		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		// },
		// {
		// 	name: 'Leslie Alexander',
		// 	email: 'leslie.alexander@example.com',
		// 	role: 'Co-Founder / CEO',
		// 	imageUrl:
		// 		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		// },
		// {
		// 	name: 'Leslie Alexander',
		// 	email: 'leslie.alexander@example.com',
		// 	role: 'Co-Founder / CEO',
		// 	imageUrl:
		// 		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		// },
		// More people...
	];
</script>

<script>
	export default {
		data() {
			return {
				success: false,
				showSubmitModal: false,
				showOtpModal: false,
			};
		},
	};
</script>
