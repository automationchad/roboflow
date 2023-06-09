export default function (min: number, max: number) {
	const range = max - min;
	const baseValue = min + Math.random() * range;

	// Apply a random variance factor
	const variance = Math.random() * 1;
	const varianceValue = baseValue * variance;

	return Math.round(varianceValue);
}
