import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ServiceCatalog } from "@/components/marketing/ServiceCatalog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Corte, barba, acabamento e sobrancelha. Preço fechado e duração real de cada serviço da BarberFlow.",
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <section className="border-b border-line bg-bone">
        <div className="shell pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-clay">Serviços</p>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,8vw,4rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-ink">
              Tabela clara, tempo reservado.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Cada serviço tem duração própria na agenda. Você escolhe, a gente reserva
              exatamente o tempo necessário.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bone">
        <div className="shell py-10 sm:py-14">
          {services.length === 0 ? (
            <EmptyState
              title="Nenhum serviço disponível"
              description="A tabela de serviços está em atualização. Fale com a gente para agendar."
              action={<Button href="/agendar">Agendar horário</Button>}
            />
          ) : (
            <ServiceCatalog services={services} />
          )}
        </div>
      </section>

      <CtaBand
        title="Escolheu o serviço?"
        description="Siga para a agenda e garanta o melhor horário da semana."
      />
    </>
  );
}
