import prismaClient from "@/prisma/prismaClient";

export async function GET(req) {
  try {
    const foodItems = await prismaClient.foodItem.findMany();

    if (!foodItems.length) {
      return new Response(
        JSON.stringify({ message: "No food items found", foodItems: [] }),
        {
          status: 200,
        }
      );
    }
 
 
    return new Response(JSON.stringify({ foodItems }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching food items:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
