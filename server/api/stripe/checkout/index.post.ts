import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const user = await serverSupabaseUser(event);
	const supabase = await serverSupabaseClient(event);
	const { data: User, error: userError } = await supabase
		.from('User')
		.select(`id,Account (id)`)
		.eq('id', user.id)
		.limit(1)
		.single();
	const tray_platform_base_stripe = 'prod_NacuwXzBInmgCK';
	const tray_platform_usage_stripe = 'prod_NabhFNPo6uszbl';

	const asap_product_base = 'prod_NhCTd8tpDUYXJ6';

	let line_items = [];
	const test = false;
	const base_url = test
		? 'http://localhost:3000'
		: `https://app.motis.group/${User.Account.id}/settings/billing`;

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
	} else if (body.type === 'asap') {
		subscription = false;
		promo = true;
		const asap_product = await stripe.products.retrieve(asap_product_base);
		line_items.push({ price: asap_product.default_price, quantity: 1 });
	}
	let details = {
		success_url: `${base_url}/home`,
		cancel_url: `${base_url}/settings`,
		allow_promotion_codes: promo,
		line_items,
		customer: body.customer,
		payment_method_types: ['card', 'us_bank_account'],
		mode: subscription ? 'subscription' : 'payment',

		metadata: {
			type: body.type,
			product: body.product.id,
			account: body.account.id,
			description: body.description ?? 'n/a',
		},
	};

	if (body.type === 'initial' || body.type === 'add_on') {
		details.subscription_data = { description: 'Tray Platform License' };
	}

	const session =
		body.type !== 'retainer'
			? await stripe.checkout.sessions.create(details)
			: await stripe.billingPortal.sessions.create({
					customer: body.customer,
					return_url: `${base_url}`,
			  });

	return { url: session.url };
});

// EDIT: Create listener to update add template_id to supabase once checkout session completed.
