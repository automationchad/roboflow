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
	const route = useRoute();
	

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



	const stepSelector = [
		{ id: 'Step 1', name: 'Profile information', href: '#', status: 'current' },
		{
			id: 'Step 2',
			name: 'Business information',
			href: '#',
			status: 'upcoming',
		},
		{ id: 'Step 3', name: 'Notifications', href: '#', status: 'upcoming' },
	];

	const steps = [Step1, Step2, Step3];
	const currentStep = ref(0);

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

	const currentStepComponent = computed(() => steps[currentStep.value]);
</script>

<template>
	<div class="grid min-h-screen grid-cols-2 bg-white dark:bg-transparent">
		<main
			class="col-span-1 mx-auto flex w-full max-w-7xl flex-1 items-start justify-center px-6 py-24 sm:py-32 lg:px-8"
		>
			<div class="flex w-96 flex-col items-start justify-start">
				<nav
					class="mb-4 flex items-center justify-center"
					aria-label="Progress"
				>
					<p class="text-sm font-medium dark:text-white">
						Step
						{{ currentStep + 1 }} of
						{{ stepSelector.length }}
					</p>
					<ol role="list" class="ml-8 flex items-center space-x-5">
						<li v-for="(step, index) in stepSelector" :key="step.name">
							<a
								v-if="index < currentStep"
								class="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900"
							>
								<span class="sr-only">{{ step.name }}</span>
							</a>
							<a
								v-else-if="index === currentStep"
								class="relative flex items-center justify-center"
								aria-current="step"
							>
								<span class="absolute flex h-5 w-5 p-px" aria-hidden="true">
									<span class="h-full w-full rounded-full bg-indigo-200" />
								</span>
								<span
									class="relative block h-2.5 w-2.5 rounded-full bg-indigo-600"
									aria-hidden="true"
								/>
								<span class="sr-only">{{ step.name }}</span>
							</a>
							<a
								v-else
								class="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
							>
								<span class="sr-only">{{ step.name }}</span>
							</a>
						</li>
					</ol>
				</nav>

				<component
					:is="currentStepComponent"
					@next="currentStep++"
					@previous="currentStep--"
				/>
			</div>
		</main>

		<div class="col-span-1 hidden lg:relative lg:block">
			<img
				src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
				alt=""
				class="absolute inset-0 h-full w-full object-cover"
			/>
		</div>
	</div>
</template>
