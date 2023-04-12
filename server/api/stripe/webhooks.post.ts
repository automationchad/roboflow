import Stripe from 'stripe';
import { serverSupabaseClient } from '#supabase/server';

const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const stripeEvent = await readBody(event);
	const supabase = serverSupabaseClient(event);
	let subscription = undefined;

	switch (stripeEvent.type) {
		case 'customer.subscription.created':
			subscription = stripeEvent.data.object;
			// const { data, error } = await supabase.from('Subscription').insert({
			// 	startDate: new Date(subscription.start_date * 1000),
			// 	endDate:
			// 		subscription.ended_at === null
			// 			? null
			// 			: new Date(subscription.ended_at * 1000),
			// 	deleted: subscription.ended_at !== null,
			// 	stripeSubscriptionId: subscription.id,
			// 	deletedAt: subscription.ended_at,
			// 	plan: subscription.plan,
			// 	cancelledAt: subscription.cancel_at,
			// 	cancelledOn: subscription.canceled_at,
			// });
			// Then define and call a function to handle the stripeEvent customer.subscription.created
			break;
		case 'customer.subscription.deleted':
			subscription = stripeEvent.data.object;
			// Then define and call a function to handle the stripeEvent customer.subscription.deleted
			break;
		case 'customer.subscription.paused':
			subscription = stripeEvent.data.object;
			// Update the days left in the subscription column in Supabase
			const daysLeft =
				subscription.current_period_end - Math.floor(Date.now() / 1000);
			const { data: Subscription, error: subscriptionError } = await supabase
				.from('Subscription')
				.update({ days_left: daysLeft })
				.eq('stripeSubscriptionId', subscription.id);

			if (subscriptionError) throw subscriptionError;
			break;
		case 'customer.subscription.resumed':
			subscription = stripeEvent.data.object;
			// Then define and call a function to handle the stripeEvent customer.subscription.resumed
			break;
		case 'customer.subscription.updated':
			subscription = stripeEvent.data.object;

			if (subscription.pause_collection === null) {
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
						amount: subscription.plan.amount,
						cancelledAt: subscription.cancel_at,
						cancelledOn: subscription.canceled_at,
					})
					.eq('stripeSubscriptionId', subscription.id);
			} else if (subscription.pause_collection.resumes_at === null) {
				const daysLeft =
					subscription.current_period_end * 1000 - Math.floor(Date.now());
				const { data: Subscription, error: subscriptionError } = await supabase
					.from('Subscription')
					.update({
						days_left: daysLeft,
						pausedOn: new Date(),
						status: 'paused',
						type:
							subscription.plan.nickname === 'hosting' ? 'hosting' : 'retainer',
						tier:
							subscription.plan.nickname === 'hosting'
								? null
								: subscription.plan.nickname,
					})
					.eq('stripeSubscriptionId', subscription.id);

				if (subscriptionError) throw subscriptionError;
			} else {
				const { data: Subscription, error: subscriptionError } = await supabase
					.from('Subscription')
					.update({
						resumesAt: new Date(
							subscription.pause_collection.resumes_at * 1000
						),
						status: 'active',
						type:
							subscription.plan.nickname === 'hosting' ? 'hosting' : 'retainer',
						tier:
							subscription.plan.nickname === 'hosting'
								? null
								: subscription.plan.nickname,
					})
					.eq('stripeSubscriptionId', subscription.id);

				if (subscriptionError) throw subscriptionError;
			}

			// Then define and call a function to handle the stripeEvent customer.subscription.updated
			break;
		// ... handle other stripeEvent types
		default:
			console.log(`Unhandled stripeEvent type ${stripeEvent.type}`);
	}
	return `handled ${stripeEvent.type}`;
});
