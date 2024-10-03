import prismaClient from "@/prisma/prismaClient";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  const data = await req.json();
    console.log(data)
  const existingUser = await prismaClient.customer.findUnique({
    where: { Email: data.email },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(data.password, 4);

  const user = await prismaClient.customer.create({
    data: {
      Name: data.name,
      Email: data.email,
      Address: data.address,
      Phone: data.phone,
      Password: hashedPassword,
    },
  });

  return new Response(JSON.stringify(user), {
    status: 201,
  });
}
