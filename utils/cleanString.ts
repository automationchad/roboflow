export default function (inputString) {
	// Remove special characters and replace spaces with underscores
	const cleanedString = inputString
		.replace(/[^A-Za-z0-9\s]/g, '') // Remove special characters
		.replace(/\s+/g, '_'); // Replace spaces with underscores

	return cleanedString;
}
