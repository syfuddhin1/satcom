import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "@/app/globals.css";
export default async function RootLayout({ children }) {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <div className="flex h-screen w-[100vw] overflow-hidden items-center justify-center ">
          {children}
        </div>
      </body>
    </html>
  );
}
