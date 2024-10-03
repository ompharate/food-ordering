import prismaClient from "@/prisma/prismaClient";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  const data = await req.json();
  console.log(data)
  const existingUser = await prismaClient.customer.findUnique({
    where: { Email: data.email },
  });

  if (!existingUser) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    existingUser.Password
  );

  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({ message: "Login successful", user: existingUser }),
    {
      status: 200,
    }
  );
}