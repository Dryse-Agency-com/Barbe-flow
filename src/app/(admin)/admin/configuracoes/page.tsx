import type { Metadata } from "next";
import { AdminPageHeader, Panel } from "@/components/admin/AdminPage";
import { BUSINESS } from "@/lib/data";
import { BOOKING_WINDOW_DAYS, MIN_LEAD_MINUTES, SLOT_INTERVAL_MINUTES } from "@/lib/availability";

export const metadata: Metadata = { title: "Configurações" };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-line py-3 first:border-0 first:pt-0 last:pb-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader
        title="Configurações"
        description="Parâmetros atuais da unidade e da agenda pública."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Unidade">
          <dl>
            <Row label="Nome" value={BUSINESS.name} />
            <Row label="Endereço" value={BUSINESS.address} />
            <Row label="Telefone" value={BUSINESS.phone} />
            <Row label="E-mail" value={BUSINESS.email} />
          </dl>
        </Panel>

        <Panel title="Horário de funcionamento">
          <dl>
            {BUSINESS.hours.map((entry) => (
              <Row key={entry.label} label={entry.label} value={entry.value} />
            ))}
          </dl>
        </Panel>

        <Panel title="Regras da agenda">
          <dl>
            <Row label="Intervalo entre horários" value={`${SLOT_INTERVAL_MINUTES} min`} />
            <Row label="Antecedência mínima" value={`${MIN_LEAD_MINUTES} min`} />
            <Row label="Janela de agendamento" value={`${BOOKING_WINDOW_DAYS} dias`} />
            <Row label="Intervalo da equipe" value="12:30 — 13:30" />
          </dl>
        </Panel>

        <Panel title="Política de cancelamento">
          <p className="text-sm leading-relaxed text-muted">
            Cancelamentos e remarcações são aceitos até 2 horas antes do horário
            reservado. Após esse prazo, o horário é mantido na agenda do profissional.
          </p>
        </Panel>
      </div>
    </>
  );
}
