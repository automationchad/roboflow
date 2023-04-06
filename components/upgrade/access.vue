<template>
	<div
		class="absolute top-10 z-10 m-4 mx-auto flex w-[200px]  flex-col rounded-lg border border-slate-300 bg-white px-4 py-4 text-xs font-normal text-slate-500 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 dark:border-slate-800 dark:bg-gray-900 dark:text-white"
	>
		<span class="text-left text-slate-900 dark:text-white">
			Upgrade your organization’s plan to add more {{ object }}.
		</span>

		<a
			:href="`/settings/billing`"
			class="mt-4 rounded-lg border border-slate-300 px-3 py-1 text-slate-900 dark:border-transparent dark:bg-slate-700 dark:text-white"
			>Upgrade plan</a
		>
	</div>
</template>

<script setup>
	const props = defineProps({
		object: String,
	});
</script>
