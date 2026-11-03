/** Shop timezone — all "today" logic is resolved here, never from the server TZ. */
export const TIME_ZONE = "America/Sao_Paulo";

const isoFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/** Current date in the shop timezone, as YYYY-MM-DD. */
export function todayISO(): string {
  return isoFormatter.format(new Date());
}

/** Minutes since midnight in the shop timezone. */
export function nowMinutes(): number {
  const [hour, minute] = clockFormatter.format(new Date()).split(":").map(Number);
  return hour * 60 + minute;
}

/** Builds a UTC-anchored Date so formatting is identical on server and client. */
export function isoToDate(dateISO: string): Date {
  const [year, month, day] = dateISO.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function dateToISO(date: Date): string {
  return isoFormatter.format(date);
}

export function addDaysISO(dateISO: string, days: number): string {
  const date = isoToDate(dateISO);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** 0 = Sunday … 6 = Saturday */
export function weekdayIndex(dateISO: string): number {
  return isoToDate(dateISO).getUTCDay();
}

export function isBeforeToday(dateISO: string): boolean {
  return dateISO < todayISO();
}

export function isToday(dateISO: string): boolean {
  return dateISO === todayISO();
}

export function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function minutesToTime(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
