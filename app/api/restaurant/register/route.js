import prismaClient from "@/prisma/prismaClient";

export async function POST(req, res) {
  const data = await req.json();
  const { email, password, name, location, phone } = data;

  const restaurant = await prismaClient.restaurant.create({
    data: {
      Email: email,
      Password: password,
      Name: name,
      Location: location,
      Phone: phone,
    },
  });

  return new Response(JSON.stringify(restaurant), {
    status: 201,
  });
}
