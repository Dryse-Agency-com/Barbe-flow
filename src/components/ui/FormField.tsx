"use client";

import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type FormFieldProps = {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

export function FormField({
  label,
  hint,
  error,
  optional = false,
  ...inputProps
}: FormFieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink"
      >
        <span>{label}</span>
        {optional ? (
          <span className="text-xs font-normal text-muted-soft">opcional</span>
        ) : null}
      </label>

      <input
        {...inputProps}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-12 w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-muted-soft",
          "focus:outline-none focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10",
          error
            ? "border-clay ring-2 ring-clay/15 focus-visible:border-clay focus-visible:ring-clay/20"
            : "border-line hover:border-line-strong",
        )}
      />

      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-clay">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
