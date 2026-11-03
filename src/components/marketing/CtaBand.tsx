import { Button } from "@/components/ui/Button";

export function CtaBand({
  title = "Pronto para o próximo corte?",
  description = "Escolha o serviço, o profissional e o horário. A confirmação é imediata.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="border-t border-line bg-bone">
      <div className="shell py-20 sm:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span aria-hidden="true" className="h-10 w-px bg-line-strong" />
          <h2 className="mt-8 font-display text-[clamp(2rem,6.5vw,3.5rem)] leading-[1] font-semibold tracking-[-0.04em] text-ink">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-muted sm:text-base">
            {description}
          </p>
          <div className="mt-9 w-full sm:w-auto">
            <Button href="/agendar" size="lg" fullWidth className="sm:w-auto sm:px-10">
              Agendar agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
