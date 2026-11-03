"use client";

import { cn } from "@/lib/cn";

export type Step = { id: string; label: string };

export function BookingStepper({
  steps,
  current,
  maxReached,
  onNavigate,
}: {
  steps: Step[];
  current: number;
  maxReached: number;
  onNavigate: (index: number) => void;
}) {
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <div>
      {/* Mobile: compact progress */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-sm font-semibold tracking-[-0.01em] text-ink">
            {steps[current].label}
          </p>
          <p className="text-xs text-muted" aria-hidden="true">
            Etapa {current + 1} de {steps.length}
          </p>
        </div>
        <div
          className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={current + 1}
          aria-label={`Etapa ${current + 1} de ${steps.length}: ${steps[current].label}`}
        >
          <div
            className="h-full rounded-full bg-clay transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Desktop: full step list */}
      <nav aria-label="Etapas do agendamento" className="hidden md:block">
        <ol className="flex items-center gap-1">
          {steps.map((step, index) => {
            const isCurrent = index === current;
            const isDone = index < maxReached && index !== current;
            const reachable = index <= maxReached;

            return (
              <li key={step.id} className="flex min-w-0 items-center">
                <button
                  type="button"
                  onClick={() => reachable && onNavigate(index)}
                  disabled={!reachable}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors duration-200",
                    isCurrent && "text-ink",
                    !isCurrent && reachable && "text-muted hover:bg-bone-300/60 hover:text-ink",
                    !reachable && "cursor-not-allowed text-muted-soft/70",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full border text-[0.6875rem] font-medium transition-colors duration-200",
                      isCurrent && "border-clay bg-clay text-white",
                      isDone && "border-clay/35 bg-clay/10 text-clay",
                      !isCurrent && !isDone && "border-line-strong text-muted-soft",
                    )}
                  >
                    {isDone ? (
                      <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true">
                        <path
                          d="M3.5 8.5l3 3 6-7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="truncate">{step.label}</span>
                </button>

                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mx-1 h-px w-4 lg:w-6",
                      index < maxReached ? "bg-clay/30" : "bg-line",
                    )}
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
