"use client";

import { usePathname } from "next/navigation";

export function AppFooter() {
  const path = usePathname();
  if (path.startsWith("/gallery")) return null;
  return (
    <footer className="px-4 pb-6 md:px-8">
      <p className="mx-auto max-w-[1400px] text-right text-[10px] uppercase tracking-[0.18em] text-ink/45">
        All rights reserved
      </p>
    </footer>
  );
}
