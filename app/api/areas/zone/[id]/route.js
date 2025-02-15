import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/prisma/db";

export async function PUT(request, { params }) {
  const data = await request.json();
  const zoneId = params.id;
  try {
    const zone = await prisma.zone.update({
      where: { id: zoneId },
      data,
    });
    return new Response(JSON.stringify({ status: "success", zone }), {
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

export async function DELETE(request, { params }) {
  const zoneId = params.id;
  try {
    const zone = await prisma.zone.delete({
      where: { id: zoneId },
    });
    return new Response(JSON.stringify({ status: "success", zone }), {
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
