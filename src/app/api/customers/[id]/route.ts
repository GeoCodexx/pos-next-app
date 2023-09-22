import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export const GET = async (request: Request, { params }: Params) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!customer)
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    return NextResponse.json(customer);
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
    const deletedCustomer = await prisma.customer.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedCustomer)
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    return NextResponse.json(deletedCustomer);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Customer not found",
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
    const { names, patlastname, matlastname, email, phone } =
      await request.json();
    const updatedCustomer = await prisma.customer.update({
      data: { names, patlastname, matlastname, email, phone },
      where: {
        id: Number(params.id),
      },
    });
    if (!updatedCustomer)
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "customer not found",
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
