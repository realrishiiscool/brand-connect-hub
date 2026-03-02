import { Search, Star, Filter } from "lucide-react";
import { useState } from "react";

const kols = [
  { name: "Sarah Chen", followers: "85K", engagement: "4.8%", platform: "Instagram", niche: "Tech & Lifestyle", rating: 4.9, price: "$1,500" },
  { name: "Alex Rivera", followers: "320K", engagement: "6.2%", platform: "YouTube", niche: "Gaming", rating: 4.7, price: "$3,000" },
  { name: "Mia Johnson", followers: "1.2M", engagement: "8.5%", platform: "TikTok", niche: "Fashion & Beauty", rating: 4.8, price: "$5,000" },
  { name: "David Kim", followers: "150K", engagement: "5.1%", platform: "Instagram", niche: "Food & Travel", rating: 4.6, price: "$2,200" },
  { name: "Emma Wilson", followers: "95K", engagement: "7.3%", platform: "YouTube", niche: "Fitness & Health", rating: 4.9, price: "$1,800" },
  { name: "James Park", followers: "500K", engagement: "9.2%", platform: "TikTok", niche: "Entertainment", rating: 4.5, price: "$3,500" },
  { name: "Lina Torres", followers: "200K", engagement: "5.8%", platform: "Instagram", niche: "Beauty", rating: 4.8, price: "$2,500" },
  { name: "Ryan Patel", followers: "75K", engagement: "6.9%", platform: "YouTube", niche: "Education", rating: 4.7, price: "$1,200" },
];

const ExploreKols = () => {
  const [search, setSearch] = useState("");
  const filtered = kols.filter((k) => k.name.toLowerCase().includes(search.toLowerCase()) || k.niche.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Explore Top KOLs</h1>
        <p className="mt-2 text-muted-foreground">Discover verified influencers for your next campaign.</p>
      </div>

      <div className="mx-auto mb-8 flex max-w-lg gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search KOLs..." className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((kol) => (
          <div key={kol.name} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
              {kol.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="font-display font-semibold">{kol.name}</h3>
            <p className="mb-3 text-xs text-muted-foreground">{kol.niche} · {kol.platform}</p>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div className="rounded bg-secondary px-2 py-1 text-center text-xs"><span className="font-bold">{kol.followers}</span><br />followers</div>
              <div className="rounded bg-secondary px-2 py-1 text-center text-xs"><span className="font-bold">{kol.engagement}</span><br />engagement</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm"><Star className="h-3.5 w-3.5 fill-accent text-accent" /> {kol.rating}</div>
              <span className="font-display text-sm font-bold text-primary">{kol.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreKols;
