import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const resumes_at = Math.round(
		(body.days_left + Math.round(new Date().getTime())) / 1000
	);
	const subscription = await stripe.subscriptions.update(body.subscriptionId, {
		pause_collection: { behavior: 'void', resumes_at },
	});
	return subscription;
});