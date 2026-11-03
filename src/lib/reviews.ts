import type { Review, ShortComment } from "./types";

/** Aggregate rating mirrored from the shop's public Google listing. */
export const RATING_SUMMARY = {
  average: 4.9,
  total: 312,
  distribution: [
    { stars: 5, count: 289 },
    { stars: 4, count: 17 },
    { stars: 3, count: 3 },
    { stars: 2, count: 1 },
    { stars: 1, count: 2 },
  ],
  source: "Google Maps",
  listingUrl: "https://www.google.com/maps",
} as const;

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Fernando Almada",
    rating: 5,
    timeAgo: "há 2 semanas",
    text: "Horário marcado pelo site em menos de um minuto e fui atendido no minuto exato. Primeira vez que uma barbearia respeita minha agenda em vez de eu respeitar a dela.",
    serviceId: "corte-barba",
    barberId: "rafael-moura",
    reply: {
      author: "BarberFlow",
      timeAgo: "há 2 semanas",
      text: "Isso que a gente gosta de ler, Fernando. Nos vemos no próximo corte.",
    },
  },
  {
    id: "rev-4",
    author: "Marcelo Quintela",
    rating: 4,
    timeAgo: "há 2 meses",
    text: "Atendimento excelente e resultado impecável. Só achei que faltou estacionamento próprio na região, o que na Oscar Freire é sempre um desafio.",
    serviceId: "corte-masculino",
    barberId: "rafael-moura",
    reply: {
      author: "BarberFlow",
      timeAgo: "há 2 meses",
      text: "Obrigado pela nota, Marcelo. Temos convênio com o garagem do número 1290 — é só pedir na recepção.",
    },
  },
  {
    id: "rev-2",
    author: "Gustavo Pinheiro",
    rating: 5,
    timeAgo: "há 1 mês",
    text: "Sou cliente do Caio há oito meses. O degradê sai limpo, sem marca de máquina, e dura quase três semanas. Ambiente silencioso, dá pra relaxar de verdade.",
    serviceId: "corte-masculino",
    barberId: "caio-ribeiro",
  },
  {
    id: "rev-3",
    author: "Leandro Bittencourt",
    rating: 5,
    timeAgo: "há 1 mês",
    text: "Fiz o combo corte e barba pela primeira vez. A toalha quente e o alinhamento na navalha fazem toda a diferença — saí de lá parecendo outro homem.",
    serviceId: "corte-barba",
    barberId: "diego-salles",
  },
  {
    id: "rev-5",
    author: "Rodrigo Salgado",
    rating: 5,
    timeAgo: "há 3 meses",
    text: "Voltei a cortar cabelo com prazer. Pelo app escolho o barbeiro, vejo o horário livre e pronto. Nunca mais fiquei esperando numa cadeira.",
    serviceId: "acabamento",
    barberId: "caio-ribeiro",
  },
  {
    id: "rev-6",
    author: "Thiago Bertoldo",
    rating: 5,
    timeAgo: "há 4 meses",
    text: "Preço justo pelo que entrega. Já cortei em barbearia mais cara no Jardins e saía menos satisfeito. Aqui o detalhe da nuca é sempre conferido.",
    serviceId: "corte-masculino",
    barberId: "diego-salles",
  },
];

export const COMMENTS: ShortComment[] = [
  {
    id: "c-1",
    author: "André P.",
    timeAgo: "há 5 dias",
    text: "Saí de lá com a sensação de corte novo por uma semana.",
  },
  {
    id: "c-2",
    author: "Bruno M.",
    timeAgo: "há 1 semana",
    text: "Café bom, playlist melhor e zero espera.",
  },
  {
    id: "c-3",
    author: "Caue R.",
    timeAgo: "há 2 semanas",
    text: "Nunca vi um degradê tão limpo em São Paulo.",
  },
  {
    id: "c-4",
    author: "Diego F.",
    timeAgo: "há 3 semanas",
    text: "Levei meu pai e ele já marcou o próximo.",
  },
  {
    id: "c-5",
    author: "Élber N.",
    timeAgo: "há 1 mês",
    text: "A barba com navalha vale cada centavo.",
  },
  {
    id: "c-6",
    author: "Fabrício T.",
    timeAgo: "há 1 mês",
    text: "Agenda pontual, atendimento direto, sem enrolação.",
  },
];
