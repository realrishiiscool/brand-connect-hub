import { useState, useEffect } from "react";
import { TrendingUp, Handshake, Clock, Star, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "@/components/dashboard/StatCard";
import { DashboardSkeleton, ChartSkeleton, TableSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { EmptyState, ErrorFallback } from "@/components/dashboard/EmptyState";
import { useAuth } from "@/contexts/AuthContext";
import { useCollaboration } from "@/contexts/CollaborationContext";
import { cn } from "@/lib/utils";

const revenueData = [
  { month: "Jan", revenue: 1200 }, { month: "Feb", revenue: 2100 }, { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 3200 }, { month: "May", revenue: 2800 }, { month: "Jun", revenue: 4100 },
  { month: "Jul", revenue: 3600 }, { month: "Aug", revenue: 4800 },
];

const engagementData = [
  { month: "Jan", rate: 3.2 }, { month: "Feb", rate: 3.8 }, { month: "Mar", rate: 4.1 },
  { month: "Apr", rate: 3.9 }, { month: "May", rate: 4.5 }, { month: "Jun", rate: 5.2 },
  { month: "Jul", rate: 4.8 }, { month: "Aug", rate: 5.6 },
];

const KolDashboard = () => {
  const { user } = useAuth();
  const { getCollaborationsForUser, getWallet } = useCollaboration();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <DashboardSkeleton type="stats" count={4} />
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
        <TableSkeleton rows={4} />
      </div>
    );
  }

  const collabs = user ? getCollaborationsForUser(user.id, "kol") : [];
  const wallet = user ? getWallet(user.id, "kol") : null;

  const activeCollabs = collabs.filter((c) => ["negotiation", "accepted", "escrow", "deliverable_submitted"].includes(c.status));
  const pendingCollabs = collabs.filter((c) => c.status === "proposal");
  const completedCollabs = collabs.filter((c) => c.status === "funds_released");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Handshake} label="Total Collaborations" value={String(collabs.length)} change={`${activeCollabs.length} active`} positive />
        <StatCard icon={Clock} label="Pending Requests" value={String(pendingCollabs.length)} change={pendingCollabs.length > 0 ? "Needs attention" : "All clear"} />
        <StatCard icon={DollarSign} label="Revenue Earned" value={`$${wallet?.totalEarned.toLocaleString() || "0"}`} change="+12% vs last month" positive />
        <StatCard icon={Star} label="Rating" value="4.8" change="Based on 48 reviews" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-display text-base font-semibold">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="hsl(168, 80%, 36%)" fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-display text-base font-semibold">Engagement Growth (%)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="rate" fill="hsl(168, 80%, 36%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Recent Collaborations</h3>
          <a href="/kol/collaborations" className="text-sm font-medium text-primary hover:underline">View All</a>
        </div>
        {collabs.length === 0 ? (
          <EmptyState title="No collaborations yet" description="Explore campaigns and apply to start collaborating with brands." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Campaign</th>
                  <th className="pb-3 font-medium">Budget</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {collabs.slice(0, 5).map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="py-3 font-medium">{c.companyName}</td>
                    <td className="py-3 text-muted-foreground">{c.campaignTitle}</td>
                    <td className="py-3">${(c.agreedBudget || c.budget).toLocaleString()}</td>
                    <td className="py-3">
                      <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        c.status === "funds_released" ? "bg-success/10 text-success" :
                        c.status === "rejected" ? "bg-destructive/10 text-destructive" :
                        c.status === "escrow" ? "bg-primary/10 text-primary" :
                        "bg-warning/10 text-warning"
                      )}>
                        {c.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default KolDashboard;
