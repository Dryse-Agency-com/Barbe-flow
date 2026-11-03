import { getServiceById } from "./data";
import type { GalleryItem } from "./types";

/**
 * Client cuts published by the shop.
 * Images are remote stock photography for now — swap the `image` URLs for local
 * uploads (or a Supabase storage bucket) without touching any component.
 */
const GALLERY: GalleryItem[] = [
  {
    id: "fade-classico",
    image:
      "https://images.pexels.com/photos/39559325/pexels-photo-39559325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Corte degradê com barba alinhada visto de perfil",
    client: "Léo",
    serviceId: "corte-masculino",
    barberId: "caio-ribeiro",
    caption: "Degradê alto com linha reta e barba fechada na mesma sessão.",
    publishedIn: "2026-02",
  },
  {
    id: "linha-lateral",
    image:
      "https://images.pexels.com/photos/7781852/pexels-photo-7781852.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Perfil de cliente com corte moderno e barba alinhada",
    client: "Yuri",
    serviceId: "corte-masculino",
    barberId: "diego-salles",
    caption: "Linha lateral fechada e topo com movimento, finalizado com pomada matte.",
    publishedIn: "2026-02",
  },
  {
    id: "barba-desenhada",
    image:
      "https://images.pexels.com/photos/3998413/pexels-photo-3998413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Cliente recebendo alinhamento de barba na cadeira",
    client: "Otávio",
    serviceId: "barba",
    barberId: "rafael-moura",
    caption: "Contorno na navalha depois de toalha quente e óleo pós-barba.",
    publishedIn: "2026-02",
  },
  {
    id: "corte-barba-completo",
    image:
      "https://images.pexels.com/photos/9992820/pexels-photo-9992820.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Cliente de barba durante corte completo na barbearia",
    client: "Márcio",
    serviceId: "corte-barba",
    barberId: "diego-salles",
    caption: "Combo completo: tesoura no topo, máquina nas laterais, barba na navalha.",
    publishedIn: "2026-01",
  },
  {
    id: "nuca-acabamento",
    image:
      "https://images.pexels.com/photos/6487911/pexels-photo-6487911.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Detalhe da nuca com acabamento em degradê",
    client: "Renan",
    serviceId: "acabamento",
    barberId: "caio-ribeiro",
    caption: "Transição limpa na nuca — vinte minutos entre um corte e outro.",
    publishedIn: "2026-01",
  },
  {
    id: "texturizado",
    image:
      "https://images.pexels.com/photos/17928570/pexels-photo-17928570.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Retrato em preto e branco de corte texturizado",
    client: "Davi",
    serviceId: "corte-masculino",
    barberId: "diego-salles",
    caption: "Comprimento no topo com textura matte e laterais esfumadas.",
    publishedIn: "2026-01",
  },
  {
    id: "pente-e-tesoura",
    image:
      "https://images.pexels.com/photos/13758247/pexels-photo-13758247.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Barbeiro penteando o cabelo do cliente durante o acabamento",
    client: "Samuel",
    serviceId: "acabamento",
    barberId: "rafael-moura",
    caption: "Ajuste final no pente antes de sair da cadeira.",
    publishedIn: "2025-12",
  },
  {
    id: "classe-executiva",
    image:
      "https://images.pexels.com/photos/7781848/pexels-photo-7781848.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=880",
    alt: "Perfil de homem com corte executivo na barbearia",
    client: "Eduardo",
    serviceId: "corte-masculino",
    barberId: "rafael-moura",
    caption: "Clássico executivo, repartido ao lado, com acabamento discreto.",
    publishedIn: "2025-12",
  },
  {
    id: "barba-terapia",
    image: "/images/galeria/barba-navalha.jpg",
    alt: "Alinhamento de barba curta com navalha por barbeiro usando luvas pretas",
    imagePosition: "center 56%",
    client: "Hugo",
    serviceId: "barba",
    barberId: "diego-salles",
    caption: "Contorno da barba desenhado na navalha, com linhas precisas e acabamento natural.",
    publishedIn: "2025-11",
  },
];

export function getGallery(): GalleryItem[] {
  return GALLERY;
}

export type GalleryFilter = { id: string; label: string };

/** Filter options derived from the services actually present in the gallery. */
export function getGalleryFilters(): GalleryFilter[] {
  const seen = new Map<string, string>();
  for (const item of GALLERY) {
    const service = getServiceById(item.serviceId);
    if (service && !seen.has(item.serviceId)) seen.set(item.serviceId, service.name);
  }
  return [
    { id: "todos", label: "Todos" },
    ...[...seen.entries()].map(([id, label]) => ({ id, label })),
  ];
}

export function filterGallery(items: GalleryItem[], filterId: string): GalleryItem[] {
  if (filterId === "todos") return items;
  return items.filter((item) => item.serviceId === filterId);
}
