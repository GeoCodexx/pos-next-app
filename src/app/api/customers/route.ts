import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const customers = await prisma.customer.findMany();
    return NextResponse.json(customers);
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
    const { names, patlastname, matlastname, email, phone } =
      await request.json();
    const newCustomer = await prisma.customer.create({
      data: { names, patlastname, matlastname, email, phone },
    });
    return NextResponse.json(newCustomer);
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
