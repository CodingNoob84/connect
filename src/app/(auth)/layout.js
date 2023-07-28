import AuthProvider from "@/provider/Authprovider";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";

export default async function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
