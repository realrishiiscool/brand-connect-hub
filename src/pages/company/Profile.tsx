import { useState } from "react";
import { Camera, Edit2, Save, X, Globe, Building2, BadgeCheck } from "lucide-react";

const CompanyProfile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "TechBrand Inc.",
    description: "Leading technology company specializing in innovative consumer electronics and smart devices. We partner with top creators worldwide.",
    website: "https://techbrand.com",
    industry: "Technology",
    country: "United States",
    verified: true,
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Company Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${editing ? "bg-destructive/10 text-destructive" : "gradient-primary text-primary-foreground"}`}
        >
          {editing ? <><X className="h-4 w-4" /> Cancel</> : <><Edit2 className="h-4 w-4" /> Edit</>}
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">TB</div>
            {editing && (
              <button className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground"><Camera className="h-3.5 w-3.5" /></button>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {editing ? (
                <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="h-10 w-full rounded-lg border border-input bg-background px-3 font-display text-xl font-bold focus:outline-none focus:ring-2 focus:ring-ring" />
              ) : (
                <h2 className="font-display text-xl font-bold">{profile.name}</h2>
              )}
              {profile.verified && <BadgeCheck className="h-5 w-5 text-primary" />}
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {profile.industry}</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> {profile.country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-3 font-display text-base font-semibold">About</h3>
        {editing ? (
          <textarea value={profile.description} onChange={(e) => setProfile({ ...profile, description: e.target.value })} className="min-h-[100px] w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        ) : (
          <p className="text-sm text-muted-foreground">{profile.description}</p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-base font-semibold">Past Campaigns</h3>
        <div className="space-y-3">
          {[
            { title: "Product Launch Q1", kols: 12, budget: "$15,000", result: "2.5M impressions" },
            { title: "Brand Ambassador 2025", kols: 8, budget: "$20,000", result: "180K clicks" },
            { title: "Holiday Campaign", kols: 20, budget: "$35,000", result: "5M reach" },
          ].map((c) => (
            <div key={c.title} className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <div>
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.kols} KOLs · {c.budget}</p>
              </div>
              <span className="text-sm font-medium text-primary">{c.result}</span>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="flex justify-end">
          <button onClick={() => setEditing(false)} className="gradient-primary inline-flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-primary-foreground">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
