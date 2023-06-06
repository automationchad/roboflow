<template>
	<div>
		<Head>
			<Title>Motis Group | Dashboard</Title>
		</Head>
		<div
			class="grid grid-flow-col grid-cols-5 gap-8 max-w-5xl"
			v-if="Account.type === 'partner'"
		>
			<org-deals-summary class="col-span-4" />
			<!-- <div class="mb-8 grid grid-cols-2 gap-x-8">
				<div class="grid grid-cols-3 gap-x-8">
					<div
						class="rounded border p-8 dark:border-slate-800 dark:bg-slate-900"
					>
						<h3 class="text-sm text-slate-300">Total value</h3>
						<h2 class="text-3xl font-semibold dark:text-white">$0.00</h2>
					</div>
				</div>
			</div> -->

			<div class="mt-6">
				<div class="flex flex-col items-end space-y-2">
					<button
						@click="showSubmitModal = true"
						class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex cursor-pointer items-center space-x-2 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
						type="button"
					>
						<span class="truncate">New referral</span>
					</button>
				</div>
			</div>
		</div>

		<div
			class="grid grid-flow-row grid-cols-2 grid-rows-2 gap-8"
			v-if="Account.type !== 'partner'"
		>
			<div
				class="items-center rounded border border-slate-200 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
			>
				<executions-list :period="'30'" v-if="!hosting_needed" />
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
				v-if="Account.type !== 'partner'"
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
		<div class="" v-else>
			<div class="">
				<org-deals
					v-for="quarter in quarters"
					:key="quarter"
					:quarter="quarter"
				/>
			</div>
		</div>
		<ticket-submit
			v-show="showSubmitModal"
			@close-modal="showSubmitModal = false"
		/>
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

	const showSubmitModal = ref(false);

	const route = useRoute();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select('systemRole,defaultTeamId,Account(*,Subscription(*),Ticket(count))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	if (
		User.Account.type !== 'super_admin' &&
		route.params.organization !== User.Account.id
	) {
		navigateTo(`/${User.Account.id}/dashboard`);
	}

	let { data: Account, error: accountError } = await supabase
		.from('Account')
		.select('id,type')
		.eq('id', route.params.organization)
		.limit(1)
		.single();

	let hosting = {};

	hosting = User.Account.Subscription.find((o) => o.type === 'hosting');

	const hosting_needed = !hosting;

	const userNavigation = [
		{ name: 'Your profile', href: '/settings' },
		{ name: 'Sign out', href: '#' },
	];

	function generateFinancialQuarters(startDate) {
		let start = new Date(startDate);
		let quarters = [];

		// calculate the start quarter
		let currentQuarter = Math.floor(start.getMonth() / 3);
		let currentYear = start.getFullYear();

		// generate 4 quarters in the past and 1 quarter into the future
		for (let i = -4; i <= 1; i++) {
			let quarter = (currentQuarter + i) % 4;
			let year = currentYear + Math.floor((currentQuarter + i) / 4);

			// Handle negative quarter value which can arise from calculations
			if (quarter < 0) {
				quarter += 4;
				year -= 1;
			}

			// calculate start and end dates of the quarter
			let quarterStart = new Date(year, quarter * 3, 1);
			let quarterEnd = new Date(year, quarter * 3 + 3, 0);

			quarters.push({
				quarter: `Q${quarter + 1}`,
				year: year,
				start: quarterStart.toISOString().split('T')[0],
				end: quarterEnd.toISOString().split('T')[0],
			});
		}

		return quarters.reverse();
	}

	const quarters = generateFinancialQuarters('2023-04-01');
</script>
