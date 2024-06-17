import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export async function POST(req) {
  const product = await req.json();
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: product.title,
        desc: product.description,
        category: product.category,
        price: product.price,
        images: product.images,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
  return NextResponse.json({ status: 200 });
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
