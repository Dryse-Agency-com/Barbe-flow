import Link from "next/link";
import { BUSINESS } from "@/lib/data";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/barbeiros", label: "Barbeiros" },
  { href: "/galeria", label: "Galeria" },
  { href: "/#avaliacoes", label: "Avaliações" },
  { href: "/agendar", label: "Agendar horário" },
];

export function SiteFooter() {
  return (
    <footer id="contato" className="dark-section bg-ink text-bone">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <p className="font-display text-lg font-semibold tracking-[-0.04em]">
              BarberFlow<span className="text-clay-400">.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-dark">
              Barbearia moderna no Jardins. Agendamento direto, horário respeitado,
              acabamento impecável.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="eyebrow text-muted-dark">Navegação</h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-bone/80 transition-colors hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-muted-dark">Contato</h2>
            <ul className="mt-5 space-y-3 text-sm text-bone/80">
              <li className="max-w-[16rem] leading-relaxed">{BUSINESS.address}</li>
              <li>
                <a
                  href={`tel:${BUSINESS.phoneDigits}`}
                  className="transition-colors hover:text-bone"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="transition-colors hover:text-bone"
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-muted-dark">Horários</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {BUSINESS.hours.map((entry) => (
                <li key={entry.label} className="flex justify-between gap-4 sm:block">
                  <span className="text-bone/80">{entry.label}</span>
                  <span className="text-muted-dark sm:block">{entry.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-dark">
            © {new Date().getFullYear()} BarberFlow. Todos os direitos reservados.
          </p>
          <ul className="flex items-center gap-6">
            {BUSINESS.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="text-xs tracking-[0.04em] text-bone/70 uppercase transition-colors hover:text-bone"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
