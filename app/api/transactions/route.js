import { transactionModel } from "@/models/transaction-model";
import connectMongo from "@/services/mongo";

export async function GET(request) {
  // Connect to MongoDB
  await connectMongo();

  // Retrieve search parameters from the request
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get("q"); // Using 'q' as the search term

  // Construct the query to search for transactions
  const query = {};
  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by name
      { memberCode: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by member code
      { transactionId: { $regex: searchTerm, $options: "i" } }, // Search by transaction ID
      { packageID: { $regex: searchTerm, $options: "i" } }, // Search by package ID
      { userId: { $regex: searchTerm, $options: "i" } }, // Search by user ID
      { transactionDate: { $regex: searchTerm, $options: "i" } },
      { modeOfPayment: { $regex: searchTerm, $options: "i" } }, // Search by mode of payment
    ];
  }

  try {
    // Fetch the transaction data based on the constructed query
    const transactionData = await transactionModel
      .find(query)
      .sort({ transactionDate: -1 })
      .populate("userId");

    // Return the response with the transaction data
    return new Response(
      JSON.stringify({ status: "success", transactionData }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export async function POST(request) {
  // Connect to MongoDB
  await connectMongo();

  // Parse the request body
  const data = await request.json();

  // Generate a unique transaction ID
  const transactionDate = new Date(data.transactionDate)
    .toISOString()
    .slice(0, 10);
  const serial =
    (await transactionModel.countDocuments({ transactionDate })) + 1;
  const transactionId = `${
    data.packageId.split("-")[0]
  }${transactionDate}${serial.toString().padStart(3, "0")}`;

  try {
    // Create a new transaction with the generated transaction ID
    const newTransaction = await transactionModel.create({
      ...data,
      transactionId,
    });

    // Return the response with the new transaction data
    return new Response(JSON.stringify({ status: "success", newTransaction }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating new transaction:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
