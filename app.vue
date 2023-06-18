<template>
	<div class="min-h-screen">
		<NuxtLayout
			><NuxtLoadingIndicator :throttle="5" :height="1" /><NuxtPage
		/></NuxtLayout>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';

	const isDarkMode = ref(false);

	onMounted(() => {
		if (isDarkMode.value) {
			document.documentElement.classList.add('dark');
		} else if (!isDarkMode.value) {
			document.documentElement.classList.remove('dark');
		}
		// Whenever the user explicitly chooses light mode
		else if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		// Whenever the user explicitly chooses light mode
		localStorage.theme = 'light';

		// Whenever the user explicitly chooses dark mode
		localStorage.theme = 'dark';

		// Whenever the user explicitly chooses to respect the OS preference
		localStorage.removeItem('theme');
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
