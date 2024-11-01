import { areaModel } from "@/models/area-model";
import { zoneModel } from "@/models/zone-model";
import connectMongo from "@/services/mongo";
import { getNewAreaId } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * @description Retrieves all areas from MongoDB
 * @returns {Response} A Response object with a JSON payload containing the area list
 * @throws {Error} If there's an error connecting to MongoDB or retrieving the area list
 */
export async function GET(request) {
  await connectMongo();
  try {
    const areaList = await areaModel.find(); // Use .find() to retrieve all documents

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
  await connectMongo();
  try {
    const areaList = await areaModel.find().lean();
    const data = await request.json();
    const newAreaId = getNewAreaId(data.zone.code, areaList);
    const newArea = await areaModel.create({
      ...data,
      code: newAreaId,
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
