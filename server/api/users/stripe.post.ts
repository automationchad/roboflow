import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = readBody(event);
	const customer = await stripe.customers.create({
		email: body.email,
	});
	return { message: `Stripe customer created: ${customer.id}` };
});


