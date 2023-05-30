import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";
const stripe = require('stripe')(process.env.STRIPE_SK);


const endpointSecret = "whsec_ece4c56b05b45b429143ded9d06dd33c99160100df96b125b087bcc09642ebd5";

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';

      // console.log(data);
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        })
      }
      
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

//adored-joyous-great-appeal
//account id = acct_1NChiwKCtY5hza2i
//webhook signing secret = whsec_ece4c56b05b45b429143ded9d06dd33c99160100df96b125b087bcc09642ebd5