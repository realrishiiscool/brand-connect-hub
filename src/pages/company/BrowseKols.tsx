import { useState, useEffect, useCallback } from "react";
import { Search, Filter, Star } from "lucide-react";
import { useCollaboration } from "@/contexts/CollaborationContext";
import { useAuth } from "@/contexts/AuthContext";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { CardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { cn } from "@/lib/utils";

const kols = [
  { id: "k1", name: "Sarah Chen", platform: "Instagram", followers: "85K", engagement: "4.8%", rating: 4.9, price: 1500, niche: "Tech & Lifestyle", country: "US" },
  { id: "k2", name: "Alex Rivera", platform: "YouTube", followers: "320K", engagement: "6.2%", rating: 4.7, price: 3000, niche: "Gaming", country: "US" },
  { id: "k3", name: "Mia Johnson", platform: "TikTok", followers: "1.2M", engagement: "8.5%", rating: 4.8, price: 5000, niche: "Fashion", country: "UK" },
  { id: "k4", name: "David Kim", platform: "Instagram", followers: "150K", engagement: "5.1%", rating: 4.6, price: 2200, niche: "Food & Travel", country: "Canada" },
  { id: "k5", name: "Emma Wilson", platform: "YouTube", followers: "95K", engagement: "7.3%", rating: 4.9, price: 1800, niche: "Fitness", country: "Australia" },
  { id: "k6", name: "James Park", platform: "TikTok", followers: "500K", engagement: "9.2%", rating: 4.5, price: 3500, niche: "Entertainment", country: "US" },
];

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const h = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(h);
  }, [value, delay]);
  return debounced;
}

const BrowseKols = () => {
  const { user } = useAuth();
  const { campaigns, inviteKol } = useCollaboration();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ platform: "", country: "", niche: "", budget: "" });
  const [invitingKol, setInvitingKol] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const companyCampaigns = campaigns.filter((c) => c.companyId === user?.id && c.status === "active");

  const filtered = kols.filter((k) => {
    const matchSearch = !debouncedSearch || k.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || k.niche.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchPlatform = !filters.platform || k.platform === filters.platform;
    const matchCountry = !filters.country || k.country === filters.country;
    const matchNiche = !filters.niche || k.niche.includes(filters.niche);
    const matchBudget = !filters.budget ||
      (filters.budget === "Under $1K" && k.price < 1000) ||
      (filters.budget === "$1K-$3K" && k.price >= 1000 && k.price <= 3000) ||
      (filters.budget === "$3K+" && k.price > 3000);
    return matchSearch && matchPlatform && matchCountry && matchNiche && matchBudget;
  });

  const handleInvite = (kolId: string, kolName: string) => {
    if (!selectedCampaign) {
      setInvitingKol(kolId);
      return;
    }
    inviteKol(selectedCampaign, kolId, kolName);
    setInvitingKol(null);
    setSelectedCampaign("");
  };

  if (loading) {
    return (
      <div className="animate-fade-in space-y-6">
        <h1 className="font-display text-2xl font-bold">Browse KOLs</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="font-display text-2xl font-bold">Browse KOLs</h1>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or niche..."
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className={cn(
          "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium",
          showFilters ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-secondary"
        )}>
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
          <select value={filters.platform} onChange={(e) => setFilters((p) => ({ ...p, platform: e.target.value }))} className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option value="">All Platforms</option><option>Instagram</option><option>YouTube</option><option>TikTok</option>
          </select>
          <select value={filters.country} onChange={(e) => setFilters((p) => ({ ...p, country: e.target.value }))} className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option value="">All Countries</option><option>US</option><option>UK</option><option>Canada</option><option>Australia</option>
          </select>
          <select value={filters.niche} onChange={(e) => setFilters((p) => ({ ...p, niche: e.target.value }))} className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option value="">All Niches</option><option>Tech</option><option>Fashion</option><option>Gaming</option><option>Fitness</option><option>Food</option><option>Entertainment</option>
          </select>
          <select value={filters.budget} onChange={(e) => setFilters((p) => ({ ...p, budget: e.target.value }))} className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option value="">Any Budget</option><option>Under $1K</option><option>$1K-$3K</option><option>$3K+</option>
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState title="No KOLs found" description="Try adjusting your search or filters." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((kol) => (
            <div key={kol.id} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                  {kol.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-semibold">{kol.name}</h3>
                  <p className="text-xs text-muted-foreground">{kol.niche} · {kol.country}</p>
                </div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-secondary p-2">
                  <p className="font-display text-sm font-bold">{kol.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="rounded-lg bg-secondary p-2">
                  <p className="font-display text-sm font-bold">{kol.engagement}</p>
                  <p className="text-xs text-muted-foreground">Engagement</p>
                </div>
              </div>
              <div className="mb-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{kol.rating}</span>
                </div>
                <span className="font-display font-semibold text-primary">${kol.price.toLocaleString()}</span>
              </div>

              {/* Invite KOL with campaign picker */}
              {invitingKol === kol.id && (
                <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-xs font-medium mb-2">Select a campaign:</p>
                  {companyCampaigns.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No active campaigns. Create one first.</p>
                  ) : (
                    <>
                      <select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                        className="h-8 w-full rounded border border-input bg-background px-2 text-xs mb-2"
                      >
                        <option value="">Choose campaign</option>
                        {companyCampaigns.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleInvite(kol.id, kol.name)}
                          disabled={!selectedCampaign}
                          className="gradient-primary flex-1 rounded px-2 py-1 text-xs font-semibold text-primary-foreground disabled:opacity-50"
                        >
                          Send Invite
                        </button>
                        <button onClick={() => setInvitingKol(null)} className="rounded border border-border px-2 py-1 text-xs hover:bg-secondary">
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-secondary">View Profile</button>
                <button
                  onClick={() => invitingKol === kol.id ? setInvitingKol(null) : handleInvite(kol.id, kol.name)}
                  className="flex-1 gradient-primary rounded-lg py-2 text-sm font-semibold text-primary-foreground"
                >
                  {invitingKol === kol.id ? "Cancel" : "Send Proposal"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseKols;
