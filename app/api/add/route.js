import { NextResponse } from "next/server";
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
    success_url: 'https://localhost:3000/cancel',
    cancel_url: 'https://localhost:3000',
  });
  return NextResponse.json({ id: session.id });
}

