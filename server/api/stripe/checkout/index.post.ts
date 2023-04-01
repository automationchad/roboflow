import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const tray_platform_base_stripe = 'prod_NacuwXzBInmgCK';
	const tray_platform_usage_stripe = 'prod_NabhFNPo6uszbl';

	let line_items = [];
	const test = false;
	const base_url = test
		? 'http://localhost:3000'
		: 'https://app.motis.group/settings';

	let subscription = false;
	let promo = false;

	if (body.type === 'retainer' || body.type === 'waitlist') {
		// const session = await stripe.billingPortal.sessions.create({
		// 	customer: 'cus_NbOAJLeFal9iV5',
		// 	return_url: 'https://example.com/account',
		// });
		// subscription = body.type === 'retainer';
		// promo = body.type === 'retainer';
		// const { data: product } = await stripe.products.search({
		// 	limit: 1,
		// 	query: `metadata[\'id\']:\'${body.product.id}\'`,
		// });
		// line_items.push({
		// 	price: product[0].default_price,
		// 	quantity: 1,
		// });
	} else if (body.type === 'initial' || body.type === 'add_on') {
		subscription = true;
		promo = true;
		const base_plan = await stripe.products.retrieve(tray_platform_base_stripe);
		const subscription_product = await stripe.products.retrieve(
			tray_platform_usage_stripe
		);
		line_items.push(
			{ price: base_plan.default_price, quantity: 1 },
			{
				price: subscription_product.default_price,
			}
		);
	}
	let details = {
		success_url: `${base_url}/home`,
		cancel_url: `${base_url}/home`,
		allow_promotion_codes: promo,
		line_items,
		customer: body.customer,
		payment_method_types: ['card', 'us_bank_account'],
		mode: subscription ? 'subscription' : 'payment',
		subscription_data: { description: 'Tray Platform License' },
		metadata: {
			type: body.type,
			product: body.product.id,
			account: body.account.id,
		},
	};

	const session =
		body.type === 'add_on'
			? await stripe.checkout.sessions.create(details)
			: await stripe.billingPortal.sessions.create({
					customer: body.customer,
					
					return_url: `${base_url}`,
			  });

	return { url: session.url };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
