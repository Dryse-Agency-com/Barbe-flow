import { GoogleMark, Stars } from "@/components/ui/Stars";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBarberById, getServiceById } from "@/lib/data";
import { RATING_SUMMARY, REVIEWS, COMMENTS } from "@/lib/reviews";
import { firstName } from "@/lib/format";
import { cn } from "@/lib/cn";

function Avatar({ name, className }: { name: string; className?: string }) {
  const parts = name.trim().split(/\s+/);
  const label = (parts[0][0] ?? "").concat(parts.length > 1 ? (parts[1][0] ?? "") : "");
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full bg-ink-700 font-display text-[0.8125rem] font-semibold text-bone",
        className,
      )}
    >
      {label.toUpperCase()}
    </span>
  );
}

function RatingSummary() {
  const max = RATING_SUMMARY.distribution[0]?.count ?? 1;

  return (
    <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <GoogleMark className="size-[1.125rem]" />
        <span className="text-sm font-medium text-ink">Google Maps</span>
      </div>

      <div className="mt-6 flex items-end gap-4">
        <p className="font-display text-[3.5rem] leading-none font-semibold tracking-[-0.04em] text-ink">
          {RATING_SUMMARY.average.toFixed(1).replace(".", ",")}
        </p>
        <div className="pb-1.5">
          <Stars rating={RATING_SUMMARY.average} size="md" />
          <p className="mt-1.5 text-xs text-muted">
            {RATING_SUMMARY.total} avaliações
          </p>
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {RATING_SUMMARY.distribution.map((entry) => (
          <li key={entry.stars} className="flex items-center gap-3">
            <span className="w-2 text-right text-xs text-muted tabular-nums">
              {entry.stars}
            </span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-bone-300">
              <span
                className="block h-full rounded-full bg-warning"
                style={{ width: `${Math.round((entry.count / max) * 100)}%` }}
              />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        Nota pública da unidade Jardins, atualizada semanalmente.
      </p>
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  const service = getServiceById(review.serviceId);
  const barber = getBarberById(review.barberId ?? "");

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 sm:p-6">
      <header className="flex items-start gap-3.5">
        <Avatar name={review.author} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{review.author}</p>
          <p className="mt-0.5 text-xs text-muted">{review.timeAgo}</p>
        </div>
        <GoogleMark className="mt-1 size-4 opacity-90" />
      </header>

      <div className="mt-4 flex items-center gap-2">
        <Stars rating={review.rating} label={`Nota ${review.rating} de 5`} />
        <span className="truncate text-xs text-muted-soft">
          {service?.name}
          {barber ? ` · ${firstName(barber.name)}` : ""}
        </span>
      </div>

      <p className="mt-3.5 flex-1 text-sm leading-relaxed text-ink-600">{review.text}</p>

      {review.reply ? (
        <div className="mt-5 border-l-2 border-line-strong pl-4">
          <p className="text-xs text-muted">
            <span className="font-medium text-ink">Resposta de {review.reply.author}</span>{" "}
            · {review.reply.timeAgo}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{review.reply.text}</p>
        </div>
      ) : null}
    </article>
  );
}

export function ReviewsSection({ limit = 3 }: { limit?: number }) {
  const reviews = REVIEWS.slice(0, limit);

  return (
    <section id="avaliacoes" className="border-t border-line bg-bone scroll-mt-20">
      <div className="shell py-20 sm:py-24">
        <SectionHeading
          eyebrow="Avaliações"
          title="Quem senta na cadeira, volta."
          description="Comentários reais de clientes que agendaram pelo site e avaliaram a unidade no Google."
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8">
          <RatingSummary />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <h3 className="eyebrow text-muted-soft">Comentários recentes</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMMENTS.map((comment) => (
              <li key={comment.id} className="border-t border-line pt-4">
                <blockquote>
                  <p className="text-sm leading-relaxed text-ink-600">“{comment.text}”</p>
                  <footer className="mt-3 text-xs text-muted">
                    <cite className="font-medium text-ink not-italic">{comment.author}</cite>
                    <span className="mx-1.5 text-line-strong" aria-hidden="true">
                      ·
                    </span>
                    {comment.timeAgo}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>

          <a
            href={RATING_SUMMARY.listingUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            Ver todas as {RATING_SUMMARY.total} avaliações no Google
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
