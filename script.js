const axios = require('axios');
const fs = require('fs');
const imgDir = './test';
const annotationsFile = require('./_annotations.coco.json');

// Roboflow API
const url = 'https://detect.roboflow.com/blood-cell-detection-1ekwu/2';
const headers = {
	'Content-Type': 'application/x-www-form-urlencoded',
};
const params = {
	api_key: 'kxFwtA4VcEYhiYQBeaZe',
};

let trueCounts = 0;
let predictedCounts = 0;

const rbcCategoryId = annotationsFile.categories.find(
	(v) => v.name === 'RBC'
).id;

// Format the annotations into a map
const annotationsMap = new Map();
for (const annotation of annotationsFile.annotations) {
	if (annotation.category_id === rbcCategoryId) {
		if (!annotationsMap.has(annotation.image_id)) {
			annotationsMap.set(annotation.image_id, []);
		}
		annotationsMap.get(annotation.image_id).push(annotation);
	}
}

// Make request for each image
fs.readdir(imgDir, async (err, files) => {
    console.log('Running inference on test images...\n')
	if (err) {
		console.log(err);
		return;
	}
	const requests = files.map((imgFile) => {

		const imgBytes = fs.readFileSync(imgDir + '/' + imgFile, {
			encoding: 'base64',
		});

		return axios({
			method: 'POST',
			url,
			params,
			data: imgBytes,
			headers,
		})
			.then((response) => {
				// Count num predicted RBCs
				predictedCounts += response.data.predictions.filter(
					(prediction) => prediction.class === 'RBC'
				).length;
			})
			.catch((err) => {
				console.error(err);
			});
	});

	await Promise.all(requests);

	// Count num RBCs in ground truth
	for (const [imageId, annotations] of annotationsMap) {
		trueCounts += annotations.length;
	}

	let marginOfError = Math.abs(trueCounts - predictedCounts) / trueCounts;
	let accuracy = (1 - marginOfError) * 100;

	console.log(`True count of RBC: ${trueCounts}\n`);
	console.log(`Predicted count of RBC: ${predictedCounts}\n`);
	console.log(`Accuracy: ${accuracy.toFixed(2)}%\n`);

	if (accuracy >= 90) {
		console.log('🎉 Great job! Accuracy is very high!');
	} else if (accuracy >= 75) {
		console.log('😃 Good job! Accuracy is quite good.');
	} else if (accuracy >= 50) {
		console.log('😐 Not bad, but there is room for improvement.');
	} else {
		console.log('😢 The accuracy is low, need to improve the model.');
	}
});
