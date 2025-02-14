import { auth } from "@/auth";
import SideBar from "@/components/nav/Nav";
import TopBar from "@/components/nav/TopBar";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import "@/app/globals.css";
import ReduxProvider from "./ReduxProvider";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "SAT Communication",
  description: "Connect the world with sat communication",
};

export default async function RootLayout({ children, modal }) {
  const session = await auth();

  if (!session) redirect("/login");
  return (
    <html lang="en" className={poppins.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SessionProvider>
          <ReduxProvider>
            <div className="flex h-screen w-[100vw] overflow-hidden ">
              <SideBar />
              <main className="w-full flex flex-col justify-between ">
                <TopBar />
                <div className="p-2 h-full overflow-y-auto relative">
                  {children}
                  {modal}
                </div>
                {/* <footer className="text-right pr-10 border-t p-4 capitalize">
                made by
                <Link href="https://github.com/soab42" target="_blank">
                  @soab42
                </Link>
              </footer> */}
              </main>
            </div>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
