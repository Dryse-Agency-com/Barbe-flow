"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Slide = {
  src: string;
  alt: string;
  label: string;
  description: string;
};

const SLIDES: Slide[] = [
  {
    src: "https://images.pexels.com/photos/5152514/pexels-photo-5152514.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=1200",
    alt: "Sala de corte da barbearia com espelhos e luz natural",
    label: "A sala de corte",
    description:
      "Três estações, luz natural de manhã e o silêncio de quem atende só por horário marcado.",
  },
  {
    src: "https://images.pexels.com/photos/10317447/pexels-photo-10317447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=1200",
    alt: "Espelho sem moldura e prateleira de madeira com produtos de barbearia",
    label: "A estação",
    description:
      "Espelho sem moldura, bancada de madeira e cada ferramenta no lugar certo — nada de caixas.",
  },
  {
    src: "https://images.pexels.com/photos/10317448/pexels-photo-10317448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=1200",
    alt: "Ferramentas de barbearia alinhadas sobre mesa de madeira",
    label: "Os detalhes",
    description:
      "Toalha quente, navalha afiada e produto escolhido a dedo. O acabamento é conferido duas vezes.",
  },
  {
    src: "https://images.pexels.com/photos/30547746/pexels-photo-30547746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=1200",
    alt: "Cadeira de barbeiro de couro em ambiente moderno",
    label: "A cadeira",
    description:
      "Couro com ajuste hidráulico e apoio de pescoço. É a parte mais disputada da casa.",
  },
];

const AUTOPLAY_MS = 6000;

export function BarbershopSection() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // One-time reveal when the section scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const paused = hover || focused || pageHidden || reduced;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [paused, index]);

  const previous = () =>
    setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((current) => (current + 1) % SLIDES.length);

  return (
    <section
      id="barbearia"
      className="dark-section scroll-mt-20 bg-ink text-bone"
      aria-label="Nossa barbearia"
    >
      <div ref={rootRef} className="shell py-20 sm:py-24">
        <div
          className={cn(
            "grid gap-12 transition-[opacity,transform] duration-700 ease-out lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] lg:gap-16",
            revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <div>
            <p className="eyebrow text-clay-400">Nossa barbearia</p>
            <h2 className="mt-5 font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-bone">
              O espaço por dentro.
            </h2>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-muted-dark">
              Menos enfeite, mais atenção ao que importa: luz boa, tempo de sobra e
              cada detalhe no lugar.
            </p>

            <ul className="mt-9">
              {SLIDES.map((slide, slideIndex) => {
                const active = slideIndex === index;
                return (
                  <li key={slide.label}>
                    <button
                      type="button"
                      onClick={() => setIndex(slideIndex)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-200",
                        active
                          ? "bg-white/10 text-bone"
                          : "text-muted-dark hover:bg-white/5 hover:text-bone",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[0.6875rem] tracking-[0.14em] tabular-nums",
                          active ? "text-clay-400" : "text-muted-dark/70",
                        )}
                      >
                        {String(slideIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium">{slide.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="mt-6 min-h-16 border-l-2 border-line-dark pl-4"
            >
              <p className="text-sm leading-relaxed text-muted-dark">
                {SLIDES[index].description}
              </p>
            </div>
          </div>

          <div
            role="group"
            aria-roledescription="carrossel"
            aria-label="Fotos da barbearia"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={() => setFocused(false)}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink-800 sm:aspect-[16/10] lg:aspect-[16/11]">
              {SLIDES.map((slide, slideIndex) => {
                const active = slideIndex === index;
                return (
                  <div
                    key={slide.label}
                    aria-hidden={!active}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700 ease-out",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={slideIndex === 0}
                      loading={slideIndex === 0 ? undefined : "lazy"}
                      sizes="(min-width: 1024px) 56vw, (min-width: 640px) 80vw, 92vw"
                      className="h-full w-full object-cover"
                      style={
                        active && !reduced
                          ? {
                              animation: `kenburns ${AUTOPLAY_MS + 1400}ms ease-out forwards`,
                            }
                          : undefined
                      }
                    />
                  </div>
                );
              })}

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
              />

              <span className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/20 bg-ink/40 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.14em] text-bone/90 backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")} / 0{SLIDES.length}
              </span>

              <div className="absolute right-4 bottom-4 flex gap-2">
                <button
                  type="button"
                  onClick={previous}
                  aria-label="Foto anterior"
                  className="grid size-11 place-items-center rounded-full border border-white/25 bg-ink/30 text-bone backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
                >
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                    <path
                      d="M12 4l-6 6 6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Próxima foto"
                  className="grid size-11 place-items-center rounded-full border border-white/25 bg-ink/30 text-bone backdrop-blur-sm transition-colors duration-200 hover:bg-white/15"
                >
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                    <path
                      d="M8 4l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
