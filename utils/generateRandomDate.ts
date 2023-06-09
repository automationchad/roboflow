export default function (startDate: Date, endDate: Date) {
	const startTimestamp = startDate.getTime();
	const endTimestamp = endDate.getTime();

	// Generate a random timestamp within the range
	const randomTimestamp =
		Math.random() * (endTimestamp - startTimestamp) + startTimestamp;

	// Create a new Date object from the random timestamp
	const randomDate = new Date(randomTimestamp);

	return randomDate;
}
