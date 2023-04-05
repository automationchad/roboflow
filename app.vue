<template>
	<div class="min-h-screen bg-white dark:bg-[#0A1125]">
		<NuxtLayout :name="user ? 'default' : 'initial'"><LazyNuxtPage /> </NuxtLayout>
	</div>
</template>

<script setup>
	const user = useSupabaseUser();
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap');

	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
			Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
			sans-serif;
	}
	html {
		scroll-behavior: smooth;
	}
</style>
