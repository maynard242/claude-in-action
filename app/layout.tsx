import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Claude in Action — Six Use Cases in 75 Minutes",
  description:
    "A live demo for working professionals. Six AI capabilities, each more sophisticated than the last — ending with you building your own agent.",
  openGraph: {
    title: "Claude in Action — Six Use Cases in 75 Minutes",
    description:
      "A live demo for working professionals. Six AI capabilities, each more sophisticated than the last.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
