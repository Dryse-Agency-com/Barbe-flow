import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl leading-tight font-semibold tracking-[-0.03em] text-ink sm:text-[1.75rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="eyebrow text-muted-soft">{label}</p>
      <p className="mt-4 font-display text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-ink">
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
  padded = true,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-white", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <h2 className="font-display text-sm font-semibold tracking-[-0.01em] text-ink">
          {title}
        </h2>
        {action}
      </div>
      <div className={padded ? "p-5" : undefined}>{children}</div>
    </section>
  );
}
