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

let totalImages = 0;
let correctlyCountedImages = 0;

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

console.log(annotationsMap);

// Make request for each image
fs.readdir(imgDir, async (err, files) => {
	console.log('Running inference on test images...\n');
	if (err) {
		console.log(err);
		return;
	}
	totalImages = files.length;

	const requests = files.map((imgFile, index) => {
		const imgBytes = fs.readFileSync(imgDir + '/' + imgFile, {
			encoding: 'base64',
		});

		const imageId = index;

		let trueCount = annotationsMap.get(imageId)
			? annotationsMap.get(imageId).length
			: 0;
	
		return axios({
			method: 'POST',
			url,
			params,
			data: imgBytes,
			headers,
		})
			.then((response) => {
				// Count num predicted RBCs
				let predictedCount = response.data.predictions.filter(
					(prediction) => prediction.class === 'RBC'
				).length;

				// If the predicted count is correct, increment the counter
				if (predictedCount === trueCount) {
					correctlyCountedImages++;
				}
			})
			.catch((err) => {
				console.error(err);
			});
	});

	await Promise.all(requests);

	let accuracyCount = (correctlyCountedImages / totalImages) * 100;

	console.log(`Total Images: ${totalImages}\n`);
	console.log(`Images with correct count: ${correctlyCountedImages}\n`);
	console.log(`Accuracy Count: ${accuracyCount.toFixed(2)}%\n`);

	if (accuracyCount >= 90) {
		console.log('🎉 Great job! Accuracy Count is very high!');
	} else if (accuracyCount >= 75) {
		console.log('😃 Good job! Accuracy Count is quite good.');
	} else if (accuracyCount >= 50) {
		console.log('😐 Not bad, but there is room for improvement.');
	} else {
		console.log('😢 The Accuracy Count is low, need to improve the model.');
	}
});
