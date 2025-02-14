import prisma from "@/prisma/db";
import { differenceInMonths } from "date-fns";

export async function GET() {
  const userPackages = await prisma.userPackage.findMany({
    include: {
      user: {
        select: {
          name: true,
          memberCode: true,
          mobile: true,
          id: true,
          zone: { select: { name: true } },
          area: { select: { name: true } },
        },
      },
      package: {
        select: {
          name: true,
          price: true,
          provider: true,
          speed: true,
          Transaction: {
            select: {
              amount: true,
              transactionDate: true,
              modeOfPayment: true,
              remarks: true,
              userId: true,
            },
          },
        },
      },
    },
  });
  const data = normalizeTransactions(userPackages);

  const currentDate = new Date();

  const analytics = {
    "total Packages": userPackages.length,
    "total Paid": data.filter((item) => item.isPaid).length,
    "total Due":
      userPackages.length - data.filter((item) => item.isPaid).length,
    "todays Due":
      data.filter((item) => item.nextPaymentDate === currentDate.toISOString().split("T")[0]).length,
  };
  return Response.json({
    status: "success",
    data,
    analytics,
  });
}

function normalizeTransactions(data) {
  const currentDate = new Date();

  return data.map((item) => {
    const userTransactions = item.package.Transaction.filter(
      (trans) => trans.userId === item.userId
    );

    const totalPaid = userTransactions.reduce(
      (sum, trans) => sum + trans.amount,
      0
    );

    const thisMonthTransactions = userTransactions.filter(
      (trans) =>
        differenceInMonths(currentDate, new Date(trans.transactionDate)) === 0
    );

    const thisMonthPaid = thisMonthTransactions.reduce(
      (sum, trans) => sum + trans.amount,
      0
    );

    const lastPaymentDate = thisMonthTransactions.reduce((maxDate, trans) => {
      const paymentDate = new Date(trans.transactionDate);
      return paymentDate > maxDate ? paymentDate : maxDate;
    }, new Date(item.billing_date));

    const lastPaymentAmount = thisMonthTransactions.find(
      (trans) =>
        new Date(trans.transactionDate).toISOString().split("T")[0] ==
        lastPaymentDate.toISOString().split("T")[0]
    );

    return {
      userId: item.userId,
      userName: item.user.name,
      memberCode: item.user.memberCode,
      price: item.package.price,
      mobile: item.user.mobile,
      zone: item.user.zone.name,
      area: item.user.area.name,
      package: item.package.name,
      provider: item.package.provider,
      speed: item.package.speed,
      billing_date: item.billing_date,
      nextPaymentDate: getThisMonthDate(item.billing_date)
        .toISOString()
        .split("T")[0],
      currentDue: item.currentDue,
      totalPaid,
      totalMonthCount: differenceInMonths(currentDate, item.billing_date),
      thisMonthPaid,
      isPaid: thisMonthPaid >= item.package.price,
      lastPaymentDate: lastPaymentDate.toISOString().split("T")[0],
      lastPaymentAmount: lastPaymentAmount?.amount || 0,
    };
  });
}

// get this month date from billing date
function getThisMonthDate(billingDate) {
  const currentDate = new Date();
  const monthsDifference = differenceInMonths(currentDate, billingDate);
  return new Date(
    billingDate.getTime() + monthsDifference * 30 * 24 * 60 * 60 * 1000
  );
}
