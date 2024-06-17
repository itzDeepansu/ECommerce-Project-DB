"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemindata } from "@/features/item/itemSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/ItemCard";
import ItemCart from "@/components/ItemCart";
import Navbar from "@/components/Navbar";

import CircleLoader from "react-spinners/CircleLoader"
export default function Home() {
  const [loading ,setLoading] = useState(true)
  const [d, setd] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => {
        setd(json.products);
        dispatch(addItemindata(json.products));
      });
      setLoading(false);
  }, []);
  const data = useSelector((state) => state.item.items);
  function generaterandomnumber() {
    return Math.floor(Math.random() * 10);
  }

  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircleLoader color="#F3A940" size={150} />
      </div>
    );
  }
  return (
    <>
      <Navbar/>
      <ItemCart/>
      <div className="flex border-t justify-center mt-8">
        <div className="w-1/4 flex justify-center items-center border-r text-l font-medium">
          <ul className="h-[70vh] flex flex-col justify-between">
            <Link href="/shoppingarea/men" className="hover:bg-orange-400 h-10 p-2 rounded-md">Men's Fashion</Link>
            <Link href="/shoppingarea/women" className="hover:bg-orange-400 h-10 p-2 rounded-md">Women's Fashion</Link>
            <Link href="/shoppingarea/medicine" className="hover:bg-orange-400 h-10 p-2 rounded-md">Medicine</Link>
            <Link href="/shoppingarea/smartphones" className="hover:bg-orange-400 h-10 p-2 rounded-md">Smartphones</Link>
            <Link href="/shoppingarea/laptops" className="hover:bg-orange-400 h-10 p-2 rounded-md">Laptops</Link>
            <Link href="/shoppingarea/fragrances" className="hover:bg-orange-400 h-10 p-2 rounded-md">Fragrances</Link>
            <Link href="/shoppingarea/skincare" className="hover:bg-orange-400 h-10 p-2 rounded-md">SkinCare</Link>
            <Link href="/shoppingarea/groceries" className="hover:bg-orange-400 h-10 p-2 rounded-md">Groceries</Link>
            <Link href="/shoppingarea/home-decoration" className="hover:bg-orange-400 h-10 p-2 rounded-md">Home Decoration</Link>
          </ul>
        </div>
        <div className="h-[80vh] flex justify-center items-center mx-auto">
          <img src="/iphone14.jpg" alt="" className="h-[70vh] hover:scale-105 transition-transform" />
        </div>
      </div>
      <div className="w-5/6 mx-auto flex flex-col mt-14 mb-10">
        <div className="text-red-600">Today's</div>
        <div className="text-5xl font-medium mb-6">Flash Sales</div>
        <div className="flex flex-nowrap overflow-x-scroll gap-2 no-scrollbar ">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-64">
              <ItemCard product={d[generaterandomnumber()]} />
            </div>
          ))}
        </div>
        <Link href="/shoppingarea" className="flex items-center mt-6">
          <Button className="bg-orange-500 text-white rounded-none h-12 mx-auto">View All Products</Button>
        </Link>
      </div>
    </>
  );
}
