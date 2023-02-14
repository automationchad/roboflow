<script setup>
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const { data: profile } = user.value
		? await supabase
				.from('profiles')
				.select(
					`username,
    			workspaces (
      					id, tray_workspace_id, stripe_customer_id, all_access, templates)`
				)
				.eq('id', user.value.id)
				.single()
		: {};
</script>

<template>
	<div class="">
		<div class="h-screen bg-white dark:bg-[#0A101E]">
			<Navbar class="" @open-modal="showLoginModal = true" />
			<NuxtPage class="" :user="user" :profile="profile ?? {}" />
			<LoginModal
				v-show="showLoginModal"
				@close-modal="showLoginModal = false"
				@show-otp-modal="handleOtpModal()"
			/>
			<otpModal v-show="showOtpModal" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showLoginModal: false,
				showOtpModal: false,
			};
		},
		methods: {
			handleOtpModal() {
				this.showOtpModal = true;
				setTimeout(() => {
					this.showOtpModal = false;
				}, 2000);
			},
		},
	};
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap');

	* {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
			Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
			sans-serif;
	}
</style>
