import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	// Customer does not exist, create a new one
	const loginLink = await stripe.accounts.createLoginLink(body.account_id);

	return loginLink;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
