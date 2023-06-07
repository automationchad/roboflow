<template>
	<div>
		<Head>
			<Title>Motis Group | Dashboard</Title>
		</Head>
		<div class="" v-if="Account.type === 'partner'">
			<div
				id="partner-stats"
				class="grid max-w-5xl grid-flow-col grid-cols-5 gap-8"
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
					<div class="flex flex-col space-y-4">
						<button
							@click="showSubmitModal = true"
							class="font-regular focus-visible:outline-brand-600 transition-color relative inline-flex w-full cursor-pointer items-center justify-center space-x-1 rounded border border-indigo-400 bg-indigo-500 px-2.5 py-1 text-center text-sm text-white shadow-sm outline-none outline-0 duration-200 ease-out hover:border-indigo-300 hover:bg-indigo-600 focus-visible:outline-4 focus-visible:outline-offset-1"
							type="button"
						>
							<svg
								class="h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.86413 13.3569C6.50894 13.57 6.39377 14.0307 6.60688 14.3859C6.81999 14.7411 7.28069 14.8562 7.63587 14.6431L6.86413 13.3569ZM13.25 11.75H14C14 11.3358 13.6642 11 13.25 11V11.75ZM13.25 14L13.5854 14.6708C13.8395 14.5438 14 14.2841 14 14H13.25ZM10.4146 14.5792C10.0441 14.7644 9.89394 15.2149 10.0792 15.5854C10.2644 15.9559 10.7149 16.1061 11.0854 15.9208L10.4146 14.5792ZM19.25 14.75L19.7249 15.3305C19.899 15.188 20 14.9749 20 14.75H19.25ZM13.25 12C12.8358 12 12.5 12.3358 12.5 12.75C12.5 13.1642 12.8358 13.5 13.25 13.5V12ZM19.25 12.75H20C20 12.3358 19.6642 12 19.25 12V12.75ZM4.75 12.75V12C4.33579 12 4 12.3358 4 12.75H4.75ZM7.25 12.75H8C8 12.3358 7.66421 12 7.25 12V12.75ZM4.75 19.25H4C4 19.6642 4.33579 20 4.75 20V19.25ZM10.05 12.32L10.4358 12.9631L10.05 12.32ZM7.63587 14.6431L10.4358 12.9631L9.66408 11.6769L6.86413 13.3569L7.63587 14.6431ZM12.1079 12.5H13.25V11H12.1079V12.5ZM12.5 11.75V14H14V11.75H12.5ZM12.9146 13.3292L10.4146 14.5792L11.0854 15.9208L13.5854 14.6708L12.9146 13.3292ZM19.25 14.75C18.7751 14.1695 18.7752 14.1694 18.7753 14.1693C18.7754 14.1693 18.7755 14.1692 18.7755 14.1692C18.7755 14.1692 18.7755 14.1692 18.7754 14.1693C18.7752 14.1695 18.7746 14.1699 18.7737 14.1706C18.7719 14.1721 18.7689 14.1746 18.7645 14.1781C18.7557 14.1851 18.7418 14.1963 18.7227 14.2112C18.6847 14.2411 18.6265 14.2863 18.5493 14.3447C18.3947 14.4613 18.1639 14.6302 17.8658 14.834C17.2691 15.2418 16.4054 15.7874 15.3445 16.333C13.2133 17.4291 10.335 18.5 7.25 18.5V20C10.665 20 13.7867 18.8209 16.0305 17.667C17.1571 17.0876 18.0747 16.5082 18.7123 16.0723C19.0314 15.8542 19.2811 15.6715 19.4527 15.5421C19.5385 15.4773 19.6048 15.4259 19.6505 15.3899C19.6734 15.3719 19.6911 15.3577 19.7036 15.3477C19.7098 15.3427 19.7147 15.3388 19.7183 15.3359C19.72 15.3344 19.7215 15.3333 19.7226 15.3324C19.7232 15.3319 19.7236 15.3315 19.724 15.3312C19.7242 15.3311 19.7244 15.3309 19.7245 15.3308C19.7247 15.3306 19.7249 15.3305 19.25 14.75ZM13.25 13.5H19.25V12H13.25V13.5ZM18.5 12.75V14.75H20V12.75H18.5ZM4.75 13.5H7.25V12H4.75V13.5ZM6.5 12.75V19.25H8V12.75H6.5ZM7.25 18.5H4.75V20H7.25V18.5ZM5.5 19.25V12.75H4V19.25H5.5ZM10.4358 12.9631C10.9409 12.6601 11.5189 12.5 12.1079 12.5V11C11.247 11 10.4023 11.234 9.66408 11.6769L10.4358 12.9631Z"
									fill="currentColor"
								></path>
								<path
									d="M17 4.75V7M17 7V9.25M17 7H19.25M17 7L14.75 7"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								></path>
							</svg>

							<span class="truncate">New referral</span>
						</button>
						<div class="block">
							<div
								class="rounded-t-md bg-slate-800 p-2.5 text-center text-slate-400"
							>
								<div class="text-xs font-medium">Deal Summary</div>
							</div>
							<div class="rounded-b-md bg-slate-900 p-4 text-white">
								<div class="mb-2">
									<div class="mb-1.5 text-xs text-slate-400">
										Lifetime revenue
									</div>
									<div class="text-sm text-slate-200">484.8k</div>
								</div>
								<div class="mb-2">
									<div class="mb-1.5 text-xs text-slate-400">
										Number of deals
									</div>
									<div class="text-sm text-slate-200">20</div>
								</div>
								<div class="mb-2">
									<div class="mb-1.5 text-xs text-slate-400">
										Average deal size
									</div>
									<div class="text-sm text-slate-200">24.2k</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="">
				<div class="">
					<org-deals
						v-for="quarter in quarters"
						:key="quarter"
						:deals="referralTickets"
						:quarter="quarter"
						@updated="updateDeals"
					/>
				</div>
			</div>
		</div>

		<div
			v-else
			id="client-stats"
			class="grid grid-flow-row grid-cols-2 grid-rows-2 gap-8"
			v-if="Account.type !== 'partner'"
		>
			<div
				class="items-center rounded border border-slate-200 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
			>
				<executions-list :period="'30'" v-if="hosting" />
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
				<workflow-health v-if="hosting" />
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
				<workflow-list v-if="hosting" />
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

		<ticket-submit
			v-show="showSubmitModal"
			@close-modal="showSubmitModal = false"
			@ticket-submit="updateDeals"
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
		.select('Account(*,Subscription(*),Ticket(count))')
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

	const referralTickets = ref([]);

	const getDealData = async () => {
		let { data: referralTickets, error: ticketError } = await supabase
			.from('Ticket')
			.select('*')
			.eq('accountId', route.params.organization);
		return referralTickets.filter((o) => o.type === 'referral');
	};

	let hosting =
		User.Account.type === 'super_admin'
			? true
			: User.Account.Subscription.find((o) => o.type === 'hosting');

	const hosting_needed = !hosting;

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

	const updateDeals = async () => {
		referralTickets.value = await getDealData();
	};

	onMounted(async () => {
		referralTickets.value = await getDealData();
		console.log(referralTickets.value);
	});
</script>
