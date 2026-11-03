/**
 * Conceptual entities shared by the whole app.
 * The mock data layer and the database layer both produce these shapes, so the
 * UI never needs to change when the data source changes.
 */

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Stored in cents to avoid floating point drift. */
  priceCents: number;
  durationMinutes: number;
  active: boolean;
  /** Highlighted on the home page. */
  featured: boolean;
  /** What the service includes — used in the catalog detail. */
  includes: string[];
  /** Landscape cover shown on cards and the catalog. */
  image: string;
  /** Decorative credit line for the cover photo. */
  imageAlt: string;
};

/** A client cut published in the gallery. */
export type GalleryItem = {
  id: string;
  image: string;
  alt: string;
  /** Optional focal point for the landscape card; the full photo stays unchanged. */
  imagePosition?: string;
  /** Fictional client first name shown as credit. */
  client: string;
  serviceId: string;
  barberId: string;
  /** Short editorial caption. */
  caption: string;
  /** Published month, YYYY-MM. */
  publishedIn: string;
};

export type Review = {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Relative label, e.g. "há 2 semanas". */
  timeAgo: string;
  text: string;
  serviceId: string;
  barberId?: string;
  reply?: { author: string; timeAgo: string; text: string };
};

export type ShortComment = {
  id: string;
  author: string;
  timeAgo: string;
  text: string;
};

export type Barber = {
  id: string;
  name: string;
  /** Short role line, e.g. "Barbeiro sênior". */
  role: string;
  bio: string;
  specialties: string[];
  image: string;
  active: boolean;
};

export type AppointmentStatus =
  | "pendente"
  | "confirmado"
  | "concluido"
  | "cancelado";

export type Appointment = {
  id: string;
  /** Short human readable reference shown to the customer. */
  code: string;
  serviceId: string;
  barberId: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** 24h time, HH:mm. */
  time: string;
  durationMinutes: number;
  priceCents: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  status: AppointmentStatus;
  createdAt: string;
};

export type TimeSlot = {
  /** 24h time, HH:mm. */
  time: string;
  available: boolean;
};

/** Draft state held by the booking flow before it becomes an Appointment. */
export type BookingDraft = {
  serviceId: string | null;
  /** `any` means "Qualquer profissional". */
  barberId: string | null;
  date: string | null;
  time: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
};

export const ANY_BARBER_ID = "any";
