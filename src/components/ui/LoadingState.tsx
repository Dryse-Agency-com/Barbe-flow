import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-lg bg-line/70", className)}
    />
  );
}

/** Accessible busy region with a skeleton grid — used while slots load. */
export function LoadingState({
  label = "Carregando",
  rows = 8,
  className,
  itemClassName = "h-12",
}: {
  label?: string;
  rows?: number;
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div role="status" aria-live="polite" className={className}>
      <span className="sr-only">{label}</span>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className={cn("rounded-xl", itemClassName)} />
        ))}
      </div>
    </div>
  );
}
