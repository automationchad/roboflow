<template>
	<div class="min-h-screen">
		<NuxtLayout
			><NuxtLoadingIndicator :throttle="5" :height="1" /><NuxtPage
		/></NuxtLayout>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';

	let isDarkMode;

	// Check if localStorage is defined
	if (typeof localStorage !== 'undefined') {
		// Prioritize explicit user preference
		if ('theme' in localStorage) {
			isDarkMode = localStorage.theme === 'dark';
		} else {
			// Infer preference from OS settings if no explicit preference is set
			isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
	} else {
		// Default to light mode if localStorage is not available
		isDarkMode = false;
	}

	onMounted(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<style>
	* {
		font-family: circular, 'Helvetica Neue', Helvetica, Arial, sans-serif;
		/* font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
			Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif; */
		font-smooth: always;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	/* @media (prefers-color-scheme: dark) {
		html {
			background: #020014;
		}
	}

	@media (prefers-color-scheme: light) {
		html {
			background: #f8f8fb;
		}
	} */

	html {
		scroll-behavior: smooth;
	}
</style>
