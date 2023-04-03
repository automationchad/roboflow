<script setup>
	import {
		PencilIcon,
		ArrowTopRightOnSquareIcon,
		TrashIcon,
	} from '@heroicons/vue/24/outline';

	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
	} from '@headlessui/vue';

	import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';

	const country_str = `Afghanistan
Åland Islands
Albania
Algeria
American Samoa
Andorra
Angola
Anguilla
Antarctica
Antigua and Barbuda
Argentina
Armenia
Aruba
Australia
Austria
Azerbaijan
Bahamas
Bahrain
Bangladesh
Barbados
Belarus
Belgium
Belize
Benin
Bermuda
Bhutan
Bolivia
Bosnia and Herzegovina
Botswana
Bouvet Island
Brazil
British Indian Ocean Territory
Brunei Darussalam
Bulgaria
Burkina Faso
Burundi
Cambodia
Cameroon
Canada
Cape Verde
Cayman Islands
Central African Republic
Chad
Chile
China
Christmas Island
Cocos (Keeling) Islands
Colombia
Comoros
Congo
Congo, The Democratic Republic of The
Cook Islands
Costa Rica
Cote D'ivoire
Croatia
Cuba
Cyprus
Czech Republic
Denmark
Djibouti
Dominica
Dominican Republic
Ecuador
Egypt
El Salvador
Equatorial Guinea
Eritrea
Estonia
Ethiopia
Falkland Islands (Malvinas)
Faroe Islands
Fiji
Finland
France
French Guiana
French Polynesia
French Southern Territories
Gabon
Gambia
Georgia
Germany
Ghana
Gibraltar
Greece
Greenland
Grenada
Guadeloupe
Guam
Guatemala
Guernsey
Guinea
Guinea-bissau
Guyana
Haiti
Heard Island and Mcdonald Islands
Holy See (Vatican City State)
Honduras
Hong Kong
Hungary
Iceland
India
Indonesia
Iran, Islamic Republic of
Iraq
Ireland
Isle of Man
Israel
Italy
Jamaica
Japan
Jersey
Jordan
Kazakhstan
Kenya
Kiribati
Korea, Democratic People's Republic of
Korea, Republic of
Kuwait
Kyrgyzstan
Lao People's Democratic Republic
Latvia
Lebanon
Lesotho
Liberia
Libyan Arab Jamahiriya
Liechtenstein
Lithuania
Luxembourg
Macao
Macedonia, The Former Yugoslav Republic of
Madagascar
Malawi
Malaysia
Maldives
Mali
Malta
Marshall Islands
Martinique
Mauritania
Mauritius
Mayotte
Mexico
Micronesia, Federated States of
Moldova, Republic of
Monaco
Mongolia
Montenegro
Montserrat
Morocco
Mozambique
Myanmar
Namibia
Nauru
Nepal
Netherlands
Netherlands Antilles
New Caledonia
New Zealand
Nicaragua
Niger
Nigeria
Niue
Norfolk Island
Northern Mariana Islands
Norway
Oman
Pakistan
Palau
Palestinian Territory, Occupied
Panama
Papua New Guinea
Paraguay
Peru
Philippines
Pitcairn
Poland
Portugal
Puerto Rico
Qatar
Reunion
Romania
Russian Federation
Rwanda
Saint Helena
Saint Kitts and Nevis
Saint Lucia
Saint Pierre and Miquelon
Saint Vincent and The Grenadines
Samoa
San Marino
Sao Tome and Principe
Saudi Arabia
Senegal
Serbia
Seychelles
Sierra Leone
Singapore
Slovakia
Slovenia
Solomon Islands
Somalia
South Africa
South Georgia and The South Sandwich Islands
Spain
Sri Lanka
Sudan
Suriname
Svalbard and Jan Mayen
Swaziland
Sweden
Switzerland
Syrian Arab Republic
Taiwan (ROC)
Tajikistan
Tanzania, United Republic of
Thailand
Timor-leste
Togo
Tokelau
Tonga
Trinidad and Tobago
Tunisia
Turkey
Turkmenistan
Turks and Caicos Islands
Tuvalu
Uganda
Ukraine
United Arab Emirates
United Kingdom
United States
United States Minor Outlying Islands
Uruguay
Uzbekistan
Vanuatu
Venezuela
Viet Nam
Virgin Islands, British
Virgin Islands, U.S.
Wallis and Futuna
Western Sahara
Yemen
Zambia
Zimbabwe`;

	const countries = country_str.split('\n');

	const selected = ref(countries.find((o) => o === 'United States'));
	const user = useSupabaseUser();

	const supabase = useSupabaseClient();

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,Account (
	     id,
		 name,
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
</script>

<template>
	<div class="">
		<div role="tabpanel" class="mt-4">
			<div class="space-y-8">
				<div class="dark:text-white" id="profile">
					<div class="">
						<div class="mb-4 flex border-b border-slate-300 py-8">
							<h4 class="font-semibold">Personal info</h4>
							<div class="sc-TRNrF iPuFes"></div>
						</div>

						<ul class="space-y-4">
							<li class="">
								<div class="">
									<div class="flex flex-col">
										<small>User ID</small>{{ User.id }}
									</div>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div class="">
									<div class="flex flex-col">
										<small>First name</small>{{ User.firstName }}
									</div>
								</div>
								<div class="ml-2">
									<button class="p-2">
										<PencilIcon class="h-5 w-5" />
									</button>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div class="">
									<div class="flex flex-col">
										<small>Last name</small>{{ User.lastName }}
									</div>
								</div>
								<div class="ml-2">
									<button class="p-2">
										<PencilIcon class="h-5 w-5" />
									</button>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div class="w-full">
									<div class="flex flex-col">
										<small>Country</small>
										<Listbox as="div" v-model="selected">
											<div class="relative mt-2">
												<ListboxButton
													class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
												>
													<span class="block truncate">{{ selected }}</span>
													<span
														class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
													>
														<ChevronDownIcon
															class="h-5 w-5 text-gray-400"
															aria-hidden="true"
														/>
													</span>
												</ListboxButton>

												<transition
													leave-active-class="transition ease-in duration-100"
													leave-from-class="opacity-100"
													leave-to-class="opacity-0"
												>
													<ListboxOptions
														class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
													>
														<ListboxOption
															as="template"
															v-for="country in countries"
															:key="country"
															:value="country"
															v-slot="{ active, selected }"
														>
															<li
																:class="[
																	active
																		? 'bg-indigo-600 text-white'
																		: 'text-gray-900',
																	'relative cursor-default select-none py-2 pl-3 pr-9',
																]"
															>
																<span
																	:class="[
																		selected ? 'font-semibold' : 'font-normal',
																		'block truncate',
																	]"
																	>{{ country }}</span
																>

																<span
																	v-if="selected"
																	:class="[
																		active ? 'text-white' : 'text-indigo-600',
																		'absolute inset-y-0 right-0 flex items-center pr-4',
																	]"
																>
																	<CheckIcon
																		class="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															</li>
														</ListboxOption>
													</ListboxOptions>
												</transition>
											</div>
										</Listbox>
									</div>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										<small class="">Company name</small>{{ User.Account.name }}
									</div>
								</div>
								<div class="ml-2">
									<button class="p-2">
										<PencilIcon class="h-5 w-5" />
									</button>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										<small class="">Job title</small
										>{{ User.Account.jobTitle ?? 'null' }}
									</div>
								</div>
								<div class="ml-2">
									<button class="p-2">
										<PencilIcon class="h-5 w-5" />
									</button>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										<small>Email</small>{{ User.email }}
									</div>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										<small>User picture URL</small>
										<div class="whitespace-wrap break-all text-xs">
											https://lh3.googleusercontent.com/a-/ACB-R5TTqPhkUP-vcn7xt5m8mvEJT_VcGEgyESDLBtw3sujEXNMq_mTUPz4201MRcwHhlkXtuoCRoTSuZ9AZlo5JsYOoIpwfsKfwXXcZw4E9gf4ig_TMomyB-YgySd0yVAqQr4-D8Pty1bnr_6crM7OcBY6vGp9LMN8DB7pF0K7RgoiGoJ0_txrgF_UzqCHs34xqM-hRj4iPZBhCTFOFnbXIsaGfLMyfElVKBAluaY75C1tSP3NkxSbzSsWRIGRGXcz-poVxKQjR4_dwvCLi97DSKM1Yzw4Qt13aSLsSHPxXT49oa3gM7lBjX5ARYy0hUKlV7VyUAJKHjO-_be4vJBhMPW_Nt7I5b5BSqX3IEDfjSVdlQue_CU2t-plxLiPmfVl9wuB6vsroGsoOnOjK4HZCMkGOoHxE40rx0einTiVJHkqDRg2aWQhNXRv2-x8kGaFk9pTesQOPtUE04uPqsd-f_Dg-nXfMBVMV4LDschhSorO5NoBnSAIBiX4Ccz5o7rlC_gFIh5FizoO2c0u6gW90WlYkA3kOlgKhocF5IxBpAhCTnrl4juZPDsSSugT_xVEeXQoGn18aPhNtnGtgDWsFKOjwPfK0HQFrBPj2p8jaTwoUNBqvfmsjqLhTuh1ncYwToTs9r6QKkIhk2LlcLXe5S3Qcy225BLRVnemLOSARC60xe62RjFC4_YlpXznL10XhKVXdmnM5CjZsEzHXrl721pZy4g68ozcgTbMGgectfzNA7Sx3WnaThqsHXFaA0pB0AdbffdLRqCi8j909_uTvGMCDOuktY9DZuQLtbGv9kgvEpn0JxcI6ODtEXejTxjftRbHJRWtgIpqPgtmGusCNHrtzXhF7wRR66L0kshqP3i1KRjhI_uSAVv1NKWsnMCXMruinTjVSvN5KI5P_fkO1aGFv5E-68XZS8gy-6UAVHCLufrmCm0ieE1ioZEaZ=s96-c
										</div>
									</div>
								</div>
								<div class="ml-2">
									<button class="p-2">
										<PencilIcon class="h-5 w-5" />
									</button>
								</div>
							</li>
							<li class="flex items-center justify-between">
								<div>
									<div class="flex flex-col">
										Password<small
											>Manage password at
											<a
												href="/password-reset"
												target="_blank"
												class="text-indigo-500"
												>app.motis.group/password-reset</a
											></small
										>
									</div>
								</div>
								<div class="sc-bWXABl dfOvOR">
									<a href="/password-reset" target="_blank" class="p-1"
										><ArrowTopRightOnSquareIcon
											class="ml-2 h-5 w-5 text-indigo-500"
									/></a>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div id="danger">
					<div>
						<div
							class="mb-4 flex border-b border-slate-300 py-8 dark:text-white"
						>
							<h4 class="font-semibold">Danger zone</h4>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex flex-col dark:text-white">
								Delete user account<small class="text-slate-600"
									>Delete your private workspace and all workspaces where you
									are the only member. This action cannot be reverted.</small
								>
							</div>

							<div class="ml-2">
								<button class="rounded-lg bg-red-100 p-1 dark:bg-red-800">
									<TrashIcon class="h-5 w-5 text-red-600 dark:text-red-200" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="text-slate-500">
					<div class="flex flex-col">
						<small
							>Motis Group<a
								href="https://robocorp.com/terms-of-use"
								target="_blank"
								rel="noreferrer"
								class="text-indigo-500"
							>
								terms of use</a
							>
							and<a
								href="https://robocorp.com/privacy-policy"
								target="_blank"
								rel="noreferrer"
								class="text-indigo-500"
							>
								privacy policy</a
							></small
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	small {
		color: rgb(156, 171, 183);
	}
</style>
