import Image from "next/image";
import { BUSINESS } from "@/lib/data";

export function VisitSection() {
  return (
    <section id="visita" className="border-t border-line bg-bone-200/60 scroll-mt-20">
      <div className="shell py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-ink-800 sm:aspect-[16/10] lg:aspect-[4/3]">
            <Image
              src="/images/detail.jpg"
              alt="Ferramentas de barbearia sobre bancada de pedra"
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-md">
            <p className="eyebrow text-clay">A barbearia</p>
            <h2 className="mt-5 font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
              Um espaço calmo para um corte bem feito.
            </h2>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              Quatro cadeiras, atendimento por horário marcado e tempo real reservado
              para cada serviço. Sem fila, sem pressa, sem barulho.
            </p>

            <dl className="mt-10 space-y-5 border-t border-line pt-6">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-sm text-muted">Endereço</dt>
                <dd className="text-right text-sm font-medium text-ink">
                  {BUSINESS.address}
                </dd>
              </div>
              {BUSINESS.hours.map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-baseline justify-between gap-6"
                >
                  <dt className="text-sm text-muted">{entry.label}</dt>
                  <dd className="text-sm font-medium text-ink">{entry.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-sm text-muted">Contato</dt>
                <dd className="text-sm font-medium text-ink">
                  <a
                    href={`tel:${BUSINESS.phoneDigits}`}
                    className="underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {BUSINESS.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
