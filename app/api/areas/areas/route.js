import prisma from "@/prisma/db";
import { getNewAreaId } from "@/utils";
import { revalidatePath } from "next/cache";
export async function GET(request) {
  // await connectMongo();
  try {
    const areaList = await prisma.area.findMany({
      include: {
        zone: true
      }
    }); // Use .find() to retrieve all documents

    return new Response(
      JSON.stringify({ status: "success", areaList }), // Convert data to JSON string
      {
        status: 200, // Set the HTTP status code
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
      }
    );
  } catch (error) {
    console.error("Error getting area list:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to retrieve area list",
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
    // const areaList = await prisma.area.findMany();
    const data = await request.json();
    // const newAreaId = getNewAreaId(data.zone.code, areaList);
    const newArea = await prisma.area.create({
      data: {
        ...data,
        // code: newAreaId,
      },
    });
    revalidatePath("/");
    return new Response(JSON.stringify({ status: "success", newArea }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new area:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to create new area",
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
  // await connectMongo();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const deletedZone = await prisma.areas.delete({
      where: {
        id: id,
      },
    });
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
