export default function formatAccounting(
	num: string | number,
	trailing: boolean
): string {
	if (typeof num === 'number' && !isFinite(num)) {
		num = 0;
	} else if (typeof num !== 'number') {
		num = parseFloat(num);
	}
	let formattedNum = num;
	if (Math.abs(formattedNum) >= 0.01) {
		formattedNum = Number(formattedNum.toFixed(2));
	} else if (Math.abs(formattedNum) < 0.01 && formattedNum !== 0) {
		formattedNum = Number(formattedNum.toFixed(5).replace(/0+$/, ''));
	} else {
		formattedNum = 0;
	}

	const numberWithCommas = (num: number): string => {
		const [whole, decimal] = num.toString().split('.');
		const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		const formattedDecimal = decimal ? decimal.padEnd(2, '0') : '00';
		return `${formattedWhole}.${formattedDecimal}`;
	};

	formattedNum = numberWithCommas(formattedNum);

	if (trailing) {
		formattedNum = formattedNum.replace(/\.?0+$/, '');
	}

	return num < 0 ? `-${formattedNum}` : `${formattedNum}`;
}
