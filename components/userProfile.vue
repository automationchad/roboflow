<template>
	<div class="">
		<div class="mt-10 divide-y divide-gray-200">
			<div class="space-y-1">
				<h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
				<p class="max-w-2xl text-sm text-gray-500">
					This information will be displayed publicly so be careful what you
					share.
				</p>
			</div>
			<div class="mt-6">
				<dl class="divide-y divide-gray-200">
					<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
						<dt class="text-sm font-medium text-gray-500">Name</dt>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span class="flex-grow">Chelsea Hagon</span>
							<span class="ml-4 flex-shrink-0">
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</button>
							</span>
						</dd>
					</div>
					<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
						<dt class="text-sm font-medium text-gray-500">Photo</dt>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span class="flex-grow">
								<img
									class="h-8 w-8 rounded-full"
									src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</span>
							<span class="ml-4 flex flex-shrink-0 items-start space-x-4">
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</button>
								<span class="text-gray-300" aria-hidden="true">|</span>
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Remove
								</button>
							</span>
						</dd>
					</div>
					<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
						<dt class="text-sm font-medium text-gray-500">Email</dt>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span class="flex-grow">chelsea.hagon@example.com</span>
							<span class="ml-4 flex-shrink-0">
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</button>
							</span>
						</dd>
					</div>
					<div
						class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
					>
						<dt class="text-sm font-medium text-gray-500">Job title</dt>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span class="flex-grow">Human Resources Manager</span>
							<span class="ml-4 flex-shrink-0">
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</button>
							</span>
						</dd>
					</div>
				</dl>
			</div>
		</div>

		<div class="mt-10 divide-y divide-gray-200">
			<div class="space-y-1">
				<h3 class="text-lg font-medium leading-6 text-gray-900">Account</h3>
				<p class="max-w-2xl text-sm text-gray-500">
					Manage how information is displayed on your account.
				</p>
			</div>
			<div class="mt-6">
				<dl class="divide-y divide-gray-200">
					<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
						<dt class="text-sm font-medium text-gray-500">Language</dt>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span class="flex-grow">English</span>
							<span class="ml-4 flex-shrink-0">
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</button>
							</span>
						</dd>
					</div>
					<div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
						<dt class="text-sm font-medium text-gray-500">Date format</dt>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span class="flex-grow">DD-MM-YYYY</span>
							<span class="ml-4 flex flex-shrink-0 items-start space-x-4">
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</button>
								<span class="text-gray-300" aria-hidden="true">|</span>
								<button
									type="button"
									class="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Remove
								</button>
							</span>
						</dd>
					</div>
					<SwitchGroup
						as="div"
						class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5"
					>
						<SwitchLabel
							as="dt"
							class="text-sm font-medium text-gray-500"
							passive
							>Automatic timezone</SwitchLabel
						>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<Switch
								v-model="automaticTimezoneEnabled"
								:class="[
									automaticTimezoneEnabled ? 'bg-purple-600' : 'bg-gray-200',
									'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto',
								]"
							>
								<span
									aria-hidden="true"
									:class="[
										automaticTimezoneEnabled
											? 'translate-x-5'
											: 'translate-x-0',
										'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
									]"
								/>
							</Switch>
						</dd>
					</SwitchGroup>
					<SwitchGroup
						as="div"
						class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5"
					>
						<SwitchLabel
							as="dt"
							class="text-sm font-medium text-gray-500"
							passive
							>Auto-update applicant data</SwitchLabel
						>
						<dd class="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<Switch
								v-model="autoUpdateApplicantDataEnabled"
								:class="[
									autoUpdateApplicantDataEnabled
										? 'bg-purple-600'
										: 'bg-gray-200',
									'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-auto',
								]"
							>
								<span
									aria-hidden="true"
									:class="[
										autoUpdateApplicantDataEnabled
											? 'translate-x-5'
											: 'translate-x-0',
										'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
									]"
								/>
							</Switch>
						</dd>
					</SwitchGroup>
				</dl>
			</div>
		</div>
	</div>
</template>
