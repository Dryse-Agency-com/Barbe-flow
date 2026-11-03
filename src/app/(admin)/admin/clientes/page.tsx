import type { Metadata } from "next";
import { AdminPageHeader, Panel } from "@/components/admin/AdminPage";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCustomers } from "@/lib/admin-data";
import { formatPrice, formatDateShort, initials, maskPhone } from "@/lib/format";

export const metadata: Metadata = { title: "Clientes" };
export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <>
      <AdminPageHeader
        title="Clientes"
        description="Base construída a partir dos agendamentos realizados."
      />

      {customers.length === 0 ? (
        <EmptyState
          title="Nenhum cliente ainda"
          description="Os dados aparecem assim que o primeiro agendamento for concluído."
        />
      ) : (
        <Panel title={`${customers.length} clientes`} padded={false}>
          <ul>
            {customers.map((customer, index) => (
              <li
                key={customer.phone}
                className={`flex items-center gap-4 px-5 py-4 ${
                  index > 0 ? "border-t border-line" : ""
                }`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-bone-300 font-display text-xs font-semibold text-ink-500">
                  {initials(customer.name)}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {customer.name}
                  </p>
                  <p className="text-xs text-muted">{maskPhone(customer.phone)}</p>
                </div>

                <div className="hidden w-28 text-xs text-muted sm:block">
                  Última visita
                  <span className="block text-ink">
                    {formatDateShort(customer.lastVisit)}
                  </span>
                </div>

                <div className="w-20 text-right text-xs text-muted">
                  {customer.visits} {customer.visits === 1 ? "visita" : "visitas"}
                  <span className="block text-ink">
                    {formatPrice(customer.totalCents)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </>
  );
}
