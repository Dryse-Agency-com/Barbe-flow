import { AdminPageHeader, Panel, StatCard } from "@/components/admin/AdminPage";
import { AppointmentList } from "@/components/admin/AppointmentList";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAgendaForDay, getDashboardStats, getUpcomingAgenda } from "@/lib/admin-data";
import { formatDateLong, formatPrice } from "@/lib/format";
import { todayISO } from "@/lib/date";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = todayISO();
  const [stats, todayEntries, upcoming] = await Promise.all([
    getDashboardStats(),
    getAgendaForDay(today),
    getUpcomingAgenda(7),
  ]);

  const nextDays = upcoming.filter((entry) => entry.date > today).slice(0, 6);

  return (
    <>
      <AdminPageHeader
        title="Visão geral"
        description={`Hoje, ${formatDateLong(today)}.`}
        action={
          <Button href="/agendar" size="sm" variant="secondary">
            Novo agendamento
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Agendamentos hoje"
          value={String(stats.today)}
          hint={
            stats.nextEntry
              ? `Próximo às ${stats.nextEntry.time} — ${stats.nextEntry.customerName}`
              : "Nenhum horário restante hoje"
          }
        />
        <StatCard
          label="Próximos 7 dias"
          value={String(stats.upcoming)}
          hint="Agendamentos confirmados e pendentes"
        />
        <StatCard
          label="Receita estimada"
          value={formatPrice(stats.revenueCents)}
          hint="Baseada na agenda de hoje"
        />
        <StatCard
          label="Barbeiros ativos"
          value={String(stats.activeBarbers)}
          hint="Equipe disponível na unidade"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel
          title="Agenda de hoje"
          padded={false}
          action={
            <a
              href="/admin/agenda"
              className="text-xs text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
            >
              Abrir agenda
            </a>
          }
        >
          {todayEntries.length === 0 ? (
            <div className="p-5">
              <EmptyState
                title="Nenhum atendimento hoje"
                description="A unidade está fechada ou ainda não há reservas para o dia."
              />
            </div>
          ) : (
            <AppointmentList entries={todayEntries} />
          )}
        </Panel>

        <Panel title="Próximos dias" padded={false}>
          {nextDays.length === 0 ? (
            <div className="p-5">
              <EmptyState title="Agenda livre" description="Sem reservas futuras." />
            </div>
          ) : (
            <AppointmentList entries={nextDays} showDate />
          )}
        </Panel>
      </div>
    </>
  );
}
