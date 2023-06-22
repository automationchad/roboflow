<script setup>
	import { ref, reactive, toRefs } from 'vue';
	import annotationsFile from '../public/annotations.json';

	import { Switch } from '@headlessui/vue';

	import axios from 'axios';

	// Constants
	const url = 'https://detect.roboflow.com/blood-cell-detection-1ekwu/2';
	const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
	const params = { api_key: 'kxFwtA4VcEYhiYQBeaZe' };

	// Reactive variables
	const result = ref(null);
	const isLoading = ref(false);
	const error = ref(null);
	const fileInput = ref(null);
	const state = reactive({
		selectedFiles: new Set(),
		images: [],
	});

	let imageIdToFileName = new Map();
	let trueAnnotations = ref([]);
	let predictedAnnotations = ref([]);
	let originalImageWidth = ref(null);
	let originalImageHeight = ref(null);
	let scale = ref(1);

	let classesInput = ref('');

	const categoriesMap = computed(() => {
		const map = new Map();
		annotationsFile.categories.forEach((category) => {
			map.set(category.name, category.id);
		});
		return map;
	});

	const categoryIDNameMap = new Map();
	annotationsFile.categories.forEach((category) => {
		categoryIDNameMap.set(category.id, category.name);
	});

	// Functions
	const handleFiles = () => {
		let newFiles = Array.from(fileInput.value.files);
		if (newFiles.length + state.selectedFiles.size > 50) {
			alert('You can only select up to 50 files at once.');
			return;
		}
		newFiles.forEach((file) => {
			state.selectedFiles.add(file);
			state.images.push(URL.createObjectURL(file));
		});

		let classes = classesInput.value ? classesInput.value.split(',') : [];
		let categoryIds = classes.map((className) =>
			categoriesMap.value.get(className.trim())
		);

		trueAnnotations.value = annotationsMap
			.get(Array.from(state.selectedFiles).map((file) => file.name)[0])
			.filter(
				(annotation) =>
					categoryIds.length === 0 ||
					categoryIds.includes(annotation.category_id)
			);

		console.log(trueAnnotations.value);

		fileInput.value.value = '';
	};

	const onImageLoad = (event) => {
		originalImageWidth.value = event.target.naturalWidth;
		originalImageHeight.value = event.target.naturalHeight;
		scale.value = event.target.width / originalImageWidth.value;
	};

	const removeImage = (index) => {
		URL.revokeObjectURL(state.images[index]);
		let file = Array.from(state.selectedFiles)[index];
		state.selectedFiles.delete(file);
		state.images.splice(index, 1);
		fileInput.value.value = '';
	};

	const getBoundingBoxStyle = (annotation) => {
		let [x, y, width, height] = annotation.bbox;
		return {
			top: `${(y - height / 2) * scale.value}px`,
			left: `${(x - width / 2) * scale.value}px`,
			width: `${width * scale.value}px`,
			height: `${height * scale.value}px`,
		};
	};

	const IoU = (boxA, boxB) => {
		const xA = Math.max(boxA.x, boxB.x);
		const yA = Math.max(boxA.y, boxB.y);
		const xB = Math.min(boxA.x + boxA.width, boxB.x + boxB.width);
		const yB = Math.min(boxA.y + boxA.height, boxB.y + boxB.height);
		const intersectionArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
		const boxAArea = boxA.area;
		const boxBArea = boxB.width * boxB.height;
		const iou = intersectionArea / (boxAArea + boxBArea - intersectionArea);
		return iou;
	};

	const calculateBoundingBoxAccuracy = (predictedEntities, trueAnnotations) => {
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
	};

	let classStyles = computed(() => {
		let classes = classesInput.value.split(',');

		let styles = {};

		// You can customize the style generation logic here
		classes.forEach((className, index) => {
			let classTrim = className.trim();

			// Ensure the object exists before setting properties
			if (!styles[classTrim]) {
				styles[classTrim] = {};
			}

			// This assigns a random color to each class
			styles[classTrim]['background_styles'] = `background-color: hsl(${
				(index * 360) / classes.length
			}, 50%, 50%); opacity: 50%; color: white; font-size: 8px;`;
			styles[classTrim]['border_styles'] = `border-color: hsl(${
				(index * 360) / classes.length
			}, 50%, 50%);`;
		});

		return styles;
	});

	const processImages = async () => {
		isLoading.value = true;

		const promises = Array.from(state.selectedFiles).map(async (file) => {
			let formData = new FormData();
			formData.append('file', file);

			try {
				const response = await axios.post(url, formData, {
					headers: {
						...headers,
						'Content-Type': 'multipart/form-data',
					},
					params,
				});

				let predicted = response.data.predictions;

				// If classesInput is not empty, filter predictions
				if (classesInput.value.trim() !== '') {
					const classes = classesInput.value.split(',');
					predicted = predicted.filter((prediction) =>
						classes.includes(prediction.class)
					);
				}

				predictedAnnotations.value = predicted;

				return {
					fileName: file.name,
				};
			} catch (err) {
				console.error(err);
			}
		});

		try {
			const results = await Promise.all(promises);
			results.forEach((image) => {
				if (image) {
					result.value = image;
				}
			});
			isLoading.value = false;

			console.log(predictedAnnotations.value);
		} catch (err) {
			isLoading.value = false;
			error.value = err.message;
			console.error(err);
		}
	};

	// Initial setup

	const images = annotationsFile.images;
	for (let image of images) {
		imageIdToFileName.set(image.id, image.file_name);
	}

	const annotationsMap = new Map();
	for (const annotation of annotationsFile.annotations) {
		const fileName = imageIdToFileName.get(annotation.image_id);
		if (!annotationsMap.has(fileName)) {
			annotationsMap.set(fileName, []);
		}
		let { bbox, category_id } = annotation;
		let className = categoryIDNameMap.get(category_id); // Add this line
		let [x1, y1, width, height] = bbox;
		let x = x1 + width / 2;
		let y = y1 + height / 2;
		let x2 = x1 + width;
		let y2 = y1 + height;
		let corners = {
			topLeft: { x: x1, y: y1 },
			topRight: { x: x2, y: y1 },
			bottomRight: { x: x2, y: y2 },
			bottomLeft: { x: x1, y: y2 },
		};
		let edges = {
			top: [corners.topLeft, corners.topRight],
			right: [corners.topRight, corners.bottomRight],
			bottom: [corners.bottomRight, corners.bottomLeft],
			left: [corners.bottomLeft, corners.topLeft],
		};
		let newAnnotation = {
			...annotation,
			className, // Add this line
			bbox: { x, y, width, height, area: width * height, corners, edges },
		};
		annotationsMap.get(fileName).push(newAnnotation);
	}
