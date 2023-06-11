<template>
	<div class="mb-8">
		<div class="container my-4 max-w-4xl space-y-1">
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div class="table-container">
						<table class="table">
							<thead>
								<tr>
									<th class="p-3 px-4 text-left"></th>
									<th class="p-3 px-4 text-left">Date</th>
									<th class="p-3 px-4 text-left">Amount due</th>
									<th class="p-3 px-4 text-left">Invoice number</th>
									<th class="flex items-center p-3 px-4 text-left">Status</th>
									<th class="p-3 px-4 text-left text-right"></th>
								</tr>
							</thead>
							<tbody>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>10/06/2023, 01:00:17</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0017</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>03/06/2023, 14:37:49</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0016</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>27/05/2023, 16:00:39</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0015</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>10/05/2023, 15:49:54</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0014</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>03/05/2023, 14:37:49</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0013</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>27/04/2023, 16:00:39</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0012</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>10/04/2023, 15:49:54</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0011</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>03/04/2023, 14:37:49</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0010</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>27/03/2023, 16:00:39</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0009</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="sbui-icon"
										>
											<path
												d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
											></path>
											<polyline points="14 2 14 8 20 8"></polyline>
											<line x1="16" y1="13" x2="8" y2="13"></line>
											<line x1="16" y1="17" x2="8" y2="17"></line>
											<polyline points="10 9 9 9 8 9"></polyline>
										</svg>
									</td>
									<td><p>10/03/2023, 14:49:54</p></td>
									<td><p>$0</p></td>
									<td><p>5510D855-0008</p></td>
									<td>
										<button data-state="closed">
											<span
												class="text-green-1100 inline-flex items-center rounded-full border border-green-700 bg-green-200 bg-opacity-10 px-2.5 py-0.5 text-xs font-medium capitalize"
												>Paid</span
											>
										</button>
									</td>
									<td class="align-right">
										<div class="flex items-center justify-end space-x-2">
											<button
												class="font-regular text-scale-1200 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-800 hover:dark:bordershadow-scale-900 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-transparent px-2.5 py-1 text-center text-xs shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
												type="button"
											>
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
														d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
													></path>
													<polyline points="7 10 12 15 17 10"></polyline>
													<line x1="12" y1="15" x2="12" y2="3"></line>
												</svg>
											</button>
										</div>
									</td>
								</tr>
								<tr class="">
									<td colspan="6">
										<div class="flex items-center justify-between">
											<p class="text-sm opacity-50">
												Showing 1 to 10 out of 17 invoices
											</p>
											<div class="flex items-center space-x-2">
												<button
													class="font-regular text-scale-1200 bg-scale-100 hover:bg-scale-300 bordershadow-scale-600 hover:bordershadow-scale-700 dark:bordershadow-scale-700 hover:dark:bordershadow-scale-800 dark:bg-scale-500 dark:hover:bg-scale-600 focus-visible:outline-brand-600 pointer-events-none relative inline-flex cursor-not-allowed cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs opacity-50 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
													disabled=""
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
														class="sbui-icon"
													>
														<polyline points="15 18 9 12 15 6"></polyline>
													</svg></button
												><button
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
														class="sbui-icon"
													>
														<polyline points="9 18 15 12 9 6"></polyline>
													</svg>
												</button>
											</div>
										</div>
									</td>
								</tr>
								<tr v-if="false" class="">
									<td class="p-3 py-12 text-center" colspan="5">
										<p class="text-scale-1000">
											No invoices for this organization yet
										</p>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.table-container table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
	}
	.table {
		display: table;
	}
	table {
		text-indent: 0;
		border-color: inherit;
		border-collapse: collapse;
	}

	.table-container table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
	}

	.table-container table span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.table-container thead th {
		font-size: 0.875rem /* 14px */;
		line-height: 1.25rem /* 20px */;
		font-weight: 400;
		border-bottom-width: 1px;
		border-top-width: 1px;
	}

	.table-container thead th:first-child {
		@apply rounded rounded-b-none rounded-r-none pl-6;
		@apply border-l;
	}

	.table-container thead th:last-child {
		@apply rounded rounded-b-none rounded-l-none pr-6;
		@apply border-r;
	}

	.table-container tbody .tr--link {
		@apply cursor-pointer transition-colors;
	}

	.table-container tbody td {
		@apply border-b p-3 px-4 text-sm;
	}

	.table-container tbody td:first-child {
		@apply border-b border-l pl-6;
	}

	.table-container tbody td:last-child {
		@apply border-b border-r pr-6;
	}

	.table-container tbody tr:last-child td:first-child {
		border-radius: 0.25rem; /* rounded */
		border-top-left-radius: 0; /* rounded-l-none */
		border-bottom-left-radius: 0; /* rounded-l-none */
		border-top-right-radius: 0; /* rounded-t-none */
		border-bottom-right-radius: 0.25rem;
	}

	.table-container tbody tr:last-child td:last-child {
		border-radius: 0.25rem; /* rounded */
		border-top-left-radius: 0; /* rounded-l-none */
		border-bottom-left-radius: 0; /* rounded-l-none */
		border-top-right-radius: 0; /* rounded-t-none */
		border-bottom-right-radius: 0.25rem;
	}

	.table-container--borderless thead th {
		border-top: none;
	}

	.table-container--borderless thead th:first-child {
		border-left: none;
	}

	.table-container--borderless thead th:last-child {
		border-right: none;
	}

	.table-container--borderless tbody td:first-child {
		border-left: none;
	}

	.table-container--borderless tbody td:last-child {
		border-right: none;
	}

	.table-container--borderless tbody tr:last-child td {
		border-bottom: none;
	}

	.table-container tbody td:first-child {
		border-bottom-width: 1px;
		border-left-width: 1px;
		border-color: var(--colors-scale5);
		padding-left: 1.5rem;
	}
	.table-container tbody td {
		border-bottom-width: 1px;
		border-color: var(--colors-scale5);
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--colors-gray11);
	}

	.table-container tbody td:last-child {
		border-bottom-width: 1px;
		border-right-width: 1px px;
		border-color: var(--colors-scale5);
		padding-right: 1.5rem;
	}

	.table-container table span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.bordershadow-scale-600 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #dfe3e6 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-1000 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #7375ed 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>

