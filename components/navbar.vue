<script setup>
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	} from '@headlessui/vue';
	import { ShoppingCartIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
	import { PlusIcon } from '@heroicons/vue/20/solid';

	const route = useRoute();

	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	const loading = ref(true);
	const username = ref('');
	const website = ref('');
	const avatar_path = ref('');

	async function signOut() {
		try {
			loading.value = true;
			let { error } = await supabase.auth.signOut();
			location.reload();
			if (error) throw error;
			user.value = null;
		} catch (error) {
			alert(error.message);
		} finally {
			loading.value = false;
		}
	}

	const paths = [
		{
			id: '/contact',
			title: 'Consulting',
			active: route.path === '/contact' || route.path.includes('contact'),
		},
		{
			id: '/blueprints',
			title: 'Blueprints',
			active: route.path === '/blueprints' || route.path.includes('blueprint'),
		},
		{
			id: '/components',
			title: 'Components',
			active: route.path === '/components' || route.path.includes('components'),
		},
		{
			id: '/posts',
			title: 'Blog',
			active: route.path === '/feed' || route.path.includes('post'),
		},
	];
</script>

<template>
	<Disclosure
		as="nav"
		class="sticky top-0 z-50 bg-white shadow backdrop-blur-xl dark:bg-slate-900/30"
	>
		<div class="mx-auto px-48">
			<div class="flex h-16 justify-between">
				<div class="flex">
					<div class="-ml-2 mr-2 flex items-center md:hidden">
						<!-- Mobile menu button -->
						<DisclosureButton
							class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<span class="sr-only">Open main menu</span>
						</DisclosureButton>
					</div>
					<div class="flex flex-shrink-0 items-center">
						<a href="/"
							><Motis class="block h-6 w-auto lg:hidden" />
							<Motis class="hidden h-6 w-auto lg:block"
						/></a>
					</div>
					<div class="hidden md:ml-6 md:flex md:space-x-8">
						<!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
						<DisclosureButton
							v-for="path in paths"
							:key="path.id"
							as="a"
							:href="path.id"
							:class="[
								path.active
									? 'border-indigo-500 text-slate-900 dark:text-white'
									: 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300',
								'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors',
							]"
							>{{ path.title }}</DisclosureButton
						>
					</div>
				</div>
				<div
					v-if="user"
					class="lg:border-slate-900/15 border-slate-100 dark:border-slate-800 lg:ml-8 lg:flex lg:items-center lg:border-l lg:pl-8"
				>
					<Menu as="div" class="relative inline-block text-left">
						<div>
							<MenuButton
								class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:text-white"
							>
								Account
								<ChevronDownIcon
									class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
									aria-hidden="true"
								/>
							</MenuButton>
						</div>

						<transition
							enter-active-class="transition duration-100 ease-out"
							enter-from-class="transform scale-95 opacity-0"
							enter-to-class="transform scale-100 opacity-100"
							leave-active-class="transition duration-75 ease-in"
							leave-from-class="transform scale-100 opacity-100"
							leave-to-class="transform scale-95 opacity-0"
						>
							<MenuItems
								class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								<p class="truncate py-3 px-3.5" role="none">
									<span class="block text-xs text-gray-500" role="none"
										>Signed in as</span
									><span class="mt-0.5 font-semibold" role="none">{{
										user.email
									}}</span>
								</p>
								<div class="px-2 py-1">
									<MenuItem v-slot="{ active }">
										<a
											href="/changelog"
											:class="[
												active ? 'bg-slate-100 ' : 'text-gray-900',
												'group flex w-full items-center rounded-md px-2 py-2 text-sm',
											]"
										>
											Changelog
										</a>
									</MenuItem>
									<MenuItem v-slot="{ active }">
										<a
											href="/support"
											:class="[
												active ? 'bg-slate-100 ' : 'text-gray-900',
												'group flex w-full items-center rounded-md px-2 py-2 text-sm',
											]"
										>
											Support
										</a>
									</MenuItem>
									<MenuItem v-slot="{ active }">
										<a
											href="/account/license"
											:class="[
												active ? 'bg-slate-100 ' : 'text-gray-900',
												'group flex w-full items-center rounded-md px-2 py-2 text-sm',
											]"
										>
											License
										</a>
									</MenuItem>
								</div>
								<div class="px-2 py-1">
									<MenuItem v-slot="{ active }">
										<a
											href="/upgrade"
											:class="[
												active ? 'bg-slate-100 ' : 'text-gray-900',
												'group flex w-full items-center rounded-md px-2 py-2 text-sm',
											]"
										>
											{{ 'Upgrade to Team License' }}
										</a>
									</MenuItem>
								</div>

								<div class="px-2 py-1">
									<MenuItem v-slot="{ active }">
										<a
											href="/account/settings"
											:class="[
												active ? 'bg-slate-100 ' : 'text-gray-900',
												'group flex w-full items-center rounded-md px-2 py-2 text-sm',
											]"
										>
											Account Settings
										</a>
									</MenuItem>
									<MenuItem v-slot="{ active }">
										<button
											@click="signOut"
											:class="[
												active ? 'bg-slate-100 ' : 'text-gray-900',
												'group flex w-full items-center rounded-md px-2 py-2 text-sm',
											]"
										>
											Sign Out
										</button>
									</MenuItem>
								</div>
							</MenuItems>
						</transition>
					</Menu>
				</div>
				<div
					v-else-if="!user"
					class="lg:border-slate-900/15 lg:ml-8 lg:flex lg:items-center lg:border-l lg:pl-8 lg:dark:border-slate-800"
				>
					<div class="">
						<button
							href="/login"
							class="text-sm font-semibold dark:text-white hover:dark:text-gray-200"
							@click="$emit('open-modal')"
						>
							Sign in</button
						><button
							@click="$emit('open-modal')"
							class="-my-2.5 ml-8 inline-flex justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-700"
						>
							<span>Get all-access <span aria-hidden="true">→</span></span>
						</button>
					</div>
				</div>
			</div>
		</div>

		<DisclosurePanel class="md:hidden">
			<div class="space-y-1 pt-2 pb-3">
				<!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
				<DisclosureButton
					v-for="path in paths"
					:key="path.id"
					as="a"
					:href="path.id"
					:class="[
						path.active
							? 'border-indigo-500 bg-indigo-50 text-indigo-700'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
						'block border-l-4 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-gray-500  transition-colors sm:pl-5 sm:pr-6',
					]"
					>{{ path.title }}</DisclosureButton
				>
			</div>
			<div class="border-t border-gray-200 pt-4 pb-3">
				<div class="flex items-center px-4 sm:px-6">
					<div class="flex-shrink-0">
						<img
							class="h-10 w-10 rounded-full"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div class="ml-3">
						<div class="text-base font-medium text-gray-800">Tom Cook</div>
						<div class="text-sm font-medium text-gray-500">tom@example.com</div>
					</div>
					<button
						type="button"
						class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						<span class="sr-only">View notifications</span>
						<ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div class="mt-3 space-y-1">
					<DisclosureButton
						as="a"
						href="#"
						class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
						>Your Profile</DisclosureButton
					>
					<DisclosureButton
						as="a"
						href="#"
						class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
						>Settings</DisclosureButton
					>
					<DisclosureButton
						as="a"
						href="#"
						class="block bg-black px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
						>Sign out</DisclosureButton
					>
				</div>
			</div>
		</DisclosurePanel>
	</Disclosure>
</template>

<script>
	export default {
		components: { ChevronDownIcon },
	};
</script>
