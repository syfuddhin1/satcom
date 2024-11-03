import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("q"); // Can be either name or code
  await connectMongo(); // Await the connection

  let userData;

  if (searchTerm) {
    // Filter based on searchTerm for either `name` or `memberCode`
    userData = await userModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by name
        { memberCode: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by code
      ],
    });
  } else {
    // No search term, return all data
    userData = await userModel.find();
  }

  return new Response(JSON.stringify({ status: "success", userData }), {
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

    const userData = await userModel.create(data);

    return new Response(JSON.stringify({ status: "success", userData }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new user:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to create new user",
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
