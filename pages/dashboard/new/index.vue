<script setup>
	definePageMeta({ layout: 'project', middleware: ['auth'] });

	import { ref } from 'vue';

	import { ExclamationCircleIcon } from '@heroicons/vue/24/solid';

	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption,
	} from '@headlessui/vue';

	const options = [
		{ id: 'client', name: 'Client' },
		{ id: 'partner', name: 'Partner' },
		{ id: 'personal', name: 'Personal' },
	];

	const selectedOption = ref(options[0]);

	const emit = defineEmits(['close-modal', 'org-submit', 'error']);
	const user = useSupabaseUser();
	const supabase = useSupabaseClient();

	const { data: userData, error: userError } = await supabase
		.from('User')
		.select('id,Account(type)')
		.eq('id', user.value.id)
		.limit(1)
		.single();

	if (userData.Account.type !== 'super_admin') {
		navigateTo(`/dashboard/new/${userData.Account.id}`);
	}

	const form_responses = ref({
		name: '',
		options: {
			partner: false,
		},
	});

	const loading = ref(false);
	const is_success = ref(false);
	const success_message = ref('');
	const is_error = ref(false);
	const error_message = ref('');
	const duped_name = ref('');
	const route = useRoute();

	const cancelAll = () => {
		form_responses.value = {
			name: '',
			options: {
				partner: false,
			},
		};
	};

	const handleSubmit = async (body) => {
		try {
			if (!body.name) {
				throw new Error('Organization name is empty');
			}
			loading.value = true;
			// Insert account data
			const { data: accountData, error: accountError } = await supabase
				.from('Account')
				.insert([
					{
						name: body.name,
						type: selectedOption.value.id,
						status: 'active',
					},
				])
				.select();

			if (accountError) {
				throw new Error(accountError.message);
			}

			// Create Stripe customer
			const customer = await $fetch('/api/stripe/customer/create', {
				method: 'post',
				body: {
					email: body.email,
					company_name: body.name,
				},
			});

			if (!customer || customer.error) {
				throw new Error(
					customer.error ? customer.error : 'Error creating customer'
				);
			}

			// Create Stripe subscription
			if (!body.options.partner) {
				const subscription = await $fetch('/api/stripe/subscription/create', {
					method: 'post',
					body: {
						customer,
					},
				});

				if (!subscription || subscription.error) {
					throw new Error(
						subscription.error
							? subscription.error
							: 'Error creating subscription'
					);
				}
			}
			navigateTo(`/dashboard/new/${accountData[0].id}`);
		} catch (error) {
			console.log(error);
			loading.value = false;
			duped_name.value = body.name;
			is_error.value = true;
			error_message.value = error.message;
			emit('error', error.message); // Emit the error up to the parent
		}
	};
</script>

