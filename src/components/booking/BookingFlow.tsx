"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookingStepper, type Step } from "@/components/booking/BookingStepper";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BarberStep } from "@/components/booking/steps/BarberStep";
import { DateStep } from "@/components/booking/steps/DateStep";
import { DetailsStep } from "@/components/booking/steps/DetailsStep";
import { ReviewStep } from "@/components/booking/steps/ReviewStep";
import { ServiceStep } from "@/components/booking/steps/ServiceStep";
import { TimeStep, type SlotsStatus } from "@/components/booking/steps/TimeStep";
import { Button } from "@/components/ui/Button";
import type { BookableDay } from "@/lib/availability";
import { formatDuration, formatPrice } from "@/lib/format";
import {
  ANY_BARBER_ID,
  type Barber,
  type BookingDraft,
  type Service,
  type TimeSlot,
} from "@/lib/types";
import { hasErrors, validateCustomer, type CustomerFields } from "@/lib/validation";

const STEPS: Step[] = [
  { id: "servico", label: "Serviço" },
  { id: "profissional", label: "Profissional" },
  { id: "data", label: "Data" },
  { id: "horario", label: "Horário" },
  { id: "dados", label: "Seus dados" },
  { id: "revisao", label: "Revisão" },
];

type SlotsState = { key: string | null; status: SlotsStatus; items: TimeSlot[] };

