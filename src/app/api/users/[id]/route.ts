import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export const GET = async (request: Request, { params }: Params) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(user);
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
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json({ status: "Deleted", user: deletedUser });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "User not found",
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
    const { names, patlastname, matlastname, email, password, roleId } =
      await request.json();
    const updatedUser = await prisma.user.update({
      data: {
        names,
        patlastname,
        matlastname,
        email,
        password,
        roleId,
      },
      where: {
        id: Number(params.id),
      },
    });
    if (!updatedUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(updatedUser);
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
