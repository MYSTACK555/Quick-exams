const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/market.json');

exports.handler = async (event) => {
  const { sku, quantity,callbackURLLanguge } = JSON.parse(event.body);
  const product = inventory.find((p) => p.code === sku);
  const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    success_url: `${process.env.URL}/${callbackURLLanguge}/success.html`,
    cancel_url: process.env.URL,
    line_items: [
      {
        name: product.name,
        amount:product.prix*100,
        description: product.description,
        currency: product.devise,
        quantity: validatedQuantity,
      },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};