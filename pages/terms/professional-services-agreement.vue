<script setup>
	const terms = [
		{
			title: 'Fees & Expenses',
			description: `<p>Fees may be based upon MOTIS GROUP’s current standard hourly rates or upon a fixed fee proposal. If standard hourly rates are charged, they will be charged in quarter-hour increments for all time actually devoted to the performance of computer-related services as described in this Agreement, as well as research, analysis of requirements, evaluation and recommendation of alternatives, custom programming, installation of hardware/software, training, support, and implementation and troubleshooting of various computer-related problems, including time spent on the telephone, for travel, on site, or in MOTIS GROUP’s office. In any given month, the minimum for hourly billed support calls would be $175.00 for the month.</p> <p>Naturally, for fixed fee or otherwise designated projects or under standard support agreements, hourly rates will not be charged unless services are performed outside the designated scope of the engagement.</p><p>MOTIS GROUP may perform any of its services through one or more agents, subcontractors or third party providers, provided that MOTIS GROUP shall remain responsible to Client for the performance of all services and for the acts and omissions of any agent, subcontractor or third party provider.</p>
<p>During the performance of certain tasks, it may be impossible to determine the precise nature and extent of the necessary consulting services which may be required. Estimated hours for a specific service are good faith estimates of what the total fee may be, but not necessarily the total fee. MOTIS GROUP will work as quickly and efficiently as possible in performing all of the services, which are necessary to complete the requested task. MOTIS GROUP will endeavor to keep Client informed as to the amount of billable time that has been incurred as these services are being performed. Projects with no response from client within 90 days will be presumed to be closed and complete.</p>
`,
			children: [],
		},
		{
			title: 'Payment & Invoices',
			description: `Invoices detailing the services for a given month will be rendered to Client at the month end or at the logical end of a project, and will be due and payable upon receipt unless other arrangements are made. Invoices for hardware or software will be due and payable upon delivery of the hardware or software. All invoice amounts shall be presumed to be correct unless Client notifies MOTIS GROUP in writing within 10 days after receipt of the invoice. Any amount that remains unpaid for more than thirty (30) days shall be subject to a late charge computed daily at the lesser of 1.5% per month or the highest rate permitted by California law. There are no refunds once an invoice has been paid. Client agrees to pay for all costs and expenses incurred by MOTIS GROUP (including attorneys’ fees and legal costs) in collecting or attempting to collect any amount due under this Agreement.`,
			children: [],
		},
		{
			title: 'Additional Services',
			description: `If MOTIS GROUP and Client agree that MOTIS GROUP shall provide additional services beyond the scope of this Agreement, then the terms and conditions of this Agreement shall apply to the provision of such services. Client agrees to negotiate any change in scope and the fees for such change and to execute a written change order. MOTIS GROUP reserves the right to suspend performance of any additional services while a change order is being negotiated. No change order will be binding upon MOTIS GROUP unless signed or acknowledged by both parties.`,
			children: [],
		},
		{
			title: 'Excuse for nonperformance',
			description: `MOTIS GROUP’s obligation to perform services hereunder shall be excused without liability when prevented by strike, act of God, governmental action, accident, act of war, act of terrorism, or any other condition beyond its reasonable control. MOTIS GROUP agrees to resume performance of services as soon as practicable following cessation of such condition.`,
			children: [],
		},
		{
			title: 'Termination of Agreement',
			description: `<p>Either party may terminate this Agreement at any time by giving the other party 30 days’ advance written notice of termination. If Client fails to pay any amount when due pursuant to this Agreement, MOTIS GROUP may suspend performance of the services and/or terminate this Agreement upon written notice.</p><p>Either party may terminate this Agreement without notice if the other party becomes insolvent, files a voluntary petition in bankruptcy, becomes the subject of an involuntary petition in bankruptcy which is not dismissed within 60 days, or has a temporary or permanent receiver, trustee, or custodian appointed for all or a substantial part of its assets. Upon any termination of this Agreement, the payment obligations, limitation of liability and indemnification obligations in this Agreement shall survive and continue to be binding on the parties.</p>`,
			children: [],
		},
		{
			title: 'Intellectual property ownership rights',
			description: `Client acknowledges and agrees that MOTIS GROUP shall be the exclusive owner of all intellectual property and other rights in and to all proprietary materials, information, development tools, source codes, object codes, know how, ideas, concepts, inventions, improvements, and methodology used in the conduct or within the scope of MOTIS GROUP’s business, including personal and professional programming techniques, processes, code books, templates, computer program algorithms, system design, architecture, logic, structure, sequence, and organization developed, conceived, discovered, or known by MOTIS GROUP, its employees, contractors or agents (either alone or with others, including Client), either prior to or during the performance of the services under this Agreement.`,
			children: [],
		},
		{
			title: ' Non-interference with relationships',
			description: `<p>Client acknowledges that MOTIS GROUP’s relationship with its employees, agents, clients and vendors are valuable business assets of MOTIS GROUP. Therefore, Client agrees that, during the term of this Agreement and for a period of two (2) years thereafter, Client will not (for itself or for any third party) divert, solicit for employment, engage for consulting, interfere with, alter in any way, terminate or breach such business relationships of MOTIS GROUP, or attempt to do any of the foregoing, directly or indirectly.</p>

<p>In the event Client, within the term of this Agreement and for a period of two (2) years thereafter, directly or indirectly engages or hires as an employee or independent contractor any person or entity who, during the term of this Agreement, performed services for Client under the terms of this Agreement, Client shall pay to MOTIS GROUP as a finder’s fee a sum equal to one (1) year of compensation of such person or entity determined by annualizing (on the basis of 2080 hours per year) the rate at which compensation was paid by MOTIS GROUP to such person or entity (e.g. the annual pay for an employee receiving $10,400/month would be $124,800 and the annual pay for an hourly employee receiving $60/hour would be $124,800).</p>

<p>Client acknowledges and agrees that any remedy at law for any breach of this Section by Client may be inadequate, and in the event of a breach or threatened breach of this Section, MOTIS GROUP would suffer substantial and irreparable damage for which the recovery of damages, even if available, would not provide an adequate remedy. Therefore, MOTIS GROUP shall be entitled (in addition to any other rights and remedies available at law or in equity) to seek specific performance and injunctive and other equitable relief to prevent or restrain the breaching or violating the provisions of this Section. Nothing herein contained shall be construed as prohibiting MOTIS GROUP from pursuing any other remedies available to it at law or in equity for such breach or threatened breach, including without limitation the recovery of damages.</p>
<p>The parties intend that the provisions of this Section shall be enforced to the fullest extent permissible. Accordingly, if any provision of this Section is deemed to be invalid or unenforceable, this Section shall be considered amended to delete therefrom the portion that is invalid or unenforceable.</p>`,
			children: [],
		},
		{
			title: 'Limited warranties',
			description: `MOTIS GROUP warrants to Client (and only to Client) that all of the services will be performed in a professional and workmanlike manner in accordance with this Agreement. For a period of ninety (90) days after the date services are completed, MOTIS GROUP warrants that the services will be free from material errors and other defects in design, workmanship and materials, and will substantially conform to any specifications set forth in this Agreement. Obligations of MOTIS GROUP under this Section shall be limited, at MOTIS GROUP’s option, to correcting any such material errors or defects at no cost to Client or refunding fees paid to MOTIS GROUP for such services. In no event shall MOTIS GROUP be liable for any consequential damages. MOTIS GROUP makes no other warranties or representations as to its services, including but not limited to, any implied warranties of merchantability, or fitness for a particular purpose.`,
			children: [],
		},
		{
			title: 'Software and hardware recommendations',
			description: `From time to time, MOTIS GROUP may recommend that Client acquire certain software and hardware. Although MOTIS GROUP will use its professional judgment, knowledge, and expertise in recommending various software and hardware solutions, MOTIS GROUP disclaims all liability in connection with the operation or suitability of client software and hardware, include software or hardware that Client acquires at the recommendation of MOTIS GROUP. MOTIS GROUP makes no warranties of any kind relating to its services, or any software or hardware, and agrees to transfer any manufacturer warranties applicable to any software or hardware to Client. Client also agrees that it will submit any claims which relate to any software or hardware only to the applicable manufacturer (and not MOTIS GROUP).`,
			children: [],
		},
		{
			title: 'Identification as Client',
			description: `MOTIS GROUP shall be permitted to identify Client as a client, to use Client’s name and its trademarks, service marks, logos, symbols and/or brand names (“Marks”) in connection with proposals to prospective clients, to hyperlink from MOTIS GROUP’s website to Client’s home page, to display Client’s Marks on MOTIS GROUP’s website, and to otherwise refer to Client in print or electronic form for marketing or reference purposes. MOTIS GROUP’s use of the Marks shall be subject to Clients logo and trademark usage guidelines, as provided to MOTIS GROUP and as may be updated from time to time. Except as permitted hereunder or by separate written agreement of the parties, nothing in the Agreement shall create in either party any rights in any trademark, trade name, service mark, insignia, symbol, identification and/or logotype of the other party. MOTIS GROUP may issue a press release announcing Client’s engagement of MOTIS GROUP which shall be subject to the approval of both parties, which approval shall not be unreasonably withheld or delayed.`,
			children: [],
		},
		{
			title: 'Limitations on liability',
			description: `MOTIS GROUP will not be responsible for any indirect, consequential, special, punitive or incidental damages, even if MOTIS GROUP has been informed of the possibility of such damages, including, but not limited to, any lost profits, revenues or loss of business, any loss of technology or data, or any interruption of the use of machines resulting from any of our acts or omissions. MOTIS GROUP’s aggregate liability for any direct damages relating to any services under this Agreement (regardless of the form of action or legal theory) will not exceed the aggregate fees payable by Client under this Agreement. Client agrees that it will not institute any legal action alleging a cause of action related to this Agreement or the services provided by MOTIS GROUP more than one (1) year after the date such cause of action accrued.`,
			children: [],
		},
		{
			title: 'Entire agreement',
			description: `Client and MOTIS GROUP agree that this Agreement and these Standard Terms & Conditions express their entire understanding regarding this subject matter and they acknowledge that they are not relying upon any other understanding, representations or other agreements between the parties. This letter agreement may be amended or modified only in writing signed by both parties. Client and MOTIS GROUP may waive any term or provision of this Agreement only in writing signed by the waiving party. If any term of this Agreement is determined to be illegal, invalid or unenforceable, the term will be eliminated or limited only to the extent necessary so that the remainder of this Agreement will be legal, valid and enforceable.`,
			children: [],
		},
		{
			title: 'Governing law; binding arbitration',
			description: `The interpretation and enforcement of this Agreement will be governed by the laws of the State of California (without regard to any choice of law principles). Client and MOTIS GROUP agree to attempt to settle any dispute arising in connection with this Agreement through good faith consultation. If no agreement can be reached on such dispute, then the parties shall promptly submit such dispute to arbitration with the Los Angeles, California office of the JAMS, to be determined as expeditiously as possible in accordance with its rules then in effect. The arbitrator shall have the authority to issue restraining orders and injunctions and impose all remedies and sanctions which may be imposed in a California court of law. All discovery available under California Code of Civil Procedure § 1283.05, which is hereby incorporated into this Agreement, shall be available to the parties. The arbitration decision will be final, conclusive and binding on both parties and any arbitration award or decision may be entered in any court having jurisdiction. Client and MOTIS GROUP agree that the prevailing party in any arbitration will be entitled to its arbitration award entered by any court of competent jurisdiction and to an award of its reasonable attorneys’ fees, legal costs and its share of arbitration fees.`,
			children: [],
		},
	];
</script>

<template>
	<div>
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
		<div class="bg-white py-32 px-6 lg:px-8">
			<div class="prose mx-auto max-w-3xl text-base leading-7 text-gray-700">
				<h2>Motis Group Professional Services Agreement Terms & Conditions</h2>
				<p>
					The following Standard Terms & Conditions shall apply to services to
					be provided by Motis Group, Inc. (MOTIS GROUP) to the Client and are
					an integral part of the attached engagement letter or proposal or
					Technology Cost Detail (this Agreement):
				</p>
				<ol>
					<li v-for="term in terms" :key="term">
						<strong>{{ term.title }}</strong
						>:
						<span v-html="term.description"></span>
						<ol>
							<li v-for="child in term.children" :key="child">
								<strong>{{ child.title }}</strong
								>{{ `${child.title ? ': ' : ''} ${child.description}` }}
							</li>
						</ol>
					</li>
				</ol>
				<div class="mt-10">
					<a
						href="/terms"
						class="text-sm font-semibold leading-7 text-indigo-600 no-underline"
						><span aria-hidden="true">&larr;</span> Back to home</a
					>
				</div>
			</div>
		</div>
	</div>
</template>
