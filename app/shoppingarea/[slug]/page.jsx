"use client"
import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import ItemCart from "@/components/ItemCart";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import axios from "@/app/libs/axios";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [input, setinput] = useState("");
  const [search, setSearch] = useState([]);
  useEffect(() => {
    async function getdata() {
      let b= await axios.post('/categorySearch',{"category":params.slug});
      // setData(b.data);
      setSearch(b.data);
    }
    getdata();
  }, []);
  // useEffect(() => {
  //   setSearch(data.filter((item) => item.category === params.slug));
  // }, [data]);

  const handleChange = async(value) => {
    setinput(value);
    // setSearch(
    //   data.filter((item) =>
    //     item.title.toLowerCase().includes(value.toLowerCase())
    //   )
    // );
    let ans = await axios.post('/categorySearch',{"category":params.slug , "data":value});
    setSearch(ans.data);
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
  // const handleCategoryChange = (val) => {
  //   setSearch(data.filter((item) => item.category === val));
  // };

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

        {search.length === 0 && (
          <div className="text-center text-2xl">No Products Found</div>
        )}

        <ul className="flex flex-wrap gap-4 justify-evenly">
          {search.map((product) => (
            <li key={product.id}>
              <Link href={`/shoppingarea/items/${product.id}`}>
                <Card className="group h-[420px] w-[370px] overflow-hidden flex flex-col relative hover:bg-orange-100 mb-4">
                  <CardHeader>
                    <img src={product.images} alt="" className="h-[200px] group-hover:scale-105 transition-all" />
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="h-10 overflow-hidden">
                    <CardDescription>{product.desc}</CardDescription>
                  </CardContent>
                  <CardFooter className="absolute bottom-0">
                    <div>${product.price}</div>
                    <Button
                      className="ml-40 hover:bg-orange-400"
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

export default Page;
