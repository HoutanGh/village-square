import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Village Square",
  description:
    "A civic engagement platform prototype for residents and local representatives.",
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
