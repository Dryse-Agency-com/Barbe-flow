import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({
  tone = "light",
  className,
  href = "/",
}: {
  tone?: "light" | "dark";
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-display text-[1.0625rem] leading-none font-semibold tracking-[-0.04em] transition-opacity hover:opacity-70",
        tone === "dark" ? "text-bone" : "text-ink",
        className,
      )}
      aria-label="BarberFlow — página inicial"
    >
      BarberFlow
      <span className="text-clay" aria-hidden="true">
        .
      </span>
    </Link>
  );
}
