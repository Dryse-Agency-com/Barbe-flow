"use client";

import { BookingSummary } from "@/components/booking/BookingSummary";
import { StepHeader } from "@/components/booking/StepHeader";
import type { Service } from "@/lib/types";

const EDIT_ACTIONS = [
  { label: "Alterar serviço", step: 0 },
  { label: "Alterar profissional", step: 1 },
  { label: "Alterar data", step: 2 },
  { label: "Alterar horário", step: 3 },
  { label: "Alterar dados", step: 4 },
];

export function ReviewStep({
  service,
  barberLabel,
  date,
  time,
  customer,
  error,
  onNavigate,
}: {
  service: Service | null;
  barberLabel: string;
  date: string | null;
  time: string | null;
  customer: { name: string; phone: string; email?: string };
  error: string | null;
  onNavigate: (step: number) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Confira seu agendamento"
        description="Revise os detalhes antes de confirmar. Você pode ajustar qualquer item."
      />

      <BookingSummary
        service={service}
        barberLabel={barberLabel}
        date={date}
        time={time}
        customer={customer}
      />

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {EDIT_ACTIONS.map((action) => (
          <li key={action.label}>
            <button
              type="button"
              onClick={() => onNavigate(action.step)}
              className="text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              {action.label}
            </button>
          </li>
        ))}
      </ul>

      {error ? (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-clay/30 bg-clay-50 px-4 py-3 text-sm text-clay-600"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
