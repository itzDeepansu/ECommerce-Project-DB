# Adding payment gateway using stripe
- there are two libraries needed for this stripe and stripe/stripe-js
role of these two libraries is that 
stripe - is used to create a payment session from the cartitems in the backend 
stripe-js - is used tpo load that session in the frotned using session id
 - steps :
 - 1- Load the stripe into a variable using the publishable key (pass this key directly , dont store as env)
 - 2- Make a post request to the backend to generate and get a session id (send the cart Items in it)
 - 3- Store the session id that came into a variable
 - 4- Use stripe.redirectToCheckout function to redirect the user to the payment page
    This function takes an object as parameter this object has a value { sessionId  : your session id}

On the Backend Side :
Make a session by passing all the parameters needed
```import { NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
export async function POST(request) {
  let product = await request.json();
  const lineItems = product.map((item)=>({
    price_data: {
      currency: "inr",
      unit_amount: item.details.price * 100,
      product_data: {
        name: item.details.title,
        images: [item.details.thumnail],
      },
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `https://localhost:3000/shoppingarea`,
    cancel_url: `https://localhost:3000/cart`,
  });
  return NextResponse.json({ id: session.id });
}
```
