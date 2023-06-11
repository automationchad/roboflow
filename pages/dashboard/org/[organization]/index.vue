<script setup>
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

	const route = useRoute();

	const supabase = useSupabaseClient();

	const name = ref('');

	const getData = async () => {
		let { data: accountData, error: userError } = await supabase
			.from('Account')
			.select(`name`)
			.eq('id', route.params.organization)
			.limit(1)
			.single();

		name.value = accountData.name;
	};

	await getData();

	const tabs = [
		{
			name: 'General',
		},
		{
			name: 'Team',
		},
		{
			name: 'Billing',
		},
		{
			name: 'Usage',
		},
		{
			name: 'Invoices',
		},
	];

	definePageMeta({ layout: 'settings' });
</script>

<template>
	<div class="flex-1 flex-grow overflow-auto">
		<TabGroup as="div" class="p-4 pt-0">
			<div class="space-y-3">
				<section class="mt-4">
					<h1 class="text-3xl dark:text-white">{{ name }} settings</h1>
				</section>
				<nav>
					<div
						data-orientation="horizontal"
						class="w-full justify-between space-y-4"
					>
						<TabList class="flex items-center border-b border-slate-200 dark:border-white/10">
							<Tab
								v-slot="{ selected }"
								v-for="tab in tabs"
								:key="tab.name"
								class="space-x-2 focus:outline-none"
								>
								<div
									:class="[
										selected
											? 'border-b-2 border-slate-900 dark:border-white text-slate-900 dark:text-white'
											: 'text-slate-500 hover:text-slate-700',
										'text-scale-900 text-scale-1200 border-scale-1200 relative flex cursor-pointer items-center px-3 py-2 text-center text-sm leading-4 transition focus:outline-none',
									]"
								>
									<span>{{ tab.name }}</span>
								</div></Tab
							>
						</TabList>
					</div>
				</nav>
			</div>
			<TabPanels class="mb-8"
				><TabPanel><org-settings /></TabPanel>
				<TabPanel><members /></TabPanel>
				<TabPanel><org-billing /></TabPanel>
				<TabPanel><org-costs /></TabPanel>
				<TabPanel><org-invoices /></TabPanel
			></TabPanels>
		</TabGroup>
	</div>
</template>
