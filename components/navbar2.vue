<template>
	<div
		class="bg-body border-scale-500 flex w-14 flex-col justify-between overflow-y-hidden border-r p-2"
		style="height: 100vh"
	>
		<ul class="flex flex-col space-y-2">
			<a class="block" href="/dashboard/projects"
				><img
					src="~/assets/images/logo.png"
					alt="Supabase"
					class="mx-auto h-[40px] w-auto cursor-pointer rounded" /></a
			><button data-state="closed">
				<NuxtLink
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 bg-slate-200 text-scale-1200 flex h-10 w-10 items-center justify-center rounded shadow-sm transition-colors duration-200"
					to="/dashboard/projects"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
						<polyline points="9 22 9 12 15 12 15 22"></polyline></svg
				></NuxtLink>
			</button>
			<div class="bg-slate-200 h-px w-full"></div>
			<button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/editor"
					><svg
						class="text-color-inherit m-auto"
						width="22px"
						height="19px"
						viewBox="0 0 22 19"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						style="width: 18px; height: 18px"
					>
						<g
							id="Page-1"
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
						>
							<g
								id="Artboard"
								transform="translate(-967.000000, -2846.000000)"
								stroke="currentColor"
								stroke-width="2"
							>
								<g
									id="table-editor"
									transform="translate(968.000000, 2847.000000)"
								>
									<rect
										id="Rectangle"
										x="0"
										y="0"
										width="20"
										height="17"
										rx="2"
									></rect>
									<line x1="0" y1="11" x2="21" y2="11" id="Path"></line>
									<line x1="0" y1="5.5" x2="21" y2="5.5" id="Path"></line>
									<line x1="7" y1="0" x2="7" y2="16" id="Path"></line>
								</g>
							</g>
						</g></svg
				></a></button
			><button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/sql"
					><svg
						class="text-color-inherit m-auto"
						width="22px"
						height="19px"
						viewBox="0 0 22 19"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						style="width: 18px; height: 18px"
					>
						<g
							id="Page-1"
							stroke="none"
							stroke-width="1"
							fill="none"
							fill-rule="evenodd"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<g
								id="Artboard"
								transform="translate(-964.000000, -2867.000000)"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									d="M970.7,2873.47 L973.9,2876.67 L970.7,2879.87 M985,2883 L985,2870.06801 C985,2868.96639 984.109168,2868.07219 983.007556,2868.06803 L967.007556,2868.00758 C965.902994,2868.00341 965.004187,2868.89545 965.000014,2870.00001 C965.000005,2870.00253 965,2870.00505 965,2870.00757 L965,2883 C965,2884.10457 965.895431,2885 967,2885 L983,2885 C984.104569,2885 985,2884.10457 985,2883 Z M976.033333,2879.97 L979.233333,2879.97"
									id="Shape"
								></path>
							</g>
						</g></svg
				></a>
			</button>
			<div class="bg-slate-200 h-px w-full"></div>
			<button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/database/tables"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
						<path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
						<path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg
				></a></button
			><button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/auth/users"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
						<circle cx="9" cy="7" r="4"></circle>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg
				></a></button
			><button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/storage/buckets"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<polyline points="21 8 21 21 3 21 3 8"></polyline>
						<rect x="1" y="3" width="22" height="5"></rect>
						<line x1="10" y1="12" x2="14" y2="12"></line></svg
				></a></button
			><button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/functions"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline></svg
				></a>
			</button>
			<div class="bg-slate-200 h-px w-full"></div>
			<button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/reports"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<line x1="12" y1="20" x2="12" y2="10"></line>
						<line x1="18" y1="20" x2="18" y2="4"></line>
						<line x1="6" y1="20" x2="6" y2="16"></line></svg
				></a></button
			><button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/logs/explorer"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<line x1="8" y1="6" x2="21" y2="6"></line>
						<line x1="8" y1="12" x2="21" y2="12"></line>
						<line x1="8" y1="18" x2="21" y2="18"></line>
						<line x1="3" y1="6" x2="3.01" y2="6"></line>
						<line x1="3" y1="12" x2="3.01" y2="12"></line>
						<line x1="3" y1="18" x2="3.01" y2="18"></line></svg
				></a></button
			><button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/api"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
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
						<polyline points="10 9 9 9 8 9"></polyline></svg
				></a></button
			><button data-state="closed">
				<a
					class="bg-scale-200 hover:bg-slate-200 text-scale-900 hover:text-scale-1200 flex h-10 w-10 items-center justify-center rounded transition-colors duration-200"
					href="/dashboard/project/nsfipxnlucvgchlkqvqw/settings/general"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="sbui-icon"
					>
						<circle cx="12" cy="12" r="3"></circle>
						<path
							d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
						></path></svg
				></a>
			</button>
		</ul>
		<ul class="flex flex-col items-center space-y-4">
			<button data-state="closed">
				<span
					class="font-regular text-scale-1200 hover:bg-slate-200 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
					><span class="truncate"
						><div class="py-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="sbui-icon"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							</svg></div></span
				></span></button
			><button
				type="button"
				id="radix-459"
				aria-haspopup="menu"
				aria-expanded="false"
				data-state="closed"
				class="focus:outline-scale-600 flex rounded border-none bg-transparent p-0 outline-none outline-offset-1 transition-all focus:outline-4"
			>
				<span
					class="font-regular text-scale-1200 hover:bg-slate-200 focus-visible:outline-scale-700 relative inline-flex cursor-pointer items-center space-x-2 rounded px-2.5 py-1 text-center text-xs shadow-none outline-none outline-0 transition transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1"
					><span class="truncate"
						><div class="py-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="sbui-icon"
							>
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg></div></span
				></span>
			</button>
		</ul>
	</div>
</template>
