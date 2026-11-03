import Link from "next/link";
import type { Metadata } from "next";
import { AdminPageHeader, Panel } from "@/components/admin/AdminPage";
import { AppointmentList } from "@/components/admin/AppointmentList";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAgendaForDay } from "@/lib/admin-data";
import { getBarbers } from "@/lib/data";
import { addDaysISO, todayISO } from "@/lib/date";
import {
  formatDateLong,
  formatDayNumber,
  formatWeekdayShort,
  formatPrice,
} from "@/lib/format";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Agenda" };
export const dynamic = "force-dynamic";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export default async function AdminAgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ data?: string }>;
}) {
  const params = await searchParams;
  const today = todayISO();
  const selected =
    params.data && DATE_PATTERN.test(params.data) ? params.data : today;

  const entries = await getAgendaForDay(selected);
  const days = Array.from({ length: 7 }, (_, index) => addDaysISO(today, index));
  const barbers = getBarbers();

  const revenue = entries
    .filter((entry) => entry.status !== "cancelado")
    .reduce((total, entry) => total + entry.priceCents, 0);

  return (
    <>
      <AdminPageHeader
        title="Agenda"
        description="Visão diária dos atendimentos da unidade."
      />

      <div className="scroll-x -mx-5 mb-6 flex gap-2 px-5 sm:mx-0 sm:px-0">
        {days.map((day) => {
          const active = day === selected;
          return (
            <Link
              key={day}
              href={`/admin/agenda?data=${day}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl border px-2 py-2.5 transition-colors",
                active
                  ? "border-ink bg-ink text-bone"
                  : "border-line bg-white text-ink hover:border-ink/30",
              )}
            >
              <span className="text-[0.6875rem] tracking-[0.06em] uppercase opacity-70">
                {day === today ? "hoje" : formatWeekdayShort(day)}
              </span>
              <span className="font-display text-base leading-none font-semibold">
                {formatDayNumber(day)}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel title={formatDateLong(selected)} padded={false}>
          {entries.length === 0 ? (
            <div className="p-5">
              <EmptyState
                title="Sem atendimentos neste dia"
                description="A unidade está fechada ou a agenda ainda está livre."
              />
            </div>
          ) : (
            <AppointmentList entries={entries} />
          )}
        </Panel>

        <div className="space-y-4">
          <Panel title="Resumo do dia">
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Atendimentos</dt>
                <dd className="font-medium text-ink">{entries.length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Receita estimada</dt>
                <dd className="font-medium text-ink">{formatPrice(revenue)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Tempo ocupado</dt>
                <dd className="font-medium text-ink">
                  {Math.round(
                    entries.reduce((total, e) => total + e.durationMinutes, 0) / 60,
                  )}
                  h
                </dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Por profissional">
            <ul className="space-y-3">
              {barbers.map((barber) => {
                const count = entries.filter(
                  (entry) => entry.barberId === barber.id,
                ).length;
                return (
                  <li
                    key={barber.id}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="truncate text-ink">{barber.name}</span>
                    <span className="shrink-0 text-muted tabular-nums">
                      {count} {count === 1 ? "horário" : "horários"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
