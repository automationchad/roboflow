export default function (number) {
	const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
	const tier = (Math.log10(Math.abs(number)) / 3) | 0;
	if (tier === 0) {
		return number;
	}
	if (tier > SI_SYMBOL.length - 1) {
		return 'Number too large';
	}
	const suffix = SI_SYMBOL[tier];
	const scale = 10 ** (tier * 3);
	const scaled = number / scale;
	const fixedTwo = scaled.toFixed(2);
	const fixedOne = scaled.toFixed(1);
	const integer = Math.floor(scaled);
	const precision = fixedTwo != fixedOne ? 2 : fixedOne != integer ? 1 : 0;
	const result = scaled.toFixed(precision);
	return parseFloat(result) + suffix;
}