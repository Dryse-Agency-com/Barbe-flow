import { isoToDate, isToday, addDaysISO, todayISO } from "./date";

export function formatPrice(cents: number): string {
  const value = cents / 100;
  return value % 1 === 0
    ? `R$ ${value.toFixed(0)}`
    : `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h${String(rest).padStart(2, "0")}`;
}

function formatWith(dateISO: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("pt-BR", { ...options, timeZone: "UTC" }).format(
    isoToDate(dateISO),
  );
}

/** "quinta-feira, 12 de junho" */
export function formatDateLong(dateISO: string): string {
  return formatWith(dateISO, { weekday: "long", day: "numeric", month: "long" });
}

/** "12 de junho de 2026" */
export function formatDateFull(dateISO: string): string {
  return formatWith(dateISO, { day: "numeric", month: "long", year: "numeric" });
}

/** "12/06" */
export function formatDateShort(dateISO: string): string {
  return formatWith(dateISO, { day: "2-digit", month: "2-digit" });
}

/** "qui" */
export function formatWeekdayShort(dateISO: string): string {
  return formatWith(dateISO, { weekday: "short" }).replace(".", "").toLowerCase();
}

/** "12" */
export function formatDayNumber(dateISO: string): string {
  return formatWith(dateISO, { day: "2-digit" });
}

/** "jun" */
export function formatMonthShort(dateISO: string): string {
  return formatWith(dateISO, { month: "short" }).replace(".", "").toLowerCase();
}

/** "Hoje" / "Amanhã" / "qui, 12 jun" */
export function formatRelativeDay(dateISO: string): string {
  if (isToday(dateISO)) return "Hoje";
  if (dateISO === addDaysISO(todayISO(), 1)) return "Amanhã";
  return `${formatWeekdayShort(dateISO)}, ${formatDayNumber(dateISO)} ${formatMonthShort(dateISO)}`;
}

/** Progressive BR phone mask: (11) 94002-8922 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export function initials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "--";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toUpperCase();
}
