<template>
	<div class="">
		<div class="px-10  lg:px-8">
			<div class=" text-base leading-7">
				<p class="text-base font-semibold leading-7 text-indigo-600">How to</p>
				<h1
					class="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
				>
					Submit a Ticket
				</h1>

				<p class="prose mt-6 text-xl leading-8 dark:prose-invert">
					Did you find a bug? Do you need help with a workflow? Or do you simply
					have a question for the Motis team?
				</p>
				<div class="prose mt-10 max-w-4xl dark:prose-invert">
					<h3>What type of ticket should I submit?</h3>
					<div
						class="mb-10 mt-2 border-l-4 border-indigo-400 bg-slate-50 p-4 dark:border-indigo-600 dark:bg-slate-900"
					>
						<div class="flex">
							<div class="flex-shrink-0">
								<LightBulbIcon
									class="h-5 w-5 text-indigo-400"
									aria-hidden="true"
								/>
							</div>
							<div class="ml-3">
								<div class="text-sm">
									<p class="mt-0">
										<strong>Small-scale requests: </strong> bug fixes,
										troubleshooting issue, small or straightforward change to an
										existing process.
									</p>
									<p class="mt-0 mb-0">
										<strong>Large-scale requests:</strong> new project
										recommendation, an idea, major process change request, or
										any other larger initiative. Typically require multiple
										stakeholders, more than a couple days of work, and are not
										immediate needs.
									</p>

									{{ ' ' }}
									<!-- <a
									href="#"
									class="font-medium text-yellow-700 underline hover:text-yellow-600"
									>Upgrade your account to add more credits.</a
								> -->
								</div>
							</div>
						</div>
					</div>
					<div class="">
						<h3>What information should I include?</h3>
						<p>
							Regardless of which category your request or question falls under,
							all tickets need:
						</p>
						<ol>
							<li>Which team you're on</li>
							<li>A brief summery of your request</li>
							<li>
								A detailed description of your request, making sure to link to
								helpful resources, e.g. your project brief in Notion, workflows,
								etc. Context is more useful than you think!
							</li>
							<li>An estimate of your request's priority</li>
							<li>Your desired due date</li>
						</ol>
						<div class="mb-10 border-l-4 border-yellow-400 bg-yellow-50 p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<ExclamationTriangleIcon
										class="h-5 w-5 text-yellow-400"
										aria-hidden="true"
									/>
								</div>
								<div class="ml-3">
									<div class="text-sm text-yellow-700">
										To meet your desired deadline, please keep
										<a
											href="#lead-times"
											class="font-medium text-yellow-700 underline hover:text-yellow-600"
											>these lead times</a
										>
										in mind which indicate how long it will take once the work
										has been added to a sprint.

										{{ ' ' }}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="">
						<h2>Proposing a new project</h2>
						<div
							class="mb-10 mt-2 border-l-4 border-purple-400 bg-slate-50 p-4"
						>
							<div class="flex">
								<div class="flex-shrink-0">
									<LightBulbIcon
										class="h-5 w-5 text-purple-400"
										aria-hidden="true"
									/>
								</div>
								<div class="ml-3">
									<div class="flex flex-col items-start text-sm text-slate-700">
										We accept project proposals at any time. Projects are chunks
										of work that are large enough that they likely involve
										multiple decision makers or stakeholders. They are reviewed
										Monthly.

										{{ ' ' }}
										<!-- <a
									href="#"
									class="font-medium text-yellow-700 underline hover:text-yellow-600"
									>Upgrade your account to add more credits.</a
								> -->
									</div>
								</div>
							</div>
						</div>
						<h3>What's a project?</h3>
						<ul role="list" class="mt-8">
							<li class="flex gap-x-3">
								<CheckCircleIcon
									class="mt-1 h-5 w-5 flex-none text-indigo-600"
									aria-hidden="true"
								/>
								<span
									>New process or approach to a major channel, offer or
									functional area (routing logic, MQL criteria, lead capture ie
									forms, trials, new segmentation approach)</span
								>
							</li>
							<li class="flex gap-x-3">
								<CheckCircleIcon
									class="mt-1 h-5 w-5 flex-none text-indigo-600"
									aria-hidden="true"
								/>
								<span>Adding new software/technologies to our stack.</span>
							</li>
							<li class="flex gap-x-3">
								<CheckCircleIcon
									class="mt-1 h-5 w-5 flex-none text-indigo-600"
									aria-hidden="true"
								/>
								<span
									>Tray automations that involve multiple stakeholders /
									decision making</span
								>
							</li>
						</ul>
					</div>
					<div class="">
						<h3>When can I expect a response by?</h3>
						<p>
							Your ticket will be triaged and responded to within one business
							day. We'll let you know if:
						</p>
						<ul>
							<li>We need additional information</li>
							<li>
								Your ticket is accepted, and if so, if it:
								<ol type="a">
									<li>
										Can be added to the current sprint or included in a future
										sprint, OR;
									</li>
									<li>Is a backlog item</li>
								</ol>
							</li>
							<li>
								We have an answer to your question right away or need time to
								investigate
							</li>
							<li>
								Your ticket is a known issue, requires further discussion, or
								will not be accepted
							</li>
						</ul>
						<div class="mb-10 border-l-4 border-purple-400 bg-slate-50 p-4">
							<div class="flex">
								<div class="flex-shrink-0">
									<LightBulbIcon
										class="h-5 w-5 text-purple-400"
										aria-hidden="true"
									/>
								</div>
								<div class="ml-3">
									<div class="text-sm text-slate-700">
										The more information you provide and the
										<i>sooner</i>
										you let us know, the better we can help you.

										{{ ' ' }}
										<!-- <a
									href="#"
									class="font-medium text-yellow-700 underline hover:text-yellow-600"
									>Upgrade your account to add more credits.</a
								> -->
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="">
						<h3>When do I need to submit by for a non-roadmapped project?</h3>
						<ul>
							<li>
								If it's critical something be delivered by a certain date, it
								must be sent to Motis with complete requirements and 3 weeks
								advance notice.
							</li>
							<li>
								If involves a workflow, have the mentality that you're building
								the workflow but that Motis will support you even build parts of
								it, and address bugs. But expect to own it, and expect that if
								you need it by a certain date you need to have a first spec
								meeting (office hours) 3 weeks in advance.
							</li>
							<li>
								If it's a larger project like acquiring a new piece of tech, a
								big cross functional initiative then it must be part of
								quarterly or monthly planning with a brief, biz case, which is
								essentially two months out (review mid July, approve for August,
								we could start it as soon as 1 month, but more realistically 1-2
								months).
							</li>
							<li>
								If you want to <i>explore</i> the best solution for an idea, we
								can do that in a 30min office hours.
							</li>
						</ul>
					</div>
					<div class="" id="lead-times">
						<div class="inline-block min-w-full py-2 align-middle">
							<table class="min-w-full divide-y divide-gray-300">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-3"
										>
											Request
										</th>
										<th
											scope="col"
											class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
										>
											<ClockIcon class="h-5 w-5" />
										</th>
										<th
											scope="col"
											class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 dark:text-white"
										>
											Examples
										</th>
									</tr>
								</thead>
								<tbody class="bg-white dark:bg-slate-900">
									<tr
										v-for="(person, personIdx) in people"
										:key="person.email"
										:class="
											personIdx % 2 === 0
												? undefined
												: 'bg-gray-50 dark:bg-slate-800'
										"
									>
										<td
											class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-3"
										>
											{{ person.name }}
										</td>
										<td
											class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300"
										>
											{{ person.title }}
										</td>
										<td
											class="whitespace-wrap px-3 py-4 text-right text-sm text-gray-500 dark:text-gray-300"
										>
											{{ person.email }}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="mb-10 border-l-4 border-yellow-400 bg-yellow-50 p-4">
						<div class="flex">
							<div class="flex-shrink-0">
								<ExclamationTriangleIcon
									class="h-5 w-5 text-yellow-400"
									aria-hidden="true"
								/>
							</div>
							<div class="ml-3">
								<div class="text-sm text-yellow-700">
									IMPORTANT: Please DO NOT direct message or group DM team
									members re: ANY MOps questions. This includes questions about
									the status of tickets/project, new projects or idea, and
									reporting bugs. This helps ensure others benefit from answers
									to your question and allows different team members to weigh in
									who may be better suited or more available to answer your
									question.
									<a
										target="_blank"
										href="https://blog.arkency.com/use-channels-not-direct-messages/"
										class="font-medium text-yellow-700 underline hover:text-yellow-600"
										>Read more here.</a
									>

									{{ ' ' }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		CheckCircleIcon,
		InformationCircleIcon,
		ExclamationTriangleIcon,
	} from '@heroicons/vue/20/solid';
	import { LightBulbIcon, ClockIcon } from '@heroicons/vue/24/outline';

	const people = [
		{
			name: 'Bug fix',
			title: '1 day',
			email: '',
		},
		{
			name: 'Build a new workflow',
			title: '3 weeks',
			email: 'Brand new idea, or approach to a core process',
		},
		{
			name: 'Troubleshoot / mod an existing workflow',
			title: '3 weeks',
			email: 'Basic logic changes or field mapping edits',
		},
		// More people...
	];
</script>
