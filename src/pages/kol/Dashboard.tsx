import { TrendingUp, Handshake, Clock, Star, DollarSign, BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import StatCard from "@/components/dashboard/StatCard";

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

const recentCollabs = [
  { company: "TechBrand Inc.", campaign: "Summer Launch", budget: "$2,500", status: "Active" },
  { company: "FitLife Co.", campaign: "Product Review", budget: "$1,800", status: "Completed" },
  { company: "StyleHaus", campaign: "Brand Ambassador", budget: "$4,000", status: "Pending" },
  { company: "EcoGreen", campaign: "Sustainability Series", budget: "$3,200", status: "Active" },
];

const KolDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Handshake} label="Total Collaborations" value="24" change="+3 this month" positive />
        <StatCard icon={Clock} label="Pending Requests" value="5" change="2 new today" />
        <StatCard icon={DollarSign} label="Revenue Earned" value="$18,400" change="+12% vs last month" positive />
        <StatCard icon={Star} label="Rating" value="4.8" change="Based on 48 reviews" />
      </div>

      {/* Charts */}
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

      {/* Recent Collaborations */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Recent Collaborations</h3>
          <button className="text-sm font-medium text-primary hover:underline">View All</button>
        </div>
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
              {recentCollabs.map((c, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{c.company}</td>
                  <td className="py-3 text-muted-foreground">{c.campaign}</td>
                  <td className="py-3">{c.budget}</td>
                  <td className="py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === "Active" ? "bg-success/10 text-success" : c.status === "Completed" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KolDashboard;
