import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const customer = await stripe.customers.retrieve(body.customer, {
		expand: ['subscriptions'],
	});
	let line_items = [];

	let subscription = false;
	let promo = false;

	if (body.type === 'retainer') {
		subscription = true;
		promo = true;
		const retainer_product = await stripe.products.retrieve(
			'prod_NPb5k2rPILZoN0'
		);
		line_items.push({
			price: retainer_product.default_price,
			quantity: 1,
		});
	} else {
		line_items.push({
			price_data: {
				unit_amount: body.product.setup_fee,
				currency: 'USD',
				product_data: {
					name: body.product.name,
					description: body.product.summary,
				},
			},
			quantity: 1,
		});
		if (customer.subscriptions.data.length === 0) {
			const subscription_product = await stripe.products.retrieve(
				'prod_NJiugyPSv8bwEj'
			);
			subscription = true;
			line_items.push({
				price: subscription_product.default_price,
				quantity: 1,
			});
		}
	}

	let details = {
		phone_number_collection: {
			enabled: true,
		},
		success_url: 'http://localhost:3000/contact/success',
		cancel_url: 'http://localhost:3000/',
		allow_promotion_codes: promo ? true : null,
		line_items,
		customer: body.customer ?? null,
		payment_method_types: ['card', 'us_bank_account'],
		mode: subscription ? 'subscription' : 'payment',
		metadata: {
			project_id: body.project_id,
			workspace_id: `${body.workspace_id}`,
		},
	};
	const session = await stripe.checkout.sessions.create(details);
	return { url: session.url };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
