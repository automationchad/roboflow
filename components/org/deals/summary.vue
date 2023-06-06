<script setup>
	import { format } from 'date-fns';

	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

	let getStyleClass = (number) => {
		if (number < 10000) {
			return { style: 'bronze', 'row-span': '1' };
		} else if (number < 20000) {
			return { style: 'silver', 'row-span': '1' };
		} else if (number < 50000) {
			return { style: 'gold', 'row-span': '2' };
		} else {
			return { style: 'platinum', 'row-span': '2' };
		}
	};

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: Ticket, error: ticketError } = await supabase
		.from('Ticket')
		.select(
			`*, User(
			id
			),
			Account(
				id
			)`
		)
		.eq('type', 'referral');

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
	Account(
		id
		)`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	let deals = Ticket.filter((o) => o.Account.id === route.params.organization)
		.filter(
			(o) =>
				![
					'proposal_submitted',
					'requirements_gathering',
					'contract_sent',
				].includes(o.status)
		)
		.sort((a, b) => b.deal_size - a.deal_size)
		.slice(0, 6);
</script>

<template>
	<div class="mb-8">
		<TabGroup>
			<TabList class="flex space-x-3">
				<Tab v-slot="{ selected }">
					<h2
						:class="[
							selected ? 'border-b border-indigo-400 font-medium bg-white/5' : '',
							'mb-2 p-4 text-sm text-white rounded-t-md',
						]"
					>
						Top deals
					</h2>
				</Tab>
				<Tab v-slot="{ selected }"
					><h2
						:class="[
							selected ? 'border-b border-indigo-400 font-medium bg-white/5' : '',
							'mb-2 p-4 text-sm text-white rounded-t-md',
						]"
					>
						Graphs
					</h2></Tab
				>
			</TabList>
			<TabPanels
				><TabPanel
					><div class="h-84 grid grid-cols-4 grid-rows-2 gap-4">
						<div
							v-if="deals.length > 0"
							v-for="(deal, idx) in deals"
							:key="deal.name"
							:class="[
								getStyleClass(deal.deal_size).style,
								idx < 2 ? 'row-span-2' : `row-span-1`,
								'h-full rounded border border-white/10',
							]"
						>
							<NuxtLink
								class="flex h-full flex-col justify-between p-1"
								:to="`/${route.params.organization}/tickets/${deal.id}`"
								><div
									:class="[
										getStyleClass(deal.deal_size).style + '-month',
										'flex justify-end px-2 py-2 text-xs',
									]"
								>
									{{ format(new Date(deal.close_date), 'MMM') }}
								</div>
								<div class="flex flex-1 flex-col justify-center p-2">
									<h2
										:class="[
											getStyleClass(deal.deal_size).style + '-text',
											'text-3xl font-semibold ',
										]"
									>
										{{ abbreviatedNumber(deal.deal_size) }}
									</h2>
									<p
										:class="[
											getStyleClass(deal.deal_size).style + '-month',
											'text-xs',
										]"
									>
										{{ deal.name }}
									</p>
								</div>
								<div class="">
									<div
										:class="[
											getStyleClass(deal.deal_size).style + '-border',
											'border-t',
										]"
									></div>
									<div
										:class="[
											getStyleClass(deal.deal_size).style + '-button',
											'mt-3 rounded-sm p-2 text-xs text-white',
										]"
									>
										Add deal story
									</div>
								</div>
							</NuxtLink>
						</div>
						<div
							v-else
							class="col-span-4 row-span-2 h-full rounded border border-white/10"
						>
							<div class="flex h-full flex-col justify-between p-1">
								<div class="flex flex-1 flex-col justify-center p-2">
									<h2 :class="['text-3xl font-semibold text-white']">
										No deals
									</h2>
									<p :class="['text-xs']">Test</p>
								</div>
							</div>
						</div>
					</div></TabPanel
				><TabPanel>Test</TabPanel></TabPanels
			>
		</TabGroup>

		<div class=""></div>
	</div>
</template>

<style scoped>
	.platinum {
		color: white;
		background: conic-gradient(
			from 171.52deg at 50% 50%,
			#f0f1f6 0deg,
			#a0b9cc 90deg,
			#dde5f0 180deg,
			#c5e6f9 234.26deg,
			#a7b5bb 270deg,
			#ecf1f4 1turn
		);
	}

	.platinum-text {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
			conic-gradient(
				from 171.52deg at 50% 50%,
				#f0f1f6 0deg,
				#a0b9cc 90deg,
				#dde5f0 180deg,
				#c5e6f9 234.26deg,
				#a7b5bb 270deg,
				#ecf1f4 1turn
			);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.platinum-month {
		color: #434343;
	}

	.platinum-border {
		border-top: 1px solid hsla(0, 0%, 63.9%, 0.5);
		box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.25);
	}

	.platinum-button {
		background-color: rgba(59, 96, 118, 0.4);
	}

	.gold {
		background: conic-gradient(
			from 171.52deg at 50% 50%,
			#ecd9b0 0deg,
			#d3bd94 28.18deg,
			#e3bc69 90deg,
			#f5ebc8 204.51deg,
			#dfb969 240.9deg,
			#e4bb56 270deg,
			#ecd9b0 1turn
		);
	}

	.gold-text {
		background: linear-gradient(
				0deg,
				rgba(160, 116, 4, 0.3),
				rgba(160, 116, 4, 0.3)
			),
			conic-gradient(
				from 171.52deg at 50% 50%,
				#f0c260 0deg,
				#ba985a 28.18deg,
				#ba9a53 90deg,
				#efdfa6 204.51deg,
				#d8ac4f 240.9deg,
				#dfb03e 270deg,
				#f0c260 1turn
			);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.gold-month {
		color: #654527;
	}

	.gold-button {
		background-color: rgba(165, 112, 33, 0.44);
	}

	.gold-border {
		border-top: 1px solid rgba(206, 171, 70, 0.5);
		box-shadow: 0 1px 0 rgba(253, 221, 58, 0.43);
	}

	.silver {
		background: conic-gradient(
			from 171.52deg at 50% 50%,
			#f2f4f3 0deg,
			#bfc1c4 90deg,
			#dadcde 180deg,
			#c5c5cb 234.26deg,
			#bcbebf 270deg,
			#ecf1f4 1turn
		);
	}

	.silver-text {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
			conic-gradient(
				from 171.52deg at 50% 50%,
				#f2f4f3 0deg,
				#bfc1c4 90deg,
				#dadcde 180deg,
				#c5c5cb 234.26deg,
				#bcbebf 270deg,
				#ecf1f4 1turn
			);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.silver-month {
		color: #000;
	}

	.silver-border {
		border-top: 1px solid hsla(0, 0%, 63.9%, 0.5);
		box-shadow: 0 1px 0 hsla(0, 0%, 100%, 0.25);
	}

	.silver-button {
		background-color: rgba(0, 0, 0, 0.2);
	}

	.bronze {
		background: conic-gradient(
			from 171.52deg at 50% 50%,
			#e7cfb5 0deg,
			#d3b394 28.18deg,
			#dba872 90deg,
			#f5e4c8 204.51deg,
			#d6a672 240.9deg,
			#dba35f 270deg,
			#e7cfb5 1turn
		);
	}

	.bronze-text {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
			conic-gradient(
				from 171.52deg at 50% 50%,
				#e7cfb5 0deg,
				#d3b394 28.18deg,
				#dba872 90deg,
				#f5e4c8 204.51deg,
				#d6a672 240.9deg,
				#dba35f 270deg,
				#e7cfb5 1turn
			);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.bronze-month {
		color: #654527;
	}

	.bronze-border {
		border-top: 1px solid rgba(206, 119, 70, 0.19);
		box-shadow: 0 1px 0 rgba(255, 241, 170, 0.25);
	}
	.bronze-button {
		background-color: rgba(165, 88, 33, 0.3);
	}
</style>
