<script setup>
	import { differenceInDays } from 'date-fns';
	import {
		PaperClipIcon,
		QueueListIcon,
		SparklesIcon,
		ViewfinderCircleIcon,
		ClockIcon,
	} from '@heroicons/vue/24/outline';
</script>

<template>
	<form
		v-on:submit.prevent="submitForm"
		class="px-6 pb-24 pt-20 sm:pb-32 lg:py-48 lg:px-8"
	>
		<div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
			<div class="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
				<div>
					<label
						for="first-name"
						class="block text-sm font-semibold leading-6 text-white"
						>First name</label
					>
					<div class="mt-2.5">
						<input
							:disabled="user.profile.first_name"
							required
							v-model="form.first_name"
							type="text"
							name="first-name"
							id="first-name"
							autocomplete="given-name"
							class="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						/>
					</div>
				</div>
				<div>
					<label
						for="last-name"
						class="block text-sm font-semibold leading-6 text-white"
						>Last name</label
					>
					<div class="mt-2.5">
						<input
							:disabled="user.profile.last_name"
							required
							v-model="form.last_name"
							type="text"
							name="last-name"
							id="last-name"
							autocomplete="family-name"
							class="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						/>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label
						for="email"
						class="block text-sm font-semibold leading-6 text-white"
						>Email</label
					>
					<div class="mt-2.5">
						<input
							:disabled="user.email"
							v-model="form.email"
							required
							type="email"
							name="email"
							id="email"
							autocomplete="email"
							class="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						/>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label
						for="phone-number"
						class="block text-sm font-semibold leading-6 text-white"
						>Phone number</label
					>
					<div class="relative mt-2.5">
						<div class="absolute inset-y-0 left-0 flex items-center">
							<label for="country" class="sr-only">Country</label>
							<select
								:disabled="user.profile.country_code"
								v-model="form.phone_country"
								id="country"
								name="country"
								autocomplete="country"
								class="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							>
								<option value="1" selected>🇺🇸</option>
								<option value="1">🇨🇦</option>
								<option value="44">🇬🇧</option>
								<option value="61">🇦🇺</option>
							</select>
						</div>
						<input
							:disabled="user.profile.phone_num"
							v-model="form.phone"
							required
							type="tel"
							name="phone-number"
							id="phone-number"
							autocomplete="tel"
							class="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 pl-16 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						/>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label
						for="budget"
						class="block text-sm font-semibold leading-6 text-white"
						>Can you make financial decisions on behalf of your business above
						$10k?</label
					>
					<div class="mt-2.5">
						<select
							required
							v-model="form.decision"
							name="budget"
							id="budget"
							class="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							<option value="true" class="flex items-center">Yes</option>
							<option value="false" class="flex items-center">No</option>
						</select>
					</div>
				</div>
				<div class="sm:col-span-2">
					<label
						for="message"
						class="block text-sm font-semibold leading-6 text-white"
						>Message</label
					>
					<div class="mt-2.5">
						<textarea
							required
							v-model="form.description"
							name="message"
							id="message"
							rows="4"
							class="block w-full rounded-md border-0 bg-white/5 py-2 px-3.5 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						/>
					</div>
				</div>
			</div>
			<div class="mt-8 flex justify-end">
				<button
					type="submit"
					class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					<div v-if="spotsLeft.spots > 0" class="flex items-center">
						<SparklesIcon class="mr-1 h-5 w-5" />
						<span>Apply now</span>
					</div>
					<div v-else class="flex items-center">
						<QueueListIcon class="mr-1 h-5 w-5" />
						<span>Join waitlist</span>
					</div>
				</button>
			</div>
		</div>
		<FormSubmit :open-modal="success" />
	</form>

	<!-- <div class="h-full dark:bg-[#0A101E]">
		<div
			class="flex items-center justify-center py-12 px-6 sm:py-16 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-14"
		>
			<div class="">
				<div class="mx-auto max-w-md sm:max-w-lg lg:mx-0">
					<div class="relative mb-4 flex">
						<div
							:class="[
								spotsLeft.spots > 0 ? 'badge' : 'err-badge',
								' flex items-center rounded-full px-3 py-0.5 shadow-md',
							]"
						>
							<ClockIcon class="mr-1 h-4 w-4" v-if="!spotsLeft.spots > 0" />
							<p class="text-xs font-normal">
								{{
									spotsLeft.spots > 0
										? `${spotsLeft.spots} spot${
												spotsLeft.spots > 1 ? 's' : ''
										  } left`
										: ` ${spotsLeft.remaining_days} days`
								}}
							</p>
						</div>
					</div>
					<h2
						class="text-3xl font-bold tracking-tight dark:text-white sm:text-4xl"
					>
						Let's work together
					</h2>
					<p class="mt-4 text-lg text-gray-500 dark:text-gray-200 sm:mt-3">
						{{
							spotsLeft.spots > 0
								? `Please fill out the answers on this form so we can get you in touch with the appropriate member of our team.`
								: `Unfortunately, we're at capacity. Please submit your request and we'll reach out when availablity opens up.`
						}}
					</p>
					<form
						v-on:submit.prevent="submitForm"
						:v-model="form"
						class="mt-9 grid grid-cols-1 gap-y-6 transition-all sm:grid-cols-2 sm:gap-x-8"
					>
						<div>
							<label
								for="first-name"
								class="block text-sm font-medium text-gray-700 dark:text-white"
								>First name <span class="text-red-600">*</span></label
							>
							<div class="mt-1">
								<input
									:disabled="user.profile.first_name"
									required
									type="text"
									name="first-name"
									id="first-name"
									v-model="form.first_name"
									autocomplete="given-name"
									placeholder="John"
									class="block w-full rounded-md border-gray-300 shadow-sm transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
								/>
							</div>
						</div>
						<div>
							<label
								for="last-name"
								class="block text-sm font-medium text-gray-700 dark:text-white"
								>Last name <span class="text-red-600">*</span></label
							>
							<div class="mt-1">
								<input
									
									type="text"
									name="last-name"
									id="last-name"
									placeholder="Smith"
									
									autocomplete="family-name"
									class="block w-full rounded-md border-gray-300 shadow-sm transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
								/>
							</div>
						</div>
						<div class="">
							<label
								for="email"
								class="block text-sm font-medium text-gray-700 dark:text-white"
								>Email <span class="text-red-600">*</span></label
							>
							<div class="mt-1">
								<input
									
									id="email"
									name="email"
									type="email"
									
									autocomplete="email"
									class="block w-full rounded-md border-gray-300 shadow-sm transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:bg-gray-100 disabled:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
								/>
							</div>
						</div>
						<div class="">
							<label
								for="phone-number"
								class="block text-sm font-medium text-gray-700"
								>Phone Number</label
							>
							<div class="relative mt-1 rounded-md shadow-sm">
								<div class="absolute inset-y-0 left-0 flex items-center">
									<label for="country" class="sr-only">Country</label>
									<select
										:disabled="user.profile.country_code"
										v-model="form.phone_country"
										id="country"
										name="country"
										autocomplete="country"
										class="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									>
										<option value="1" selected>🇺🇸</option>
										<option value="1">🇨🇦</option>
										<option value="44">🇬🇧</option>
										<option value="61">🇦🇺</option>
									</select>
								</div>

								<input
									:disabled="user.profile.phone_num"
									v-model="form.phone"
									type="text"
									name="phone-number"
									id="phone-number"
									class="block w-full rounded-md border-gray-300 pl-16 focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm"
								/>
							</div>
						</div>
						<div class="sm:col-span-2">
							<div>
								<label
									for="type"
									class="block text-sm font-medium text-gray-700 dark:text-white"
									>What type of request is this</label
								>
								<select
									:disabled="user"
									v-model="form.type"
									id="type"
									name="type"
									class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
								>
									<option value="vendor">
										Software vendor wanting to be featured on our blueprint
										marketplace
									</option>
									<option selected="" value="client">
										Want us to build you a custom component that's not already
										listed
									</option>
								</select>
							</div>
						</div>
						<div class="sm:col-span-2">
							<div>
								<label
									required
									for="softwares"
									class="block text-sm font-medium text-gray-700 dark:text-white"
									>List the softwares involved<span class="text-red-600"
										>*</span
									></label
								>
								<div class="mt-1">
									<input
										type="text"
										name="softwares"
										id="softwares"
										v-model="form.softwares"
										class="block w-full rounded-md border-gray-300 shadow-sm transition-colors focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
										placeholder="Salesforce,Hubspot,Airtable,..."
										aria-describedby="email-description"
									/>
								</div>
								<p class="mt-2 text-xs text-gray-500" id="email-description">
									Separate using commas.
								</p>
							</div>
						</div>

						<div class="sm:col-span-2">
							<div class="flex justify-between">
								<label
									for="how-can-we-help"
									class="block text-sm font-medium text-gray-700 dark:text-white"
									>{{
										form.type === 'vendor'
											? "Describe the top use cases you'd want to feature"
											: 'Describe exactly what you want the workflow to do'
									}}
									<span class="text-red-600">*</span></label
								>
								<span
									id="how-can-we-help-description"
									class="text-sm text-gray-500"
									>Max. 500 characters</span
								>
							</div>
							<div class="mt-1">
								<textarea
									required
									id="how-can-we-help"
									name="how-can-we-help"
									v-model="form.description"
									aria-describedby="how-can-we-help-description"
									placeholder="Please integrate {product name} with {System being integrated with}. The integration should include {Insert specific features/functionalities to be integrated}."
									rows="4"
									minlength="10"
									maxlength="500"
									class="block w-full rounded-md border-gray-300 shadow-sm transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus:invalid:border-red-500 focus:invalid:ring-red-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
								/>
							</div>
						</div>

						<div class="sm:col-span-2">
							<div class="flex justify-between">
								<label
									for="loom"
									class="block text-sm font-medium text-gray-700 dark:text-white"
									>Loom recording</label
								>
								<span class="text-sm text-gray-500" id="loom-optional"
									>Optional</span
								>
							</div>
							<div class="relative mt-1 rounded-md shadow-sm">
								<div
									class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
								>
									<ViewfinderCircleIcon
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</div>
								<input
									type="url"
									name="loom"
									id="loom"
									v-model="form.videoUrl"
									class="block w-full rounded-md border-gray-300 pl-10 transition-colors focus:border-indigo-500 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
									placeholder="https://www.loom.com/share/..."
								/>
							</div>
						</div>

						<div class="sm:col-span-2">
							<label class="text-sm font-medium text-gray-700 dark:text-white"
								>Are you in a position to invest upwards of
								{{ form.type === 'vendor' ? '$50,000' : '$8,000' }} to engage
								our team? <span class="text-red-600">*</span></label
							>
							<select
								required
								class="mt-1 block w-full space-y-4 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base transition-colors focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm"
								v-model="form.decision"
							>
								<option
									value="true"
									class="flex items-center"
								>
									Yes
								</option>
								<option
									value="false"
									class="flex items-center"
								>
									No
								</option>
							</select>
						</div>

						<div class="text-right sm:col-span-2">
							<button
								type="submit"
								class="inline-flex justify-center rounded-md border border-gray-400 bg-white py-2 px-4 text-sm font-medium text-black shadow-sm transition-transform hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-transparent"
							>
								<div v-if="spotsLeft.spots > 0" class="flex items-center">
									<SparklesIcon class="mr-1 h-5 w-5" />
									<span>Apply now</span>
								</div>
								<div v-else class="flex items-center">
									<QueueListIcon class="mr-1 h-5 w-5" />
									<span>Join waitlist</span>
								</div>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		
	</div> -->
	
