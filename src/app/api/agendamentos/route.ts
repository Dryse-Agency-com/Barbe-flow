import { NextResponse } from "next/server";
import { buildSlots, resolveBarber } from "@/lib/availability";
import { createAppointment, getBookedIntervals } from "@/lib/appointments";
import { getBarberById, getServiceById } from "@/lib/data";
import { isBeforeToday } from "@/lib/date";
import { phoneDigits } from "@/lib/format";
import { ANY_BARBER_ID } from "@/lib/types";
import { hasErrors, validateCustomer } from "@/lib/validation";

export const dynamic = "force-dynamic";

type Payload = {
  serviceId?: string;
  barberId?: string;
  date?: string;
  time?: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
};

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/** POST /api/agendamentos — creates a confirmed appointment. */
export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return badRequest("Requisição inválida.");
  }

  const service = getServiceById(payload.serviceId);
  if (!service) return badRequest("Selecione um serviço válido.");

  const requestedBarberId = payload.barberId ?? ANY_BARBER_ID;
  if (requestedBarberId !== ANY_BARBER_ID && !getBarberById(requestedBarberId)) {
    return badRequest("Selecione um profissional válido.");
  }

  const date = payload.date ?? "";
  const time = payload.time ?? "";
  if (!DATE_PATTERN.test(date) || isBeforeToday(date)) {
    return badRequest("Selecione uma data válida.");
  }
  if (!TIME_PATTERN.test(time)) {
    return badRequest("Selecione um horário válido.");
  }

  const customer = {
    customerName: (payload.customerName ?? "").trim(),
    customerPhone: (payload.customerPhone ?? "").trim(),
    customerEmail: (payload.customerEmail ?? "").trim(),
  };
  const errors = validateCustomer(customer);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { error: "Revise seus dados de contato.", fields: errors },
      { status: 422 },
    );
  }

  try {
    const booked = await getBookedIntervals(date);

    const stillAvailable = buildSlots({
      dateISO: date,
      durationMinutes: service.durationMinutes,
      barberId: requestedBarberId,
      booked,
    }).some((slot) => slot.time === time && slot.available);

    if (!stillAvailable) {
      return NextResponse.json(
        { error: "Esse horário acabou de ser ocupado. Escolha outro." },
        { status: 409 },
      );
    }

    const barberId =
      requestedBarberId === ANY_BARBER_ID
        ? resolveBarber({
            dateISO: date,
            time,
            durationMinutes: service.durationMinutes,
            booked,
          })
        : requestedBarberId;

    if (!barberId) {
      return NextResponse.json(
        { error: "Nenhum profissional disponível nesse horário." },
        { status: 409 },
      );
    }

    const appointment = await createAppointment({
      serviceId: service.id,
      barberId,
      date,
      time,
      durationMinutes: service.durationMinutes,
      priceCents: service.priceCents,
      customerName: customer.customerName,
      customerPhone: phoneDigits(customer.customerPhone),
      customerEmail: customer.customerEmail || null,
    });

    return NextResponse.json({ code: appointment.code }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível concluir o agendamento. Tente novamente." },
      { status: 500 },
    );
  }
}
