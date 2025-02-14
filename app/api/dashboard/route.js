import prisma from "@/prisma/db";

export async function GET() {
  try {
    // 1️⃣ Total Users, Active Users, Users by Zone
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { status: "active" },
    });
    const usersByZone = await prisma.user.groupBy({
      by: ["zoneId"],
      _count: { id: true },
    });

    // 2️⃣ Most Popular Packages & Revenue by Package
    // const popularPackages = await prisma.userPackage.groupBy({
    //   by: ["packageId"],
    //   _count: { id: true },
    //   orderBy: { _count: { id: "desc" } },
    // });
    const popularPackages = await prisma.package.findMany({
      select: {
        id: true,
        name: true,
        // Add other package fields you need
        _count: {
          select: {
            userPackages: true,
          },
        },
      },
      orderBy: {
        userPackages: {
          _count: "desc",
        },
      },
    });
const totalPackages = await prisma.package.count();
    // Get sum of transactions by package
    const revenueByPackage = await prisma.package.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            Transaction: true, // Count of transactions
          },
        },
        Transaction: {
          select: {
            amount: true,
          },
        },
      },
    });

    // Transform the results to get the sum
    const transformedRevenue = revenueByPackage
      .map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        transactionCount: pkg._count.Transaction,
        totalAmount: pkg.Transaction.reduce(
          (sum, trans) => sum + trans.amount,
          0
        ),
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount);

    // 3️⃣ Monthly Revenue Trends
    const dailyRevenue = await prisma.transaction.groupBy({
      by: ["transactionDate"],
      _sum: { amount: true },
      orderBy: { transactionDate: "asc" },
    });

    const monthlyRevenue = dailyRevenue.reduce((acc, entry) => {
      const month = entry.transactionDate.toISOString().slice(0, 7); // Extract YYYY-MM
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += entry._sum.amount;
      return acc;
    }, {});



    const totalRevenue = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
    });

    // 4️⃣ Payment Mode Distribution
    const payments = await prisma.transaction.groupBy({
      by: ["modeOfPayment"],
      _count: { id: true },
      _sum: { amount: true },
    });

    // 5️⃣ Total Transactions & Transactions Per Day
    const totalTransactions = await prisma.transaction.count();
    const transactionsPerDay = await prisma.transaction.groupBy({
      by: ["transactionDate"],
      _count: { id: true },
      _sum: { amount: true },
      orderBy: { transactionDate: "asc" },
    });

    // 6️⃣ Total Assets & Expenses by Account Type
    const totalAssets = await prisma.asset.count();
    const expensesByAccount = await prisma.voucher.groupBy({
      by: ["accountType"],
      _sum: { amount: true },
    });
    const currentBalanceData = await prisma.voucher.groupBy({
      by: ["accountType"],
      _sum: { amount: true },
    });
    const currentBalanceDataReduced = currentBalanceData.reduce(
      (acc, entry) => {
        acc[entry.accountType] = entry._sum.amount;
        return acc;
      },
      {}
    );
    const currentBalance =
      currentBalanceDataReduced.debit - currentBalanceDataReduced.credit;
    // 7️⃣ Employees & Vendors
    const totalEmployees = await prisma.adminUser.count({});
    const totalManagers = await prisma.adminUser.count({
      where: { role: "manager" },
    });

    // ✅ Send JSON Response
    return new Response(
      JSON.stringify({
        users: { totalUsers, activeUsers, usersByZone },
        packages: { popularPackages, transformedRevenue,totalPackages },
        revenue: {
          monthlyRevenue,
          totalRevenue,
          dailyRevenue: transformDailyRevenue(dailyRevenue),
        },
        payments: { payments },
        transactions: { totalTransactions, transactionsPerDay },
        accounts: { totalAssets, expensesByAccount, currentBalance },
        people: { totalEmployees, totalManagers },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}


function transformDailyRevenue(dailyRevenue) {
  return dailyRevenue.map(entry => {
      const date = new Date(entry.transactionDate);
      const formattedDate = date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit"
      });

      return {
          name: formattedDate,
          total: entry._sum.amount
      };
  });
}