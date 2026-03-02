import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Incoming", "Active", "Completed", "Rejected"];

const collaborations = {
  Incoming: [
    { company: "TechBrand Inc.", campaign: "Summer Launch 2026", budget: "$3,500", timeline: "Jun 1 – Jul 15", status: "Pending" },
    { company: "StyleHaus", campaign: "New Collection Promo", budget: "$2,000", timeline: "Jul 1 – Jul 30", status: "Pending" },
  ],
  Active: [
    { company: "FitLife Co.", campaign: "Product Review Series", budget: "$1,800", timeline: "May 15 – Jun 30", status: "In Progress" },
    { company: "EcoGreen", campaign: "Sustainability Campaign", budget: "$4,200", timeline: "May 1 – Aug 1", status: "In Progress" },
  ],
  Completed: [
    { company: "CloudSync", campaign: "App Launch", budget: "$2,500", timeline: "Mar 1 – Apr 15", status: "Completed" },
  ],
  Rejected: [
    { company: "FastFood Co.", campaign: "Brand Deal", budget: "$500", timeline: "Feb 1 – Feb 28", status: "Rejected" },
  ],
};

const KolCollaborations = () => {
  const [activeTab, setActiveTab] = useState("Incoming");

  const items = collaborations[activeTab as keyof typeof collaborations];

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="font-display text-2xl font-bold">Collaborations</h1>

      <div className="flex gap-1 rounded-lg bg-secondary p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
            <span className="ml-1.5 text-xs text-muted-foreground">
              ({collaborations[tab as keyof typeof collaborations].length})
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">No collaborations found.</p>
          </div>
        ) : (
          items.map((collab, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display font-semibold">{collab.campaign}</h3>
                  <p className="text-sm text-muted-foreground">{collab.company}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>💰 {collab.budget}</span>
                    <span>📅 {collab.timeline}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeTab === "Incoming" && (
                    <>
                      <button className="gradient-primary rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground">Accept</button>
                      <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary">Negotiate</button>
                      <button className="rounded-lg px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">Reject</button>
                    </>
                  )}
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    collab.status === "In Progress" ? "bg-success/10 text-success" :
                    collab.status === "Completed" ? "bg-primary/10 text-primary" :
                    collab.status === "Rejected" ? "bg-destructive/10 text-destructive" :
                    "bg-warning/10 text-warning"
                  )}>
                    {collab.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KolCollaborations;
