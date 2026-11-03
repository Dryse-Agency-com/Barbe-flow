export function StepHeader({
  title,
  description,
  id,
}: {
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <header className="mb-6 sm:mb-8">
      <h2
        id={id}
        className="font-display text-[clamp(1.5rem,4.5vw,2rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-ink"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted sm:text-[0.9375rem]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
