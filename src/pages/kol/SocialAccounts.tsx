import { Instagram, Youtube, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const accounts = [
  { platform: "Instagram", handle: "@sarahchen", followers: "85.2K", engagement: "4.8%", avgLikes: "3.2K", verified: true },
  { platform: "YouTube", handle: "Sarah Chen", followers: "32.1K", engagement: "6.2%", avgLikes: "1.8K", verified: true },
  { platform: "TikTok", handle: "@sarahchenx", followers: "120K", engagement: "8.1%", avgLikes: "12.5K", verified: false },
];

const iconMap: Record<string, React.ElementType> = { Instagram, YouTube: Youtube, TikTok: Twitter };

const SocialAccounts = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Social Accounts</h1>
        <button className="gradient-primary rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground">
          + Add Account
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((acc) => {
          const Icon = iconMap[acc.platform] || Twitter;
          return (
            <div key={acc.platform} className="rounded-xl border border-border bg-card p-5">
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
                {acc.verified ? (
                  <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Verified</span>
                ) : (
                  <button className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">Verify</button>
                )}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialAccounts;
