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
						<div class="px-4 text-base font-semibold">Tasks</div>
						<task-runs
							v-if="!hosting_needed && User.Account.trayWorkspaceId !== null"
						/>
						<div v-else class="py-24 text-center text-slate-700">
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
						<div v-else class="py-24 text-center text-slate-700">
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
						<div v-else class="py-24 text-center text-slate-700">
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
		.select(
			`*,Account (
	     id,
		 billingEmail,
		 Ticket(count),
		 trayWorkspaceId,
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

	console.log(User);
	let hosting = {};
	hosting = User.Account.Subscription.find((o) => o.type === 'hosting');

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	const upgrade_needed =
		retainer.status !== 'active' || retainer.tier === 'free';

	const hosting_needed = !User.Account.Subscription.find(
		(o) => o.type === 'hosting'
	);

	const userNavigation = [
		{ name: 'Your profile', href: '/settings' },
		{ name: 'Sign out', href: '#' },
	];
</script>
