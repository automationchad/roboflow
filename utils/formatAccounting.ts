export default function (num) {
    if (typeof num !== 'number') num = parseFloat(num);
	let formattedNum = Math.abs(num)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');
	return num < 0 ? `($${formattedNum})` : `$${formattedNum}`;
}
