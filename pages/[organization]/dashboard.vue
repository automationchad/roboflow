<template>
	<div>
		<Head>
			<Title>Motis Group | Dashboard</Title>
		</Head>
		<div class="mb-8 grid grid-cols-2 gap-x-8">
			<div class="grid grid-cols-3 gap-x-8">
				<div class="rounded border p-8 dark:border-slate-800 dark:bg-slate-900">
					<h3 class="text-sm text-slate-300">Total value</h3>
					<h2 class="text-3xl font-semibold dark:text-white">$0.00</h2>
				</div>
				<div class="rounded border p-8 dark:border-slate-800 dark:bg-slate-900">
					<h3 class="text-sm text-slate-300">Total requests</h3>
					<h2 class="text-3xl font-semibold dark:text-white">
						{{ User.Account.Ticket[0].count }}
					</h2>
				</div>
				<div class="rounded border p-8 dark:border-slate-800 dark:bg-slate-900">
					<h3 class="text-sm text-slate-300">Number of task</h3>
					<h2 class="text-3xl font-semibold dark:text-white">0</h2>
				</div>
			</div>
			<div class=""></div>
		</div>
		<div class="grid grid-flow-row grid-cols-2 grid-rows-2 gap-8">
			<div
				class="items-center rounded border border-slate-200 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
			>
				<executions-list
					:period="'30'"
					v-if="!hosting_needed && User.Account.trayWorkspaceId !== null"
				/>
				<div
					v-else
					class="py-24 text-center text-slate-700 dark:text-slate-300"
				>
					You'll need to
					<NuxtLink
						:to="`/${User.Account.id}/settings/billing/update`"
						class="font-semibold text-indigo-500"
						>upgrade your hosting</NuxtLink
					>
					to see tasks
				</div>
			</div>
			<div
				class="rounded border p-0 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
			>
				<workflow-health
					v-if="!hosting_needed && User.Account.trayWorkspaceId !== null"
				/>
				<div
					v-else
					class="py-24 text-center text-slate-700 dark:text-slate-300"
				>
					You'll need to
					<NuxtLink
						:to="`/${User.Account.id}/settings/billing/update`"
						class="font-semibold text-indigo-500"
						>upgrade your hosting</NuxtLink
					>
					to see tasks
				</div>
			</div>
			<div
				class="row-span-2 items-center rounded border text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
			>
				<ticket-list />
				<!-- <div
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
				</div> -->
			</div>

			<div
				class="row-span-2 items-center rounded border text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
			>
				<workflow-list
					v-if="!hosting_needed && User.Account.trayWorkspaceId !== null"
				/>
				<div
					v-else
					class="py-24 text-center text-slate-700 dark:text-slate-300"
				>
					You'll need to
					<NuxtLink
						:to="`/${User.Account.id}/settings/billing/update`"
						class="font-semibold text-indigo-500"
						>upgrade your hosting</NuxtLink
					>
					to see workflows
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
		LinkIcon,
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
		.select('systemRole,defaultTeamId,Account(*,Subscription(*),Ticket(count))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const period = ref(30);

	let hosting = {};
	hosting = User.Account.Subscription.find((o) => o.type === 'hosting');

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	const upgrade_needed =
		retainer.status !== 'active' || retainer.tier === 'free';

	const documentation = retainer.tier === 'enterprise';

	const hosting_needed = !hosting;

	const userNavigation = [
		{ name: 'Your profile', href: '/settings' },
		{ name: 'Sign out', href: '#' },
	];
</script>
