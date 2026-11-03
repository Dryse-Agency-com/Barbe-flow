import { BarberCard } from "@/components/cards/BarberCard";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { BarbershopSection } from "@/components/marketing/BarbershopSection";
import { CtaBand } from "@/components/marketing/CtaBand";
import { GalleryPreview } from "@/components/gallery/GalleryPreview";
import { Hero } from "@/components/marketing/Hero";
import { ReviewsSection } from "@/components/marketing/ReviewsSection";
import { ValueProps } from "@/components/marketing/ValueProps";
import { VisitSection } from "@/components/marketing/VisitSection";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBarbers, getFeaturedServices } from "@/lib/data";

export default function HomePage() {
  const services = getFeaturedServices();
  const barbers = getBarbers();

  return (
    <>
      <Hero />

      <section className="bg-bone">
        <div className="shell py-20 sm:py-24">
          <SectionHeading
            eyebrow="Serviços"
            title="O essencial, bem executado."
            description="Preços fechados e duração real de cada atendimento — sem surpresa na hora de pagar."
            action={
              <Button href="/servicos" variant="secondary" size="sm">
                Ver todos os serviços
              </Button>
            }
          />

          <div className="mt-12 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                href={`/agendar?servico=${service.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-bone-200/60">
        <div className="shell py-20 sm:py-24">
          <SectionHeading
            eyebrow="Equipe"
            title="Três profissionais, estilos distintos."
            description="Escolha quem combina com o corte que você quer — ou deixe com o primeiro horário livre."
            action={
              <Button href="/barbeiros" variant="secondary" size="sm">
                Conhecer a equipe
              </Button>
            }
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {barbers.map((barber, index) => (
              <BarberCard key={barber.id} barber={barber} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <BarbershopSection />
      <GalleryPreview />
      <ValueProps />
      <ReviewsSection />
      <VisitSection />
      <CtaBand />
    </>
  );
}
