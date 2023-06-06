<template>
	<Combobox
		as="div"
		v-model="selectedPerson"
		class="group w-full"
		:disabled="!props.enabled"
	>
		<div class="relative">
			<ComboboxInput
				:disabled="!props.enabled"
				class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 group-disabled:opacity-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 sm:text-sm sm:leading-6"
				@change="query = $event.target.value"
				:display-value="(person) => person?.name"
			/>
			<ComboboxButton
				class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
			>
				<ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
			</ComboboxButton>

			<ComboboxOptions
				v-if="filteredPeople.length > 0"
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900 dark:ring-white/20 sm:text-sm"
			>
				<ComboboxOption
					@click="handleTicketEdit(person.id)"
					v-for="person in filteredPeople"
					:key="person.id"
					:value="person"
					as="template"
					v-slot="{ active, selected }"
				>
					<li
						:class="[
							'relative cursor-default select-none py-2 pl-8 pr-4',
							active
								? 'bg-indigo-600 text-white dark:text-white'
								: 'text-gray-900 dark:text-slate-300',
						]"
					>
						<span :class="['block truncate', selected && 'font-semibold']">
							{{ person.name }}
						</span>

						<span
							v-if="selected"
							:class="[
								'absolute inset-y-0 left-0 flex items-center pl-1.5',
								active ? 'text-white dark:text-white' : 'text-indigo-600',
							]"
						>
							<CheckIcon class="h-5 w-5" aria-hidden="true" />
						</span>
					</li>
				</ComboboxOption>
			</ComboboxOptions>
		</div>
	</Combobox>
</template>

<script setup>
	import { computed, ref } from 'vue';
	import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
	import {
		Combobox,
		ComboboxButton,
		ComboboxInput,
		ComboboxLabel,
		ComboboxOption,
		ComboboxOptions,
	} from '@headlessui/vue';

	const supabase = useSupabaseClient();

	const route = useRoute();

	const handleTicketEdit = async (status) => {
		const { data, error } = await supabase
			.from('Ticket')
			.update({ status })
			.eq('id', route.params.id);
	};

	const people = [
		{ id: 'proposal_submitted', name: 'Proposal Submitted' },
		{ id: 'requirements_gathering', name: 'Requirements Gathering' },
		{ id: 'contract_sent', name: 'Contract Sent' },
		{ id: 'invoice_paid', name: 'Invoice Paid' },
		{ id: 'solution_design', name: 'Solution Design' },
		{ id: 'in_development', name: 'In Development' },
		{ id: 'unit_testing', name: 'Unit Testing' },
		{ id: 'integration_testing', name: 'Integration Testing' },
		{ id: 'user_acceptance_testing', name: 'User Acceptance Testing' },
		{ id: 'bug_fixing', name: 'Bug Fixing' },
		{ id: 'deployment_preparation', name: 'Deployment Preparation' },
		{ id: 'in_deployment', name: 'In Deployment' },
		{ id: 'post_deployment_review', name: 'Post Deployment Review' },
		{ id: 'maintenance_mode', name: 'Maintenance Mode' },
		{ id: 'upgrades_and_enhancements', name: 'Upgrades and Enhancements' },
		{ id: 'project_on_hold', name: 'Project On Hold' },
		{ id: 'project_cancelled', name: 'Project Cancelled' },
		{ id: 'project_completed', name: 'Project Completed' },
	];

	const props = defineProps({
		status: {
			type: String,
			default: 'project_on_hold',
		},
		enabled: {
			type: Boolean,
			default: true,
		},
	});

	const query = ref('');
	const selectedPerson = ref(people.find((o) => o.id === props.status));
	const filteredPeople = computed(() =>
		query.value === ''
			? people
			: people.filter((person) => {
					return person.name.toLowerCase().includes(query.value.toLowerCase());
			  })
	);
</script>
