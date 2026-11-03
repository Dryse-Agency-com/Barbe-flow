import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmationActions } from "@/components/booking/ConfirmationActions";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getAppointmentByCode } from "@/lib/appointments";
import { BUSINESS, getBarberById, getServiceById } from "@/lib/data";
import { formatDateLong, formatDuration, formatPrice, maskPhone } from "@/lib/format";

export const metadata: Metadata = {
  title: "Agendamento confirmado",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ codigo?: string }>;
}) {
  const { codigo } = await searchParams;
  const appointment = codigo ? await getAppointmentByCode(codigo) : null;

  if (!appointment) {
    return (
      <div className="shell py-20 sm:py-28">
        <EmptyState
          title="Agendamento não encontrado"
          description="O código informado não existe ou o agendamento foi removido. Você pode iniciar um novo agendamento em poucos toques."
          action={<Button href="/agendar">Agendar horário</Button>}
        />
      </div>
    );
  }

  const service = getServiceById(appointment.serviceId);
  const barber = getBarberById(appointment.barberId);

  const rows = [
    { label: "Serviço", value: service?.name ?? appointment.serviceId },
    { label: "Profissional", value: barber?.name ?? appointment.barberId },
    { label: "Data", value: formatDateLong(appointment.date) },
    { label: "Horário", value: appointment.time },
    { label: "Duração", value: formatDuration(appointment.durationMinutes) },
    { label: "Valor", value: formatPrice(appointment.priceCents) },
    { label: "Cliente", value: appointment.customerName },
    { label: "WhatsApp", value: maskPhone(appointment.customerPhone) },
  ];

  return (
    <div className="bg-bone">
      <section className="dark-section bg-ink text-bone">
        <div className="shell py-16 sm:py-20">
          <div className="max-w-2xl">
            <span
              aria-hidden="true"
              className="grid size-12 place-items-center rounded-full border border-clay-400/40 bg-clay/15 text-clay-400"
            >
              <svg viewBox="0 0 20 20" className="size-5">
                <path
                  d="M4 10.5l4 4 8-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <h1 className="mt-7 font-display text-[clamp(2rem,6vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
              Agendamento confirmado.
            </h1>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted-dark">
              Te esperamos {formatDateLong(appointment.date).toLowerCase()}, às{" "}
              {appointment.time}. Chegue com 5 minutos de antecedência.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs tracking-[0.08em] text-bone/85">
                {appointment.code}
              </span>
              <StatusBadge status={appointment.status} />
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <div className="min-w-0">
            <h2 className="eyebrow mb-5 text-muted-soft">Detalhes</h2>
            <dl className="rounded-2xl border border-line bg-white">
              {rows.map((row, index) => (
                <div
                  key={row.label}
                  className={`flex items-baseline justify-between gap-6 px-5 py-4 text-sm sm:px-6 ${
                    index > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="shrink-0 text-muted">{row.label}</dt>
                  <dd className="text-right font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <ConfirmationActions
                code={appointment.code}
                serviceName={service?.name ?? "Atendimento"}
                barberName={barber?.name ?? "nosso time"}
                date={appointment.date}
                time={appointment.time}
                durationMinutes={appointment.durationMinutes}
              />
              <div className="mt-5">
                <Link
                  href="/"
                  className="text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                >
                  Voltar para o início
                </Link>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-line bg-bone-200/70 p-6">
            <h2 className="eyebrow text-muted-soft">Onde nos encontrar</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink">{BUSINESS.address}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {BUSINESS.hours.map((entry) => (
                <li key={entry.label} className="flex justify-between gap-4">
                  <span>{entry.label}</span>
                  <span className="text-ink">{entry.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Precisa remarcar? Fale com a gente pelo WhatsApp com até 2 horas de
              antecedência.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
