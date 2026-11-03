"use client";

import { cn } from "@/lib/cn";
import type { BookableDay } from "@/lib/availability";
import {
  formatDayNumber,
  formatMonthShort,
  formatWeekdayShort,
} from "@/lib/format";
import { isToday } from "@/lib/date";

/**
 * One list, two layouts: a snapping horizontal rail on phones and a calendar
 * style grid from `sm` upwards.
 */
export function DateSelector({
  days,
  value,
  onChange,
}: {
  days: BookableDay[];
  value: string | null;
  onChange: (date: string) => void;
}) {
  return (
    <div
      className="scroll-x -mx-5 flex gap-2 px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-2 sm:overflow-visible sm:px-0 lg:grid-cols-7"
      role="group"
      aria-label="Escolha uma data"
    >
      {days.map((day) => {
        const selected = value === day.date;
        const today = isToday(day.date);

        return (
          <button
            key={day.date}
            type="button"
            onClick={() => onChange(day.date)}
            disabled={!day.open}
            aria-pressed={selected}
            aria-label={`${formatWeekdayShort(day.date)} ${formatDayNumber(day.date)} de ${formatMonthShort(day.date)}${day.open ? "" : " — fechado"}`}
            className={cn(
              "flex w-[4.25rem] shrink-0 scroll-ml-5 snap-start flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-[border-color,background-color,color] duration-200 sm:w-auto",
              selected
                ? "border-clay bg-clay text-white"
                : day.open
                  ? "border-line bg-white text-ink hover:border-ink/30"
                  : "cursor-not-allowed border-dashed border-line bg-transparent text-muted-soft/70",
            )}
          >
            <span
              className={cn(
                "text-[0.6875rem] tracking-[0.06em] uppercase",
                selected ? "text-white/80" : today ? "text-clay" : "text-muted",
              )}
            >
              {today ? "hoje" : formatWeekdayShort(day.date)}
            </span>
            <span className="font-display text-lg leading-none font-semibold tracking-[-0.02em]">
              {formatDayNumber(day.date)}
            </span>
            <span
              className={cn(
                "text-[0.6875rem] lowercase",
                selected ? "text-white/80" : "text-muted-soft",
              )}
            >
              {day.open ? formatMonthShort(day.date) : "fechado"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
