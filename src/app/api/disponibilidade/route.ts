import { NextResponse } from "next/server";
import { buildSlots } from "@/lib/availability";
import { getBookedIntervals } from "@/lib/appointments";
import { getServiceById } from "@/lib/data";
import { isBeforeToday } from "@/lib/date";
import { ANY_BARBER_ID } from "@/lib/types";

export const dynamic = "force-dynamic";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** GET /api/disponibilidade?data=YYYY-MM-DD&servico=<id>&barbeiro=<id|any> */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("data") ?? "";
  const serviceId = searchParams.get("servico") ?? "";
  const barberId = searchParams.get("barbeiro") ?? ANY_BARBER_ID;

  if (!DATE_PATTERN.test(date)) {
    return NextResponse.json({ error: "Data inválida." }, { status: 400 });
  }

  const service = getServiceById(serviceId);
  if (!service) {
    return NextResponse.json({ error: "Serviço não encontrado." }, { status: 400 });
  }

  if (isBeforeToday(date)) {
    return NextResponse.json({ date, slots: [] });
  }

  try {
    const booked = await getBookedIntervals(date);
    const slots = buildSlots({
      dateISO: date,
      durationMinutes: service.durationMinutes,
      barberId,
      booked,
    });
    return NextResponse.json({ date, slots });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar os horários." },
      { status: 500 },
    );
  }
}
