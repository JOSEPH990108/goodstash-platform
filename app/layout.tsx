import type { Metadata } from "next";

import { getBrandConfig } from "@/lib/brand";

import "./globals.css";

const brand = getBrandConfig();

export const metadata: Metadata = {
  title: `${brand.name} Platform`,
  description: `${brand.name} is a curated product discovery and recommendation platform.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
