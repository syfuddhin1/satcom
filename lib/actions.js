"use server";

import prisma from "@/prisma/db";

export const generateVoucherCode = async (date, accountType) => {
  "use server";
  let type;

  if (accountType === "receipt") type = "credit";
  if (accountType === "payment") type = "debit";

  // Generate voucher ID
  const voucherCount = await prisma.voucher.count({
    where: { createdAt: new Date(date) },
  });
  const voucherId = `${type}${date}${(voucherCount + 1)
    .toString()
    .padStart(3, "0")}`;
  return voucherId;
};
