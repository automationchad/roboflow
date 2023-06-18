<template>
	<div class="flex h-screen max-h-screen min-h-full flex-col">
		<div class="flex w-full flex-col">
			<TopbarNew />
			<slot />
		</div>
	</div>
</template>

<script setup>
	definePageMeta({ middleware: ['auth'] });
</script>
