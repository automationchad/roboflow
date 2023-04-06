<template>
	<Line
		id="my-chart-id"
		:options="chartOptions"
		:data="chartData"
		class="w-full font-normal"
	/>
</template>

<script>
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

	export default {
		name: 'BarChart',
		props: ['data', 'period'],
		components: { Line },
		data() {
			return {
				chartData: {
					labels: this.data.map((o) => o.date),
					datasets: [
						{
							tension: 0.3,
							fill: true,
							backgroundColor: (ctx) => {
								const canvas = ctx.chart.ctx;
								const gradient = canvas.createLinearGradient(0, 0, 0, 160);

								gradient.addColorStop(0, 'rgba(102,218,252,0.6)');

								gradient.addColorStop(0.5, 'rgba(102,218,252,0.5)');

								gradient.addColorStop(1, 'rgba(102,218,252,0.05)');

								return gradient;
							},
							borderColor: 'rgb(50,188,252)',
							pointBackgroundColor: 'rgb(50,188,252)',
							borderWidth: 2,
							borderCapStyle: 'round',
							label: 'Executions',
							pointRadius: 0,
							data: this.data.map((o) => o.value),
						},
					],
				},
				chartOptions: {
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
								color: 'black',
								maxTicksLimit: 5,
								// For a category axis, the val is the index so the lookup via getLabelForValue is needed
							},
						},
						y: {
							grid: { display: false },
							ticks: { color: 'black' },
						},
					},
				},
			};
		},
	};
</script>
