import prisma from "@/prisma/db";

export async function GET(request, { params }) {
  const { id } = params;
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });
  return Response.json(transaction);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  const transaction = await prisma.transaction.update({
    where: { id },
    data,
  });
  return Response.json(transaction);
}

// DELETE: Remove a transaction
export async function DELETE(request, { params }) {
  const { id } = params;

  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: {
      voucher: {
        where: { transactionId: id },
      },
    },
  });

  //   delete voucher if transaction has voucher
  const voucher = await prisma.voucher.delete({
    where: { id: transaction.voucher[0].id },
  });

  //   delete transaction
  await prisma.transaction.delete({
    where: { id },
  });
  return Response.json({ status: "success", data: id });
}