<template>
	<div class="">
		<section class="has-slide-in slide-in relative mx-auto my-10 max-w-2xl">
			<div class="relative">
				<div class="transition-opacity duration-300">
					<div class="mb-8 rounded-md border bg-white/60 shadow-sm">
						<div class="bg-panel-body-light dark:bg-panel-body-dark">
							<div class="flex items-center px-6 py-4">
								<div><h4>Create a new organization</h4></div>
							</div>
						</div>
						<div class="bg-panel-body-light dark:bg-panel-body-dark">
							<div class="px-6 py-4 pt-0">
								<p class="text-sm">
									This is your organization within Supabase.
								</p>
								<p class="text-sm text-slate-600">
									For example, you can use the name of your company or
									department.
								</p>
							</div>
							<div
								class="Form section-block--body has-inputs-centered px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Name</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<div class="relative">
												<input
													v-model="form_responses.name"
													type="text"
													autofocus=""
													id=""
													name=""
													:disabled="loading"
													placeholder="Organization name"
													class="box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-300 shadow-sm outline-none transition-all focus:border-slate-500 focus:shadow-md focus:ring-2 focus:ring-current focus:ring-slate-300"
												/>
											</div>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
										<p
											class="mt-2 text-sm leading-normal text-slate-500"
											id="-description"
										>
											What's the name of your company or team?
										</p>
									</div>
								</div>
							</div>
							<div
								class="Form section-block--body has-inputs-centered px-6 py-4"
							>
								<div class="grid gap-2 text-sm md:grid md:grid-cols-12">
									<div class="col-span-4 flex flex-col space-y-2">
										<label class="text-scale-1100 block text-sm" for=""
											>Type of organization</label
										>
									</div>
									<div class="col-span-8">
										<div class="">
											<Listbox
												v-model="selectedOption"
												as="div"
												v-slot="{ open }"
											>
												<div class="relative">
													<ListboxButton
														:disabled="loading"
														:class="[
															open
																? 'border-slate-500 shadow-md ring-2 ring-slate-300'
																: '',
															'box-border block w-full rounded-md border border-slate-300 bg-slate-100 px-4 py-2 text-sm placeholder-slate-800 shadow-sm outline-none transition-all ',
														]"
													>
														<span
															class="flex w-full flex-row items-center space-x-3"
															><span class="truncate">{{
																selectedOption.name
															}}</span
															><span
																class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
																><svg
																	class="text-scale-600 h-5 w-5"
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 20 20"
																	fill="currentColor"
																	aria-hidden="true"
																>
																	<path
																		fill-rule="evenodd"
																		d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
																		clip-rule="evenodd"
																	></path></svg></span
														></span>
													</ListboxButton>
													<transition
														leave-active-class="transition ease-in duration-100"
														leave-from-class="opacity-100"
														leave-to-class="opacity-0"
														><div class="relative">
															<ListboxOptions
																class="dark:bg-scale-300 absolute z-[500] mt-1 max-h-60 w-full overflow-y-scroll rounded-md border border-solid border-gray-100 bg-white py-1 text-base shadow-lg dark:border-gray-600 sm:text-sm"
															>
																<ListboxOption
																	v-for="option in options"
																	:key="option.id"
																	:value="option"
																	v-slot="{ active, selected }"
																	><div
																		:class="[
																			active
																				? 'bg-slate-50 text-slate-900'
																				: 'text-slate-500',
																			selected
																				? 'bg-slate-200'
																				: 'text-slate-500',
																			'w-listbox focus:text-slate-1200  relative cursor-pointer select-none border-none py-2 pl-3 pr-9 text-sm transition focus:outline-none ',
																		]"
																	>
																		<div class="flex items-center space-x-3">
																			<span>{{ option.name }}</span>
																		</div>
																		<span
																			class="absolute inset-y-0 right-0 flex items-center pr-3 text-lime-500"
																			><svg
																				v-if="selected"
																				xmlns="http://www.w3.org/2000/svg"
																				width="21"
																				height="21"
																				viewBox="0 0 24 24"
																				fill="none"
																				stroke="currentColor"
																				stroke-linecap="round"
																				stroke-linejoin="round"
																				class="sbui-icon h-5 w-5"
																				aria-hidden="true"
																			>
																				<polyline
																					points="20 6 9 17 4 12"
																				></polyline></svg
																		></span>
																	</div>
																</ListboxOption>
															</ListboxOptions></div
													></transition>
												</div>
											</Listbox>
										</div>
										<p
											data-state="hide"
											class="data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all"
										></p>
										<p
											class="mt-2 text-sm leading-normal text-slate-500"
											id="-description"
										>
											What would best describe your organization?
										</p>
									</div>
								</div>
							</div>
						</div>
						<div
							class="border-panel-border-interior-light bg-panel-footer-light dark:border-panel-border-interior-dark dark:bg-panel-footer-dark border-t"
						>
							<div class="flex h-12 items-center px-6">
								<div class="flex w-full items-center justify-between">
									<NuxtLink
										:to="'/dashboard/projects'"
										class="font-regular bordershadow-scale-600 hover:bg-scale-300 focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center space-x-2 rounded bg-white px-2.5 py-1 text-center text-xs text-slate-900 shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-slate-50 focus-visible:outline-4 focus-visible:outline-offset-1"
										type="button"
									>
										<span class="truncate">Cancel</span>
									</NuxtLink>
									<div class="flex items-center space-x-3">
										<p class="text-xs text-slate-500">
											You can rename your organization later
										</p>
										<button
											:disabled="loading"
											@click="handleSubmit(form_responses)"
											:class="[
												'font-regular focus-visible:outline-brand-600 bordershadow-brand-fixed-1000 hover:bordershadow-brand-fixed-900 relative inline-flex items-center space-x-2 rounded bg-indigo-500 px-2.5 py-1 text-center text-xs text-white shadow-sm outline-none outline-0 transition transition-all duration-200 ease-out hover:bg-indigo-400 focus-visible:outline-4 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-50',
											]"
											type="button"
										>
											<svg
												v-if="loading"
												xmlns="http://www.w3.org/2000/svg"
												class="h-4 w-4 animate-spin"
												fill="none"
												viewBox="0 0 24 24"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="1.5"
													d="M12 4.75v1.5m5.126.624L16 8m3.25 4h-1.5m-.624 5.126-1.768-1.768M12 16.75v2.5m-3.36-3.891-1.768 1.768M7.25 12h-2.5m3.891-3.358L6.874 6.874"
												></path>
											</svg>

											<span class="truncate">Create organization</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<SuccessModal
				v-if="is_success"
				@close="is_success = false"
				:title="success_message"
				:description="''"
			/>
		</transition>
		<transition
			enter-active-class="transition ease-out duration-100"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<ErrorModal
				v-if="is_error"
				@close="is_error = false"
				:title="'Error: '"
				:description="error_message"
			/>
		</transition>
	</div>
