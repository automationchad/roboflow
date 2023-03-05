<script setup>
	import { LinkIcon } from '@heroicons/vue/20/solid';
	import logoAnimaginary from '@/assets/images/logos/animaginary.svg';
	import logoCosmos from '@/assets/images/logos/cosmos.svg';
	import logoHelioStream from '@/assets/images/logos/helio-stream.svg';
	import logoOpenShuttle from '@/assets/images/logos/open-shuttle.svg';
	import logoPlanetaria from '@/assets/images/logos/planetaria.svg';

	const projects = [
		{
			name: 'Planetaria',
			description:
				'Creating technology to empower civilians to explore space on their own terms.',
			link: { href: 'http://planetaria.tech', label: 'planetaria.tech' },
			logo: logoPlanetaria,
		},
		{
			name: 'Animaginary',
			description:
				'High performance web animation library, hand-written in optimized WASM.',
			link: { href: '#', label: 'github.com' },
			logo: logoAnimaginary,
		},
		{
			name: 'HelioStream',
			description:
				'Real-time video streaming library, optimized for interstellar transmission.',
			link: { href: '#', label: 'github.com' },
			logo: logoHelioStream,
		},
		{
			name: 'cosmOS',
			description:
				'The operating system that powers our Planetaria space shuttles.',
			link: { href: '#', label: 'github.com' },
			logo: logoCosmos,
		},
		{
			name: 'OpenShuttle',
			description:
				'The schematics for the first rocket I designed that successfully made it to orbit.',
			link: { href: '#', label: 'github.com' },
			logo: logoOpenShuttle,
		},
	];
</script>

<template>
	<div class="py-32 sm:py-32">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl sm:text-center">
					<p
						class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
					>
						Recent work
					</p>
					<p class="mt-6 text-lg leading-8 text-gray-600">
						Clean, professional API integrations.
					</p>
				</div>
			</div>
			<div class="mt-16 sm:mt-20">
                
				<ul
					role="list"
					class="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
				>
					
					<li
						v-for="project in projects"
						:key="project.name"
						class="group relative flex flex-col items-start"
					>
						<div
							class="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
						>
							<img :src="project.logo" alt="" class="h-8 w-8" unoptimized />
						</div>
						<h2
							class="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100"
						>
							<div>
								<div
									class="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
								></div>
								<a :href="project.link.href">
									<span
										class="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"
									/>

									<span class="relative z-10">{{ project.name }}</span></a
								>
							</div>
						</h2>

						<p
							class="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400"
						>
							{{ project.description }}
						</p>
						<p
							class="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200"
						>
							<LinkIcon class="h-6 w-6 flex-none" />
							<span class="ml-2">{{ project.link.label }}</span>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
