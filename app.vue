<template>
	<div class="min-h-screen bg-white dark:bg-[#020014]">
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

	html {
		scroll-behavior: smooth;
		line-height: 1.5;
	}
</style>
