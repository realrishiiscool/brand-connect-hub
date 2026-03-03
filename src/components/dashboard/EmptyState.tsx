import { cn } from "@/lib/utils";
import { Inbox, BarChart3, Search, FileX, AlertTriangle, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export const EmptyState = ({ icon: Icon = Inbox, title, description, action, className }: EmptyStateProps) => (
  <div className={cn("flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 px-6 text-center", className)}>
    <div className="mb-4 inline-flex rounded-full bg-muted p-4">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="mb-1 font-display text-lg font-semibold">{title}</h3>
    {description && <p className="mb-4 max-w-sm text-sm text-muted-foreground">{description}</p>}
    {action && (
      <button onClick={action.onClick} className="gradient-primary rounded-lg px-5 py-2 text-sm font-semibold text-primary-foreground">
        {action.label}
      </button>
    )}
  </div>
);

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorFallback = ({ title = "Something went wrong", message = "Failed to load data. Please try again.", onRetry, className }: ErrorFallbackProps) => (
  <div className={cn("flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 py-12 px-6 text-center", className)}>
    <div className="mb-4 inline-flex rounded-full bg-destructive/10 p-3">
      <AlertTriangle className="h-6 w-6 text-destructive" />
    </div>
    <h3 className="mb-1 font-display text-base font-semibold text-destructive">{title}</h3>
    <p className="mb-4 max-w-sm text-sm text-muted-foreground">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
        <RefreshCw className="h-4 w-4" /> Retry
      </button>
    )}
  </div>
);
