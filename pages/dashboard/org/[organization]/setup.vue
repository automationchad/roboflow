<script setup>
	definePageMeta({ layout: 'public' });

	import { CheckCircleIcon } from '@heroicons/vue/20/solid';
	import { ref } from 'vue';
	import Step1 from '~/components/onboarding/step1.vue';
	import Step2 from '~/components/onboarding/step2.vue';
	import Step3 from '~/components/onboarding/step3.vue';

	import {
		Dialog,
		DialogPanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue';
	import {
		Bars3Icon,
		BellIcon,
		CalendarIcon,
		Cog6ToothIcon,
		Cog8ToothIcon,
		CodeBracketIcon,
		DocumentDuplicateIcon,
		CircleStackIcon,
		QueueListIcon,
		FolderIcon,
		HomeIcon,
		PlusIcon,
		UsersIcon,
		TicketIcon,
		QuestionMarkCircleIcon,
		CreditCardIcon,
		XMarkIcon,
		LockClosedIcon,
		DocumentTextIcon,
		DocumentChartBarIcon,
		BuildingOfficeIcon,
		CpuChipIcon,
		InboxStackIcon,
	} from '@heroicons/vue/24/outline';
	import {
		ChevronDownIcon,
		MagnifyingGlassIcon,
		ChartBarIcon,
		StarIcon,
		ArrowTopRightOnSquareIcon,
	} from '@heroicons/vue/20/solid';

	const user = useSupabaseUser();
	const supabase = useSupabaseClient();
	const avatarUrl = ref(null);

	let { data: User, error: userError } = await supabase
		.from('User')
		.select(
			`*,
				Account (
			     id,
				 name,
				 type,
				 Subscription(*),
				 Team (
					id,
					name
				 ),
				 Ticket (count)
			   )
			 `
		)
		.eq('id', user.value.id)
		.limit(1)
		.single();

	const teams = ref([]);
	const entitlements = await getEntitlements();

	const retainer = User.Account.Subscription.find((o) => o.type === 'retainer');

	const entitlement = entitlements[retainer.tier];

	const totalActive = User.Account.Ticket.filter(
		(o) => o.status !== 'done' && entitlement.ticket_types.includes(o.type)
	).length;
	const upgrade_needed = ref(false);
	upgrade_needed.value =
		totalActive > entitlement.ticket_count &&
		// retainer.status === 'active' &&
		User.systemRole !== 'super_admin';

	const route = useRoute();

	const sidebarOpen = ref(false);

	const stepSelector = [
		{ id: 'Step 1', name: 'Create account', href: '#', status: 'complete' },
		{ id: 'Step 2', name: 'Profile information', href: '#', status: 'current' },
		{
			id: 'Step 3',
			name: 'Business information',
			href: '#',
			status: 'upcoming',
		},
		{ id: 'Step 4', name: 'Notifications', href: '#', status: 'upcoming' },
	];

	const steps = [Step1, Step2, Step3];
	const currentStep = ref(1);

	const formData = reactive({ name: '', email: '' });

	const saveData = async () => {
		const { data, error } = await supabase.from('User').insert([formData]);

		if (error) {
			console.error(error);
		} else {
			console.log(data);
		}
	};

	const bindings = { formData, saveData };

	const currentStepComponent = computed(() => steps[currentStep.value - 1]);
</script>

<template>
	<div>
		<div>
			<!-- Static sidebar for desktop -->
			<div
				class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
			>
				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div
					class="flex grow flex-col overflow-y-auto border-r border-white/10 bg-slate-50 px-6 pb-4 dark:bg-white/[2%]"
				>
					<div
						class="-mx-2 flex shrink-0 flex-col items-center justify-center space-y-3 pt-4"
					>
						<div class="flex items-center">
							<img
								class="mr-1 h-4 w-auto"
								src="~/assets/images/logo.png"
								alt="Your Company"
							/>
							<p class="text-xs capitalize text-slate-400">
								{{ User.Account.type.replace(/_/g, ' ') }} Account
							</p>
						</div>

						<div class="mt-4 flex h-6 w-full items-center justify-center">
							<NuxtLink
								v-if="upgrade_needed"
								to="/settings/billing#usage"
								class="w-full rounded-full border border-red-200 bg-red-100 px-2 py-0.5 text-center text-xs font-normal text-red-700 dark:border-red-600 dark:bg-red-800 dark:text-red-300"
								>Account has exceeded usage limits</NuxtLink
							>
							<NuxtLink
								v-else-if="retainer.tier === 'free'"
								to="/settings/billing#usage"
								class="inline-flex w-full items-center justify-center space-x-1 rounded-full border border-yellow-200 bg-yellow-100 px-2 py-0.5 text-center text-xs font-normal text-yellow-700 dark:border-yellow-600 dark:bg-yellow-800 dark:text-yellow-300"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-1"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<line x1="10" y1="15" x2="10" y2="9"></line>
									<line x1="14" y1="15" x2="14" y2="9"></line></svg
								>Paused</NuxtLink
							>
						</div>
					</div>
					<div class="py-12">
						<nav class="flex justify-start" aria-label="Progress">
							<ol role="list" class="space-y-6">
								<li v-for="(step, index) in stepSelector" :key="step.name">
									<button
										:disabled="index === 0"
										
										v-if="index < currentStep || index === 0"
										class="group pointer-events-none"
									>
										<span class="flex items-start">
											<span
												class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
											>
												<CheckCircleIcon
													class="h-full w-full text-indigo-600 group-hover:text-indigo-800"
													aria-hidden="true"
												/>
											</span>
											<span
												class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900"
												>{{ step.name }}</span
											>
										</span>
									</button>
									<button
										
										v-else-if="index === currentStep"
										class="flex items-start pointer-events-none"
										aria-current="step"
									>
										<span
											class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
											aria-hidden="true"
										>
											<span
												class="absolute h-4 w-4 rounded-full bg-indigo-200"
											/>
											<span
												class="relative block h-2 w-2 rounded-full bg-indigo-600"
											/>
										</span>
										<span class="ml-3 text-sm font-medium text-indigo-600">{{
											step.name
										}}</span>
									</button>
									<button v-else class="group pointer-events-none">
										<div class="flex items-start">
											<div
												class="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
												aria-hidden="true"
											>
												<div
													class="h-2 w-2 rounded-full bg-gray-300 group-hover:bg-gray-400"
												/>
											</div>
											<p
												class="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900"
											>
												{{ step.name }}
											</p>
										</div>
									</button>
								</li>
							</ol>
						</nav>
					</div>
					<nav class="flex flex-1 flex-col"></nav>
				</div>
			</div>
		</div>
		<div class="lg:pl-72">
			<main class="px-4 py-10 sm:px-6 lg:px-10">
				<div class="max-w-5xl">
					<h1>Onboarding</h1>
					<component
						:is="currentStepComponent"
						@next="currentStep++"
						@previous="currentStep--"
					/>
				</div>
			</main>
		</div>
	</div>
</template>
