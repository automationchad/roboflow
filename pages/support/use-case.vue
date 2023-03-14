<template>
	<div>
		<article class="prose">
			<h1>Technical feasibility assessment 🤔</h1>
			<p>
				Maria wants to automate her task of copy-pasting data into the intranet,
				but how can she know if the automation is feasible in the first place?
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
						during the implementation, but the automation could still be doable.
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
					Download the sales data Excel file, open the intranet website, log in,
					enter the sales data, take a screenshot, create a PDF document.
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
					In Maria's case, the process input data (the Excel file) is something
					that a robot can read easily. No data transformations are needed; grab
					and use the data as is! The robot can take screenshots of the page (or
					parts of the page). The robot can also get the HTML from the intranet
					webpage for generating the PDF file.
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
						or even old-fashioned mainframes, the implementation might take more
						effort (depending on the operating system and the applications).
						Robocorp supports image template matching based automation, textual
						locator-based desktop automation, optical Character Recognition
						(OCR), and keyboard and mouse-based automation!
					</p>
				</li>
			</ul>
			<blockquote
				class="border-l-4 border-indigo-500 bg-indigo-100 px-6 py-2 text-indigo-900"
			>
				<p>
					Maria's process involves using several technologies. Excel (file) for
					the sales data, a web browser for entering the data to the intranet,
					Word for pasting and exporting the results in PDF format. The robot
					can read Excel files without actually using the Excel application. The
					robot can use whatever browser is installed. It can also produce PDF
					documents without the need for an additional application. It seems
					that there are no technical issues with this question either!
				</p>
			</blockquote>
			<h2 id="can-the-robot-access-all-the-required-accounts">
				Can the robot access all the required accounts?
			</h2>
			<ul>
				<li>
					<p>
						If the robot can use its own credentials on all systems to complete
						the process, great!
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
				Sometimes the result of the technical assessment is that the automation
				is not technically feasible at all. This is both an unfortunate and a
				good thing! The sad part is that you still need a human to complete the
				mundane process. The good part is that you found out the showstoppers as
				early as possible, without wasting time and money!
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
</template>
