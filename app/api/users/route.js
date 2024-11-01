import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";

export async function GET() {
  const connect = await connectMongo();
  const userData = await userModel.find();
  return new Response(JSON.stringify({ status: "success", userData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request) {
  const connect = await connectMongo();

  //   cheack if user exists
  const data = await request.json();

  const userData = await userModel.create(data);

  return new Response(JSON.stringify({ status: "success", userData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
