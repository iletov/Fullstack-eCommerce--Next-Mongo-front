import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Settings } from "@/models/Settings";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('Should be a POST request');
    return;
  } 
  const {
    name, email, city, 
    postalCode, streetAddress, country, 
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({_id:uniqueIds});

  //prepare for Stripe
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(singleItem => singleItem._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {    
      line_items.push({
        quantity, 
        price_data: {
          currency: 'USD',
          product_data: {name:productInfo.title},
          unit_amount: productInfo.price * 100, 
        },
      });
    }
  }

  const session = await getServerSession(req, res, authOptions);


  // res.json({line_items});
  const orderDoc = await Order.create({
    line_items, name, email, city, postalCode, streetAddress, country, paid:false,
    userEmail:session?.user.email,
  });

  const shippingFeeSettings = await Settings.findOne({name: 'shippingFee'});
  const shippingFeeCents = parseInt(shippingFeeSettings.value || '0') * 100;

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url:process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url:process.env.PUBLIC_URL + '/cart?canceled=1',
    // success_url: `${req.headers.origin}/success`,
    // cancel_url: `${req.headers.origin}/canceled`,
    metadata: {orderId:orderDoc._id.toString()},
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Shipping fee',
          type: 'fixed_amount',
          fixed_amount: {amount: shippingFeeCents, currency: 'USD'},
        }
      }
    ]
  })

  res.json({
    url:stripeSession.url,
  })

}