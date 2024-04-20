import type { Metadata } from "next";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

import Navbar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "Grimoire",
  description: "A D&D companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
