import type { Metadata } from "next";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { MainNav } from "@/components/ui/main-nav";
import { cn } from "@/utils/cn";
import { inter } from "@/styles/fonts";
import "@/styles/globals.css";

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
        <MainNav />
        <main>
          {children}
        </main>
        <TailwindIndicator />
      </body>
    </html>
  );
}
