import { zoneModel } from "@/models/zone-model";
import connectMongo from "@/services/mongo";
import { getNewId } from "@/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/prisma/db";
export async function GET(request) {
  // await connectMongo();
  try {
    const zoneList = await prisma.zone.findMany(); // Use .find() to retrieve all documents
console.log(zoneList);

    return new Response(
      JSON.stringify({ status: "success", zoneList }), // Convert data to JSON string
      {
        status: 200, // Set the HTTP status code
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
      }
    );
  } catch (error) {
    console.error("Error getting zone list:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to retrieve zone list",
      }),
      {
        status: 500, // Set HTTP status for server error
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request) {
  // await connectMongo();
  try {
    const zoneList = await prisma.zone.findMany(); // Use .find() to retrieve all documents
    console.log(zoneList);
    
    const newId = getNewId(zoneList);
    const data = await request.json();

    const newZone = await prisma.zone.create({
      data: {
        code: newId,
        name: data.name,
        description: data.description,
      },
    });
    revalidatePath("/");

    return new Response(JSON.stringify({ status: "success", newZone }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new zone:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to create new zone",
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

export async function DELETE(request) {
  await connectMongo();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const deletedZone = await zoneModel.findByIdAndDelete(id);
    revalidatePath("/");
    return new Response(JSON.stringify({ status: "success", deletedZone }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting zone:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to delete zone",
      }),
      {}
    );
  }
}
