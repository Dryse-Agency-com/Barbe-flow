"use client";

import { BarberOption } from "@/components/cards/BarberCard";
import { StepHeader } from "@/components/booking/StepHeader";
import { ANY_BARBER_ID, type Barber } from "@/lib/types";

export function BarberStep({
  barbers,
  value,
  onChange,
}: {
  barbers: Barber[];
  value: string | null;
  onChange: (barberId: string) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Com quem você quer cortar?"
        description="Sem preferência? A gente encaixa você com o primeiro profissional livre."
      />

      <div className="space-y-3">
        <BarberOption
          name="Qualquer profissional"
          role="Primeiro horário disponível"
          initials="BF"
          selected={value === ANY_BARBER_ID}
          onSelect={() => onChange(ANY_BARBER_ID)}
        />

        <div className="flex items-center gap-4 py-1">
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span className="eyebrow text-muted-soft">Nossa equipe</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>

        {barbers.map((barber) => (
          <BarberOption
            key={barber.id}
            name={barber.name}
            role={barber.specialties.join(" · ")}
            image={barber.image}
            selected={value === barber.id}
            onSelect={() => onChange(barber.id)}
          />
        ))}
      </div>
    </div>
  );
}
