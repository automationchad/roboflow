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

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const showSubmitModal = ref(false);

	const route = useRoute();

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);
	const success_message = ref('Ticket submitted successfully!');

	let { data: userData, error: userError } = await supabase
		.from('User')
		.select('*,Account(*)')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	let hosting = true;

	// if (
	// 	User.Account.type !== 'super_admin' &&
	// 	route.params.organization !== User.Account.id
	// ) {
	// 	navigateTo(`/${User.Account.id}/dashboard`);
	// }

	const account = ref(userData.Account);

	const admin = userData.Account.type === 'super_admin';

	if (userData.Account.type === 'super_admin') {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('*');

		account.value = accountData;
	} else {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('id,type')
			.eq('id', userData.Account.id)
			.limit(1)
			.single();
		account.value = accountData;
	}

	const accounts = ref([]);

	if (userData.Account.type === 'super_admin') {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('id,name,Ticket(*,User(*))');
		accounts.value = accountData;
	} else {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('id,name,Ticket(*,User(*))')
			.eq('id', userData.Account.id);
		accounts.value = accountData;
	}

	const getDealData = async () => {
		let { data: referralTickets, error: ticketError } = await supabase
			.from('Ticket')
			.select('*')
			.eq('accountId', userData.Account.id)
			.eq('type', 'referral');
		return {
			all: referralTickets.filter((o) => o.type === 'referral'),
			closed: referralTickets.filter(
				(o) =>
					![
						'initial_review',
						'requirements_gathering',
						'proposal_submitted',
						'contract_pending',
						'invoice_pending',
					].includes(o.status)
			),
		};
	};

	const referralTickets = ref([]);
	const closedDeals = ref([]);

	const hosting_needed = !hosting;

	const handleError = (msg) => {
		error_message.value = msg;
		is_error.value = true;
	};

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
		is_success.value = true;
		const data = await getDealData();
		referralTickets.value = data.all;
		closedDeals.value = data.closed;
	};

	const data = await getDealData();
	referralTickets.value = data.all;
	closedDeals.value = data.closed;

	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
	});
</script>

<template>
	<div class="px-5 py-4">
		<div class="my-2">
			<div class="flex">
				<Menu as="div"
					><MenuButton
						class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
					>
						<span
							class="font-regular focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-600 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset ring-indigo-500 transition transition-all duration-200 ease-out hover:bg-indigo-500 hover:ring-indigo-300 focus-visible:outline-4 focus-visible:outline-offset-1"
							><span class="truncate">New project</span></span
						></MenuButton
					>

					<MenuItems
						class="fixed left-0 top-0 z-[500] min-w-max"
						style="transform: translate3d(191px, 102px, 0px)"
					>
						<div
							class="bg origin-dropdown data-open:animate-dropdown-content-show data-closed:animate-dropdown-content-hide z-40 w-64 min-w-fit rounded border bg-white py-1.5 shadow-lg"
							style="outline: none; pointer-events: auto"
						>
							<div
								class="text-body-lighter flex items-center space-x-2 px-4 py-1.5 text-xs"
							>
								Choose organization
							</div>
							<MenuItem
								as="div"
								v-slot="{ active }"
								v-for="account in accounts"
								:key="account.id"
							>
								<NuxtLink
									:to="`/dashboard/new/${account.id}`"
									:class="[
										active ? 'bg-gray-100 text-gray-800' : 'text-slate-600',
										'text-body-light focus:bg-selection focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
									]"
								>
									<span>{{ account.name }}</span>
								</NuxtLink>
							</MenuItem>

							<div
								role="separator"
								aria-orientation="horizontal"
								class="my-2 w-full border-t-[1px]"
							></div>
							<MenuItem
								as="div"
								v-slot="{ active }"
								:disabled="!admin"
								class="disabled:opacity-50"
							>
								<button
									:disabled="!admin"
									@click="navigateTo('/dashboard/new')"
									:class="[
										active ? 'bg-gray-100 text-gray-800' : 'text-slate-600',
										'text-body-light focus:text-body group relative flex cursor-pointer disabled:cursor-not-allowed items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none',
									]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<line x1="12" y1="5" x2="12" y2="19"></line>
										<line x1="5" y1="12" x2="19" y2="12"></line></svg
									><span>New organization</span>
								</button>
							</MenuItem>
						</div>
					</MenuItems>
				</Menu>
			</div>
		</div>
		<div class="my-8 space-y-8">
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
						<div class="block shadow-sm">
							<div
								class="rounded-t-md border-x border-t border-slate-200 bg-slate-50 p-2.5 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
							>
								<div class="text-xs font-medium">Deal Summary</div>
							</div>
							<div
								class="rounded-b-md border-x border-b p-4 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
							>
								<div class="mb-2">
									<div class="mb-1.5 text-xs dark:text-slate-400">
										Lifetime revenue
									</div>
									<div class="text-sm text-slate-700 dark:text-slate-200">
										{{
											abbreviatedNumber(
												closedDeals.reduce((a, c) => a + c.deal_size, 0)
											)
										}}
									</div>
								</div>
								<div class="mb-2">
									<div class="mb-1.5 text-xs dark:text-slate-400">
										Number of deals
									</div>
									<div class="text-sm text-slate-700 dark:text-slate-200">
										{{ closedDeals.length }}
									</div>
								</div>
								<div class="mb-2">
									<div class="mb-1.5 text-xs dark:text-slate-400">
										Average deal size
									</div>
									<div class="text-sm text-slate-700 dark:text-slate-200">
										{{
											abbreviatedNumber(
												closedDeals.reduce((a, c) => a + c.deal_size, 0) /
													closedDeals.length || 0
											)
										}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="">
				<div class="">
					<org-deals-quarter
						v-for="quarter in quarters"
						:key="quarter.id"
						:deals="
							referralTickets.filter(
								(o) =>
									new Date(o.createdOn) >= new Date(quarter.start) &&
									new Date(o.createdOn) <= new Date(quarter.end)
							)
						"
						:quarter="quarter"
						@updated="updateDeals"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
