import prisma from "@/prisma/db";
import { startOfDay, endOfDay, subDays ,format } from "date-fns";


export async function getMonthlyIncome(month, year) {
  const income = await prisma.voucher.groupBy({
    by: ["accountType"],
    where: {
      accountType: "credit",
      createdAt: {
        gte: new Date(year, month, 1),
        lt: new Date(year, month + 1, 1),
      },
    },
    _sum: { amount: true },
  });

  const expenses = await prisma.voucher.groupBy({
    by: ["accountType"],
    where: {
      accountType: "debit",
      createdAt: {
        gte: new Date(year, month, 1),
        lt: new Date(year, month + 1, 1),
      },
    },
    _sum: { amount: true },
  });

  return {
    income,
    expenses,
    netIncome: income._sum.amount - expenses._sum.amount,
  };
}

export async function getBalanceSheet(asOfDate) {
  const assets = await prisma.account.findMany({
    where: {
      accountType: "ASSET",
    },
    include: {
      voucher: {
        where: {
          createdAt: {
            lte: asOfDate,
          },
        },
      },
    },
  });

  const liabilities = await prisma.account.findMany({
    where: {
      accountType: "LIABILITY",
    },
    include: {
      voucher: {
        where: {
          createdAt: {
            lte: asOfDate,
          },
        },
      },
    },
  });

  return { assets, liabilities };
}

export async function getAccountLedger(accountId, startDate, endDate) {
  return prisma.voucher.findMany({
    where: {
      accountId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      Account: true,
      Transaction: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

// Individual User Due
export async function getSingleUserDue(userId) {
  const userPackages = await prisma.userPackage.findMany({
    where: { userId },
    include: { package: true },
  });

  const payments = await prisma.transaction.findMany({
    where: { userId },
  });

  return calculateDueAmount(userPackages, payments);
}

// Total Due Report
export async function getTotalDuesReport() {
  return prisma.user
    .findMany({
      include: {
        userPackages: {
          include: { package: true },
        },
        Transaction: true,
        zone: true,
        area: true,
      },
    })
    .then((users) => {
      return users.map((user) => ({
        userId: user.id,
        name: user.name,
        memberCode: user.memberCode,
        zone: user.zone.name,
        area: user.area.name,
        dueAmount: calculateDueAmount(user.userPackages, user.Transaction),
      }));
    });
}

// Overdue Users Report
export async function getOverdueUsers() {
  const thirtyDaysAgo = subDays(new Date(), 30);

  return prisma.user.findMany({
    where: {
      Transaction: {
        none: {
          transactionDate: {
            gte: thirtyDaysAgo,
          },
        },
      },
    },
    include: {
      userPackages: {
        include: { package: true },
      },
      Transaction: true,
    },
  });
}

export function calculateDueAmount(userPackages, transactions) {
  const totalPackageAmount = userPackages.reduce(
    (sum, up) => sum + up.package.price,
    0
  );
  const totalPaid = transactions.reduce((sum, trans) => sum + trans.amount, 0);

  // Calculate months since subscription
  const monthsDue = userPackages
    .map((up) => {
      const months = differenceInMonths(new Date(), up.billing_date);
      return months * up.package.price;
    })
    .reduce((sum, amount) => sum + amount, 0);

  return monthsDue - totalPaid;
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

// export async function updateUserBillingStatus() {
//   const userPackages = await prisma.userPackage.findMany({
//     include: {
//       package: true,
//     },
//   });

//   for (const userPackage of userPackages) {
//     const dueInfo = await calculateUserDues(userPackage.userId);

//     await prisma.userPackage.update({
//       where: { id: userPackage.id },
//       data: {
//         nextPaymentDate: dueInfo.nextPaymentDate,
//         currentDue: dueInfo.totalDue,
//       },
//     });
//   }
// }
// export async function POST(request) {
//   const users = await prisma.user.findMany();

//   const updates = await Promise.all(
//     users.map(async (user) => {
//       const dueInfo = await calculateUserDues(user.id);
//       return prisma.userPackage.update({
//         where: { userId: user.id },
//         data: {
//           nextPaymentDate: dueInfo.nextPaymentDate,
//           currentDue: dueInfo.totalDue,
//         },
//       });
//     })
//   );

//   return Response.json({ updated: updates.length });
// }

// export function AdminBillingPage() {
//   const updateAllBillingStatus = async () => {
//     await fetch("/api/billing/update", { method: "POST" });
//   };

//   return (
//     <div>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={updateAllBillingStatus}
//       >
//         Update All Billing Status
//       </button>
//     </div>
//   );
// }
