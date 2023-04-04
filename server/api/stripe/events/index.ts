import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_KEY);
import bodyParser from 'body-parser';

async function stripeWebhookHandler(req: Request, res: Response) {
	// Use the body-parser middleware to parse the request body as JSON
	bodyParser.json()(req, res, async () => {
		// Retrieve the Stripe signature and timestamp from the request headers
		const signature = req.headers['stripe-signature'];
		const timestamp = req.headers['stripe-timestamp'];

		try {
			// Verify the Stripe signature using your webhook signing secret
			const event = stripe.webhooks.constructEvent(
				req.body,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET,
				timestamp
			);

			// Handle the Stripe event
			switch (event.type) {
				case 'payment_intent.succeeded':
					console.log('Payment succeeded:', event.data.object);
					// Handle payment success
					break;
				case 'payment_intent.payment_failed':
					console.log('Payment failed:', event.data.object);
					// Handle payment failure
					break;
				// Add additional event types as needed
				default:
					console.log('Unhandled event type:', event.type);
			}

			// Return a 200 response to acknowledge receipt of the event
			res.status(200).end();
		} catch (error) {
			console.error('Error handling Stripe event:', error);

			// Return a 400 response to indicate a problem with the event
			res.status(400).send(`Webhook Error: ${error.message}`);
		}
	});
}

export default stripeWebhookHandler;
