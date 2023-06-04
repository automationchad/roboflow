import {
	format,
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
	isFuture,
	isThisYear,
} from 'date-fns';

export default function (date: string) {
	const currentDate = new Date();
	const inputDate = new Date(date);

	const isDateInFuture = isFuture(inputDate);
	const isDateThisYear = isThisYear(inputDate);

	let diffInHours = Math.abs(differenceInHours(currentDate, inputDate));
	let diffInMinutes = Math.abs(differenceInMinutes(currentDate, inputDate));
	let diffInSeconds = Math.abs(differenceInSeconds(currentDate, inputDate));

	let result;
	if (!isDateThisYear) {
		result = format(inputDate, 'MMM dd, yyyy');
	} else if (diffInHours > 24) {
		result = format(inputDate, 'MMM dd');
	} else if (diffInHours >= 1) {
		result = `${diffInHours}h`;
	} else if (diffInMinutes >= 1) {
		result = `${diffInMinutes}m`;
	} else {
		result = `<1m`;
	}
	return result;
}
