<script setup>
	import Airtable from 'airtable';

	const base = new Airtable({ apiKey: 'keyBl2UOzLvshshLp' }).base(
		'appkU7PnQUq7lePwf'
	);
	let requests = [];

	const table = base('sprints');

	const getSprints = async () => {
		const records = await table
			.select({
				view: 'viwjRdvlzpCwm0OuK',
				sort: [{ field: 'est_finish_date', direction: 'asc' }],
			})
			.firstPage();
		requests = records.map((o) => {
			return { uuid: o.id, fields: o.fields };
		});
	};

	await getSprints();
</script>

<template>
	<main class="m-0 w-full bg-white p-0 dark:bg-[#0A101E]">
		<div class="">
			<div class="relative back">
				
				<div class="sm:px-46 mx-auto space-y-4 px-48 py-36 lg:px-48">
					<div class="space-y-4">
						<!-- <div class="relative flex">
							<div
								class="badge rounded-full bg-blue-500/30 px-3 py-0.5 text-black shadow-md"
							>
								<div class="text text-xs font-semibold">
									Tray.io® Platinum Partner
								</div>
							</div>
						</div> -->
						<div class="relative space-y-2">
							<p class="text-7xl font-bold dark:text-white">
								AutomationOps,
							</p>
							<p class="text-7xl font-bold dark:text-white">as-a-service.</p>
						</div>
						<div
							class="relative flex h-auto max-w-2xl flex-shrink-0 flex-col justify-start text-left"
						>
							<p
								class="m-0 p-0 text-left text-lg font-normal tracking-normal dark:text-sky-50"
							>
								Integrate data across your software stack and enhance the power
								of your software using Motis Group's pre-built integrations and
								custom software development team.
							</p>
						</div>

						<div
							class="relative col-start-1 row-start-4 mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
						>
							<!-- <a
								class="inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-sm font-semibold text-white hover:bg-slate-700"
								href="/blueprints"
								><span
									>Explore blueprints
									<span aria-hidden="true" class="hidden sm:inline"
										>→</span
									></span
								></a
							> -->
							<ButtonGroup :requests="requests" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<Logos />
		<!-- <Testimonials /> -->
		<!-- <TemplatesMain />
		<BlueprintsMain /> -->
		<!-- <FooterContent /> -->
	</main>
</template>

<script>
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
	} from '@headlessui/vue';

	export default {
		components: { Disclosure, DisclosureButton, DisclosurePanel },
		data() {
			return {
				customers: this.data,
			};
		},
		computed: {
			spotsLeft() {
				const maxClients = 10;
				const clients = maxClients - (this.customers.length ?? 0);
				return Math.floor(clients);
			},
		},
	};
</script>

<style scoped>
	.back {
		background-color: hsla(0, 100%, 50%, 1);
		background-image: radial-gradient(
				at 40% 20%,
				hsla(28, 100%, 74%, 1) 0px,
				transparent 50%
			),
			radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%),
			radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%),
			radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%);
	}
	.text {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
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
	.badge {
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
</style>
