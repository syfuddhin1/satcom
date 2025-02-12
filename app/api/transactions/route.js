import prisma from "@/prisma/db";

// model Transaction {
//   id              String   @id @default(auto()) @map("_id") @db.ObjectId
//   transactionId   String   @unique
//   amount          Float
//   package         Package  @relation(fields: [packageId], references: [id])
//   packageId       String   @db.ObjectId
//   userId          String   @db.ObjectId
//   transactionDate DateTime @default(now())
//   modeOfPayment   String
//   remarks         String?
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt
//   User            User     @relation(fields: [userId], references: [id])

//   @@index([userId, transactionDate])
//   @@index([packageId, transactionDate])
// }

export async function GET(request) {
  try {
    // Retrieve search parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("q"); // Using 'q' as the search term

    // Construct the Prisma filter query for case-insensitive search
    let whereClause = {};
    if (searchTerm) {
      whereClause = {
        OR: [
          { transactionId: { contains: searchTerm, mode: "insensitive" } },
          { modeOfPayment: { contains: searchTerm, mode: "insensitive" } },
          { remarks: { contains: searchTerm, mode: "insensitive" } },
          { User: { name: { contains: searchTerm, mode: "insensitive" } } },
          { package: { id: { contains: searchTerm, mode: "insensitive" } } },
        ],
      };
    }

    // Fetch transactions from Prisma
    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      orderBy: { transactionDate: "desc" }, // Sort by latest transactions
      include: {
        package: true, // Include package details
        User: true, // Include user details
      },
    });

    // Return the response with the transaction data
    return new Response(JSON.stringify({ status: "success", transactions }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    // Parse and validate request body
    const data = await request.json();

    if (!data.userId || !data.transactionDate || !data.amount) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Missing required fields",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate if the user exists
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "User not found",
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate transaction ID
    const transactionDate = new Date(data.transactionDate)
      .toISOString()
      .slice(0, 10);
    const transactionCount = await prisma.transaction.count({
      where: { transactionDate: new Date(transactionDate) },
    });
    const transactionId = `Bill${transactionDate}${(transactionCount + 1)
      .toString()
      .padStart(3, "0")}`;

    // Generate voucher ID
    const voucherCount = await prisma.voucher.count({
      where: { accountType: "credit" },
    });

    const voucherId = `Credit${transactionDate}${(voucherCount + 1)
      .toString()
      .padStart(3, "0")}`;

    // Perform the transaction in Prisma
    const transactionResult = await prisma.$transaction(async (tx) => {
      // Create the transaction entry
      const newTransaction = await tx.transaction.create({
        data: {
          transactionId,
          userId: data.userId,
          transactionDate: new Date(data.transactionDate),
          amount: data.amount,
          modeOfPayment: data.modeOfPayment,
          remarks: data.remarks,
          packageId: data.packageId, // Ensure packageId exists in the request
        },
      });

      // Create account entry, assuming you will use the correct accountId from AccountsType
      const accountType = "credit"; // Or dynamically fetched from AccountsType
      const accountId = "001"; // Replace this with dynamic logic if needed
      const account = await tx.account.findFirst({
        where: {
          accountId,
        },
      });

      const newAccount = await tx.voucher.create({
        data: {
          voucherId,
          accountId: account.id,
          accountType,
          transactionId: newTransaction.id,
          userId: newTransaction.userId,
          amount: newTransaction.amount,
          moodOfPayment: newTransaction.modeOfPayment,
          remarks: newTransaction.remarks,
        },
      });

      return newTransaction;
    });

    return new Response(
      JSON.stringify({
        status: "success",
        data: transactionResult,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Transaction error:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message || "Internal Server Error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// export async function POST(request) {
//   // Start MongoDB session for transaction
//   const session = await startSession();

//   try {
//     // Connect to MongoDB
//     await connectMongo();

//     // Parse and validate request body
//     const data = await request.json();

//     if (!data.userId || !data.transactionDate || !data.amount) {
//       return new Response(
//         JSON.stringify({
//           status: "error",
//           message: "Missing required fields",
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     // Find user and validate existence
//     const user = await userModel.findById(data.userId);
//     if (!user) {
//       return new Response(
//         JSON.stringify({
//           status: "error",
//           message: "User not found",
//         }),
//         {
//           status: 404,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }

//     // Start transaction
//     session.startTransaction();

//     // Generate transaction ID
//     const transactionDate = new Date(data.transactionDate)
//       .toISOString()
//       .slice(0, 10);
//     const serial =
//       (await transactionModel.countDocuments({
//         transactionDate: {
//           $eq: new Date(transactionDate),
//         },
//       })) + 1;
//     const transactionId = `Bill${transactionDate}${serial
//       .toString()
//       .padStart(3, "0")}`;

//     // Create transaction
//     const newTransaction = await transactionModel.create(
//       [
//         {
//           ...data,
//           transactionId,
//         },
//       ],
//       { session }
//     );

//     // Generate voucher ID for account
//     const serial2 =
//       (await accountModel.countDocuments({
//         transactionDate: {
//           $eq: new Date(transactionDate),
//         },
//       })) + 1;
//     console.log(
//       await accountModel.countDocuments({
//         transactionDate: {
//           $eq: new Date(transactionDate),
//         },
//       })
//     );
//     const voucherId = `Credit${transactionDate}${serial2
//       .toString()
//       .padStart(3, "0")}`;

//     // Create account entry
//     const newAccount = await accountModel.create(
//       [
//         {
//           voucherId,
//           accountId: "001",
//           accountName: "Bill",
//           accountType: "Credit",
//           transactionId: newTransaction[0]._id,
//           userId: newTransaction[0].userId,
//           transactionDate: newTransaction[0].transactionDate,
//           amount: newTransaction[0].amount,
//           modeOfPayment: newTransaction[0].modeOfPayment,
//           remarks: newTransaction[0].remarks,
//         },
//       ],
//       { session }
//     );

//     // Update user's accounts array
//     const updatedAccounts = [
//       ...user.accounts,
//       {
//         voucherId: newAccount[0]._id,
//         transactionId: newTransaction[0]._id,
//         date: newTransaction[0].transactionDate,
//         amount: newTransaction[0].amount,
//       },
//     ];

//     await userModel.findByIdAndUpdate(
//       data.userId,
//       { accounts: updatedAccounts },
//       { session, new: true }
//     );

//     // Commit transaction
//     await session.commitTransaction();

//     return new Response(
//       JSON.stringify({
//         status: "success",
//         data: newTransaction[0],
//       }),
//       {
//         status: 201,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     // Rollback transaction on error
//     await session.abortTransaction();

//     console.error("Transaction error:", error);

//     return new Response(
//       JSON.stringify({
//         status: "error",
//         message: error.message || "Internal Server Error",
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } finally {
//     // End session
//     await session.endSession();
//   }
// }
