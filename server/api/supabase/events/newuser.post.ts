import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
	const supabase = serverSupabaseClient(event);
	const body = await readBody(event);
	const email_domain = body.record.username.split('@')[1];
	let { data: workspaces, error } = await supabase
		.from('workspaces')
		.select('*')
		.eq('domain', email_domain)
		.limit(1)
		.single();
	if (workspaces) {
		const { data, error } = await supabase
			.from('profiles')
			.update({ workspace_id: workspaces.id })
			.eq('id', body.record.id);
	} else {
		const customer = await stripe.customers.create({
			name: email_domain,
			email: body.record.username,
			metadata: {
				userId: body.record.id,
			},
		});
		const { data: workspaces, error } = await supabase
			.from('workspaces')
			.insert([
				{
					name: body.email_domain,
					domain: body.email_domain,
					stripe_customer_id: customer.id,
					templates: [],
					billing_email: body.record.username,
					type: 'client',
				},
			])
			.select();
		const { data, error } = await supabase
			.from('profiles')
			.update({ workspace_id: workspaces.id })
			.eq('id', body.record.id);
	}
	return {};
});
