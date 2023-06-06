<template>
	<div class="">
		<div
			class="mb-8 overflow-hidden rounded border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
		>
			<table class="bg-panel-body-light dark:bg-panel-body-dark w-full">
				<thead class="bg-panel-header-light dark:bg-panel-header-dark">
					<tr class="overflow-hidden rounded">
						<th class="w-1/4 px-6 py-3 text-left">
							<div class="flex items-center space-x-4">
								<div
									class="flex h-8 w-8 items-center justify-center rounded bg-slate-50 dark:bg-slate-800"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="1.5"
											d="M8.25 5.75h-2.5a1 1 0 0 0-1 1v5.5m10.07-3.533c-1.786-1.074-.573-3.263-.573-3.263l-.946-.568a.95.95 0 0 0-1.325.37L6.88 14.448a1.034 1.034 0 0 0 .355 1.381l5.464 3.285a.95.95 0 0 0 1.325-.37l5.096-9.192a1.034 1.034 0 0 0-.355-1.381l-.946-.569s-1.213 2.19-3 1.115Z"
										></path>
									</svg>
								</div>
								<h5 class="mb-0">Tickets</h5>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="ticket in tickets.slice(0, 15)"
						v-if="tickets.length > 0"
						:key="ticket.id"
						class="border-t border-slate-200 hover:bg-white/[2%] dark:border-slate-800"
					>
						<NuxtLink class="h w-full"
							><td
								class="text-scale-1200 w-2/3 whitespace-nowrap px-6 py-3 text-sm"
							>
								<span
									><a
										class="hover:underline"
										:href="`/${route.params.organization}/tickets/${ticket.id}`"
										>{{ ticket.name }}</a
									></span
								>
							</td>
							<td
								class="text-scale-1200 hidden w-1/6 whitespace-nowrap p-3 text-sm lg:table-cell"
							>
								{{
									format(new Date(ticket.updatedOn), 'MMM dd, yyyy') +
									' at ' +
									format(new Date(ticket.updatedOn), 'hh:mm')
								}}
							</td>
							<td class="text-scale-1200 w-1/6 px-6 py-3 text-right text-sm">
								<span
									:class="[
										styles[ticket.type],
										'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize leading-3 ring-1',
									]"
								>
									{{ ticket.type }}
								</span>
							</td></NuxtLink
						>
					</tr>
					<tr class="border-t border-slate-200 dark:border-slate-800" v-else>
						<td
							class="text-scale-1200 w-full whitespace-nowrap px-6 py-3 text-sm"
						>
							No tickets
						</td>
					</tr>
				</tbody>
			</table>
		</div>
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

	const route = useRoute();

	let { data: Account, error: userError } = await supabase
		.from('Account')
		.select(
			`
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
		   `
		)
		.eq('id', route.params.organization)
		.limit(1)
		.single();

	let { data: Ticket, error } = await supabase.from('Ticket').select('*');

	let tickets = Account.type === 'super_admin' ? Ticket : Account.Ticket;

	const styles = {
		referral:
			'bg-pink-100 dark:bg-pink-700 dark:ring-pink-500 ring-pink-300  text-pink-900 dark:text-pink-200',
		bug: 'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		billing:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		new: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		sales_inquiry:
			'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
	};
</script>
