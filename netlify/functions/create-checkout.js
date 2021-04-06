const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const inventory = require('./data/market.json');

exports.handler = async (event) => {
  const { sku, quantity } = JSON.parse(event.body);
  const product = inventory.find((p) => p.code === sku);
  const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    line_items: [
      {
        price_data:{
          currency:product.devise,
          product_data:{
            name:product.name,
          },
          unit_amount:product.prix*100,
        },
        quantity: validatedQuantity,
      },
    ],
    mode:'payment',
    success_url: `https://www.quick-exams.ca/fr/success.html`,
    cancel_url: process.env.URL,
  });
console.log(process.env.URL)
  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
