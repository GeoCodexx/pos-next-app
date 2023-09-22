import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
};

export const POST = async (request: Request) => {
  try {
    const {
      code,
      detail,
      stock,
      minStock,
      price,
      image,
      location,
      categoryId,
    } = await request.json();
    const newProduct = await prisma.product.create({
      data: {
        code,
        detail,
        stock: Number(stock),
        minStock: Number(minStock),
        price: Number(price),
        image,
        location,
        categoryId,
      },
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
};
