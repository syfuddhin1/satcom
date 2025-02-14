import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("q");

  let userData;

  if (searchTerm) {
    userData = await prisma.adminUser.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  } else {
    userData = await prisma.adminUser.findMany({});
  }

  return new Response(JSON.stringify({ status: "success", userData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Request body is empty",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const password = await bcrypt.hash(data.password, 5);
    const userData = await prisma.adminUser.create({
      data: {
        ...data,
        password: password,
      },
    });

    return new Response(JSON.stringify({ status: "success", userData }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to create new user",
        error,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
