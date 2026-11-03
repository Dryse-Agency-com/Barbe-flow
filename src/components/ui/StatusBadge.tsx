import { cn } from "@/lib/cn";
import type { AppointmentStatus } from "@/lib/types";

const TONES: Record<AppointmentStatus, { label: string; className: string }> = {
  confirmado: {
    label: "Confirmado",
    className: "bg-success/10 text-success ring-success/20",
  },
  pendente: {
    label: "Pendente",
    className: "bg-warning/10 text-warning ring-warning/20",
  },
  concluido: {
    label: "Concluído",
    className: "bg-ink/5 text-ink-500 ring-ink/10",
  },
  cancelado: {
    label: "Cancelado",
    className: "bg-clay/10 text-clay-600 ring-clay/20",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: AppointmentStatus;
  className?: string;
}) {
  const tone = TONES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.6875rem] font-medium tracking-[0.04em] uppercase ring-1 ring-inset",
        tone.className,
        className,
      )}
    >
      {tone.label}
    </span>
  );
}
