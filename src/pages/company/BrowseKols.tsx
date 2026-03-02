import { useState } from "react";
import { Search, Filter, Star } from "lucide-react";

const kols = [
  { name: "Sarah Chen", platform: "Instagram", followers: "85K", engagement: "4.8%", rating: 4.9, price: "$1,500", niche: "Tech & Lifestyle", country: "US" },
  { name: "Alex Rivera", platform: "YouTube", followers: "320K", engagement: "6.2%", rating: 4.7, price: "$3,000", niche: "Gaming", country: "US" },
  { name: "Mia Johnson", platform: "TikTok", followers: "1.2M", engagement: "8.5%", rating: 4.8, price: "$5,000", niche: "Fashion", country: "UK" },
  { name: "David Kim", platform: "Instagram", followers: "150K", engagement: "5.1%", rating: 4.6, price: "$2,200", niche: "Food & Travel", country: "Canada" },
  { name: "Emma Wilson", platform: "YouTube", followers: "95K", engagement: "7.3%", rating: 4.9, price: "$1,800", niche: "Fitness", country: "Australia" },
  { name: "James Park", platform: "TikTok", followers: "500K", engagement: "9.2%", rating: 4.5, price: "$3,500", niche: "Entertainment", country: "US" },
];

const BrowseKols = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = kols.filter((k) =>
    k.name.toLowerCase().includes(search.toLowerCase()) ||
    k.niche.toLowerCase().includes(search.toLowerCase())
  );

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
        <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-4">
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option>All Platforms</option><option>Instagram</option><option>YouTube</option><option>TikTok</option>
          </select>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option>All Countries</option><option>US</option><option>UK</option><option>Canada</option>
          </select>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option>All Niches</option><option>Tech</option><option>Fashion</option><option>Gaming</option>
          </select>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
            <option>Any Budget</option><option>Under $1K</option><option>$1K-$3K</option><option>$3K+</option>
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">No KOLs found matching your search.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((kol) => (
            <div key={kol.name} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
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
                <span className="font-display font-semibold text-primary">{kol.price}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg border border-border py-2 text-sm font-medium hover:bg-secondary">View Profile</button>
                <button className="flex-1 gradient-primary rounded-lg py-2 text-sm font-semibold text-primary-foreground">Send Proposal</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseKols;