</template>

<style scoped>
	:root {
		--width-listbox: 320px;
		--colors-amber1: #fefdfb;
		--colors-amber2: #fff9ed;
		--colors-amber3: #fff4d5;
		--colors-amber4: #ffecbc;
		--colors-amber5: #ffe3a2;
		--colors-amber6: #ffd386;
		--colors-amber7: #f3ba63;
		--colors-amber8: #ee9d2b;
		--colors-amber9: #ffb224;
		--colors-amber10: #ffa01c;
		--colors-amber11: #ad5700;
		--colors-amber12: #4e2009;
		--colors-amberA1: rgba(192, 130, 5, 0.016);
		--colors-amberA2: rgba(255, 171, 2, 0.071);
		--colors-amberA3: rgba(255, 187, 1, 0.165);
		--colors-amberA4: rgba(255, 183, 0, 0.263);
		--colors-amberA5: rgba(255, 179, 0, 0.365);
		--colors-amberA6: rgba(255, 162, 1, 0.475);
		--colors-amberA7: rgba(236, 141, 0, 0.612);
		--colors-amberA8: rgba(234, 137, 0, 0.832);
		--colors-amberA9: rgba(255, 166, 0, 0.859);
		--colors-amberA10: rgba(255, 149, 0, 0.891);
		--colors-amberA11: rgba(171, 83, 0, 0.98);
		--colors-amberA12: rgba(72, 24, 0, 0.965);
		--colors-blackA1: rgba(0, 0, 0, 0.012);
		--colors-blackA2: rgba(0, 0, 0, 0.027);
		--colors-blackA3: rgba(0, 0, 0, 0.047);
		--colors-blackA4: rgba(0, 0, 0, 0.071);
		--colors-blackA5: rgba(0, 0, 0, 0.09);
		--colors-blackA6: rgba(0, 0, 0, 0.114);
		--colors-blackA7: rgba(0, 0, 0, 0.141);
		--colors-blackA8: rgba(0, 0, 0, 0.22);
		--colors-blackA9: rgba(0, 0, 0, 0.439);
		--colors-blackA10: rgba(0, 0, 0, 0.478);
		--colors-blackA11: rgba(0, 0, 0, 0.565);
		--colors-blackA12: rgba(0, 0, 0, 0.91);
		--colors-blue1: #fbfdff;
		--colors-blue2: #f5faff;
		--colors-blue3: #edf6ff;
		--colors-blue4: #e1f0ff;
		--colors-blue5: #cee7fe;
		--colors-blue6: #b7d9f8;
		--colors-blue7: #96c7f2;
		--colors-blue8: #5eb0ef;
		--colors-blue9: #0091ff;
		--colors-blue10: #0081f1;
		--colors-blue11: #006adc;
		--colors-blue12: #00254d;
		--colors-blueA1: rgba(5, 130, 255, 0.016);
		--colors-blueA2: rgba(5, 130, 255, 0.04);
		--colors-blueA3: rgba(2, 128, 255, 0.071);
		--colors-blueA4: rgba(1, 128, 255, 0.118);
		--colors-blueA5: rgba(1, 128, 239, 0.189);
		--colors-blueA6: rgba(1, 119, 230, 0.283);
		--colors-blueA7: rgba(0, 119, 223, 0.412);
		--colors-blueA8: rgba(0, 130, 230, 0.632);
		--colors-blueA9: rgba(0, 145, 255, 0.98);
		--colors-blueA10: rgba(0, 128, 241, 0.98);
		--colors-blueA11: rgba(0, 102, 219, 0.98);
		--colors-blueA12: rgba(0, 33, 73, 0.98);
		--colors-crimson1: #fffcfd;
		--colors-crimson2: #fff7fb;
		--colors-crimson3: #feeff6;
		--colors-crimson4: #fce5f0;
		--colors-crimson5: #f9d8e7;
		--colors-crimson6: #f4c6db;
		--colors-crimson7: #edadc8;
		--colors-crimson8: #e58fb1;
		--colors-crimson9: #e93d82;
		--colors-crimson10: #e03177;
		--colors-crimson11: #d31e66;
		--colors-crimson12: #3d0d1d;
		--colors-crimsonA1: rgba(255, 5, 88, 0.012);
		--colors-crimsonA2: rgba(255, 5, 130, 0.032);
		--colors-crimsonA3: rgba(239, 1, 112, 0.063);
		--colors-crimsonA4: rgba(226, 0, 109, 0.102);
		--colors-crimsonA5: rgba(216, 0, 97, 0.153);
		--colors-crimsonA6: rgba(206, 1, 93, 0.224);
		--colors-crimsonA7: rgba(199, 0, 83, 0.322);
		--colors-crimsonA8: rgba(196, 0, 79, 0.44);
		--colors-crimsonA9: rgba(226, 0, 90, 0.761);
		--colors-crimsonA10: rgba(217, 0, 87, 0.808);
		--colors-crimsonA11: rgba(205, 0, 82, 0.883);
		--colors-crimsonA12: rgba(51, 0, 17, 0.95);
		--colors-gold1: #fdfdfc;
		--colors-gold2: #fbf9f2;
		--colors-gold3: #f5f2e9;
		--colors-gold4: #eeeadd;
		--colors-gold5: #e5dfd0;
		--colors-gold6: #dad1bd;
		--colors-gold7: #cbbda4;
		--colors-gold8: #b8a383;
		--colors-gold9: #978365;
		--colors-gold10: #8c795d;
		--colors-gold11: #776750;
		--colors-gold12: #3b352b;
		--colors-goldA1: rgba(88, 88, 5, 0.012);
		--colors-goldA2: rgba(176, 138, 0, 0.051);
		--colors-goldA3: rgba(140, 106, 2, 0.087);
		--colors-goldA4: rgba(128, 99, 1, 0.134);
		--colors-goldA5: rgba(114, 82, 1, 0.185);
		--colors-goldA6: rgba(112, 77, 0, 0.259);
		--colors-goldA7: rgba(110, 69, 0, 0.357);
		--colors-goldA8: rgba(109, 66, 0, 0.487);
		--colors-goldA9: rgba(83, 50, 0, 0.604);
		--colors-goldA10: rgba(74, 45, 0, 0.636);
		--colors-goldA11: rgba(57, 33, 0, 0.687);
		--colors-goldA12: rgba(19, 12, 0, 0.832);
		--colors-gray1: #fcfcfc;
		--colors-gray2: #f8f8f8;
		--colors-gray3: #f3f3f3;
		--colors-gray4: #ededed;
		--colors-gray5: #e8e8e8;
		--colors-gray6: #e2e2e2;
		--colors-gray7: #dbdbdb;
		--colors-gray8: #c7c7c7;
		--colors-gray9: #8f8f8f;
		--colors-gray10: #858585;
		--colors-gray11: #6f6f6f;
		--colors-gray12: #171717;
		--colors-grayA1: rgba(0, 0, 0, 0.012);
		--colors-grayA2: rgba(0, 0, 0, 0.027);
		--colors-grayA3: rgba(0, 0, 0, 0.047);
		--colors-grayA4: rgba(0, 0, 0, 0.071);
		--colors-grayA5: rgba(0, 0, 0, 0.09);
		--colors-grayA6: rgba(0, 0, 0, 0.114);
		--colors-grayA7: rgba(0, 0, 0, 0.141);
		--colors-grayA8: rgba(0, 0, 0, 0.22);
		--colors-grayA9: rgba(0, 0, 0, 0.439);
		--colors-grayA10: rgba(0, 0, 0, 0.478);
		--colors-grayA11: rgba(0, 0, 0, 0.565);
		--colors-grayA12: rgba(0, 0, 0, 0.91);
		--colors-green1: #fbfefc;
		--colors-green2: #f2fcf5;
		--colors-green3: #e9f9ee;
		--colors-green4: #ddf3e4;
		--colors-green5: #ccebd7;
		--colors-green6: #b4dfc4;
		--colors-green7: #92ceac;
		--colors-green8: #5bb98c;
		--colors-green9: #30a46c;
		--colors-green10: #299764;
		--colors-green11: #18794e;
		--colors-green12: #153226;
		--colors-greenA1: rgba(5, 192, 67, 0.016);
		--colors-greenA2: rgba(0, 196, 59, 0.051);
		--colors-greenA3: rgba(2, 186, 60, 0.087);
		--colors-greenA4: rgba(1, 166, 53, 0.134);
		--colors-greenA5: rgba(0, 155, 54, 0.2);
		--colors-greenA6: rgba(1, 147, 54, 0.295);
		--colors-greenA7: rgba(0, 140, 61, 0.428);
		--colors-greenA8: rgba(0, 147, 76, 0.644);
		--colors-greenA9: rgba(0, 143, 74, 0.812);
		--colors-greenA10: rgba(0, 131, 70, 0.84);
		--colors-greenA11: rgba(0, 107, 59, 0.906);
		--colors-greenA12: rgba(0, 32, 18, 0.918);
		--colors-indigo1: #fdfdfe;
		--colors-indigo2: #f8faff;
		--colors-indigo3: #f0f4ff;
		--colors-indigo4: #e6edfe;
		--colors-indigo5: #d9e2fc;
		--colors-indigo6: #c6d4f9;
		--colors-indigo7: #aec0f5;
		--colors-indigo8: #8da4ef;
		--colors-indigo9: #3e63dd;
		--colors-indigo10: #3a5ccc;
		--colors-indigo11: #3451b2;
		--colors-indigo12: #101d46;
		--colors-indigoA1: rgba(5, 5, 130, 0.008);
		--colors-indigoA2: rgba(5, 76, 255, 0.028);
		--colors-indigoA3: rgba(1, 68, 255, 0.059);
		--colors-indigoA4: rgba(2, 71, 245, 0.099);
		--colors-indigoA5: rgba(2, 60, 235, 0.15);
		--colors-indigoA6: rgba(1, 61, 228, 0.224);
		--colors-indigoA7: rgba(0, 56, 224, 0.318);
		--colors-indigoA8: rgba(1, 52, 219, 0.448);
		--colors-indigoA9: rgba(0, 49, 210, 0.757);
		--colors-indigoA10: rgba(0, 44, 189, 0.773);
		--colors-indigoA11: rgba(0, 37, 158, 0.797);
		--colors-indigoA12: rgba(0, 14, 58, 0.938);
		--colors-orange1: #fefcfb;
		--colors-orange2: #fef8f4;
		--colors-orange3: #fff1e7;
		--colors-orange4: #ffe8d7;
		--colors-orange5: #ffdcc3;
		--colors-orange6: #ffcca7;
		--colors-orange7: #ffb381;
		--colors-orange8: #fa934e;
		--colors-orange9: #f76808;
		--colors-orange10: #ed5f00;
		--colors-orange11: #bd4b00;
		--colors-orange12: #451e11;
		--colors-orangeA1: rgba(192, 67, 5, 0.016);
		--colors-orangeA2: rgba(232, 96, 5, 0.044);
		--colors-orangeA3: rgba(255, 108, 3, 0.095);
		--colors-orangeA4: rgba(255, 111, 0, 0.157);
		--colors-orangeA5: rgba(255, 107, 1, 0.236);
		--colors-orangeA6: rgba(255, 107, 1, 0.346);
		--colors-orangeA7: rgba(255, 102, 1, 0.495);
		--colors-orangeA8: rgba(248, 99, 0, 0.695);
		--colors-orangeA9: rgba(247, 99, 0, 0.969);
		--colors-orangeA10: rgba(237, 91, 0, 0.98);
		--colors-orangeA11: rgba(188, 72, 0, 0.98);
		--colors-orangeA12: rgba(56, 14, 0, 0.934);
		--colors-pink1: #fffcfe;
		--colors-pink2: #fff7fc;
		--colors-pink3: #feeef8;
		--colors-pink4: #fce5f3;
		--colors-pink5: #f9d8ec;
		--colors-pink6: #f3c6e2;
		--colors-pink7: #ecadd4;
		--colors-pink8: #e38ec3;
		--colors-pink9: #d6409f;
		--colors-pink10: #d23197;
		--colors-pink11: #cd1d8d;
		--colors-pink12: #3b0a2a;
		--colors-pinkA1: rgba(255, 5, 172, 0.012);
		--colors-pinkA2: rgba(255, 5, 159, 0.032);
		--colors-pinkA3: rgba(240, 1, 148, 0.067);
		--colors-pinkA4: rgba(226, 0, 139, 0.102);
		--colors-pinkA5: rgba(216, 0, 129, 0.153);
		--colors-pinkA6: rgba(201, 1, 124, 0.224);
		--colors-pinkA7: rgba(196, 0, 121, 0.322);
		--colors-pinkA8: rgba(192, 0, 118, 0.444);
		--colors-pinkA9: rgba(200, 0, 127, 0.75);
		--colors-pinkA10: rgba(199, 0, 126, 0.808);
		--colors-pinkA11: rgba(199, 0, 126, 0.887);
		--colors-pinkA12: rgba(51, 0, 33, 0.961);
		--colors-purple1: #fefcfe;
		--colors-purple2: #fdfaff;
		--colors-purple3: #f9f1fe;
		--colors-purple4: #f3e7fc;
		--colors-purple5: #eddbf9;
		--colors-purple6: #e3ccf4;
		--colors-purple7: #d3b4ed;
		--colors-purple8: #be93e4;
		--colors-purple9: #8e4ec6;
		--colors-purple10: #8445bc;
		--colors-purple11: #793aaf;
		--colors-purple12: #2b0e44;
		--colors-purpleA1: rgba(171, 5, 171, 0.012);
		--colors-purpleA2: rgba(155, 5, 255, 0.02);
		--colors-purpleA3: rgba(146, 0, 237, 0.055);
		--colors-purpleA4: rgba(128, 2, 224, 0.095);
		--colors-purpleA5: rgba(128, 1, 213, 0.142);
		--colors-purpleA6: rgba(117, 0, 200, 0.2);
		--colors-purpleA7: rgba(107, 1, 194, 0.295);
		--colors-purpleA8: rgba(102, 0, 191, 0.424);
		--colors-purpleA9: rgba(92, 0, 173, 0.695);
		--colors-purpleA10: rgba(87, 0, 163, 0.73);
		--colors-purpleA11: rgba(81, 0, 151, 0.773);
		--colors-purpleA12: rgba(31, 0, 57, 0.946);
		--colors-red1: #fffcfc;
		--colors-red2: #fff8f8;
		--colors-red3: #ffefef;
		--colors-red4: #ffe5e5;
		--colors-red5: #fdd8d8;
		--colors-red6: #f9c6c6;
		--colors-red7: #f3aeaf;
		--colors-red8: #eb9091;
		--colors-red9: #e5484d;
		--colors-red10: #dc3d43;
		--colors-red11: #cd2b31;
		--colors-red12: #381316;
		--colors-redA1: rgba(255, 5, 5, 0.012);
		--colors-redA2: rgba(255, 5, 5, 0.032);
		--colors-redA3: rgba(255, 1, 1, 0.063);
		--colors-redA4: rgba(255, 0, 0, 0.102);
		--colors-redA5: rgba(242, 0, 0, 0.153);
		--colors-redA6: rgba(228, 1, 1, 0.224);
		--colors-redA7: rgba(217, 0, 4, 0.318);
		--colors-redA8: rgba(209, 0, 4, 0.436);
		--colors-redA9: rgba(219, 0, 7, 0.718);
		--colors-redA10: rgba(209, 0, 7, 0.761);
		--colors-redA11: rgba(195, 0, 7, 0.832);
		--colors-redA12: rgba(40, 0, 3, 0.926);
		--colors-slate1: #fbfcfd;
		--colors-slate2: #f8f9fa;
		--colors-slate3: #f1f3f5;
		--colors-slate4: #eceef0;
		--colors-slate5: #e6e8eb;
		--colors-slate6: #dfe3e6;
		--colors-slate7: #d7dbdf;
		--colors-slate8: #c1c8cd;
		--colors-slate9: #889096;
		--colors-slate10: #7e868c;
		--colors-slate11: #687076;
		--colors-slate12: #11181c;
		--colors-slateA1: rgba(5, 68, 130, 0.016);
		--colors-slateA2: rgba(5, 41, 77, 0.028);
		--colors-slateA3: rgba(0, 37, 73, 0.055);
		--colors-slateA4: rgba(2, 28, 55, 0.075);
		--colors-slateA5: rgba(2, 23, 53, 0.099);
		--colors-slateA6: rgba(1, 33, 57, 0.126);
		--colors-slateA7: rgba(0, 26, 51, 0.157);
		--colors-slateA8: rgba(1, 30, 50, 0.244);
		--colors-slateA9: rgba(0, 17, 30, 0.467);
		--colors-slateA10: rgba(0, 16, 27, 0.506);
		--colors-slateA11: rgba(0, 14, 24, 0.593);
		--colors-slateA12: rgba(0, 8, 12, 0.934);
		--colors-tomato1: #fffcfc;
		--colors-tomato2: #fff8f7;
		--colors-tomato3: #fff0ee;
		--colors-tomato4: #ffe6e2;
		--colors-tomato5: #fdd8d3;
		--colors-tomato6: #fac7be;
		--colors-tomato7: #f3b0a2;
		--colors-tomato8: #ea9280;
		--colors-tomato9: #e54d2e;
		--colors-tomato10: #db4324;
		--colors-tomato11: #ca3214;
		--colors-tomato12: #341711;
		--colors-tomatoA1: rgba(255, 5, 5, 0.012);
		--colors-tomatoA2: rgba(255, 38, 5, 0.032);
		--colors-tomatoA3: rgba(255, 31, 1, 0.067);
		--colors-tomatoA4: rgba(255, 34, 1, 0.114);
		--colors-tomatoA5: rgba(244, 29, 1, 0.173);
		--colors-tomatoA6: rgba(236, 35, 0, 0.255);
		--colors-tomatoA7: rgba(222, 37, 0, 0.365);
		--colors-tomatoA8: rgba(213, 36, 1, 0.499);
		--colors-tomatoA9: rgba(223, 37, 0, 0.82);
		--colors-tomatoA10: rgba(213, 36, 0, 0.859);
		--colors-tomatoA11: rgba(198, 33, 0, 0.922);
		--colors-tomatoA12: rgba(38, 6, 0, 0.934);
		--colors-violet1: #fdfcfe;
		--colors-violet2: #fbfaff;
		--colors-violet3: #f5f2ff;
		--colors-violet4: #ede9fe;
		--colors-violet5: #e4defc;
		--colors-violet6: #d7cff9;
		--colors-violet7: #c4b8f3;
		--colors-violet8: #aa99ec;
		--colors-violet9: #6e56cf;
		--colors-violet10: #644fc1;
		--colors-violet11: #5746af;
		--colors-violet12: #20134b;
		--colors-violetA1: rgba(88, 5, 171, 0.012);
		--colors-violetA2: rgba(55, 5, 255, 0.02);
		--colors-violetA3: rgba(60, 0, 255, 0.051);
		--colors-violetA4: rgba(46, 2, 244, 0.087);
		--colors-violetA5: rgba(47, 1, 232, 0.13);
		--colors-violetA6: rgba(42, 1, 223, 0.189);
		--colors-violetA7: rgba(43, 1, 212, 0.279);
		--colors-violetA8: rgba(42, 0, 208, 0.4);
		--colors-violetA9: rgba(37, 0, 182, 0.663);
		--colors-violetA10: rgba(31, 0, 165, 0.691);
		--colors-violetA11: rgba(24, 0, 145, 0.726);
		--colors-violetA12: rgba(14, 0, 61, 0.926);
		--colors-whiteA1: hsla(0, 0%, 100%, 0);
		--colors-whiteA2: hsla(0, 0%, 100%, 0.013);
		--colors-whiteA3: hsla(0, 0%, 100%, 0.034);
		--colors-whiteA4: hsla(0, 0%, 100%, 0.056);
		--colors-whiteA5: hsla(0, 0%, 100%, 0.086);
		--colors-whiteA6: hsla(0, 0%, 100%, 0.124);
		--colors-whiteA7: hsla(0, 0%, 100%, 0.176);
		--colors-whiteA8: hsla(0, 0%, 100%, 0.249);
		--colors-whiteA9: hsla(0, 0%, 100%, 0.386);
		--colors-whiteA10: hsla(0, 0%, 100%, 0.446);
		--colors-whiteA11: hsla(0, 0%, 100%, 0.592);
		--colors-whiteA12: hsla(0, 0%, 100%, 0.923);
		--colors-yellow1: #fdfdf9;
		--colors-yellow2: #fffce8;
		--colors-yellow3: #fffbd1;
		--colors-yellow4: #fff8bb;
		--colors-yellow5: #fef2a4;
		--colors-yellow6: #f9e68c;
		--colors-yellow7: #efd36c;
		--colors-yellow8: #ebbc00;
		--colors-yellow9: #f5d90a;
		--colors-yellow10: #f7ce00;
		--colors-yellow11: #946800;
		--colors-yellow12: #35290f;
		--colors-yellowA1: transparent;
		--colors-yellowA2: rgba(250, 205, 0, 0.027);
		--colors-yellowA3: rgba(253, 190, 0, 0.071);
		--colors-yellowA4: rgba(253, 194, 0, 0.111);
		--colors-yellowA5: rgba(254, 199, 0, 0.15);
		--colors-yellowA6: rgba(254, 216, 0, 0.199);
		--colors-yellowA7: rgba(255, 219, 19, 0.269);
		--colors-yellowA8: rgba(254, 216, 0, 0.371);
		--colors-yellowA9: rgba(255, 226, 10, 0.956);
		--colors-yellowA10: rgba(255, 244, 94, 0.98);
		--colors-yellowA11: rgba(255, 204, 0, 0.934);
		--colors-yellowA12: rgba(255, 255, 213, 0.98);
		--colors-brand1: #fafefd;
		--colors-brand2: #f1fef7;
		--colors-brand3: #e9fcf2;
		--colors-brand4: #ddf8ea;
		--colors-brand5: #cef2df;
		--colors-brand6: #bde5d0;
		--colors-brand7: #8ed2af;
		--colors-brand8: #34b27b;
		--colors-brand9: #3fcf8e;
		--colors-brand10: #40bf86;
		--colors-brand11: #2b825b;
		--colors-brand12: #122b20;
		--colors-fixed-brand1: #fafefd;
		--colors-fixed-brand2: #f1fef7;
		--colors-fixed-brand3: #e9fcf2;
		--colors-fixed-brand4: #ddf8ea;
		--colors-fixed-brand5: #cef2df;
		--colors-fixed-brand6: #bde5d0;
		--colors-fixed-brand7: #8ed2af;
		--colors-fixed-brand8: #34b27b;
		--colors-fixed-brand9: #3fcf8e;
		--colors-fixed-brand10: #40bf86;
		--colors-fixed-brand11: #2b825b;
		--colors-fixed-brand12: #122b20;
	}
	.bordershadow-scale-600 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #dfe3e6 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-1000 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #7375ed 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}

	.bordershadow-brand-fixed-900 {
		box-shadow: rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgba(0, 0, 0, 0.22) 0 1px 1px 0, #e59fe9 0 0 0 1px,
			rgba(0, 0, 0, 0.012) 0 0 0 0, rgba(0, 0, 0, 0.012) 0 0 0 0,
			rgb(64 68 82/8%) 0 2px 5px 0;
	}
</style>
