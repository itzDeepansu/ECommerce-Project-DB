"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IcTwotonePlus from "@/components/ui/plus";
import IcTwotoneMinus from "@/components/ui/minus";
import { addItem, removeItem, dropItem } from "@/features/cart/cartSlice";
import { toast } from "sonner";
// import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
const Page = () => {  
  const cartItems = useSelector((state) => state.cart.cartItems).slice(1);
  const cartValue = useSelector((state) => state.cart.cartValue);
  const shippingfee = 0;
  const dispatch = useDispatch();
  
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast("Item added successfully", {
      duration: 1000,
      position: "bottom-center",
      style: {
        backgroundColor: "red",
      },
    });
  };
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.error("Item Removed SuccessFully", {
      duration: 1000,
      position: "bottom-center",
      style: {
        backgroundColor: "red",
      },
    });
  };
  const handledropItem = (id) => {
    dispatch(dropItem(id));
    toast.error("Item Dropped Successfully", {
      duration: 1000,
      position: "bottom-center",
      style: {
        backgroundColor: "red",
      },
    });
  };
  // const initiatepayment = async () => {
  //   const stripe = await loadStripe(
  //     "pk_test_51OuHN3SBkqxgA4Ck9y5pLhb0hYeN9VRokv6E53riXwukDh3weehyZOUj6Xe09ChM6rVSeDrTKcrtCFHXnia4d1aQ00aGw6ygeQ"
  //   );
  //   // `${process.env.STRIPE_PUBLISHABLE_KEY}`
  //   const response = await fetch("api/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(cartItems),
  //   });
  //   const session = await response.json();
  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });
  //   if (result.error) {
  //     console.log(result.error.message);
  //   }
  // };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-4/5 mx-auto">
        <div className="my-5">Home / Cart</div>
        <ul className="grid grid-cols-4 gap-60 mb-5">
          <li>Product</li>
          <li>Price</li>
          <li>Quantity</li>
          <li>SubTotal</li>
        </ul>
        <div className="flex flex-col gap-5 h-[300px] overflow-y-scroll">
          {cartItems?.map((item) => (
            <Card className="grid grid-cols-4 gap-60 rounded-none" key="1">
              <div className="flex items-center">
                <img src={item.details.images[0]} alt="" className="h-20" />
                {item.details.name}
              </div>
              <div className="flex items-center">{item.details.price}</div>
              <div className="text-green-500 flex gap-4 items-center">
                <IcTwotoneMinus onClick={() => handleRemoveItem(item.id)} />
                <span>{item.quantity}</span>
                <IcTwotonePlus
                  onClick={(e) => handleCartAddition(item.details, e)}
                />
              </div>
              <div className="flex items-center">
                {item.details.price}
              </div>
            </Card>
          ))}
        </div>
        <div className="border-2 p-4 border-black w-96 ml-auto flex flex-col mt-2 gap-1">
          <div className="font-medium text-lg">Cart Total</div>
          <div className="border-b flex">
            Subtotal:<div className="ml-auto">{cartValue}</div>
          </div>
          <div className="border-b flex">
            Shipping:<div className="ml-auto">{shippingfee}</div>
          </div>
          <div className="flex">
            Total :<div className="ml-auto">{cartValue + shippingfee}</div>
          </div>
          {cartValue !== 0 && (
          <Link href="/cart/checkout" className="hover:bg-orange-400 p-2 rounded bg-black text-white">Proceed to Checkout</Link>
          )}
        {/* <Button onClick={initiatepayment}>Proceed to Checkout</Button> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
