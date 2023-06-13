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

	import { format } from 'date-fns';

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
		for (let i = -1; i <= 0; i++) {
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

	const quarters = generateFinancialQuarters(format(new Date(), 'yyyy-MM-dd'));

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
				<Menu as="div" class="relative"
					><MenuButton
						class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
					>
						<span
							class="font-regular focus-visible:outline-brand-600 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 ring-1 ring-inset transition transition-all duration-200 ease-out hover:bg-indigo-400 focus-visible:outline-4 focus-visible:outline-offset-1"
							><span class="truncate">New project</span></span
						></MenuButton
					>

					<MenuItems
						class="absolute inset-x-0 top-8 z-[500] min-w-max"
						style=""
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
										'text-body-light w-full focus:text-body group relative flex cursor-pointer items-center space-x-2 border-none px-4 py-1.5 text-sm focus:outline-none disabled:cursor-not-allowed',
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
				<org-deals-summary class="col-span-5" />
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

<style scoped>
	.bordershadow-scale-600 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #dfe3e6 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-1000 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #7375ed 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-900 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #e59fe9 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>
