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
