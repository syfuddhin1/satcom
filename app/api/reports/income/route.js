import prisma from "@/prisma/db";
import { startOfMonth, endOfMonth, format, endOfDay } from "date-fns";

export async function GET(request, { params }) {
  const searchParams = new URL(request.url).searchParams;
  const date = searchParams.get("date");
  const data = await generateIncomeStatement(new Date(date));
  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "html",
    },
  });
}

async function generateIncomeStatement(date) {
  const startDate = startOfMonth(date);
  const endDate = endOfDay(date);
  const fiscalYearStart = new Date(date.getFullYear() - 1, 7, 1); // Fiscal year starts from April

  // Fetch current month data
  const currentMonthDataraw = await prisma.voucher.groupBy({
    by: ["accountType", "accountId"],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      accountType: "asc",
    },
  });

  // To include Account details, you'll need a separate query
  const accountDetails = await prisma.account.findMany({
    where: {
      id: {
        in: currentMonthDataraw.map((item) => item.accountId),
      },
    },
  });

  // Combine the data
  const currentMonthData = currentMonthDataraw.map((item) => ({
    ...item,
    Account: accountDetails.find((acc) => acc.id === item.accountId),
  }));

  // Fetch fiscal year to date data
  const yearToDateDataraw = await prisma.voucher.groupBy({
    by: ["accountType", "accountId"],
    where: {
      createdAt: {
        gte: fiscalYearStart,
        lte: endDate,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      accountType: "asc",
    },
  });

  const accountDetails2 = await prisma.account.findMany({
    where: {
      id: {
        in: yearToDateDataraw.map((item) => item.accountId),
      },
    },
  });
  const yearToDateData = yearToDateDataraw.map((item) => ({
    ...item,
    Account: accountDetails2.find((acc) => acc.id === item.accountId),
  }));

  const incomeRowsHtml = await generateIncomeRows(
    currentMonthData,
    yearToDateData
  );
  const expenseRowsHtml = await generateExpenseRows(
    currentMonthData,
    yearToDateData
  );

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
       
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .org-info {
                margin-bottom: 5px;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 1.5rem;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
                  text-transform: capitalize;
            }
            th {
                background-color: #f5f5f5;
                text-transform: capitalize;
            }
            .amount {
                text-align: right;
                font-family: monospace;
            }
            .total-row {
                font-weight: bold;
                background-color: #f9f9f9;
            }
            .section-header {
                background-color: #eee;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2 class="org-info">Sat Communication</h2>
            <h3>Income Statement</h3>
            <p>For the period ended ${format(date, "MMMM, yyyy")}</p>
            <p>Reporting Date: ${format(new Date(date), "dd-MM-yyyy")}</p>
        </div>


        <table>
            <thead>
                <tr>
                    <th>Particulars</th>
                    <th>Notes</th>
                    <th>Current Month<br>(${format(date, "MMMM, yy")})</th>
                    <th>Current Year<br>(FY-${fiscalYearStart.getFullYear()}-${date.getFullYear()})</th>
                </tr>
            </thead>
            <tbody>
                <!-- Income Section -->
                <tr class="section-header">
                    <td colspan="4">Income</td>
                </tr>
                ${incomeRowsHtml}

                <!-- Expense Section -->
                <tr class="section-header">
                    <td colspan="4">Expense</td>
                </tr>
                ${expenseRowsHtml}

                <!-- Summary Section -->
                <tr class="total-row">
                    <td>Total Income</td>
                    <td>-</td>
                    <td class="amount">${formatCurrency(
                      calculateTotalIncome(currentMonthData)
                    )}</td>
                    <td class="amount">${formatCurrency(
                      calculateTotalIncome(yearToDateData)
                    )}</td>
                </tr>
                <tr class="total-row">
                    <td>Total Expense</td>
                    <td>-</td>
                    <td class="amount">${formatCurrency(
                      calculateTotalExpense(currentMonthData)
                    )}</td>
                    <td class="amount">${formatCurrency(
                      calculateTotalExpense(yearToDateData)
                    )}</td>
                </tr>
                <tr class="total-row">
                    <td>Surplus/Deficit</td>
                    <td>-</td>
                    <td class="amount">${formatCurrency(
                      calculateSurplus(currentMonthData)
                    )}</td>
                    <td class="amount">${formatCurrency(
                      calculateSurplus(yearToDateData)
                    )}</td>
                </tr>
            </tbody>
        </table>
    </body>
    </html>
  `;

  return htmlContent;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const getCategories = async () => {
  const categories = await prisma.account.findMany({});
  return categories.map((category) => ({
    key: category.title,
    title: category.title,
  }));
};

export const generateIncomeRows = async (currentMonthData, yearToDateData) => {
  const incomeCategories = await getCategories();

  const html = incomeCategories
    .map((category) => {
      const currentMonth = currentMonthData.find(
        (d) => d.accountType === "credit" && d.Account?.title === category.key
      );
      const yearToDate = yearToDateData.find(
        (d) => d.accountType === "credit" && d.Account?.title === category.key
      );
      if (yearToDate) {
        return `
          <tr>
            <td>${category.title}</td>
            <td>-</td>
            <td class="amount">${formatCurrency(
              currentMonth?._sum?.amount || 0
            )}</td>
            <td class="amount">${formatCurrency(
              yearToDate?._sum?.amount || 0
            )}</td>
          </tr>
        `;
      }
    })
    .join("");

  return html;
};

export const generateExpenseRows = async (currentMonthData, yearToDateData) => {
  const expenseCategories = await getCategories();

  const html = expenseCategories
    .map((category) => {
      const currentMonth = currentMonthData.find(
        (d) => d.accountType === "debit" && d.Account?.title === category.key
      );
      const yearToDate = yearToDateData.find(
        (d) => d.accountType === "debit" && d.Account?.title === category.key
      );
      if (yearToDate) {
        return `
        <tr>
          <td>${category.title}</td>
          <td>-</td>
          <td class="amount">${formatCurrency(
            currentMonth?._sum?.amount || 0
          )}</td>
          <td class="amount">${formatCurrency(
            yearToDate?._sum?.amount || 0
          )}</td>
        </tr>
      `;
      }
    })
    .join("");

  return html;
};

export const calculateTotalIncome = (data) => {
  return data
    .filter((d) => d.accountType === "credit")
    .reduce((sum, item) => sum + (item._sum?.amount || 0), 0);
};

export const calculateTotalExpense = (data) => {
  return data
    .filter((d) => d.accountType === "debit")
    .reduce((sum, item) => sum + (item._sum?.amount || 0), 0);
};

export const calculateSurplus = (data) => {
  const totalIncome = calculateTotalIncome(data);
  const totalExpense = calculateTotalExpense(data);
  return totalIncome - totalExpense;
};
