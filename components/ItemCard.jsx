import React from "react";
import {
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { addItem } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ItemCard = ({ product }) => {
  const dispatch = useDispatch()
  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast.success("Item Added to Cart", {
      duration: 1000,
      position: "bottom-center",
    });
  };
  return (
    <Link href={`/shoppingarea/items/${product?.id}`}>
      <Card className="h-64 w-60 flex flex-col gap-1">
        <div className="group h-2/3 flex justify-center overflow-hidden relative">
          <img
            src={product?.images}
            alt=""
            className="h-full rounded-t-xl group-hover:scale-105 transition-all duration-200 group-hover:opacity-70"
          />
          <Button className="absolute rounded-none w-full h-10 text-lg -bottom-10 group-hover:bottom-0 transition-all" onClick={(e) => handleCartAddition(product, e)}>
            Add to Cart
          </Button>
        </div>
        <div className="text-base font-medium px-2">{product?.name}</div>
        <div className="px-2 text-red-600 flex gap-3">
          ${product?.price}
        </div>
      </Card>
    </Link>
  );
};

export default ItemCard;
