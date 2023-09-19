import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
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
    const { names, patlastname, matlastname, email, password, roleId } =
      await request.json();
    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        names,
        patlastname,
        matlastname,
        email,
        password,
        roleId,
      },
    });
    return NextResponse.json({ status: "Created", user: newUser });
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
