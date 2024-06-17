"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addItem } from "@/features/cart/cartSlice";
import { useDispatch ,useSelector } from "react-redux";
import ItemCart from "@/components/ItemCart";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import CircleLoader from "react-spinners/CircleLoader";
import axios from "axios";
const page = () => {
  const dispatch = useDispatch();
  let abortController = useRef(null);
  // const [data, setData] = useState([]);
  const [input, setinput] = useState("");
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch("https://dummyjson.com/products")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setData(json.products);
    //     setSearch(json.products);
    //   });
    axios.get("api/product").then((res) => {
      // setData(res.data.products);
      setSearch(res.data.products);
    });

    setLoading(false);
  }, []);

  const handleChange = async (value) => {
    setinput(value);
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    try {
      let res = await axios.post(
        "api/searchDatabase",
        { data: value },
        { signal: abortController.current.signal }
      );
      setSearch(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCartAddition = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    toast.success("Item Added to Cart", {
      duration: 1000,
      position: "bottom-center",
    });
  };
  if (loading || search === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircleLoader color="#F3A940" size={150} />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="w-4/5 gap-6 mx-auto flex flex-col items-center">
        <ItemCart />
        <div className="flex relative w-full justify-center">
          <input
            className="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none w-96 px-4"
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute right-7">
              Open Categories
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/shoppingarea/smartphones">Smartphones</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/shoppingarea/laptops">Laptops</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/shoppingarea/fragrances">Fragrances</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/shoppingarea/skincare">SkinCare</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/shoppingarea/groceries">Groceries</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/shoppingarea/home-decoration">
                  Home Decoration
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ul className="flex flex-wrap gap-4 justify-evenly">
          {search?.map((product) => (
            <li key={product.id}>
              <Link href={`/shoppingarea/items/${product.id}`}>
                <Card className="group h-[420px] w-[370px] overflow-hidden flex flex-col relative hover:bg-orange-100 mb-4">
                  <CardHeader>
                    <div className="h-[200px] overflow-hidden flex justify-center">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-[200px] group-hover:scale-105 transition-all"
                      />
                    </div>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="h-10 overflow-hidden">
                    <CardDescription>{product.desc}</CardDescription>
                  </CardContent>
                  <CardFooter className="absolute bottom-0 w-full flex justify-between">
                    <div>${product.price}</div>
                    <Button
                      className="hover:bg-orange-400"
                      variant="outline"
                      onClick={(e) => handleCartAddition(product, e)}
                    >
                      Add To Cart
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
