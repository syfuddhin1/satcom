import prisma from "@/prisma/db";
import { startOfDay, endOfDay, subDays, format } from "date-fns";

export async function GET(request, { params }) {
  const searchParams = new URL(request.url).searchParams;
  const date = searchParams.get("date");
  const data = await getDailyCashbook(date);
  return new Response(data, {
    status: 200,
    headers: {
      "Content-Type": "html",
    },
  });
}

async function getDailyCashbook(date, res) {
  const previousDay = subDays(date, 1);

  // Separate cash and bank opening balances
  const previousVouchers = await prisma.voucher.groupBy({
    by: ["moodOfPayment", "accountType"],
    where: {
      createdAt: {
        lt: startOfDay(date),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const openingBalances = {
    cash: 0,
    bank: 0,
  };

  for (const voucher of previousVouchers) {
    console.log(openingBalances.cash);
    console.log(voucher);
    if (voucher.moodOfPayment === "cash") {
      openingBalances.cash +=
        voucher._sum.amount * (voucher.accountType === "debit" ? -1 : 1);
    } else if (voucher.moodOfPayment === "bank") {
      openingBalances.bank +=
        voucher._sum.amount * (voucher.accountType === "debit" ? -1 : 1);
    }
  }

  const vouchers = await prisma.voucher.findMany({
    where: {
      createdAt: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
    include: {
      Account: true,
      Transaction: true,
      User: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Calculate running balances
  let runningCashBalance = openingBalances.cash;
  let runningBankBalance = openingBalances.bank;

  const vouchersWithBalance = vouchers.map((entry) => {
    if (entry.moodOfPayment === "cash") {
      if (entry.accountType === "debit") {
        runningCashBalance -= entry.amount;
      } else {
        runningCashBalance += entry.amount;
      }
    } else if (entry.moodOfPayment === "bank") {
      if (entry.accountType === "debit") {
        runningBankBalance -= entry.amount;
      } else {
        runningBankBalance += entry.amount;
      }
    }

    return {
      ...entry,
      runningCashBalance,
      runningBankBalance,
    };
  });
  console.log(vouchersWithBalance);

  const totalCash = vouchersWithBalance
    .filter((entry) => entry.moodOfPayment === "cash")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const totalBank = vouchersWithBalance
    .filter((entry) => entry.moodOfPayment === "bank")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const closingBalances = {
    cash: runningCashBalance,
    bank: runningBankBalance,
    total: runningCashBalance + runningBankBalance,
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cashbook Report</title>
        <style>
            :root {
                --primary-color: #2563eb;
                --secondary-color: #1e40af;
                --background-color: #f8fafc;
                --text-color: #1e293b;
            }
            
            body {
                font-family: 'Segoe UI', system-ui, sans-serif;
                line-height: 1.6;
                color: var(--text-color);
                background: var(--background-color);
                margin: 2rem;
            }
            
            .container {
                margin: 0 auto;
                background: white;
                padding: 2rem;
                border-radius: 10px;
                box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            }
            
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #e2e8f0;
            }
            
            .balance-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            }
            
            .balance-card {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgb(0 0 0 / 0.05);
                border: 1px solid #e2e8f0;
            }
            
            table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                margin-top: 1rem;
                border-radius: 8px;
                overflow: hidden;
            }
            
            th {
                background: var(--primary-color);
                color: white;
                font-weight: 500;
                padding: 1rem;
                text-align: left;
            }
            
            td {
                padding: 1rem;
                border-bottom: 1px solid #e2e8f0;
                background: white;
            }
            
            tr:hover td {
                background: #f1f5f9;
            }
            
            .amount {
                font-family: monospace;
                font-weight: 600;
            }
            
            .credit { color: #16a34a; }
            .debit { color: #dc2626; }
            
            .summary {
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 2px solid #e2e8f0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Cashbook Report</h2>
                <div>${format(date, "dd MMMM yyyy")}</div>
            </div>
            
            <div class="balance-cards">
                <div class="balance-card">
                    <h3>Opening Cash Balance</h3>
                    <div class="amount">${formatCurrency(
                      openingBalances.cash
                    )}</div>
                </div>
                <div class="balance-card">
                    <h3>Opening Bank Balance</h3>
                    <div class="amount">${formatCurrency(
                      openingBalances.bank
                    )}</div>
                </div>
                <div class="balance-card">
                    <h3>Total Opening Balance</h3>
                    <div class="amount">${formatCurrency(
                      openingBalances.cash + openingBalances.bank
                    )}</div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Voucher ID</th>
                        <th>Account</th>
                        <th>Type</th>
                        <th>Cash</th>
                        <th>Bank</th>
                        <th>Cash Balance</th>
                        <th>Bank Balance</th>
                    </tr>
                </thead>
                <tbody>
                    ${vouchersWithBalance
                      .map(
                        (entry) => `
                        <tr>
                            <td>${format(entry.createdAt, "HH:mm")}</td>
                            <td>${entry.voucherId}</td>
                            <td>${entry.Account?.title || "N/A"}</td>
                            <td>${entry.accountType}</td>
                            <td class="amount ${
                              entry.moodOfPayment === "cash"
                                ? entry.accountType
                                : ""
                            }">${
                          entry.moodOfPayment === "cash"
                            ? formatCurrency(entry.amount)
                            : "-"
                        }</td>
                            <td class="amount ${
                              entry.moodOfPayment === "bank"
                                ? entry.accountType
                                : ""
                            }">${
                          entry.moodOfPayment === "bank"
                            ? formatCurrency(entry.amount)
                            : "-"
                        }</td>
                            <td class="amount">${formatCurrency(
                              entry.runningCashBalance
                            )}</td>
                            <td class="amount">${formatCurrency(
                              entry.runningBankBalance
                            )}</td>
                        </tr>
                    `
                      )
                      .join("")}
                    <tr style="font-weight: 600; background: blue;">
                        <td colspan="3"></td>
                        <td>Total</td>
                        <td class="amount">${formatCurrency(totalCash)}</td>
                        <td class="amount">${formatCurrency(totalBank)}</td>
                        <td class="amount"></td>
                        <td class="amount"></td>
                    </tr>
                </tbody>
            </table>

            <div class="summary">
                <div class="balance-cards">
                    <div class="balance-card">
                        <h3>Closing Cash Balance</h3>
                        <div class="amount">${formatCurrency(
                          closingBalances.cash
                        )}</div>
                    </div>
                    <div class="balance-card">
                        <h3>Closing Bank Balance</h3>
                        <div class="amount">${formatCurrency(
                          closingBalances.bank
                        )}</div>
                    </div>
                    <div class="balance-card">
                        <h3>Total Closing Balance</h3>
                        <div class="amount">${formatCurrency(
                          closingBalances.total
                        )}</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

  return htmlContent;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(amount);
}
