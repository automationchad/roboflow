export default function () {
	const entitlements = {
		free: {
			ticket_count: 0,
			concurrent_ticket_count: 0,
			execution_count: 0,
			user_count: 2,
			workflow_count: 0,
			workflow_runs: 0,
			document_count: 0,
			document_size: 0,
		},
		basic: {
			ticket_count: 0,
			concurrent_ticket_count: 0,
			execution_count: 0,
			user_count: 5,
			workflow_count: 0,
			workflow_runs: 0,
			document_count: 0,
			document_size: 0,
		},
		growth: {
			ticket_count: 15,
			concurrent_ticket_count: 2,
			execution_count: 100000,
			user_count: 10,
			workflow_count: 100,
			workflow_runs: 500000,
			document_count: 0,
			document_size: 0,
		},
		enterprise: {
			ticket_count: 25,
			concurrent_ticket_count: 5,
			execution_count: 10000,
			user_count: 20,
			workflow_count: 200,
			workflow_runs: 5000,
			document_count: 500,
			document_size: 50000,
		},
	};
	return entitlements;
}
