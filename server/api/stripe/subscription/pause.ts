import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const subscription = await stripe.subscriptions.update(body.subscriptionId, {
		pause_collection: { behavior: 'void' },
	});
	return subscription;
});

