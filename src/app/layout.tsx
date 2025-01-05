import type { Metadata } from "next";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthWrapper } from "./context/AuthContext";
export const metadata: Metadata = {
  title: "Incard Assessment",
  description: "James Diffey - front-end assessment submission",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
