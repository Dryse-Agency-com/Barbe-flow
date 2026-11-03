import type { Barber, Service } from "./types";

/**
 * Local mock catalog. Replace these readers with queries when the catalog
 * moves to the database — the exported function signatures stay the same.
 */

const SERVICES: Service[] = [
  {
    id: "corte-masculino",
    name: "Corte Masculino",
    description:
      "Corte sob medida para o formato do seu rosto, finalizado com styling leve.",
    priceCents: 4500,
    durationMinutes: 45,
    active: true,
    featured: true,
    includes: ["Consulta de estilo", "Lavagem", "Corte na tesoura e máquina", "Finalização"],
    image: "/images/services/corte-masculino.jpg",
    imageAlt: "Cliente finalizando um corte clássico na tesoura",
  },
  {
    id: "barba",
    name: "Barba",
    description:
      "Desenho da barba com navalha, toalha quente e hidratação da pele.",
    priceCents: 3500,
    durationMinutes: 30,
    active: true,
    featured: true,
    includes: ["Toalha quente", "Alinhamento com navalha", "Óleo pós-barba"],
    image: "/images/services/barba.jpg",
    imageAlt: "Barbeiro alinhando uma barba cheia com navalha",
  },
  {
    id: "corte-barba",
    name: "Corte + Barba",
    description:
      "O combo completo: corte sob medida e barba alinhada na mesma sessão.",
    priceCents: 7000,
    durationMinutes: 75,
    active: true,
    featured: true,
    includes: [
      "Consulta de estilo",
      "Lavagem",
      "Corte completo",
      "Barba com navalha",
      "Finalização",
    ],
    image: "/images/services/corte-barba.jpg",
    imageAlt: "Cliente na cadeira durante corte e barba na mesma sessão",
  },
  {
    id: "acabamento",
    name: "Acabamento",
    description:
      "Manutenção rápida de pescoço, costeletas e contornos entre os cortes.",
    priceCents: 2500,
    durationMinutes: 20,
    active: true,
    featured: true,
    includes: ["Contornos", "Pescoço e costeletas", "Finalização"],
    image: "/images/services/acabamento.jpg",
    imageAlt: "Detalhe do acabamento na nuca com máquina",
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    description:
      "Limpeza e alinhamento discretos, respeitando o traço natural.",
    priceCents: 2000,
    durationMinutes: 15,
    active: true,
    featured: false,
    includes: ["Alinhamento na navalha", "Acabamento na pinça"],
    image: "/images/services/sobrancelha.jpg",
    imageAlt: "Alinhamento discreto de sobrancelha masculina",
  },
];

const BARBERS: Barber[] = [
  {
    id: "rafael-moura",
    name: "Rafael Moura",
    role: "Barbeiro sênior · fundador",
    bio: "Doze anos de cadeira. Especialista em cortes clássicos executados com precisão milimétrica e em barbas desenhadas na navalha.",
    specialties: ["Clássicos", "Navalha", "Barba cheia"],
    image: "/images/barbers/rafael.jpg",
    active: true,
  },
  {
    id: "caio-ribeiro",
    name: "Caio Ribeiro",
    role: "Barbeiro",
    bio: "Referência em degradês e trabalhos com máquina. Gosta de cortes curtos com textura e transições limpas.",
    specialties: ["Fade", "Texturizado", "Cortes curtos"],
    image: "/images/barbers/caio.jpg",
    active: true,
  },
  {
    id: "diego-salles",
    name: "Diego Salles",
    role: "Barbeiro · especialista em barba",
    bio: "Trabalha cabelos médios e longos e cuida de barbas cheias com protocolo completo de hidratação.",
    specialties: ["Cabelo médio", "Barba terapia", "Styling"],
    image: "/images/barbers/diego.jpg",
    active: true,
  },
];

export const BUSINESS = {
  name: "BarberFlow",
  tagline: "Barbearia moderna",
  address: "Rua Oscar Freire, 1284 — Jardins, São Paulo",
  shortAddress: "Jardins, São Paulo",
  phone: "+55 11 94002-8922",
  phoneDigits: "5511940028922",
  email: "contato@barberflow.com.br",
  hours: [
    { label: "Segunda a sexta", value: "09:00 — 20:00" },
    { label: "Sábado", value: "09:00 — 18:00" },
    { label: "Domingo", value: "Fechado" },
  ],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Google", href: "#" },
  ],
} as const;

export function getServices(): Service[] {
  return SERVICES.filter((service) => service.active);
}

export function getFeaturedServices(): Service[] {
  return getServices().filter((service) => service.featured);
}

export function getServiceById(id: string | null | undefined): Service | undefined {
  if (!id) return undefined;
  return SERVICES.find((service) => service.id === id);
}

export function getBarbers(): Barber[] {
  return BARBERS.filter((barber) => barber.active);
}

export function getBarberById(id: string | null | undefined): Barber | undefined {
  if (!id) return undefined;
  return BARBERS.find((barber) => barber.id === id);
}
