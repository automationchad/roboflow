// EDIT: Create listener to update add template_id to supabase once checkout session completed.
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const paymentMethods = await stripe.customers.listPaymentMethods(
		event.context.params.id
	);

	return paymentMethods.data;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
