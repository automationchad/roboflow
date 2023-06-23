export default function (predictedEntities: Array, trueAnnotations: Array) {
	// If there are no annotations, return 0

	if (trueAnnotations.length === 0) {
		return 0;
	}

	let totalIoUForThisImage = 0;
	let totalPredictionsForThisImage = predictedEntities.length;

	predictedEntities.forEach((predictedEntity: Object) => {
		let bestIoU = 0;
		let bestAnnotation = null;

		trueAnnotations.forEach((trueAnnotation: Object) => {
			let iou = calculateIoU(trueAnnotation.bbox, predictedEntity);

			if (iou > bestIoU) {
				bestIoU = iou;
				bestAnnotation = trueAnnotation;
			}
		});

		// If a corresponding annotation was found, add the IoU to the total
		if (bestAnnotation !== null) {
			totalIoUForThisImage += bestIoU;
		}
	});

	let averageIoUForThisImage =
		totalIoUForThisImage / totalPredictionsForThisImage;

	return averageIoUForThisImage;
}
