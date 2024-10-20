import prismaClient from "@/prisma/prismaClient";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  const data = await req.json();

  if (data.role === "owner") {
    const existingRes = await prismaClient.restaurant.findFirst({
      where: { Email: data.email },
    });

    if (!existingRes) {
      return new Response(JSON.stringify({ error: "Restaurant not found" }), {
        status: 404,
      });
    }

    const isPasswordValid = existingRes.Password === data.password;

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ message: "Login successful",user:  existingRes }), {
      status: 200,
    });
  } 
  console.log("comming")
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
