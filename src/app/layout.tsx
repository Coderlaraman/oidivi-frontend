import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OiDiVi Helper",
  description: "OiDiVi Helper Home Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
