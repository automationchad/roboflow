export default function (predictedEntities: Array, trueAnnotations: Array) {
	let totalIoUForThisImage = 0;
	let totalPredictionsForThisImage = predictedEntities.length;
	for (let i = 0; i < predictedEntities.length; i++) {
		let predictedEntity = predictedEntities[i];
		let trueAnnotation = trueAnnotations[i];

		if (predictedEntity === undefined || trueAnnotation === undefined) {
			continue;
		} else {
			let iou = IoU(trueAnnotation.bbox, predictedEntity);
			totalIoUForThisImage += iou;
		}
	}

	let averageIoUForThisImage =
		totalIoUForThisImage / totalPredictionsForThisImage;

	return averageIoUForThisImage;
}
