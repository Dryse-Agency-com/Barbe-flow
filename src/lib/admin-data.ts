import { isOpenOn } from "./availability";
import { listAppointmentsFrom, listAppointmentsOn } from "./appointments";
import { getBarberById, getBarbers, getServiceById, getServices } from "./data";
import { addDaysISO, isToday, nowMinutes, timeToMinutes, todayISO } from "./date";
import type { Appointment, AppointmentStatus } from "./types";

export type AgendaEntry = Appointment & {
  serviceName: string;
  barberName: string;
};

const CUSTOMERS = [
  { name: "André Vasconcelos", phone: "11988120045" },
  { name: "Thiago Nakamura", phone: "11991340087" },
  { name: "Luís Felipe Brandão", phone: "11987660231" },
  { name: "Marcos Aurélio Dias", phone: "11994510876" },
  { name: "Rodrigo Teixeira", phone: "11983220190" },
  { name: "Henrique Prado", phone: "11996770412" },
  { name: "Bruno Camargo", phone: "11982340765" },
  { name: "Vinícius Lara", phone: "11993450128" },
  { name: "Eduardo Menezes", phone: "11985690334" },
  { name: "Paulo Sérgio Mota", phone: "11997810562" },
];

const TIMES = ["09:00", "10:00", "11:00", "13:30", "14:30", "15:30", "17:00", "18:30"];

function dayOrdinal(dateISO: string): number {
  return Math.floor(Date.parse(`${dateISO}T00:00:00Z`) / 86_400_000);
}

/**
 * Deterministic demo agenda so the admin shell is never empty.
 * Real bookings created in the public flow are merged on top of it.
 */
function seedAgenda(dateISO: string): AgendaEntry[] {
  if (!isOpenOn(dateISO)) return [];

  const ordinal = dayOrdinal(dateISO);
  const services = getServices();
  const barbers = getBarbers();
  const count = 4 + (ordinal % 3);

  return Array.from({ length: count }, (_, index) => {
    const slot = (ordinal + index * 3) % TIMES.length;
    const time = TIMES[slot];
    const service = services[(ordinal + index) % services.length];
    const barber = barbers[(ordinal + index * 2) % barbers.length];
    const customer = CUSTOMERS[(ordinal * 2 + index) % CUSTOMERS.length];

    const past = isToday(dateISO) && timeToMinutes(time) + service.durationMinutes < nowMinutes();
    const status: AppointmentStatus = past
      ? "concluido"
      : index === count - 1 && ordinal % 4 === 0
        ? "pendente"
        : "confirmado";

    return {
      id: `seed-${dateISO}-${index}`,
      code: `BF-${String(ordinal % 1000).padStart(3, "0")}${index}`,
      serviceId: service.id,
      barberId: barber.id,
      date: dateISO,
      time,
      durationMinutes: service.durationMinutes,
      priceCents: service.priceCents,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: null,
      status,
      createdAt: `${dateISO}T08:00:00.000Z`,
      serviceName: service.name,
      barberName: barber.name,
    } satisfies AgendaEntry;
  }).sort((a, b) => a.time.localeCompare(b.time));
}

function decorate(appointment: Appointment): AgendaEntry {
  return {
    ...appointment,
    serviceName: getServiceById(appointment.serviceId)?.name ?? appointment.serviceId,
    barberName: getBarberById(appointment.barberId)?.name ?? appointment.barberId,
  };
}

function merge(seeded: AgendaEntry[], stored: AgendaEntry[]): AgendaEntry[] {
  const taken = new Set(stored.map((item) => `${item.barberId}|${item.date}|${item.time}`));
  const filtered = seeded.filter(
    (item) => !taken.has(`${item.barberId}|${item.date}|${item.time}`),
  );
  return [...filtered, ...stored].sort((a, b) =>
    a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date),
  );
}

export async function getAgendaForDay(dateISO: string): Promise<AgendaEntry[]> {
  const stored = await listAppointmentsOn(dateISO).catch(() => []);
  return merge(seedAgenda(dateISO), stored.map(decorate));
}

export async function getUpcomingAgenda(days = 7): Promise<AgendaEntry[]> {
  const start = todayISO();
  const seeded = Array.from({ length: days }, (_, index) =>
    seedAgenda(addDaysISO(start, index)),
  ).flat();
  const stored = await listAppointmentsFrom(start).catch(() => []);
  const limit = addDaysISO(start, days);
  return merge(
    seeded,
    stored.filter((item) => item.date < limit).map(decorate),
  );
}

export type DashboardStats = {
  today: number;
  upcoming: number;
  revenueCents: number;
  activeBarbers: number;
  nextEntry: AgendaEntry | null;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const today = todayISO();
  const [todayEntries, upcoming] = await Promise.all([
    getAgendaForDay(today),
    getUpcomingAgenda(7),
  ]);

  const billable = todayEntries.filter((entry) => entry.status !== "cancelado");
  const minutes = nowMinutes();

  return {
    today: billable.length,
    upcoming: upcoming.filter(
      (entry) => entry.date > today && entry.status !== "cancelado",
    ).length,
    revenueCents: billable.reduce((total, entry) => total + entry.priceCents, 0),
    activeBarbers: getBarbers().length,
    nextEntry:
      billable.find((entry) => timeToMinutes(entry.time) >= minutes) ?? null,
  };
}

export type CustomerRecord = {
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
  totalCents: number;
};

export async function getCustomers(): Promise<CustomerRecord[]> {
  const entries = (
    await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        getAgendaForDay(addDaysISO(todayISO(), index - 6)),
      ),
    )
  ).flat();

  const byPhone = new Map<string, CustomerRecord>();
  for (const entry of entries) {
    const existing = byPhone.get(entry.customerPhone);
    if (existing) {
      existing.visits += 1;
      existing.totalCents += entry.priceCents;
      if (entry.date > existing.lastVisit) existing.lastVisit = entry.date;
    } else {
      byPhone.set(entry.customerPhone, {
        name: entry.customerName,
        phone: entry.customerPhone,
        visits: 1,
        lastVisit: entry.date,
        totalCents: entry.priceCents,
      });
    }
  }

  return [...byPhone.values()].sort((a, b) => b.visits - a.visits);
}
