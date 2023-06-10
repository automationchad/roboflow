<script setup>
	import { ref, watch, onMounted } from 'vue';
	const route = useRoute();

	const supabase = useSupabaseClient();

	const organization = ref(null);
	const userCount = ref(1);

	async function fetchAccountData() {
		if (route.params.organization) {
			const { data: accountData, error: errorData } = await supabase
				.from('Account')
				.select('name,User(count)')
				.eq('id', route.params.organization)
				.limit(1)
				.single();
			organization.value = accountData.name;
			userCount.value = accountData.User[0].count;
		}
	}

	fetchAccountData();

	watch(
		() => route.params.organization,
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
						<NuxtLink to="/dashboard/projects"
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
						<p class="text-sm">Create a new project</p>

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
							{{
								userCount ? 'Add project details' : 'Invite the first member'
							}}
						</p>
					</div>
				</div>
				<div class="flex"></div>
			</div>
		</div>
	</div>
</template>
