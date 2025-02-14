import prisma from "@/prisma/db";
import { differenceInMonths } from "date-fns";

export async function GET(request, { params }) {
  const searchParams = new URL(request.url).searchParams;
  const date = searchParams.get("date");
  const data = await getTotalDuesReport(new Date(date));
  return Response.json(data);
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
