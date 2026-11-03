import type { Metadata } from "next";
import { BarberCard } from "@/components/cards/BarberCard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getBarbers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Barbeiros",
  description:
    "Conheça os profissionais da BarberFlow e agende diretamente com quem combina com o seu estilo.",
};

export default function BarbersPage() {
  const barbers = getBarbers();

  return (
    <>
      <section className="border-b border-line bg-bone">
        <div className="shell pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-clay">Equipe</p>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,8vw,4rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-ink">
              Quem vai cuidar do seu corte.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Profissionais com especialidades definidas. Agende com quem você já
              conhece ou experimente um novo olhar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bone">
        <div className="shell py-12 sm:py-16">
          {barbers.length === 0 ? (
            <EmptyState
              title="Equipe em atualização"
              description="Estamos ajustando a agenda dos profissionais. Tente novamente em instantes."
              action={<Button href="/agendar">Agendar horário</Button>}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {barbers.map((barber, index) => (
                <BarberCard key={barber.id} barber={barber} priority={index < 2} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title="Sem preferência de barbeiro?"
        description="Escolha “qualquer profissional” e pegue o primeiro horário livre da agenda."
      />
    </>
  );
}
