import { areaModel } from "@/models/area-model";
import connectMongo from "@/services/mongo";

/**
 * @description Retrieves all areas from MongoDB
 * @param {Request} request - HTTP request object
 * @returns {Response} A Response object with a JSON payload containing the area list
 * @throws {Error} If there's an error connecting to MongoDB or retrieving the area list
 */
export async function GET(request, { params }) {
  await connectMongo();

  try {
    const areaList = await areaModel.find({ "zone.code": params.id }).lean();
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
