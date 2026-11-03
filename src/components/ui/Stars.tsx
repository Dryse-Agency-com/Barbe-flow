import { cn } from "@/lib/cn";

const STAR_PATH =
  "M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.6z";

/**
 * One star rendered as a dim base with a clipped full-colour overlay.
 * No SVG defs/ids, so the same component can repeat safely across the page.
 */
function Star({ fill, className }: { fill: number; className: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-full text-warning/20">
        <path d={STAR_PATH} fill="currentColor" />
      </svg>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
      >
        <svg viewBox="0 0 20 20" className="size-[1rem] text-warning" aria-hidden="true">
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

/**
 * Google-style star row. `role="img"` + label keeps it readable for screen
 * readers without exposing five nested graphics.
 */
export function Stars({
  rating,
  size = "sm",
  className,
  label,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const dimension = size === "lg" ? "size-5" : size === "md" ? "size-[1.125rem]" : "size-4";
  const gap = size === "sm" ? "gap-0.5" : "gap-1";
  const stars = [1, 2, 3, 4, 5].map((index) => {
    const fill = Math.min(1, Math.max(0, rating - index + 1));
    return <Star key={index} fill={fill} className={dimension} />;
  });

  return (
    <span
      role="img"
      aria-label={label ?? `Nota ${rating.toFixed(1)} de 5`}
      className={cn("inline-flex items-center", gap, className)}
    >
      {stars}
    </span>
  );
}

/** Neutral four-colour mark used to identify the review source. */
export function GoogleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.44a5.5 5.5 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.59-5.15 3.59-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.95-2.92l-3.86-3a7.19 7.19 0 0 1-10.7-3.78H1.4v3.1A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.98 11.98 0 0 0 1.4 6.6l4 3.1A7.19 7.19 0 0 1 12 4.75z"
      />
    </svg>
  );
}
