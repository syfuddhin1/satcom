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

export async function GET(request, { params, searchParams }) {
  try {
    const { voucherId, transactionId, userId } = searchParams;

    const whereClause = {
      id: params.id,
    };
    if (voucherId) whereClause.voucherId = voucherId;
    if (transactionId) whereClause.transactionId = transactionId;
    if (userId) whereClause.userId = userId;

    const accounts = await prisma.voucher.findUnique({
      where: whereClause,
      include: {
        Account: true,
        Transaction: true,
        User: true,
      },
    });

    return new Response(JSON.stringify({ status: "success", accounts }), {
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
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const accounts = await prisma.voucher.update({
      where: {
        id: params.id,
      },
      data,
    });
    return new Response(JSON.stringify({ status: "success", accounts }), {
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

export async function DELETE(request, { params }) {
  try {
    const accounts = await prisma.voucher.delete({
      where: {
        id: params.id,
      },
    });
    return new Response(JSON.stringify({ status: "success", accounts }), {
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
