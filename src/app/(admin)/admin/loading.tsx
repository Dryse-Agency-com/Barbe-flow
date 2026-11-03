import { Skeleton } from "@/components/ui/LoadingState";

export default function AdminLoading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Carregando painel</span>

      <div className="mb-8 border-b border-line pb-6">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="mt-3 h-4 w-72" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-2xl" />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}
