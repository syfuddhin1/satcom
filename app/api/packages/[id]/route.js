import { packagesModel } from "@/models/package-model";
import connectMongo from "@/services/mongo";

export async function GET(request, { params }) {
  const connect = await connectMongo();
  const searchParams = request.nextUrl.searchParams;
  const provider = searchParams.get("provider");

  const packDetails = await packagesModel.findById(params.id);
  return new Response(JSON.stringify({ status: "success", packDetails }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
