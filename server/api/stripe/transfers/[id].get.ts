import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const transfers = await stripe.transfers.list({
		destination: event.context.params.id,
	});
	return transfers;
});
