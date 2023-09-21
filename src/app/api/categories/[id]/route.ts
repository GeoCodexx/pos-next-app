import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export const GET = async (request: Request, { params }: Params) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!category)
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    return NextResponse.json(category);
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
    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedCategory)
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Role not found",
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
    const { name, description } = await request.json();
    const updatedCategory = await prisma.category.update({
      data: {
        name,
        description,
      },
      where: {
        id: Number(params.id),
      },
    });
    if (!updatedCategory)
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Category not found",
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
