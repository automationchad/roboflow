<template>
	<div class="min-h-screen bg-white dark:bg-[#0A1125]">
		<NuxtPage />
		<LoginModal
			v-show="showLoginModal"
			@close-modal="showLoginModal = false"
			@show-otp-modal="handleOtpModal()"
		/>
		<otpModal v-show="showOtpModal" />
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
	html {
		scroll-behavior: smooth;
	}
</style>
