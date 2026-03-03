import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DashboardSkeletonProps {
  type?: "stats" | "chart" | "table" | "card";
  count?: number;
  className?: string;
}

export const StatCardSkeleton = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center justify-between">
      <Skeleton className="h-9 w-9 rounded-lg" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className="mt-3 h-8 w-24" />
    <Skeleton className="mt-2 h-4 w-32" />
  </div>
);

export const ChartSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
    <Skeleton className="mb-4 h-5 w-40" />
    <div className="flex items-end gap-2" style={{ height: 260 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="flex-1 rounded-t" style={{ height: `${30 + Math.random() * 70}%` }} />
      ))}
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 4 }: { rows?: number }) => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="mb-4 flex items-center justify-between">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="space-y-3">
      <div className="flex gap-4 border-b border-border pb-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-2">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <div className="flex-1">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-4">
      <Skeleton className="h-16 rounded-lg" />
      <Skeleton className="h-16 rounded-lg" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-9 flex-1 rounded-lg" />
      <Skeleton className="h-9 flex-1 rounded-lg" />
    </div>
  </div>
);

export const DashboardSkeleton = ({ type = "stats", count = 4, className }: DashboardSkeletonProps) => {
  if (type === "stats") {
    return (
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
        {Array.from({ length: count }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
    );
  }
  if (type === "chart") return <ChartSkeleton className={className} />;
  if (type === "table") return <TableSkeleton rows={count} />;
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
};
