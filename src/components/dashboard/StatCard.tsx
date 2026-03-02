import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const StatCard = ({ icon: Icon, label, value, change, positive }: StatCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="inline-flex rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        {change && (
          <span className={cn("flex items-center gap-1 text-xs font-medium", positive ? "text-success" : "text-muted-foreground")}>
            {positive && <TrendingUp className="h-3 w-3" />}
            {change}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;
