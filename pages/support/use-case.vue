<template>
	<div class="bg-white py-32 px-6 lg:px-8">
		<div
			class="prose mx-auto flex max-w-3xl justify-center text-base leading-7 text-gray-700"
		>
			<article class="">
				<h1>Technical feasibility assessment 🤔</h1>
				<p>
					Maria wants to automate her task of copy-pasting data into the
					intranet, but how can she know if the automation is feasible in the
					first place?
					<strong>Let's find out!</strong>
				</p>
				<p>
					The technical feasibility assessment is done to understand if the
					automation goal is realistic. It is good to find any technical
					showstoppers early on. In the spirit of agile development,
					<strong>fail fast</strong> (and save money doing so)!
				</p>
				<blockquote
					class="border-l-4 border-indigo-500 bg-indigo-100 px-6 py-2 text-indigo-900"
				>
					<p>
						Although the assessment is technical, consider the available budget.
						You might find showstoppers if your budget is very tight. Even if
						something is technically possible, it might be too costly.
					</p>
				</blockquote>
				<p>
					Think of the following questions to figure out if the process could be
					technically feasible to automate:
				</p>
				<h2
					id="could-a-robot-complete-the-process-by-following-unambiguous-rules"
				>
					Could a robot complete the process by following unambiguous rules?
				</h2>
				<ul>
					<li>
						<p>
							If the business rules are easy to follow, unambiguous, and do not
							require human judgment, great!
						</p>
					</li>
					<li>
						<p>
							If the rules are complex but unambiguous, more effort is necessary
							during the implementation, but the automation could still be
							doable.
						</p>
					</li>
					<li>
						<p>
							If human judgment is required to complete the process, it might be
							difficult or costly to automate the process. In those cases, you
							could think if <em>parts</em> of the process could still be
							automated.
						</p>
					</li>
				</ul>
				<blockquote
					class="border-l-4 border-indigo-500 bg-indigo-100 px-6 py-2 text-indigo-900"
				>
					<p>
						In Maria's case, the rules to follow are simple and unambiguous.
						Download the sales data Excel file, open the intranet website, log
						in, enter the sales data, take a screenshot, create a PDF document.
						Definitely something a robot could do!
					</p>
				</blockquote>
				<h2 id="can-a-robot-easily-read-the-data-required-by-the-process">
					Can a robot easily read the data required by the process?
				</h2>
				<ul>
					<li>
						<p>
							If the input data required by the process is in a digitized format
							that the robot can read comfortably, wonderful!
						</p>
					</li>
					<li>
						<p>
							If the data requires some transformation before the robot can use
							it, things get more complicated. Still a good chance for success!
						</p>
					</li>
					<li>
						<p>
							If the data needs to be extracted from images, PDF documents, or
							emails, there are solutions for those, but prepare for a bit more
							intensive implementation. No blockers, still (unless the budget is
							exceeded)!
						</p>
					</li>
					<li>
						<p>
							If the data is not in a digitized format (it's on paper, for
							example), you need to get that data digitized. Depending on your
							budget, this might be a showstopper.
						</p>
					</li>
				</ul>
				<blockquote
					class="border-l-4 border-indigo-500 bg-indigo-100 px-6 py-2 text-indigo-900"
				>
					<p>
						In Maria's case, the process input data (the Excel file) is
						something that a robot can read easily. No data transformations are
						needed; grab and use the data as is! The robot can take screenshots
						of the page (or parts of the page). The robot can also get the HTML
						from the intranet webpage for generating the PDF file.
					</p>
				</blockquote>
				<h2 id="can-a-robot-operate-all-the-required-software">
					Can a robot operate all the required software?
				</h2>
				<ul>
					<li>
						<p>
							If there are only
							<a href="/docs/development-guide/browser"
								>browser-based web applications</a
							>
							involved, this is usually the best case (plenty of support for
							automation). Robocorp supports <strong>Selenium</strong> and
							<strong>Playwright</strong> out-of-the-box!
						</p>
					</li>
					<li>
						<p>
							If the process involves
							<a href="/docs/development-guide/desktop"
								>automating desktop applications</a
							>
							or even old-fashioned mainframes, the implementation might take
							more effort (depending on the operating system and the
							applications). Robocorp supports image template matching based
							automation, textual locator-based desktop automation, optical
							Character Recognition (OCR), and keyboard and mouse-based
							automation!
						</p>
					</li>
				</ul>
				<blockquote
					class="border-l-4 border-indigo-500 bg-indigo-100 px-6 py-2 text-indigo-900"
				>
					<p>
						Maria's process involves using several technologies. Excel (file)
						for the sales data, a web browser for entering the data to the
						intranet, Word for pasting and exporting the results in PDF format.
						The robot can read Excel files without actually using the Excel
						application. The robot can use whatever browser is installed. It can
						also produce PDF documents without the need for an additional
						application. It seems that there are no technical issues with this
						question either!
					</p>
				</blockquote>
				<h2 id="can-the-robot-access-all-the-required-accounts">
					Can the robot access all the required accounts?
				</h2>
				<ul>
					<li>
						<p>
							If the robot can use its own credentials on all systems to
							complete the process, great!
						</p>
					</li>
					<li>
						<p>
							If the authentication can not be automated completely, some human
							intervention is likely to be needed. This will have an impact on
							development.
						</p>
					</li>
				</ul>
				<blockquote>
					<p>
						In Maria's case, the robot can use her credentials, stored somewhere
						safe, such as in the
						<a href="/docs/development-guide/variables-and-secrets/vault"
							>vault in Control Room</a
						>. Good to go!
					</p>
				</blockquote>
				<h2 id="proceed-or-abort">Proceed or abort?</h2>
				<p>
					After thinking through the questions, you will have a better idea of
					whether the automation could be technically feasible.
				</p>
				<p>
					Sometimes the result of the technical assessment is that the
					automation is not technically feasible at all. This is both an
					unfortunate and a good thing! The sad part is that you still need a
					human to complete the mundane process. The good part is that you found
					out the showstoppers as early as possible, without wasting time and
					money!
				</p>
				<p>Time to move to assess the return on investment, then!</p>
				<aside class="sc-ezWOiH zlNkP">
					<div>
						<a href="/docs/courses/software-robot-delivery-process/the-idea"
							>Previous chapter</a
						>
					</div>
					<div>
						<a
							href="/docs/courses/software-robot-delivery-process/business-feasibility-assessment"
							>Next chapter</a
						>
					</div>
				</aside>
			</article>
		</div>
		<div
			class="prose mx-auto flex max-w-3xl justify-center text-base leading-7 text-gray-700"
		>
			<article>
				<h1>Business feasibility assessment 💰</h1>
				<p>
					Ok, after the technical feasibility assessment, we know that the
					process could be automated. But just because something is technically
					doable, it does not necessarily make business sense to do it!
				</p>
				<blockquote>
					<p>
						"Your scientists were so preoccupied with whether or not they could,
						they didn't stop to think if they should."
						<strong>Doctor Ian Malcolm</strong>, <em>Jurassic Park, 1993</em> 🦖
					</p>
				</blockquote>
				<p>
					When evaluating the feasibility of a Robotic Process Automation
					project, you should complete a business feasibility assessment to
					understand if the automation would lead to a positive return on
					investment or not.
				</p>
				<p>Ask yourself these questions:</p>
				<h2 id="does-the-process-repeat-often">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Does the process repeat often?
				</h2>
				<ul>
					<li>
						<p>
							The more often the process needs to be completed manually, the
							better the potential benefits of automating it. Faster completion,
							fewer errors, time to focus on more exciting things!
						</p>
					</li>
					<li>
						<p>
							If the process is manual and time-consuming but does not happen
							often, you need to consider the cost of implementing the
							automation. Does the effort pay itself back (positive
							<a
								href="https://en.wikipedia.org/wiki/Return_on_investment"
								target="_blank"
								rel="noreferrer"
								>return on investment</a
							>)?
						</p>
					</li>
				</ul>
				<blockquote>
					<p>
						In Maria's case, she is convinced that once a week is often enough
						to be worth automating because of the quantity of data she has to
						copy-paste and the number of operations she has to do. She reports
						that the whole process takes hours to complete. So it's a yes from
						her!
					</p>
				</blockquote>
				<h2 id="is-the-process-stable-or-does-it-change-all-the-time">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Is the process stable, or does it change all the time?
				</h2>
				<ul>
					<li>
						Do you anticipate that the process will stay mostly the same for
						some time? Substantial changes in the process will require more
						development work to adapt the robot to new requirements, so if you
						expect the process to change often, it might be reason enough to
						decide not to automate it.
					</li>
				</ul>
				<blockquote>
					<p>
						Maria reports that the process has been the same for many years, and
						there are no plans to replace the sales system for the foreseeable
						future.
					</p>
				</blockquote>
				<h2
					id="is-it-easy-for-a-human-operator-to-make-mistakes-during-the-process-or-is-it-relatively-error-proof"
				>
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Is it easy for a human operator to make mistakes during the process,
					or is it relatively error-proof?
				</h2>
				<blockquote>
					<p>
						Maria does not want to comment on the times that she has copy-pasted
						the wrong sales data for a sales representative or forgotten to add
						the surname of somebody. So yes, she thinks that it is possible to
						make mistakes during this task.
					</p>
				</blockquote>
				<h2
					id="what-positive-effects-will-automating-the-process-have-on-the-organization"
				>
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>What positive effects will automating the process have on the
					organization?
				</h2>
				<blockquote>
					<p>
						Maria has a backlog of other more important activities that she can
						get to if the robot takes over her copy-paste marathon. Also, fewer
						sales reps would get angry at her for her copy-paste errors...
					</p>
				</blockquote>
				<h2 id="do-the-positive-effects-justify-the-cost">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Do the positive effects justify the cost?
				</h2>
				<p>
					Once you have determined that the automation would positively impact
					the organization, you need to weigh the possible benefits against the
					time and money spent during the implementation, maintenance, and the
					<a
						href="https://en.wikipedia.org/wiki/Whole-life_cost"
						target="_blank"
						rel="noreferrer"
						>lifetime cost</a
					>
					of the automation.
				</p>
				<blockquote>
					<p>
						Maria has discussed the estimations with her supervisors: they are
						onboard, and the budget is there, so all good!
					</p>
				</blockquote>
				<aside class="sc-ezWOiH zlNkP">
					<div>
						<a
							href="/docs/courses/software-robot-delivery-process/technical-feasibility-assessment"
							>Previous chapter</a
						>
					</div>
					<div>
						<a
							href="/docs/courses/software-robot-delivery-process/documenting-the-process"
							>Next chapter</a
						>
					</div>
				</aside>
			</article>
		</div>
		<div
			class="prose mx-auto flex max-w-3xl justify-center text-base leading-7 text-gray-700"
		>
			<article>
				<h1>Documenting the process ✏️</h1>
				<p>
					After identifying a process as a good candidate for automation, a good
					first step is to walk through it and document it in
					<em>enough</em> detail. This documentation will then serve as the
					basis for implementing the software robot that will take over and
					handle the process in the future.
				</p>
				<p>
					<strong
						>The initial documentation will not be perfect and does not need to
						be.</strong
					>
					You will need to update it when you learn more about the process
					during implementation.
				</p>
				<p>
					Document the process in as much detail as you can. During
					implementation, you will surely find that you have missed some things
					or need to do things differently. The documentation will need to be
					updated with the implementation and vice versa.
				</p>
				<p>
					<strong>Change is inevitable. Change is good. Embrace change!</strong>
					You will learn more about the process you are automating during
					implementation. Be agile.
				</p>
				<p>
					During this requirements gathering, the software robot developer needs
					to work closely with the business side to get familiar with the
					current process and the business domain in which it runs. This often
					means sitting next to the user when the process is run, asking all
					relevant questions, and exploring all the possible scenarios.
				</p>
				<blockquote>
					<p>
						Continuous communication between everyone involved is needed through
						the whole project.
					</p>
				</blockquote>
				<p>
					Once again: You will definitely miss some details or possible logical
					decision points, exceptions, or other scenarios. Gather
					<em>enough</em> information to be confident enough with starting with
					the implementation.
				</p>
				<p>
					As your implementation progresses, you will learn and then incorporate
					those learnings into the documentation. Automation is a long-term team
					effort, not a one-way waterfall where each "phase" strictly follows
					the next and where changes are frowned upon.
				</p>
				<h2 id="the-process-definition-document-pdd">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>The Process Definition Document (PDD)
				</h2>
				<p>
					The results of the process walkthrough are collected into a document.
				</p>
				<p>
					In the most formal form, we call this document the
					<a
						href="/docs/courses/implementing-rpa-robots/process-definition-document"
						><strong>Process Definition Document</strong></a
					>.
				</p>
				<p>
					What do we mean by <em>formal</em> regarding the documentation? Some
					organizations prefer to have very detailed and strict processes for
					managing documentation. For example, writing down everything in minute
					detail, reviewed by multiple stakeholders, getting approvals, signing
					off, change management protocols, etc.
				</p>
				<p>
					There's nothing wrong with that approach, but a less formal way of
					managing documentation might be more suitable for many cases.
				</p>
				<p>
					Still, by describing the more formal way, we also cover all the
					relevant things. Remember that you can and should adapt the
					documentation to your needs. Only use what you need and scrap the
					rest!
				</p>
				<h3 id="contents-of-the-pdd-document">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Contents of the PDD document
				</h3>
				<p>
					An effective PDD document should provide clear answers to these
					questions:
				</p>
				<ul>
					<li>What is the process used for, and what is its end goal?</li>
					<li>What are the steps involved in the process?</li>
					<li>Are there any decision points (logical branches)?</li>
					<li>Who is in charge of the process?</li>
					<li>By whom and how often is the process executed?</li>
					<li>
						Does the process require human intervention (attended), or can it be
						entirely handled by automation (unattended)?
					</li>
					<li>What are the systems involved in the process?</li>
					<li>
						Does the user need special authorization or roles to run the
						process?
					</li>
					<li>
						What are the possible problems and exceptions that can happen during
						the procedure? How does the user handle those?
					</li>
				</ul>
				<h3 id="bonus-download-our-process-definition-document-template">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Bonus: Download our process definition document template
				</h3>
				<p>
					For the more formal documentation needs, we are happy to share our
					<a
						href="/docs/courses/implementing-rpa-robots/process-definition-document#download-our-template-for-your-process-definition-documents"
						>process definition document template</a
					>
					that you can use freely in your next RPA project.
				</p>
				<blockquote>
					<p>
						Remember: If you don't need a very detailed and formal document, use
						something simpler.
					</p>
				</blockquote>
				<h2 id="lets-write-the-pdd-for-mariax27s-case">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Let's write the PDD for Maria's case
				</h2>
				<p>
					Let's see together how a process definition document for Maria's case
					would look like.
				</p>
				<p>
					<strong>Surprise!</strong> We have made the PDD document for you
					already. You can download it
					<a
						href="/docs/static/get-started/courses/software-robot-delivery-process/documenting-the-process/PDD_RobotSpareBin_Industries_Inc.pdf"
						target="_blank"
						rel="noreferrer"
						>here</a
					>
					and follow along:
				</p>
				<p>
					<img
						alt="PDD"
						src="/docs/static/get-started/courses/software-robot-delivery-process/documenting-the-process/PDD.png"
					/>
				</p>
				<h3 id="process-name">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Process name
				</h3>
				<p>
					First of all, we need to come up with a name to identify the process.
					The business might have a name for it already.
				</p>
				<blockquote>
					<p>
						In our case, we have gone for
						<em>"Weekly sales report creation"</em>, which is what Maria calls
						it (In public. She has other names for it, especially when she makes
						a mistake 🤬).
					</p>
				</blockquote>
				<h3 id="document-metadata">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Document metadata
				</h3>
				<h4>Versioning</h4>
				<p>
					You should set up your document so that it is easy to update and
					archive. If you are not using a versioning system (you really
					should!), we recommend adding the version in the file name and a table
					inside the document to show the current and previous versions.
				</p>
				<p>
					A good option is to store the documentation with the robot code in the
					same version control repository. That way, the documentation, and the
					implementation can be found in the same place, and keeping them in
					sync is easier.
				</p>
				<p>
					Storing the documentation separately from the implementation is fine
					if you can ensure that changes to the document or the implementation
					always go hand-in-hand.
				</p>
				<p>There's nothing more frustrating than:</p>
				<ul>
					<li>Finding out the documentation is out-of-date.</li>
					<li>
						Not finding the documentation at all (was it in SharePoint, Google
						Drive, on Bob's computer...?).
					</li>
				</ul>
				<p>Our recommendations:</p>
				<p>
					Store the documentation in the same version control repository with
					the robot implementation.
				</p>
				<p>
					When you change the document, also match those changes in the
					implementation.
				</p>
				<p>
					Prefer a simple text-based documentation format (instead of something
					like a Word document).
					<a
						href="https://www.markdownguide.org/"
						target="_blank"
						rel="noreferrer"
						>Markdown</a
					>
					is a great, easy-to-learn format for written content and works well
					with version control systems such as
					<a href="https://git-scm.com/" target="_blank" rel="noreferrer"
						>Git</a
					>
					(it's easy to see what was changed, when, by whom, and even retrieve
					old versions).
				</p>
				<h4>Sign off</h4>
				<p>
					In more formal environments, it might be a good idea to sign off the
					general idea by the business side. That is:
				</p>
				<blockquote>
					<p>
						"We the business, and we the developers, as a team working together
						towards our common cause, agree that our high-level goal is
						described in this document.".
					</p>
				</blockquote>
				<p>
					Worth repeating one more time: There will be changes. Those changes
					are inevitable. The changes are not evil. They are the byproduct of
					learning more about the process and the steps to automate it.
				</p>
				<p>
					Do not sign off to a level where everything has to be exactly as
					described in the document. This has, and will not, ever work well in
					any sizeable software project.
				</p>
				<p>
					Suppose you disallow changes by strict implementation rules that
					someone has tried to <strong>guess</strong> perfectly beforehand. In
					that case, you will probably end up in an endless change management
					process where the whole project grinds to a halt due to not being able
					to react to new learnings or surprises that were not planned for in
					the "perfect" plan.
				</p>
				<p>
					The software business is people business. You (the people working on
					the same thing) are a team. Agree on common goals and then do your
					best, working together, to find the best way to reaching those goals.
					Yes, it is a trust-based business. You are all professionals. By
					leveraging and combining your strengths, great things can be achieved!
				</p>
				<blockquote>
					<p>
						In our example, we probably will require Maria's sign-off, and since
						the process has been the same for years, there should not be too
						many surprises. Marias sign-off does not mean that the plan is
						perfect. It means you agree that you have
						<strong>enough</strong> information and understanding to start
						working on the project.
					</p>
				</blockquote>
				<h4>Contributors</h4>
				<p>
					List the people that have collaborated in creating the document. It
					will be useful to record the key people on the business side who know
					about the process also in the future.
				</p>
				<blockquote>
					<p>In our example, we would list ourselves!</p>
				</blockquote>
				<h3 id="current-process-analysis">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Current process analysis
				</h3>
				<p>
					This section is where you will use your analysis skills to describe
					how the client is handling the process now before you move in and
					optimize and automate it like a pro.
				</p>
				<ul>
					<li>
						What steps does someone inside the company have to take each time to
						make this process work?
					</li>
					<li>How often is the process executed?</li>
					<li>What software do they have to use?</li>
					<li>Where do they get the information they need?</li>
					<li>
						What happens if something goes wrong (how to resolve the situation,
						who to notify of failures, what parties does the failure affect)?
					</li>
				</ul>
				<p>All these questions need to be answered in this section.</p>
				<h4>High level description</h4>
				<p>
					Here you should give an overview of the process. What is this process
					for? How often do they run it? When do they run it? Who runs it? What
					are the steps?
				</p>
				<p>
					This overview description should be crystal clear and not too long to
					read.
				</p>
				<h4>Systems involved</h4>
				<p>
					Processes that are a good fit to be automated by RPA often span across
					different systems. For example, one could be a web application,
					another a legacy system, or even just a spreadsheet.
				</p>
				<p>
					List in this section the systems involved. Don't forget to explain
					what they are used for and if the user needs particular authorization
					roles or rights because the robot will probably need to have them as
					well!
				</p>
				<blockquote>
					<p>
						For our example, we will have Microsoft Excel, the Intranet, and
						Microsoft Word listed here.
					</p>
				</blockquote>
				<h4>Process flow</h4>
				<p>
					One of the best ways to show the steps of a process is via a
					<a
						href="https://en.wikipedia.org/wiki/Flowchart"
						target="_blank"
						rel="noreferrer"
						>flowchart</a
					>, a widely used convention when describing procedures and algorithms.
				</p>
				<p>
					There is a variety of software to easily create flow charts: good
					options for example are
					<a href="https://www.diagrams.net/" target="_blank" rel="noreferrer"
						>Diagrams.net</a
					>
					(free) or
					<a href="https://www.lucidchart.com/" target="_blank" rel="noreferrer"
						>Lucidchart</a
					>
					(free with paid option), or
					<a
						href="https://products.office.com/en/visio/flowchart-software"
						target="_blank"
						rel="noreferrer"
						>Microsoft Visio</a
					>
					(paid).
				</p>
				<p>Here's how the process flow looks like for our example:</p>
				<p>
					<img
						alt="PDD robotsparebin flowchart"
						src="/docs/static/get-started/courses/software-robot-delivery-process/documenting-the-process/pdd_robotsparebin_flowchart.png"
					/>
				</p>
				<h4>Detailed steps</h4>
				<p>
					Here, you will break down the process into steps, and for each one,
					you will provide all the information needed.
				</p>
				<p>
					Try to imagine that you are explaining this to someone who knows
					nothing about the process: after reading your instructions, they
					should be able to complete the process on their own.
				</p>
				<p>
					A good name for a step for example is in the format
					<code
						>&lt;operator&gt; &lt;action&gt; &lt;object of the action&gt;</code
					>. For example: "Employee downloads the Excel file". This is not a
					hard rule though, just make sure that the name clearly and concisely
					describes the step.
				</p>
				<p>
					In each step's description, you are free to add anything that you
					think will help explain it better: screenshots of the user interface,
					the schema of the data involved, etc.
				</p>
				<h3 id="possible-exceptions">
					<button type="button">
						<svg height="16" width="16">
							<path
								d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
							></path>
						</svg></button
					>Possible exceptions
				</h3>
				<p>
					So far, you have described an ideal case where the operator has all
					the data they need, all systems work perfectly together, and the
					result is achieved.
				</p>
				<p>
					This is not always the case: there are times when the process does not
					run that smoothly or cannot be completed for various reasons: we call
					these cases "Exceptions".
				</p>
				<p>Exceptions can be of two types:</p>
				<ul>
					<li>
						<p>
							<strong>Business exceptions</strong>: Business exceptions happen
							when something is wrong with the information being processed. For
							example, if an order has incomplete data, the operation has to
							stop. Or maybe the business requires specific rules that the
							operator knows about: "do not sell more than ten pieces a day for
							that product". These need to be written down carefully because the
							robot will have to follow the same rules.
						</p>
					</li>
					<li>
						<p>
							<strong>System exceptions</strong>: Software can have bugs,
							network connections can fail, passwords can no longer be valid: in
							all these cases, we say that a <em>system exception</em> has
							happened. Write down all these possible cases, explain what the
							operator sees, and if there are ways to get around them.
						</p>
					</li>
				</ul>
				<blockquote>
					<p>
						In our example, a business exception happens if Maria types her
						password wrong, and a system exception is a server error that she
						reports to see sometimes.
					</p>
				</blockquote>
				<aside class="sc-ezWOiH zlNkP">
					<div>
						<a
							href="/docs/courses/software-robot-delivery-process/business-feasibility-assessment"
							>Previous chapter</a
						>
					</div>
					<div>
						<a
							href="/docs/courses/software-robot-delivery-process/implementing-and-testing-the-robot"
							>Next chapter</a
						>
					</div>
				</aside>
			</article>
		</div>
	</div>
</template>
