"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/Wordmark";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/servicos", label: "Serviços" },
  { href: "/barbeiros", label: "Barbeiros" },
  { href: "/galeria", label: "Galeria" },
  { href: "/#avaliacoes", label: "Avaliações" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-18">
        <Wordmark />

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm transition-colors",
                isActive(item.href)
                  ? "text-ink"
                  : "text-muted hover:bg-bone-300/60 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/agendar" size="sm">
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agendar horário</span>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-bone-300/70 md:hidden"
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3.5 8h17M3.5 16h17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col border-t border-line bg-bone px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <nav aria-label="Navegação principal" className="flex flex-col">
            {[{ href: "/", label: "Início" }, ...NAV].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line py-4 font-display text-2xl font-medium tracking-[-0.03em] text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4 pt-8">
            <Button href="/agendar" size="lg" fullWidth>
              Agendar horário
            </Button>
            <p className="text-center text-xs text-muted">
              Jardins, São Paulo · Seg a sáb
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
