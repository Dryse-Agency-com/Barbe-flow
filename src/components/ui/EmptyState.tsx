import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong bg-bone-200/50 px-6 py-12 text-center",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mb-4 block h-px w-10 bg-line-strong"
      />
      <p className="text-base font-medium text-ink">{title}</p>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
