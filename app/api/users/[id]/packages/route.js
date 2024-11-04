import { accountModel } from "@/models/accounts-model";
import { transactionModel } from "@/models/transaction-model";
import { userModel } from "@/models/user-model";
import connectMongo from "@/services/mongo";
import mongoose from "mongoose";

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

export async function PUT(request, { params }) {
  await connectMongo();
  const data = await request.json();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Find the user by ID
    const user = await userModel.findById(params.id).session(session);
    if (!user) throw new Error("User not found");

    // Check if the package already exists
    const existingPackage = user.packages.find(
      (p) => p.packageType === data.packageType
    );
    if (existingPackage) throw new Error("User already has this package");

    // Append the new package
    user.packages.push(data);
    const updateUser = await userModel.findByIdAndUpdate(
      params.id,
      { packages: user.packages },
      { new: true, session }
    );

    // Generate transaction IDs
    const transactionDate = new Date(data.billing_date)
      .toISOString()
      .slice(0, 10);
    const serial =
      (await transactionModel.countDocuments({
        transactionDate: { $eq: new Date(transactionDate) },
      })) + 1;
    const transactionId = `Bill${transactionDate}${serial
      .toString()
      .padStart(3, "0")}`;
    const transactionId2 = `Service${transactionDate}${serial
      .toString()
      .padStart(3, "0")}`;

    // Create transactions for package bill and service charge
    const [newTransaction, newTransaction2] = await Promise.all([
      transactionModel.create(
        [
          {
            transactionId,
            amount: data.package_bill,
            packageId: data.packageType,
            userId: params.id,
            transactionDate: transactionDate,
            modeOfPayment: "cash",
            remarks: "Package added to user's account",
          },
        ],
        { session }
      ),
      transactionModel.create(
        [
          {
            transactionId: transactionId2,
            amount: data.sCharge,
            packageId: data.packageType,
            userId: params.id,
            transactionDate: transactionDate,
            modeOfPayment: "cash",
            remarks: "Service charge added to user's account",
          },
        ],
        { session }
      ),
    ]);

    // Generate voucher IDs for account entries
    const serial2 =
      (await accountModel.countDocuments({
        transactionDate: { $eq: new Date(transactionDate) },
      })) + 1;
    const voucherId1 = `Credit${transactionDate}${serial2
      .toString()
      .padStart(3, "0")}`;
    const voucherId2 = `Credit${transactionDate}${(serial2 + 1)
      .toString()
      .padStart(3, "0")}`;

    // Create account entries for package bill and service charge
    const [newAccount1, newAccount2] = await Promise.all([
      accountModel.create(
        [
          {
            voucherId: voucherId1,
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
      ),
      accountModel.create(
        [
          {
            voucherId: voucherId2,
            accountId: "002",
            accountName: "Service Charge",
            accountType: "Credit",
            transactionId: newTransaction2[0]._id,
            userId: newTransaction2[0].userId,
            transactionDate: newTransaction2[0].transactionDate,
            amount: newTransaction2[0].amount,
            modeOfPayment: newTransaction2[0].modeOfPayment,
            remarks: newTransaction2[0].remarks,
          },
        ],
        { session }
      ),
    ]);

    // Update user accounts with both package bill and service charge
    user.accounts.push(
      {
        voucherId: newAccount1[0]._id,
        transactionId: newTransaction[0]._id,
        date: newTransaction[0].transactionDate,
        amount: newTransaction[0].amount,
      },
      {
        voucherId: newAccount2[0]._id,
        transactionId: newTransaction2[0]._id,
        date: newTransaction2[0].transactionDate,
        amount: newTransaction2[0].amount,
      }
    );
    await userModel.findByIdAndUpdate(
      params.id,
      { accounts: user.accounts },
      { session, new: true }
    );

    await session.commitTransaction();
    session.endSession();

    return new Response(
      JSON.stringify({ status: "success", data: updateUser.packages }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating user packages:", error);
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(request, { params }) {
  const connect = await connectMongo();
  const data = await request.json();

  try {
    const userData = await userModel.findById(params.id);
    const updatedPackages = userData.packages.filter(
      (item) => item.packageType !== data.packageType
    );
    const deletedPackage = await userModel.findByIdAndUpdate(
      params.id,
      { packages: updatedPackages },
      { new: true }
    );

    return new Response(JSON.stringify({ status: "success", deletedPackage }), {
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
