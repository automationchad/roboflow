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
							:disabled="
								user.profile.first_name != '' && user.profile.first_name != null
							"
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
							:disabled="
								user.profile.last_name != '' && user.profile.last_name != null
							"
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
							:disabled="user.email != '' && user.email != null"
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
								:disabled="
									user.profile.country_code != '' &&
									user.profile.country_code != null
								"
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
							:disabled="
								user.profile.phone_num != '' && user.profile.phone_num != null
							"
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
						if (
							this.spotsLeft.spots > 0 &&
							this.form.decision === 'true' &&
							this.user
						) {
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
