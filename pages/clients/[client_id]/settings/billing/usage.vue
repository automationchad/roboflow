<script setup>
	import { onMounted, ref } from 'vue';
	definePageMeta({ layout: 'client-settings' });

	import { throttle } from 'lodash';

	let activeSection = ref('infrastructure');

	const sections = ref([
		{
			id: 'infrastructure',
			title: 'Infrastructure',
			content: 'Content of Infrastructure',
		},
		{ id: 'bandwidth', title: 'Bandwidth', content: 'Content of Bandwidth' },
		{
			id: 'size_and_counts',
			title: 'Size & Counts',
			content: 'Content of Size and Counts',
		},
		{ id: 'activity', title: 'Activity', content: 'Content of Activity' },
	]);

	let mainDiv;

	const scrolling = () => {
		console.log('Scroll Event detected');
	};

	const scrollTo = (id) => {
		let element = document.getElementById(id);
		element.scrollIntoView({ behavior: 'smooth' });
	};

	const handleScroll = throttle(() => {
		let index = 0;
		const header = document.getElementById('header');
		const headerHeight = header.offsetHeight * 1.9;

		for (let i = 0; i < sections.value.length; i++) {
			const section = document.getElementById(sections.value[i].id);
			const rect = section.getBoundingClientRect();
			const adjustedTop = rect.top - headerHeight;

			if (adjustedTop <= 0) {
				index = i;
			} else {
				break;
			}
		}

		activeSection.value = sections.value[index].id;
	}, 200);
</script>

