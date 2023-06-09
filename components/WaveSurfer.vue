<template>
	<button @click="togglePlayPause" v-if="!isPlaying">
		<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
			></path>
		</svg>
	</button>
	<button @click="togglePlayPause" v-else>
		<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M15.25 6.75V17.25"
			></path>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M8.75 6.75V17.25"
			></path>
		</svg>
	</button>
	<div ref="wavesurferMain" class="w-full"></div>
	<div class="ml-2">
		<span class="text-sm">{{ formatTime(currentTime) }}</span>
	</div>
	<!-- <div ref="waveTimeline"></div> -->
</template>

<script setup>
	const props = defineProps({
		src: {
			type: String,
			required: true,
		},
		peaksData: {
			type: String,
		},
		options: {
			type: Object,
		},
	});

	const waveSurfer = ref(null);
	const wavesurferMain = ref(null);
	let isPlaying = ref(false);
	let currentTime = ref(0);
	let duration = ref(0);

	const formatTime = (time) => {
		let minutes = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);
		return `${minutes < 10 ? '0' : ''}${minutes}:${
			seconds < 10 ? '0' : ''
		}${seconds}`;
	};

	onMounted(async () => {
		const WaveSurfer = (await import('wavesurfer.js')).default;
		let options = props.options;
		let wsOptions = Object.assign(
			{
				container: wavesurferMain.value,
			},
			options
		);

		waveSurfer.value = new WaveSurfer.create(wsOptions);

		waveSurfer.value.on('audioprocess', function () {
			currentTime.value = waveSurfer.value.getCurrentTime();
			duration.value = waveSurfer.value.getDuration();
		});

		waveSurfer.value.on('finish', function () {
			isPlaying.value = false;
		});

		if (props.peaksData) {
			fetch(props.peaksData)
				.then((response) => {
					if (!response.ok) {
						throw new Error('HTTP error ' + response.status);
					}
					return response.json();
				})
				.then((peaks) => {
					waveSurfer.value.load(props.src, peaks.data);
				})
				.catch((e) => {
					console.error('error', e);
				});
		} else {
			waveSurfer.value.load(props.src);
		}
	});

	const togglePlayPause = () => {
		isPlaying.value ? waveSurfer.value.pause() : waveSurfer.value.play();
		isPlaying.value = !isPlaying.value;
	};

	onUnmounted(() => {
		waveSurfer.value.destroy();
	});

	defineExpose({
		waveSurfer,
	});
</script>
