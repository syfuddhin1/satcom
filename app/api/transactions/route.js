import { accountModel } from "@/models/accounts-model";
import { transactionModel } from "@/models/transaction-model";
import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";
import { startSession } from "mongoose";
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
      .populate("packageId")
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
  // Start MongoDB session for transaction
  const session = await startSession();

  try {
    // Connect to MongoDB
    await connectMongo();

    // Parse and validate request body
    const data = await request.json();

    if (!data.userId || !data.transactionDate || !data.amount) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Missing required fields",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find user and validate existence
    const user = await userModel.findById(data.userId);
    if (!user) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "User not found",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Start transaction
    session.startTransaction();

    // Generate transaction ID
    const transactionDate = new Date(data.transactionDate)
      .toISOString()
      .slice(0, 10);
    const serial =
      (await transactionModel.countDocuments({
        transactionDate: {
          $eq: new Date(transactionDate),
        },
      })) + 1;
    const transactionId = `Bill${transactionDate}${serial
      .toString()
      .padStart(3, "0")}`;

    // Create transaction
    const newTransaction = await transactionModel.create(
      [
        {
          ...data,
          transactionId,
        },
      ],
      { session }
    );

    // Generate voucher ID for account
    const serial2 =
      (await accountModel.countDocuments({
        transactionDate: {
          $eq: new Date(transactionDate),
        },
      })) + 1;
    console.log(
      await accountModel.countDocuments({
        transactionDate: {
          $eq: new Date(transactionDate),
        },
      })
    );
    const voucherId = `Credit${transactionDate}${serial2
      .toString()
      .padStart(3, "0")}`;

    // Create account entry
    const newAccount = await accountModel.create(
      [
        {
          voucherId,
          accountId: "001",
          accountName: "Bill",
          accountType: "Credit",
          transactionId: newTransaction[0]._id,
          userId: newTransaction[0].userId,
          transactionDate: newTransaction[0].transactionDate,
          amount: newTransaction[0].amount,
          modeOfPayment: newTransaction[0].modeOfPayment,
          remarks: newTransaction[0].remarks,
        },
      ],
      { session }
    );

    // Update user's accounts array
    const updatedAccounts = [
      ...user.accounts,
      {
        voucherId: newAccount[0]._id,
        transactionId: newTransaction[0]._id,
        date: newTransaction[0].transactionDate,
        amount: newTransaction[0].amount,
      },
    ];

    await userModel.findByIdAndUpdate(
      data.userId,
      { accounts: updatedAccounts },
      { session, new: true }
    );

    // Commit transaction
    await session.commitTransaction();

    return new Response(
      JSON.stringify({
        status: "success",
        data: newTransaction[0],
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();

    console.error("Transaction error:", error);

    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message || "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    // End session
    await session.endSession();
  }
}
