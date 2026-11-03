"use client";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { StepHeader } from "@/components/booking/StepHeader";
import type { Service } from "@/lib/types";

export function ServiceStep({
  services,
  value,
  onChange,
}: {
  services: Service[];
  value: string | null;
  onChange: (serviceId: string) => void;
}) {
  return (
    <div>
      <StepHeader
        title="Qual serviço você quer?"
        description="Escolha um serviço para ver os horários disponíveis."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={value === service.id}
            onSelect={() => onChange(service.id)}
          />
        ))}
      </div>
    </div>
  );
}
