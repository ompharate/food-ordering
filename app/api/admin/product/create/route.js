import prismaClient from "@/prisma/prismaClient";

export async function POST(req) {
  try {
    const {formData} = await req.json();
    console.log(formData);
    const { name, description, price, category } = formData;

    console.log(name, description, price, category);

    const newFoodItem = await prismaClient.foodItem.create({
      data: {
        FoodName: name,
        Price: parseFloat(price),
        Category: category,
        Description: description,
        Image:
          "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?resize=768,574",
      },
    });

    if (!newFoodItem) {
      return new Response(
        JSON.stringify({ error: "Failed to create food item" }),
        {
          status: 400,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Product added successfully" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating food item:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
