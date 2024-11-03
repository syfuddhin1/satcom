import { packagesModel } from "@/models/package-model";
import connectMongo from "@/services/mongo";

export async function GET(request) {
  const connect = await connectMongo();
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get("provider");

  const packageData = await packagesModel.find(provider ? { provider } : {});
  return new Response(JSON.stringify({ status: "success", packageData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  try {
    const connect = await connectMongo();

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

    const packageData = await packagesModel.create(data);

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
