<script setup>
	definePageMeta({ layout: 'client-reports' });
</script>

<template>
	<main class="flex-1 overflow-y-auto" style="max-height: 100vh">
		<div
			class="1xl:px-28 mx-auto flex flex-col gap-4 px-5 py-6 lg:px-16 xl:px-24 2xl:px-32"
		>
			<div class="flex flex-row items-center justify-between gap-4">
				<h1 class="text-scale-1200 text-2xl">API</h1>
				<button
					class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
					type="button"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon text-scale-1100"
					>
						<polyline points="23 4 23 10 17 10"></polyline>
						<polyline points="1 20 1 14 7 14"></polyline>
						<path
							d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
						></path></svg
					><span class="truncate">Refresh</span>
				</button>
			</div>
			<div class="flex w-full flex-col gap-1">
				<div>
					<div class="flex flex-row flex-wrap items-center justify-start gap-2">
						<div class="flex items-center">
							<button
								type="button"
								id="radix-298"
								aria-haspopup="menu"
								aria-expanded="false"
								data-state="closed"
								class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
							>
								<span
									class="font-regular bg-scale-1200 text-scale-100 hover:text-scale-800 focus-visible:text-scale-600 bordershadow-scale-1100 hover:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded rounded-r-none px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									><svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<polyline points="12 6 12 12 16 14"></polyline></svg
									><span class="truncate">Last 24 hours</span></span
								></button
							><button
								type="button"
								aria-haspopup="dialog"
								aria-expanded="false"
								aria-controls="radix-299"
								data-state="closed"
								class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
							>
								<span
									title="Custom"
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded rounded-l-none px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
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
										<rect
											x="3"
											y="4"
											width="18"
											height="18"
											rx="2"
											ry="2"
										></rect>
										<line x1="16" y1="2" x2="16" y2="6"></line>
										<line x1="8" y1="2" x2="8" y2="6"></line>
										<line x1="3" y1="10" x2="21" y2="10"></line></svg
									><span class="truncate">Custom</span></span
								>
							</button>
						</div>
						<button
							type="button"
							id="radix-300"
							aria-haspopup="menu"
							aria-expanded="false"
							data-state="closed"
							class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
						>
							<span
								class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex inline-flex cursor-pointer flex-row items-center gap-2 space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								><span class="truncate">All Requests</span
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
							></span></button
						><button
							type="button"
							aria-haspopup="dialog"
							aria-expanded="false"
							aria-controls="radix-301"
							data-state="closed"
							class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
						>
							<span
								class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="sbui-icon text-scale-1100"
								>
									<line x1="12" y1="5" x2="12" y2="19"></line>
									<line x1="5" y1="12" x2="19" y2="12"></line></svg
								><span class="truncate">Add filter</span></span
							>
						</button>
					</div>
				</div>
				<div class="h-2 w-full"></div>
			</div>
			<div
				class="border-panel-border-light dark:border-panel-border-dark undefined rounded-md border pb-0 shadow-sm"
			>
				<div class="bg-panel-body-light dark:bg-panel-body-dark h-full">
					<div class="space-y-4 px-6 py-4">
						<div class="flex flex-row items-start justify-between">
							<div class="gap-2">
								<div class="flex flex-row gap-2">
									<h3 class="h-6 w-full">Total Requests</h3>
								</div>
								<p class="text-scale-1100 text-sm"></p>
							</div>
							<button data-state="closed">
								<button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-1 px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
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
									</svg>
								</button>
							</button>
						</div>
						<div class="relative">
							<div class="transition-opacity duration-300">
								<div class="flex w-full flex-col gap-3">
									<div
										class="flex flex-row items-center gap-x-4"
										style="min-height: 1.8rem"
									>
										<div class="flex flex-row items-baseline gap-x-2">
											<h5 class="text-scale-1200 text-base text-xl font-normal">
												6380<span class="text-lg"></span>
											</h5>
											<h5 class="text-scale-900 text-xs"></h5>
										</div>
									</div>
									<div
										class="recharts-responsive-container"
										style="
											width: 100%;
											height: 96px;
											min-width: 0px;
											min-height: 96px;
										"
										width="545"
										height="96"
									>
										<div
											class="recharts-wrapper overflow-visible"
											role="region"
											style="
												position: relative;
												cursor: default;
												width: 545px;
												height: 96px;
											"
										>
											<svg
												class="recharts-surface"
												width="545"
												height="96"
												viewBox="0 0 545 96"
											>
												<title></title>
												<desc></desc>
												<defs>
													<clipPath id="recharts42-clip">
														<rect x="0" y="0" height="66" width="545"></rect>
													</clipPath>
												</defs>
												<g
													class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
												>
													<line
														angle="0"
														orientation="bottom"
														width="545"
														height="30"
														x="0"
														y="66"
														class="recharts-cartesian-axis-line"
														stroke="var(--colors-scale6)"
														fill="none"
														x1="0"
														y1="66"
														x2="545"
														y2="66"
													></line>
													<g class="recharts-cartesian-axis-ticks"></g>
												</g>
												<g class="recharts-layer recharts-bar">
													<g class="recharts-layer recharts-bar-rectangles">
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="22.494999999999997"
																x="1.5138888888888888"
																y="43.505"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 1.5138888888888888,43.505 h 12 v 22.494999999999997 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="24.695"
																x="16.65277777777778"
																y="41.305"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 16.65277777777778,41.305 h 12 v 24.695 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="0.21999999999999886"
																x="31.791666666666668"
																y="65.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 31.791666666666668,65.78 h 12 v 0.21999999999999886 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="0.21999999999999886"
																x="77.20833333333333"
																y="65.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 77.20833333333333,65.78 h 12 v 0.21999999999999886 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="0.21999999999999886"
																x="122.625"
																y="65.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 122.625,65.78 h 12 v 0.21999999999999886 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="0.21999999999999886"
																x="168.04166666666666"
																y="65.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 168.04166666666666,65.78 h 12 v 0.21999999999999886 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														></g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="8.195"
																x="198.31944444444446"
																y="57.805"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 198.31944444444446,57.805 h 12 v 8.195 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="29.424999999999997"
																x="213.45833333333334"
																y="36.575"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 213.45833333333334,36.575 h 12 v 29.424999999999997 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="45.595"
																x="228.59722222222223"
																y="20.405"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 228.59722222222223,20.405 h 12 v 45.595 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="60.995000000000005"
																x="243.73611111111111"
																y="5.004999999999998"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 243.73611111111111,5.004999999999998 h 12 v 60.995000000000005 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="4.840000000000003"
																x="258.87500000000006"
																y="61.16"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 258.87500000000006,61.16 h 12 v 4.840000000000003 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														></g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="4.785000000000004"
																x="289.1527777777778"
																y="61.214999999999996"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 289.1527777777778,61.214999999999996 h 12 v 4.785000000000004 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="9.349999999999994"
																x="304.2916666666667"
																y="56.650000000000006"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 304.2916666666667,56.650000000000006 h 12 v 9.349999999999994 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="28.875"
																x="319.4305555555556"
																y="37.125"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 319.4305555555556,37.125 h 12 v 28.875 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="28.985"
																x="334.56944444444446"
																y="37.015"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 334.56944444444446,37.015 h 12 v 28.985 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="33.22"
																x="349.70833333333337"
																y="32.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 349.70833333333337,32.78 h 12 v 33.22 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="14.740000000000002"
																x="364.8472222222223"
																y="51.26"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 364.8472222222223,51.26 h 12 v 14.740000000000002 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="30.415"
																x="379.98611111111114"
																y="35.585"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 379.98611111111114,35.585 h 12 v 30.415 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="0.21999999999999886"
																x="395.12500000000006"
																y="65.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 395.12500000000006,65.78 h 12 v 0.21999999999999886 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="0.21999999999999886"
																x="440.5416666666667"
																y="65.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 440.5416666666667,65.78 h 12 v 0.21999999999999886 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="0.21999999999999886"
																x="485.95833333333337"
																y="65.78"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 485.95833333333337,65.78 h 12 v 0.21999999999999886 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="2.75"
																x="531.375"
																y="63.25"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 531.375,63.25 h 12 v 2.75 h -12 Z"
															></path>
														</g>
													</g>
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
									<div
										class="text-scale-900 -mt-9 flex items-center justify-between text-xs"
									>
										<span>Jun 18, 2023, 12:00am</span
										><span>Jun 19, 2023, 11:00am</span>
									</div>
								</div>
							</div>
						</div>
						<div class="table-container">
							<table class="table">
								<thead>
									<tr>
										<th
											class="!bg-scale-400 p-0 p-3 !py-2 px-4 text-left !text-xs font-bold"
										>
											Request
										</th>
										<th
											class="!bg-scale-400 p-0 p-3 !py-2 px-4 text-left text-right !text-xs font-bold"
										>
											Count
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-309"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-green-500 text-center font-mono text-xs"
														>200</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/auth/v1/user</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
														></span>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-309"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">2820</td>
									</tr>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-310"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-green-500 text-center font-mono text-xs"
														>200</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/rest/v1/organizations</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
															>?select=id,name</span
														>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-310"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">1530</td>
									</tr>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-311"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-green-500 text-center font-mono text-xs"
														>200</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/rest/v1/</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
														></span>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-311"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">294</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div
				class="border-panel-border-light dark:border-panel-border-dark undefined rounded-md border pb-0 shadow-sm"
			>
				<div class="bg-panel-body-light dark:bg-panel-body-dark h-full">
					<div class="space-y-4 px-6 py-4">
						<div class="flex flex-row items-start justify-between">
							<div class="gap-2">
								<div class="flex flex-row gap-2">
									<h3 class="h-6 w-full">Response Errors</h3>
									<button data-state="closed">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon text-scale-1100"
										>
											<circle cx="12" cy="12" r="10"></circle>
											<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
											<line x1="12" y1="17" x2="12.01" y2="17"></line>
										</svg>
									</button>
								</div>
								<p class="text-scale-1100 text-sm"></p>
							</div>
							<button data-state="closed">
								<button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-1 px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
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
									</svg>
								</button>
							</button>
						</div>
						<div class="relative">
							<div class="transition-opacity duration-300">
								<div class="flex w-full flex-col gap-3">
									<div
										class="flex flex-row items-center gap-x-4"
										style="min-height: 1.8rem"
									>
										<div class="flex flex-row items-baseline gap-x-2">
											<h5 class="text-scale-1200 text-base text-xl font-normal">
												197<span class="text-lg"></span>
											</h5>
											<h5 class="text-scale-900 text-xs"></h5>
										</div>
									</div>
									<div
										class="recharts-responsive-container"
										style="
											width: 100%;
											height: 96px;
											min-width: 0px;
											min-height: 96px;
										"
										width="545"
										height="96"
									>
										<div
											class="recharts-wrapper overflow-visible"
											role="region"
											style="
												position: relative;
												cursor: default;
												width: 545px;
												height: 96px;
											"
										>
											<svg
												class="recharts-surface"
												width="545"
												height="96"
												viewBox="0 0 545 96"
											>
												<title></title>
												<desc></desc>
												<defs>
													<clipPath id="recharts45-clip">
														<rect x="0" y="0" height="66" width="545"></rect>
													</clipPath>
												</defs>
												<g
													class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
												>
													<line
														angle="0"
														orientation="bottom"
														width="545"
														height="30"
														x="0"
														y="66"
														class="recharts-cartesian-axis-line"
														stroke="var(--colors-scale6)"
														fill="none"
														x1="0"
														y1="66"
														x2="545"
														y2="66"
													></line>
													<g class="recharts-cartesian-axis-ticks"></g>
												</g>
												<g class="recharts-layer recharts-bar">
													<g class="recharts-layer recharts-bar-rectangles">
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="48.39999999999999"
																x="1.5138888888888888"
																y="17.600000000000005"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 1.5138888888888888,17.600000000000005 h 12 v 48.39999999999999 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="8.799999999999997"
																x="16.65277777777778"
																y="57.2"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 16.65277777777778,57.2 h 12 v 8.799999999999997 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="31.791666666666668"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 31.791666666666668,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="77.20833333333333"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 77.20833333333333,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="122.625"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 122.625,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="168.04166666666666"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 168.04166666666666,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="34.10000000000001"
																x="213.45833333333334"
																y="31.899999999999995"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 213.45833333333334,31.899999999999995 h 12 v 34.10000000000001 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="7.700000000000003"
																x="228.59722222222223"
																y="58.3"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 228.59722222222223,58.3 h 12 v 7.700000000000003 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="37.4"
																x="243.73611111111111"
																y="28.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 243.73611111111111,28.6 h 12 v 37.4 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="8.799999999999997"
																x="258.87500000000006"
																y="57.2"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 258.87500000000006,57.2 h 12 v 8.799999999999997 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														></g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="2.200000000000003"
																x="289.1527777777778"
																y="63.8"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 289.1527777777778,63.8 h 12 v 2.200000000000003 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="5.5"
																x="304.2916666666667"
																y="60.5"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 304.2916666666667,60.5 h 12 v 5.5 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="1.1000000000000085"
																x="319.4305555555556"
																y="64.89999999999999"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 319.4305555555556,64.89999999999999 h 12 v 1.1000000000000085 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="5.5"
																x="334.56944444444446"
																y="60.5"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 334.56944444444446,60.5 h 12 v 5.5 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="21.999999999999993"
																x="349.70833333333337"
																y="44.00000000000001"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 349.70833333333337,44.00000000000001 h 12 v 21.999999999999993 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="395.12500000000006"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 395.12500000000006,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="440.5416666666667"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 440.5416666666667,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="485.95833333333337"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 485.95833333333337,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="4.399999999999999"
																x="531.375"
																y="61.6"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 531.375,61.6 h 12 v 4.399999999999999 h -12 Z"
															></path>
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
									<div
										class="text-scale-900 -mt-9 flex items-center justify-between text-xs"
									>
										<span>Jun 18, 2023, 12:00am</span
										><span>Jun 19, 2023, 11:00am</span>
									</div>
								</div>
							</div>
						</div>
						<div class="table-container">
							<table class="table">
								<thead>
									<tr>
										<th
											class="!bg-scale-400 p-0 p-3 !py-2 px-4 text-left !text-xs font-bold"
										>
											Request
										</th>
										<th
											class="!bg-scale-400 p-0 p-3 !py-2 px-4 text-left text-right !text-xs font-bold"
										>
											Count
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-312"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-orange-500 text-center font-mono text-xs"
														>404</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/rest/v1/products</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
															>?select=*</span
														>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-312"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">45</td>
									</tr>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-313"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-orange-500 text-center font-mono text-xs"
														>400</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/rest/v1/Account</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
															>?select=name,User(count)&amp;id=eq.837caf97-633d-4d72-8df0-6a1cf5a621fa&amp;limit=1</span
														>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-313"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">37</td>
									</tr>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-314"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-orange-500 text-center font-mono text-xs"
														>400</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/rest/v1/Account</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
															>?select=name,User(count)&amp;id=eq.49c1e675-9c3b-4517-86e6-436f558c2966&amp;limit=1</span
														>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-314"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">22</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div
				class="border-panel-border-light dark:border-panel-border-dark undefined rounded-md border pb-0 shadow-sm"
			>
				<div class="bg-panel-body-light dark:bg-panel-body-dark h-full">
					<div class="space-y-4 px-6 py-4">
						<div class="flex flex-row items-start justify-between">
							<div class="gap-2">
								<div class="flex flex-row gap-2">
									<h3 class="h-6 w-full">Response Speed</h3>
									<button data-state="closed">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon text-scale-1100"
										>
											<circle cx="12" cy="12" r="10"></circle>
											<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
											<line x1="12" y1="17" x2="12.01" y2="17"></line>
										</svg>
									</button>
								</div>
								<p class="text-scale-1100 text-sm"></p>
							</div>
							<button data-state="closed">
								<button
									class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded px-1 px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
									type="button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
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
									</svg>
								</button>
							</button>
						</div>
						<div class="relative">
							<div class="transition-opacity duration-300">
								<div class="flex w-full flex-col gap-3">
									<div
										class="flex flex-row items-center gap-x-4"
										style="min-height: 1.8rem"
									>
										<div class="flex flex-row items-baseline gap-x-2">
											<h5 class="text-scale-1200 text-base text-xl font-normal">
												256.78<span class="text-lg">ms</span>
											</h5>
											<h5 class="text-scale-900 text-xs"></h5>
										</div>
									</div>
									<div
										class="recharts-responsive-container"
										style="
											width: 100%;
											height: 96px;
											min-width: 0px;
											min-height: 96px;
										"
										width="545"
										height="96"
									>
										<div
											class="recharts-wrapper overflow-visible"
											role="region"
											style="
												position: relative;
												cursor: default;
												width: 545px;
												height: 96px;
											"
										>
											<svg
												class="recharts-surface"
												width="545"
												height="96"
												viewBox="0 0 545 96"
											>
												<title></title>
												<desc></desc>
												<defs>
													<clipPath id="recharts48-clip">
														<rect x="0" y="0" height="66" width="545"></rect>
													</clipPath>
												</defs>
												<g
													class="recharts-layer recharts-cartesian-axis recharts-xAxis xAxis"
												>
													<line
														angle="0"
														orientation="bottom"
														width="545"
														height="30"
														x="0"
														y="66"
														class="recharts-cartesian-axis-line"
														stroke="var(--colors-scale6)"
														fill="none"
														x1="0"
														y1="66"
														x2="545"
														y2="66"
													></line>
													<g class="recharts-cartesian-axis-ticks"></g>
												</g>
												<g class="recharts-layer recharts-bar">
													<g class="recharts-layer recharts-bar-rectangles">
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="21.83459657701711"
																x="1.5138888888888888"
																y="44.16540342298289"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 1.5138888888888888,44.16540342298289 h 12 v 21.83459657701711 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="21.030334075723836"
																x="16.65277777777778"
																y="44.969665924276164"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 16.65277777777778,44.969665924276164 h 12 v 21.030334075723836 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="40.067499999999995"
																x="31.791666666666668"
																y="25.9325"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 31.791666666666668,25.9325 h 12 v 40.067499999999995 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="40.6725"
																x="77.20833333333333"
																y="25.3275"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 77.20833333333333,25.3275 h 12 v 40.6725 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="34.0725"
																x="122.625"
																y="31.927500000000002"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 122.625,31.927500000000002 h 12 v 34.0725 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="52.3325"
																x="168.04166666666666"
																y="13.667499999999997"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 168.04166666666666,13.667499999999997 h 12 v 52.3325 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														></g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="18.201677852348986"
																x="198.31944444444446"
																y="47.798322147651014"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 198.31944444444446,47.798322147651014 h 12 v 18.201677852348986 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="21.242130841121494"
																x="213.45833333333334"
																y="44.757869158878506"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 213.45833333333334,44.757869158878506 h 12 v 21.242130841121494 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="21.262243667068752"
																x="228.59722222222223"
																y="44.73775633293125"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 228.59722222222223,44.73775633293125 h 12 v 21.262243667068752 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="20.50701532912533"
																x="243.73611111111111"
																y="45.49298467087467"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 243.73611111111111,45.49298467087467 h 12 v 20.50701532912533 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="24.046249999999993"
																x="258.87500000000006"
																y="41.95375000000001"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 258.87500000000006,41.95375000000001 h 12 v 24.046249999999993 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														></g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="29.650689655172386"
																x="289.1527777777778"
																y="36.349310344827614"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 289.1527777777778,36.349310344827614 h 12 v 29.650689655172386 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="23.8525294117647"
																x="304.2916666666667"
																y="42.1474705882353"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 304.2916666666667,42.1474705882353 h 12 v 23.8525294117647 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="25.277161904761897"
																x="319.4305555555556"
																y="40.7228380952381"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 319.4305555555556,40.7228380952381 h 12 v 25.277161904761897 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="23.793605313092968"
																x="334.56944444444446"
																y="42.20639468690703"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 334.56944444444446,42.20639468690703 h 12 v 23.793605313092968 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="21.705331125827804"
																x="349.70833333333337"
																y="44.294668874172196"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 349.70833333333337,44.294668874172196 h 12 v 21.705331125827804 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="23.93402985074627"
																x="364.8472222222223"
																y="42.06597014925373"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 364.8472222222223,42.06597014925373 h 12 v 23.93402985074627 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="23.84016274864375"
																x="379.98611111111114"
																y="42.15983725135625"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 379.98611111111114,42.15983725135625 h 12 v 23.84016274864375 h -12 Z"
															></path>
														</g>
														<g
															class="recharts-layer recharts-bar-rectangle"
															role="img"
														>
															<path
																fill="var(--colors-brand9)"
																width="12"
																height="36.02499999999999"
																x="395.12500000000006"
																y="29.975000000000005"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 395.12500000000006,29.975000000000005 h 12 v 36.02499999999999 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="39.71"
																x="440.5416666666667"
																y="26.29"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 440.5416666666667,26.29 h 12 v 39.71 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="37.537499999999994"
																x="485.95833333333337"
																y="28.462500000000002"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 485.95833333333337,28.462500000000002 h 12 v 37.537499999999994 h -12 Z"
															></path>
														</g>
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
																fill="var(--colors-brand9)"
																width="12"
																height="28.24580000000001"
																x="531.375"
																y="37.75419999999999"
																class="recharts-rectangle transition-all duration-300"
																enable-background="12"
																radius="0"
																d="M 531.375,37.75419999999999 h 12 v 28.24580000000001 h -12 Z"
															></path>
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
									<div
										class="text-scale-900 -mt-9 flex items-center justify-between text-xs"
									>
										<span>Jun 18, 2023, 12:00am</span
										><span>Jun 19, 2023, 11:00am</span>
									</div>
								</div>
							</div>
						</div>
						<div class="table-container">
							<table class="table">
								<thead>
									<tr>
										<th
											class="!bg-scale-400 p-0 p-3 !py-2 px-4 text-left !text-xs font-bold"
										>
											Request
										</th>
										<th
											class="!bg-scale-400 p-0 p-3 !py-2 px-4 text-left text-right !text-xs font-bold"
										>
											Count
										</th>
										<th
											class="!bg-scale-400 p-0 p-3 !py-2 px-4 text-left text-right !text-xs font-bold"
										>
											Avg
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-315"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-green-500 text-center font-mono text-xs"
														>200</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/storage/v1/object/public/avatars/21e266c0-8d4a-454b-a815-f604212430e2/21e266c0-8d4a-454b-a815-f604212430e2-1686809890689.png</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
														></span>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-315"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">3</td>
										<td class="!py-2 text-right align-top !text-xs">
											875.00ms
										</td>
									</tr>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-316"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>GET</span
													><span
														class="h-4 w-10 truncate rounded bg-green-500 text-center font-mono text-xs"
														>200</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/storage/v1/object/public/avatars/b4b744f8-a3c7-4c9a-a96c-e264e09b15eb/b4b744f8-a3c7-4c9a-a96c-e264e09b15eb-1686551069628.png</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
														></span>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-316"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">5</td>
										<td class="!py-2 text-right align-top !text-xs">
											827.80ms
										</td>
									</tr>
									<tr class="p-0">
										<td class="!py-2 !text-xs">
											<div data-state="closed">
												<div
													class="flex gap-2"
													type="button"
													aria-controls="radix-317"
													aria-expanded="false"
													data-state="closed"
												>
													<span
														title="Show more route details"
														class="font-regular text-scale-1200 hover:bg-scale-500 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded !p-1 !py-0 px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
														><span class="truncate"
															><svg
																xmlns="http://www.w3.org/2000/svg"
																width="14"
																height="14"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																class="sbui-icon data-open-parent:rotate-90 data-closed-parent:rotate-0 transition"
															>
																<polyline
																	points="9 18 15 12 9 6"
																></polyline></svg></span></span
													><span
														class="bg-scale-500 h-4 w-10 truncate rounded text-center font-mono text-xs"
														>POST</span
													><span
														class="h-4 w-10 truncate rounded bg-green-500 text-center font-mono text-xs"
														>200</span
													>
													<div class="max-w-sm truncate lg:max-w-lg">
														<span
															class="text-scale-1100 truncate font-mono text-xs"
															>/storage/v1/object/list/images</span
														><span
															class="text-scale-900 max-w-sm truncate truncate font-mono text-xs"
														></span>
													</div>
												</div>
												<div
													data-state="closed"
													id="radix-317"
													hidden=""
													class="data-open:animate-slide-down-normal data-closed:animate-slide-up-normal pt-2"
													style=""
												></div>
											</div>
										</td>
										<td class="!py-2 text-right align-top !text-xs">2</td>
										<td class="!py-2 text-right align-top !text-xs">
											686.00ms
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
