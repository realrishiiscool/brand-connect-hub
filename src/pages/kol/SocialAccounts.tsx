import { useState } from "react";
import { Instagram, Youtube, Twitter, Plus, X, Check, ExternalLink, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/dashboard/EmptyState";

interface SocialAccount {
  id: string;
  platform: string;
  handle: string;
  followers: string;
  engagement: string;
  avgLikes: string;
  avgViews?: string;
  verified: boolean;
  verifying?: boolean;
}

const iconMap: Record<string, React.ElementType> = { Instagram, YouTube: Youtube, TikTok: Twitter, "X (Twitter)": Twitter };
const PLATFORMS = ["Instagram", "YouTube", "TikTok", "X (Twitter)"];

const SocialAccounts = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    { id: "1", platform: "Instagram", handle: "@sarahchen", followers: "85.2K", engagement: "4.8%", avgLikes: "3.2K", verified: true },
    { id: "2", platform: "YouTube", handle: "Sarah Chen", followers: "32.1K", engagement: "6.2%", avgLikes: "1.8K", verified: true },
    { id: "3", platform: "TikTok", handle: "@sarahchenx", followers: "120K", engagement: "8.1%", avgLikes: "12.5K", avgViews: "45K", verified: false },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newPlatform, setNewPlatform] = useState("");
  const [newHandle, setNewHandle] = useState("");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newPlatform || !newHandle) return;
    const account: SocialAccount = {
      id: `sa_${Date.now()}`,
      platform: newPlatform,
      handle: newHandle,
      followers: "0",
      engagement: "0%",
      avgLikes: "0",
      verified: false,
    };
    setAccounts((prev) => [...prev, account]);
    setNewPlatform("");
    setNewHandle("");
    setShowAdd(false);
  };

  const handleVerify = (id: string) => {
    setVerifyingId(id);
    // Mock OAuth verification
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((a) => a.id === id ? { ...a, verified: true } : a)
      );
      setVerifyingId(null);
    }, 2000);
  };

  const handleRemove = (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Social Accounts</h1>
        <button onClick={() => setShowAdd(true)} className="gradient-primary inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add Account
        </button>
      </div>

      {/* Add account form */}
      {showAdd && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-semibold">Add Social Account</h3>
            <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium mb-1">Platform</label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select platform</option>
                {PLATFORMS.filter((p) => !accounts.some((a) => a.platform === p)).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Handle / Username</label>
              <input
                type="text"
                value={newHandle}
                onChange={(e) => setNewHandle(e.target.value)}
                placeholder="@yourusername"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAdd}
                disabled={!newPlatform || !newHandle}
                className="gradient-primary h-10 w-full rounded-lg font-semibold text-primary-foreground disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {accounts.length === 0 ? (
        <EmptyState
          title="No social accounts linked"
          description="Connect your social media profiles to showcase your reach and engagement."
          action={{ label: "Add Account", onClick: () => setShowAdd(true) }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((acc) => {
            const Icon = iconMap[acc.platform] || Twitter;
            const isVerifying = verifyingId === acc.id;
            return (
              <div key={acc.id} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{acc.platform}</p>
                      <p className="text-xs text-muted-foreground">{acc.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {acc.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                        <Shield className="h-3 w-3" /> Verified
                      </span>
                    ) : isVerifying ? (
                      <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning animate-pulse">
                        Verifying...
                      </span>
                    ) : (
                      <button
                        onClick={() => handleVerify(acc.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning hover:bg-warning/20"
                      >
                        <ExternalLink className="h-3 w-3" /> Verify via OAuth
                      </button>
                    )}
                    <button onClick={() => handleRemove(acc.id)} className="ml-1 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="font-display text-lg font-bold">{acc.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="font-display text-lg font-bold">{acc.engagement}</p>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="font-display text-lg font-bold">{acc.avgLikes}</p>
                    <p className="text-xs text-muted-foreground">Avg Likes</p>
                  </div>
                </div>
                {acc.avgViews && (
                  <div className="mt-2 rounded-lg bg-secondary p-2 text-center">
                    <p className="font-display text-sm font-bold">{acc.avgViews}</p>
                    <p className="text-xs text-muted-foreground">Avg Views</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SocialAccounts;
