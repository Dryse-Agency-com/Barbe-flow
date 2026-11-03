import { phoneDigits } from "./format";

export type CustomerFields = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
};

export type CustomerErrors = Partial<Record<keyof CustomerFields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Shared by the form (live feedback) and the API route (trusted check). */
export function validateCustomer(fields: CustomerFields): CustomerErrors {
  const errors: CustomerErrors = {};
  const name = fields.customerName.trim();
  const digits = phoneDigits(fields.customerPhone);
  const email = fields.customerEmail.trim();

  if (name.length < 3) {
    errors.customerName = "Informe seu nome completo.";
  } else if (!name.includes(" ")) {
    errors.customerName = "Inclua nome e sobrenome.";
  }

  if (digits.length < 10) {
    errors.customerPhone = "Informe um WhatsApp com DDD.";
  } else if (digits.length > 11) {
    errors.customerPhone = "Número de WhatsApp inválido.";
  }

  if (email.length > 0 && !EMAIL_PATTERN.test(email)) {
    errors.customerEmail = "E-mail inválido.";
  }

  return errors;
}

export function hasErrors(errors: CustomerErrors): boolean {
  return Object.keys(errors).length > 0;
}