</template>

<script>
	export default {
		props: ['requests', 'user', 'type'],
		data() {
			return {
				maxSpots: 5,
				success: false,
				notificationMethods: [
					{ id: 'yes', title: 'Yes' },
					{ id: 'no', title: 'No' },
				],
				form: {
					first_name: this.user ? this.user?.profile?.first_name : '',
					last_name: this.user ? this.user?.profile?.last_name : '',
					phone_country: this.user.profile.country_code
						? this.user.profile.country_code
						: '1',
					phone: this.user.profile.phone_num ? this.user.profile.phone_num : '',
					type: this.type ? this.type : 'vendor',
					email: this.user ? this.user.email : '',
					videoUrl: '',
					softwares: '',
					description: '',
					decision: 'no',
				},
			};
		},
		computed: {
			spotsLeft() {
				var arrNum = Math.abs(this.maxSpots - this.requests.length);
				console.log(arrNum);
				let remaining_days;
				if (this.maxSpots <= this.requests.length) {
					remaining_days = differenceInDays(
						new Date(this.requests[arrNum].fields.est_finish_date),
						new Date()
					);
				} else remaining_days = 0;
				return {
					spots:
						this.requests.length >= this.maxSpots
							? 0
							: this.maxSpots - this.requests.length,
					remaining_days,
				};
			},
		},
		methods: {
			async submitForm() {
				this.form.status = this.spotsLeft.spots > 0 ? 'request' : 'backlog';
				const data = await $fetch(
					'https://bcf0e6f4-bc54-41a6-899f-cf62cb7b5df0.trayapp.io',
					{ method: 'post', body: { data: this.form } }
				)
					.then((res) => {
						this.success = true;
						if (this.spotsLeft.spots > 0 && this.form.decision === 'true') {
							setTimeout(() => {
								location.href = `https://calendly.com/motis-group/session?name=${
									this.form.first_name + '%20' + this.form.last_name
								}&email=${this.form.email}&a1=${
									this.form.phone_country + this.form.phone
								}&a2=${this.form.description}`;
							}, 2000);
						} else {
							setTimeout(() => {
								location.href = '/';
							}, 2000);
							this.form = {
								first_name: '',
								last_name: '',
								phone: '',
								phone_country: '',
								softwares: '',
								email: '',
								videoUrl: '',
								description: '',
								decision: 'no',
								status: '',
							};
						}
					})
					.catch((error) => {
						console.log(error);
						// error.response.status Check status code
					})
					.finally(() => {
						//Perform action in always
					});
			},
		},
	};
