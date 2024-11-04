import { accountModel } from "@/models/accounts-model";
import { accountsTypeModel } from "@/models/accounts-type-model";
import connectMongo from "@/services/mongo";

export async function GET() {
  // Connect to MongoDB
  await connectMongo();

  // Fetch data from MongoDB
  const accountsData = await accountsTypeModel.find().sort({ createdAt: -1 });

  return new Response(JSON.stringify({ status: "success", accountsData }), {
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

    if (!data.accountsId || !data.accountsName || !data.accountsType) {
      return new Response(
        JSON.stringify({ status: "error", message: "Invalid data" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const accountsId = (await accountsTypeModel.countDocuments()) + 1;
    const accountData = await accountsTypeModel.create({
      ...data,
      accountsId: accountsId.toString().padStart(3, "0"),
    });

    return new Response(JSON.stringify({ status: "success", accountData }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Failed to create account" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