export function BookingFlow({
  services,
  barbers,
  days,
  initialServiceId,
  initialBarberId,
}: {
  services: Service[];
  barbers: Barber[];
  days: BookableDay[];
  initialServiceId: string | null;
  initialBarberId: string | null;
}) {
  const router = useRouter();

  const [draft, setDraft] = useState<BookingDraft>({
    serviceId: initialServiceId,
    barberId: initialBarberId,
    date: null,
    time: null,
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  });

  const startStep = initialServiceId ? (initialBarberId ? 2 : 1) : 0;
  const [step, setStep] = useState(startStep);
  const [maxReached, setMaxReached] = useState(startStep);
  const [touched, setTouched] = useState<Partial<Record<keyof CustomerFields, boolean>>>({});
  const [slots, setSlots] = useState<SlotsState>({
    key: null,
    status: "idle",
    items: [],
  });
  const [reloadToken, setReloadToken] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const stepRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const service = useMemo(
    () => services.find((item) => item.id === draft.serviceId) ?? null,
    [services, draft.serviceId],
  );
  const barber = useMemo(
    () => barbers.find((item) => item.id === draft.barberId) ?? null,
    [barbers, draft.barberId],
  );
  const barberLabel =
    draft.barberId === ANY_BARBER_ID
      ? "Qualquer profissional"
      : (barber?.name ?? "");

  const customer: CustomerFields = {
    customerName: draft.customerName,
    customerPhone: draft.customerPhone,
    customerEmail: draft.customerEmail,
  };
  const customerErrors = useMemo(
    () =>
      validateCustomer({
        customerName: draft.customerName,
        customerPhone: draft.customerPhone,
        customerEmail: draft.customerEmail,
      }),
    [draft.customerName, draft.customerPhone, draft.customerEmail],
  );

  const slotsKey =
    service && draft.date ? `${service.id}|${draft.barberId}|${draft.date}` : null;

  useEffect(() => {
    if (step !== 3 || !slotsKey || !service || !draft.date) return;

    const controller = new AbortController();
    setSlots({ key: slotsKey, status: "loading", items: [] });

    const params = new URLSearchParams({
      data: draft.date,
      servico: service.id,
      barbeiro: draft.barberId ?? ANY_BARBER_ID,
    });

    fetch(`/api/disponibilidade?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("request failed");
        return (await response.json()) as { slots: TimeSlot[] };
      })
      .then((data) => {
        setSlots({ key: slotsKey, status: "ready", items: data.slots ?? [] });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSlots({ key: slotsKey, status: "error", items: [] });
      });

    return () => controller.abort();
  }, [step, slotsKey, reloadToken, service, draft.date, draft.barberId]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepRef.current?.focus({ preventScroll: true });
    const top = stepRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > 160) {
      window.scrollTo({ top: Math.max(0, window.scrollY + top - 96), behavior: "smooth" });
    }
  }, [step]);

  const update = useCallback((patch: Partial<BookingDraft>) => {
    setDraft((current) => ({ ...current, ...patch }));
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setStep(next);
      setMaxReached((current) => Math.max(current, next));
    },
    [],
  );

  const canContinue = (() => {
    switch (step) {
      case 0:
        return Boolean(draft.serviceId);
      case 1:
        return Boolean(draft.barberId);
      case 2:
        return Boolean(draft.date);
      case 3:
        return Boolean(draft.time);
      case 4:
        return !hasErrors(customerErrors);
      default:
        return true;
    }
  })();

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: draft.serviceId,
          barberId: draft.barberId,
          date: draft.date,
          time: draft.time,
          customerName: draft.customerName,
          customerPhone: draft.customerPhone,
          customerEmail: draft.customerEmail,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { code: string };
        router.push(`/agendamento/confirmado?codigo=${data.code}`);
        return;
      }

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (response.status === 409) {
        setSubmitError(data.error ?? "Esse horário acabou de ser ocupado.");
        update({ time: null });
        setReloadToken((token) => token + 1);
        setStep(3);
      } else {
        setSubmitError(data.error ?? "Não foi possível concluir. Tente novamente.");
      }
    } catch {
      setSubmitError("Falha de conexão. Verifique sua internet e tente novamente.");
    }

    setSubmitting(false);
  }

  function handlePrimary() {
    if (step === 4) {
      setTouched({ customerName: true, customerPhone: true, customerEmail: true });
      if (hasErrors(customerErrors)) return;
    }
    if (step === STEPS.length - 1) {
      void submit();
      return;
    }
    goTo(Math.min(step + 1, STEPS.length - 1));
  }

  const primaryLabel = step === STEPS.length - 1 ? "Confirmar agendamento" : "Continuar";

  return (
    <div className="pb-32 lg:pb-16">
      <div className="border-b border-line bg-bone-200/60">
        <div className="shell py-5 sm:py-6">
          <BookingStepper
            steps={STEPS}
            current={step}
            maxReached={maxReached}
            onNavigate={goTo}
          />
        </div>
      </div>

      <div className="shell pt-8 sm:pt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div ref={stepRef} tabIndex={-1} className="min-w-0 outline-none">
            {step === 0 ? (
              <ServiceStep
                services={services}
                value={draft.serviceId}
                onChange={(serviceId) => update({ serviceId, time: null })}
              />
            ) : null}

            {step === 1 ? (
              <BarberStep
                barbers={barbers}
                value={draft.barberId}
                onChange={(barberId) => update({ barberId, time: null })}
              />
            ) : null}

            {step === 2 ? (
              <DateStep
                days={days}
                value={draft.date}
                onChange={(date) => update({ date, time: null })}
              />
            ) : null}

            {step === 3 ? (
              <TimeStep
                date={draft.date}
                status={slots.key === slotsKey ? slots.status : "loading"}
                slots={slots.items}
                value={draft.time}
                onChange={(time) => update({ time })}
                onRetry={() => setReloadToken((token) => token + 1)}
                onChangeDate={() => setStep(2)}
              />
            ) : null}

            {step === 4 ? (
              <DetailsStep
                values={customer}
                errors={customerErrors}
                touched={touched}
                onChange={(field, value) =>
                  update({ [field]: value } as Partial<BookingDraft>)
                }
                onBlur={(field) =>
                  setTouched((current) => ({ ...current, [field]: true }))
                }
                onSubmit={handlePrimary}
              />
            ) : null}

            {step === 5 ? (
              <ReviewStep
                service={service}
                barberLabel={barberLabel}
                date={draft.date}
                time={draft.time}
                customer={{
                  name: draft.customerName,
                  phone: draft.customerPhone,
                  email: draft.customerEmail || undefined,
                }}
                error={submitError}
                onNavigate={goTo}
              />
            ) : null}

            {/* Desktop actions */}
            <div className="mt-10 hidden items-center justify-between gap-4 border-t border-line pt-6 lg:flex">
              {step > 0 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  Voltar
                </Button>
              ) : (
                <Link
                  href="/"
                  className="text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
                >
                  Cancelar agendamento
                </Link>
              )}

              <Button
                size="lg"
                onClick={handlePrimary}
                disabled={!canContinue}
                loading={submitting}
              >
                {primaryLabel}
              </Button>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BookingSummary
                service={service}
                barberLabel={barberLabel || null}
                date={draft.date}
                time={draft.time}
                variant="aside"
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bone/95 backdrop-blur-md lg:hidden">
        <div className="shell flex flex-col gap-2.5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {service ? (
            <p className="flex items-center justify-between gap-4 text-xs text-muted">
              <span className="truncate">
                {service.name}
                {draft.time ? ` · ${draft.time}` : ""}
              </span>
              <span className="shrink-0 font-medium text-ink">
                {formatPrice(service.priceCents)} ·{" "}
                {formatDuration(service.durationMinutes)}
              </span>
            </p>
          ) : null}

          <div className="flex items-center gap-2">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                aria-label="Voltar para a etapa anterior"
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"
              >
                <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                  <path
                    d="M12 4l-6 6 6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null}

            <Button
              size="lg"
              fullWidth
              onClick={handlePrimary}
              disabled={!canContinue}
              loading={submitting}
            >
              {primaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
