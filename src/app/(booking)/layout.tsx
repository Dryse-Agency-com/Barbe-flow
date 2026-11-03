import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BUSINESS } from "@/lib/data";

/**
 * Focused shell for the booking flow: same header, no marketing footer, so the
 * sticky action bar on mobile is never competing with other content.
 */
export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-bone">
      <SiteHeader />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <footer className="hidden border-t border-line bg-bone lg:block">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} BarberFlow · {BUSINESS.shortAddress}
          </p>
          <Link
            href="/"
            className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
          >
            Voltar para o site
          </Link>
        </div>
      </footer>
    </div>
  );
}
