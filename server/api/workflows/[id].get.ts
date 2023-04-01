import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const query = await getQuery(event);
	const data = await $fetch('https://tray.io/production/graphql', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer a5c66e3318d043fa9a5289d0497bb1190d428e3f49f44cbeb11ce7154ec0911e',
		},
		body: JSON.stringify({
			query: `query WorkspaceWorkflowsGetWorkflows(
	$first: Int
	$last: Int
	$after: String
	$before: String
	$workspaceId: ID!
	$workspaceIds: [String!]!
	$criteria: WorkspaceWorkflowSearchCriteria
	$orderBy: WorkflowSortField
) {
	workspace(workspaceId: $workspaceId) {
		type
	}
	viewer {
		details {
			username
		}
		organization {
			id
			viewersRole {
				id
				roleType
			}
		}
		workspaceWorkflows(
			last: $last
			first: $first
			after: $after
			before: $before
			workspaceIds: $workspaceIds
			criteria: $criteria
			orderBy: $orderBy
		) {
			edges {
				node {
					id
					name
					lastModified
					enabled
					tags
					templateId
					triggerType
					workspaceId
					projectId
					tutorialId
					creator {
						id
						name
					}
					workspaceId
				}
			}
			totalCount
			pageInfo {
				hasPreviousPage
				hasNextPage
				startCursor
				endCursor
			}
		}
	}
}`,
			variables: {
				criteria: { workflowName: '' },
				last: 20,
				orderBy: 'LAST_MODIFIED',
				workspaceId: `${event.context.params.id}`,
				workspaceIds: [`${event.context.params.id}`],
			},
		}),
	});
	return data;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
