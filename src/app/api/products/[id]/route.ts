import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export const GET = async (request: Request, { params }: Params) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!product)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    return NextResponse.json(product);
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

export const DELETE = async (request: Request, { params }: Params) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedProduct)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Product not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
};

export const PATCH = async (request: Request, { params }: Params) => {
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
    const updatedProduct = await prisma.product.update({
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
      where: {
        id: Number(params.id),
      },
    });
    if (!updatedProduct)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Product not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
};
