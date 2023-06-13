<template>
	<div class="flex-1 flex-grow overflow-auto">
		<Head>
			<Title>Motis Group | Dashboard</Title>
		</Head>

		<OrgOnboardingOverlay v-if="!userData.hasCompletedOnboarding && !loading" />
		<org-deals v-if="(account.type === 'partner' || account.type === 'super_admin') && !loading" />
		<org-clients v-if="(account.type === 'client' || account.type === 'super_admin')" />

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
	definePageMeta({ layout: 'reports', middleware: ['auth'] });
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

	const loading = ref(true);

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);

	const account = ref({ type: 'client' });

	if (!user.value) {
		navigateTo('/login');
	}

	// Check to see if user has an accountId

	let { data: userData, error: userError } = await supabase
		.from('User')
		.select('*')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	if (userData.accountId === null) {
		navigateTo('/dashboard/new');
	} else {
		// Get account data
		let { data: accountData, error: accountError } = await supabase
			.from('Account')
			.select('*')
			.eq('id', userData.accountId)
			.limit(1)
			.single();

		account.value = accountData;
		loading.value = false;
	}

	onMounted(async () => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
	});
</script>
