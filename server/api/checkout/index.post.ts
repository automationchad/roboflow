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
		const { data: prices } = await stripe.prices.list({
			active: true,
			product: 'prod_NSMrTLxCzg2BSa',
		});
		const price = prices.find((o) => o.nickname === body.billing_period).id;
		line_items.push({
			price,
			quantity: 1,
		});
	} else if (body.type === 'initial' || body.type === 'add_on') {
		subscription = true;
		promo = true;
		const base_plan = await stripe.products.retrieve('prod_NSYJ4bOlfIJa6M');
		const subscription_product = await stripe.products.retrieve(
			'prod_NSMvHhDDIRWENr'
		);
		line_items.push(
			{ price: base_plan.default_price, quantity: 1 },
			{
				price: subscription_product.default_price,
			}
		);
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
				'prod_NSMvHhDDIRWENr'
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
		success_url: 'https://motis.group/contact/success',
		cancel_url: 'https://motis.group',
		allow_promotion_codes: promo ? true : null,
		line_items,
		customer: body.customer ?? null,
		payment_method_types: ['card', 'us_bank_account'],
		mode: subscription ? 'subscription' : 'payment',
		metadata: body.metadata,
	};
	const session = await stripe.checkout.sessions.create(details);
	return { url: session.url };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
