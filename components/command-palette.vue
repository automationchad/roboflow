<template>
	<div
		data-state="open"
		class="data-open:animate-overlay-show data-closed:animate-overlay-hide fixed inset-0 z-40 grid place-items-center overflow-y-auto"
		style="pointer-events: auto"
	>
		<div
			role="dialog"
			id="radix-3"
			aria-describedby="radix-17"
			aria-labelledby="radix-16"
			data-state="open"
			class="bg-scale-100 dark:bg-scale-300 border-scale-300 dark:border-scale-500 data-open:animate-overlay-show data-closed:animate-overlay-hide relative top-24 mx-auto my-4 max-w-3xl scale-100 place-self-start rounded-md border !border-[#e6e8eb]/90 !bg-[#f8f9fa]/95 shadow-xl backdrop-blur-sm backdrop-filter transition ease-out dark:!border-[#282828]/90 dark:!bg-[#1c1c1c]/80 sm:w-full sm:align-middle"
			tabindex="-1"
			style="pointer-events: auto"
		>
			<div
				class="[&amp;_[cmdk-group]]:px-2 [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:font-medium [&amp;_[cmdk-group-heading]]:text-scale-800 [&amp;_[cmdk-input]]:h-12 [&amp;_[cmdk-item]_svg]:mr-3 [&amp;_[cmdk-item]_svg]:h-5 [&amp;_[cmdk-item]_svg]:w-5 [&amp;_[cmdk-input-wrapper]_svg]:h-5 [&amp;_[cmdk-input-wrapper]_svg]:w-5 [&amp;_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 flex h-full w-full flex-col overflow-hidden"
				cmdk-root=""
			>
				<label
					cmdk-label=""
					for="radix-id-9635564249-6"
					id="radix-id-9635564249-5"
					style="
						position: absolute;
						width: 1px;
						height: 1px;
						padding: 0px;
						margin: -1px;
						overflow: hidden;
						clip: rect(0px, 0px, 0px, 0px);
						white-space: nowrap;
						border-width: 0px;
					"
				></label>
				<div class="flex flex-col items-center" cmdk-input-wrapper="">
					<input
						class="text-scale-1100 placeholder:text-scale-800 dark:placeholder:text-scale-800 dark:text-scale-1200 flex h-11 w-full rounded-md border-0 bg-transparent px-4 py-7 text-sm outline-none focus:shadow-none focus:ring-transparent disabled:cursor-not-allowed disabled:opacity-50"
						placeholder="Type a command or search..."
						cmdk-input=""
						autocomplete="off"
						autocorrect="off"
						spellcheck="false"
						aria-autocomplete="list"
						role="combobox"
						aria-expanded="true"
						aria-controls="radix-id-9635564249-4"
						aria-labelledby="radix-id-9635564249-5"
						id="radix-id-9635564249-6"
						type="text"
						value=""
					/>
					<div
						class="relative m-auto h-px w-full overflow-hidden bg-[#eceef0] dark:bg-[#2e2e2e]"
					>
						<span
							class="line-loading-bg-light dark:line-loading-bg absolute left-0 right-0 top-0 ml-auto mr-auto block h-px w-[80px] text-center opacity-0 transition-all"
						></span>
					</div>
				</div>
				<div
					class="my-2 max-h-[300px] overflow-y-auto overflow-x-hidden"
					cmdk-list=""
					role="listbox"
					aria-label="Suggestions"
					id="radix-id-9635564249-4"
					aria-labelledby="radix-id-9635564249-6"
					style="--cmdk-list-height: 994.8px"
				>
					<div cmdk-list-sizer="">
						<div
							class="text-scale-700 dark:text-scale-800 [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:pb-1.5 [&amp;_[cmdk-group-heading]]:text-sm [&amp;_[cmdk-group-heading]]:font-normal [&amp;_[cmdk-group-heading]]:text-scale-900 [&amp;_[cmdk-group-heading]]:dark:text-sca-300 overflow-hidden px-2 py-3"
							cmdk-group=""
							role="presentation"
							data-value="documentation"
						>
							<div cmdk-group-heading="" aria-hidden="true" id="radix-id-0-10">
								Documentation
							</div>
							<div
								cmdk-group-items=""
								role="group"
								aria-labelledby="radix-id-0-10"
							>
								<div
									class="text-scale-1100 aria-selected:bg-scale-300 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm aria-selected:backdrop-blur-md aria-selected:backdrop-filter data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]/80"
									cmdk-item=""
									role="option"
									data-value="search the docs..."
									aria-selected="true"
									data-selected="true"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon"
											>
												<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
												<path
													d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
												></path></svg
											><span>Search the docs...</span>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 aria-selected:bg-scale-300 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm aria-selected:backdrop-blur-md aria-selected:backdrop-filter data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]/80"
									cmdk-item=""
									role="option"
									data-value="ask supabase ai... experimental"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												class="text-brand-900 h-6 w-6"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M9.7003 13.379L8.33022 14.9739C7.99629 15.3626 7.35899 15.1265 7.35899 14.614V10.2188L2.13597 10.2188C1.20712 10.2189 0.693015 9.14211 1.277 8.4198L7.24456 1.03867C7.5719 0.633801 8.22633 0.865262 8.22633 1.3859V5.71008H13.7967C14.7348 5.71008 15.2458 6.80561 14.6431 7.52442L14.1628 8.09707"
													stroke="#4CC38A"
													stroke-miterlimit="10"
													stroke-linecap="round"
													stroke-linejoin="round"
												></path>
												<path
													d="M12.2534 14.3848L12.5765 13.4148C12.7202 12.9836 12.9624 12.5917 13.2839 12.2702C13.6053 11.9488 13.9972 11.7066 14.4285 11.5628L15.3984 11.2398C15.5808 11.179 15.5808 10.921 15.3984 10.8603L14.4285 10.5372C13.9972 10.3935 13.6053 10.1513 13.2839 9.8298C12.9624 9.50834 12.7202 9.11646 12.5765 8.68518L12.2534 7.71525C12.1927 7.53285 11.9347 7.53285 11.8739 7.71525L11.5509 8.68518C11.4071 9.11646 11.1649 9.50834 10.8435 9.8298C10.522 10.1513 10.1301 10.3935 9.69885 10.5372L8.72892 10.8603C8.54652 10.921 8.54652 11.179 8.72892 11.2398L9.69885 11.5628C10.1301 11.7066 10.522 11.9488 10.8435 12.2702C11.1649 12.5917 11.4071 12.9836 11.5509 13.4148L11.8739 14.3848C11.9347 14.5672 12.1927 14.5672 12.2534 14.3848Z"
													fill="#4CC38A"
												></path></svg
											><span
												class="from-brand-900 to-brand-1100 bg-gradient-to-r bg-clip-text text-transparent"
												>Ask Supabase AI...</span
											>
										</div>
										<span
											class="bg-scale-200 text-scale-1100 border-scale-700 inline-flex items-center rounded-full border bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
											><svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="!mr-1.5 !h-3.5 !w-3.5"
											>
												<path d="M6 18h8"></path>
												<path d="M3 22h18"></path>
												<path d="M14 22a7 7 0 1 0 0-14h-1"></path>
												<path d="M9 14h2"></path>
												<path d="M8 6h4"></path>
												<path
													d="M13 10V6.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V10c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2Z"
												></path>
											</svg>
											Experimental</span
										>
									</div>
								</div>
							</div>
						</div>
						<div
							class="text-scale-700 dark:text-scale-800 [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:pb-1.5 [&amp;_[cmdk-group-heading]]:text-sm [&amp;_[cmdk-group-heading]]:font-normal [&amp;_[cmdk-group-heading]]:text-scale-900 [&amp;_[cmdk-group-heading]]:dark:text-sca-300 overflow-hidden px-2 py-3"
							cmdk-group=""
							role="presentation"
							data-value="experimental"
						>
							<div cmdk-group-heading="" aria-hidden="true" id="radix-id-0-14">
								Experimental
							</div>
							<div
								cmdk-group-items=""
								role="group"
								aria-labelledby="radix-id-0-14"
							>
								<div
									class="text-scale-1100 aria-selected:bg-scale-300 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm aria-selected:backdrop-blur-md aria-selected:backdrop-filter data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]/80"
									cmdk-item=""
									role="option"
									data-value="generate sql with supabase ai experimental"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												class="text-scale-1100 h-6 w-6"
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M9.7003 13.379L8.33022 14.9739C7.99629 15.3626 7.35899 15.1265 7.35899 14.614V10.2188L2.13597 10.2188C1.20712 10.2189 0.693015 9.14211 1.277 8.4198L7.24456 1.03867C7.5719 0.633801 8.22633 0.865262 8.22633 1.3859V5.71008H13.7967C14.7348 5.71008 15.2458 6.80561 14.6431 7.52442L14.1628 8.09707"
													stroke="#4CC38A"
													stroke-miterlimit="10"
													stroke-linecap="round"
													stroke-linejoin="round"
												></path>
												<path
													d="M12.2534 14.3848L12.5765 13.4148C12.7202 12.9836 12.9624 12.5917 13.2839 12.2702C13.6053 11.9488 13.9972 11.7066 14.4285 11.5628L15.3984 11.2398C15.5808 11.179 15.5808 10.921 15.3984 10.8603L14.4285 10.5372C13.9972 10.3935 13.6053 10.1513 13.2839 9.8298C12.9624 9.50834 12.7202 9.11646 12.5765 8.68518L12.2534 7.71525C12.1927 7.53285 11.9347 7.53285 11.8739 7.71525L11.5509 8.68518C11.4071 9.11646 11.1649 9.50834 10.8435 9.8298C10.522 10.1513 10.1301 10.3935 9.69885 10.5372L8.72892 10.8603C8.54652 10.921 8.54652 11.179 8.72892 11.2398L9.69885 11.5628C10.1301 11.7066 10.522 11.9488 10.8435 12.2702C11.1649 12.5917 11.4071 12.9836 11.5509 13.4148L11.8739 14.3848C11.9347 14.5672 12.1927 14.5672 12.2534 14.3848Z"
													fill="#4CC38A"
												></path></svg
											><span class="grow">Generate SQL with Supabase AI</span>
										</div>
										<span
											class="bg-scale-200 text-scale-1100 border-scale-700 inline-flex items-center rounded-full border bg-opacity-10 px-2.5 py-0.5 text-xs font-medium"
											><svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="!mr-1.5 !h-3.5 !w-3.5"
											>
												<path d="M6 18h8"></path>
												<path d="M3 22h18"></path>
												<path d="M14 22a7 7 0 1 0 0-14h-1"></path>
												<path d="M9 14h2"></path>
												<path d="M8 6h4"></path>
												<path
													d="M13 10V6.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2.5a.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V10c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2Z"
												></path>
											</svg>
											Experimental</span
										>
									</div>
								</div>
							</div>
						</div>
						<div
							class="text-scale-700 dark:text-scale-800 [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:pb-1.5 [&amp;_[cmdk-group-heading]]:text-sm [&amp;_[cmdk-group-heading]]:font-normal [&amp;_[cmdk-group-heading]]:text-scale-900 [&amp;_[cmdk-group-heading]]:dark:text-sca-300 overflow-hidden px-2 py-3"
							cmdk-group=""
							role="presentation"
							data-value="project tools"
						>
							<div cmdk-group-heading="" aria-hidden="true" id="radix-id-0-17">
								Project tools
							</div>
							<div
								cmdk-group-items=""
								role="group"
								aria-labelledby="radix-id-0-17"
							>
								<div
									class="text-scale-1100 aria-selected:bg-scale-300 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm aria-selected:backdrop-blur-md aria-selected:backdrop-filter data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]/80"
									cmdk-item=""
									role="option"
									data-value="get api keys"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-1100"
											>
												<path
													d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
												></path></svg
											><span class="grow">Get API keys</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							class="text-scale-700 dark:text-scale-800 [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:pb-1.5 [&amp;_[cmdk-group-heading]]:text-sm [&amp;_[cmdk-group-heading]]:font-normal [&amp;_[cmdk-group-heading]]:text-scale-900 [&amp;_[cmdk-group-heading]]:dark:text-sca-300 overflow-hidden px-2 py-3"
							cmdk-group=""
							role="presentation"
							data-value="navigate"
						>
							<div cmdk-group-heading="" aria-hidden="true" id="radix-id-0-20">
								Navigate
							</div>
							<div
								cmdk-group-items=""
								role="group"
								aria-labelledby="radix-id-0-20"
							>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  table editor"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to
												<span class="font-bold"> Table Editor</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  sql editor"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to <span class="font-bold"> SQL Editor</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  database"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to <span class="font-bold"> Database</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  auth"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to <span class="font-bold"> Auth</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  storage"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to <span class="font-bold"> Storage</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  edge functions"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to
												<span class="font-bold"> Edge Functions</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  logs"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to <span class="font-bold"> Logs</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  api docs"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to <span class="font-bold"> API Docs</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  project settings"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<line x1="5" y1="12" x2="19" y2="12"></line>
												<polyline points="12 5 19 12 12 19"></polyline></svg
											><span class="grow"
												>Go to
												<span class="font-bold"> Project Settings</span></span
											>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							class="text-scale-700 dark:text-scale-800 [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:pb-1.5 [&amp;_[cmdk-group-heading]]:text-sm [&amp;_[cmdk-group-heading]]:font-normal [&amp;_[cmdk-group-heading]]:text-scale-900 [&amp;_[cmdk-group-heading]]:dark:text-sca-300 overflow-hidden px-2 py-3"
							cmdk-group=""
							role="presentation"
							data-value="support"
						>
							<div cmdk-group-heading="" aria-hidden="true" id="radix-id-0-31">
								Support
							</div>
							<div
								cmdk-group-items=""
								role="group"
								aria-labelledby="radix-id-0-31"
							>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  support"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<circle cx="12" cy="12" r="10"></circle>
												<circle cx="12" cy="12" r="4"></circle>
												<line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
												<line
													x1="14.83"
													y1="14.83"
													x2="19.07"
													y2="19.07"
												></line>
												<line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
												<line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
												<line
													x1="4.93"
													y1="19.07"
													x2="9.17"
													y2="14.83"
												></line></svg
											><span class="grow"
												>Go to <span class="font-bold"> Support</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  system status"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<circle cx="12" cy="12" r="10"></circle>
												<circle cx="12" cy="12" r="4"></circle>
												<line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
												<line
													x1="14.83"
													y1="14.83"
													x2="19.07"
													y2="19.07"
												></line>
												<line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
												<line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
												<line
													x1="4.93"
													y1="19.07"
													x2="9.17"
													y2="14.83"
												></line></svg
											><span class="grow"
												>Go to
												<span class="font-bold"> System Status</span></span
											>
										</div>
									</div>
								</div>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="go to  github discussions"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon text-scale-900"
											>
												<circle cx="12" cy="12" r="10"></circle>
												<circle cx="12" cy="12" r="4"></circle>
												<line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
												<line
													x1="14.83"
													y1="14.83"
													x2="19.07"
													y2="19.07"
												></line>
												<line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
												<line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
												<line
													x1="4.93"
													y1="19.07"
													x2="9.17"
													y2="14.83"
												></line></svg
											><span class="grow"
												>Go to
												<span class="font-bold"> Github Discussions</span></span
											>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							class="text-scale-700 dark:text-scale-800 [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:pb-1.5 [&amp;_[cmdk-group-heading]]:text-sm [&amp;_[cmdk-group-heading]]:font-normal [&amp;_[cmdk-group-heading]]:text-scale-900 [&amp;_[cmdk-group-heading]]:dark:text-sca-300 overflow-hidden px-2 py-3"
							cmdk-group=""
							role="presentation"
							data-value="settings"
						>
							<div cmdk-group-heading="" aria-hidden="true" id="radix-id-0-36">
								Settings
							</div>
							<div
								cmdk-group-items=""
								role="group"
								aria-labelledby="radix-id-0-36"
							>
								<div
									class="text-scale-1100 group relative flex cursor-default select-none items-center rounded-md px-2 py-3 text-sm outline-none backdrop-blur-md backdrop-filter transition-all aria-selected:bg-[#f1f3f5]/90 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:aria-selected:bg-[#323232]"
									cmdk-item=""
									role="option"
									data-value="change theme"
								>
									<div
										class="flex w-full flex-row items-center justify-between"
									>
										<div class="flex flex-grow flex-row items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="21"
												height="21"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												class="sbui-icon mr-2"
											>
												<rect
													x="2"
													y="3"
													width="20"
													height="14"
													rx="2"
													ry="2"
												></rect>
												<line x1="8" y1="21" x2="16" y2="21"></line>
												<line x1="12" y1="17" x2="12" y2="21"></line></svg
											>Change theme
										</div>
									</div>
								</div>
							</div>
						</div>
						<div cmdk-group="" role="presentation" data-value="undefined">
							<div cmdk-group-items="" role="group"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
