import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";

export async function GET(request, { params }) {
  const connect = await connectMongo();
  const userData = await userModel.findById(params.id);
  return new Response(JSON.stringify({ status: "success", userData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function DELETE(request, { params }) {
  const connect = await connectMongo();
  try {
    const deletedUser = await userModel.findByIdAndDelete(params.id);
    return new Response(JSON.stringify({ status: "success", deletedUser }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Failed to delete user",
      }),
      {
        status: 500,
      }
    );
  }
}
