import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://barberflow.example"),
  title: {
    default: "BarberFlow — Barbearia moderna com agendamento simples",
    template: "%s · BarberFlow",
  },
  description:
    "Agende seu horário em poucos toques, escolha seu barbeiro e chegue na hora certa. Barbearia premium em São Paulo.",
  openGraph: {
    title: "BarberFlow — Barbearia moderna com agendamento simples",
    description:
      "Agende seu horário em poucos toques, escolha seu barbeiro e chegue na hora certa.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-dvh bg-bone font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
