import AuthProvider from "@/provider/Authprovider";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/segments/Navbar";
import { getServerSession } from "next-auth";
import { AuthOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Connect App",
  description: "Connect with People",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(AuthOptions);
  //console.log(session)
  if (!session) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <main className="max-w-screen min-h-screen bg-slate-100 p-2">
              <Navbar session={session} />
              <div className="mt-[60px]">{children}</div>
            </main>
          </AuthProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
