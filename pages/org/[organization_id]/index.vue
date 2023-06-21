<script setup>
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

	import OrgSettings from '@/components/org/settings.vue';
	import OrgMembers from '@/components/org/members/index.vue';
	import OrgBilling from '@/components/org/billing.vue';
	import OrgPayouts from '@/components/org/payouts.vue';

	definePageMeta({ layout: 'clients', middleware: ['auth'] });

	const route = useRoute();

	const supabase = useSupabaseClient();

	const name = ref('test');

	const tabs = [
		{
			name: 'General',
			component: OrgSettings,
		},
		{
			name: 'Team',
			component: OrgMembers,
		},
		{
			name: 'Billing',
			component: OrgBilling,
		},
		{
			name: 'Payouts',
			component: OrgPayouts,
		},
	];

	const getData = async () => {
		let { data: accountData, error: userError } = await supabase
			.from('organizations')
			.select(`name`)
			.eq('id', route.params.organization_id)
			.limit(1)
			.single();

		name.value = accountData.name;
	};

	await getData();
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
						<TabList class="border-scale-400 flex items-center border-b">
							<Tab
								v-slot="{ selected }"
								v-for="tab in tabs"
								:key="tab.name"
								class="space-x-2 focus:outline-none"
							>
								<div
									:class="[
										selected
											? 'border-scale-1200  text-scale-1200 border-b-2'
											: 'text-scale-900',
										' border-scale-1200 relative flex cursor-pointer items-center px-3 py-2 text-center text-sm leading-4 transition focus:outline-none',
									]"
								>
									<span>{{ tab.name }}</span>
								</div></Tab
							>
						</TabList>
					</div>
				</nav>
			</div>
			<TabPanels class="mb-8">
				<TabPanel v-for="tab in tabs" :key="tab"
					><component :is="tab.component"
				/></TabPanel>
			</TabPanels>
		</TabGroup>
	</div>
</template>
