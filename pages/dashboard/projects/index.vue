<template>
	<div class="flex-1 flex-grow overflow-auto">
		<Head>
			<Title>Motis Group | Dashboard</Title>
		</Head>

		<OrgOnboardingOverlay v-if="!User.hasCompletedOnboarding"/>
		<org-deals v-else-if="User.Account.type === 'partner'" />
		<org-clients2 v-else/>

		<ticket-submit
			v-show="showSubmitModal"
			@close-modal="showSubmitModal = false"
			@ticket-submit="updateDeals"
			@ticket-error="handleError"
		/>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<SuccessModal
				v-if="is_success"
				@close="is_success = false"
				:title="success_message"
				:description="''"
			/>
		</transition>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<ErrorModal
				v-if="is_error"
				@close="is_error = false"
				:title="'Error: '"
				:description="error_message"
			/>
		</transition>
	</div>
</template>

<script setup>
	definePageMeta({ layout: 'settings', middleware: ['auth'] });
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

	let { data: User, error: userError } = await supabase
		.from('User')
		.select('*,Account(*,Subscription(*),Ticket(count))')
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

	const account = ref(User.Account);

	if (User.Account.type === 'super_admin') {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('*');

		account.value = accountData;
	} else {
		const { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('id,type')
			.eq('id', User.Account.id)
			.limit(1)
			.single();
		account.value = accountData;
	}

	const getDealData = async () => {
		let { data: referralTickets, error: ticketError } = await supabase
			.from('Ticket')
			.select('*')
			.eq('accountId', User.Account.id)
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

	onMounted(async () => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
		const data = await getDealData();
		referralTickets.value = data.all;
		closedDeals.value = data.closed;
	});
</script>
