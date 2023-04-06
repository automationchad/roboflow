<template>
	<div class="min-h-screen bg-white dark:bg-[#0A1125]">
		<NuxtLayout><NuxtLoadingIndicator /><NuxtPage /> </NuxtLayout>
	</div>
</template>

<style>
	* {
		font-family: circular, 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-smooth: always;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	html {
		scroll-behavior: smooth;
		line-height: 1.5;
	}
</style>
