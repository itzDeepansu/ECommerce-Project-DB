"use client";
import React from "react";
import Link from "next/link";
import { Menubar, MenubarMenu } from "@/components/ui/menubar";
import { Button } from "./ui/button";
import Offerbar from "./Offerbar";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Offerbar />
      <Menubar className="flex justify-center items-center h-12 relative">
        <div className="hover:bg-slate-500 absolute left-0">Logo</div>
        <MenubarMenu>
          <Menubar className="flex justify-around w-96 rounded-none h-12 ">
            <Link href="/" className="hover:bg-orange-400 p-2 rounded-md">
              Home
            </Link>
            <Link
              href="/shoppingarea"
              className="hover:bg-orange-400 p-2 rounded "
            >
              Shopping Area
            </Link>
            <Link href="/about" className="hover:bg-orange-400 p-2 rounded ">
              About
            </Link>
            <Link href="/cart" className="hover:bg-orange-400 p-2 rounded ">
              Cart
            </Link>
          </Menubar>
        </MenubarMenu>
        <div className="flex gap-10 absolute right-2 items-center">
          <Button variant="outline" className="h-10 hover:bg-orange-400">
            <Link href="https://github.com/itzDeepansu/ECommerce-Project">
              Github Repo
            </Link>
          </Button>
          <div className="flex gap-2 h-full">
            {session?.user.name}
            <Button onClick={() => signOut()} className="h-7 hover:bg-orange-400">
              Logout
            </Button>
          </div>
        </div>
      </Menubar>
    </div>
  );
};

export default Navbar;
