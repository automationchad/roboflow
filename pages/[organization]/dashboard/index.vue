<template>
	<div>
		<navbar />

		<div class="lg:pl-72">
			<main class="py-10">
				<div class="px-4 sm:px-6 lg:px-8">
					<workflow-list v-if="hosting && User.Account.trayWorkspaceId" />
					<div
						v-else
						class="items-center text-center text-sm dark:text-slate-400"
					>
						You'll need to select a plan
					</div>
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
	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/');
			}
		});
	});

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 billingEmail,
		 trayWorkspaceId,
		 stripeCustomerId,
		 Subscription(*),
		 Team (
			id,
			name
		 )
	   )`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	let hosting = {};
	hosting = User.Account.Subscription.find((o) => o.type === 'hosting');
	if (!hosting) {
		navigateTo(`/${User.Account.id}/dashboard`);
	}

	const userNavigation = [
		{ name: 'Your profile', href: '/settings' },
		{ name: 'Sign out', href: '#' },
	];
</script>
