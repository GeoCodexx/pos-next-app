import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export const GET = async (request: Request, { params }: Params) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!role)
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    return NextResponse.json(role);
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
    const deletedRole = await prisma.role.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedRole)
      return NextResponse.json({ message: "role not found" }, { status: 404 });
    return NextResponse.json(deletedRole);
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
    const updatedRole = await prisma.role.update({
      data: {
        name,
        description,
      },
      where: {
        id: Number(params.id),
      },
    });
    if (!updatedRole)
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    return NextResponse.json(updatedRole);
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
