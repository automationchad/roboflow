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
	let selectedCategories = ref([]);

	const categories = computed(() => {
		return annotationsFile.categories.map((category) => {
			return { id: category.id, name: category.name };
		});
	});

	// Functions
	const handleFiles = () => {
		let file = fileInput.value.files[0];
		if (!file) {
			alert('No file selected.');
			return;
		}
		state.images = [];
		state.selectedFiles.add(file);
		state.images.push(URL.createObjectURL(file));
		predictedAnnotations.value = [];
		trueAnnotations.value = annotationsMap.get(file.name);
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

	const filteredAnnotations = computed(() => {
		if (selectedCategories.value.length === 0) {
			return trueAnnotations.value;
		} else {
			return trueAnnotations.value.filter((annotation) =>
				selectedCategories.value
					.map((o) => o.id)
					.includes(annotation.category_id)
			);
		}
	});

	const filteredPredictions = computed(() => {
		if (selectedCategories.value.length === 0) {
			return predictedAnnotations.value;
		} else {
			return predictedAnnotations.value.filter((prediction) =>
				selectedCategories.value.map((o) => o.name).includes(prediction.class)
			);
		}
	});

	let classStyles = computed(() => {
		let styles = {};
		selectedCategories.value.forEach((category, index) => {
			if (!category.id || !category.name) {
				console.error('Category object is missing id or name:', category);
				return; // skip this iteration
			}

			if (!styles[category.id]) {
				styles[category.id] = {};
			}

			styles[category.id]['background_styles'] = `background-color: hsl(${
				(index * 360) / selectedCategories.value.length
			}, 50%, 50%); opacity: 50%; color: white; font-size: 8px;`;
			styles[category.id]['border_styles'] = `border-color: hsl(${
				(index * 360) / selectedCategories.value.length
			}, 50%, 50%);`;

			if (!styles[category.name]) {
				styles[category.name] = {};
			}

			styles[category.name]['background_styles'] = `background-color: hsl(${
				(index * 360) / selectedCategories.value.length
			}, 50%, 50%); opacity: 50%; color: white; font-size: 8px;`;
			styles[category.name]['border_styles'] = `border-color: hsl(${
				(index * 360) / selectedCategories.value.length
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
			bbox: { x, y, width, height, area: width * height, corners, edges },
		};
		annotationsMap.get(fileName).push(newAnnotation);
	}
</script>

<template>
	<div id="inputForm">
		<!-- <div class="header">
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
		</div> -->

		<div class="content">
			<div class="">
				<div class="col" id="fileSelectionContainer">
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

				<div class="col-12" id="urlContainer" style="display: none">
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

				<div class="col-12">
					<label class="input__label" for="classes">Filter Classes</label>
					<fieldset>
						<div
							class="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
						>
							<div
								v-for="(category, categoryIdx) in categories"
								:key="categoryIdx"
								class="relative flex items-start py-4"
							>
								<div class="min-w-0 flex-1 text-sm leading-6">
									<label
										:for="`person-${category.id}`"
										class="select-none font-medium text-gray-900"
										>{{ category.name }}</label
									>
								</div>
								<div class="ml-3 flex h-6 items-center">
									<input
										:id="`category-${category.id}`"
										:name="`category-${category.id}`"
										type="checkbox"
										class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										:value="category"
										v-model="selectedCategories"
									/>
								</div>
							</div>
						</div>
					</fieldset>
				</div>

				<div class="col-12">
					<button
						:disabled="
							isLoading ||
							selectedCategories.length === 0 ||
							state.images.length === 0
						"
						@click="processImages"
						:class="[
							'font-regular bg-brand-fixed-1100 hover:bg-brand-fixed-1000 border-brand-fixed-1000 hover:border-brand-fixed-900 dark:border-brand-fixed-1000 dark:hover:border-brand-fixed-1000 focus-visible:outline-brand-600 relative inline-flex items-center justify-center space-x-2 rounded-md border px-3 py-2 text-center text-sm leading-4 text-white shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-50',
						]"
					>
						<svg
							v-if="isLoading"
							class="mr-3 h-5 w-5 animate-spin"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M12 4.75v1.5m5.126.624L16 8m3.25 4h-1.5m-.624 5.126-1.768-1.768M12 16.75v2.5m-3.36-3.891-1.768 1.768M7.25 12h-2.5m3.891-3.358L6.874 6.874"
							></path>
						</svg>
						<span class="truncate">{{
							isLoading ? 'Inferring...' : 'Run Inference'
						}}</span>
					</button>
				</div>
			</div>
			<div class="mt-8 grid grid-cols-3 gap-4">
				<div
					class="col-span-2 grid grid-cols-2 gap-4"
					v-if="selectedCategories.length > 0 && state.images.length > 0"
				>
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
								v-for="(annotation, index) in filteredAnnotations"
								:key="index"
								:style="`top: ${
									annotation.bbox.y - annotation.bbox.height / 2
								}px;
								left: ${annotation.bbox.x - annotation.bbox.width / 2}px;
								width: ${annotation.bbox.width}px;
								height: ${annotation.bbox.height}px; ${
									classStyles[annotation.category_id].border_styles
								}`"
							>
								<div
									:style="classStyles[annotation.category_id].background_styles"
								>
									{{
										categories.find((v) => v.id === annotation.category_id).name
									}}
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
								v-for="(annotation, index) in filteredPredictions"
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
				<div class="col-span-1 text-xs" v-if="false">
					<pre id="output" class="codeblock">{{ filteredAnnotations }}</pre>
					<pre id="output" class="codeblock">{{ filteredPredictions }}</pre>
					<pre id="output" class="codeblock">{{ classStyles }}</pre>
					<pre id="output" class="codeblock">{{ selectedCategories }}</pre>
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
