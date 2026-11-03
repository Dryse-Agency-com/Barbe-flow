import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/layout/Wordmark";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-bone">
      <div className="shell flex h-16 items-center sm:h-18">
        <Wordmark />
      </div>

      <main className="shell flex flex-1 flex-col justify-center py-20">
        <p className="eyebrow text-clay">Erro 404</p>
        <h1 className="mt-5 max-w-xl font-display text-[clamp(2rem,7vw,3.5rem)] leading-[1] font-semibold tracking-[-0.04em] text-ink">
          Essa página saiu da agenda.
        </h1>
        <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted">
          O endereço que você acessou não existe mais. Volte para o início ou reserve
          seu horário direto na agenda.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Voltar para o início
          </Button>
          <Button href="/agendar" size="lg" variant="secondary">
            Agendar horário
          </Button>
        </div>
      </main>
    </div>
  );
}
