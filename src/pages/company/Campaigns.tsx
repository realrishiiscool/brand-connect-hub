import { cn } from "@/lib/utils";

const campaigns = [
  { title: "Summer Product Launch", budget: "$12,000", applied: 24, approved: 8, status: "Active", deliverables: "3/5 completed" },
  { title: "Brand Awareness Q3", budget: "$25,000", applied: 40, approved: 15, status: "Active", deliverables: "8/12 completed" },
  { title: "Holiday Season Promo", budget: "$8,000", applied: 0, approved: 0, status: "Draft", deliverables: "0/3 completed" },
  { title: "Influencer Review Series", budget: "$18,000", applied: 30, approved: 12, status: "Completed", deliverables: "10/10 completed" },
];

const CompanyCampaigns = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Campaigns</h1>
        <a href="/company/create-campaign" className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
          + New Campaign
        </a>
      </div>

      <div className="space-y-4">
        {campaigns.map((c, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold">{c.title}</h3>
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    c.status === "Active" ? "bg-success/10 text-success" :
                    c.status === "Completed" ? "bg-primary/10 text-primary" :
                    "bg-warning/10 text-warning"
                  )}>{c.status}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>💰 {c.budget}</span>
                  <span>📋 {c.applied} applied</span>
                  <span>✅ {c.approved} approved</span>
                  <span>📦 {c.deliverables}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary">Manage</button>
                <button className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary">Invite KOLs</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyCampaigns;
