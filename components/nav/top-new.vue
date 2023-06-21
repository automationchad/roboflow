<script setup>
	import { ref, watch, onMounted } from 'vue';
	const route = useRoute();

	const supabase = useSupabaseClient();

	const organization = ref(null);

	async function fetchAccountData() {
		if (route.params.organization_id) {
			const { data: accountData, error: errorData } = await supabase
				.from('organizations')
				.select('name')
				.eq('id', route.params.organization_id)
				.limit(1)
				.single();
			organization.value = accountData.name;
		}
	}

	fetchAccountData();

	watch(
		() => route.params.organization_id,
		async (newId, oldId) => {
			if (newId) {
				fetchAccountData();
			}
		},
		{ immediate: true }
	);
</script>

<template>
	<div class="dark:border-dark border-b p-3">
		<div class="PageHeader">
			<div class="Breadcrumbs flex justify-between">
				<div class="flex items-center text-sm">
					<div class="flex items-center space-x-2">
						<NuxtLink to="/clients"
							><img
								src="~/assets/images/logo.png"
								alt="Supabase"
								class="dark:border-dark rounded border p-1 hover:border-white"
								style="height: 24px" /></NuxtLink
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="sbui-icon text-scale-1100"
						>
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
						<p v-if="organization" class="text-sm">
							Organization: {{ organization }}
						</p>
						<p v-else class="text-sm">Create an organization</p>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="sbui-icon text-scale-1100"
						>
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
						<p class="text-sm">Create a new client</p>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="sbui-icon text-scale-1100"
						>
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
						<p class="text-scale-1100 text-sm">
							{{ 'Add project details' }}
						</p>
					</div>
				</div>
				<div class="flex"></div>
			</div>
		</div>
	</div>
</template>
