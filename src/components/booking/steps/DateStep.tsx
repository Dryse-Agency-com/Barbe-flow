"use client";

import { DateSelector } from "@/components/booking/DateSelector";
import { StepHeader } from "@/components/booking/StepHeader";
import type { BookableDay } from "@/lib/availability";
import { formatDateLong } from "@/lib/format";

export function DateStep({
  days,
  value,
  onChange,
}: {
  days: BookableDay[];
  value: string | null;
  onChange: (date: string) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Quando fica melhor?"
        description="Agenda aberta para os próximos 21 dias. Domingo a barbearia fecha."
      />

      <DateSelector days={days} value={value} onChange={onChange} />

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {value ? (
          <>
            Data selecionada:{" "}
            <span className="font-medium text-ink">{formatDateLong(value)}</span>
          </>
        ) : (
          "Deslize para ver mais datas."
        )}
      </p>
    </div>
  );
}
