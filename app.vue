<template>
	<div class="min-h-screen bg-[#F8F8FB] dark:bg-[#020014]">
		<NuxtLayout
			><NuxtLoadingIndicator :throttle="5" :height="1" /><NuxtPage
		/></NuxtLayout>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';

	onMounted(() => {
		let script = document.createElement('script');
		script.src = 'https://www.helpkit.so/widget/script.js';
		script.async = true;
		script.id = 'helpkit-widget';
		script.dataset.projectId = 'motisgroup';
		document.body.appendChild(script);
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

	@media (prefers-color-scheme: dark) {
		html {
			background: #020014;
		}
	}

	@media (prefers-color-scheme: light) {
		html {
			background: #f8f8fb;
		}
	}

	html {
		scroll-behavior: smooth;
	}

	
</style>
