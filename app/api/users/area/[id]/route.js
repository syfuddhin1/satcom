import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";

export async function GET(request, { params }) {
  console.log(params);
  const connect = await connectMongo();
  const userData = await userModel.find({ area: params.id });
  return new Response(JSON.stringify({ status: "success", userData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
