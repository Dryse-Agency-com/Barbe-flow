"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { formatDuration, formatPrice } from "@/lib/format";
import type { Service } from "@/lib/types";

export function ServiceCatalog({ services }: { services: Service[] }) {
  const [detail, setDetail] = useState<Service | null>(null);

  return (
    <>
      <ul className="border-b border-line">
        {services.map((service, index) => (
          <li
            key={service.id}
            className="grid gap-6 border-t border-line py-7 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:gap-8 sm:py-8 lg:grid-cols-[10rem_minmax(0,1fr)_auto]"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-ink-800 sm:aspect-[3/4] sm:h-full">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                loading={index < 2 ? "eager" : "lazy"}
                priority={index < 2}
                sizes="(min-width: 1024px) 10rem, (min-width: 640px) 8rem, 92vw"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-muted-soft tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[1.625rem]">
                  {service.name}
                </h2>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
                {service.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-muted-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-clay/60"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-baseline gap-4 sm:hidden">
                <span className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                  {formatPrice(service.priceCents)}
                </span>
                <span className="text-xs text-muted">
                  {formatDuration(service.durationMinutes)}
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-6 sm:flex-col sm:items-end sm:justify-start sm:gap-5">
              <div className="hidden sm:block sm:text-right">
                <p className="font-display text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                  {formatPrice(service.priceCents)}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {formatDuration(service.durationMinutes)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDetail(service)}
                  aria-label={`Ver detalhes de ${service.name}`}
                >
                  Detalhes
                </Button>
                <Button size="sm" href={`/agendar?servico=${service.id}`}>
                  Agendar
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Dialog
        open={detail !== null}
        onClose={() => setDetail(null)}
        title={detail?.name ?? ""}
        description={detail?.description}
        footer={
          detail ? (
            <Button href={`/agendar?servico=${detail.id}`} size="lg" fullWidth>
              Agendar {detail.name}
            </Button>
          ) : null
        }
      >
        {detail ? (
          <div className="space-y-6">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink-800">
              <Image
                src={detail.image}
                alt={detail.imageAlt}
                fill
                sizes="(min-width: 640px) 32rem, 92vw"
                className="object-cover"
              />
            </div>

            <dl className="flex gap-10">
              <div>
                <dt className="eyebrow text-muted-soft">Valor</dt>
                <dd className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                  {formatPrice(detail.priceCents)}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-soft">Duração</dt>
                <dd className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                  {formatDuration(detail.durationMinutes)}
                </dd>
              </div>
            </dl>

            <div>
              <h3 className="eyebrow text-muted-soft">O que está incluso</h3>
              <ul className="mt-3 space-y-2">
                {detail.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-clay"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
