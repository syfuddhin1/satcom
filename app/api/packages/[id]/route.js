import prisma from "@/prisma/db";

export async function GET(request, { params }) {
  const packDetails = await prisma.package.findUnique({
    where: { id: params.id },
  });
  return new Response(JSON.stringify({ status: "success", packDetails }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const packDetails = await prisma.package.update({
      where: { id: params.id },
      data,
    });
    return new Response(JSON.stringify({ status: "success", packDetails }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
