import prismaClient from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export async function DELETE(req, { params }) {
  try {
    console.log(params);
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: "FoodItemId is required" }), {
        status: 400,
      });
    }

    const deletedFoodItem = await prismaClient.foodItem.delete({
      where: {
        FoodItemID: id,
      },
    });
  
    return new Response(
      JSON.stringify({ message: "Food item deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting food item:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
