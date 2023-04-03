import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const customer = await stripe.customers.retrieve(event.context.params.id);
	return customer;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
