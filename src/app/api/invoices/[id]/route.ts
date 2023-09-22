import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface Params {
    params: {id: string}
}

export const GET = async (request: Request, { params }: Params) => {
    try {
      const invoiceWithProducts = await prisma.invoice.findUnique({
        where: {
          id: Number(params.id),
        },
        include: {
            invoiceProducts: {
              include: {
                product: true,
              },
            },
          },
      });
      if (!invoiceWithProducts)
        return NextResponse.json(
          { message: "Invoice not found" },
          { status: 404 }
        );
      return NextResponse.json(invoiceWithProducts);
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