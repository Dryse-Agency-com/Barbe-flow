"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

/**
 * Lightweight accessible dialog: bottom sheet on mobile, centered panel on
 * larger screens. No dependency, focus is trapped and restored.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const frame = requestAnimationFrame(() => {
      const node = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (node ?? panelRef.current)?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px]"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative z-10 max-h-[88dvh] w-full overflow-y-auto rounded-t-2xl bg-bone p-6 shadow-[0_-16px_48px_rgba(12,13,15,0.2)] outline-none sm:max-w-lg sm:rounded-2xl sm:p-8 sm:shadow-[0_24px_64px_rgba(12,13,15,0.24)]"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em] text-ink">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-mt-1 -mr-1 grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-bone-300 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {children ? <div className="mt-6">{children}</div> : null}
        {footer ? <div className="mt-8">{footer}</div> : null}
      </div>
    </div>
  );
}
