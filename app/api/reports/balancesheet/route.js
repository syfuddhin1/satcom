import prisma from "@/prisma/db";
import { startOfMonth, endOfMonth, format, endOfDay } from "date-fns";

export async function GET(request, { params }) {
  const searchParams = new URL(request.url).searchParams;
  const date = searchParams.get("date");
  const data = await generateBalanceSheet(new Date(date));
  return Response.json(data);
}

export async function generateBalanceSheet(asOfDate) {
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
