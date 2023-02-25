<template>
	<Line id="my-chart-id" :options="chartOptions" :data="chartData" />
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
		props: ['data'],
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

								gradient.addColorStop(0, 'rgba(102,218,252,0.9)');
								gradient.addColorStop(0.05, 'rgba(102,218,252,0.6)');
								gradient.addColorStop(1, 'rgba(102,218,252,0)');

								return gradient;
							},
							borderColor: 'rgb(50,188,252)',
							pointBackgroundColor: 'rgb(50,188,252)',
							borderWidth: 2,
							borderCapStyle: 'round',
							label: '',
							pointRadius: 3,
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
									size: 14,
								},
							},
						},
					},
					scales: {
						x: {
							grid: { display: false },
							ticks: {
								// For a category axis, the val is the index so the lookup via getLabelForValue is needed
								callback: function (val, index) {
									// Hide every 2nd tick label
									return index % 1 === 0 ? this.getLabelForValue(val) : '';
								},
							},
						},
					},
				},
			};
		},
	};
</script>
