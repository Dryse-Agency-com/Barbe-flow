import { StatusBadge } from "@/components/ui/StatusBadge";
import type { AgendaEntry } from "@/lib/admin-data";
import { formatPrice, formatRelativeDay } from "@/lib/format";

export function AppointmentList({
  entries,
  showDate = false,
}: {
  entries: AgendaEntry[];
  showDate?: boolean;
}) {
  return (
    <ul>
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          className={`flex items-center gap-4 px-5 py-3.5 ${
            index > 0 ? "border-t border-line" : ""
          }`}
        >
          <div className="w-16 shrink-0">
            <p className="font-display text-sm font-semibold tracking-[-0.01em] text-ink tabular-nums">
              {entry.time}
            </p>
            {showDate ? (
              <p className="mt-0.5 text-[0.6875rem] text-muted-soft">
                {formatRelativeDay(entry.date)}
              </p>
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">
              {entry.customerName}
            </p>
            <p className="truncate text-xs text-muted">
              {entry.serviceName} · {entry.barberName}
            </p>
          </div>

          <StatusBadge status={entry.status} className="hidden sm:inline-flex" />

          <span className="w-16 shrink-0 text-right text-sm text-ink tabular-nums">
            {formatPrice(entry.priceCents)}
          </span>
        </li>
      ))}
    </ul>
  );
}
