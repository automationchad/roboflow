import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const { data: invoices } = await stripe.invoices.list({
		customer: `${event.context.params.id}`,
	});
	return { data: invoices };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
