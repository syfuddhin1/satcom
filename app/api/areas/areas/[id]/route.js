import { areaModel } from "@/models/area-model";
import connectMongo from "@/services/mongo";
import { getNewAreaId } from "@/utils";
import { revalidatePath } from "next/cache";
import prisma from "@/prisma/db";

/**
 * @description Retrieves all areas from MongoDB
 * @param {Request} request - HTTP request object
 * @returns {Response} A Response object with a JSON payload containing the area list
 * @throws {Error} If there's an error connecting to MongoDB or retrieving the area list
 */
export async function GET(request, { params }) {
  // await connectMongo();

  try {
    const areaList = await prisma.area.findMany({
      where: {
        zone: {
          code: params.id,
        },
      },
    });
    console.log("====================================");
    console.log(areaList);
    console.log("====================================");
    const response = new Response(
      JSON.stringify({ status: "success", areaList }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    const response = new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to retrieve area list",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  }
}

export async function PUT(request, { params }) {
  // await connectMongo();
  try {
    const data = await request.json();
    const updatedArea = await prisma.area.update({
      where: {
        id: params.id,
      },
      data: {
        ...data,
      },
    });
    revalidatePath("/areas/areas");
    return new Response(JSON.stringify({ status: "success", updatedArea }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating area:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to update area",
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
