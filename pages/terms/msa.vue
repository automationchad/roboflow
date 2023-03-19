<script setup>
	const terms = [
		{
			title: 'Effective Date',
			description: `The effective date of this Agreement shall
					commence on the date upon which the Agreement was executed by both
					parties (the “Effective Date”).`,
			children: [],
		},
		{
			title: 'Services',
			description: `Motis Group shall
				provide consulting services, including but not limited to,
				modifications, enhancements and customizations to source code, user
				training, documentation and advice or recommendations regarding
				Company’s hardware and software (“Services”). The specific
				Services to be provided by Motis Group for each project (the “Deliverables”)
				shall be set forth in a Statement of Work (“SOW”). Each SOW
				shall become binding when signed by both parties and shall be subject to
				the terms and conditions of this Agreement. In the event any terms
				or conditions contained in the SOW conflict with the terms and
				conditions of this Agreement, the SOW shall control.`,
			children: [],
		},
		{
			title: 'Products',
			description: `Motis Group shall
				also make available to Company subscription-based Motis Group and
				third-party products (“Products”). The specific Products to be
				provided by Motis Group to Company shall be set forth in a Product Order
				Form. Each Product Order Form shall become binding when
				signed by both parties and shall be subject to the terms and conditions
				of this Agreement. In the event any terms or conditions contained
				in the Product Order Form conflict with the terms and conditions of this
				Agreement, the Product Order form shall control.`,
			children: [],
		},
		{
			title: 'Project Manager',
			description: `In each
				SOW, each party shall designate a responsible employee with reasonable
				decision-making authority to be the project manager (“Project Manager”).
				In the event Project Managers are not defined on the SOW, the
				individuals executing the SOW shall be considered the Project Managers.
				Thereafter, Motis Group’s Project Manager shall consult with the Company’s
				Project Manager and such other personnel as designated by the Company’s
				Project Manager in order to facilitate the fulfillment of the parties’
				obligations under the applicable SOW.`,
			children: [],
		},
		{
			title: 'Acceptance and Rejection',
			description: ``,
			children: [
				{
					title: 'Acceptance Period',
					description: `Unless an
				SOW states otherwise, once a Deliverable is completed and tested by
				Motis Group per the applicable SOW, Motis Group will be deemed to have delivered
				such Deliverable to Company. Upon receipt of such Deliverable,
				Company shall have five (5) business days (“Acceptance Period”) to
				either accept or reject the Deliverable for substantial conformance to
				the agreed-upon specifications, standards or architectures outlined in
				the applicable SOW or promptly notify Motis Group of any defects
				(“Defect”). In the event that Company does not notify Motis Group in
				the manner required by Section 21 of this Agreement of any Defects
				within the Acceptance Period, such Deliverable shall be deemed
				accepted. If the Deliverable forms the basis for ongoing work,
				Motis Group may suspend its performance of such other ongoing work pending
				acceptance of a Deliverable.`,
				},
				{
					title: 'Rejection Procedure',
					description: `If the Company rejects a Deliverable, Company shall
				explain in detail the reason for its rejection, in writing, within the
				Acceptance Period. Deliverables rejected by Company shall be
				replaced or revised by Motis Group and presented to Company for subsequent
				acceptance within a reasonable period of time. The procedures
				outlined in this Section shall be repeated until the Deliverable is
				accepted by Company. The date on which the Deliverable is accepted
				shall be the “Acceptance Date” for such Deliverable.`,
				},
			],
		},
		{
			title: 'Payment and Expenses',
			description: ``,
			children: [
				{
					title: 'Fees',
					description: `Company agrees to pay Motis Group the fees set forth in the applicable SOW for Services rendered (“Fees”).`,
				},
				{
					title: 'Payment Terms',
					description: `Unless an SOW states otherwise, Motis Group will invoice Company (at the address listed above) on a time and materials basis and payment terms will be net fifteen (15) days from Motis Group’s invoice date.  Any invoiced amount not paid when due shall be subject to a service charge at the rate of one and one-half percent (1.5%) per month.  If Company fails to make any payment to Motis Group when due, Motis Group may, at its sole discretion and without affecting its rights under this Agreement, cancel or suspend work on any pending SOWs and/or eliminate any stated discount on fees for Services rendered.`,
				},
				{
					title: 'Taxes',
					description: `All payments required under this Agreement are exclusive of any applicable taxes, duties, tariffs, levies and other similar charges, which (excluding Motis Group’s net income taxes) shall be Company’s sole responsibility.`,
				},
				{
					title: 'Expenses',
					description: `Company shall be responsible for reimbursement of Motis Group’s out of pocket expenses incurred in performing its duties under any SOW, including, but not limited to, expenses for travel and similar items.  Company will reimburse Motis Group’s expenses no later than fifteen (15) days after Company’s receipt of Motis Group’s invoice, provided that reimbursement for expenses may be delayed until such time as Motis Group has furnished reasonable documentation for authorized expenses as Company may reasonably request.`,
				},
				{
					title: 'Cancellation',
					description: `Company may cancel Services with written notice received by Motis Group at least five (5) business days prior to commencement date of such Service for full refund.  If cancellation notice is received within five (5) business days of the commencement date of such Services, then fifty percent (50%) will be refunded to Company.  If Company does not provide a cancellation notice prior to commencement date, the Company shall not be entitled to any refund.`,
				},
				{
					title: 'Change of Commencement date',
					description: `Company may request a change in the commencement date of Service by no more than [thirty (30)] days with written notice received by Motis Group at least five (5) business days prior to commencement date of such Service with no penalty.  If written notice is received within five (5) business days of the commencement date of the Service, then an additional twenty five percent (25%) of the original fee will be charged to Company.`,
				},
			],
		},
		{
			title: 'Term and Termination',
			description: ``,
			children: [
				{
					title: 'Term',
					description: `Unless terminated as stated herein, this Agreement shall be effective for a period of twelve (12) months from the Effective Date (“Term”).  The Term shall automatically extend until completion of all outstanding SOWs.  In the event of any termination, Company will pay Motis Group the fees incurred for Services rendered by Motis Group up to the termination date.`,
				},
				{
					title: 'Termination',
					description: `Either party may terminate this Agreement at any time, for any reason, by providing thirty (30) days written notice to the other party.  Either party may terminate this Agreement immediately upon written notice to the other party in the event the other party (i) ceases to do business in the ordinary course, (ii) becomes or is declared insolvent or bankrupt, (iii) is the subject of any proceeding related to its liquidation or insolvency, which proceeding, if involuntary, is not dismissed within sixty (60) days, (iv) makes an assignment for the benefit of its creditors, or (v) for a material breach of this Agreement and fails to remedy such breach within fifteen (15) days after receipt of written notice of such breach given by the non-breaching party.`,
				},
				{
					title: 'Effect of Termination:',
					description: `Upon termination of this Agreement, each party shall return to the other party all Confidential Information, defined below, of the other party in its possession.`,
				},
			],
		},
		{
			title: 'Independent Contractors',
			description: `The party’s relationship is that of independent contractors.  Neither party shall be deemed to be the legal representative of the other nor shall it have any right to bind the other party to any contract or commitment.  This Agreement does not, and shall not, be construed to create an employer-employee, agency, joint venture or partnership relationship between the parties.  Each party agrees to assume complete responsibility for its own employees regarding federal or state laws including employers’ liability and tax withholding, worker’s compensation, social security, unemployment insurance, and OSHA requirements.`,
			children: [],
		},
		{
			title: 'Confidential Information',
			description: `Company and Motis Group agree to maintain the confidentiality of any proprietary information received by the other party during, or prior to entering into, this Agreement that a party should know is confidential or proprietary based on the circumstances surrounding the disclosure, including, without limitation, non-public technical and business information (“Confidential Information”) during the Term of this Agreement and for a period of two (2) years after the termination of this Agreement. This section shall not apply to any publicly available or independently developed information. The receiving party of any Confidential Information of the other party agrees not to use said Confidential Information for any purpose except as necessary to fulfill its obligations and exercise its rights under this Agreement. The receiving party shall protect the secrecy of and avoid disclosure and unauthorized use of the disclosing party’s Confidential Information to the same degree that it takes to protect its own Confidential Information and in no event less than reasonable care.  Each party agrees to notify the other promptly upon discovery of any unauthorized access, disclosure, or use of the Confidential Information.  Each party acknowledges that monetary damages may not be a sufficient remedy for unauthorized disclosure of any Confidential Information and that the other party may seek, without waiving any other rights or remedies and without posting any bond, injunctive or equitable relief.`,
			children: [],
		},
		{
			title: 'Retention of Rights',
			description: ``,
			children: [
				{
					title: 'Use',
					description: `Company agrees that nothing in this Agreement shall be deemed to prohibit or limit Motis Group’s use, now or at any time, of ideas, concepts, know-how, methods, techniques, skill, knowledge and experience, in any way whatsoever, that are used or developed in the performance of services under this Agreement or any SOW, except to the extent such use is prohibited by Section 9 (“Confidential Information”).  Further, Company agrees that should Motis Group be performing services on product licensed by Motis Group or used by Motis Group to provide services, then Motis Group retains, and Company hereby assigns, all right, title, and interest in all modifications, enhancements, customizations, source code, acquired or developed during the performance of the services under this Agreement or any SOW.  Motis Group hereby grants to Company a world-wide, non-exclusive, non-transferable, royalty-free licensed right to use all Deliverables for its internal uses.  Motis Group shall have the sole right to use and/or to apply for patents, copyrights or other statutory or common law protections for any Deliverable.`,
				},
				{
					title: 'Data Ownership',
					description: `“Company Data” means any data, information or material stored by Company in the Product during the subscription term. Company retains all right, title and interest in and to all of its Company Data.  Company is solely responsible for the accuracy, integrity, and legality of Company Data.`,
				},
				{
					title: 'Processing of Company Data',
					description: `“Company Data” means any data, information or material stored by Company in the Product during the subscription term. Company retains all right, title and interest in and to all of its Company Data.  Company is solely responsible for the accuracy, integrity, and legality of Company Data.`,
				},
			],
		},
		{
			title: 'Motis Group Warranties',
			description: ``,
			children: [
				{
					title: 'Performance',
					description: `Motis Group represents and warrants that the Services shall be performed by qualified personnel and will be of a professional quality conforming to generally accepted industry standards.`,
				},
				{
					title: 'Time and Materials',
					description: `In the case of time and materials based SOWs, Motis Group does not promise that the work can be completed for the amount estimated or within any specified time period.  Company acknowledges and agrees that the hours and material prices stated in an SOW are Motis Group’s best estimate of the requirements to provide the Services set forth on any SOW, and that the hours and prices quoted by Motis Group are subject to change, and may ultimately be more or less than the hours and prices set forth on any SOW.`,
				},
				{
					title: 'Exclusive Remedies',
					description: `For any claim of a Defect made pursuant to the warranty set forth in this Section 11, Company’s sole and exclusive remedy, and Motis Group’s sole and exclusive obligation, shall be (i) the correction of the Defect, within reasonable time, so as to comply with generally accepted industry standards; or (ii) if Motis Group is unable to perform such Services as warranted, then at Motis Group’s discretion, Motis Group may refund all the fees paid to Motis Group under this Agreement or a SOW related to the Defect.  Any claim based on the foregoing warranty must be submitted in writing within thirty (30) days from the Acceptance Date.`,
				},
				{
					title: 'Determination of Defect',
					description: `Motis Group has the sole and absolute discretion in determining whether any particular Deliverable or item of work suffers from a Defect or is in fact a new feature request outside the original scope of the SOW.`,
				},
				{
					title: 'Disclaimer',
					description: `EXCEPT AS EXPRESSLY SET FORTH IN THIS SECTION 11 AND TO THE EXTENT PERMITTED BY APPLICABLE LAW, MOTIS GROUP MAKES NO OTHER WARRANTY OR REPRESENTATION, EITHER EXPRESS OR IMPLIED, AS TO ANY MATTER WHATSOEVER, INCLUDING, WITHOUT LIMITATION, THE SERVICES.  MOTIS GROUP SPECIFICALLY DISCLAIMS, WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF NON-INFRINGEMENT, TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.  MOTIS GROUP DOES NOT GUARANTEE THAT THE USE OF ANY DELIVERED SOFTWARE WILL NOT BE INTERRUPTED OR ERROR FREE.`,
				},
			],
		},
		{
			title: 'Company Representations and Warranties',
			description: `In order to induce Motis Group to enter into this Agreement, Company represents and warrants as follows:`,
			children: [
				{
					title: 'Issue Resolution',
					description: `Project issues will be resolved quickly by the appropriate Company staff, including business and/or data owners.  Company will escalate to its Project Manager or other appropriate staff for unresolved issues.  Quick issue resolution is critical to ensure the project timeline is met.`,
				},
				{
					title: 'Company Involvement',
					description: `Company’s business representatives, process owners, data owners, and system experts will be available as needed to participate in requirement discovery, data understanding, and validation.  Company will provide personnel that are knowledgeable about the technical and business aspects involved in the project.`,
				},
				{
					title: 'IT Staff Assistance',
					description: `Company’s IT technical resources will provide assistance to Motis Group as necessary throughout the project and will be available for training in system operations.`,
				},
				{
					title: 'Resource Identification',
					description: `Prior to project initiation, the resources within Company that will assume responsibility for the Motis Group implementation will be identified.`,
				},
				{
					title: 'Work Environment',
					description: `Motis Group will conduct development remotely from Motis Group facilities and resource facilities.  However, if work is required at Company site, Company will provide adequate workstations including desks, phones, and internet access for Motis Group’s staff deployed to Company’s site.`,
				},
			],
		},
		{
			title: 'Waiver of Consequential Damages',
			description: `IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR DAMAGES FOR LOSS OF REVENUE, PROFITS, DATA OR USE, INCURRED BY EITHER PARTY OR ANY THIRD PARTY, WHETHER IN AN ACTION IN CONTRACT OR TORT, EVEN IF THE OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.`,
			children: [],
		},
		{
			title: 'Default',
			description: `The occurrence of any one or more of the following matters constitutes a default (“Default”) by Company under this Agreement:`,
			children: [
				{
					title: '',
					description: `Company’s failure to pay any Fees for services rendered and/or reimburse Motis Group’s out of pocket expenses when due;`,
				},
				{
					title: '',
					description: `Failure to pay any subscription fees for a Product when due (if applicable);`,
				},
				{
					title: '',
					description: `Failure by Company to observe or perform any of the covenants in this Agreement;`,
				},
				{
					title: '',
					description: `Company becomes insolvent or bankrupt or admits in writing its inability to pay its debts as they mature, makes an assignment for the benefit of creditors, or applies for or consents to the appointment of a trustee or receiver for itself or for all or a part of its property;`,
				},
				{
					title: '',
					description: `Proceedings for the appointment of a trustee, custodian or receiver of Company or for all or a party of Company’s property are filed against Company and are not dismissed within sixty (60) days thereof;`,
				},
				{
					title: '',
					description: `Any other event described elsewhere in this Agreement as constituting a Default by Company under this Agreement.`,
				},
			],
		},
		{
			title: 'Motis Group’s Remedies',
			description: `If a Default occurs, Motis Group shall have the following rights and remedies, which shall be distinct, separate and cumulative, and which may be exercised by Motis Group concurrently or consecutively in any combination and which shall not operate to exclude or deprive Motis Group of any other right or remedy which Motis Group may have at law or in equity:`,
			children: [
				{
					title: '',
					description: `Motis Group may terminate this Agreement by giving Company notice of Motis Group’s intention to do so, in which event Motis Group shall have no further obligation to perform any Services for Company;`,
				},
				{
					title: '',
					description: `Motis Group may declare all Fees, subscription fees and or all other amounts due or to become due under this Agreement and/or any related third party Product immediately due and payable, without notice of any kind to Company;`,
				},
				{
					title: '',
					description: `Motis Group may rescind and revoke any discount set forth on any SOW and seek to recover the full, undiscounted value of the Services provided by Motis Group; and`,
				},
				{
					title: '',
					description: `Motis Group may enforce the provisions of this Agreement and may enforce and protect the rights of Motis Group hereunder by a suit or suits in equity or at law for the specific performance of any covenant or agreement contained herein, or for the enforcement of any other appropriate legal or equitable remedy, including injunctive relief and recovery of all moneys due or to become due from Company under any of the provisions of this Agreement and/or a related third-party Master Subscription Agreement.`,
				},
			],
		},
		{
			title: 'Damages',
			description: `If Motis Group terminates this Agreement, Motis Group shall be entitled to recover from Company: 1) all outstanding Fees accrued and unpaid for the period up to and including such termination date; 2) all other additional sums payable by Company hereunder; and 3) any damages in addition thereto, including reasonable attorneys’ fees and court costs, which Motis Group shall have sustained by reason of the breach of any of the covenants of this Agreement other than for the payment of Fees.`,
			children: [],
		},
		{
			title: 'Subscription Damages',
			description: `If Motis Group terminates this Agreement, such termination shall not release Company, in whole or in part, from Company’s obligation to pay the subscription fees for the full stated subscription term as stated in any Product Order Form, and Motis Group shall be entitled to immediately recover as damages the sum of (1) all accrued and unpaid subscription fees; (2) an amount equal to the total subscription fees that Company would have been required to pay for the remainder of the Term discounted to present value at the Prime Rate (defined below) then in effect, and (3) any damages in addition thereto, including reasonable attorneys’ fees and court costs, which Motis Group shall have sustained by reason of the breach of any of the covenants of this Agreement other than for the payment of Fees and/or subscription fees.  “Prime Rate” shall be the per annum interest rate publicly announced as its prime or base rate by a federally insured bank selected by Motis Group in the State of California.`,
			children: [],
		},
		{
			title: 'Non-Solicitation',
			description: `Company agrees that, during the Term of this Agreement and for twelve (12) months thereafter, Company will not directly or indirectly solicit, induce or attempt to induce or solicit any Motis Group employee to leave his/her employment and join Company or any affiliate thereof.  If Company violates the terms of this Section, Company will pay to Motis Group within ten (10) business days following the retention of such person a lump sum fee equal to six (6) months base salary of such employee at the time he/she left Motis Group.`,
			children: [],
		},
		{
			title: 'Governing Law, Jurisdiction and Legal Expenses',
			description: `This Agreement shall be governed by the laws of the State of California without regards to its conflicts of law provisions.  The United Nations convention on International Sale of Goods is excluded in its entirety.  Any legal action or proceeding relating to this Agreement shall be instituted in a state or federal court in Los Angeles County, California.  Each party hereby submits to the personal jurisdiction of such courts.  The unsuccessful party in an action at law or in equity to enforce the provisions of this Agreement shall pay all costs and expenses so incurred, including attorneys’ fees.`,
			children: [],
		},
		{
			title: 'Notice',
			description: `All notices and other communications herein provided for shall be sent by postage prepaid, via registered or certified mail or Federal Express, return receipt requested, or delivered personally to the parties at their respective addresses set forth above, or to such other address as either party shall give to the other party in the manner provided herein for giving notice, or by email to the signatory below or the Project Manager.  Notice by mail shall be considered given three (3) days after deposit with the carrier.  Notice delivered personally or by e-mail shall be considered given at the time it is delivered or sent electronically.`,
			children: [],
		},
		{
			title: 'Force Majeure',
			description: `Neither party shall be liable or deemed to be in breach for any delay or failure in performance of this Agreement or any SOW (except for the payment of money) or interruption of services resulting directly or indirectly from acts of God, civil or military authority, war, riots, civil disturbances, accidents, fire, earthquake, floods, strikes, lock-outs, labor disturbances, foreign or governmental order, or any other cause beyond the reasonable control of such party.`,
			children: [],
		},
		{
			title: 'Dormancy',
			description: `If the Client fails to provide Motis Group with any necessary information or materials to perform the services, or if the Client fails to respond to Motis Group's inquiries or requests for instructions, Motis Group may place the project on hold ("Dormancy"). If Dormancy occurs, Motis Group may cease working on the project until such time as the necessary information or materials are provided, or until the Client provides instructions to proceed. The Retainer Fee shall continue to be due and payable during any period of Dormancy.
`,
			children: [],
		},
		{
			title: 'Assignment',
			description: `Neither party may assign this Agreement without the prior written consent of the other party, which consent shall not be unreasonably withheld, provided that no consent shall be necessary if this Agreement is being assigned by a party to an acquirer of all or substantially all of the party’s assets (or the assets of the party’s applicable business unit), whether by merger, sale or exchange of stock, sale of assets or otherwise.`,
			children: [],
		},
		{
			title: 'Severability',
			description: `If any term or provision of this Agreement or the application thereof to any circumstance will, in any jurisdiction and to any extent, be invalid or unenforceable, such term or provision will be ineffective as to such jurisdiction to the extent of such invalidity or unenforceability without invalidating or rendering unenforceable the remaining terms and provisions of this Agreement or the application of such terms and provisions to circumstances other than those as to which it is held invalid or unenforceable, and a suitable and equitable term or provision will be substituted therefore to carry out, insofar as may be valid and enforceable, the intent and purpose of the invalid or unenforceable term or provision.`,
			children: [],
		},
		{
			title: 'Entire Agreement; Amendment; Waiver',
			description: `This Agreement expresses the entire understanding with respect to the subject matter hereof and supersedes and terminates any prior oral or written agreements with respect to the subject matter hereof.  Any term of this Agreement may be amended and observance of any term of this Agreement may be waived only with the written consent of the parties hereto.  Waiver of any term or condition of this Agreement by any party shall not be construed as a waiver of any subsequent breach or failure of the same term or condition or a waiver of any other term or condition of this Agreement.  The failure of any party at any time to require performance by any other party of any provision of this Agreement shall not affect the right of any such party to require future performance of such provision or any other provision of Agreement.`,
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
				<h2>Motis Group Master Services Agreement v1.0.6</h2>
				<ol>
					<li v-for="term in terms" :key="term">
						<strong>{{ term.title }}</strong
						>:
						{{ term.description }}
						<ol>
							<li v-for="child in term.children" :key="child">
								<strong>{{ child.title }}</strong
								>{{ `${child.title ? ': ' : ''} ${child.description}` }}
							</li>
						</ol>
					</li>
				</ol>
				<exhibit-a />
			</div>
		</div>
	</div>
</template>
