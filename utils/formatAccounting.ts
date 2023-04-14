export default function (num: string | number, dollar: boolean) {
	if (typeof num !== 'number') num = parseFloat(num);
	let formattedNum = Math.abs(num)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, '$&,');
	if (isNaN(formattedNum)) return "0.00";
	if (dollar) {
		return num < 0 ? `($${formattedNum})` : `$${formattedNum}`;
	} else return num < 0 ? `-${formattedNum}` : `${formattedNum}`;
}
