"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { addItem } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import ItemCart from "@/components/ItemCart";

import { toast } from "sonner";
import CircleLoader from "react-spinners/CircleLoader";
import axios from "@/app/libs/axios";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch(`https://dummyjson.com/products/${params.slug}`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setData(json);
    //     setImages(json.images);
    //     setLoading(false);
    //   });
    async function getdata() {
      let ans = await axios.post("/idSearch", { id: params.slug });
      setData(ans.data);
      setImages(ans.data.images);
      setLoading(false);
      console.log(ans.data);
    }
    getdata();
  }, [params.slug]);

  const handleCartAddition = () => {
    dispatch(addItem(data));
    toast.success("Item Added to Cart", {
      duration: 1000,
      position: "bottom-center",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircleLoader color="#F3A940" size={150} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-4/5 min-h-[89vh] m-auto flex gap-32">
        <div className="h-[89vh] w-4/12">
          <Carousel className="h-[89vh] flex items-center">
            <CarouselContent>
              {images?.map((imagelink) => (
                <CarouselItem key={imagelink}>
                  <img
                    src={imagelink}
                    alt="item picture"
                    className="max-h-[89vh]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="flex flex-col pt-20 w-8/12 gap-2">
          <div className="text-4xl">{data?.name}</div>
          <div className="text-xl border-b">{data?.desc}</div>
          <div className="text-xl">
            <span className="text-2xl">${data.price}</span>
          </div>
          {/* <div className="text-xl">Brand: {data?.brand}</div> */}
          <div className="text-xl">Category: {data?.category}</div>
          <Button
            className="mt-24 h-12 w-28 hover:bg-orange-400"
            variant="outline"
            onClick={handleCartAddition}
          >
            Add To Cart
          </Button>
        </div>
        <ItemCart />
      </div>
    </>
  );
};

export default Page;
