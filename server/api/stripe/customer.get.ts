import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const { data: customer } = await stripe.customers.search({
		query: `email:'${query.email}'`,
		limit: 1,
		expand: ['data.subscriptions'],
	});
	return customer[0];
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
