import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { firstName } from "@/lib/format";
import type { Barber } from "@/lib/types";

export function SpecialtyList({
  specialties,
  tone = "light",
}: {
  specialties: string[];
  tone?: "light" | "dark";
}) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {specialties.map((specialty) => (
        <li
          key={specialty}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[0.6875rem] tracking-[0.02em]",
            tone === "dark"
              ? "border-white/15 text-bone/75"
              : "border-line-strong text-muted",
          )}
        >
          {specialty}
        </li>
      ))}
    </ul>
  );
}

/** Full profile card used on the home page and the team directory. */
export function BarberCard({
  barber,
  priority = false,
}: {
  barber: Barber;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-200 hover:border-ink/20 hover:shadow-[0_18px_40px_-32px_rgba(12,13,15,0.6)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-800 sm:aspect-[4/5]">
        <Image
          src={barber.image}
          alt={`Retrato de ${barber.name}`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-ink">
          {barber.name}
        </h3>
        <p className="mt-1 text-[0.8125rem] text-clay">{barber.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{barber.bio}</p>

        <div className="mt-5">
          <SpecialtyList specialties={barber.specialties} />
        </div>

        <div className="mt-6 pt-1">
          <Button
            href={`/agendar?barbeiro=${barber.id}`}
            variant="secondary"
            size="sm"
            fullWidth
          >
            Agendar com {firstName(barber.name)}
          </Button>
        </div>
      </div>
    </article>
  );
}

/** Compact selectable variant used inside the booking flow. */
export function BarberOption({
  name,
  role,
  image,
  selected,
  onSelect,
  initials,
}: {
  name: string;
  role: string;
  image?: string;
  selected: boolean;
  onSelect: () => void;
  initials?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-4 rounded-2xl border bg-white p-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200 sm:p-4",
        selected
          ? "border-clay bg-clay-50 shadow-[0_12px_32px_-26px_rgba(185,87,58,0.8)]"
          : "border-line hover:border-ink/25",
      )}
    >
      <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-bone-300 sm:size-16">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="64px"
            loading="lazy"
            className="object-cover"
          />
        ) : (
          <span className="grid h-full w-full place-items-center font-display text-sm font-semibold tracking-[-0.02em] text-ink-500">
            {initials}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-display text-[0.9375rem] font-semibold tracking-[-0.02em] text-ink sm:text-base">
          {name}
        </span>
        <span className="mt-0.5 block truncate text-[0.8125rem] text-muted">{role}</span>
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-200",
          selected ? "border-clay bg-clay text-white" : "border-line-strong text-transparent",
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
    </button>
  );
}
