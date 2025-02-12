import prisma from "@/prisma/db";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get("provider");

  const packageData = await prisma.package.findMany({
    where: { provider },
  });
  return new Response(JSON.stringify({ status: "success", packageData }), {
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

    const packageData = await prisma.package.create({
      data: data,
    });

    return new Response(JSON.stringify({ status: "success", packageData }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new package:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to create new package",
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
