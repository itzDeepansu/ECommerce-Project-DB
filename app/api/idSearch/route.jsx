import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req) {
  const body = await req.json();
  const product = await prisma.product.findUnique({
    where:{
        id:body.id
    }
  })
  return NextResponse.json(product);
}
