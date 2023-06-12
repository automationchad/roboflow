<template>
	<div
		class="grid h-screen min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white dark:bg-transparent lg:grid-cols-[max(50%,36rem),1fr]"
	>
		<header
			class="mx-auto w-full max-w-7xl px-6 pt-6 sm:pt-10 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:px-8"
		>
			<a href="/">
				<span class="sr-only">Your Company</span>
				<img
					class="h-10 w-auto sm:h-12"
					src="@/assets/images/logo.png"
					alt=""
				/>
			</a>
		</header>
		<main
			class="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8"
		>
			<div class="max-w-lg">
				<p class="text-base font-semibold leading-8 text-indigo-600">😭</p>
				<h1
					class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
				>
					Invalid invite
				</h1>
				<p class="mt-6 text-base leading-7 text-gray-600 dark:text-slate-400">
					This invite may have expired, or you might not have permission to
					join.
				</p>
				<div class="mt-10">
					<NuxtLink
						to="/dashboard/projects"
						class="text-sm font-semibold leading-7 text-indigo-600 dark:text-indigo-400"
						><span aria-hidden="true">&larr;</span> Go back home</NuxtLink
					>
				</div>
			</div>
		</main>
		<!-- <footer class="self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
			<div class="border-t border-gray-100 bg-gray-50 py-10">
				<nav
					class="mx-auto flex w-full max-w-7xl items-center gap-x-4 px-6 text-sm leading-7 text-gray-600 lg:px-8"
				>
					<a href="#">Contact support</a>
					<svg
						viewBox="0 0 2 2"
						aria-hidden="true"
						class="h-0.5 w-0.5 fill-gray-300"
					>
						<circle cx="1" cy="1" r="1" />
					</svg>
					<a href="#">Status</a>
					<svg
						viewBox="0 0 2 2"
						aria-hidden="true"
						class="h-0.5 w-0.5 fill-gray-300"
					>
						<circle cx="1" cy="1" r="1" />
					</svg>
					<a href="#">Twitter</a>
				</nav>
			</div>
		</footer> -->
	</div>
</template>

<script setup>
	definePageMeta({ layout: 'public' });
</script>
