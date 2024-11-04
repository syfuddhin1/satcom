import { accountModel } from "@/models/accounts-model";
import connectMongo from "@/services/mongo";

export async function GET() {
  // Connect to MongoDB
  await connectMongo();

  // Fetch data from MongoDB
  const accountsData = await accountModel.find().sort({ createdAt: -1 });

  return new Response(JSON.stringify({ status: "success", accountsData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
