import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthWrapper } from "./context/AuthContext";
import { EXPIRY_MINUTES } from "@/utils/helpers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Incard Assessment",
  description: "James Diffey - front-end assessment submission",
};

const bodyClasses = "h-[100vh] flex flex-col justify-between bg-blue-200";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bodyClasses}>
        <Header />
        <AuthWrapper>
          <section>
            {children}
            <p className="text-center text-gray-600 mt-2">
              In this app your login session expires after {EXPIRY_MINUTES}{" "}
              minute(s).
            </p>
          </section>
        </AuthWrapper>
      </body>
    </html>
  );
}
