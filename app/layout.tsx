import type { Metadata } from "next";
import "./globals.css";
import { robotoMono } from "./fonts";

export const metadata: Metadata = {
  title: "Cash Flow",
  description: "A Web Application focused on managing your financial cash flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>{children}</body>
    </html>
  );
}