<script setup>
	import { reactive, onMounted, ref } from 'vue';
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
		ExclamationTriangleIcon,
		CogIcon,
		CreditCardIcon,
		SparklesIcon,
		KeyIcon,
		SquaresPlusIcon,
		UserCircleIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format, formatDistance } from 'date-fns';

	const state = reactive({
		invoices: [],
		loading: false,
	});

	const route = useRoute();

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: accountData, error: accountError } = await supabase
		.from('Account')
		.select(`id, stripeCustomerId`)
		.eq('id', route.params.organization)
		.limit(1)
		.single();

	const styles = {
		uncollectible:
			'bg-red-100 dark:bg-red-700 dark:ring-red-500 ring-red-300 text-red-900 dark:text-red-200',
		paid: 'bg-lime-100 dark:bg-lime-700 dark:ring-lime-500 ring-lime-300  text-lime-900 dark:text-lime-200',
		open: 'bg-sky-100 dark:bg-sky-700 dark:ring-sky-500 ring-sky-300  text-sky-900 dark:text-sky-200',
		void: 'bg-purple-100 dark:bg-purple-700 dark:ring-purple-500 ring-purple-300  text-purple-900 dark:text-purple-200',
	};
	const fetchData = async () => {
		console.log(accountData);
		const { data } = await $fetch(
			`/api/stripe/invoices/${accountData.stripeCustomerId}`
		);
		return data;
	};

	onMounted(async () => {
		state.invoices = await fetchData();
		console.log(state.invoices);
		state.loading = false;
	});
</script>
