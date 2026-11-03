import Image from "next/image";
import type { Metadata } from "next";
import { AdminPageHeader, Panel } from "@/components/admin/AdminPage";
import { SpecialtyList } from "@/components/cards/BarberCard";
import { getBarbers } from "@/lib/data";

export const metadata: Metadata = { title: "Barbeiros" };

export default function AdminBarbersPage() {
  const barbers = getBarbers();

  return (
    <>
      <AdminPageHeader
        title="Barbeiros"
        description="Equipe disponível para agendamento na unidade Jardins."
      />

      <Panel title={`${barbers.length} profissionais ativos`} padded={false}>
        <ul>
          {barbers.map((barber, index) => (
            <li
              key={barber.id}
              className={`flex items-start gap-4 px-5 py-4 ${
                index > 0 ? "border-t border-line" : ""
              }`}
            >
              <span className="relative size-12 shrink-0 overflow-hidden rounded-full bg-bone-300">
                <Image
                  src={barber.image}
                  alt=""
                  fill
                  sizes="48px"
                  loading="lazy"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{barber.name}</p>
                <p className="mt-0.5 text-xs text-muted">{barber.role}</p>
                <div className="mt-3">
                  <SpecialtyList specialties={barber.specialties} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
