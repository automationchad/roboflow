// Import the necessary libraries
import Stripe from 'stripe';
import { serverSupabaseClient } from '#supabase/server';

const stripe = Stripe(process.env.STRIPE_KEY);

// Define the event handler function
export default defineEventHandler(async (event) => {
	const stripeEvent = await readBody(event);
	const supabase = serverSupabaseClient(event);

	// Function to handle pausing a subscription
	async function pauseSubscription(subscription) {
		const daysLeft =
			subscription.current_period_end * 1000 - Math.floor(Date.now());

		const { data, error } = await supabase
			.from('Subscription')
			.update({
				daysLeft,
				pausedOn: new Date(),
				status: 'paused',
				type: subscription.plan.nickname === 'hosting' ? 'hosting' : 'retainer',
				tier:
					subscription.plan.nickname === 'hosting'
						? null
						: subscription.plan.nickname,
			})
			.eq('stripeSubscriptionId', subscription.id);

		if (error) throw error;
	}

	// Function to handle unpausing a subscription
	async function unpauseSubscription(subscription) {
		const { data, error } = await supabase
			.from('Subscription')
			.update({
				resumesAt: new Date(subscription.pause_collection.resumes_at * 1000),
				status: 'active',
				type: subscription.plan.nickname === 'hosting' ? 'hosting' : 'retainer',
				tier:
					subscription.plan.nickname === 'hosting'
						? null
						: subscription.plan.nickname,
			})
			.eq('stripeSubscriptionId', subscription.id);

		if (error) throw error;
	}

	// Function to handle updating a subscription
	async function updateSubscription(subscription) {
		const wasPaused =
			subscription.pause_collection !== null &&
			subscription.status === 'active';
		const wasResumed =
			subscription.pause_collection === null &&
			subscription.status === 'paused';

		if (wasPaused) {
			await pauseSubscription(subscription);
		} else if (wasResumed) {
			await unpauseSubscription(subscription);
		} else {
			const { data, error } = await supabase
				.from('Subscription')
				.update({
					startDate: new Date(subscription.start_date * 1000),
					endDate:
						subscription.ended_at === null
							? null
							: new Date(subscription.ended_at * 1000),
					deleted: subscription.ended_at !== null,
					status: subscription.status,
					deletedAt: subscription.ended_at,
					type:
						subscription.plan.nickname === 'hosting' ? 'hosting' : 'retainer',
					tier:
						subscription.plan.nickname === 'hosting'
							? null
							: subscription.plan.nickname,
					quantity: subscription.plan.amount,
					cancelledAt: subscription.cancel_at,
					cancelledOn: subscription.canceled_at,
					resumesAt:
						subscription.pause_collection !== null
							? new Date(subscription.pause_collection.resumes_at * 1000)
							: null,
				})
				.eq('stripeSubscriptionId', subscription.id);

			if (error) throw error;
		}
	}

	switch (stripeEvent.type) {
		case 'customer.subscription.created':
			const subscription = stripeEvent.data.object;
			// Insert the subscription into the Subscriptions table
			break;
		case 'customer.subscription.deleted':
			const deletedSubscription = stripeEvent.data.object;
			// Update the deleted flag in the Subscriptions table
			break;
		case 'customer.subscription.updated':
			const updatedSubscription = stripeEvent.data.object;
			// Update the subscription in the Subscriptions table
			await updateSubscription(updatedSubscription);
			break;
		// Handle the 'customer.subscription.paused' and 'customer.subscription.resumed' events
		// by calling the updateSubscription function
		case 'customer.subscription.paused':
		case 'customer.subscription.resumed':
			const pausedOrResumedSubscription = stripeEvent.data.object;
			await updateSubscription(pausedOrResumedSubscription);
			break;
		default:
			console.log(`Unhandled stripeEvent type ${stripeEvent.type}`);
	}
});
