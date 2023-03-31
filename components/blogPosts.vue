<template>
	<div class="bg-white">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-2xl">
				<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Documentation
				</h2>
				<p class="mt-2 text-lg leading-8 text-gray-600">
					A collection of all documents for workflows
				</p>
				<div
					class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"
				>
					<article
						v-for="post in posts"
						:key="post.id"
						class="flex max-w-xl flex-col items-start justify-between"
					>
						<div class="flex items-center gap-x-4 text-xs">
							{{ format(new Date(post.createdOn), 'MMMM dd, yyyy') }}
							<span
								class="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600"
								>{{ post.category }}</span
							>
						</div>
						<div
							class="group relative mt-3 flex w-full items-center justify-between"
						>
							<h3 class="text-lg font-semibold leading-6 text-gray-900">
								<span>
									<span class="absolute inset-0" />
									{{ post.name }}
								</span>
							</h3>
							<Menu as="div" class="relative inline-block text-left">
								<div>
									<MenuButton
										class="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
									>
										<span class="sr-only">Open options</span>
										<svg class="h-8 w-8" fill="none" viewBox="0 0 24 24">
											<path
												fill="currentColor"
												d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
											></path>
											<path
												fill="currentColor"
												d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
											></path>
											<path
												fill="currentColor"
												d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
											></path>
										</svg>
									</MenuButton>
								</div>

								<transition
									enter-active-class="transition ease-out duration-100"
									enter-from-class="transform opacity-0 scale-95"
									enter-to-class="transform opacity-100 scale-100"
									leave-active-class="transition ease-in duration-75"
									leave-from-class="transform opacity-100 scale-100"
									leave-to-class="transform opacity-0 scale-95"
								>
									<MenuItems
										class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									>
										<div class="py-1">
											<MenuItem v-slot="{ active }">
												<a
													href="#"
													:class="[
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm',
													]"
													>Read PPD</a
												>
											</MenuItem>
											<MenuItem v-slot="{ active }">
												<a
													href="#"
													:class="[
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm',
													]"
													>Watch video</a
												>
											</MenuItem>
											<MenuItem v-slot="{ active }">
												<a
													href="#"
													:class="[
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm',
													]"
													>Workflow Link</a
												>
											</MenuItem>
										</div>
									</MenuItems>
								</transition>
							</Menu>
						</div>
						<div
							class="my-5 w-full whitespace-pre-wrap border-l-2 border-indigo-700 bg-indigo-50 py-3 pl-4 text-sm leading-6 text-indigo-900 line-clamp-3"
						>
							{{ post.desc }}
						</div>

						<div class="relative mt-8 flex items-center gap-x-4" v-if="false">
							<img :src="''" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
							<div class="text-sm leading-6">
								<p class="font-semibold text-gray-900">
									<a :href="post.createdBy">
										<span class="absolute inset-0" />
										{{ post.User.firstName }} {{ post.User.lastName }}
									</a>
								</p>
								<p class="text-gray-600">{{ post.dec }}</p>
							</div>
						</div>
					</article>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
	import { format } from 'date-fns/esm';
</script>

<script>
	export default {
		data() {
			return {
				currPage: 0,
				maxRecords: 100,
			};
		},
		props: ['posts'],
		computed: {
			postsFiltered() {
				if (this.posts.length > 0) {
					return this.posts.slice(
						this.currPage * this.maxRecords,
						this.currPage * this.maxRecords + this.maxRecords >
							this.posts.length
							? this.posts.length
							: this.currPage * this.maxRecords + this.maxRecords
					);
				} else return [];
			},
		},
	};
</script>

<style scoped>
	.link {
		position: relative;
	}
	.link:before {
		content: '';
		position: absolute;
		width: 0;
		height: 1px;
		bottom: 0;
		left: 0;

		visibility: hidden;
		transition: all 0.3s ease-in-out;
	}

	.link:hover:before {
		visibility: visible;
		width: 100%;
	}
</style>
