<template>
	<div class="flex min-h-full flex-col">
		<div class="flex h-full">
			<NavClient />
			<NavClientSettings />
			<main class="flex h-screen w-full flex-1 flex-col overflow-x-hidden">
				<NavTop />
				<slot />
			</main>
		</div>
	</div>
</template>
