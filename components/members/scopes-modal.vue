<template>
	<div
		data-state="open"
		class="data-open:animate-overlay-show data-closed:animate-overlay-hide fixed inset-0 z-40 grid place-items-center overflow-y-auto"
		style="pointer-events: auto"
	>
		<div
			role="dialog"
			id="radix-1263"
			aria-describedby="radix-1277"
			aria-labelledby="radix-1276"
			data-state="open"
			class="bg-slate-100 dark:bg-slate-300 border-slate-300 dark:border-slate-500 data-open:animate-overlay-show data-closed:animate-overlay-hide relative my-4 max-w-6xl rounded-md border shadow-xl sm:w-full sm:align-middle"
			tabindex="-1"
			style="pointer-events: auto"
		>
			<div
				class="bg-slate-200 dark:bg-slate-400 border-slate-300 dark:border-slate-500 space-y-1 border-b px-4 py-3 sm:px-5"
			>
				Permissions for each role
			</div>
			<div class="space-y-4 py-4">
				<div class="px-5">
					<p class="text-sm">
						The following table shows the corresponding permissions for each
						available role in the dashboard.
					</p>
				</div>
				<div class="px-5">
					<div class="border-slate-500 bg-slate-400 rounded border">
						<div class="border-slate-600 flex items-center border-b">
							<div class="w-[40%] pl-4 text-sm font-bold">Permissions</div>
							<div
								class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
							>
								Owner
							</div>
							<div
								class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
							>
								Adminstrator
							</div>
							<div
								class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
							>
								Developer
							</div>
							<div
								class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
							>
								Read-only&nbsp;<button data-state="closed">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="12" y1="16" x2="12" y2="12"></line>
										<line x1="12" y1="8" x2="12.01" y2="8"></line>
									</svg>
								</button>
							</div>
							<div
								class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
							>
								Billing-only&nbsp;<button data-state="closed">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="12" y1="16" x2="12" y2="12"></line>
										<line x1="12" y1="8" x2="12.01" y2="8"></line>
									</svg>
								</button>
							</div>
						</div>
						<div class="max-h-[425px] overflow-y-auto">
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Organization</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can change organization name
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can delete organization
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Members</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can add an Owner
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can remove an Owner
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can add an Adminstrator
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can remove an Administrator
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can add a Developer
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can remove a Developer
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can revoke an invite
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can resend an invite
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Billing</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read invoices
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read billing email
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can change billing email
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can view subscription
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update subscription
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read billing address
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update billing address
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read tax codes
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update tax codes
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read payment methods
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update payment methods
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Projects</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can view projects
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create a project
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can delete a project
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update a project
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can pause a project
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can resume a project
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can restart a project
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read API anon keys
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read API secret keys
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read JWT secret
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can generate new JWT secret
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update API settings
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Database</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read tables
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create/update/delete tables
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read RLS policies
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read create/update/delete RLS policies
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read database extensions
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read update database extensions
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read scheduled database backups
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can trigger a scheduled database backup
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read PITR database backups
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can trigger a PITR database backup
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read database replications
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update database replications
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read database triggers
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create/update/delete database triggers
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read database functions
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create/update/delete database functions
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read database webhooks
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create/update/delete database webhooks
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">SQL Editor</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can run a SELECT-based query
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can run all other types of queries
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create/update/delete queries
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Storage</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can access storage
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Authentication</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">Can view users</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can remove users
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can invite users
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can read authentication settings
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can update authentication settings
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can view authentication logs
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Edge Functions</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can view edge functions
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Logs Explorer</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can view logs explorer
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create queries in the logs explorer
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 flex items-center border-b px-4 py-2 last:border-none"
							>
								<div class="w-[100%] text-sm">Reports</div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can view reports
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
							<div
								class="border-slate-600 bg-slate-500 flex items-center border-b last:border-none"
							>
								<div class="w-[40%] pl-4 text-sm font-bold">
									Can create/update a report
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="sbui-icon"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
								<div
									class="border-slate-600 flex h-8 w-[12%] items-center justify-center border-l text-sm font-bold"
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
