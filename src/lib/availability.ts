import { getBarbers } from "./data";
import {
  addDaysISO,
  isBeforeToday,
  isToday,
  minutesToTime,
  nowMinutes,
  timeToMinutes,
  todayISO,
  weekdayIndex,
} from "./date";
import { ANY_BARBER_ID, type TimeSlot } from "./types";

export const SLOT_INTERVAL_MINUTES = 30;
/** How far ahead a same-day booking must be. */
export const MIN_LEAD_MINUTES = 60;
export const BOOKING_WINDOW_DAYS = 21;

type OpeningHours = { open: string; close: string } | null;

/** Sunday → Saturday. */
const WEEK_HOURS: OpeningHours[] = [
  null,
  { open: "09:00", close: "20:00" },
  { open: "09:00", close: "20:00" },
  { open: "09:00", close: "20:00" },
  { open: "09:00", close: "20:00" },
  { open: "09:00", close: "20:00" },
  { open: "09:00", close: "18:00" },
];

/** Team break — no slots start inside this window. */
const BREAK = { start: timeToMinutes("12:30"), end: timeToMinutes("13:30") };

export type BookedInterval = {
  barberId: string;
  /** Minutes since midnight. */
  start: number;
  end: number;
};

export type BookableDay = {
  date: string;
  open: boolean;
};

export function openingHoursFor(dateISO: string): OpeningHours {
  return WEEK_HOURS[weekdayIndex(dateISO)] ?? null;
}

export function isOpenOn(dateISO: string): boolean {
  return openingHoursFor(dateISO) !== null;
}

/** Rolling booking window starting today, closed days included but flagged. */
export function getBookableDays(days: number = BOOKING_WINDOW_DAYS): BookableDay[] {
  const start = todayISO();
  return Array.from({ length: days }, (_, index) => {
    const date = addDaysISO(start, index);
    return { date, open: isOpenOn(date) };
  });
}

export function getFirstOpenDay(): string {
  return getBookableDays().find((day) => day.open)?.date ?? todayISO();
}

/** Every slot the shop could theoretically start this service at. */
export function baseSlots(dateISO: string, durationMinutes: number): string[] {
  const hours = openingHoursFor(dateISO);
  if (!hours || isBeforeToday(dateISO)) return [];

  const open = timeToMinutes(hours.open);
  const close = timeToMinutes(hours.close);
  const earliest = isToday(dateISO) ? nowMinutes() + MIN_LEAD_MINUTES : 0;

  const slots: string[] = [];
  for (let start = open; start + durationMinutes <= close; start += SLOT_INTERVAL_MINUTES) {
    if (start < earliest) continue;
    const overlapsBreak = start < BREAK.end && start + durationMinutes > BREAK.start;
    if (overlapsBreak) continue;
    slots.push(minutesToTime(start));
  }
  return slots;
}

/** Deterministic stand-in for real agenda data (stable per barber/date/time). */
function pseudoRandom(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 1000) / 1000;
}

function isMockBusy(barberId: string, dateISO: string, time: string): boolean {
  return pseudoRandom(`${barberId}:${dateISO}:${time}`) < 0.38;
}

type BuildSlotsInput = {
  dateISO: string;
  durationMinutes: number;
  /** Specific barber id or ANY_BARBER_ID. */
  barberId: string;
  /** Real bookings already stored for that date. */
  booked?: BookedInterval[];
};

/**
 * Single source of truth for slot availability. Today it merges deterministic
 * mock occupancy with confirmed appointments; later the `booked` input can come
 * straight from the database without touching any component.
 */
export function buildSlots({
  dateISO,
  durationMinutes,
  barberId,
  booked = [],
}: BuildSlotsInput): TimeSlot[] {
  const barberIds =
    barberId === ANY_BARBER_ID ? getBarbers().map((barber) => barber.id) : [barberId];

  return baseSlots(dateISO, durationMinutes).map((time) => {
    const start = timeToMinutes(time);
    const end = start + durationMinutes;

    const available = barberIds.some((id) => {
      if (isMockBusy(id, dateISO, time)) return false;
      return !booked.some(
        (interval) =>
          interval.barberId === id && start < interval.end && end > interval.start,
      );
    });

    return { time, available };
  });
}

/** Picks a concrete barber when the customer chose "Qualquer profissional". */
export function resolveBarber({
  dateISO,
  time,
  durationMinutes,
  booked = [],
}: {
  dateISO: string;
  time: string;
  durationMinutes: number;
  booked?: BookedInterval[];
}): string | null {
  const start = timeToMinutes(time);
  const end = start + durationMinutes;

  const candidate = getBarbers().find((barber) => {
    if (isMockBusy(barber.id, dateISO, time)) return false;
    return !booked.some(
      (interval) =>
        interval.barberId === barber.id && start < interval.end && end > interval.start,
    );
  });

  return candidate?.id ?? null;
}
