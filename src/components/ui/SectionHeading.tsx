import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className={cn("eyebrow mb-4", dark ? "text-clay-400" : "text-clay")}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em]",
            dark ? "text-bone" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 text-[0.9375rem] leading-relaxed sm:text-base",
              dark ? "text-muted-dark" : "text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
