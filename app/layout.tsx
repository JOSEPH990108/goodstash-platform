import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getBrandConfig } from "@/lib/brand";

import "./globals.css";

export function generateMetadata(): Metadata {
  const brand = getBrandConfig();

  return {
    title: `${brand.name} Platform`,
    description: `${brand.name} is a curated product discovery and recommendation platform.`,
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
