import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCollaboration, type CollaborationStatus } from "@/contexts/CollaborationContext";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Check, X, MessageSquare, Upload, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_MAP: Record<string, CollaborationStatus[]> = {
  Incoming: ["proposal"],
  Active: ["negotiation", "accepted", "escrow", "deliverable_submitted"],
  Completed: ["approved", "funds_released"],
  Rejected: ["rejected"],
};

const tabs = ["Incoming", "Active", "Completed", "Rejected"];

const KolCollaborations = () => {
  const { user } = useAuth();
  const { getCollaborationsForUser, rejectCollaboration, submitDeliverable, approveKol } = useCollaboration();
  const [activeTab, setActiveTab] = useState("Incoming");
  const navigate = useNavigate();

  const allCollabs = user ? getCollaborationsForUser(user.id, "kol") : [];
  const items = allCollabs.filter((c) => STATUS_MAP[activeTab]?.includes(c.status));

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="font-display text-2xl font-bold">Collaborations</h1>

      <div className="flex gap-1 rounded-lg bg-secondary p-1">
        {tabs.map((tab) => {
          const count = allCollabs.filter((c) => STATUS_MAP[tab]?.includes(c.status)).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
              <span className="ml-1.5 text-xs text-muted-foreground">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <EmptyState
            title={`No ${activeTab.toLowerCase()} collaborations`}
            description={activeTab === "Incoming" ? "No new proposals at the moment. Explore campaigns to find opportunities." : undefined}
          />
        ) : (
          items.map((collab) => (
            <div key={collab.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display font-semibold">{collab.campaignTitle}</h3>
                  <p className="text-sm text-muted-foreground">{collab.companyName}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>💰 ${(collab.agreedBudget || collab.budget).toLocaleString()}</span>
                    <span>📅 {collab.timeline}</span>
                    <span>📦 {collab.deliverables.filter((d) => d.completed).length}/{collab.deliverables.length} deliverables</span>
                  </div>
                  {/* Deliverables progress for active */}
                  {(collab.status === "escrow" || collab.status === "deliverable_submitted") && (
                    <div className="mt-3 space-y-1">
                      {collab.deliverables.map((d) => (
                        <div key={d.id} className="flex items-center gap-2">
                          <div className={cn(
                            "h-3 w-3 rounded-full border",
                            d.approvedByCompany ? "bg-success border-success" : d.completed ? "bg-primary border-primary" : "border-muted-foreground"
                          )} />
                          <span className={cn("text-xs", d.completed ? "text-muted-foreground" : "")}>{d.title}</span>
                          {!d.completed && collab.status === "escrow" && (
                            <button
                              onClick={() => submitDeliverable(collab.id, d.id)}
                              className="ml-auto inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium text-primary hover:bg-primary/10"
                            >
                              <Upload className="h-3 w-3" /> Submit
                            </button>
                          )}
                          {d.completed && !d.approvedByCompany && (
                            <span className="ml-auto text-[10px] text-warning">Awaiting approval</span>
                          )}
                          {d.approvedByCompany && (
                            <span className="ml-auto text-[10px] text-success">✓ Approved</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {collab.status === "proposal" && (
                    <>
                      <button
                        onClick={() => { approveKol(collab.id); navigate(`/${user?.role}/messages`); }}
                        className="gradient-primary rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => navigate(`/${user?.role}/messages`)}
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                      >
                        <MessageSquare className="mr-1 inline h-3 w-3" /> Negotiate
                      </button>
                      <button
                        onClick={() => rejectCollaboration(collab.id)}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <span className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    collab.status === "escrow" ? "bg-primary/10 text-primary" :
                    collab.status === "funds_released" ? "bg-success/10 text-success" :
                    collab.status === "rejected" ? "bg-destructive/10 text-destructive" :
                    collab.status === "negotiation" ? "bg-warning/10 text-warning" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {collab.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
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
