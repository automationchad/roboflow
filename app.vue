<template>
	<div class="dark:bg-[#020014] min-h-screen bg-[#F8F8FB]">
		<NuxtLayout
			><NuxtLoadingIndicator :throttle="5" :height="1" /><NuxtPage
		/></NuxtLayout>
	</div>
</template>

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
			background: #F8F8FB;
		}
	}

	html {
		scroll-behavior: smooth;
		line-height: 1.5;
	}

	
</style>
