import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () =>  {
  try {
    const roles = await prisma.role.findMany();
    return NextResponse.json(roles);
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
}

export const POST = async (request: Request) => {
  try {
    const { name, description } = await request.json();
    const newRole = await prisma.role.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(newRole);
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
