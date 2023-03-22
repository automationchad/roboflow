<script setup>
	const terms = [
		{
			title: 'Confidential Information',
			description: `For purposes of this Agreement, “Confidential Information” means any and all information, whether written, oral or otherwise, which the Disclosing Party discloses to the Receiving Party which relates to the Projects or the Disclosing Party’s business, including, without limitation, any and all technical information, trade secrets, designs, specifications, inventions, discoveries, ideas, concepts, processes, know-how, customer information, financial information, and any other proprietary or confidential information of the Disclosing Party.`,
			children: [],
		},
		{
			title: 'Non-Disclosure Obligations',
			description: `The Receiving Party agrees that it shall not use any Confidential Information for any purpose other than the performance of the Services. The Receiving Party shall not disclose any Confidential Information to any third party without the prior written consent of the Disclosing Party. The Receiving Party shall use at least the same degree of care and protection that it uses to protect its own confidential and proprietary information, but in no event less than reasonable care.`,
			children: [],
		},
		{
			title: 'Term',
			description: `This Agreement shall continue in effect for a period of [TERM OF AGREEMENT] years from the date hereof, unless sooner terminated by either party upon written notice to the other party. The provisions of this Agreement shall survive any termination of this Agreement and shall remain in effect for so long as such Confidential Information remains confidential and proprietary.`,
			children: [],
		},
		{
			title: 'Remedies',
			description: `The parties acknowledge that the unauthorized disclosure or use of the Confidential Information may cause irreparable harm and significant injury to the Disclosing Party that may be difficult to quantify. Accordingly, the Receiving Party agrees that the Disclosing Party shall be entitled to seek injunctive relief to prevent any breach or threatened breach of the provisions of this Agreement, in addition to any other rights and remedies available to it at law or in equity.`,
			children: [],
		},
		{
			title: 'No License',
			description: `Nothing contained in this Agreement shall be construed as granting any license or other rights to the Receiving Party under any patents, copyrights, trademarks or other intellectual property rights of the Disclosing Party.`,
			children: [],
		},
		{
			title: 'Governing Law',
			description: `This Agreement shall be governed by and construed in accordance with the laws of the State of [STATE], without regard to its conflicts of law principles.`,
			children: [],
		},
		{
			title: 'Entire Agreement',
			description: `This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, understandings and agreements between the parties concerning the subject matter hereof. This Agreement may not be amended or modified except in writing signed by both parties.`,
			children: [],
		},
		{
			title: 'Binding Effect',
			description: `This Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective successors and assigns.`,
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
				<div class="prose">
					<h2>MUTUAL NON-DISCLOSURE AGREEMENT v1.0.0</h2>
					<p>
						The effective date of this non-disclosure agreement (“Agreement”)
						shall commence on the date upon which the Agreement was executed by
						both parties.
					</p>
					<p>
						WHEREAS, the Disclosing Party is engaged in the development of
						automation projects (the “Projects”);
					</p>
					<p>
						WHEREAS, the Receiving Party desires to evaluate and/or participate
						in the Projects and to provide consulting services related thereto
						(the “Services”);
					</p>
					<p>
						WHEREAS, the Disclosing Party may disclose to the Receiving Party
						certain confidential and proprietary information concerning the
						Projects and the Disclosing Party’s business;
					</p>
					<p>
						NOW, THEREFORE, in consideration of the mutual promises and
						covenants contained herein, the parties agree as follows:
					</p>
				</div>

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
			</div>
		</div>
	</div>
</template>