</script>

<template>
	<div id="inputForm">
		<div class="header">
			<div class="header__grid">
				<img
					class="header__logo"
					src="https://uploads-ssl.webflow.com/5f6bc60e665f54545a1e52a5/6143750f1177056d60fc52d9_roboflow_logomark_inference.png"
					alt="Roboflow Inference"
				/>
				<div>
					<label class="header__label" for="model">Model</label>
					<input class="input" type="text" id="model" />
				</div>
				<div>
					<label class="header__label" for="version">Version</label>
					<input class="input" type="number" id="version" />
				</div>
				<div>
					<label class="header__label" for="api_key">API Key</label>
					<input class="input" type="text" id="api_key" />
				</div>
			</div>
		</div>

		<div class="content">
			<div class="content__grid">
				<div class="col-12-s6-m4" id="method">
					<label class="input__label">Upload Method</label>
					<Switch
						v-model="uploadMethod"
						:class="[
							uploadMethod ? 'bg-brand-600' : 'bg-gray-200',
							'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
						]"
					>
						<span class="sr-only">Use setting</span>
						<span
							aria-hidden="true"
							:class="[
								uploadMethod ? 'translate-x-5' : 'translate-x-0',
								'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
							]"
						/>
					</Switch>
				</div>

				<div class="col-12-m8" id="fileSelectionContainer">
					<label class="input__label" for="file">Select File</label>
					<div class="flex">
						<input
							class="input input--left flex-1"
							type="file"
							ref="fileInput"
							@change="handleFiles"
						/>
						<button
							@click="removeImage(0)"
							id="fileMock"
							class="bttn right active"
						>
							Clear
						</button>
					</div>
					<input style="display: none" type="file" id="file" />
				</div>

				<div class="col-12-m8" id="urlContainer" style="display: none">
					<label class="input__label" for="file">Enter Image URL</label>
					<div class="flex">
						<input
							type="text"
							id="url"
							placeholder="https://path.to/your.jpg"
							class="input"
						/><br />
					</div>
				</div>

				<div class="col-12-m6">
					<label class="input__label" for="classes">Filter Classes</label>
					<input
						type="text"
						id="classes"
						placeholder="Enter class names"
						class="input"
						v-model="classesInput"
					/><br />
					<span class="text--small">Separate names with commas</span>
				</div>

				<div class="col-6-m3 relative">
					<label class="input__label" for="confidence">Min Confidence</label>
					<div>
						<i class="fas fa-crown"></i>
						<span class="icon">%</span>
						<input
							type="number"
							id="confidence"
							value="40"
							max="100"
							accuracy="2"
							min="0"
							class="input input__icon"
						/>
					</div>
				</div>
				<div class="col-6-m3 relative">
					<label class="input__label" for="overlap">Max Overlap</label>
					<div>
						<i class="fas fa-object-ungroup"></i>
						<span class="icon">%</span>
						<input
							type="number"
							id="overlap"
							value="30"
							max="100"
							accuracy="2"
							min="0"
							class="input input__icon"
						/>
					</div>
				</div>
				<div class="col-6-m3" id="format">
					<label class="input__label">Inference Result</label>
					<div>
						<button
							id="imageButton"
							data-value="image"
							class="bttn left fill active"
						>
							Image
						</button>
						<button id="jsonButton" data-value="json" class="bttn right fill">
							JSON
						</button>
					</div>
				</div>
				<div class="col-12 content__grid" id="imageOptions">
					<div class="col-12-s6-m4" id="labels">
						<label class="input__label">Labels</label>
						<div>
							<button class="bttn left">Off</button>
							<button data-value="on" class="bttn right active">On</button>
						</div>
					</div>
					<div class="col-12-s6-m4" id="stroke">
						<label class="input__label">Stroke Width</label>
						<div>
							<button data-value="1" class="bttn left">1px</button>
							<button data-value="2" class="bttn">2px</button>
							<button data-value="5" class="bttn active">5px</button>
							<button data-value="10" class="bttn right">10px</button>
						</div>
					</div>
				</div>
				<div class="col-12">
					<button @click="processImages" class="bttn__primary">
						Run Inference
					</button>
				</div>
			</div>
			<div class="result" id="resultContainer" style="display: block">
				<div class="divider"></div>
				<div class="result__header">
					<h3 class="headline">Result</h3>
					<a href="#">Copy Code</a>
				</div>
				<!-- <pre id="output" class="codeblock">{{
					isLoading ? 'Inferring...' : result
				}}</pre> -->
				<div class="grid grid-cols-2 gap-4">
					<div class="col-span-1">
						<h2>Annotations</h2>
						<div class="image-container col-span-1">
							<img
								style="width: 416px; height: 416px"
								:src="state.images[0]"
								alt="Annotated Image"
								@load="onImageLoad"
							/>
							<div
								class="bounding-box"
								v-for="(annotation, index) in trueAnnotations"
								:key="index"
								:style="`top: ${
									annotation.bbox.y - annotation.bbox.height / 2
								}px;
								left: ${annotation.bbox.x - annotation.bbox.width / 2}px;
								width: ${annotation.bbox.width}px;
								height: ${annotation.bbox.height}px; ${
									classStyles[annotation.className].border_styles
								}`"
							>
								<div
									:style="classStyles[annotation.className].background_styles"
								>
									{{ annotation.className }}
								</div>
							</div>
						</div>
					</div>
					<div class="col-span-1">
						<h2>Prediction</h2>
						<div class="relative col-span-1">
							<img
								style="width: 416px; height: 416px"
								:src="state.images[0]"
								alt="Predicted Image"
							/>

							<div
								class="predicted-bounding-box flex flex-col justify-start"
								v-for="(annotation, index) in predictedAnnotations"
								:key="index"
								:style="`top: ${annotation.y - annotation.height / 2}px;
								left: ${annotation.x - annotation.width / 2}px;
								width: ${annotation.width}px;
								height: ${annotation.height}px; ${classStyles[annotation.class].border_styles}`"
							>
								<div :style="classStyles[annotation.class].background_styles">
									{{ annotation.class }} {{ annotation.confidence.toFixed(2) }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.box-RBC .box-label {
		background-color: green;
		font-size: 8px;
		color: white;
	}

	.box-class2 .box-label {
		background-color: blue;
		font-size: 8px;
		color: white;
	}

	.box-class3 .box-label {
		background-color: red;
		font-size: 8px;
		color: white;
	}
	.image-container {
		position: relative;
	}

	.bounding-box {
		position: absolute;
		border: 2px solid red;
	}

	.predicted-bounding-box {
		position: absolute;
		border: 2px solid green;
	}

	body {
		font-family: 'Inter', sans-serif;
		color: #666666;
		background-color: #f7fafc;
		font-size: 16px;
		padding-bottom: 5rem;
	}

	.headline {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.text--small {
		font-size: 0.875rem;
	}

	a {
		color: #606fc7;
		font-weight: 600;
	}

	a:hover {
		color: #434190;
	}

	i {
		position: absolute;
		padding: 0.75rem;
		color: #606fc7;
	}

	span.icon {
		position: absolute;
		padding: 0.5rem;
		right: 0;
	}

	.header {
		background-color: white;
		padding: 1rem;
		padding-bottom: 2.5rem;
	}

	.header__grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		grid-template-rows: repeat(3, minmax(0, 1fr));
		gap: 1.5rem;
		max-width: 56rem;
	}

	.header__logo {
		height: 4rem;
	}

	.header__label {
		text-transform: uppercase;
		display: block;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: #718096;
	}

	.content {
		padding: 1rem;
		width: 100%;
	}

	.content__grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-rows: repeat(3, minmax(0, 1fr));
		max-width: 56rem;
		column-gap: 1rem;
		row-gap: 2.5rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	.flex {
		display: flex;
	}

	.flex-1 {
		flex: 1 1 0%;
	}

	.relative {
		position: relative;
	}

	.col-6-m3 {
		grid-column: span 6 / span 6;
	}

	.col-12-s6-m4,
	.col-12-m6,
	.col-12-m8,
	.col-12 {
		grid-column: span 12 / span 12;
	}

	.result {
		max-width: 56rem;
	}

	.result__header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.divider {
		border-width: 1px;
		border-color: #cbd5e0;
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;
		height: 0;
	}

	input:disabled {
		background-color: white;
	}

	.input {
		border-width: 1px;
		border-color: #cbd5e0;
		border-radius: 0.25rem;
		height: 2.5rem;
		width: 100%;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	.input--left {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		margin-right: -1rem;
	}

	.input__icon {
		padding-left: 2.5rem;
		padding-right: 2.5rem;
	}

	.input__label {
		margin-bottom: 0.5rem;
		display: block;
	}

	.bttn {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		background-color: white;
		border-width: 1px;
		border-color: #cbd5e0;
		margin-right: -0.5rem;
		height: 2.5rem;
	}

	.bttn.fill {
		width: 50%;
	}

	.bttn:focus {
		outline: 1px dotted;
	}

	.bttn:hover {
		background-color: #edf2f7;
	}

	.left {
		border-top-left-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
	}

	.right {
		border-top-right-radius: 0.25rem;
		border-bottom-right-radius: 0.25rem;
		margin-right: 0;
	}

	.bttn.active {
		background-color: #606fc7;
		color: white;
		border-width: 1px;
		border-color: #606fc7;
	}

	.bttn__primary {
		background-color: #606fc7;
		color: white;
		border-width: 1px;
		border-color: #606fc7;
		border-radius: 0.25rem;
		font-size: 1.125rem;
		padding-left: 1.25rem;
		padding-right: 1.25rem;
		padding-top: 0.75rem;
		padding-bottom: 0.75rem;
	}

	.bttn.active:hover,
	.bttn__primary:hover {
		background-color: #4c51bf;
	}

	.codeblock {
		border-width: 1px;
		border-color: #cbd5e0;
		border-radius: 0.25rem;
		display: block;
		padding: 0.75rem;
		background-color: white;
	}

	#urlContainer {
		display: none;
	}

	/* small breakpoint */
	@media (min-width: 640px) {
		.header {
			padding: 2.5rem;
		}
		.header__grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-rows: repeat(2, minmax(0, 1fr));
		}
		.header__logo {
			grid-column: span 2 / span 2;
		}
		.content {
			padding: 2.5rem;
		}
		.content__grid {
			column-gap: 1rem;
			row-gap: 2.5rem;
		}
		.col-12-s6-m4 {
			grid-column: span 6 / span 6;
		}
	}

	/* medium breakpoint */
	@media (min-width: 768px) {
		.header__grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			grid-template-rows: repeat(1, minmax(0, 1fr));
		}
		.header__logo {
			grid-column: span 1 / span 1;
		}
		.col-6-m3 {
			grid-column: span 3 / span 3;
		}
		.col-12-s6-m4 {
			grid-column: span 4 / span 4;
		}
		.col-12-m6 {
			grid-column: span 6 / span 6;
		}
		.col-12-m8 {
			grid-column: span 8 / span 8;
		}
		.bttn {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}

	#resultContainer {
		display: none;
	}
</style>
