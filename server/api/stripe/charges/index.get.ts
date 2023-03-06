import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const balanceTransactions = await stripe.balanceTransactions.list({
		limit: 100,
	});
	return { data: balanceTransactions };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
