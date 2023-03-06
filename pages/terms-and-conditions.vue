<script setup>
	import { useAttrs } from 'vue';
	import { format } from 'date-fns';
	const attrs = useAttrs();
	const user = useSupabaseUser();
	const profile = attrs.profile;
</script>

<template>
	<div>
		<Navbar
			class=""
			@open-modal="showLoginModal = true"
			:user="user"
			:profile="profile"
		/>
		<div class="relative -mt-[5.75rem] overflow-hidden pt-[5.75rem]">
			<img
				src="/img/beams-basic.png"
				alt=""
				class="absolute top-0 left-1/2 -ml-[39rem] w-[113.125rem] max-w-none"
			/>
			<div class="px-4 sm:px-6 lg:px-8">
				<div class="relative mx-auto max-w-[37.5rem] pt-20 pb-24 text-center">
					<h1
						class="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
					>
						Terms and conditions
					</h1>
					<p class="mt-4 text-base leading-7 text-slate-600">
						Last updated on {{ format(new Date(), 'MMMM d, yyyy') }}
					</p>
				</div>
			</div>
			<div class="relative px-4 pb-24 sm:px-6 lg:px-8">
				<div
					class="prose prose-sm prose-slate mx-auto max-w-[40rem] prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600"
				>
					<p>
						THIS TERMS OF USE AGREEMENT (the “Agreement”) constitutes a legally
						binding agreement by and between MOTIS GROUP, LLC, a limited
						liability company organized under the laws of the state of Delaware
						(“Motis Group”) and the client, whether personally or on behalf of
						an entity (“Client”), with regard to access and use of Motis Group’s
						website: https://www.motis.group (the “Website”) and any other media
						form, channel, mobile website or mobile application related, linked
						or otherwise connected thereto. Failure to agree and adhere to all
						of the terms, conditions and obligations contained herein results in
						the express prohibition of the Client’s use of the Website, and the
						Client is ordered to discontinue use immediately. Thereafter the
						relationship between Client and Motis Group shall cease and be of no
						further force and effect between the parties, except that any
						obligation of Client to pay Motis Group for services rendered shall
						remain and continue to be an ongoing obligation owed by Client to
						Motis Group.
					</p>
					<h2>1. Intellectual Property Rights</h2>
					<p>
						Unless otherwise indicated, the Website is the property of Motis
						Group and all source code, databases, functionality, software,
						website designs, audio, video, text, photographs and graphics of any
						nature and regardless of format (herein, collectively or
						individually, the “Content”) and the trademarks, service marks, and
						logos contained there (the “Marks”) are owned and controlled by
						Motis Group and are protected by copyright and trademark laws and
						any other applicable intellectual property law or regulation of the
						United States, foreign jurisdictions and international conventions.
						The Content and Marks are provided “As-Is” for your information and
						personal use only. Except as expressly provided herein, no part of
						the Website and no Content may be copied, reproduced, aggregated,
						republished, uploaded, posted, displayed, encoded, translated,
						transmitted, distributed, sold, licensed, or otherwise exploited for
						any commercial purpose whatsoever, without Motis Group’s express
						prior written permission. Motis Group reserves all rights in the
						Website, Content and Marks.
					</p>
					<h2>2. Ownership of Materials</h2>
					<p>
						Notwithstanding Motis Group’s ownership of Submissions, as described
						in Paragraph 4 (“Client Feedback”), all design and original source
						files created on Client’s behalf (“Projects”) belong to Client, and
						Client shall be the sole owner of the copyright for all Projects. In
						the event that any operation of law would cause Motis Group to
						become the owner of a Project, in whole or in part, rather than
						Client, Motis Group irrevocably and perpetually assigns its entire
						interest in the Project to Client, without limitation.Client
						warrants that any and all materials provided to Motis Group as
						examples or as material to be incorporated into a project during the
						design process are owned by Client and do not infringe on or
						misappropriate any third party’s rights, including, but not limited
						to, all intellectual property rights and any right of publicity.
						Motis Group always reserves the right to share the Client's design
						work publicy (social media, website, etc.) unless agreed upon as
						stated in section 18 of this document.
					</p>
					<h2>3. Third-Party Fonts</h2>
					<p>
						In the event that any Project incorporates fonts that are not owned
						by Motis Group and require a commercial license in order for Client
						to legally reproduce, distribute, or publicly display the Project
						(“Third-Party Font(s)”), Motis Group will inform Client in writing
						that one or more Third-Party Fonts have been incorporated into the
						Project and that Client will need to purchase one or more licenses
						for the Third-Party Fonts from the rights-holder(s) of said Third
						Party Fonts in order to legally reproduce, distribute, or publicly
						display the Project. Said notice will include information sufficient
						for Client to identify which licenses are required and who to
						contact in order to purchase said licenses.So long as Motis Group
						has informed Client of the incorporation of Third-Party Fonts as
						described above, Client assumes all responsibility for any
						consequences as a result of a failure by Client to purchase one or
						more licenses for any Third-Party Fonts incorporated into a Project.
					</p>
					<h2>4. User Representations</h2>
					<p>
						By using the Website, Client represents and warrants that:Client has
						the legal capacity and agrees to comply with these Terms of
						Use;Client is not a minor in the jurisdiction of their
						domicile;Client will not access the Website through automated or
						non-human means;Client will not use the Website for any illegal or
						unauthorized purpose;Client’s use of the Website will not violate
						any applicable law or regulation.
					</p>
					<h2>5. Prohibited Activities</h2>
					<p>
						Client shall not access or use the Website for any purpose other
						than that for which the Website is made available to the Client. The
						Website may not be used in connection with any commercial endeavors
						except those related to the work performed by Motis Group on behalf
						of the Client. Further, Client agrees to refrain from the
						following:Make any unauthorized use of the Website;Retrieve data or
						content for the purposes of creating or compiling a database or
						directory;Circumvent, disable, or otherwise interfere with
						security-related features on the Website;Engage in unauthorized
						framing or linking of the Website;Trick, defraud or mislead Motis
						Group or other users;Interfere with, disrupt or create an undue
						burden on the Website or Motis Group’s networks or servers;Use the
						Website in an effort to compete with Motis Group;Decipher,
						decompile, disassemble, or reverse engineer any of the software
						comprising or in any way making up a part of the Website;Bypass any
						measures on the Website designed to prevent or restrict access to
						the Website or any portion thereof;Harass, annoy, intimidate or
						threaten any of Motis Group’s employees, independent contractors or
						agents providing services through the Website;Delete the copyright
						or other rights notice from any Content;Copy or adapt the Website’s
						softwareUpload or transmit, or attempt to do so, viruses, Trojan
						horses, or other material including anything that interferes with
						any party’s use of the Website or modifies, impairs, disrupts,
						alters, or interferes with the use, features, functions, operations
						or maintenance of the Website;Upload or transmit, or attempt to do
						so, any material that acts as a passive or active information
						collection or transmission mechanism;Disparage, tarnish or otherwise
						harm Motis Group;Use the Website in a manner inconsistent with any
						applicable laws, statutes or regulations.
					</p>
					<h2>6. Client Feedback</h2>
					<p>
						Client acknowledges and agrees that any questions, comments,
						suggestions or other feedback or submission (each a “Submission”)
						shall be the sole property of Motis Group and Motis Group is under
						no obligation to keep a Submission confidential or take steps
						necessary to ensure the confidentiality of a Submission. Motis Group
						shall be the sole and exclusive owner of all rights related to the
						Submission except to the extent that rights are granted to Client
						under Paragraph 2 (“Ownership of Materials”), and shall at its sole
						and unrestricted discretion use and disseminate a Submission for any
						lawful purpose without permission, acknowledgment or compensation of
						or to the Client. Client agrees that it has the right to articulate
						and put forth the Submission and Client hereby waives all claims and
						recourse against Motis Group for its use of the Submission in
						accordance with the terms hereof and in its sole discretion
						hereafter.
					</p>
					<h2>7. Management and Oversite</h2>
					<p>
						Motis Group reserves the right to monitor the Website for violations
						of these Terms of Use and to take appropriate legal action in
						response to a violation of the Terms of Use or any applicable law,
						statute or regulation. Motis Group further reserves the right to
						restrict or deny access to the Website or disable the Client’s use
						of the Website. Such decision shall be in the sole discretion of
						Motis Group, without notice or liability to Client. All decisions
						regarding the management of the Website shall be at the sole
						discretion of Motis Group and shall be designed to protect Motis
						Group’s rights and property.
					</p>
					<h2>8. Privacy Policy</h2>
					<p>
						By using the Website, Client agrees to be bound and abide by the
						Privacy Policy and the terms more particularly set forth therein and
						adopted and incorporated herein. The Website is hosted in the United
						States of America. Access of the Website from the EU, Asia or other
						region of the world may result in the applicability of laws,
						statutes or regulations differing from those of the United States
						which govern personal data collection, use or disclosure. Client’s
						continued use of the Website and transfer of data to the United
						States constitutes express consent of Client to the transfer and
						processing of data in the United States. Motis Group does not
						knowingly accept or solicit information from individuals under the
						age of 18. In accordance with the United States’ Children’s Online
						Privacy Protection Act, upon the receipt of actual knowledge that an
						individual under the age of 13 has provided personally identifiable
						information to Motis Group without parental consent, Motis Group
						shall delete that information as soon as reasonably practical.
					</p>
					<h2>9. Returns and Refunds</h2>
					<p>
						Motis Group reserves the right to deny refunds based on its own self
						discretion and without notice or liability to Client. Refund
						requests are assessed on a case by case basis. Should Client request
						a refund during the first month of use, all materials produced by
						Motis Group are ownership of the company and are prohibited from
						being used by the Client in any way. Motis Group reserves the right
						to take appropriate legal actions against Client for breach of this
						paragraph.
					</p>
					<h2>10. Modification</h2>
					<p>
						Motis Group reserves the right to change, alter, modify, amend or
						remove anything or any content on the Website for any reason at its
						sole discretion. Motis Group reserves the right to modify or
						discontinue all or part of the Website without notice and without
						liability to Client.
					</p>
					<h2>11. Connection Interruptions</h2>
					<p>
						Motis Group does not guaranty or warrant the Website will be
						available and accessible at all times. Issues with hardware,
						software or other items may result in interruption delays or errors
						beyond Motis Group’s control. Client agrees that Motis Group shall
						not be liable to Client for any loss, damage or inconvenience caused
						by Client’s inability to access or use the Website during any
						interruption in the connection or service.
					</p>
					<h2>12. Governing Law</h2>
					<p>
						These Terms of Use shall be governed by and construed in accordance
						with the laws of the State of Maryland without regard to conflict of
						law principals.
					</p>

					<h2>13. Litigation</h2>
					<p>
						Any legal action of whatever nature shall be brought in the state
						courts of Washington County, Maryland or in the United States
						District Court for the District of Maryland. The parties hereto
						consent to personal jurisdiction in said courts and waive all
						defenses of lack of personal jurisdiction and forum non conveniens
						with respect to venue and jurisdiction. Application of the United
						Nations Convention on Contracts for the International Sale of Goods
						and the Uniform Computer Information Transaction Act are excluded
						from these Terms of Use.
					</p>

					<h2>14. Disclaimer</h2>
					<p>
						The Website is provided on an as-is, as-available basis. Client
						agrees that its use of the Website and Services are at Client’s sole
						risk. Motis Group disclaims all warranties, express or implied, in
						connection with the Website and Client’s use thereof, including the
						implied warranties of merchantability, fitness for a particular
						purpose and non-infringement. Motis Group makes no warranties or
						representations about the accuracy or completeness of the Website or
						any content thereon or content of any websites linked to the Website
						and Motis Group assumes no liability for any errors, mistakes or
						inaccuracies of content and materials, personal injury or property
						damage, of any nature whatsoever, any unauthorized access to or use
						of Motis Group’s secure servers and/or any personal information
						and/or financial information stored therein, any interruption or
						cessation of transmission to or from the site, any bugs, viruses,
						Trojan horses or the like which may be transmitted to or through the
						Website by any third party and/or any errors or omissions in content
						and materials or for any loss or damage of any kind incurred as a
						result of the use of any content posted, transmitted or otherwise
						made available through the Website. Motis Group does not warrant,
						endorse, guarantee or assume responsibility for any product or
						service advertised or offered by a third party either through the
						Website, a hyperlinked website or any website or mobile application
						featured in any advertising.
					</p>
					<h2>15. Limitations of Liability and Indemnification</h2>
					<p>
						Motis Group and its directors, employees, members, independent
						contractors or agents shall not be liable to Client or any third
						party for any direct, indirect, consequential, incidental, special
						or punitive damages, including lost profit, lost revenue, lost data,
						attorneys’ fees, court costs, fines, forfeitures or other damages or
						losses arising from Client’s use of the Website.Client agrees to
						defend, indemnify and hold harmless, Motis Group and its
						subsidiaries, affiliates and all respective officers, members,
						agents, partners, employees and independent contractors from and
						against any loss, damage, liability, claim or demand including
						reasonable attorneys’ fees and expenses, made by any third party due
						to or arising out of: (1) use of the Website; (2) breach of these
						Terms of Use; (3) any breach of Client’s representations and
						warranties set forth herein; (4) Client’s violation of the rights of
						any third party, including but not limited to intellectual property
						rights. Notwithstanding the foregoing, Motis Group reserves the
						right, at Client’s expense, to assume control and defense of any
						matter for which Client shall be required to indemnify Motis
						Grouphereunder. Client agrees to cooperate with the defense of such
						claims.
					</p>
					<h2>16. User Data</h2>
					<p>
						Client is solely responsible for all data transmitted to or that
						relates to any activity Client has undertaken using the Website.
						Motis Group shall have no liability to Client for any loss or
						corruption of any such data and Client hereby waives any right of
						action against Motis Group from any such loss or corruption.
					</p>
					<h2>17. Electronic communications, transactions and signatures</h2>
					<p>
						Client hereby consents to receive electronic communications from
						Motis Group and Client agrees that all agreements, notices,
						disclosures and other communications sent via email or through the
						Website satisfy any legal requirement that such communication be in
						writing. Client hereby agrees to the use of electronic signatures,
						contracts, orders and other records, and to electronic delivery of
						notices, policies and records of transactions initiated or completed
						by Motis Group or through the Website. Client hereby waives any
						rights or requirements under any statutes, regulations, rules,
						ordinances or other laws in any jurisdiction which require an
						original signature or delivery or retention of non-electronic
						records or to payments or the granting of credits by any means other
						than electronic.
					</p>
					<h2>18. Showcasing Design Work</h2>
					<p>
						Motis Group reserves to right to share design work on digital
						channels including social media, website, etc. unless otherwise
						agreed upon. The Client reserves the right to issue an NDA between
						themselves and Motis Group, which in turn would void the right of
						Motis Group to share or discuss Client's work publicly.
					</p>
					<h2>19. Referrals</h2>
					<p>
						Referral tracking and payouts are handled through our third-party
						partner, Rewardful.com.
					</p>
					<h2>20. Miscellaneous</h2>
					<p>
						These Terms of Use and any policies posted on the Website or
						regarding the Website constitute the entire agreement and
						understanding between the Client and Motis Group. Failure of Motis
						Group to enforce any right or provision of these Terms of Use shall
						not operate as a waiver of such right or provision. If any provision
						or part of these Terms of Use is determined to be unlawful, void or
						unenforceable, that provision shall be severed from these Terms of
						Use but shall not otherwise affect the validity or unenforceability
						of the remaining provisions herein. Nothing in these Terms of Use,
						the Privacy Policy or on the Website shall be construed to
						constitute the forming of a joint venture, partnership, employment
						or agency relationship between Client and Motis Group.
					</p>
					<h2>20. Contact Information</h2>
					<p>
						For any questions or complaints regarding the Website, please
						contact Motis Group at:
						<a href="mailto:support@motis.group" target="_blank"
							>support@motis.group</a
						>.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
