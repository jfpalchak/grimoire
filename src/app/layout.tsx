import type { Metadata } from "next";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

import Navbar from "@/components/ui/navbar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/utils/cn";
import { MainNav } from "@/components/ui/main-nav";

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
      <body className={cn(inter.className)}>
        {/* <Navbar /> */}
        <MainNav />
        <main>
          {children}
        </main>
        <TailwindIndicator />
      </body>
    </html>
  );
}
