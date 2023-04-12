import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_KEY);

export default defineEventHandler(async (event) => {
  const query = await useQuery(event);
  const session = await stripe.checkout.sessions.retrieve(query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);
  return `<html><body><h1>Thanks for your order, ${customer}!</h1></body></html>`;
});
