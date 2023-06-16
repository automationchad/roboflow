import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	// Customer does not exist, create a new one
	const accountLink = await stripe.accountLinks.create({
		account: body.account_id,
		refresh_url: 'https://example.com/reauth',
		return_url: `https://app.motis.group/dashboard/org/79d9a2ed-fa5a-4776-bcc5-32ae3d5ae2e9`,
		type: 'account_onboarding',
	});

	return accountLink;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
