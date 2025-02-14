import { addMonths, differenceInMonths } from "date-fns";
import prisma from "@/prisma/db";

export async function POST(request) {
  const users = await prisma.user.findMany();

  const updates = await Promise.all(
    users.map(async (user) => {
      const userPackage = await prisma.userPackage.findFirst({
        where: { userId: user.id }
      });
      
      const dueInfo = await calculateUserDues(user.id);
      
      return prisma.userPackage.update({
        where: { id: userPackage.id },
        data: {
          nextPaymentDate: dueInfo.nextPaymentDate,
          currentDue: dueInfo.totalDue,
        },
      });
    })
  );

  return Response.json({ updated: updates.length });
}


export async function calculateUserDues(userId) {
  // Get user package details
  const userPackage = await prisma.userPackage.findFirst({
    where: { userId },
    include: {
      package: true,
    },
    orderBy: { billing_date: "asc" },
  });

  // Get all transactions
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { transactionDate: "asc" },
  });

  const startDate = userPackage.billing_date;
  const currentDate = new Date();

  // Calculate months between start date and current date
  const monthsDifference = differenceInMonths(currentDate, startDate);

  // Calculate total expected payment
  const totalExpectedPayment =
    (monthsDifference + 1) * userPackage.package.price;

  // Calculate total paid amount
  const totalPaidAmount = transactions.reduce(
    (sum, trans) => sum + trans.amount,
    0
  );

  // Calculate due amount
  const totalDue = totalExpectedPayment - totalPaidAmount;

  // Calculate next payment date
  const nextPaymentDate = addMonths(startDate, monthsDifference + 1);

  return {
    totalDue,
    nextPaymentDate,
    monthsDue: monthsDifference + 1,
    packageDetails: {
      packageName: userPackage.package.name,
      monthlyFee: userPackage.package.price,
      startDate: userPackage.billing_date,
    },
  };
}
