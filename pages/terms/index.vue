<script setup>
	const people = [
		{
			name: 'Privacy Policy',
			url: '/terms/privacy-policy',
		},
		{
			name: 'Website Terms & Conditions',
			url: '/terms/terms-and-conditions',
		},
		{
			name: 'Mutual Non-Disclosure Agreement',
			url: '/terms/mnda',
		},
		{
			name: 'Master Services Agreement',
			url: '/terms/msa',
		},
		{
			name: 'Professional Services Agreement',
			url: '/terms/professional-services-agreement',
		},
	];
</script>

<template>
	<div class="h-screen">
		<nav
			class="sticky top-0 z-50 bg-white shadow backdrop-blur-xl dark:bg-slate-900/30"
		>
			<div class="mx-auto px-48">
				<div class="flex h-16 justify-between">
					<div class="flex">
						<div class="flex flex-shrink-0 items-center">
							<a href="/"
								><img
									class="block h-8 w-auto lg:hidden"
									src="~/assets/images/logo.png" />
								<img
									class="hidden h-8 w-auto lg:block"
									src="~/assets/images/logo.png"
							/></a>
						</div>
					</div>

					<div class=""></div>
				</div>
			</div>
		</nav>
		<div class="h-full items-center justify-center bg-white py-32 px-6 lg:px-8">
			<div class="mx-auto max-w-3xl">
				<div>
					<div class="">
						<h1 class="text-4xl font-bold tracking-tight">Terms</h1>
						<p class="text-gray-600">Motis Group Terms Of Business</p>
					</div>

					<div class="mt-12 flow-root">
						<ul role="list" class="-my-5 divide-y divide-gray-200">
							<li v-for="person in people" :key="person.handle" class="py-4">
								<div class="flex items-center space-x-4">
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium text-gray-900">
											{{ person.name }}
										</p>
									</div>
									<div>
										<a
											:href="person.url"
											class="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
											>View</a
										>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
