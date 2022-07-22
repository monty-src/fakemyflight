const { STRIPE_API_KEY } = process.env;

const stripe = require('stripe')(STRIPE_API_KEY);

import { adultPrice, childPrice } from '../../utils/products';
import { validatePurchase } from '../../utils/schema';

export default async function (req, res) {
  const { value: requestBody, error: requestSchemaError } = validatePurchase(
    req.body
  );

  console.log('request body: ', requestBody);
  console.log('request schema error: ', requestSchemaError);

  // const line_items = [];

  // if (req.body.adults.length > 0) {
  //   line_items.push(adultPrice(req.body.adults.length));
  // }

  // if (req.body.children.length > 0) {
  //   line_items.push(childPrice(req.body.children.length));
  // }

  // const session = await stripe.checkout.sessions.create({
  //   line_items,
  //   mode: 'payment',
  //   success_url: `http://localhost:3000/?success=true`,
  //   cancel_url: `http://localhost:3000/?canceled=true`
  // });
  res.status(200).json({});

  // res.json({url: session.url})
}
