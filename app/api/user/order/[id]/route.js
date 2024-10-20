import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;
  console.log("Customer ID from params:", id);

  try {
    const customerOrders = await prisma.order.findMany({
      where: {
        CustomerID: id, 
      },
      include: {
        OrderItems: {
          include: {
            FoodItem: true, 
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
