<template>
	<div class="flex h-screen min-h-full items-center justify-center">
		<main
			class="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
		>
			<div class="max-w-lg">
				<p
					class="text-base font-semibold leading-8 text-indigo-600 dark:text-indigo-400"
				>
					403
				</p>
				<h1
					class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
				>
					Not Authorized
				</h1>
				<p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
					Sorry, but what you're looking for
				</p>
				<div class="mt-10">
					<a href="/" class="text-sm font-semibold leading-7 text-indigo-600"
						><span aria-hidden="true">&larr;</span> Back to home</a
					>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
	const props = defineProps({
		error: Object,
	});
</script>
