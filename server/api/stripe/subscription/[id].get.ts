import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	
	const subscription = await stripe.subscriptions.retrieve(
		event.context.params.id
	);

	return subscription;
	// return {
	// 	addons: [],
	// 	billing: {
	// 		billing_cycle_anchor: 1674860439,
	// 		current_period_end: 1687906839,
	// 		current_period_start: 1685228439,
	// 	},
	// 	tier: {
	// 		key: 'FREE',
	// 		name: 'Free plan',
	// 		price_id: 'price_1IUYQkJDPojXS6LNPlPj8cmd',
	// 		prod_id: 'prod_J6lyomOwmaOcdA',
	// 		supabase_prod_id: 'tier_free',
	// 		unit_amount: 0,
	// 	},
	// };
});
