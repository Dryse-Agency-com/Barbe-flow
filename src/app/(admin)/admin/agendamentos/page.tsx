import type { Metadata } from "next";
import { AdminPageHeader, Panel } from "@/components/admin/AdminPage";
import { AppointmentList } from "@/components/admin/AppointmentList";
import { EmptyState } from "@/components/ui/EmptyState";
import { getUpcomingAgenda } from "@/lib/admin-data";
import { formatDateLong, formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Agendamentos" };
export const dynamic = "force-dynamic";

export default async function AdminAppointmentsPage() {
  const entries = await getUpcomingAgenda(14);

  const grouped = entries.reduce<Record<string, typeof entries>>((groups, entry) => {
    (groups[entry.date] ??= []).push(entry);
    return groups;
  }, {});

  const dates = Object.keys(grouped).sort();
  const total = entries.reduce((sum, entry) => sum + entry.priceCents, 0);

  return (
    <>
      <AdminPageHeader
        title="Agendamentos"
        description={`${entries.length} reservas nos próximos 14 dias · ${formatPrice(total)} previstos.`}
      />

      {dates.length === 0 ? (
        <EmptyState
          title="Nenhum agendamento futuro"
          description="Quando um cliente reservar pelo site, o horário aparece aqui automaticamente."
        />
      ) : (
        <div className="space-y-4">
          {dates.map((date) => (
            <Panel key={date} title={formatDateLong(date)} padded={false}>
              <AppointmentList entries={grouped[date]} />
            </Panel>
          ))}
        </div>
      )}
    </>
  );
}
