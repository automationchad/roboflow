<template>
	<div class="flex min-h-full flex-col">
		<div class="flex h-full">
			<navbar2 />
			<main class="flex h-screen w-full flex-1 flex-col overflow-x-hidden">
				<topbar />
				<slot />
			</main>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({ middleware: ['auth'] });
</script>