<template>
	<main
		class="flex-1 overflow-y-auto"
		@scroll="handleScroll()"
		style="max-height: 100vh"
	>
		<div>
			<div
				class="1xl:px-28 mx-auto flex flex-col space-y-4 px-5 pt-6 lg:px-16 2xl:px-32"
			>
				<h3 class="text-scale-1200 text-xl">Usage</h3>
			</div>
		</div>
		<div>
			<div
				id="header"
				class="bg-scale-200 border-scale-400 sticky top-0 z-10 border-b"
			>
				<div
					class="1xl:px-28 mx-auto flex flex-col gap-2 px-5 lg:px-16 2xl:px-32"
				>
					<div class="mt-4 flex items-center justify-between">
						<div class="flex items-center space-x-4">
							<button
								type="button"
								id="radix-164"
								aria-haspopup="menu"
								aria-expanded="false"
								data-state="closed"
								class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
							>
								<span
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									><span class="truncate">Current billing cycle</span
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="6 9 12 15 18 9"></polyline></svg
								></span>
							</button>
							<div class="flex flex-col xl:flex-row xl:gap-3">
								<p class="text-sm transition">Project is on Free plan</p>
								<p class="text-scale-1000 text-sm">27 May 2023 - 27 Jun 2023</p>
							</div>
						</div>
					</div>
					<div class="flex gap-6">
						<button
							@click="scrollTo('infrastructure')"
							:class="[
								activeSection === 'infrastructure'
									? 'border-scale-1200 text-scale-1200 border-b'
									: 'opacity-50',
								'flex cursor-pointer items-center space-x-2 py-3 transition hover:opacity-100',
							]"
						>
							<p class="text-sm">Infrastructure</p></button
						><button
							@click="scrollTo('bandwidth')"
							:class="[
								activeSection === 'bandwidth'
									? 'border-scale-1200 text-scale-1200 border-b'
									: 'opacity-50',
								'flex cursor-pointer items-center space-x-2 py-3 transition hover:opacity-100',
							]"
						>
							<p class="text-sm">Bandwidth</p></button
						><button
							@click="scrollTo('size_and_counts')"
							role="tab"
							:class="[
								activeSection === 'size_and_counts'
									? 'border-scale-1200 text-scale-1200 border-b'
									: 'opacity-50',
								'flex cursor-pointer items-center space-x-2 py-3 transition hover:opacity-100',
							]"
						>
							<p class="text-sm">Size &amp; Counts</p></button
						><button
							@click="scrollTo('activity')"
							role="tab"
							:class="[
								activeSection == 'activity'
									? 'border-scale-1200 text-scale-1200 border-b'
									: 'opacity-50',
								'flex cursor-pointer items-center space-x-2 py-3 transition hover:opacity-100',
							]"
						>
							<p class="text-sm">Activity</p>
						</button>
					</div>
				</div>
			</div>
			<div>
				<div id="infrastructure" style="scroll-margin-top: 100px">
					<div class="border-scale-400 border-b">
						<div
							class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
						>
							<div>
								<p class="text-xl">Infrastructure</p>
								<p class="text-scale-1000 text-sm">
									Usage statistics related to your server instance
								</p>
							</div>
						</div>
					</div>
					<div id="cpu">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">CPU</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														CPU usage of your server
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/compute-add-ons"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Compute Add-Ons</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/exhaust-cpu"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">High CPU Usage</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/metrics"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Metrics</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-1">
											<div class="flex flex-row justify-between">
												<p>Max <span class="">CPU</span> utilization per day</p>
											</div>
											<p class="text-scale-1000 text-sm">
												Your compute instance has 2 CPU cores.
											</p>
											<p class="text-scale-1000 text-sm"></p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts82-clip">
																<rect
																	x="50"
																	y="0"
																	height="170"
																	width="315"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="127.5"
																	x2="365"
																	y2="127.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="85"
																	x2="365"
																	y2="85"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="42.5"
																	x2="365"
																	y2="42.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="315"
																height="30"
																x="50"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="50"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="70.54347826086956"
																		y1="176"
																		x2="70.54347826086956"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="70.54347826086956"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="70.54347826086956" dy="0.71em">
																			28 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="125.32608695652173"
																		y1="176"
																		x2="125.32608695652173"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="125.32608695652173"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="125.32608695652173" dy="0.71em">
																			01 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="166.41304347826087"
																		y1="176"
																		x2="166.41304347826087"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="166.41304347826087"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="166.41304347826087" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="221.19565217391303"
																		y1="176"
																		x2="221.19565217391303"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="221.19565217391303"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="221.19565217391303" dy="0.71em">
																			08 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="262.2826086956522"
																		y1="176"
																		x2="262.2826086956522"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="262.2826086956522"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="262.2826086956522" dy="0.71em">
																			11 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="303.36956521739125"
																		y1="176"
																		x2="303.36956521739125"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="303.36956521739125"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="303.36956521739125" dy="0.71em">
																			14 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="358.15217391304344"
																		y1="176"
																		x2="358.15217391304344"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="348.046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.046875" dy="0.71em">
																			18 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="170"
																		x2="50"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">0%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="127.5"
																		x2="50"
																		y2="127.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="127.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">25%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="85"
																		x2="50"
																		y2="85"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="85"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">50%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="42.5"
																		x2="50"
																		y2="42.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="42.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">75%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="0"
																		x2="50"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">100%</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.8243917824062521"
																			x="51.369565217391305"
																			y="169.17560821759375"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 51.369565217391305,169.17560821759375 h 10 v 0.8243917824062521 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.8243327546298076"
																			x="65.06521739130434"
																			y="169.1756672453702"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 65.06521739130434,169.1756672453702 h 10 v 0.8243327546298076 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.8208107638889715"
																			x="78.76086956521739"
																			y="169.17918923611103"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 78.76086956521739,169.17918923611103 h 10 v 0.8208107638889715 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.7463865740737958"
																			x="92.45652173913042"
																			y="169.2536134259262"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 92.45652173913042,169.2536134259262 h 10 v 0.7463865740737958 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.7649311342586032"
																			x="106.15217391304347"
																			y="169.2350688657414"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 106.15217391304347,169.2350688657414 h 10 v 0.7649311342586032 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.7993344907425808"
																			x="119.84782608695652"
																			y="169.20066550925742"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 119.84782608695652,169.20066550925742 h 10 v 0.7993344907425808 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.7772679398132709"
																			x="133.54347826086956"
																			y="169.22273206018673"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 133.54347826086956,169.22273206018673 h 10 v 0.7772679398132709 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.1202586805564465"
																			x="147.23913043478262"
																			y="168.87974131944355"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 147.23913043478262,168.87974131944355 h 10 v 1.1202586805564465 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.9447297453694716"
																			x="160.93478260869566"
																			y="169.05527025463053"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 160.93478260869566,169.05527025463053 h 10 v 0.9447297453694716 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.0208559027795445"
																			x="174.6304347826087"
																			y="168.97914409722046"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 174.6304347826087,168.97914409722046 h 10 v 1.0208559027795445 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.11429687499853"
																			x="188.32608695652175"
																			y="168.88570312500147"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 188.32608695652175,168.88570312500147 h 10 v 1.11429687499853 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.1325758101837948"
																			x="202.02173913043478"
																			y="168.8674241898162"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 202.02173913043478,168.8674241898162 h 10 v 1.1325758101837948 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="0.9545677083360999"
																			x="215.7173913043478"
																			y="169.0454322916639"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 215.7173913043478,169.0454322916639 h 10 v 0.9545677083360999 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.0082928240744309"
																			x="229.41304347826087"
																			y="168.99170717592557"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 229.41304347826087,168.99170717592557 h 10 v 1.0082928240744309 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.0654415509261241"
																			x="243.1086956521739"
																			y="168.93455844907388"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 243.1086956521739,168.93455844907388 h 10 v 1.0654415509261241 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.0129461805545361"
																			x="256.80434782608694"
																			y="168.98705381944546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 256.80434782608694,168.98705381944546 h 10 v 1.0129461805545361 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.2369467592576768"
																			x="270.5"
																			y="168.76305324074232"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 270.5,168.76305324074232 h 10 v 1.2369467592576768 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.1081579861112516"
																			x="284.19565217391306"
																			y="168.89184201388875"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 284.19565217391306,168.89184201388875 h 10 v 1.1081579861112516 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.134228587963122"
																			x="297.89130434782606"
																			y="168.86577141203688"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 297.89130434782606,168.86577141203688 h 10 v 1.134228587963122 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.0345109953711074"
																			x="311.5869565217391"
																			y="168.9654890046289"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 311.5869565217391,168.9654890046289 h 10 v 1.0345109953711074 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.0230005787033178"
																			x="325.2826086956522"
																			y="168.97699942129668"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 325.2826086956522,168.97699942129668 h 10 v 1.0230005787033178 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.1936105324087976"
																			x="338.9782608695652"
																			y="168.8063894675912"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.9782608695652,168.8063894675912 h 10 v 1.1936105324087976 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.1544230769221429"
																			x="352.67391304347825"
																			y="168.84557692307786"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 352.67391304347825,168.84557692307786 h 10 v 1.1544230769221429 h -10 Z"
																		></path>
																	</g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="ram">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">Memory</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Memory usage of your server.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														You might observe elevated memory usage, even with
														little to no load. Besides Postgres, a wide range of
														services is running under the hood resulting in an
														elevated base memory usage.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/compute-add-ons"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Compute Add-Ons</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/metrics"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Metrics</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-1">
											<div class="flex flex-row justify-between">
												<p>
													Max <span class="lowercase">Memory</span> utilization
													per day
												</p>
											</div>
											<div class="text-scale-1000 text-sm">
												<p>Your compute instance has 1 GB of memory.</p>
												<p>
													As your project is running on the smallest compute
													instance, it is not unusual for your project to have a
													base memory usage of ~50%.
												</p>
											</div>
											<p class="text-scale-1000 text-sm"></p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts85-clip">
																<rect
																	x="50"
																	y="0"
																	height="170"
																	width="315"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="127.5"
																	x2="365"
																	y2="127.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="85"
																	x2="365"
																	y2="85"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="42.5"
																	x2="365"
																	y2="42.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="315"
																height="30"
																x="50"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="50"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="70.54347826086956"
																		y1="176"
																		x2="70.54347826086956"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="70.54347826086956"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="70.54347826086956" dy="0.71em">
																			28 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="125.32608695652173"
																		y1="176"
																		x2="125.32608695652173"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="125.32608695652173"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="125.32608695652173" dy="0.71em">
																			01 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="166.41304347826087"
																		y1="176"
																		x2="166.41304347826087"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="166.41304347826087"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="166.41304347826087" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="221.19565217391303"
																		y1="176"
																		x2="221.19565217391303"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="221.19565217391303"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="221.19565217391303" dy="0.71em">
																			08 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="262.2826086956522"
																		y1="176"
																		x2="262.2826086956522"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="262.2826086956522"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="262.2826086956522" dy="0.71em">
																			11 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="303.36956521739125"
																		y1="176"
																		x2="303.36956521739125"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="303.36956521739125"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="303.36956521739125" dy="0.71em">
																			14 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="358.15217391304344"
																		y1="176"
																		x2="358.15217391304344"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="348.046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.046875" dy="0.71em">
																			18 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="170"
																		x2="50"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">0%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="127.5"
																		x2="50"
																		y2="127.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="127.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">25%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="85"
																		x2="50"
																		y2="85"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="85"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">50%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="42.5"
																		x2="50"
																		y2="42.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="42.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">75%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="0"
																		x2="50"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">100%</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="87.99696574169818"
																			x="51.369565217391305"
																			y="82.00303425830182"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 51.369565217391305,82.00303425830182 h 10 v 87.99696574169818 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="87.85360127472751"
																			x="65.06521739130434"
																			y="82.14639872527249"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 65.06521739130434,82.14639872527249 h 10 v 87.85360127472751 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="65.8820961809028"
																			x="78.76086956521739"
																			y="104.1179038190972"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 78.76086956521739,104.1179038190972 h 10 v 65.8820961809028 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="70.14772939162273"
																			x="92.45652173913042"
																			y="99.85227060837727"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 92.45652173913042,99.85227060837727 h 10 v 70.14772939162273 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="74.64678012645568"
																			x="106.15217391304347"
																			y="95.35321987354432"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 106.15217391304347,95.35321987354432 h 10 v 74.64678012645568 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="76.20361737833302"
																			x="119.84782608695652"
																			y="93.79638262166698"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 119.84782608695652,93.79638262166698 h 10 v 76.20361737833302 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="76.03431763090535"
																			x="133.54347826086956"
																			y="93.96568236909465"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 133.54347826086956,93.96568236909465 h 10 v 76.03431763090535 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="106.66100215279778"
																			x="147.23913043478262"
																			y="63.33899784720222"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 147.23913043478262,63.33899784720222 h 10 v 106.66100215279778 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="113.32636923024766"
																			x="160.93478260869566"
																			y="56.673630769752336"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 160.93478260869566,56.673630769752336 h 10 v 113.32636923024766 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="118.62076856576205"
																			x="174.6304347826087"
																			y="51.37923143423795"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 174.6304347826087,51.37923143423795 h 10 v 118.62076856576205 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="117.32184326954045"
																			x="188.32608695652175"
																			y="52.67815673045955"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 188.32608695652175,52.67815673045955 h 10 v 117.32184326954045 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="105.72156866068856"
																			x="202.02173913043478"
																			y="64.27843133931144"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 202.02173913043478,64.27843133931144 h 10 v 105.72156866068856 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="112.19098028579663"
																			x="215.7173913043478"
																			y="57.80901971420337"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 215.7173913043478,57.80901971420337 h 10 v 112.19098028579663 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="108.59750309358736"
																			x="229.41304347826087"
																			y="61.40249690641264"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 229.41304347826087,61.40249690641264 h 10 v 108.59750309358736 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="113.06413472784907"
																			x="243.1086956521739"
																			y="56.935865272150934"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 243.1086956521739,56.935865272150934 h 10 v 113.06413472784907 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="109.50811960741106"
																			x="256.80434782608694"
																			y="60.49188039258894"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 256.80434782608694,60.49188039258894 h 10 v 109.50811960741106 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="113.48918515756105"
																			x="270.5"
																			y="56.51081484243894"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 270.5,56.51081484243894 h 10 v 113.48918515756105 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="109.96558913769431"
																			x="284.19565217391306"
																			y="60.03441086230569"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 284.19565217391306,60.03441086230569 h 10 v 109.96558913769431 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="109.09243469564183"
																			x="297.89130434782606"
																			y="60.907565304358165"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 297.89130434782606,60.907565304358165 h 10 v 109.09243469564183 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="102.66480768904785"
																			x="311.5869565217391"
																			y="67.33519231095215"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 311.5869565217391,67.33519231095215 h 10 v 102.66480768904785 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="102.62014137270523"
																			x="325.2826086956522"
																			y="67.37985862729477"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 325.2826086956522,67.37985862729477 h 10 v 102.62014137270523 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="104.68703914023698"
																			x="338.9782608695652"
																			y="65.31296085976302"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.9782608695652,65.31296085976302 h 10 v 104.68703914023698 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="108.14795823233266"
																			x="352.67391304347825"
																			y="61.85204176766734"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 352.67391304347825,61.85204176766734 h 10 v 108.14795823233266 h -10 Z"
																		></path>
																	</g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="disk_io">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">Disk IO Bandwidth</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														The disk performance of your workload is determined
														by the Disk IO bandwidth.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Smaller compute instances (below 4XL) can burst up
														to their largest throughput and IOPS for 30 minutes
														in a day. Beyond that, the performance reverts to
														the baseline. Your disk budget gets replenished
														throughout the day.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/compute-add-ons#disk-throughput-and-iops"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Disk Throughput and IOPS</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/metrics"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Metrics</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-1">
											<p>Disk IO Bandwidth</p>
											<p class="text-scale-1000 text-sm">
												Your current compute can burst up to 2,085 Mbps for 30
												minutes a day and reverts to the baseline performance of
												87 Mbps.
											</p>
										</div>
										<div>
											<p class="mb-2 text-sm">Overview</p>
											<div
												class="border-scale-400 flex items-center justify-between border-b py-1"
											>
												<p class="text-scale-1000 text-xs">
													Current compute instance
												</p>
												<p class="text-xs">Micro</p>
											</div>
											<div
												class="border-scale-400 flex items-center justify-between border-b py-1"
											>
												<p class="text-scale-1000 text-xs">
													Maximum IO Bandwidth (burst limit)
												</p>
												<p class="text-xs">2,085 Mbps</p>
											</div>
											<div
												class="border-scale-400 flex items-center justify-between border-b py-1"
											>
												<p class="text-scale-1000 text-xs">
													Baseline IO Bandwidth
												</p>
												<p class="text-xs">87 Mbps</p>
											</div>
											<div class="flex items-center justify-between py-1">
												<p class="text-scale-1000 text-xs">
													Daily burst time limit
												</p>
												<p class="text-xs">30 mins</p>
											</div>
										</div>
										<div class="space-y-1">
											<div class="flex flex-row justify-between">
												<p>Disk IO consumed per day</p>
											</div>
											<p class="text-scale-1000 text-sm"></p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts88-clip">
																<rect
																	x="50"
																	y="0"
																	height="170"
																	width="315"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="127.5"
																	x2="365"
																	y2="127.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="85"
																	x2="365"
																	y2="85"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="42.5"
																	x2="365"
																	y2="42.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="50"
																	y="0"
																	width="315"
																	height="170"
																	offset="[object Object]"
																	x1="50"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="315"
																height="30"
																x="50"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="50"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="70.54347826086956"
																		y1="176"
																		x2="70.54347826086956"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="70.54347826086956"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="70.54347826086956" dy="0.71em">
																			28 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="125.32608695652173"
																		y1="176"
																		x2="125.32608695652173"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="125.32608695652173"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="125.32608695652173" dy="0.71em">
																			01 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="166.41304347826087"
																		y1="176"
																		x2="166.41304347826087"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="166.41304347826087"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="166.41304347826087" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="221.19565217391303"
																		y1="176"
																		x2="221.19565217391303"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="221.19565217391303"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="221.19565217391303" dy="0.71em">
																			08 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="262.2826086956522"
																		y1="176"
																		x2="262.2826086956522"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="262.2826086956522"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="262.2826086956522" dy="0.71em">
																			11 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="303.36956521739125"
																		y1="176"
																		x2="303.36956521739125"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="303.36956521739125"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="303.36956521739125" dy="0.71em">
																			14 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="50"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="358.15217391304344"
																		y1="176"
																		x2="358.15217391304344"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="315"
																		height="30"
																		x="348.046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.046875" dy="0.71em">
																			18 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="170"
																		x2="50"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">0%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="127.5"
																		x2="50"
																		y2="127.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="127.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">25%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="85"
																		x2="50"
																		y2="85"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="85"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">50%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="42.5"
																		x2="50"
																		y2="42.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="42.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">75%</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="10"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="44"
																		y1="0"
																		x2="50"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="42"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="42" dy="0.355em">100%</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="51.369565217391305"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 51.369565217391305,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="65.06521739130434"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 65.06521739130434,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="78.76086956521739"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 78.76086956521739,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="92.45652173913042"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 92.45652173913042,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="106.15217391304347"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 106.15217391304347,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="119.84782608695652"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 119.84782608695652,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="133.54347826086956"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 133.54347826086956,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="147.23913043478262"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 147.23913043478262,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="160.93478260869566"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 160.93478260869566,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="174.6304347826087"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 174.6304347826087,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="188.32608695652175"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 188.32608695652175,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="202.02173913043478"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 202.02173913043478,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="215.7173913043478"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 215.7173913043478,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="229.41304347826087"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 229.41304347826087,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="243.1086956521739"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 243.1086956521739,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="256.80434782608694"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 256.80434782608694,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="270.5"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 270.5,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="284.19565217391306"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 284.19565217391306,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="297.89130434782606"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 297.89130434782606,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="311.5869565217391"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 311.5869565217391,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="325.2826086956522"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 325.2826086956522,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="338.9782608695652"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.9782608695652,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="10"
																			height="1.6999999999999886"
																			x="352.67391304347825"
																			y="168.3"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 352.67391304347825,168.3 h 10 v 1.6999999999999886 h -10 Z"
																		></path>
																	</g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div id="bandwidth" style="scroll-margin-top: 100px">
					<div class="border-scale-400 border-b">
						<div
							class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
						>
							<div>
								<p class="text-xl">Bandwidth</p>
								<p class="text-scale-1000 text-sm">
									Amount of data transmitted over all network connections
								</p>
							</div>
						</div>
					</div>
					<div id="dbEgress">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">Database Egress</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Contains any outgoing traffic (egress) from your
														database.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the total sum of egress in GB
														throughout your billing period.
													</p>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Database Egress usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 18.0543%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">2 GB</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Used in period</p>
													<p class="text-xs">369.75 MB</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Database Egress per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts91-clip">
																<rect
																	x="56"
																	y="0"
																	height="170"
																	width="309"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="56"
																	y="0"
																	width="309"
																	height="170"
																	offset="[object Object]"
																	x1="56"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="56"
																	y="0"
																	width="309"
																	height="170"
																	offset="[object Object]"
																	x1="56"
																	y1="123.38079205266456"
																	x2="365"
																	y2="123.38079205266456"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="56"
																	y="0"
																	width="309"
																	height="170"
																	offset="[object Object]"
																	x1="56"
																	y1="76.76158410532913"
																	x2="365"
																	y2="76.76158410532913"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="56"
																	y="0"
																	width="309"
																	height="170"
																	offset="[object Object]"
																	x1="56"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="309"
																height="30"
																x="56"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="56"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="56"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="77.06818181818181"
																		y1="176"
																		x2="77.06818181818181"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="77.06818181818181"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="77.06818181818181" dy="0.71em">
																			28 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="56"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="133.25"
																		y1="176"
																		x2="133.25"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="133.25"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="133.25" dy="0.71em">01 Jun</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="56"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="175.38636363636365"
																		y1="176"
																		x2="175.38636363636365"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="175.38636363636365"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="175.38636363636365" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="56"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="217.52272727272728"
																		y1="176"
																		x2="217.52272727272728"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="217.52272727272728"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="217.52272727272728" dy="0.71em">
																			07 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="56"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="259.6590909090909"
																		y1="176"
																		x2="259.6590909090909"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="259.6590909090909"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="259.6590909090909" dy="0.71em">
																			10 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="56"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="301.7954545454545"
																		y1="176"
																		x2="301.7954545454545"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="301.7954545454545"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="301.7954545454545" dy="0.71em">
																			13 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="56"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="357.9772727272727"
																		y1="176"
																		x2="357.9772727272727"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="309"
																		height="30"
																		x="348.48046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.48046875" dy="0.71em">
																			17 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="16"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="50"
																		y1="170"
																		x2="56"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="48"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="48" dy="0.355em">0</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="16"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="50"
																		y1="123.38079205266456"
																		x2="56"
																		y2="123.38079205266456"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="48"
																		y="123.38079205266456"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="48" dy="0.355em">19MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="16"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="50"
																		y1="76.76158410532913"
																		x2="56"
																		y2="76.76158410532913"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="48"
																		y="76.76158410532913"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="48" dy="0.355em">38MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="16"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="50"
																		y1="0"
																		x2="56"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="48"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="48" dy="0.355em">70MB</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="0.0490830330873564"
																			id="2e018165-e6d7-4334-8424-440eb90869c7"
																			x="57.404545454545456"
																			y="169.95091696691264"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 57.404545454545456,169.95091696691264 h 11 v 0.0490830330873564 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="0.049080702126957476"
																			id="c3d0eb97-6365-4d1d-8f09-9d03f77ccf78"
																			x="71.45"
																			y="169.95091929787304"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 71.45,169.95091929787304 h 11 v 0.049080702126957476 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="0.04908536404775532"
																			id="490207e3-b64a-4c4d-a2c4-3392724aaef2"
																			x="85.49545454545455"
																			y="169.95091463595224"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 85.49545454545455,169.95091463595224 h 11 v 0.04908536404775532 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="0.049092356928952086"
																			id="74395528-75b8-4aa9-b318-9b0352b1431a"
																			x="99.54090909090908"
																			y="169.95090764307105"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 99.54090909090908,169.95090764307105 h 11 v 0.049092356928952086 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="0.04908769500812582"
																			id="14634dce-114f-4a19-8b8b-850a9de321e9"
																			x="113.58636363636364"
																			y="169.95091230499187"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 113.58636363636364,169.95091230499187 h 11 v 0.04908769500812582 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="0.04911333557251396"
																			id="26ed4771-0be9-486e-9097-673f53b13a92"
																			x="127.63181818181818"
																			y="169.9508866644275"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 127.63181818181818,169.9508866644275 h 11 v 0.04911333557251396 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="0.049080702126957476"
																			id="bbb1e656-113f-474f-af2e-63f7fb68fe70"
																			x="141.6772727272727"
																			y="169.95091929787304"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 141.6772727272727,169.95091929787304 h 11 v 0.049080702126957476 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="57.980900988041995"
																			id="1538041e-6788-4363-977f-60f24b4f0b7f"
																			x="155.72272727272727"
																			y="112.019099011958"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 155.72272727272727,112.019099011958 h 11 v 57.980900988041995 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="64.28092284970823"
																			id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																			x="169.76818181818183"
																			y="105.71907715029177"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 169.76818181818183,105.71907715029177 h 11 v 64.28092284970823 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="72.07136778233196"
																			id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																			x="183.81363636363636"
																			y="97.92863221766804"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 183.81363636363636,97.92863221766804 h 11 v 72.07136778233196 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="103.25782305959338"
																			id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																			x="197.8590909090909"
																			y="66.74217694040662"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 197.8590909090909,66.74217694040662 h 11 v 103.25782305959338 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="127.53389915705891"
																			id="85870b87-b633-44ad-9d71-8a432f980f6b"
																			x="211.90454545454546"
																			y="42.46610084294109"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 211.90454545454546,42.46610084294109 h 11 v 127.53389915705891 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="33.400760430581585"
																			id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																			x="225.95"
																			y="136.59923956941842"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 225.95,136.59923956941842 h 11 v 33.400760430581585 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="8a884202-b876-4658-9332-bd98610d45b1"
																			x="239.99545454545455"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 239.99545454545455,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="41.50222307806558"
																			id="e3049014-dbd9-4ebc-b0c5-3bb74c0b1882"
																			x="254.04090909090908"
																			y="128.49777692193442"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 254.04090909090908,128.49777692193442 h 11 v 41.50222307806558 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="37.18312595281435"
																			id="72c66975-b39e-4aa1-9956-75eb111b78c0"
																			x="268.0863636363636"
																			y="132.81687404718565"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 268.0863636363636,132.81687404718565 h 11 v 37.18312595281435 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="66.233372573909"
																			id="7f58e499-bc91-40de-b78b-186d829e76fb"
																			x="282.1318181818182"
																			y="103.766627426091"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 282.1318181818182,103.766627426091 h 11 v 66.233372573909 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="46.10028255079246"
																			id="37659f82-a1c8-437c-b6b3-4828df7b68e0"
																			x="296.1772727272727"
																			y="123.89971744920754"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 296.1772727272727,123.89971744920754 h 11 v 46.10028255079246 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="55.6771452294729"
																			id="dd110bcc-b900-4592-9daa-a51fa097e53b"
																			x="310.22272727272724"
																			y="114.3228547705271"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 310.22272727272724,114.3228547705271 h 11 v 55.6771452294729 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="13.30680723253684"
																			id="aeb89151-177d-4634-8a67-7daaf8500d9c"
																			x="324.2681818181818"
																			y="156.69319276746316"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 324.2681818181818,156.69319276746316 h 11 v 13.30680723253684 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="9.038573994116547"
																			id="a4faf92f-06f1-4ad8-b3f8-bf6db1e0db2b"
																			x="338.3136363636363"
																			y="160.96142600588345"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.3136363636363,160.96142600588345 h 11 v 9.038573994116547 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="5.831372949934035"
																			id="a7a7104c-70e2-4e98-8104-1b07937bbf26"
																			x="352.35909090909087"
																			y="164.16862705006596"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 352.35909090909087,164.16862705006596 h 11 v 5.831372949934035 h -11 Z"
																		></path>
																	</g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="storageEgress">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">Storage Egress</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														All requests to view and download your storage items
														go through our CDN. We sum up all outgoing traffic
														(egress) for storage related requests through our
														CDN. We do not differentiate between cache and no
														cache hits.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the total amount of egress in GB
														throughout your billing period.
													</p>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Storage Egress usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 14.3093%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">2 GB</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Used in period</p>
													<p class="text-xs">293.05 MB</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Storage Egress per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts94-clip">
																<rect
																	x="54"
																	y="0"
																	height="170"
																	width="311"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="125.61885409238808"
																	x2="365"
																	y2="125.61885409238808"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="81.23770818477614"
																	x2="365"
																	y2="81.23770818477614"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="311"
																height="30"
																x="54"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="54"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="89.3409090909091"
																		y1="176"
																		x2="89.3409090909091"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="89.3409090909091"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="89.3409090909091" dy="0.71em">
																			29 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="131.75"
																		y1="176"
																		x2="131.75"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="131.75"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="131.75" dy="0.71em">01 Jun</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="174.1590909090909"
																		y1="176"
																		x2="174.1590909090909"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="174.1590909090909"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="174.1590909090909" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="216.5681818181818"
																		y1="176"
																		x2="216.5681818181818"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="216.5681818181818"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="216.5681818181818" dy="0.71em">
																			07 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="258.97727272727275"
																		y1="176"
																		x2="258.97727272727275"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="258.97727272727275"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="258.97727272727275" dy="0.71em">
																			10 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="301.3863636363636"
																		y1="176"
																		x2="301.3863636363636"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="301.3863636363636"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="301.3863636363636" dy="0.71em">
																			13 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="357.9318181818182"
																		y1="176"
																		x2="357.9318181818182"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="348.48046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.48046875" dy="0.71em">
																			17 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="170"
																		x2="54"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">0</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="125.61885409238808"
																		x2="54"
																		y2="125.61885409238808"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="125.61885409238808"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">10MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="81.23770818477614"
																		x2="54"
																		y2="81.23770818477614"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="81.23770818477614"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">19MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="0"
																		x2="54"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">37MB</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="122.126546102064"
																			id="1538041e-6788-4363-977f-60f24b4f0b7f"
																			x="154.3681818181818"
																			y="47.873453897935995"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 154.3681818181818,47.873453897935995 h 11 v 122.126546102064 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="130.95620170907094"
																			id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																			x="168.50454545454545"
																			y="39.04379829092906"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 168.50454545454545,39.04379829092906 h 11 v 130.95620170907094 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="96.99349873646878"
																			id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																			x="182.6409090909091"
																			y="73.00650126353122"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 182.6409090909091,73.00650126353122 h 11 v 96.99349873646878 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="146.55616561936733"
																			id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																			x="196.77727272727273"
																			y="23.44383438063266"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 196.77727272727273,23.44383438063266 h 11 v 146.55616561936733 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="97.73522751367891"
																			id="85870b87-b633-44ad-9d71-8a432f980f6b"
																			x="210.91363636363636"
																			y="72.26477248632109"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 210.91363636363636,72.26477248632109 h 11 v 97.73522751367891 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="82.06856317919795"
																			id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																			x="225.04999999999998"
																			y="87.93143682080205"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 225.04999999999998,87.93143682080205 h 11 v 82.06856317919795 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="38.85835167275411"
																			id="8a884202-b876-4658-9332-bd98610d45b1"
																			x="239.18636363636364"
																			y="131.1416483272459"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 239.18636363636364,131.1416483272459 h 11 v 38.85835167275411 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="55.44373679432478"
																			id="e3049014-dbd9-4ebc-b0c5-3bb74c0b1882"
																			x="253.32272727272726"
																			y="114.55626320567522"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 253.32272727272726,114.55626320567522 h 11 v 55.44373679432478 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="40.93864687733995"
																			id="72c66975-b39e-4aa1-9956-75eb111b78c0"
																			x="267.45909090909095"
																			y="129.06135312266005"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 267.45909090909095,129.06135312266005 h 11 v 40.93864687733995 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="120.81790144325919"
																			id="7f58e499-bc91-40de-b78b-186d829e76fb"
																			x="281.5954545454546"
																			y="49.182098556740804"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 281.5954545454546,49.182098556740804 h 11 v 120.81790144325919 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="115.07334349853022"
																			id="37659f82-a1c8-437c-b6b3-4828df7b68e0"
																			x="295.7318181818182"
																			y="54.92665650146977"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 295.7318181818182,54.92665650146977 h 11 v 115.07334349853022 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="dd110bcc-b900-4592-9daa-a51fa097e53b"
																			x="309.8681818181819"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 309.8681818181819,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="131.1441869287918"
																			id="aeb89151-177d-4634-8a67-7daaf8500d9c"
																			x="324.0045454545455"
																			y="38.85581307120819"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 324.0045454545455,38.85581307120819 h 11 v 131.1441869287918 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="15.071033851484088"
																			id="a4faf92f-06f1-4ad8-b3f8-bf6db1e0db2b"
																			x="338.14090909090913"
																			y="154.9289661485159"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.14090909090913,154.9289661485159 h 11 v 15.071033851484088 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div id="size_and_counts" style="scroll-margin-top: 100px">
					<div class="border-scale-400 border-b">
						<div
							class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
						>
							<div>
								<p class="text-xl">Size &amp; Counts</p>
								<p class="text-scale-1000 text-sm">
									Amount of resources your project is consuming
								</p>
							</div>
						</div>
					</div>
					<div id="dbSize">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">Database size</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Database size refers to the monthly average storage
														usage, as reported by Postgres. Paid plans use
														auto-scaling disks.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the average daily database size
														used in GB throughout the billing period. Billing is
														independent of the provisioned disk size.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/platform/database-size"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Documentation</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Database size usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 14.8922%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">512 MB</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">
														Average in period
													</p>
													<p class="text-xs">76.25 MB</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div></div>
										<div class="space-y-1">
											<p>Average Database size per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts97-clip">
																<rect
																	x="54"
																	y="0"
																	height="170"
																	width="311"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="127.33562268708883"
																	x2="365"
																	y2="127.33562268708883"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="84.67124537417764"
																	x2="365"
																	y2="84.67124537417764"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="311"
																height="30"
																x="54"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="54"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="89.3409090909091"
																		y1="176"
																		x2="89.3409090909091"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="89.3409090909091"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="89.3409090909091" dy="0.71em">
																			29 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="131.75"
																		y1="176"
																		x2="131.75"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="131.75"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="131.75" dy="0.71em">01 Jun</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="174.1590909090909"
																		y1="176"
																		x2="174.1590909090909"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="174.1590909090909"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="174.1590909090909" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="216.5681818181818"
																		y1="176"
																		x2="216.5681818181818"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="216.5681818181818"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="216.5681818181818" dy="0.71em">
																			07 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="258.97727272727275"
																		y1="176"
																		x2="258.97727272727275"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="258.97727272727275"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="258.97727272727275" dy="0.71em">
																			10 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="301.3863636363636"
																		y1="176"
																		x2="301.3863636363636"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="301.3863636363636"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="301.3863636363636" dy="0.71em">
																			13 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="357.9318181818182"
																		y1="176"
																		x2="357.9318181818182"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="348.48046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.48046875" dy="0.71em">
																			17 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="170"
																		x2="54"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">0</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="127.33562268708883"
																		x2="54"
																		y2="127.33562268708883"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="127.33562268708883"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">19MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="84.67124537417764"
																		x2="54"
																		y2="84.67124537417764"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="84.67124537417764"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">38MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="0"
																		x2="54"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">76MB</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="167.76315789473682"
																			id="2e018165-e6d7-4334-8424-440eb90869c7"
																			x="55.413636363636364"
																			y="2.2368421052631646"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 55.413636363636364,2.2368421052631646 h 11 v 167.76315789473682 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="167.76315789473682"
																			id="c3d0eb97-6365-4d1d-8f09-9d03f77ccf78"
																			x="69.55"
																			y="2.2368421052631646"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 69.55,2.2368421052631646 h 11 v 167.76315789473682 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="167.76315789473682"
																			id="490207e3-b64a-4c4d-a2c4-3392724aaef2"
																			x="83.68636363636364"
																			y="2.2368421052631646"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 83.68636363636364,2.2368421052631646 h 11 v 167.76315789473682 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="167.76315789473682"
																			id="74395528-75b8-4aa9-b318-9b0352b1431a"
																			x="97.82272727272726"
																			y="2.2368421052631646"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 97.82272727272726,2.2368421052631646 h 11 v 167.76315789473682 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="167.76315789473682"
																			id="14634dce-114f-4a19-8b8b-850a9de321e9"
																			x="111.9590909090909"
																			y="2.2368421052631646"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 111.9590909090909,2.2368421052631646 h 11 v 167.76315789473682 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="167.76315789473682"
																			id="26ed4771-0be9-486e-9097-673f53b13a92"
																			x="126.09545454545454"
																			y="2.2368421052631646"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 126.09545454545454,2.2368421052631646 h 11 v 167.76315789473682 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="167.76315789473682"
																			id="bbb1e656-113f-474f-af2e-63f7fb68fe70"
																			x="140.23181818181817"
																			y="2.2368421052631646"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 140.23181818181817,2.2368421052631646 h 11 v 167.76315789473682 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="1538041e-6788-4363-977f-60f24b4f0b7f"
																			x="154.3681818181818"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 154.3681818181818,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																			x="168.50454545454545"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 168.50454545454545,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																			x="182.6409090909091"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 182.6409090909091,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																			x="196.77727272727273"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 196.77727272727273,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="85870b87-b633-44ad-9d71-8a432f980f6b"
																			x="210.91363636363636"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 210.91363636363636,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																			x="225.04999999999998"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 225.04999999999998,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="8a884202-b876-4658-9332-bd98610d45b1"
																			x="239.18636363636364"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 239.18636363636364,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="e3049014-dbd9-4ebc-b0c5-3bb74c0b1882"
																			x="253.32272727272726"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 253.32272727272726,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="72c66975-b39e-4aa1-9956-75eb111b78c0"
																			x="267.45909090909095"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 267.45909090909095,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="7f58e499-bc91-40de-b78b-186d829e76fb"
																			x="281.5954545454546"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 281.5954545454546,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="37659f82-a1c8-437c-b6b3-4828df7b68e0"
																			x="295.7318181818182"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 295.7318181818182,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="dd110bcc-b900-4592-9daa-a51fa097e53b"
																			x="309.8681818181819"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 309.8681818181819,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="aeb89151-177d-4634-8a67-7daaf8500d9c"
																			x="324.0045454545455"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 324.0045454545455,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="a4faf92f-06f1-4ad8-b3f8-bf6db1e0db2b"
																			x="338.14090909090913"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.14090909090913,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="a7a7104c-70e2-4e98-8104-1b07937bbf26"
																			x="352.27727272727276"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 352.27727272727276,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="storageSize">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">Storage Size</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Sum of all objects in your storage buckets.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the average daily size in GB
														throughout your billing period.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/storage"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Storage</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Storage Size usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 5.2694%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">1 GB</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Max in period</p>
													<p class="text-xs">53.96 MB</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Max Storage Size per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts100-clip">
																<rect
																	x="54"
																	y="0"
																	height="170"
																	width="311"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="125.97519516118295"
																	x2="365"
																	y2="125.97519516118295"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="81.95039032236589"
																	x2="365"
																	y2="81.95039032236589"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="54"
																	y="0"
																	width="311"
																	height="170"
																	offset="[object Object]"
																	x1="54"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="311"
																height="30"
																x="54"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="54"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="89.3409090909091"
																		y1="176"
																		x2="89.3409090909091"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="89.3409090909091"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="89.3409090909091" dy="0.71em">
																			29 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="131.75"
																		y1="176"
																		x2="131.75"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="131.75"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="131.75" dy="0.71em">01 Jun</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="174.1590909090909"
																		y1="176"
																		x2="174.1590909090909"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="174.1590909090909"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="174.1590909090909" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="216.5681818181818"
																		y1="176"
																		x2="216.5681818181818"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="216.5681818181818"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="216.5681818181818" dy="0.71em">
																			07 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="258.97727272727275"
																		y1="176"
																		x2="258.97727272727275"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="258.97727272727275"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="258.97727272727275" dy="0.71em">
																			10 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="301.3863636363636"
																		y1="176"
																		x2="301.3863636363636"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="301.3863636363636"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="301.3863636363636" dy="0.71em">
																			13 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="54"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="357.9318181818182"
																		y1="176"
																		x2="357.9318181818182"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="311"
																		height="30"
																		x="348.48046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.48046875" dy="0.71em">
																			17 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="170"
																		x2="54"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">0</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="125.97519516118295"
																		x2="54"
																		y2="125.97519516118295"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="125.97519516118295"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">24MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="81.95039032236589"
																		x2="54"
																		y2="81.95039032236589"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="81.95039032236589"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">48MB</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="14"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="48"
																		y1="0"
																		x2="54"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="46"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="46" dy="0.355em">92MB</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="2e018165-e6d7-4334-8424-440eb90869c7"
																			x="55.413636363636364"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 55.413636363636364,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="c3d0eb97-6365-4d1d-8f09-9d03f77ccf78"
																			x="69.55"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 69.55,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="490207e3-b64a-4c4d-a2c4-3392724aaef2"
																			x="83.68636363636364"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 83.68636363636364,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="74395528-75b8-4aa9-b318-9b0352b1431a"
																			x="97.82272727272726"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 97.82272727272726,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="14634dce-114f-4a19-8b8b-850a9de321e9"
																			x="111.9590909090909"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 111.9590909090909,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="26ed4771-0be9-486e-9097-673f53b13a92"
																			x="126.09545454545454"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 126.09545454545454,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="bbb1e656-113f-474f-af2e-63f7fb68fe70"
																			x="140.23181818181817"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 140.23181818181817,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="161.22498998746454"
																			id="1538041e-6788-4363-977f-60f24b4f0b7f"
																			x="154.3681818181818"
																			y="8.77501001253546"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 154.3681818181818,8.77501001253546 h 11 v 161.22498998746454 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="164.1493552588049"
																			id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																			x="168.50454545454545"
																			y="5.8506447411951"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 168.50454545454545,5.8506447411951 h 11 v 164.1493552588049 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="169.94771438078124"
																			id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																			x="182.6409090909091"
																			y="0.052285619218763735"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 182.6409090909091,0.052285619218763735 h 11 v 169.94771438078124 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="169.94771438078124"
																			id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																			x="196.77727272727273"
																			y="0.052285619218763735"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 196.77727272727273,0.052285619218763735 h 11 v 169.94771438078124 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="168.85404313500658"
																			id="85870b87-b633-44ad-9d71-8a432f980f6b"
																			x="210.91363636363636"
																			y="1.145956864993436"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 210.91363636363636,1.145956864993436 h 11 v 168.85404313500658 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																			x="225.04999999999998"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 225.04999999999998,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="8a884202-b876-4658-9332-bd98610d45b1"
																			x="239.18636363636364"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 239.18636363636364,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="e3049014-dbd9-4ebc-b0c5-3bb74c0b1882"
																			x="253.32272727272726"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 253.32272727272726,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="72c66975-b39e-4aa1-9956-75eb111b78c0"
																			x="267.45909090909095"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 267.45909090909095,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="7f58e499-bc91-40de-b78b-186d829e76fb"
																			x="281.5954545454546"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 281.5954545454546,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="91.57824004927795"
																			id="37659f82-a1c8-437c-b6b3-4828df7b68e0"
																			x="295.7318181818182"
																			y="78.42175995072205"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 295.7318181818182,78.42175995072205 h 11 v 91.57824004927795 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="92.74078193875027"
																			id="dd110bcc-b900-4592-9daa-a51fa097e53b"
																			x="309.8681818181819"
																			y="77.25921806124973"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 309.8681818181819,77.25921806124973 h 11 v 92.74078193875027 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="92.87107070718245"
																			id="aeb89151-177d-4634-8a67-7daaf8500d9c"
																			x="324.0045454545455"
																			y="77.12892929281755"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 324.0045454545455,77.12892929281755 h 11 v 92.87107070718245 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="99.63657906880329"
																			id="a4faf92f-06f1-4ad8-b3f8-bf6db1e0db2b"
																			x="338.14090909090913"
																			y="70.36342093119671"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.14090909090913,70.36342093119671 h 11 v 99.63657906880329 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="99.63657906880329"
																			id="a7a7104c-70e2-4e98-8104-1b07937bbf26"
																			x="352.27727272727276"
																			y="70.36342093119671"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 352.27727272727276,70.36342093119671 h 11 v 99.63657906880329 h -11 Z"
																		></path>
																	</g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="funcCount">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">
														Edge Function Count
													</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Number of serverless functions in your project.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the maximum amount of functions
														at any point in time throughout your billing period.
													</p>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Edge Function Count usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 0%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">10</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Max in period</p>
													<p class="text-xs">0</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Max Edge Function Count per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="relative">
											<div class="transition-opacity duration-300">
												<div
													class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
												>
													<div
														class="bg-panel-body-light dark:bg-panel-body-dark"
													>
														<div class="px-6 py-4">
															<div
																class="flex flex-col items-center justify-center"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="21"
																	height="21"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon text-scale-1100 mb-2"
																>
																	<line x1="18" y1="20" x2="18" y2="10"></line>
																	<line x1="12" y1="20" x2="12" y2="4"></line>
																	<line x1="6" y1="20" x2="6" y2="14"></line>
																</svg>
																<p class="text-sm">No data in period</p>
																<p class="text-scale-1000 text-sm">
																	May take up to 24 hours to show
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div id="activity" style="scroll-margin-top: 100px">
					<div class="border-scale-400 border-b">
						<div
							class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
						>
							<div>
								<p class="text-xl">Activity</p>
								<p class="text-scale-1000 text-sm">
									Usage statistics that reflect the activity of your project
								</p>
							</div>
						</div>
					</div>
					<div id="mau">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">
														Monthly Active Users
													</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Users who log in or refresh their token count
														towards MAU.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the sum of distinct users
														requesting your API throughout the billing period.
														Resets every billing cycle.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/auth"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Auth</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Monthly Active Users usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 0.04%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">50,000</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Used in period</p>
													<p class="text-xs">20</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Monthly Active Users per day</p>
											<p class="text-scale-1000 text-sm">
												The data is refreshed over a period of 24 hours and
												resets at the beginning of every billing period.
											</p>
											<p class="text-scale-1000 text-sm">
												The data points are relative to the beginning of your
												billing period.
											</p>
										</div>
										<div class="h-[200px] w-full">
											<div
												class="recharts-responsive-container"
												style="width: 100%; height: 200px; min-width: 0px"
												width="364.5"
												height="200"
											>
												<div
													class="recharts-wrapper"
													role="region"
													style="
														position: relative;
														cursor: default;
														width: 365px;
														height: 200px;
													"
												>
													<svg
														class="recharts-surface"
														width="365"
														height="200"
														viewBox="0 0 365 200"
													>
														<title></title>
														<desc></desc>
														<defs>
															<clipPath id="recharts103-clip">
																<rect
																	x="58"
																	y="0"
																	height="170"
																	width="307"
																></rect>
															</clipPath>
														</defs>
														<g class="recharts-cartesian-grid">
															<g class="recharts-cartesian-grid-horizontal">
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="58"
																	y="0"
																	width="307"
																	height="170"
																	offset="[object Object]"
																	x1="58"
																	y1="170"
																	x2="365"
																	y2="170"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="58"
																	y="0"
																	width="307"
																	height="170"
																	offset="[object Object]"
																	x1="58"
																	y1="127.5"
																	x2="365"
																	y2="127.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="58"
																	y="0"
																	width="307"
																	height="170"
																	offset="[object Object]"
																	x1="58"
																	y1="85"
																	x2="365"
																	y2="85"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="58"
																	y="0"
																	width="307"
																	height="170"
																	offset="[object Object]"
																	x1="58"
																	y1="42.5"
																	x2="365"
																	y2="42.5"
																></line>
																<line
																	stroke-dasharray="3 3"
																	class="stroke-scale-800"
																	stroke="#ccc"
																	fill="none"
																	x="58"
																	y="0"
																	width="307"
																	height="170"
																	offset="[object Object]"
																	x1="58"
																	y1="0"
																	x2="365"
																	y2="0"
																></line>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
														>
															<line
																orientation="bottom"
																width="307"
																height="30"
																x="58"
																y="170"
																class="recharts-cartesian-axis-line"
																stroke="#666"
																fill="none"
																x1="58"
																y1="170"
																x2="365"
																y2="170"
															></line>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="58"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="78.93181818181819"
																		y1="176"
																		x2="78.93181818181819"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="78.93181818181819"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="78.93181818181819" dy="0.71em">
																			28 May
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="58"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="134.75"
																		y1="176"
																		x2="134.75"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="134.75"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="134.75" dy="0.71em">01 Jun</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="58"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="176.61363636363635"
																		y1="176"
																		x2="176.61363636363635"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="176.61363636363635"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="176.61363636363635" dy="0.71em">
																			04 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="58"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="218.47727272727272"
																		y1="176"
																		x2="218.47727272727272"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="218.47727272727272"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="218.47727272727272" dy="0.71em">
																			07 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="58"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="260.3409090909091"
																		y1="176"
																		x2="260.3409090909091"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="260.3409090909091"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="260.3409090909091" dy="0.71em">
																			10 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="58"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="302.2045454545455"
																		y1="176"
																		x2="302.2045454545455"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="302.2045454545455"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="302.2045454545455" dy="0.71em">
																			13 Jun
																		</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="58"
																		y="170"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="#666"
																		fill="none"
																		x1="358.0227272727273"
																		y1="176"
																		x2="358.0227272727273"
																		y2="170"
																	></line>
																	<text
																		orientation="bottom"
																		width="307"
																		height="30"
																		x="348.48046875"
																		y="178"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="middle"
																	>
																		<tspan x="348.48046875" dy="0.71em">
																			17 Jun
																		</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g
															class="recharts-layer recharts-cartesian-axis recharts-yAxis yAxis"
														>
															<g class="recharts-cartesian-axis-ticks">
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="18"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="52"
																		y1="170"
																		x2="58"
																		y2="170"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="50"
																		y="170"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="50" dy="0.355em">0</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="18"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="52"
																		y1="127.5"
																		x2="58"
																		y2="127.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="50"
																		y="127.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="50" dy="0.355em">5</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="18"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="52"
																		y1="85"
																		x2="58"
																		y2="85"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="50"
																		y="85"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="50" dy="0.355em">10</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="18"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="52"
																		y1="42.5"
																		x2="58"
																		y2="42.5"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="50"
																		y="42.5"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="50" dy="0.355em">15</tspan>
																	</text>
																</g>
																<g
																	class="recharts-layer recharts-cartesian-axis-tick"
																>
																	<line
																		width="40"
																		orientation="left"
																		height="170"
																		x="18"
																		y="0"
																		class="recharts-cartesian-axis-tick-line"
																		stroke="none"
																		fill="none"
																		x1="52"
																		y1="0"
																		x2="58"
																		y2="0"
																	></line>
																	<text
																		width="40"
																		orientation="left"
																		height="170"
																		x="50"
																		y="9"
																		stroke="none"
																		fill="#666"
																		class="recharts-text recharts-cartesian-axis-tick-value"
																		text-anchor="end"
																	>
																		<tspan x="50" dy="0.355em">20</tspan>
																	</text>
																</g>
															</g>
														</g>
														<g class="recharts-layer recharts-bar">
															<g class="recharts-layer recharts-bar-rectangles">
																<g class="recharts-layer">
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	></g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="25.5"
																			id="1538041e-6788-4363-977f-60f24b4f0b7f"
																			x="157.07727272727274"
																			y="144.5"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 157.07727272727274,144.5 h 11 v 25.5 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="34"
																			id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																			x="171.03181818181818"
																			y="136"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 171.03181818181818,136 h 11 v 34 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="34"
																			id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																			x="184.98636363636365"
																			y="136"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 184.98636363636365,136 h 11 v 34 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="34"
																			id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																			x="198.94090909090912"
																			y="136"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 198.94090909090912,136 h 11 v 34 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="42.5"
																			id="85870b87-b633-44ad-9d71-8a432f980f6b"
																			x="212.89545454545456"
																			y="127.5"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 212.89545454545456,127.5 h 11 v 42.5 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="51.000000000000014"
																			id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																			x="226.85000000000002"
																			y="118.99999999999999"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 226.85000000000002,118.99999999999999 h 11 v 51.000000000000014 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="59.5"
																			id="8a884202-b876-4658-9332-bd98610d45b1"
																			x="240.80454545454546"
																			y="110.5"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 240.80454545454546,110.5 h 11 v 59.5 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="59.5"
																			id="e3049014-dbd9-4ebc-b0c5-3bb74c0b1882"
																			x="254.75909090909093"
																			y="110.5"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 254.75909090909093,110.5 h 11 v 59.5 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="59.5"
																			id="72c66975-b39e-4aa1-9956-75eb111b78c0"
																			x="268.71363636363634"
																			y="110.5"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 268.71363636363634,110.5 h 11 v 59.5 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="136"
																			id="7f58e499-bc91-40de-b78b-186d829e76fb"
																			x="282.6681818181818"
																			y="33.99999999999999"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 282.6681818181818,33.99999999999999 h 11 v 136 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="136"
																			id="37659f82-a1c8-437c-b6b3-4828df7b68e0"
																			x="296.6227272727273"
																			y="33.99999999999999"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 296.6227272727273,33.99999999999999 h 11 v 136 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="144.5"
																			id="dd110bcc-b900-4592-9daa-a51fa097e53b"
																			x="310.5772727272727"
																			y="25.500000000000004"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 310.5772727272727,25.500000000000004 h 11 v 144.5 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="aeb89151-177d-4634-8a67-7daaf8500d9c"
																			x="324.53181818181815"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 324.53181818181815,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="a4faf92f-06f1-4ad8-b3f8-bf6db1e0db2b"
																			x="338.48636363636365"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 338.48636363636365,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																	<g
																		class="recharts-layer recharts-bar-rectangle"
																		role="img"
																	>
																		<path
																			width="11"
																			height="170"
																			id="a7a7104c-70e2-4e98-8104-1b07937bbf26"
																			x="352.4409090909091"
																			y="0"
																			class="recharts-rectangle fill-scale-1200"
																			radius="0"
																			d="M 352.4409090909091,0 h 11 v 170 h -11 Z"
																		></path>
																	</g>
																</g>
															</g>
															<g class="recharts-layer"></g>
														</g>
													</svg>
													<div
														tabindex="-1"
														role="dialog"
														class="recharts-tooltip-wrapper"
														style="
															pointer-events: none;
															visibility: hidden;
															position: absolute;
															top: 0px;
															left: 0px;
														"
													></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="mauSso">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">
														Monthly Active SSO Users
													</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														SSO users who log in or refresh their token count
														towards SSO MAU.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the sum of distinct Single
														Sign-On users requesting your API throughout the
														billing period. Resets every billing cycle.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/auth/sso/auth-sso-saml"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">SSO with SAML 2.0</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="relative">
											<div class="transition-opacity duration-300">
												<div
													class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
												>
													<div
														class="bg-panel-body-light dark:bg-panel-body-dark"
													>
														<div class="px-6 py-4">
															<div
																class="flex w-full flex-col items-center justify-center space-y-2 md:flex-row md:justify-between"
															>
																<div class="space-y-1">
																	<p class="text-sm">Not included in plan</p>
																	<div>
																		<p class="text-scale-1100 text-sm">
																			You need to be on a higher plan in order
																			to use this feature.
																		</p>
																	</div>
																</div>
																<a
																	href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/billing/subscription"
																	><button
																		class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																		type="button"
																	>
																		<span class="truncate">Upgrade plan</span>
																	</button></a
																>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="storageImageTransformations">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">
														Storage Image Transformations
													</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														We count all images that were transformed in the
														billing period, ignoring any transformations.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Usage example: You transform one image with four
														different size transformations and another image
														with just a single transformation. It counts as two,
														as only two images were transformed.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the count of (origin) images
														that used transformations throughout the billing
														period. Resets every billing cycle.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/storage/image-transformations"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Documentation</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="relative">
											<div class="transition-opacity duration-300">
												<div
													class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
												>
													<div
														class="bg-panel-body-light dark:bg-panel-body-dark"
													>
														<div class="px-6 py-4">
															<div
																class="flex w-full flex-col items-center justify-center space-y-2 md:flex-row md:justify-between"
															>
																<div class="space-y-1">
																	<p class="text-sm">Not included in plan</p>
																	<div>
																		<p class="text-scale-1100 text-sm">
																			You need to be on a higher plan in order
																			to use this feature.
																		</p>
																	</div>
																</div>
																<a
																	href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/billing/subscription"
																	><button
																		class="font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 dark:bordershadow-brand-fixed-1000 dark:hover:bordershadow-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
																		type="button"
																	>
																		<span class="truncate">Upgrade plan</span>
																	</button></a
																>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="functionInvocations">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">
														Edge Function Invocations
													</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Every serverless function invocation independent of
														response status is counted.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the sum of all invocations
														throughout your billing period.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/functions"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Edge Functions</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Edge Function Invocations usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 0%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">500,000</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Used in period</p>
													<p class="text-xs">0</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Edge Function Invocations per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="relative">
											<div class="transition-opacity duration-300">
												<div
													class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
												>
													<div
														class="bg-panel-body-light dark:bg-panel-body-dark"
													>
														<div class="px-6 py-4">
															<div
																class="flex flex-col items-center justify-center"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="21"
																	height="21"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon text-scale-1100 mb-2"
																>
																	<line x1="18" y1="20" x2="18" y2="10"></line>
																	<line x1="12" y1="20" x2="12" y2="4"></line>
																	<line x1="6" y1="20" x2="6" y2="14"></line>
																</svg>
																<p class="text-sm">No data in period</p>
																<p class="text-scale-1000 text-sm">
																	May take up to 24 hours to show
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="realtimeMessageCount">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">
														Realtime Message Count
													</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Count of messages going through Realtime.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Usage example: If you do a database change and 5
														clients listen to that change via Realtime, that's 5
														messages. If you broadcast a message and 4 clients
														listen to that, that's 5 messages (1 message sent, 4
														received).
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the total amount of messages
														throughout your billing period.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/realtime/quotas"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Realtime Quotas</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Realtime Message Count usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 0%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">2,000,000</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Used in period</p>
													<p class="text-xs">0</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Realtime Message Count per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="relative">
											<div class="transition-opacity duration-300">
												<div
													class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
												>
													<div
														class="bg-panel-body-light dark:bg-panel-body-dark"
													>
														<div class="px-6 py-4">
															<div
																class="flex flex-col items-center justify-center"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="21"
																	height="21"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon text-scale-1100 mb-2"
																>
																	<line x1="18" y1="20" x2="18" y2="10"></line>
																	<line x1="12" y1="20" x2="12" y2="4"></line>
																	<line x1="6" y1="20" x2="6" y2="14"></line>
																</svg>
																<p class="text-sm">No data in period</p>
																<p class="text-scale-1000 text-sm">
																	May take up to 24 hours to show
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="realtimePeakConnection">
						<div class="border-scale-400 border-b">
							<div
								class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
							>
								<div class="grid grid-cols-12 gap-6">
									<div class="col-span-12 lg:col-span-5">
										<div class="sticky top-32 space-y-6">
											<div class="space-y-1">
												<div class="flex items-center space-x-2">
													<p class="text-base capitalize">
														Realtime Peak Connections
													</p>
												</div>
												<div class="grid gap-4">
													<p class="text-scale-1000 pr-8 text-sm">
														Total number of successful connections. Connections
														attempts are not counted towards usage.
													</p>
													<p class="text-scale-1000 pr-8 text-sm">
														Billing is based on the maximum amount of concurrent
														peak connections throughout your billing period.
													</p>
												</div>
											</div>
											<div class="space-y-2">
												<p
													class="text-scale-1200 dark:text-scale-1100 mb-2 text-sm"
												>
													More information
												</p>
												<div>
													<a
														target="_blank"
														rel="noreferrer"
														href="https://supabase.com/docs/guides/realtime/quotas"
														><div
															class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
														>
															<p class="text-sm">Realtime Quotas</p>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="1.5"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon"
															>
																<path
																	d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
																></path>
																<polyline points="15 3 21 3 21 9"></polyline>
																<line x1="10" y1="14" x2="21" y2="3"></line>
															</svg></div
													></a>
												</div>
											</div>
										</div>
									</div>
									<div class="col-span-12 space-y-6 lg:col-span-7">
										<div class="space-y-2">
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-4">
													<p class="text-sm">Realtime Peak Connections usage</p>
												</div>
											</div>
											<div class="flex w-full flex-col">
												<div
													class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
												>
													<div
														class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
														style="width: 0%"
													></div>
												</div>
											</div>
											<div>
												<div
													class="border-scale-400 flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Included in free plan
													</p>
													<p class="text-xs">200</p>
												</div>
												<div class="flex items-center justify-between py-1">
													<p class="text-scale-1000 text-xs">Max in period</p>
													<p class="text-xs">0</p>
												</div>
												<div
													class="flex items-center justify-between border-t py-1"
												>
													<p class="text-scale-1000 text-xs">
														Overage in period
													</p>
													<p class="text-xs">0</p>
												</div>
											</div>
										</div>
										<div class="space-y-1">
											<p>Max Realtime Peak Connections per day</p>
											<p class="text-scale-1000 text-sm">
												The data refreshes every 24 hours.
											</p>
										</div>
										<div class="relative">
											<div class="transition-opacity duration-300">
												<div
													class="border-panel-border-light dark:border-panel-border-dark undefined mb-8 overflow-hidden rounded-md border shadow-sm"
												>
													<div
														class="bg-panel-body-light dark:bg-panel-body-dark"
													>
														<div class="px-6 py-4">
															<div
																class="flex flex-col items-center justify-center"
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="21"
																	height="21"
																	viewBox="0 0 24 24"
																	fill="none"
																	stroke="currentColor"
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	class="sbui-icon text-scale-1100 mb-2"
																>
																	<line x1="18" y1="20" x2="18" y2="10"></line>
																	<line x1="12" y1="20" x2="12" y2="4"></line>
																	<line x1="6" y1="20" x2="6" y2="14"></line>
																</svg>
																<p class="text-sm">No data in period</p>
																<p class="text-scale-1000 text-sm">
																	May take up to 24 hours to show
																</p>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
