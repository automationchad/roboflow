import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	let customer = stripe.customers.list({ email: body.email, limit: 1 });
	if (customer?.data) {
		customer = customer.data[0];
		// Customer already exists, do nothing
		console.log('Customer already exists:', customer.data[0]);
	} else {
		// Customer does not exist, create a new one
		customer = await stripe.customers.create({
			email: body.email,
			name: body.company_name,
		});
	}
	return customer;
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
