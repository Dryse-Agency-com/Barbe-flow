import Image from "next/image";
import type { Metadata } from "next";
import { AdminPageHeader, Panel } from "@/components/admin/AdminPage";
import { getServices } from "@/lib/data";
import { formatDuration, formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Serviços" };

export default function AdminServicesPage() {
  const services = getServices();

  return (
    <>
      <AdminPageHeader
        title="Serviços"
        description="Catálogo usado pela agenda pública. Cada serviço reserva seu tempo real."
      />

      <Panel title={`${services.length} serviços ativos`} padded={false}>
        <ul>
          {services.map((service, index) => (
            <li
              key={service.id}
              className={`flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 ${
                index > 0 ? "border-t border-line" : ""
              }`}
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-bone-300 sm:size-16">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="64px"
                  loading="lazy"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{service.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted">
                  {service.description}
                </p>
              </div>
              <span className="w-20 text-sm text-muted tabular-nums">
                {formatDuration(service.durationMinutes)}
              </span>
              <span className="w-20 text-right text-sm font-medium text-ink tabular-nums">
                {formatPrice(service.priceCents)}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
