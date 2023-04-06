<template>
	<div>
		<navbar v-if="user" />
		<!-- Output page content -->
		<div :class="[user ? 'lg:pl-72' : '']">
			<main class="py-10 px-4 sm:px-6 lg:px-10"><slot /></main>
		</div>
	</div>
</template>

<script setup>
	const user = useSupabaseUser();
</script>
