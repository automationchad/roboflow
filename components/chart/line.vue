<template>
	<Line
		:key="componentKey"
		id="my-chart-id"
		:options="chartOptions"
		:data="chartData"
		class="w-full font-normal"
	/>
</template>

<script setup>
	import { computed } from 'vue';
	import { Line } from 'vue-chartjs';
	import { format } from 'date-fns';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement,
		Filler,
	} from 'chart.js';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		CategoryScale,
		PointElement,
		Filler
	);

	const colorMode = useColorMode();
	const componentKey = ref(0);

	const isDarkMode = ref(colorMode.value === 'dark');

	onMounted(() => {
		isDarkMode.value = colorMode.value === 'dark';
	});

	watch(
		() => colorMode.value,
		(preference) => {
			if (preference === 'dark') {
				componentKey.value += 1;
				isDarkMode.value = true;
			} else {
				componentKey.value += 1;
				isDarkMode.value = false;
			}
		}
	);

	const props = defineProps({
		data: { type: Array, required: true },
		period: { type: Number, required: false },
	});

	const chartData = computed(() => {
		const borderColor = isDarkMode.value ? '50,50,252' : '50,188,252';
		return {
			labels: props.data.map((o) => o.date),
			datasets: [
				{
					tension: 0.3,
					fill: true,
					backgroundColor: (ctx) => {
						const canvas = ctx.chart.ctx;
						const gradient = canvas.createLinearGradient(0, 0, 0, 300);

						gradient.addColorStop(0, `rgba(${borderColor},0.6)`);
						gradient.addColorStop(0.2, `rgba(${borderColor},0.5)`);
						gradient.addColorStop(0.4, `rgba(${borderColor},0.3)`);
						gradient.addColorStop(0.6, `rgba(${borderColor},0.2)`);
						gradient.addColorStop(0.8, `rgba(${borderColor},0.1)`);
						gradient.addColorStop(1, `rgba(${borderColor},0)`);
						return gradient;
					},
					borderColor: `rgb(${borderColor})`,
					pointBackgroundColor: 'rgb(50,188,252)',
					borderWidth: 2,
					borderCapStyle: 'round',
					label: 'Executions',
					pointRadius: 0,
					data: props.data.map((o) => o.value),
				},
			],
		};
	});

	const chartOptions = computed(() => {
		return {
			plugins: {
				legend: {
					display: false,
					labels: {
						// This more specific font property overrides the global property
						font: {
							size: 10,
						},
					},
				},
			},
			scales: {
				x: {
					grid: { display: false },
					ticks: {
						color: isDarkMode.value ? 'white' : 'black',
						maxTicksLimit: 5,
						// For a category axis, the val is the index so the lookup via getLabelForValue is needed
					},
				},
				y: {
					grid: { display: false },
					ticks: { color: isDarkMode.value ? 'white' : 'black' },
				},
			},
		};
	});
</script>
