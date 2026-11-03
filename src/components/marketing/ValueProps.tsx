import { SectionHeading } from "@/components/ui/SectionHeading";

const ITEMS = [
  {
    index: "01",
    title: "Agendamento simples",
    description: "Serviço, profissional e horário em menos de um minuto, pelo celular.",
  },
  {
    index: "02",
    title: "Profissionais especializados",
    description: "Cada barbeiro tem uma especialidade clara. Você escolhe quem atende.",
  },
  {
    index: "03",
    title: "Horário organizado",
    description: "Agenda controlada por intervalo real de cada serviço. Sem espera.",
  },
  {
    index: "04",
    title: "Experiência premium",
    description: "Ambiente silencioso, produtos selecionados e acabamento impecável.",
  },
];

export function ValueProps() {
  return (
    <section className="dark-section bg-ink text-bone">
      <div className="shell py-20 sm:py-24">
        <SectionHeading
          eyebrow="Por que a BarberFlow"
          title="Precisão do agendamento à cadeira."
          tone="dark"
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.index} className="bg-ink p-6 sm:p-7">
              <span className="font-mono text-xs tracking-[0.12em] text-clay-400">
                {item.index}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-bone">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-dark">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
