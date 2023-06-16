import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	// Customer does not exist, create a new one
	const account = await stripe.accounts.create({
		type: 'express',
	});

	return account;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
