import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
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
    const { name, description } = await request.json();
    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json({ status: "Created", user: newCategory });
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
