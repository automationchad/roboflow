import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const account = await stripe.accounts.retrieve(event.context.params.id);
	return account;
});
