import type { Metadata } from "next";
import "./globals.css";
import { AuthWrapper } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Incard Assessment",
  description: "James Diffey - front-end assessment submission",
};

const bodyClasses = "h-[100vh] flex flex-col bg-black text-white";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bodyClasses}>
        <AuthWrapper>
          <section className="h-full flex flex-col justify-center items-center">
            {children}
          </section>
        </AuthWrapper>
      </body>
    </html>
  );
}
