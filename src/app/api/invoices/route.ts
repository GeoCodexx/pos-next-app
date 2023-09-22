import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const invoices = await prisma.invoice.findMany();
    return NextResponse.json(invoices);
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
    const { serie, numserie, date, total, userId, customerId, products } =
      await request.json();

    const newInvoice = await prisma.invoice.create({
      data: {
        serie,
        numserie,
        date: new Date(date),
        total,
        userId,
        customerId,
      },
    });

    const productList = products.map((elem: any) => {
      const formattedData = {
        qty: elem.qty,
        invoiceId: newInvoice.id,
        productId: elem.id,
      };
      return formattedData;
    });

    const insertedProducts = [];

    for (const product of productList) {
      const insertedProduct = await prisma.invoiceProduct.create({
        data: product,
      });
      insertedProducts.push(insertedProduct);
    }

    return NextResponse.json({ ...newInvoice, prodList: insertedProducts });
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
