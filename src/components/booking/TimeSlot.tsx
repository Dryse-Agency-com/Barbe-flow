"use client";

import { cn } from "@/lib/cn";
import { timeToMinutes } from "@/lib/date";
import type { TimeSlot as TimeSlotType } from "@/lib/types";

export function TimeSlot({
  time,
  available,
  selected,
  onSelect,
}: {
  time: string;
  available: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!available}
      aria-pressed={selected}
      aria-label={available ? `Horário ${time}` : `Horário ${time} indisponível`}
      className={cn(
        "h-12 rounded-xl border text-sm font-medium tabular-nums transition-[border-color,background-color,color] duration-200",
        selected && "border-clay bg-clay text-white",
        !selected && available && "border-line bg-white text-ink hover:border-ink/35",
        !available &&
          "cursor-not-allowed border-transparent bg-bone-200 text-muted-soft/80 line-through decoration-muted-soft/50",
      )}
    >
      {time}
    </button>
  );
}

const PERIODS = [
  { id: "manha", label: "Manhã", start: 0, end: 12 * 60 },
  { id: "tarde", label: "Tarde", start: 12 * 60, end: 18 * 60 },
  { id: "noite", label: "Noite", start: 18 * 60, end: 24 * 60 },
];

export function TimeSlotGrid({
  slots,
  value,
  onChange,
}: {
  slots: TimeSlotType[];
  value: string | null;
  onChange: (time: string) => void;
}) {
  const groups = PERIODS.map((period) => ({
    ...period,
    items: slots.filter((slot) => {
      const minutes = timeToMinutes(slot.time);
      return minutes >= period.start && minutes < period.end;
    }),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-7">
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`periodo-${group.id}`}>
          <h3
            id={`periodo-${group.id}`}
            className="eyebrow mb-3 text-muted-soft"
          >
            {group.label}
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
            {group.items.map((slot) => (
              <TimeSlot
                key={slot.time}
                time={slot.time}
                available={slot.available}
                selected={value === slot.time}
                onSelect={() => onChange(slot.time)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
