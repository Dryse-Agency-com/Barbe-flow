import {
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { AppointmentStatus } from "@/lib/types";

/**
 * Appointments created through the public booking flow.
 * The service/barber catalog still lives in the local mock layer, so those are
 * stored as stable string ids and resolved at read time.
 */
export const appointments = pgTable(
  "appointments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: text("code").notNull().unique(),
    serviceId: text("service_id").notNull(),
    barberId: text("barber_id").notNull(),
    date: date("date", { mode: "string" }).notNull(),
    time: text("time").notNull(),
    durationMinutes: integer("duration_minutes").notNull(),
    priceCents: integer("price_cents").notNull(),
    customerName: text("customer_name").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerEmail: text("customer_email"),
    status: text("status").$type<AppointmentStatus>().notNull().default("confirmado"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("appointments_date_idx").on(table.date)],
);

export type AppointmentRow = typeof appointments.$inferSelect;
export type NewAppointmentRow = typeof appointments.$inferInsert;
