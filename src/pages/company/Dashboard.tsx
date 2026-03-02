import { Megaphone, DollarSign, Users, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import StatCard from "@/components/dashboard/StatCard";

const spendData = [
  { month: "Jan", spend: 5000 }, { month: "Feb", spend: 8200 }, { month: "Mar", spend: 6800 },
  { month: "Apr", spend: 12000 }, { month: "May", spend: 9500 }, { month: "Jun", spend: 15000 },
  { month: "Jul", spend: 13200 }, { month: "Aug", spend: 18000 },
];

const roiData = [
  { name: "Instagram", value: 40 },
  { name: "YouTube", value: 30 },
  { name: "TikTok", value: 20 },
  { name: "X", value: 10 },
];

const COLORS = ["hsl(168, 80%, 36%)", "hsl(35, 95%, 55%)", "hsl(210, 100%, 52%)", "hsl(280, 60%, 55%)"];

const campaigns = [
  { title: "Summer Product Launch", kols: 8, budget: "$12,000", status: "Active" },
  { title: "Brand Awareness Q3", kols: 15, budget: "$25,000", status: "Active" },
  { title: "Holiday Season Promo", kols: 5, budget: "$8,000", status: "Draft" },
  { title: "Influencer Review Series", kols: 12, budget: "$18,000", status: "Completed" },
];

const CompanyDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Megaphone} label="Active Campaigns" value="6" change="+2 this month" positive />
        <StatCard icon={DollarSign} label="Total Spent" value="$87,500" change="+18% vs last month" positive />
        <StatCard icon={Users} label="KOLs Hired" value="42" change="8 active now" />
        <StatCard icon={TrendingUp} label="Avg. ROI" value="3.2x" change="+0.4 vs last quarter" positive />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-display text-base font-semibold">Budget Spend Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={spendData}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 90%)" />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip />
              <Area type="monotone" dataKey="spend" stroke="hsl(168, 80%, 36%)" fill="url(#colorSpend)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 font-display text-base font-semibold">Spend by Platform</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={roiData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {roiData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {roiData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Recent Campaigns</h3>
          <button className="text-sm font-medium text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Campaign</th>
                <th className="pb-3 font-medium">KOLs</th>
                <th className="pb-3 font-medium">Budget</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{c.title}</td>
                  <td className="py-3 text-muted-foreground">{c.kols}</td>
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

export default CompanyDashboard;
