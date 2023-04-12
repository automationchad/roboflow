import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const customer = await stripe.customers.update(body.customer, body.values);
	return customer;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
