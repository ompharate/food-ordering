import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    const { ids, totalPrice, customerId } = body;

    if (!Array.isArray(ids) || ids.length === 0 || !customerId || !totalPrice) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    if (!customerId || !ids || !totalPrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { CustomerID: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const order = await prisma.order.create({
      data: {
        TotalAmount: totalPrice,
        CustomerID: customerId,
        OrderItems: {
          create: ids.map((foodItemId) => ({
            FoodItemID: foodItemId,
          })),
        },
      },
      include: {
        OrderItems: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}