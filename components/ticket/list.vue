<template>
	<div class="">
		<table class="min-w-full divide-y divide-gray-200 dark:divide-slate-600">
			<thead class="bg-slate-50 dark:bg-transparent">
				<tr class="border-b border-slate-400">
					<th
						scope="col"
						class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
					>
						Name
					</th>
					<th
						scope="col"
						class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
					>
						Updated
					</th>
					<th
						scope="col"
						class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-slate-400"
					>
						Type
					</th>

					<!--
                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                            -->
				</tr>
				<tr class="px-6" v-if="tickets.length === 0">
					<th colspan="4" class="py-24 text-sm font-normal text-slate-300">
						No tickets
					</th>
				</tr>
			</thead>

			<tbody
				class="max-h-[100px] divide-y divide-slate-200 overflow-y-scroll bg-slate-50 dark:divide-slate-700 dark:bg-transparent"
			>
				<tr v-for="ticket in tickets.slice(0, 15)" :key="ticket.id">
					<td
						class="flex items-center px-6 py-2 text-sm font-normal text-gray-900 dark:text-white"
					>
						<span
							><a
								class="hover:underline"
								:href="`/${User.defaultTeamId}/tickets/${ticket.id}`"
								>{{ ticket.name }}</a
							></span
						>
					</td>
					<td
						class="px-6 py-2 text-left text-sm text-gray-500 dark:text-slate-200"
					>
						{{
							format(new Date(ticket.updatedOn), 'MMM dd, yyyy') +
							' at ' +
							format(new Date(ticket.updatedOn), 'hh:mm')
						}}
					</td>
					<td
						class="px-6 py-2 text-left text-sm text-gray-500 dark:text-slate-200"
					>
						<span
							:class="[
								styles[ticket.type],
								'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] leading-3 font-medium capitalize ring-1',
							]"
						>
							{{ ticket.type }}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
	} from '@headlessui/vue';
	import {
		MagnifyingGlassIcon,
		QuestionMarkCircleIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	import {
		Bars3Icon,
		BellIcon,
		BugAntIcon,
		ExclamationTriangleIcon,
		CogIcon,
		CreditCardIcon,
		SparklesIcon,
		KeyIcon,
		SquaresPlusIcon,
		UserCircleIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format } from 'date-fns';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	const search_term = ref('');

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
		     id,
			 type,
			 Ticket (
			*
		 ),
			 stripeCustomerId,
			 trayWorkspaceId,
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

	let { data: Ticket, error } = await supabase.from('Ticket').select('*');

	let tickets =
		User.Account.type === 'super_admin'
			? Ticket.sort((a, b) => b['priority'] - a['priority'])
			: User.Account.Ticket;

	const styles = {
		bug: 'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		billing:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		new: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		sales_inquiry:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
	};
</script>
