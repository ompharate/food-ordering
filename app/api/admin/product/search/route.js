import { NextResponse } from "next/server";
import prismaClient from "@/prisma/prismaClient";

export async function GET(req) {

    const { searchParams } = new URL(req.url);
   
    const searchParamsValue = searchParams.get("key");
   
    if (!searchParamsValue) {
      return NextResponse.json(
        { message: "Search parameter is missing" },
        { status: 400 }
      );
    }

    const foodItems = await prismaClient.foodItem.findMany({
      where: {
        OR: [
          { FoodName: { contains: searchParamsValue, mode: 'insensitive' } },
          { Description: { contains: searchParamsValue, mode: 'insensitive' } },
          {Category:{ contains: searchParamsValue, mode: 'insensitive' }}
        ],
      },
    });

    return NextResponse.json(foodItems);  
 
}
