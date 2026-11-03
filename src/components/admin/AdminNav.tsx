"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/layout/Wordmark";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/agendamentos", label: "Agendamentos" },
  { href: "/admin/servicos", label: "Serviços" },
  { href: "/admin/barbeiros", label: "Barbeiros" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/configuracoes", label: "Configurações" },
];

function useActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const isActive = useActive();

  return (
    <nav aria-label="Navegação do painel" className="flex flex-col gap-0.5">
      {LINKS.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
              active
                ? "bg-white/10 text-bone"
                : "text-bone/60 hover:bg-white/5 hover:text-bone",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-4 w-px transition-colors",
                active ? "bg-clay-400" : "bg-white/20",
              )}
            />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  return (
    <aside className="dark-section fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-line-dark bg-ink p-5 lg:flex">
      <div className="px-3 py-2">
        <Wordmark tone="dark" href="/admin" />
        <p className="mt-1 text-[0.6875rem] tracking-[0.12em] text-muted-dark uppercase">
          Painel
        </p>
      </div>

      <div className="mt-8 flex-1">
        <NavList />
      </div>

      <div className="rounded-xl border border-line-dark p-4">
        <p className="text-xs text-muted-dark">Unidade</p>
        <p className="mt-1 text-sm text-bone">Jardins — São Paulo</p>
        <Link
          href="/"
          className="mt-4 inline-flex text-xs text-bone/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-bone"
        >
          Ver site público
        </Link>
      </div>
    </aside>
  );
}

export function AdminTopbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="dark-section sticky top-0 z-40 border-b border-line-dark bg-ink lg:hidden">
      <div className="flex h-16 items-center justify-between gap-4 px-5">
        <Wordmark tone="dark" href="/admin" />
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-bone transition-colors hover:bg-white/10"
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

      {open ? (
        <div id="admin-nav" className="border-t border-line-dark px-4 pt-3 pb-5">
          <NavList onNavigate={() => setOpen(false)} />
          <Link
            href="/"
            className="mt-4 inline-flex px-3 text-xs text-bone/70 underline decoration-white/25 underline-offset-4"
          >
            Ver site público
          </Link>
        </div>
      ) : null}
    </div>
  );
}
