import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bone">
      <div className="shell pt-12 sm:pt-16 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7 lg:pb-24">
            <p className="eyebrow text-clay">{BUSINESS.shortAddress}</p>

            <h1 className="mt-5 font-display text-[clamp(2.75rem,10vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
              Seu próximo corte
              <br className="hidden sm:block" /> começa aqui
              <span className="text-clay">.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Agende seu horário com simplicidade, escolha seu barbeiro e chegue na
              hora certa.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/agendar" size="lg" className="sm:w-auto">
                Agendar horário
              </Button>
              <Button href="/servicos" size="lg" variant="secondary">
                Conhecer serviços
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 sm:max-w-lg">
              <div>
                <dt className="eyebrow text-muted-soft">Funcionamento</dt>
                <dd className="mt-2 text-sm text-ink">
                  Seg a sex, 09—20
                  <span className="block text-muted">Sábado, 09—18</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-soft">Endereço</dt>
                <dd className="mt-2 text-sm text-ink">
                  Rua Oscar Freire, 1284
                  <span className="block text-muted">Jardins, São Paulo</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-ink-800 sm:aspect-[16/10] lg:aspect-[3/4] lg:rounded-t-2xl">
              <Image
                src="/images/hero.jpg"
                alt="Salão da BarberFlow com paredes grafite e luz natural"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