</script>

<style scoped>
	.err-badge {
		background-size: 100% 100%;
		background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
		background-image: radial-gradient(
				49% 81% at 45% 47%,
				#ffe20345 0%,
				#073aff00 100%
			),
			radial-gradient(113% 91% at 17% -2%, #ff5a00ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at 83% 7%, #ffdb00ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at -6% 74%, #ff0049ff 1%, #ff000000 99%),
			radial-gradient(142% 91% at 111% 84%, #ff7000ff 0%, #ff0000ff 100%);
		color: rgb(0, 0, 0);
	}
	.badge {
		background-size: 100% 100%;
		background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px,
			0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
		background-image: radial-gradient(
				18% 28% at 24% 50%,
				#cefaffff 7%,
				#073aff00 100%
			),
			radial-gradient(18% 28% at 18% 71%, #ffffff59 6%, #073aff00 100%),
			radial-gradient(70% 53% at 36% 76%, #73f2ffff 0%, #073aff00 100%),
			radial-gradient(42% 53% at 15% 94%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(42% 53% at 34% 72%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(18% 28% at 35% 87%, #ffffffff 7%, #073aff00 100%),
			radial-gradient(31% 43% at 7% 98%, #ffffffff 24%, #073aff00 100%),
			radial-gradient(21% 37% at 72% 23%, #d3ff6d9c 24%, #073aff00 100%),
			radial-gradient(35% 56% at 91% 74%, #8a4ffff5 9%, #073aff00 100%),
			radial-gradient(74% 86% at 67% 38%, #6dffaef5 24%, #073aff00 100%),
			linear-gradient(125deg, #4eb5ffff 1%, #4c00fcff 100%);
		color: #00373e;
	}
</style>
