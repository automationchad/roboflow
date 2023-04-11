import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	let { data: invoices } = await stripe.invoices.list({
		customer: `${event.context.params.id}`,
	});
	return { data: invoices.filter((o) => o.status !== 'draft') };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
