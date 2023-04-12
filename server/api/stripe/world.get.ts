import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(() => {
	return { hello: 'world' };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
