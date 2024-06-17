import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export async function POST(req) {
  const body = await req.json();
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: body.data,
        mode: "insensitive", // This makes the search case-insensitive
      },
    },
  });
  return NextResponse.json(products);
}
