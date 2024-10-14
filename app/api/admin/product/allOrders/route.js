import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const customerOrders = await prisma.order.findMany({
      include: {
        Customer: true,
        OrderItems: {
          include: {
            FoodItem: true,
          },
        },
      },
    });

    const totalSales = customerOrders.reduce((accumulator, order) => {
      return accumulator + order.TotalAmount;
    }, 0);

    return NextResponse.json({
      message: "Orders fetched successfully",
      orders: customerOrders,
      totalSales,
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
