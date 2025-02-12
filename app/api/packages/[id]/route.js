import { packagesModel } from "@/models/package-model";
import connectMongo from "@/services/mongo";
import prisma from "@/prisma/db";

export async function GET(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get("provider");

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
