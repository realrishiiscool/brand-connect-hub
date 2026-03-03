import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCollaboration } from "@/contexts/CollaborationContext";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { Check, DollarSign, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyCampaigns = () => {
  const { user } = useAuth();
  const { campaigns, collaborations, approveDeliverable, releaseFunds, moveToEscrow } = useCollaboration();
  const navigate = useNavigate();

  const myCampaigns = campaigns.filter((c) => c.companyId === user?.id);

  const getCollabsForCampaign = (campaignId: string) =>
    collaborations.filter((c) => c.campaignId === campaignId);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Campaigns</h1>
        <a href="/company/create-campaign" className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
          + New Campaign
        </a>
      </div>

      {myCampaigns.length === 0 ? (
        <EmptyState
          title="No campaigns yet"
          description="Create your first campaign to start connecting with KOLs."
          action={{ label: "Create Campaign", onClick: () => navigate("/company/create-campaign") }}
        />
      ) : (
        <div className="space-y-4">
          {myCampaigns.map((campaign) => {
            const collabs = getCollabsForCampaign(campaign.id);
            const activeCollabs = collabs.filter((c) => !["rejected", "funds_released"].includes(c.status));

            return (
              <div key={campaign.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold">{campaign.title}</h3>
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        campaign.status === "active" ? "bg-success/10 text-success" :
                        campaign.status === "completed" ? "bg-primary/10 text-primary" :
                        "bg-warning/10 text-warning"
                      )}>{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>💰 ${campaign.budgetMin.toLocaleString()} – ${campaign.budgetMax.toLocaleString()}</span>
                      <span>📋 {campaign.appliedKols.length} applied</span>
                      <span>✅ {campaign.approvedKols.length} approved</span>
                    </div>

                    {/* Active collaborations for this campaign */}
                    {activeCollabs.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Active Collaborations</p>
                        {activeCollabs.map((collab) => (
                          <div key={collab.id} className="rounded-lg bg-secondary p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{collab.kolName}</span>
                              <span className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                                collab.status === "escrow" ? "bg-primary/10 text-primary" :
                                collab.status === "accepted" ? "bg-success/10 text-success" :
                                "bg-warning/10 text-warning"
                              )}>
                                {collab.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                            </div>
                            {/* Deliverable tracking */}
                            <div className="space-y-1 mb-2">
                              {collab.deliverables.map((d) => (
                                <div key={d.id} className="flex items-center gap-2 text-xs">
                                  <div className={cn(
                                    "h-3 w-3 rounded-full border",
                                    d.approvedByCompany ? "bg-success border-success" : d.completed ? "bg-primary border-primary" : "border-muted-foreground"
                                  )} />
                                  <span className="flex-1">{d.title}</span>
                                  {d.completed && !d.approvedByCompany && (
                                    <button
                                      onClick={() => approveDeliverable(collab.id, d.id)}
                                      className="inline-flex items-center gap-1 rounded bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success hover:bg-success/20"
                                    >
                                      <Check className="h-3 w-3" /> Approve
                                    </button>
                                  )}
                                  {d.approvedByCompany && <span className="text-[10px] text-success">✓</span>}
                                </div>
                              ))}
                            </div>
                            {/* Actions */}
                            <div className="flex gap-2">
                              {collab.status === "accepted" && (
                                <button
                                  onClick={() => moveToEscrow(collab.id)}
                                  className="inline-flex items-center gap-1 rounded bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20"
                                >
                                  <DollarSign className="h-3 w-3" /> Fund Escrow
                                </button>
                              )}
                              {(collab.status === "approved" || collab.deliverables.every((d) => d.approvedByCompany)) && collab.status !== "funds_released" && (
                                <button
                                  onClick={() => releaseFunds(collab.id)}
                                  className="inline-flex items-center gap-1 rounded bg-success/10 px-3 py-1 text-xs font-medium text-success hover:bg-success/20"
                                >
                                  <DollarSign className="h-3 w-3" /> Release Payment
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate("/company/messages")} className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary">
                      Manage
                    </button>
                    <button onClick={() => navigate("/company/kols")} className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary">
                      <UserPlus className="mr-1 inline h-3 w-3" /> Invite KOLs
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompanyCampaigns;
