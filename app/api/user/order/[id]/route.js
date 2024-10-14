import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;
  console.log("Customer ID from params:", id);

  try {
    const customerOrders = await prisma.order.findMany({
      where: {
        CustomerID: id, // Assuming CustomerID is a string
      },
      include: {
        OrderItems: {
          include: {
            FoodItem: true, // Assuming you have a relation defined in your Prisma schema
          },
        },
      },
    });

    console.log(customerOrders);

    return NextResponse.json({
      message: "Orders fetched successfully",
      orders: customerOrders,
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
