import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const searchParams = new URL(req.url);
    const id = searchParams.searchParams.get("id");
    const customerOrders = await prisma.order.findMany({
      where:{
        RestaurantID:id,
      },
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

      { error: "Failed to fetch orders" ,  orders: [],
        totalSales:0,},
      { status: 500 }
    );
  }
}
