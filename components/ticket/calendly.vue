<template>
	<!-- Calendly inline widget begin -->
	<div
		class="calendly-inline-widget"
		data-url="https://calendly.com/motis-group/1-on-1?hide_event_type_details=1&background_color=1E293B&hide_gdpr_banner=1&text_color=ffffff&primary_color=4e44e4"
	></div>
	<!-- Calendly inline widget end -->
</template>

<style scoped>
	.calendly-inline-widget {
		width: 100%;
		height: 100%;

		padding-top: 0rem;
		margin-top: -3rem;
	}
</style>

<script>
	export default {
		mounted() {
			const recaptchaScript = document.createElement('script');
			recaptchaScript.setAttribute(
				'src',
				'https://assets.calendly.com/assets/external/widget.js'
			);
			document.head.appendChild(recaptchaScript);
		},
	};
</script>
