"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Informe e-mail e senha para continuar.");
      return;
    }
    setError(null);
    setLoading(true);
    router.push("/admin");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormField
        label="E-mail"
        type="email"
        autoComplete="email"
        placeholder="voce@barberflow.com.br"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormField
        label="Senha"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-clay/30 bg-clay-50 px-4 py-3 text-sm text-clay-600"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" fullWidth loading={loading}>
        Entrar no painel
      </Button>
    </form>
  );
}
