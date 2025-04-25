"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const Page = () => {
  const cartItems = useSelector((state) => state.cart.cartItems).slice(1);
  const cartValue = useSelector((state) => state.cart.cartValue);
  const shippingfee = 0;
  function findfinalprice(item) {
    return Math.floor(
      item.price - (item.discountPercentage * item.price) / 100
    );
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);
  const onSubmit = (data) => {
    initiatepayment()
  };
  const initiatepayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OuHN3SBkqxgA4Ck9y5pLhb0hYeN9VRokv6E53riXwukDh3weehyZOUj6Xe09ChM6rVSeDrTKcrtCFHXnia4d1aQ00aGw6ygeQ"
    );
    // `${process.env.STRIPE_PUBLISHABLE_KEY}`
    
    const response = await fetch("http://localhost:3000/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col w-4/5 mx-auto">
        <div className="text-3xl mt-6 ml-36">Billing Details</div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-evenly"
          >
            <div className="flex flex-col justify-evenly w-1/3 h-[70vh]">
              <input
                type="text"
                placeholder="Name"
                className="h-16  focus:placeholder-black bg-orange-100 placeholder:text-black outline-none px-3 focus:placeholder:-translate-y-5 focus:placeholder:transition-all"
              />
              <input
                type="text"
                {...register("address", {
                  required: true,
                })}
                placeholder="Street Address *"
                className="h-16 focus:placeholder-black bg-orange-100 placeholder:text-black outline-none px-3 focus:placeholder:-translate-y-5 focus:placeholder:transition-all"
              />
              <input
                type="text"
                {...register("town *", { required: true })}
                placeholder="Town / City *"
                className="h-16 focus:placeholder-black bg-orange-100 placeholder:text-black outline-none px-3 focus:placeholder:-translate-y-5 focus:placeholder:transition-all"
              />
              <input
                type="text"
                placeholder="Phone Number *"
                {...register("phone", { required: true })}
                className="h-16 focus:placeholder-black bg-orange-100 placeholder:text-black outline-none px-3 focus:placeholder:-translate-y-5 focus:placeholder:transition-all"
              />
              <input
                type="text"
                placeholder="Email Address *"
                {...register("email", { required: true })}
                className="h-16 focus:placeholder-black bg-orange-100 placeholder:text-black outline-none px-3 focus:placeholder:-translate-y-5 focus:placeholder:transition-all"
              />
            </div>
            <div className="flex flex-col w-1/3 h-[70vh] gap-6">
              <div className="flex flex-col w-full max-h-[32vh]">
                {cartItems?.map((item) => (
                  <div className="flex" key={item.details.name}>
                    <span>{item.details.name}</span>
                    <span className="ml-auto">X{item.quantity}</span>
                    <span className="ml-4">{item.details.price}</span>
                  </div>
                ))}
              </div>
              <div className="gap-2 flex flex-col">
                <div className="border-b-2 pb-2 flex justify-between">
                  <span>Subtotal</span>
                  <span>{cartValue}</span>
                </div>
                <div className="border-b-2 pb-2 flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingfee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{cartValue + shippingfee}</span>
                </div>
              </div>
              <div>
                <div className="flex">
                  <input
                    {...register("Payment-Method", { required: true })}
                    type="radio"
                    value="Online"
                  />
                  <span>Bank</span>
                </div>
                <div>
                  <input
                    {...register("Payment-Method", { required: true })}
                    type="radio"
                    value="COD"
                  />
                  <span>Cash On Delivery</span>
                </div>
              </div>
              <input
                type="submit"
                value="Place Order"
                className="bg-orange-500 p-2 w-36 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
