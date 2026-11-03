import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,border-color,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-45 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-bone hover:bg-ink-700 active:bg-ink-800",
  secondary:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink hover:bg-bone-300/70",
  inverse: "bg-bone text-ink hover:bg-white",
  "inverse-outline":
    "border border-white/25 text-bone hover:border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.9375rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    loading?: boolean;
  };

type AnchorProps = CommonProps & {
  href: string;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export function Button(props: ButtonProps | AnchorProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    children,
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, prefetch, target, rel } = props;
    const isExternal = href.startsWith("http") || href.startsWith("tel:");
    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={rel ?? (target === "_blank" ? "noreferrer noopener" : undefined)}
          aria-label={props["aria-label"]}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        prefetch={prefetch}
        aria-label={props["aria-label"]}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  const { loading, disabled, type = "button", ...rest } = props as ButtonProps;

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
        />
      ) : null}
      {children}
    </button>
  );
}
