import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	let subscription = false;
	let customer = {};
	let line_items = [
		{
			price_data: {
				unit_amount: body.product.setup_fee,
				currency: 'USD',
				product_data: {
					name: body.product.name,
					description: body.product.summary,
				},
			},
			quantity: 1,
		},
	];

	const subscription_product = await stripe.products.retrieve(
		'prod_NJiugyPSv8bwEj'
	);
	if (body.customer) {
		customer = await stripe.customers.retrieve(body.customer, {
			expand: ['subscriptions'],
		});
	}
	if (customer.subscriptions.data.length === 0) {
		subscription = true;
		line_items.push({
			price: subscription_product.default_price,
			quantity: 1,
		});
	}

	let details = {
		phone_number_collection: {
			enabled: true,
		},
		success_url: 'http://localhost:3000/contact/success',
		cancel_url: 'http://localhost:3000/',
		line_items,
		mode: subscription ? 'subscription' : 'payment',
		metadata: {
			project_id: body.project_id,
			workspace_id: `${body.workspace_id}`,
		},
	};
	if (body.customer) {
		details['customer'] = body.customer;
	}

	const session = await stripe.checkout.sessions.create(details);
	return { url: session.url };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
