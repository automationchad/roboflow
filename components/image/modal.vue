<!-- components/ImageModal.vue -->
<template>
	<div v-if="isOpen" class="modal">
		<div class="modal-background" @click="toggleModal"></div>
		<img class="modal-image h-96 w-auto" :src="imageSrc" :alt="imageAlt" />
	</div>
</template>

<script>
	export default {
		props: {
			isOpen: Boolean,
			imageSrc: String,
			imageAlt: String,
			toggleModal: Function,
		},
	};
</script>

<style scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.modal-image {
		border-radius: 5px;
		z-index: 10;
	}
</style>
