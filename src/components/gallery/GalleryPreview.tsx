import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getGallery } from "@/lib/gallery";

/** Nine uniform tiles, using the same layout as the standalone gallery. */
export function GalleryPreview() {
  const items = getGallery().slice(0, 9);

  return (
    <section
      id="galeria-trabalhos"
      aria-label="Galeria de trabalhos"
      className="border-t border-line bg-bone scroll-mt-20"
    >
      <div className="shell py-20 sm:py-24">
        <SectionHeading
          eyebrow="Galeria"
          title="Cortes que saíram da nossa cadeira."
          description="Trabalhos reais de clientes da unidade Jardins, publicados ao longo dos últimos meses."
          action={
            <Button href="/galeria" variant="secondary" size="sm">
              Ver galeria completa
            </Button>
          }
        />

        <div className="mt-10 sm:mt-12">
          <GalleryGrid items={items} withFilters={false} priorityImages={0} />
        </div>
      </div>
    </section>
  );
}
