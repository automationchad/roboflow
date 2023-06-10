<template>
	<main class="flex-1 overflow-y-auto" style="max-height: 100vh">
		<div class="relative">
			<div
				class="absolute right-16 top-[1.9rem] flex items-center space-x-3 xl:right-32"
			>
				<div class="flex flex-row gap-6 text-xs">
					<div class="">
						<button
							type="button"
							id=""
							name=""
							class="focus:ring-scale-400 bg-scale-500 hover:bg-scale-700 !bg-brand-900 !hover:bg-brand-900 relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent p-0 outline-none transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-current"
						>
							<span
								aria-hidden="true"
								class="bg-scale-100 dark:bg-scale-900 inline-block !h-3 h-5 !w-3 w-5 translate-x-3 rounded-full shadow ring-0 transition duration-200 ease-in-out dark:bg-white"
							></span>
						</button>
					</div>
				</div>
				<p class="text-scale-1100 -translate-y-[1px] text-xs">
					Preview new interface
				</p>
			</div>
			<div>
				<div
					class="1xl:px-28 mx-auto flex flex-col space-y-4 px-5 pt-6 lg:px-16 2xl:px-32"
				>
					<h3 class="text-scale-1200 text-xl">Usage</h3>
				</div>
			</div>
			<div>
				<div class="bg-scale-200 sticky top-0 z-10 overflow-hidden border-b">
					<div
						class="1xl:px-28 mx-auto flex flex-col gap-2 px-5 lg:px-16 2xl:px-32"
					>
						<div class="mt-4 flex items-center justify-between">
							<div class="flex items-center space-x-4">
								<button
									type="button"
									id="radix-828"
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
									<p class="text-scale-1000 text-sm">
										27 May 2023 - 27 Jun 2023
									</p>
								</div>
							</div>
						</div>
						<div class="flex gap-6">
							<button
								role="tab"
								class="border-scale-1200 text-scale-1200 flex cursor-pointer items-center space-x-2 border-b py-3 transition hover:opacity-100"
							>
								<p class="text-sm">Infrastructure</p></button
							><button
								role="tab"
								class="flex cursor-pointer items-center space-x-2 py-3 opacity-50 transition hover:opacity-100"
							>
								<p class="text-sm">Bandwidth</p></button
							><button
								role="tab"
								class="flex cursor-pointer items-center space-x-2 py-3 opacity-50 transition hover:opacity-100"
							>
								<p class="text-sm">Size &amp; Counts</p></button
							><button
								role="tab"
								class="flex cursor-pointer items-center space-x-2 py-3 opacity-50 transition hover:opacity-100"
							>
								<p class="text-sm">Activity</p>
							</button>
						</div>
					</div>
				</div>
				<div>
					<div id="infrastructure" style="scroll-margin-top: 100px">
						<div class="border-b">
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
							<div class="border-b">
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
												</div>
											</div>
										</div>
										<div class="col-span-12 space-y-6 lg:col-span-7">
											<div class="space-y-1">
												<div class="flex flex-row justify-between">
													<p>Max <span class="">CPU</span> per day</p>
												</div>
												<p class="text-scale-1000 text-sm">
													Your compute instance has 2 CPU cores.
												</p>
												<p class="text-scale-1000 text-sm"></p>
											</div>
											<div class="h-[200px] w-full">
												<div
													class="recharts-responsive-container"
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts42-clip">
																	<rect
																		x="50"
																		y="0"
																		height="170"
																		width="392"
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
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="127.5"
																		x2="442"
																		y2="127.5"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="85"
																		x2="442"
																		y2="85"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="42.5"
																		x2="442"
																		y2="42.5"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="392"
																	height="30"
																	type="category"
																	x="50"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="50"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="92"
																			y1="176"
																			x2="92"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="92"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="92" dy="0.71em">28 May</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="176"
																			y1="176"
																			x2="176"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="176"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="176" dy="0.71em">31 May</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="232"
																			y1="176"
																			x2="232"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="232"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="232" dy="0.71em">02 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="288"
																			y1="176"
																			x2="288"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="288"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="288" dy="0.71em">04 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="344"
																			y1="176"
																			x2="344"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="344"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="344" dy="0.71em">06 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428"
																			y1="176"
																			x2="428"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="42"
																			y="12"
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
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.8243917824062521"
																				x="52.8"
																				y="169.17560821759375"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 52.8,169.17560821759375 h 22 v 0.8243917824062521 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.8243327546298076"
																				x="80.8"
																				y="169.1756672453702"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 80.8,169.1756672453702 h 22 v 0.8243327546298076 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.8208107638889715"
																				x="108.8"
																				y="169.17918923611103"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 108.8,169.17918923611103 h 22 v 0.8208107638889715 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.7463865740737958"
																				x="136.8"
																				y="169.2536134259262"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 136.8,169.2536134259262 h 22 v 0.7463865740737958 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.7649311342586032"
																				x="164.8"
																				y="169.2350688657414"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 164.8,169.2350688657414 h 22 v 0.7649311342586032 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.7993344907425808"
																				x="192.8"
																				y="169.20066550925742"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 192.8,169.20066550925742 h 22 v 0.7993344907425808 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.7772679398132709"
																				x="220.8"
																				y="169.22273206018673"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 220.8,169.22273206018673 h 22 v 0.7772679398132709 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.1202586805564465"
																				x="248.8"
																				y="168.87974131944355"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 248.8,168.87974131944355 h 22 v 1.1202586805564465 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.9447297453694716"
																				x="276.8"
																				y="169.05527025463053"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 276.8,169.05527025463053 h 22 v 0.9447297453694716 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.0208559027795445"
																				x="304.8"
																				y="168.97914409722046"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 304.8,168.97914409722046 h 22 v 1.0208559027795445 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.11429687499853"
																				x="332.8"
																				y="168.88570312500147"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 332.8,168.88570312500147 h 22 v 1.11429687499853 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.1325758101837948"
																				x="360.8"
																				y="168.8674241898162"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 360.8,168.8674241898162 h 22 v 1.1325758101837948 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.9545677083360999"
																				x="388.8"
																				y="169.0454322916639"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 388.8,169.0454322916639 h 22 v 0.9545677083360999 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.0082928240744309"
																				x="416.8"
																				y="168.99170717592557"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 416.8,168.99170717592557 h 22 v 1.0082928240744309 h -22 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
							<div class="border-b">
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
															Memory usage of your server
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
												</div>
											</div>
										</div>
										<div class="col-span-12 space-y-6 lg:col-span-7">
											<div class="space-y-1">
												<div class="flex flex-row justify-between">
													<p>
														Max <span class="lowercase">Memory</span> per day
													</p>
												</div>
												<p class="text-scale-1000 text-sm">
													Your compute instance has 1 GB memory.
												</p>
												<p class="text-scale-1000 text-sm"></p>
											</div>
											<div class="h-[200px] w-full">
												<div
													class="recharts-responsive-container"
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts48-clip">
																	<rect
																		x="50"
																		y="0"
																		height="170"
																		width="392"
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
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="127.5"
																		x2="442"
																		y2="127.5"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="85"
																		x2="442"
																		y2="85"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="42.5"
																		x2="442"
																		y2="42.5"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="392"
																	height="30"
																	type="category"
																	x="50"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="50"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="92"
																			y1="176"
																			x2="92"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="92"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="92" dy="0.71em">28 May</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="176"
																			y1="176"
																			x2="176"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="176"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="176" dy="0.71em">31 May</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="232"
																			y1="176"
																			x2="232"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="232"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="232" dy="0.71em">02 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="288"
																			y1="176"
																			x2="288"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="288"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="288" dy="0.71em">04 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="344"
																			y1="176"
																			x2="344"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="344"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="344" dy="0.71em">06 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428"
																			y1="176"
																			x2="428"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="42"
																			y="12"
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
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="87.99696574169818"
																				x="52.8"
																				y="82.00303425830182"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 52.8,82.00303425830182 h 22 v 87.99696574169818 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="87.85360127472751"
																				x="80.8"
																				y="82.14639872527249"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 80.8,82.14639872527249 h 22 v 87.85360127472751 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="65.8820961809028"
																				x="108.8"
																				y="104.1179038190972"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 108.8,104.1179038190972 h 22 v 65.8820961809028 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="70.14772939162273"
																				x="136.8"
																				y="99.85227060837727"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 136.8,99.85227060837727 h 22 v 70.14772939162273 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="74.64678012645568"
																				x="164.8"
																				y="95.35321987354432"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 164.8,95.35321987354432 h 22 v 74.64678012645568 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="76.20361737833302"
																				x="192.8"
																				y="93.79638262166698"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 192.8,93.79638262166698 h 22 v 76.20361737833302 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="76.03431763090535"
																				x="220.8"
																				y="93.96568236909465"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 220.8,93.96568236909465 h 22 v 76.03431763090535 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="106.66100215279778"
																				x="248.8"
																				y="63.33899784720222"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 248.8,63.33899784720222 h 22 v 106.66100215279778 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="113.32636923024766"
																				x="276.8"
																				y="56.673630769752336"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 276.8,56.673630769752336 h 22 v 113.32636923024766 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="118.62076856576205"
																				x="304.8"
																				y="51.37923143423795"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 304.8,51.37923143423795 h 22 v 118.62076856576205 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="117.32184326954045"
																				x="332.8"
																				y="52.67815673045955"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 332.8,52.67815673045955 h 22 v 117.32184326954045 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="105.72156866068856"
																				x="360.8"
																				y="64.27843133931144"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 360.8,64.27843133931144 h 22 v 105.72156866068856 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="112.19098028579663"
																				x="388.8"
																				y="57.80901971420337"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 388.8,57.80901971420337 h 22 v 112.19098028579663 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="108.59750309358736"
																				x="416.8"
																				y="61.40249690641264"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 416.8,61.40249690641264 h 22 v 108.59750309358736 h -22 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
							<div class="border-b">
								<div
									class="1xl:px-28 mx-auto flex flex-col gap-10 px-5 py-16 lg:px-16 2xl:px-32"
								>
									<div class="grid grid-cols-12 gap-6">
										<div class="col-span-12 lg:col-span-5">
											<div class="sticky top-32 space-y-6">
												<div class="space-y-1">
													<div class="flex items-center space-x-2">
														<p class="text-base capitalize">
															Disk IO Bandwidth
														</p>
													</div>
													<div class="grid gap-4">
														<p class="text-scale-1000 pr-8 text-sm">
															The disk performance of your workload is
															determined by the Disk IO bandwidth.
														</p>
														<p class="text-scale-1000 pr-8 text-sm">
															Smaller compute instances (below 4XL) can burst up
															to their largest throughput and IOPS for 30
															minutes in a day. Beyond that, the performance
															reverts to the baseline. Your disk budget gets
															replenished throughout the day.
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
											<div class="space-y-1">
												<p>Disk IO Bandwidth</p>
												<p class="text-scale-1000 text-sm">
													Your current compute can burst up to 2,085 Mbps for 30
													minutes a day and reverts to the baseline performance
													of 87 Mbps.
												</p>
											</div>
											<div>
												<p class="mb-2 text-sm">Overview</p>
												<div
													class="flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Current compute instance
													</p>
													<p class="text-xs">Micro</p>
												</div>
												<div
													class="flex items-center justify-between border-b py-1"
												>
													<p class="text-scale-1000 text-xs">
														Maximum IO Bandwidth (burst limit)
													</p>
													<p class="text-xs">2,085 Mbps</p>
												</div>
												<div
													class="flex items-center justify-between border-b py-1"
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
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts30-clip">
																	<rect
																		x="50"
																		y="0"
																		height="170"
																		width="392"
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
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="127.5"
																		x2="442"
																		y2="127.5"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="85"
																		x2="442"
																		y2="85"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="42.5"
																		x2="442"
																		y2="42.5"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="50"
																		y="0"
																		width="392"
																		height="170"
																		offset="[object Object]"
																		x1="50"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="392"
																	height="30"
																	type="category"
																	x="50"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="50"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="92"
																			y1="176"
																			x2="92"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="92"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="92" dy="0.71em">28 May</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="176"
																			y1="176"
																			x2="176"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="176"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="176" dy="0.71em">31 May</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="232"
																			y1="176"
																			x2="232"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="232"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="232" dy="0.71em">02 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="288"
																			y1="176"
																			x2="288"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="288"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="288" dy="0.71em">04 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="344"
																			y1="176"
																			x2="344"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="344"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="344" dy="0.71em">06 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="50"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428"
																			y1="176"
																			x2="428"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="392"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="42"
																			y="12"
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
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="52.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 52.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="80.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 80.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="108.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 108.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="136.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 136.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="164.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 164.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="192.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 192.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="220.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 220.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="248.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 248.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="276.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 276.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="304.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 304.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="332.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 332.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="360.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 360.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="388.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 388.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="1.6999999999999886"
																				x="416.8"
																				y="168.3"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 416.8,168.3 h 22 v 1.6999999999999886 h -22 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
						<div class="border-b">
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
							<div class="border-b">
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
															style="width: 12.5631%"
														></div>
													</div>
												</div>
												<div>
													<div
														class="flex items-center justify-between border-b py-1"
													>
														<p class="text-scale-1000 text-xs">
															Included in free plan
														</p>
														<p class="text-xs">2 GB</p>
													</div>
													<div class="flex items-center justify-between py-1">
														<p class="text-scale-1000 text-xs">
															Used in period
														</p>
														<p class="text-xs">257.29 MB</p>
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
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts17-clip">
																	<rect
																		x="56"
																		y="0"
																		height="170"
																		width="386"
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
																		width="386"
																		height="170"
																		offset="[object Object]"
																		x1="56"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="56"
																		y="0"
																		width="386"
																		height="170"
																		offset="[object Object]"
																		x1="56"
																		y1="123.38079205266456"
																		x2="442"
																		y2="123.38079205266456"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="56"
																		y="0"
																		width="386"
																		height="170"
																		offset="[object Object]"
																		x1="56"
																		y1="76.76158410532913"
																		x2="442"
																		y2="76.76158410532913"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="56"
																		y="0"
																		width="386"
																		height="170"
																		offset="[object Object]"
																		x1="56"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="386"
																	height="30"
																	type="category"
																	x="56"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="56"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="56"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="97.35714285714286"
																			y1="176"
																			x2="97.35714285714286"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="97.35714285714286"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="97.35714285714286" dy="0.71em">
																				28 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="56"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="180.07142857142856"
																			y1="176"
																			x2="180.07142857142856"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="180.07142857142856"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="180.07142857142856" dy="0.71em">
																				31 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="56"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="235.21428571428572"
																			y1="176"
																			x2="235.21428571428572"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="235.21428571428572"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="235.21428571428572" dy="0.71em">
																				02 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="56"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="290.35714285714283"
																			y1="176"
																			x2="290.35714285714283"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="290.35714285714283"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="290.35714285714283" dy="0.71em">
																				04 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="56"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="345.5"
																			y1="176"
																			x2="345.5"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="345.5"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="345.5" dy="0.71em">
																				06 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="56"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428.2142857142857"
																			y1="176"
																			x2="428.2142857142857"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="386"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="48"
																			y="12"
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
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.0490830330873564"
																				id="2e018165-e6d7-4334-8424-440eb90869c7"
																				x="58.75714285714286"
																				y="169.95091696691264"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 58.75714285714286,169.95091696691264 h 22 v 0.0490830330873564 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.049080702126957476"
																				id="c3d0eb97-6365-4d1d-8f09-9d03f77ccf78"
																				x="86.32857142857142"
																				y="169.95091929787304"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 86.32857142857142,169.95091929787304 h 22 v 0.049080702126957476 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.04908536404775532"
																				id="490207e3-b64a-4c4d-a2c4-3392724aaef2"
																				x="113.89999999999999"
																				y="169.95091463595224"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 113.89999999999999,169.95091463595224 h 22 v 0.04908536404775532 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.049092356928952086"
																				id="74395528-75b8-4aa9-b318-9b0352b1431a"
																				x="141.4714285714286"
																				y="169.95090764307105"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 141.4714285714286,169.95090764307105 h 22 v 0.049092356928952086 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.04908769500812582"
																				id="14634dce-114f-4a19-8b8b-850a9de321e9"
																				x="169.04285714285714"
																				y="169.95091230499187"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 169.04285714285714,169.95091230499187 h 22 v 0.04908769500812582 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.04911333557251396"
																				id="26ed4771-0be9-486e-9097-673f53b13a92"
																				x="196.61428571428573"
																				y="169.9508866644275"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 196.61428571428573,169.9508866644275 h 22 v 0.04911333557251396 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="0.049080702126957476"
																				id="bbb1e656-113f-474f-af2e-63f7fb68fe70"
																				x="224.1857142857143"
																				y="169.95091929787304"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 224.1857142857143,169.95091929787304 h 22 v 0.049080702126957476 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="57.980900988041995"
																				id="1538041e-6788-4363-977f-60f24b4f0b7f"
																				x="251.75714285714287"
																				y="112.019099011958"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 251.75714285714287,112.019099011958 h 22 v 57.980900988041995 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="64.28092284970823"
																				id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																				x="279.3285714285714"
																				y="105.71907715029177"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 279.3285714285714,105.71907715029177 h 22 v 64.28092284970823 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="72.07136778233196"
																				id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																				x="306.90000000000003"
																				y="97.92863221766804"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 306.90000000000003,97.92863221766804 h 22 v 72.07136778233196 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="103.25782305959338"
																				id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																				x="334.4714285714286"
																				y="66.74217694040662"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 334.4714285714286,66.74217694040662 h 22 v 103.25782305959338 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="127.53389915705891"
																				id="85870b87-b633-44ad-9d71-8a432f980f6b"
																				x="362.04285714285714"
																				y="42.46610084294109"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 362.04285714285714,42.46610084294109 h 22 v 127.53389915705891 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="33.400760430581585"
																				id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																				x="389.61428571428576"
																				y="136.59923956941842"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 389.61428571428576,136.59923956941842 h 22 v 33.400760430581585 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="8a884202-b876-4658-9332-bd98610d45b1"
																				x="417.1857142857143"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 417.1857142857143,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
							<div class="border-b">
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
															All requests to view and download your storage
															items go through our CDN. We sum up all outgoing
															traffic (egress) for storage related requests
															through our CDN. We do not differentiate between
															cache and no cache hits.
														</p>
														<p class="text-scale-1000 pr-8 text-sm">
															Billing is based on the total amount of egress in
															GB throughout your billing period.
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
															style="width: 7.5051%"
														></div>
													</div>
												</div>
												<div>
													<div
														class="flex items-center justify-between border-b py-1"
													>
														<p class="text-scale-1000 text-xs">
															Included in free plan
														</p>
														<p class="text-xs">2 GB</p>
													</div>
													<div class="flex items-center justify-between py-1">
														<p class="text-scale-1000 text-xs">
															Used in period
														</p>
														<p class="text-xs">153.7 MB</p>
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
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts24-clip">
																	<rect
																		x="54"
																		y="0"
																		height="170"
																		width="388"
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
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="126.24151630504696"
																		x2="442"
																		y2="126.24151630504696"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="82.48303261009393"
																		x2="442"
																		y2="82.48303261009393"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="388"
																	height="30"
																	type="category"
																	x="54"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="54"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="95.57142857142858"
																			y1="176"
																			x2="95.57142857142858"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="95.57142857142858"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="95.57142857142858" dy="0.71em">
																				28 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="178.71428571428572"
																			y1="176"
																			x2="178.71428571428572"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="178.71428571428572"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="178.71428571428572" dy="0.71em">
																				31 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="234.14285714285714"
																			y1="176"
																			x2="234.14285714285714"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="234.14285714285714"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="234.14285714285714" dy="0.71em">
																				02 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="289.57142857142856"
																			y1="176"
																			x2="289.57142857142856"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="289.57142857142856"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="289.57142857142856" dy="0.71em">
																				04 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="345"
																			y1="176"
																			x2="345"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="345"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="345" dy="0.71em">06 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428.1428571428571"
																			y1="176"
																			x2="428.1428571428571"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="14"
																			y="0"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="none"
																			fill="none"
																			x1="48"
																			y1="126.24151630504696"
																			x2="54"
																			y2="126.24151630504696"
																		></line>
																		<text
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
																			x="46"
																			y="126.24151630504696"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="end"
																		>
																			<tspan x="46" dy="0.355em">8MB</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
																			x="14"
																			y="0"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="none"
																			fill="none"
																			x1="48"
																			y1="82.48303261009393"
																			x2="54"
																			y2="82.48303261009393"
																		></line>
																		<text
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
																			x="46"
																			y="82.48303261009393"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="end"
																		>
																			<tspan x="46" dy="0.355em">16MB</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
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
																			type="number"
																			x="46"
																			y="12"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="end"
																		>
																			<tspan x="46" dy="0.355em">31MB</tspan>
																		</text>
																	</g>
																</g>
															</g>
															<g class="recharts-layer recharts-bar">
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="141.66250017261132"
																				id="1538041e-6788-4363-977f-60f24b4f0b7f"
																				x="250.77142857142857"
																				y="28.337499827388672"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 250.77142857142857,28.337499827388672 h 22 v 141.66250017261132 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="151.9045902740244"
																				id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																				x="278.48571428571427"
																				y="18.09540972597559"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 278.48571428571427,18.09540972597559 h 22 v 151.9045902740244 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="112.5090487699051"
																				id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																				x="306.2"
																				y="57.49095123009489"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 306.2,57.49095123009489 h 22 v 112.5090487699051 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																				x="333.9142857142857"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 333.9142857142857,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="113.36942807631529"
																				id="85870b87-b633-44ad-9d71-8a432f980f6b"
																				x="361.62857142857143"
																				y="56.63057192368471"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 361.62857142857143,56.63057192368471 h 22 v 113.36942807631529 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="95.1966482031101"
																				id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																				x="389.3428571428571"
																				y="74.8033517968899"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 389.3428571428571,74.8033517968899 h 22 v 95.1966482031101 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="45.074321891887905"
																				id="8a884202-b876-4658-9332-bd98610d45b1"
																				x="417.0571428571428"
																				y="124.9256781081121"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 417.0571428571428,124.9256781081121 h 22 v 45.074321891887905 h -22 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
						<div class="border-b">
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
							<div class="border-b">
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
															Billing is based on the average daily database
															size in GB throughout the billing period.
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
															style="width: 14.8907%"
														></div>
													</div>
												</div>
												<div>
													<div
														class="flex items-center justify-between border-b py-1"
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
														<p class="text-xs">76.24 MB</p>
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
												<p>Average Database size per day</p>
												<p class="text-scale-1000 text-sm">
													The data refreshes every 24 hours.
												</p>
											</div>
											<div class="h-[200px] w-full">
												<div
													class="recharts-responsive-container"
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts20-clip">
																	<rect
																		x="54"
																		y="0"
																		height="170"
																		width="388"
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
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="127.33562268708883"
																		x2="442"
																		y2="127.33562268708883"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="84.67124537417764"
																		x2="442"
																		y2="84.67124537417764"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="388"
																	height="30"
																	type="category"
																	x="54"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="54"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="95.57142857142858"
																			y1="176"
																			x2="95.57142857142858"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="95.57142857142858"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="95.57142857142858" dy="0.71em">
																				28 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="178.71428571428572"
																			y1="176"
																			x2="178.71428571428572"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="178.71428571428572"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="178.71428571428572" dy="0.71em">
																				31 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="234.14285714285714"
																			y1="176"
																			x2="234.14285714285714"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="234.14285714285714"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="234.14285714285714" dy="0.71em">
																				02 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="289.57142857142856"
																			y1="176"
																			x2="289.57142857142856"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="289.57142857142856"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="289.57142857142856" dy="0.71em">
																				04 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="345"
																			y1="176"
																			x2="345"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="345"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="345" dy="0.71em">06 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428.1428571428571"
																			y1="176"
																			x2="428.1428571428571"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="46"
																			y="12"
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
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="167.76315789473682"
																				id="2e018165-e6d7-4334-8424-440eb90869c7"
																				x="56.77142857142857"
																				y="2.2368421052631646"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 56.77142857142857,2.2368421052631646 h 22 v 167.76315789473682 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="167.76315789473682"
																				id="c3d0eb97-6365-4d1d-8f09-9d03f77ccf78"
																				x="84.4857142857143"
																				y="2.2368421052631646"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 84.4857142857143,2.2368421052631646 h 22 v 167.76315789473682 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="167.76315789473682"
																				id="490207e3-b64a-4c4d-a2c4-3392724aaef2"
																				x="112.2"
																				y="2.2368421052631646"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 112.2,2.2368421052631646 h 22 v 167.76315789473682 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="167.76315789473682"
																				id="74395528-75b8-4aa9-b318-9b0352b1431a"
																				x="139.9142857142857"
																				y="2.2368421052631646"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 139.9142857142857,2.2368421052631646 h 22 v 167.76315789473682 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="167.76315789473682"
																				id="14634dce-114f-4a19-8b8b-850a9de321e9"
																				x="167.62857142857143"
																				y="2.2368421052631646"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 167.62857142857143,2.2368421052631646 h 22 v 167.76315789473682 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="167.76315789473682"
																				id="26ed4771-0be9-486e-9097-673f53b13a92"
																				x="195.34285714285716"
																				y="2.2368421052631646"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 195.34285714285716,2.2368421052631646 h 22 v 167.76315789473682 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="167.76315789473682"
																				id="bbb1e656-113f-474f-af2e-63f7fb68fe70"
																				x="223.05714285714285"
																				y="2.2368421052631646"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 223.05714285714285,2.2368421052631646 h 22 v 167.76315789473682 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="1538041e-6788-4363-977f-60f24b4f0b7f"
																				x="250.77142857142857"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 250.77142857142857,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																				x="278.48571428571427"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 278.48571428571427,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																				x="306.2"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 306.2,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																				x="333.9142857142857"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 333.9142857142857,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="85870b87-b633-44ad-9d71-8a432f980f6b"
																				x="361.62857142857143"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 361.62857142857143,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																				x="389.3428571428571"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 389.3428571428571,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="8a884202-b876-4658-9332-bd98610d45b1"
																				x="417.0571428571428"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 417.0571428571428,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
							<div class="border-b">
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
															Billing is based on the average size in GB
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
														<p class="text-sm">Storage Size usage</p>
													</div>
												</div>
												<div class="flex w-full flex-col">
													<div
														class="relative h-1 w-full overflow-hidden rounded border border-none bg-gray-300 p-0 dark:bg-gray-600"
													>
														<div
															class="bg-scale-1100 absolute inset-x-0 bottom-0 h-1 rounded transition-all"
															style="width: 8.99066%"
														></div>
													</div>
												</div>
												<div>
													<div
														class="flex items-center justify-between border-b py-1"
													>
														<p class="text-scale-1000 text-xs">
															Included in free plan
														</p>
														<p class="text-xs">1 GB</p>
													</div>
													<div class="flex items-center justify-between py-1">
														<p class="text-scale-1000 text-xs">Max in period</p>
														<p class="text-xs">92.06 MB</p>
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
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts34-clip">
																	<rect
																		x="54"
																		y="0"
																		height="170"
																		width="388"
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
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="125.97519516118295"
																		x2="442"
																		y2="125.97519516118295"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="81.95039032236589"
																		x2="442"
																		y2="81.95039032236589"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="54"
																		y="0"
																		width="388"
																		height="170"
																		offset="[object Object]"
																		x1="54"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="388"
																	height="30"
																	type="category"
																	x="54"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="54"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="95.57142857142858"
																			y1="176"
																			x2="95.57142857142858"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="95.57142857142858"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="95.57142857142858" dy="0.71em">
																				28 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="178.71428571428572"
																			y1="176"
																			x2="178.71428571428572"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="178.71428571428572"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="178.71428571428572" dy="0.71em">
																				31 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="234.14285714285714"
																			y1="176"
																			x2="234.14285714285714"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="234.14285714285714"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="234.14285714285714" dy="0.71em">
																				02 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="289.57142857142856"
																			y1="176"
																			x2="289.57142857142856"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="289.57142857142856"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="289.57142857142856" dy="0.71em">
																				04 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="345"
																			y1="176"
																			x2="345"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="345"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="345" dy="0.71em">06 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="54"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428.1428571428571"
																			y1="176"
																			x2="428.1428571428571"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="388"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="46"
																			y="12"
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
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="2e018165-e6d7-4334-8424-440eb90869c7"
																				x="56.77142857142857"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 56.77142857142857,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="c3d0eb97-6365-4d1d-8f09-9d03f77ccf78"
																				x="84.4857142857143"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 84.4857142857143,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="490207e3-b64a-4c4d-a2c4-3392724aaef2"
																				x="112.2"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 112.2,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="74395528-75b8-4aa9-b318-9b0352b1431a"
																				x="139.9142857142857"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 139.9142857142857,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="14634dce-114f-4a19-8b8b-850a9de321e9"
																				x="167.62857142857143"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 167.62857142857143,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="26ed4771-0be9-486e-9097-673f53b13a92"
																				x="195.34285714285716"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 195.34285714285716,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="bbb1e656-113f-474f-af2e-63f7fb68fe70"
																				x="223.05714285714285"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 223.05714285714285,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="161.22498998746454"
																				id="1538041e-6788-4363-977f-60f24b4f0b7f"
																				x="250.77142857142857"
																				y="8.77501001253546"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 250.77142857142857,8.77501001253546 h 22 v 161.22498998746454 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="164.1493552588049"
																				id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																				x="278.48571428571427"
																				y="5.8506447411951"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 278.48571428571427,5.8506447411951 h 22 v 164.1493552588049 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="169.94771438078124"
																				id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																				x="306.2"
																				y="0.052285619218763735"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 306.2,0.052285619218763735 h 22 v 169.94771438078124 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="169.94771438078124"
																				id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																				x="333.9142857142857"
																				y="0.052285619218763735"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 333.9142857142857,0.052285619218763735 h 22 v 169.94771438078124 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="168.85404313500658"
																				id="85870b87-b633-44ad-9d71-8a432f980f6b"
																				x="361.62857142857143"
																				y="1.145956864993436"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 361.62857142857143,1.145956864993436 h 22 v 168.85404313500658 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																				x="389.3428571428571"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 389.3428571428571,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="22"
																				height="170"
																				id="8a884202-b876-4658-9332-bd98610d45b1"
																				x="417.0571428571428"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 417.0571428571428,0 h 22 v 170 h -22 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
							<div class="border-b">
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
															Billing is based on the maximum amount of
															functions at any point in time throughout your
															billing period.
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
														class="flex items-center justify-between border-b py-1"
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
																		<line
																			x1="18"
																			y1="20"
																			x2="18"
																			y2="10"
																		></line>
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
						<div class="border-b">
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
							<div class="border-b">
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
															style="width: 0.014%"
														></div>
													</div>
												</div>
												<div>
													<div
														class="flex items-center justify-between border-b py-1"
													>
														<p class="text-scale-1000 text-xs">
															Included in free plan
														</p>
														<p class="text-xs">50,000</p>
													</div>
													<div class="flex items-center justify-between py-1">
														<p class="text-scale-1000 text-xs">
															Used in period
														</p>
														<p class="text-xs">7</p>
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
													style="width: 100%; height: 200px"
													width="442.078125"
													height="200"
												>
													<div
														class="recharts-wrapper"
														style="
															position: relative;
															cursor: default;
															width: 442px;
															height: 200px;
														"
													>
														<svg
															class="recharts-surface"
															width="442"
															height="200"
															viewBox="0 0 442 200"
															version="1.1"
														>
															<defs>
																<clipPath id="recharts37-clip">
																	<rect
																		x="58"
																		y="0"
																		height="170"
																		width="384"
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
																		width="384"
																		height="170"
																		offset="[object Object]"
																		x1="58"
																		y1="170"
																		x2="442"
																		y2="170"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="58"
																		y="0"
																		width="384"
																		height="170"
																		offset="[object Object]"
																		x1="58"
																		y1="121.42857142857143"
																		x2="442"
																		y2="121.42857142857143"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="58"
																		y="0"
																		width="384"
																		height="170"
																		offset="[object Object]"
																		x1="58"
																		y1="72.85714285714286"
																		x2="442"
																		y2="72.85714285714286"
																	></line>
																	<line
																		stroke-dasharray="3 3"
																		class="stroke-scale-800"
																		stroke="#ccc"
																		fill="none"
																		x="58"
																		y="0"
																		width="384"
																		height="170"
																		offset="[object Object]"
																		x1="58"
																		y1="0"
																		x2="442"
																		y2="0"
																	></line>
																</g>
															</g>
															<g
																class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
															>
																<line
																	orientation="bottom"
																	width="384"
																	height="30"
																	type="category"
																	x="58"
																	y="170"
																	class="recharts-cartesian-axis-line"
																	stroke="#666"
																	fill="none"
																	x1="58"
																	y1="170"
																	x2="442"
																	y2="170"
																></line>
																<g class="recharts-cartesian-axis-ticks">
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="58"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="99.14285714285714"
																			y1="176"
																			x2="99.14285714285714"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="99.14285714285714"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="99.14285714285714" dy="0.71em">
																				28 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="58"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="181.42857142857144"
																			y1="176"
																			x2="181.42857142857144"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="181.42857142857144"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="181.42857142857144" dy="0.71em">
																				31 May
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="58"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="236.28571428571428"
																			y1="176"
																			x2="236.28571428571428"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="236.28571428571428"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="236.28571428571428" dy="0.71em">
																				02 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="58"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="291.14285714285717"
																			y1="176"
																			x2="291.14285714285717"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="291.14285714285717"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="291.14285714285717" dy="0.71em">
																				04 Jun
																			</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="58"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="346"
																			y1="176"
																			x2="346"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="346"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="346" dy="0.71em">06 Jun</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="58"
																			y="170"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="#666"
																			fill="none"
																			x1="428.2857142857143"
																			y1="176"
																			x2="428.2857142857143"
																			y2="170"
																		></line>
																		<text
																			orientation="bottom"
																			width="384"
																			height="30"
																			type="category"
																			x="417.140625"
																			y="178"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="middle"
																		>
																			<tspan x="417.140625" dy="0.71em">
																				09 Jun
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
																			type="number"
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
																			type="number"
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
																			type="number"
																			x="18"
																			y="0"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="none"
																			fill="none"
																			x1="52"
																			y1="121.42857142857143"
																			x2="58"
																			y2="121.42857142857143"
																		></line>
																		<text
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
																			x="50"
																			y="121.42857142857143"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="end"
																		>
																			<tspan x="50" dy="0.355em">2</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
																			x="18"
																			y="0"
																			class="recharts-cartesian-axis-tick-line"
																			stroke="none"
																			fill="none"
																			x1="52"
																			y1="72.85714285714286"
																			x2="58"
																			y2="72.85714285714286"
																		></line>
																		<text
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
																			x="50"
																			y="72.85714285714286"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="end"
																		>
																			<tspan x="50" dy="0.355em">4</tspan>
																		</text>
																	</g>
																	<g
																		class="recharts-layer recharts-cartesian-axis-tick"
																	>
																		<line
																			width="40"
																			orientation="left"
																			height="170"
																			type="number"
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
																			type="number"
																			x="50"
																			y="12"
																			stroke="none"
																			fill="#666"
																			class="recharts-text recharts-cartesian-axis-tick-value"
																			text-anchor="end"
																		>
																			<tspan x="50" dy="0.355em">7</tspan>
																		</text>
																	</g>
																</g>
															</g>
															<g class="recharts-layer recharts-bar">
																<g
																	class="recharts-layer recharts-bar-rectangles"
																>
																	<g class="recharts-layer">
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		></g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="21"
																				height="72.85714285714286"
																				id="1538041e-6788-4363-977f-60f24b4f0b7f"
																				x="252.74285714285713"
																				y="97.14285714285714"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 252.74285714285713,97.14285714285714 h 21 v 72.85714285714286 h -21 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="21"
																				height="97.14285714285714"
																				id="ecc7bb97-c873-4913-b8cf-3bca99b43e5e"
																				x="280.1714285714286"
																				y="72.85714285714286"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 280.1714285714286,72.85714285714286 h 21 v 97.14285714285714 h -21 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="21"
																				height="97.14285714285714"
																				id="3120ed49-fabe-4ed6-b539-da5877a9ca48"
																				x="307.59999999999997"
																				y="72.85714285714286"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 307.59999999999997,72.85714285714286 h 21 v 97.14285714285714 h -21 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="21"
																				height="97.14285714285714"
																				id="b255390a-6d16-4f7d-bf1d-f76c360c06c4"
																				x="335.0285714285714"
																				y="72.85714285714286"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 335.0285714285714,72.85714285714286 h 21 v 97.14285714285714 h -21 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="21"
																				height="121.42857142857143"
																				id="85870b87-b633-44ad-9d71-8a432f980f6b"
																				x="362.45714285714286"
																				y="48.57142857142857"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 362.45714285714286,48.57142857142857 h 21 v 121.42857142857143 h -21 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="21"
																				height="145.7142857142857"
																				id="9b3d4642-7167-43c5-a946-6dc8548e9773"
																				x="389.88571428571424"
																				y="24.285714285714295"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 389.88571428571424,24.285714285714295 h 21 v 145.7142857142857 h -21 Z"
																			></path>
																		</g>
																		<g
																			class="recharts-layer recharts-bar-rectangle"
																		>
																			<path
																				width="21"
																				height="170"
																				id="8a884202-b876-4658-9332-bd98610d45b1"
																				x="417.3142857142857"
																				y="0"
																				class="recharts-rectangle fill-scale-1200"
																				radius="0"
																				d="M 417.3142857142857,0 h 21 v 170 h -21 Z"
																			></path>
																		</g>
																	</g>
																</g>
															</g>
														</svg>
														<div
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
							<div class="border-b">
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
							<div class="border-b">
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
															with just a single transformations. It counts as
															two, as only two images were transformed.
														</p>
														<p class="text-scale-1000 pr-8 text-sm">
															Billing is based on the count of (origin) images
															that used transformations throughout the billing
															period. Resets every billing cycle.
														</p>
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
							<div class="border-b">
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
															Every serverless function invocation independent
															of response status is counted.
														</p>
														<p class="text-scale-1000 pr-8 text-sm">
															Billing is based on the sum of all invocations
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
														<p class="text-sm">
															Edge Function Invocations usage
														</p>
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
														class="flex items-center justify-between border-b py-1"
													>
														<p class="text-scale-1000 text-xs">
															Included in free plan
														</p>
														<p class="text-xs">500,000</p>
													</div>
													<div class="flex items-center justify-between py-1">
														<p class="text-scale-1000 text-xs">
															Used in period
														</p>
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
																		<line
																			x1="18"
																			y1="20"
																			x2="18"
																			y2="10"
																		></line>
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
							<div class="border-b">
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
															clients listen to that change via Realtime, that's
															5 messages. If you broadcast a message and 4
															clients listen to that, that's 5 messages (1
															message sent, 4 received).
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
															href="https://supabase.com/docs/guides/realtime/rate-limits"
															><div
																class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
															>
																<p class="text-sm">Realtime Rate Limits</p>
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
														class="flex items-center justify-between border-b py-1"
													>
														<p class="text-scale-1000 text-xs">
															Included in free plan
														</p>
														<p class="text-xs">2,000,000</p>
													</div>
													<div class="flex items-center justify-between py-1">
														<p class="text-scale-1000 text-xs">
															Used in period
														</p>
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
																		<line
																			x1="18"
																			y1="20"
																			x2="18"
																			y2="10"
																		></line>
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
							<div class="border-b">
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
															Total number of successful connections.
															Connections attempts are not counted towards
															usage.
														</p>
														<p class="text-scale-1000 pr-8 text-sm">
															Billing is based on the maximum amount of
															concurrent peak connections throughout your
															billing period.
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
															href="https://supabase.com/docs/guides/realtime/rate-limits"
															><div
																class="flex items-center space-x-2 opacity-50 transition hover:opacity-100"
															>
																<p class="text-sm">Realtime Rate Limits</p>
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
														<p class="text-sm">
															Realtime Peak Connections usage
														</p>
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
														class="flex items-center justify-between border-b py-1"
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
																		<line
																			x1="18"
																			y1="20"
																			x2="18"
																			y2="10"
																		></line>
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
		</div>
	</main>
</template>
