<template>
	<div class="h-full">
		<div
			class="mt-4 rounded-md bg-red-50 p-4"
			v-if="User.systemRole !== 'owner' && User.systemRole !== 'super_admin'"
		>
			<div class="flex">
				<div class="flex-shrink-0">
					<XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
				</div>
				<div class="ml-3">
					<h3 class="text-sm font-medium text-red-800">
						You currently don't have access to change billing details
					</h3>

					<span class="mt-2 text-sm text-red-700">
						Contact an owner to request these changes.
					</span>
				</div>
			</div>
		</div>
		<div class="mt-4 space-y-6 lg:px-0">
			<!-- Plan -->
			<section aria-labelledby="plan-heading">
				<fieldset
					:disabled="
						User.systemRole !== 'owner' && User.systemRole !== 'super_admin'
					"
					class="disabled:opacity-60"
				>
					<div class="sm:overflow-hidden">
						<div role="tabpanel" class="sc-gsnTZi kJQFiu">
							<div class="sc-gsnTZi mQgVe">
								<div class="sc-gsnTZi fZyFmh">
									<div class="sc-gsnTZi ffhScO">
										<div class="sc-gsnTZi ffhScO">
											<div class="sc-ckMVTt csGkIt">
												<div display="flex" class="sc-gsnTZi eMxiQG">
													<h4 class="sc-fbPSWO bOtoTi">Organization</h4>
													<div class="sc-TRNrF iPuFes"></div>
												</div>
												<hr
													orientation="horizontal"
													role="separator"
													class="sc-lbOyJj evDKwP"
												/>
												<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
													<div class="sc-bWXABl dfOvQI" type="text">
														<div class="sc-eFWqGp jCuTic">
															<small>Name</small>admin-templates
														</div>
													</div>
													<div class="sc-bWXABl dfOvOR" type="icon">
														<button
															class="sc-jqUVSM eLperz sc-crXcEl hXPYDT ghost"
														>
															<div class="sc-iqcoie fYkzzL">
																<div
																	class="sc-jSMfEi iAfUcO animated"
																	size="16"
																	color="inherit"
																></div>
															</div>
															<div class="sc-gsnTZi blWcoZ">
																<span class="sc-hKMtZM fPKIPe icon"
																	><svg
																		width="100%"
																		height="100%"
																		viewBox="0 0 24 24"
																		fill="currentColor"
																		stroke="none"
																	>
																		<path
																			fill-rule="evenodd"
																			clip-rule="evenodd"
																			d="M19 3.172a1.829 1.829 0 0 0-1.293.535L4.395 17.02l-.97 3.556 3.556-.97L20.293 6.293A1.829 1.829 0 0 0 19 3.172Zm-1.465-1.709a3.829 3.829 0 0 1 4.172 6.244l-13.5 13.5a1 1 0 0 1-.444.258l-5.5 1.5a1 1 0 0 1-1.228-1.228l1.5-5.5a1 1 0 0 1 .258-.444l13.5-13.5a3.83 3.83 0 0 1 1.242-.83Z"
																			fill="currentColor"
																		></path></svg
																></span>
															</div>
														</button>
													</div>
												</li>
												<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
													<div class="sc-bWXABl dfOvQI" type="text">
														<div class="sc-eFWqGp jCuTic">
															<small>Short name</small>motisgroup4t7p5
														</div>
													</div>
													<div class="sc-bWXABl dfOvOR" type="icon">
														<div class="sc-fEOsli cLJBNf">
															<span class="sc-bjUoiL gdftMO"
																><div
																	display="flex"
																	class="sc-gsnTZi sc-jhzXDd kmvIMm jbSHOB"
																>
																	<span class="sc-hKMtZM bYOdYE sc-hjQCSK jxYcT"
																		><svg
																			width="100%"
																			height="100%"
																			viewBox="0 0 24 24"
																			fill="currentColor"
																			stroke="none"
																		>
																			<path
																				fill-rule="evenodd"
																				clip-rule="evenodd"
																				d="M9.172 4.172A4 4 0 0 1 16 7v3H8V7a4 4 0 0 1 1.172-2.828ZM6 10V7a6 6 0 1 1 12 0v3h1a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3h1Zm11 2H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-2Z"
																				fill="currentColor"
																			></path></svg
																	></span></div
															></span>
														</div>
													</div>
												</li>
												<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
													<div class="sc-bWXABl dfOvQI" type="text">
														<div class="sc-eFWqGp jCuTic">
															<small>Organization ID</small
															>2933d3e7-770c-4c2b-9f17-0253f8fbcf9f
														</div>
													</div>
												</li>
												<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
													<div class="sc-bWXABl dfOvQI" type="text">
														<div class="sc-eFWqGp jCuTic">
															<small>Picture URL</small>
															<div class="sc-gsnTZi gCYSzp"></div>
														</div>
													</div>
													<div class="sc-bWXABl dfOvOR" type="icon">
														<button
															class="sc-jqUVSM eLperz sc-crXcEl hXPYDT ghost"
														>
															<div class="sc-iqcoie fYkzzL">
																<div
																	class="sc-jSMfEi iAfUcO animated"
																	size="16"
																	color="inherit"
																></div>
															</div>
															<div class="sc-gsnTZi blWcoZ">
																<span class="sc-hKMtZM fPKIPe icon"
																	><svg
																		width="100%"
																		height="100%"
																		viewBox="0 0 24 24"
																		fill="currentColor"
																		stroke="none"
																	>
																		<path
																			fill-rule="evenodd"
																			clip-rule="evenodd"
																			d="M19 3.172a1.829 1.829 0 0 0-1.293.535L4.395 17.02l-.97 3.556 3.556-.97L20.293 6.293A1.829 1.829 0 0 0 19 3.172Zm-1.465-1.709a3.829 3.829 0 0 1 4.172 6.244l-13.5 13.5a1 1 0 0 1-.444.258l-5.5 1.5a1 1 0 0 1-1.228-1.228l1.5-5.5a1 1 0 0 1 .258-.444l13.5-13.5a3.83 3.83 0 0 1 1.242-.83Z"
																			fill="currentColor"
																		></path></svg
																></span>
															</div>
														</button>
													</div>
												</li>
												<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
													<div class="sc-caXVBt kGlIKY">
														<div>
															<label class="sc-ivTmOn DPcjy"
																><strong class="sc-bBrHrO iXwHRn"
																	><span>Timezone</span></strong
																>
																<div class="sc-cxabCf cgnODW">
																	<input
																		type="text"
																		aria-expanded="false"
																		aria-haspopup="menu"
																		id=":rlt:"
																		class="sc-llJcti kmASOK"
																		value="Local time (every user will see the date in their local time)"
																	/>
																	<div>
																		<div></div>
																		<div>
																			<span class="sc-hKMtZM bYOdYE icon"
																				><svg
																					width="100%"
																					height="100%"
																					viewBox="0 0 24 24"
																					fill="currentColor"
																					stroke="none"
																				>
																					<path
																						fill-rule="evenodd"
																						clip-rule="evenodd"
																						d="M5.293 8.293a1 1 0 0 1 1.414 0L12 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414Z"
																						fill="currentColor"
																					></path></svg
																			></span>
																		</div>
																	</div></div
															></label>
														</div>
														<small class="sc-iIPllB bWbWDd"
															>This timezone will show for all users in this
															organization</small
														>
													</div>
												</li>
												<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
													<div class="sc-bWXABl dfOvQI" type="text">
														<div class="sc-eFWqGp jCuTic">
															<small>Clock</small>
															<div direction="row" class="sc-cCsOjp htWnge">
																<label class="sc-ciZhAO hloVtL"
																	><input
																		name="nice"
																		type="radio"
																		class="sc-jdAMXn ciXReX"
																		value="12"
																	/><strong>12-hour clock</strong></label
																><label class="sc-ciZhAO hloVtL"
																	><input
																		name="nice"
																		type="radio"
																		class="sc-jdAMXn ciXReX"
																		value="24"
																		checked=""
																	/><strong>24-hour clock</strong></label
																>
															</div>
														</div>
													</div>
												</li>
											</div>
										</div>
										<div class="sc-ckMVTt csGkIt">
											<div display="flex" class="sc-gsnTZi eMxiQG">
												<h4 class="sc-fbPSWO bOtoTi">Danger zone</h4>
												<div class="sc-TRNrF iPuFes"></div>
											</div>
											<hr
												orientation="horizontal"
												role="separator"
												class="sc-lbOyJj evDKwP"
											/>
											<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
												<div class="sc-bWXABl dfOvQI" type="text">
													<div class="sc-eFWqGp jCuTic">
														Delete organization<small
															>Delete the organization and all data associated
															with it. This action cannot be reverted.</small
														>
													</div>
												</div>
												<div class="sc-bWXABl dfOvOR" type="icon">
													<div class="sc-dmRaPn jlnHkP">
														<div class="sc-kgflAQ bNslnw">
															<button
																disabled=""
																class="sc-jqUVSM eLperz sc-crXcEl hXPYDT ghost"
															>
																<div class="sc-iqcoie fYkzzL">
																	<div
																		class="sc-jSMfEi iAfUcO animated"
																		size="16"
																		color="inherit"
																	></div>
																</div>
																<div class="sc-gsnTZi blWcoZ">
																	<span class="sc-hKMtZM fPKIPe icon"
																		><svg
																			width="100%"
																			height="100%"
																			viewBox="0 0 24 24"
																			fill="currentColor"
																			stroke="none"
																		>
																			<path
																				fill-rule="evenodd"
																				clip-rule="evenodd"
																				d="M9.293 3.293A1 1 0 0 1 10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 .293-.707ZM7 5V4a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1h4a1 1 0 1 1 0 2h-1v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7H3a1 1 0 0 1 0-2h4ZM6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7H6Zm4 3a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm5 7v-6a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0Z"
																				fill="currentColor"
																			></path></svg
																	></span>
																</div>
															</button>
														</div>
													</div>
												</div>
											</li>
											<li class="sc-csvncw sc-gITdmR eKxcFR crHSes">
												<div class="sc-bWXABl dfOvQI" type="text">
													<div class="sc-eFWqGp jCuTic">
														Leave organization<small
															>Are you sure you want to leave this
															organization?</small
														>
													</div>
												</div>
												<div class="sc-bWXABl dfOvOR" type="icon">
													<div class="sc-dmRaPn jlnHkP">
														<div class="sc-kgflAQ bNslnw">
															<button
																disabled=""
																class="sc-jqUVSM eLperz sc-crXcEl hXPYDT ghost"
															>
																<div class="sc-iqcoie fYkzzL">
																	<div
																		class="sc-jSMfEi iAfUcO animated"
																		size="16"
																		color="inherit"
																	></div>
																</div>
																<div class="sc-gsnTZi blWcoZ">
																	<span class="sc-hKMtZM fPKIPe icon"
																		><svg
																			width="100%"
																			height="100%"
																			viewBox="0 0 24 24"
																			fill="currentColor"
																			stroke="none"
																		>
																			<path
																				fill-rule="evenodd"
																				clip-rule="evenodd"
																				d="M5.5 7a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM5 14a5 5 0 0 0-5 5v2a1 1 0 1 0 2 0v-2a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v2a1 1 0 1 0 2 0v-2a5 5 0 0 0-5-5H5Zm12.293-6.707a1 1 0 0 1 1.414 0L20.5 9.086l1.793-1.793a1 1 0 1 1 1.414 1.414L21.914 10.5l1.793 1.793a1 1 0 0 1-1.414 1.414L20.5 11.914l-1.793 1.793a1 1 0 0 1-1.414-1.414l1.793-1.793-1.793-1.793a1 1 0 0 1 0-1.414Z"
																				fill="currentColor"
																			></path></svg
																	></span>
																</div>
															</button>
														</div>
													</div>
												</div>
											</li>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</fieldset>
			</section>
			<!-- Add Ons -->
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		RadioGroup,
		RadioGroupDescription,
		RadioGroupLabel,
		RadioGroupOption,
		Switch,
		SwitchGroup,
		SwitchLabel,
	} from '@headlessui/vue';
	import {
		MagnifyingGlassIcon,
		QuestionMarkCircleIcon,
		XCircleIcon,
	} from '@heroicons/vue/20/solid';
	import {
		Bars3Icon,
		BellIcon,
		PencilIcon,
		ExclamationTriangleIcon,
		CogIcon,
		CreditCardIcon,
		SparklesIcon,
		KeyIcon,
		SquaresPlusIcon,
		UserCircleIcon,
		XMarkIcon,
	} from '@heroicons/vue/24/outline';

	import { format } from 'date-fns';

	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 stripeCustomerId,
		 trayWorkspaceId,
		 Subscription(*),
		 Team (
			id,
			name
		 )
	   )`
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	console.log(User);

	const handleCheckout = async (product, type, customer) => {
		const { url } = await $fetch('/api/stripe/checkout', {
			method: 'post',
			body: {
				product,
				type,
				customer,
				account: User.Account,
			},
		});
		location.href = url;
	};

	const navigation = [
		{ name: 'Dashboard', href: '#' },
		{ name: 'Jobs', href: '#' },
		{ name: 'Applicants', href: '#' },
		{ name: 'Company', href: '#' },
	];
	const userNavigation = [
		{ name: 'Your Profile', href: '#' },
		{ name: 'Settings', href: '#' },
		{ name: 'Sign out', href: '#' },
	];

	const plans = [
		{
			name: 'Free',
			id: 'free',
			image: '@/assets/images/plans/waitlist.png',
			priceMonthly: 0,
			priceYearly: 0,
			limit: 'No requests',
		},
		{
			name: 'Support',
			id: 'support',
			image: '~/assets/images/plans/support.png',
			priceMonthly: 600,
			priceYearly: 6000,
			limit: 'Up to 5 active requests',
		},
		{
			name: 'Growth',
			id: 'growth',
			image: '~/assets/images/plans/growth.png',
			priceMonthly: 1800,
			priceYearly: 18000,
			limit: 'Up to 25 active requests',
		},
		{
			name: 'Enterprise',
			id: 'enterprise',
			image: '~/assets/images/plans/enterprise.png',
			priceMonthly: 5400,
			priceYearly: 54000,
			limit: 'Unlimited active requests',
		},
	];

	const people = [
		{
			name: 'Jane Cooper',
			title: 'Paradigm Representative',
			role: 'Admin',
			email: 'janecooper@example.com',
			telephone: '+1-202-555-0170',
			imageUrl:
				'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
		},
		// More people...
	];
	const { data: payments } = await $fetch(
		`/api/stripe/invoices/${User.Account.stripeCustomerId}`
	);

	const selectedPlan = ref(plans[0]);
	const annualBillingEnabled = ref(false);
</script>
