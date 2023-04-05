<template>
	<div>
		<BlogPosts :posts="docs" />
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

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const { data: docs } = await supabase.storage
		.from('files')
		.list(`client_files/${route.params.organization}`, {
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});

	// const activeSub =
	// 	User.Account.Subscription[0].status === 'active' &&
	// 	User.Account.Subscription[0].plan.metadata.plan !== 'Free';

	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
	});

	const userNavigation = [
		{ name: 'Your profile', href: '#' },
		{ name: 'Sign out', href: '#' },
	];
</script>
