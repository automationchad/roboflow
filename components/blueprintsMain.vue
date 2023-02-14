<template>
	<div>
		<section class="mt-32 w-full overflow-hidden">
			<div class="max-w-container sm:px-46 mx-auto px-48 lg:px-48">
				<div class="max-w-2xl">
					<h2 class="text-base font-semibold leading-7 text-sky-500">
						Blueprints
					</h2>
					<p class="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
						Production-ready integration blueprints, built the way you want
						them.
					</p>
				</div>
				<div class="max-w-xl">
					<p class="mt-4 text-base leading-7 text-slate-700">
						Easy to customize integration libraries built with Tray.io. The
						perfect starting point for your next project and the ultimate
						resource for learning how experts build real integrations with
						Tray.io.
					</p>
				</div>
				<div class="mt-6">
					<a
						class="text-base font-semibold text-sky-500 hover:text-slate-700"
						href="/blueprints"
						>Explore all blueprints <span aria-hidden="true">→</span></a
					>
				</div>
				<TabGroup as="div"
					><div class="-mx-4 mt-16 flex overflow-x-auto sm:-mx-6 lg:block">
						<div class="min-w-full flex-none px-4 sm:px-6">
							<TabList
								as="div"
								class="flex space-x-10 border-t border-slate-200 md:space-x-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
							>
								<Tab
									v-slot="{ selected }"
									as="div"
									v-for="blueprint in blueprints.slice(0,4)"
									:key="blueprint.id"
									class="focus:outline-none"
								>
									<div
										:class="[
											selected ? 'border-indigo-400' : 'border-transparent',
											'group relative -mt-px flex flex-none flex-col items-start border-t  pt-4 pb-6 text-left hover:border-slate-400 focus:outline-none md:w-[35vw] md:pb-16 md:pt-8 lg:w-auto',
										]"
									>
										<div class="md:mt-4">
											<div
												:class="[
													selected
														? 'text-indigo-600'
														: 'text-slate-900 md:text-slate-900',
													'cursor-pointer text-base font-semibold leading-7 ',
												]"
											>
												<span class="absolute inset-0 -top-px"></span
												>{{ blueprint.name }}
											</div>
										</div>
										<p
											class="text-sm capitalize leading-6 text-slate-600 md:order-first md:rounded-full md:bg-slate-100 md:px-2 md:text-xs md:font-semibold md:leading-7 md:text-slate-500 md:group-hover:bg-slate-200"
										>
											{{ blueprint.category }}
										</p>
										<p
											class="mt-2 hidden text-sm leading-6 text-slate-700 md:block"
										>
											{{ blueprint.summary }}
										</p>
									</div>
								</Tab>
							</TabList>
						</div>
					</div>

					<TabPanels class="-mx-4 flex transition-transform duration-500">
						<TabPanel
							v-for="blueprint in blueprints.slice(0,4)"
							:key="blueprint.id"
							class="w-full flex-none sm:px-4"
						>
							<p
								class="px-4 text-sm leading-6 text-slate-700 sm:px-0 md:hidden"
							>
								We’ve actually published four info products ourselves and this
								landing page is honestly better than the sites we designed for
								all of those.
							</p>

							<img
								:src="
									blueprint.images[0]?.url ??
									'https://nsfipxnlucvgchlkqvqw.supabase.co/storage/v1/object/public/images/blueprints/1/187shots_so.png'
								"
								alt="453"
								class="mt-10 aspect-[1216/640] w-full object-cover sm:rounded-3xl md:mt-0"
							/>
						</TabPanel> </TabPanels
				></TabGroup>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
	let { data: blueprints } = await useFetch(`/api/blueprints`);
	blueprints = blueprints.value.data;
</script>
