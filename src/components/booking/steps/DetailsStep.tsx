"use client";

import { StepHeader } from "@/components/booking/StepHeader";
import { FormField } from "@/components/ui/FormField";
import { maskPhone } from "@/lib/format";
import type { CustomerErrors, CustomerFields } from "@/lib/validation";

export function DetailsStep({
  values,
  errors,
  touched,
  onChange,
  onBlur,
  onSubmit,
}: {
  values: CustomerFields;
  errors: CustomerErrors;
  touched: Partial<Record<keyof CustomerFields, boolean>>;
  onChange: (field: keyof CustomerFields, value: string) => void;
  onBlur: (field: keyof CustomerFields) => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <StepHeader
        title="Seus dados"
        description="Só precisamos do essencial para confirmar e avisar sobre o horário."
      />

      <form
        className="max-w-xl space-y-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <FormField
          label="Nome completo"
          name="name"
          autoComplete="name"
          placeholder="Ex.: João Almeida"
          inputMode="text"
          value={values.customerName}
          onChange={(event) => onChange("customerName", event.target.value)}
          onBlur={() => onBlur("customerName")}
          error={touched.customerName ? errors.customerName : undefined}
        />

        <FormField
          label="WhatsApp"
          name="phone"
          autoComplete="tel-national"
          inputMode="numeric"
          placeholder="(11) 90000-0000"
          hint="Enviamos a confirmação e o lembrete por aqui."
          value={values.customerPhone}
          onChange={(event) => onChange("customerPhone", maskPhone(event.target.value))}
          onBlur={() => onBlur("customerPhone")}
          error={touched.customerPhone ? errors.customerPhone : undefined}
        />

        <FormField
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          optional
          placeholder="voce@email.com"
          value={values.customerEmail}
          onChange={(event) => onChange("customerEmail", event.target.value)}
          onBlur={() => onBlur("customerEmail")}
          error={touched.customerEmail ? errors.customerEmail : undefined}
        />
      </form>
    </div>
  );
}
