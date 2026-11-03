"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { filterGallery, getGalleryFilters } from "@/lib/gallery";
import { getBarberById, getServiceById } from "@/lib/data";
import { formatDuration, formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/lib/types";
import styles from "./GalleryGrid.module.css";

const FILTER_LABELS = getGalleryFilters();

const IMAGE_SIZES =
  "(min-width: 1280px) 384px, (min-width: 1024px) calc((100vw - 8rem) / 3), (min-width: 640px) calc((100vw - 5.25rem) / 2), (min-width: 560px) calc((100vw - 3.5rem) / 2), calc(100vw - 2.5rem)";

/** One identical landscape tile for both the home page and the full gallery. */
function Tile({
  item,
  onOpen,
  priority = false,
}: {
  item: GalleryItem;
  onOpen: () => void;
  priority?: boolean;
}) {
  const service = getServiceById(item.serviceId);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver foto: ${item.alt}`}
      aria-haspopup="dialog"
      className={styles.card}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={IMAGE_SIZES}
        className={styles.image}
        style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
      />
      <span aria-hidden="true" className={styles.gradient} />
      <span className={styles.caption}>{service?.name ?? "Corte"}</span>
    </button>
  );
}

export function GalleryGrid({
  items,
  withFilters = true,
  priorityImages = 3,
}: {
  items: GalleryItem[];
  withFilters?: boolean;
  /** Below-the-fold sections use 0; the standalone page prioritizes its first row. */
  priorityImages?: number;
}) {
  const [filter, setFilter] = useState("todos");
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => filterGallery(items, filter), [items, filter]);
  const open = items.find((item) => item.id === openId) ?? null;
  const openService = open ? getServiceById(open.serviceId) : null;
  const openBarber = open ? getBarberById(open.barberId) : null;
  const closeDialog = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    const root = rootRef.current;
    if (
      !root ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        root.dataset.revealed = "true";
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {withFilters ? (
        <div className="mb-8">
          <div
            role="group"
            aria-label="Filtrar galeria por serviço"
            className="flex flex-wrap gap-2"
          >
            {FILTER_LABELS.map((option) => {
              const active = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  aria-pressed={active}
                  className={cn(
                    "h-10 cursor-pointer rounded-full border px-4 text-sm transition-colors duration-200",
                    active
                      ? "border-ink bg-ink text-bone"
                      : "border-line-strong bg-transparent text-muted hover:border-ink hover:text-ink",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-muted" aria-live="polite">
            {visible.length} {visible.length === 1 ? "registro" : "registros"} na galeria
          </p>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <EmptyState
          title="Nenhum registro nesse filtro"
          description="Ainda não publicamos um corte desse serviço. Veja todos os outros trabalhos."
          action={
            <Button variant="secondary" size="sm" onClick={() => setFilter("todos")}>
              Ver todos
            </Button>
          }
        />
      ) : (
        <ul className={styles.grid} role="list" aria-label="Trabalhos da BarberFlow">
          {visible.map((item, index) => (
            <li
              key={item.id}
              className={styles.item}
              style={{ "--gallery-index": Math.min(index, 8) } as CSSProperties}
            >
              <Tile
                item={item}
                priority={index < priorityImages}
                onOpen={() => setOpenId(item.id)}
              />
            </li>
          ))}
        </ul>
      )}

      <Dialog
        open={open !== null}
        onClose={closeDialog}
        title={openService?.name ?? "Registro"}
        description={open?.caption}
        footer={
          openService ? (
            <Button href={`/agendar?servico=${openService.id}`} size="lg" fullWidth>
              Agendar {openService.name}
            </Button>
          ) : null
        }
      >
        {open ? (
          <figure className="space-y-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-ink-800">
              <Image
                src={open.image}
                alt={open.alt}
                fill
                sizes="(min-width: 640px) 32rem, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              <span className="font-medium text-ink">Cliente {open.client}</span>
              {openBarber ? <span>· {openBarber.name}</span> : null}
              {openService ? (
                <span>
                  · {formatDuration(openService.durationMinutes)} ·{" "}
                  {formatPrice(openService.priceCents)}
                </span>
              ) : null}
            </figcaption>
          </figure>
        ) : null}
      </Dialog>
    </div>
  );
}
