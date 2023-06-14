<template>
	<div>
		<div class="relative z-[500]">
			<div
				class="fixed inset-0 bg-gray-700 bg-opacity-75 backdrop-blur-sm transition-opacity"
			/>
			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div
					class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
				>
					<div
						class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
					>
						<div>
							<h4 class="sr-only">Status</h4>
							<p class="text-xs font-normal text-gray-900">
								{{ statusMessage }}{{ ellipses }}
							</p>
							<div class="mt-4" aria-hidden="true">
								<div class="overflow-hidden rounded-full bg-gray-200">
									<div
										class="h-1 rounded-full bg-gradient-to-r from-indigo-600 to-sky-400 transition-all"
										:style="`width: ${progressBarWidth}%`"
									/>
								</div>
								<div class="mt-6 text-xs font-normal text-gray-600">
									Seriously though,
									<NuxtLink
										class="text-indigo-500 underline"
										to="/dashboard/projects"
										>return home</NuxtLink
									>
									and we'll let you know when we're done processing your
									request.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	let progressBarWidth = ref(0);
	let statusMessage = ref('');
	let ellipses = ref('');

	const messages = [
		'Fueling the jets',
		'Calculating the mass of the sun',
		"Calculating Planck's constant",
		'Baking a quantum pie',
		"Negotiating with Schrödinger's cat",
		'Counting the number of stars in a galaxy far, far away',
		'Deploying rubber duck for debugging',
		'Warming up the coffee machine',
		'Decoding the Matrix',
		'Locating John Connor',
		'Bending spoons with the mind',
		'Distracting HAL 9000',
		'Plugging into the Oasis',
		'Teleporting to the Upside Down',
		'Trying to understand the TARDIS',
		'Avoiding Weeping Angels',
		'Loading hyperspace coordinates',
		'Reticulating splines',
		'Charging flux capacitor',
		'Running Voight-Kampff test',
		'Plotting lightspeed jump',
		'Contacting Skynet',
		'Beaming up Scotty',
		'Engaging warp drive',
		'Searching for the answer to life, the universe, and everything',
		'Learning to speak Wookiee',
		'Dusting off the Infinity Gauntlet',
		'Unraveling the secrets of the Force',
		'Deciphering Stargate symbols',
		"Patching the Death Star's exhaust port",
		'Hunting replicants',
		'Waiting for the Tesseract to stabilize',
		'Initiating time travel sequence',
	];

	const updateProgress = () => {
		if (progressBarWidth.value >= 100) {
			progressBarWidth.value = 2;
		} else {
			// Generate a random number between 1 and 20 for the width increase
			progressBarWidth.value +=
				Math.floor(Math.random() * Math.random() * 20) + 1;
		}

		// Select a random status message
		statusMessage.value = messages[Math.floor(Math.random() * messages.length)];

		// Set the next update to occur after a random interval between 2000 and 5000 milliseconds
		setTimeout(updateProgress, Math.random() * 3000 + 2000);
	};

	updateProgress();

	setInterval(() => {
		if (ellipses.value.length < 3) {
			ellipses.value += '.';
		} else {
			ellipses.value = '';
		}
	}, 500);
</script>
