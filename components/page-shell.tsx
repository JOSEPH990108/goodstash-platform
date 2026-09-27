import type { ReactNode } from "react";

import { getBrandConfig } from "@/lib/brand";

type PageShellProps = {
  children?: ReactNode;
  description: string;
  title: string;
};

export function PageShell({ children, description, title }: PageShellProps) {
  const brand = getBrandConfig();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">{brand.name}</p>
        <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
        <p className="max-w-2xl text-foreground/80">{description}</p>
      </header>
      {children}
    </main>
  );
}
