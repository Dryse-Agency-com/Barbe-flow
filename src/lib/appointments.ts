import { and, asc, eq, gte, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import type { AppointmentRow } from "@/db/schema";
import type { BookedInterval } from "./availability";
import { timeToMinutes, todayISO } from "./date";
import type { Appointment } from "./types";

function toAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    code: row.code,
    serviceId: row.serviceId,
    barberId: row.barberId,
    date: row.date,
    time: row.time,
    durationMinutes: row.durationMinutes,
    priceCents: row.priceCents,
    customerName: row.customerName,
    customerPhone: row.customerPhone,
    customerEmail: row.customerEmail,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  };
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateCode(): string {
  let code = "";
  for (let index = 0; index < 6; index += 1) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `BF-${code}`;
}

export type CreateAppointmentInput = {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  durationMinutes: number;
  priceCents: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
};

export async function createAppointment(
  input: CreateAppointmentInput,
): Promise<Appointment> {
  const [row] = await db
    .insert(appointments)
    .values({ ...input, code: generateCode(), status: "confirmado" })
    .returning();
  return toAppointment(row);
}

export async function getAppointmentByCode(
  code: string,
): Promise<Appointment | null> {
  const [row] = await db
    .select()
    .from(appointments)
    .where(eq(appointments.code, code))
    .limit(1);
  return row ? toAppointment(row) : null;
}

/** Occupied ranges for a given day, used by the availability engine. */
export async function getBookedIntervals(dateISO: string): Promise<BookedInterval[]> {
  const rows = await db
    .select({
      barberId: appointments.barberId,
      time: appointments.time,
      durationMinutes: appointments.durationMinutes,
    })
    .from(appointments)
    .where(and(eq(appointments.date, dateISO), ne(appointments.status, "cancelado")));

  return rows.map((row) => {
    const start = timeToMinutes(row.time);
    return { barberId: row.barberId, start, end: start + row.durationMinutes };
  });
}

export async function listAppointmentsFrom(dateISO: string): Promise<Appointment[]> {
  const rows = await db
    .select()
    .from(appointments)
    .where(gte(appointments.date, dateISO))
    .orderBy(asc(appointments.date), asc(appointments.time))
    .limit(200);
  return rows.map(toAppointment);
}

export async function listAppointmentsOn(dateISO: string): Promise<Appointment[]> {
  const rows = await db
    .select()
    .from(appointments)
    .where(eq(appointments.date, dateISO))
    .orderBy(asc(appointments.time));
  return rows.map(toAppointment);
}

export async function countUpcoming(): Promise<number> {
  const [row] = await db
    .select({ value: sql<number>`count(*)::int` })
    .from(appointments)
    .where(and(gte(appointments.date, todayISO()), ne(appointments.status, "cancelado")));
  return row?.value ?? 0;
}
