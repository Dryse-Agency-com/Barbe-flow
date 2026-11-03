import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { Wordmark } from "@/components/layout/Wordmark";

export const metadata: Metadata = {
  title: "Entrar · Painel BarberFlow",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <section className="dark-section hidden flex-col justify-between bg-ink p-12 text-bone lg:flex">
        <Wordmark tone="dark" href="/" />
        <div className="max-w-sm">
          <h1 className="font-display text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.04em]">
            Painel da barbearia.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-dark">
            Agenda, serviços e clientes em um só lugar — com a mesma precisão da
            experiência de agendamento.
          </p>
        </div>
        <p className="text-xs text-muted-dark">Jardins — São Paulo</p>
      </section>

      <section className="flex flex-col justify-center bg-bone px-5 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <Wordmark />
          </div>

          <h2 className="mt-8 font-display text-2xl font-semibold tracking-[-0.03em] text-ink lg:mt-0">
            Entrar
          </h2>
          <p className="mt-2 text-sm text-muted">
            Acesso restrito à equipe da unidade.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted">
            Ambiente de demonstração: a autenticação será conectada na próxima etapa.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex text-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
          >
            Voltar para o site
          </Link>
        </div>
      </section>
    </div>
  );
}
