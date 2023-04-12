import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const subscription = await stripe.subscriptions.create({
		customer: body.customer.id,
		items: [{ price: 'price_1Mrt8dFWnSaQbLv1z8IXLj38' }],
	});
	return subscription;
});
