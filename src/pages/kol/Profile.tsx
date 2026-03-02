import { useState } from "react";
import { Camera, MapPin, Globe, Edit2, Save, X } from "lucide-react";

const KolProfile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sarah Chen",
    bio: "Digital content creator passionate about tech, lifestyle, and sustainable living. 5+ years of experience working with global brands.",
    niche: "Tech & Lifestyle",
    location: "Los Angeles, CA",
    languages: "English, Mandarin",
    followers: "125K",
    engagement: "4.8%",
  });

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">My Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${editing ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : "gradient-primary text-primary-foreground hover:opacity-90"}`}
        >
          {editing ? <><X className="h-4 w-4" /> Cancel</> : <><Edit2 className="h-4 w-4" /> Edit Profile</>}
        </button>
      </div>

      {/* Profile Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
              SC
            </div>
            {editing && (
              <button className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground">
                <Camera className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex-1">
            {editing ? (
              <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mb-2 h-10 w-full rounded-lg border border-input bg-background px-3 font-display text-xl font-bold focus:outline-none focus:ring-2 focus:ring-ring" />
            ) : (
              <h2 className="mb-1 font-display text-xl font-bold">{profile.name}</h2>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {profile.location}</span>
              <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> {profile.languages}</span>
            </div>
            <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{profile.niche}</span>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <p className="font-display text-xl font-bold">{profile.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-display text-xl font-bold">{profile.engagement}</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-3 font-display text-base font-semibold">Bio</h3>
        {editing ? (
          <textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="min-h-[100px] w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
        ) : (
          <p className="text-sm text-muted-foreground">{profile.bio}</p>
        )}
      </div>

      {/* Audience Demographics */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-base font-semibold">Audience Demographics</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Age Group", value: "18-34 (72%)" },
            { label: "Gender", value: "Female 60% / Male 40%" },
            { label: "Top Countries", value: "US, UK, Canada" },
          ].map((d) => (
            <div key={d.label} className="rounded-lg bg-secondary p-4">
              <p className="text-xs font-medium text-muted-foreground">{d.label}</p>
              <p className="mt-1 text-sm font-semibold">{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Media Kit */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-base font-semibold">Media Kit & Portfolio</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-medium">Upload Media Kit</p>
              <p className="mt-1 text-xs">PDF, up to 10MB</p>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            <div>
              <p className="font-medium">Upload Portfolio</p>
              <p className="mt-1 text-xs">Images or PDF</p>
            </div>
          </div>
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

export default KolProfile;
