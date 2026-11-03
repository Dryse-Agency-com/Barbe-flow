import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/CtaBand";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Galeria de cortes",
  description:
    "Cortes e barbas feitos na BarberFlow Jardins. Veja trabalhos reais e agende com o profissional que fez.",
};

export default function GalleryPage() {
  const items = getGallery();

  return (
    <>
      <section className="border-b border-line bg-bone">
        <div className="shell pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-clay">Galeria</p>
            <h1 className="mt-5 font-display text-[clamp(2.25rem,8vw,4rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-ink">
              O trabalho fala antes da gente.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Cada registro mostra o serviço, o cliente e o profissional responsável.
              Viu um corte que gostou? Agende direto com quem fez.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bone">
        <div className="shell py-10 sm:py-14">
          <GalleryGrid items={items} />
        </div>
      </section>

      <CtaBand
        title="Quer um corte assim?"
        description="Escolha o serviço e o profissional. A agenda abre na hora."
      />
    </>
  );
}
