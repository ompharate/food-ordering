import prismaClient from "@/prisma/prismaClient";

// Handle the POST request
export async function POST(req) {
  const { name, description, price, category, image, RestaurantID } =
    await req.json();
  console.log(name, description, price, category, image, RestaurantID);
  try {
    const newFoodItem = await prismaClient.foodItem.create({
      data: {
        FoodName: name,
        Price: parseFloat(price),
        Category: category,
        Description: description,
        Image: image,
        RestaurantID,
      },
    });

    return new Response(
      JSON.stringify({ message: "Product added successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating food item:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
