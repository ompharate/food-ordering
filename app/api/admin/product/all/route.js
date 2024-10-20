import prismaClient from "@/prisma/prismaClient";

export async function GET(req) {

    const searchParams = new URL(req.url);
    const id = searchParams.searchParams.get("id");
    

    if (!id) {
      const foodItems = await prismaClient.foodItem.findMany();
      if (!foodItems.length) {
        return new Response(
          JSON.stringify({ message: "No food items found", foodItems: [] }),
        
        );
      }
  
      return new Response(JSON.stringify({ foodItems }));
    }

    const foodItems = await prismaClient.foodItem.findMany({
      where: {
        RestaurantID: id,
      },
    });

    if (!foodItems.length) {
      return new Response(
        JSON.stringify({ message: "No food items found", foodItems: [] }),
      
      );
    }

    return new Response(JSON.stringify({ foodItems }));
 
}