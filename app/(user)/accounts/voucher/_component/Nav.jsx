"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VoucherNav() {
  const pathName = usePathname().slice(1);
  return (
    <div
      className={
        " flex gap-4 text-white justify-center border-y border-black p-2"
      }
    >
      <Link
        className={`p-2 px-4 rounded ${
          pathName === "accounts/voucher/receipt"
            ? "bg-[#9096ff]"
            : "bg-gray-400"
        }`}
        href={"/accounts/voucher/receipt"}
      >
        Receipt Voucher
      </Link>
      <Link
        className={`p-2 px-4 rounded ${
          pathName === "accounts/voucher/payment"
            ? "bg-[#9096ff]"
            : "bg-gray-400"
        }`}
        href={"/accounts/voucher/payment"}
      >
        Payment Voucher
      </Link>
    </div>
  );
}
