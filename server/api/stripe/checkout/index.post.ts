import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const tray_platform_base_stripe = 'prod_NacuwXzBInmgCK';
	const tray_platform_usage_stripe = 'prod_NabhFNPo6uszbl';

	let line_items = [];

	let subscription = false;
	let promo = false;

	if (body.type === 'retainer' || body.type === 'waitlist') {
		subscription = body.type === 'retainer';
		promo = body.type === 'retainer';
		const { data: product } = await stripe.products.search({
			limit: 1,
			query: `metadata[\'id\']:\'${body.product.id}\'`,
		});

		line_items.push({
			price: product[0].default_price,
			quantity: 1,
		});
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
		success_url: 'https://motis.group',
		cancel_url: 'https://motis.group/#pricing',
		allow_promotion_codes: promo,
		line_items,
		payment_method_types: ['card', 'us_bank_account'],
		mode: subscription ? 'subscription' : 'payment',
		metadata: { type: body.type, product: body.product.id },
	};
	const session = await stripe.checkout.sessions.create(details);
	return { url: session.url };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
