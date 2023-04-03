<template>
	<div>
		<navbar />

		<div class="lg:pl-72">
			<main class="py-10">
				<div class="px-4 sm:px-6 lg:px-8">
					<!-- Your content -->
					<requests />
					<!-- <locked-content v-else /> -->
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
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select('*,Account(id,stripeCustomerId,Subscription(*),Team(id,name))')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	console.log(User);

	const activeSub =
		User.Account.Subscription.find((o) => o.type === 'retainer').tier !==
		'free';

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
