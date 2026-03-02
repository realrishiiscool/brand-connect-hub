import { Search, MapPin, Calendar, DollarSign } from "lucide-react";
import { useState } from "react";

const campaigns = [
  { title: "Summer Product Launch", company: "TechBrand Inc.", budget: "$2,000 – $5,000", platform: "Instagram", deadline: "Jul 15, 2026", country: "US", niche: "Tech" },
  { title: "Fitness Challenge Series", company: "FitLife Co.", budget: "$1,500 – $3,000", platform: "YouTube", deadline: "Aug 1, 2026", country: "US", niche: "Fitness" },
  { title: "New Collection Launch", company: "StyleHaus", budget: "$3,000 – $8,000", platform: "TikTok", deadline: "Jul 30, 2026", country: "Global", niche: "Fashion" },
  { title: "Sustainability Campaign", company: "EcoGreen", budget: "$1,000 – $2,500", platform: "Instagram", deadline: "Sep 1, 2026", country: "Europe", niche: "Lifestyle" },
  { title: "App Review Series", company: "CloudSync", budget: "$2,500 – $4,000", platform: "YouTube", deadline: "Aug 15, 2026", country: "US", niche: "Tech" },
  { title: "Food Festival Collab", company: "TasteHub", budget: "$800 – $2,000", platform: "TikTok", deadline: "Jul 20, 2026", country: "US", niche: "Food" },
];

const ExploreCampaigns = () => {
  const [search, setSearch] = useState("");
  const filtered = campaigns.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.niche.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Explore Campaigns</h1>
        <p className="mt-2 text-muted-foreground">Find brand campaigns that match your niche and audience.</p>
      </div>

      <div className="mx-auto mb-8 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.title} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
            <span className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{c.niche}</span>
            <h3 className="mb-1 font-display text-lg font-semibold">{c.title}</h3>
            <p className="mb-3 text-sm text-muted-foreground">{c.company}</p>
            <div className="mb-4 space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> {c.budget}</p>
              <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Deadline: {c.deadline}</p>
              <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.country} · {c.platform}</p>
            </div>
            <button className="gradient-primary w-full rounded-lg py-2 text-sm font-semibold text-primary-foreground">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCampaigns;
