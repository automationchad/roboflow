<template>
	<div>
		<navbar />

		<div class="lg:pl-72">
			<main class="py-10 px-4 sm:px-6 lg:px-8">
				<div class="mb-8 grid grid-cols-2 gap-x-8">
					<div class="grid grid-cols-3 gap-x-8">
						<div class="bg-slate-50 p-8 dark:bg-slate-800">
							<h3 class="text-sm text-slate-300">Total value</h3>
							<h2 class="text-3xl font-semibold dark:text-white">$0.00</h2>
						</div>
						<div class="bg-slate-50 p-8 dark:bg-slate-800">
							<h3 class="text-sm text-slate-300">Total requests</h3>
							<h2 class="text-3xl font-semibold dark:text-white">
								{{ User.Account.Ticket[0].count }}
							</h2>
						</div>
						<div class="bg-slate-50 p-8 dark:bg-slate-800">
							<h3 class="text-sm text-slate-300">Number of task</h3>
							<h2 class="text-3xl font-semibold dark:text-white">0</h2>
						</div>
					</div>
					<div class=""></div>
				</div>
				<div class="grid grid-flow-row grid-cols-2 grid-rows-2 gap-8">
					<div
						class="items-center bg-slate-50 py-6 text-sm dark:bg-slate-800 dark:text-slate-100"
					>
						<div class="flex items-center justify-between pr-8">
							<div class="px-4 text-base font-semibold">Tasks</div>
							<div>
								<select
									v-model="period"
									id="location"
									name="location"
									class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									<option value="7">Last 7 days</option>
									<option value="30">Last 30 days</option>
									<option value="90">All time</option>
								</select>
							</div>
						</div>

						<task-runs
							:period="period"
							v-if="!hosting_needed && User.Account.trayWorkspaceId !== null"
						/>
						<div
							v-else
							class="py-24 text-center text-slate-700 dark:text-slate-300"
						>
							You'll need to
							<a
								:href="`/${User.Account.id}/settings/billing`"
								class="font-semibold text-indigo-500"
								>upgrade your hosting</a
							>
							to see tasks
						</div>
					</div>
					<div
						class="row-span-2 items-center bg-slate-50 py-6 text-sm dark:bg-slate-800 dark:text-slate-100"
					>
						<div class="px-4 text-base font-semibold">Tickets</div>
						<task-list v-if="upgrade_needed" />
						<div
							v-else
							class="py-24 text-center text-slate-700 dark:text-slate-300"
						>
							You'll need to
							<a
								:href="`/${User.Account.id}/settings/billing`"
								class="font-semibold text-indigo-500"
								>select a plan</a
							>
							to see tickets
						</div>
					</div>
					<div
						class="items-center bg-slate-50 py-6 text-sm dark:bg-slate-800 dark:text-slate-100"
					>
						<div class="px-4 text-base font-semibold">Workflows</div>
						<workflow-list
							v-if="!hosting_needed && User.Account.trayWorkspaceId !== null"
						/>
						<div
							v-else
							class="py-24 text-center text-slate-700 dark:text-slate-300"
						>
							You'll need to
							<a
								:href="`/${User.Account.id}/settings/billing`"
								class="font-semibold text-indigo-500"
								>upgrade your hosting</a
							>
							to see workflows
						</div>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Dialog,
		DialogPanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		ChartPieIcon,
		Cog6ToothIcon,
		DocumentDuplicateIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		UsersIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
	} from '@heroicons/vue/20/solid';

	definePageMeta({ middleware: ['auth'] });
	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
	});

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select('systemRole,Account(*,Subscription(*),Ticket(count))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

		const period = ref(30);
	console.log(User);

	let hosting = {};
	hosting = User.Account.Subscription.find((o) => o.type === 'hosting');

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	const upgrade_needed =
		retainer.status !== 'active' || retainer.tier === 'free';

	const hosting_needed = !hosting;

	const userNavigation = [
		{ name: 'Your profile', href: '/settings' },
		{ name: 'Sign out', href: '#' },
	];
</script>
