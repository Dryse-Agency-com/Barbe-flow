import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { getBookableDays } from "@/lib/availability";
import { getBarberById, getBarbers, getServiceById, getServices } from "@/lib/data";
import { ANY_BARBER_ID } from "@/lib/types";

export const metadata: Metadata = {
  title: "Agendar horário",
  description:
    "Escolha o serviço, o profissional, a data e o horário. Confirmação na hora.",
};

export const dynamic = "force-dynamic";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ servico?: string; barbeiro?: string }>;
}) {
  const params = await searchParams;

  const service = getServiceById(params.servico);
  const requestedBarber = params.barbeiro;
  const barberId =
    requestedBarber === ANY_BARBER_ID
      ? ANY_BARBER_ID
      : (getBarberById(requestedBarber)?.id ?? null);

  return (
    <div className="bg-bone">
      <div className="shell pt-8 pb-5 sm:pt-12 sm:pb-7">
        <p className="eyebrow mb-3 text-clay">Agendamento</p>
        <h1 className="font-display text-[clamp(1.5rem,5vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-ink">
          Reserve seu horário
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted sm:text-[0.9375rem]">
          Seis passos rápidos. Sem cadastro, sem pagamento antecipado.
        </p>
      </div>

      <BookingFlow
        services={getServices()}
        barbers={getBarbers()}
        days={getBookableDays()}
        initialServiceId={service?.id ?? null}
        initialBarberId={barberId}
      />
    </div>
  );
}
