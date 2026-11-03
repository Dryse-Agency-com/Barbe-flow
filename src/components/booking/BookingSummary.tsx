import { cn } from "@/lib/cn";
import { formatDateLong, formatDuration, formatPrice, maskPhone } from "@/lib/format";
import type { Service } from "@/lib/types";

type Row = { label: string; value: string | null };

export function BookingSummary({
  service,
  barberLabel,
  date,
  time,
  customer,
  variant = "panel",
  className,
}: {
  service?: Service | null;
  barberLabel?: string | null;
  date?: string | null;
  time?: string | null;
  customer?: { name: string; phone: string; email?: string } | null;
  variant?: "panel" | "aside";
  className?: string;
}) {
  const rows: Row[] = [
    { label: "Serviço", value: service?.name ?? null },
    { label: "Profissional", value: barberLabel ?? null },
    { label: "Data", value: date ? formatDateLong(date) : null },
    { label: "Horário", value: time ?? null },
    {
      label: "Duração",
      value: service ? formatDuration(service.durationMinutes) : null,
    },
  ];

  if (customer) {
    rows.push({ label: "Cliente", value: customer.name || null });
    rows.push({
      label: "WhatsApp",
      value: customer.phone ? maskPhone(customer.phone) : null,
    });
    if (customer.email) rows.push({ label: "E-mail", value: customer.email });
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white",
        variant === "panel" ? "p-5 sm:p-6" : "p-5",
        className,
      )}
    >
      <h2
        className={cn(
          "eyebrow text-muted-soft",
          variant === "panel" ? "mb-5" : "mb-4",
        )}
      >
        Resumo
      </h2>

      <dl className="space-y-3.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-6 text-sm"
          >
            <dt className="shrink-0 text-muted">{row.label}</dt>
            <dd
              className={cn(
                "text-right font-medium",
                row.value ? "text-ink" : "text-muted-soft/70",
              )}
            >
              {row.value ?? "—"}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <span className="text-sm text-muted">Total</span>
        <span className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
          {service ? formatPrice(service.priceCents) : "—"}
        </span>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        Pagamento direto na barbearia. Cancelamentos com até 2h de antecedência.
      </p>
    </div>
  );
}
