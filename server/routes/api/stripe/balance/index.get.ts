import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const balance = await stripe.balance.retrieve();
	return { data: balance };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
