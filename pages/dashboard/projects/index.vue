<template>
	<div class="flex-1 flex-grow overflow-auto">
		<Head>
			<Title>Motis Group | Dashboard</Title>
		</Head>
		<!-- <org-deals /> -->
		<org-clients />

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
	import { is } from 'date-fns/locale';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const showSubmitModal = ref(false);

	const loading = ref(true);

	const is_error = ref(false);
	const error_message = ref('');
	const is_success = ref(false);

	const user_data = ref({});

	const account = ref({ type: 'client' });

	// Check to see if user has an accountId

	// const getData = async () => {
	// 	try {
	// 		let { data: userData, error: userError } = await supabase
	// 			.from('users')
	// 			.select('*');

	// 		if (userError) throw new Error(userError.message);

	// 		user_data.value = userData;

	// 		} else {
	// 			// Get account data
	// 			let { data: accountData, error: accountError } = await supabase
	// 				.from('organizations')
	// 				.select('id,name');

	// 			console.log(accountData);

	// 			if (accountError) throw new Error(accountError.message);

	// 			account.value = accountData;
	// 		}

	// 		// loading.value = false;
	// 	} catch (error) {
	// 		is_error.value = true;
	// 		error_message.value = error.message;
	// 		console.log(error);
	// 	}
	// };

	// await getData();

	watch(() => {
		if (!user.value) {
			navigateTo('/');
		}
	});
</script>
