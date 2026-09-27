import Link from "next/link";

import { PageShell } from "@/components/page-shell";

const routes = [
  { href: "/discover", label: "Discover" },
  { href: "/search", label: "Search" },
  { href: "/favorites", label: "Favorites" },
  { href: "/account", label: "Account" },
  { href: "/admin", label: "Admin" },
];

export default function HomePage() {
  return (
    <PageShell
      title="Curated product discovery"
      description="Sprint 0 foundation for GoodStash. Core routes and platform modules are in place for future Phase 1 feature delivery."
    >
      <nav className="grid gap-3 sm:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="rounded-lg border border-primary/20 bg-surface px-4 py-3 font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5"
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </PageShell>
  );
}
