export default function (type: string, status: string) {
	const category = {
		client: [
			{
				id: 'asap',
				type: 'engineering',
				title: 'ASAP 1:1',
				desc: 'On-demand support. Join waiting room after checkout. Be sure to have a stable connection with Zoom access.',
			},
			{
				id: 'scheduled',
				type: 'engineering',
				title: 'Scheduled 1:1',
				desc: "Book a call up to 2 weeks in advance. If your requested time isn't available, we'll email you with alternate times.",
			},
			{
				id: 'bug',
				type: 'engineering',
				title: 'Modify an existing automation',
				min_plan: 'support',
				gated: type !== 'client' || status === 'paused',
				desc: 'Small-scale request such as an automation bug fix, small or straightforward change to an existing process',
			},
			{
				id: 'new',
				type: 'engineering',
				title: 'Create a new automation project',
				min_plan: 'growth',
				gated: type !== 'client' || status === 'paused',
				desc: 'You have a project recommendation, an idea, major process change request, or any other larger initiative.',
			},
			{
				id: 'dashboard_bug',
				type: 'engineering',
				title: 'Dashboard bug',
				desc: 'Issues with Motis dashboard',
			},
			{
				id: 'performance_issues',
				type: 'engineering',
				title: 'Perfomance issues',
				min_plan: 'enterprise',
				gated: type !== 'client' || status === 'paused',
				desc: 'Reporting of performance issues is only available on the Enterprise tier',
			},
			{
				id: 'sales_inquiry',
				type: 'sales',
				title: 'Sales enquiry',
				desc: 'Questions about pricing, paid plans and Enterprise plans.',
			},
			{
				id: 'billing',
				type: 'sales',
				title: 'Billing',
				desc: 'Issues with credit card charges | invoices | overcharging',
			},
			{
				id: 'abuse',
				type: 'sales',
				title: 'Abuse report',
				desc: 'Report abuse of a Motis project or Motis brand',
			},
		],
		partner: [
			{
				id: 'referral',
				type: 'sales',
				title: 'New deal registration',
				desc: "Submit a new referral deal. As a partner, we'll kick back anything you help us close.",
			},
			{
				id: 'sales_inquiry',
				type: 'sales',
				title: 'Sales enquiry',
				desc: 'Questions about pricing, paid plans and Enterprise plans.',
			},

			{
				id: 'billing',
				type: 'sales',
				title: 'Billing',
				desc: 'Issues with credit card charges | invoices | overcharging',
			},
			{
				id: 'dashboard_bug',
				type: 'engineering',
				title: 'Dashboard bug',
				desc: 'Issues with Motis dashboard',
			},
			{
				id: 'abuse',
				type: 'sales',
				title: 'Abuse report',
				desc: 'Report abuse of a Motis project or Motis brand',
			},
		],
		super_admin: [
			{
				id: 'bug',
				type: 'engineering',
				title: 'Modify an existing automation',
				min_plan: 'support',
				gated: false,
				desc: 'Small-scale request such as an automation bug fix, small or straightforward change to an existing process',
			},
			{
				id: 'new',
				type: 'engineering',
				title: 'Create a new automation project',
				min_plan: 'growth',
				gated: false,
				desc: 'You have a project recommendation, an idea, major process change request, or any other larger initiative.',
			},
			{
				id: 'dashboard_bug',
				type: 'engineering',
				title: 'Dashboard bug',
				desc: 'Issues with Motis dashboard',
			},
			{
				id: 'performance_issues',
				type: 'engineering',
				title: 'Perfomance issues',
				min_plan: 'enterprise',
				gated: false,
				desc: 'Reporting of performance issues is only available on the Enterprise tier',
			},
			{
				id: 'referral',
				type: 'sales',
				title: 'New deal registration',
				desc: "Submit a new referral deal. As a partner, we'll kick back anything you help us close.",
			},
			{
				id: 'sales_inquiry',
				type: 'sales',
				title: 'Sales enquiry',
				desc: 'Questions about pricing, paid plans and Enterprise plans.',
			},
			{
				id: 'billing',
				type: 'sales',
				title: 'Billing',
				desc: 'Issues with credit card charges | invoices | overcharging',
			},
			{
				id: 'abuse',
				type: 'sales',
				title: 'Abuse report',
				desc: 'Report abuse of a Motis project or Motis brand',
			},
		],
	};

	const severity = [
		{
			id: 'low',

			title: 'Low',
			desc: 'General guidance',
		},
		{
			id: 'normal',

			title: 'Normal',
			desc: 'System impaired',
		},
		{
			id: 'high',

			title: 'High',
			min_plan: 'support',

			desc: 'Production system impaired',
		},
		{
			id: 'urgent',

			title: 'Urgent',
			desc: 'Production system down',
		},
		{
			id: 'critical',

			title: 'Critical',
			desc: 'Business-critical system down',
		},
	];

	return { category: category[type], severity };
}
