import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatDuration, formatPrice } from "@/lib/format";
import type { Service } from "@/lib/types";

function CheckMark({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-200",
        active ? "border-clay bg-clay text-white" : "border-line-strong text-transparent",
      )}
    >
      <svg viewBox="0 0 16 16" className="size-3.5">
        <path
          d="M3.5 8.5l3 3 6-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const shell =
  "group flex h-full flex-col overflow-hidden rounded-2xl border bg-white text-left transition-[border-color,box-shadow] duration-200";

type ServiceCardProps =
  | {
      service: Service;
      href: string;
      onSelect?: undefined;
      selected?: undefined;
      className?: string;
      /** Preview cards skip the photo; the catalog and booking flow keep it. */
      compact?: boolean;
    }
  | {
      service: Service;
      href?: undefined;
      onSelect: () => void;
      selected: boolean;
      className?: string;
      compact?: boolean;
    };

export function ServiceCard(props: ServiceCardProps) {
  const { service, className, compact = false } = props;
  const showImage = !compact;

  const image = showImage ? (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-800 sm:aspect-[3/2]">
      <Image
        src={service.image}
        alt={service.imageAlt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  ) : null;

  const body = (
    <>
      <div className={cn("flex-1", showImage ? "p-5 pb-5 sm:p-6" : "pb-5")}>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.0625rem] leading-snug font-semibold tracking-[-0.02em] text-ink sm:text-lg">
            {service.name}
          </h3>
          {"onSelect" in props && props.selected !== undefined ? (
            <CheckMark active={props.selected} />
          ) : (
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-muted-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink"
            >
              <svg viewBox="0 0 16 16" className="size-4">
                <path
                  d="M3 8h9m0 0l-3.5-3.5M12 8l-3.5 3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>
      </div>

      <div
        className={cn(
          "flex items-baseline justify-between gap-4 border-t border-line pt-4",
          showImage ? "mx-5 mb-5 sm:mx-6 sm:mb-6" : "",
        )}
      >
        <span className="font-display text-base font-semibold tracking-[-0.02em] text-ink">
          {formatPrice(service.priceCents)}
        </span>
        <span className="text-[0.8125rem] text-muted">
          {formatDuration(service.durationMinutes)}
        </span>
      </div>
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={cn(
          shell,
          "border-line hover:border-ink/25 hover:shadow-[0_18px_40px_-30px_rgba(12,13,15,0.6)]",
          className,
        )}
      >
        {image}
        {body}
      </Link>
    );
  }

  const selected = props.selected;

  return (
    <button
      type="button"
      onClick={props.onSelect}
      aria-pressed={selected}
      className={cn(
        shell,
        selected
          ? "border-clay shadow-[0_18px_40px_-30px_rgba(185,87,58,0.9)]"
          : "border-line hover:border-ink/25",
        className,
      )}
    >
      {image}
      {body}
    </button>
  );
}
