import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { ids, totalPrice, customerId } = req.body;

    if (!customerId || !foodItemIds || !totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        CustomerID: customerId,
        TotalAmount: totalPrice,
        OrderItems: {
          create: foodItemIds.map((foodItemId) => ({
            FoodItemID: foodItemId,
          })),
        },
      },
      include: {
        OrderItems: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
