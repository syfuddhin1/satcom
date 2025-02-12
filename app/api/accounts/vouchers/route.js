import { generateVoucherCode } from "@/lib/actions";
import prisma from "@/prisma/db";

// model voucher {
//   id              String       @id @default(auto()) @map("_id") @db.ObjectId
//   voucherId       String
//   accountId       String       @db.ObjectId
//   Account         Account      @relation(fields: [accountId], references: [id])
//   amount          Float
//   transactionId   String?      @unique @db.ObjectId
//   Transaction     Transaction? @relation(fields: [transactionId], references: [id])
//   remarks         String?
//   createdAt       DateTime     @default(now())
//   updatedAt       DateTime     @updatedAt
//   userId          String?       @db.ObjectId
//   User            User?         @relation(fields: [userId], references: [id])

//   @@index([accountId])
//   @@index([voucherId])
//   @@index([userId])
// }

export async function GET(request) {
  try {
    const vouchers = await prisma.voucher.findMany({
      include: {
        Account: true,
        Transaction: true,
        User: true,
      },
    });
    return new Response(JSON.stringify({ status: "success", vouchers }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { accountType, ...rest } = data;
    const voucher = await prisma.voucher.create({
      data: {
        accountId: rest.accountId,
        amount: Number(rest.amount),
        accountType: accountType === "receipt" ? "credit" : "debit",
        createdAt: new Date(data.createdAt),
        moodOfPayment: rest.moodOfPayment,
        remarks: rest.remarks,
        voucherId: await generateVoucherCode(data.createdAt, accountType),
      },
    });
    return new Response(JSON.stringify({ status: "success", voucher }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: "error", message: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
