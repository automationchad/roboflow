<template>
	<div class="flex min-h-full flex-col">
		<div class="flex h-full">
			<main class="flex h-screen w-full flex-1 flex-col overflow-y-auto">
				<div class="flex max-h-full">
					<NavMain/>
					<div class="flex flex-1 flex-col"><NavTop /> <slot /></div>
				</div>
			</main>
		</div>
	</div>
</template>
