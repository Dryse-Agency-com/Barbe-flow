"use client";

import { StepHeader } from "@/components/booking/StepHeader";
import { TimeSlotGrid } from "@/components/booking/TimeSlot";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { formatDateLong } from "@/lib/format";
import type { TimeSlot } from "@/lib/types";

export type SlotsStatus = "idle" | "loading" | "ready" | "error";

export function TimeStep({
  date,
  status,
  slots,
  value,
  onChange,
  onRetry,
  onChangeDate,
}: {
  date: string | null;
  status: SlotsStatus;
  slots: TimeSlot[];
  value: string | null;
  onChange: (time: string) => void;
  onRetry: () => void;
  onChangeDate: () => void;
}) {
  const hasFreeSlot = slots.some((slot) => slot.available);

  return (
    <div>
      <StepHeader
        title="Escolha o horário"
        description={date ? formatDateLong(date) : undefined}
      />

      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Horários em tempo real para o serviço escolhido.
        </p>
        <button
          type="button"
          onClick={onChangeDate}
          className="shrink-0 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
        >
          Trocar data
        </button>
      </div>

      {status === "loading" ? (
        <LoadingState label="Carregando horários" rows={10} />
      ) : status === "error" ? (
        <div
          role="alert"
          className="rounded-2xl border border-clay/30 bg-clay-50 p-6 text-center"
        >
          <p className="text-sm font-medium text-ink">
            Não foi possível carregar os horários.
          </p>
          <p className="mt-1 text-sm text-muted">
            Verifique sua conexão e tente novamente.
          </p>
          <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
            Tentar novamente
          </Button>
        </div>
      ) : slots.length === 0 || !hasFreeSlot ? (
        <EmptyState
          title="Nenhum horário livre nesta data"
          description="A agenda deste dia está cheia ou já passou. Escolha outra data para continuar."
          action={
            <Button variant="secondary" size="sm" onClick={onChangeDate}>
              Escolher outra data
            </Button>
          }
        />
      ) : (
        <TimeSlotGrid slots={slots} value={value} onChange={onChange} />
      )}
    </div>
  );
}
