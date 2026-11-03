import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminSidebar, AdminTopbar } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: {
    default: "Painel · BarberFlow",
    template: "%s · Painel BarberFlow",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bone-200/60">
      <AdminSidebar />
      <AdminTopbar />
      <div className="lg:pl-64">
        <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
