import { useState } from "react";
import { Upload, CheckCircle } from "lucide-react";

const CreateCampaign = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", deliverables: "", budgetMin: "", budgetMax: "",
    deadline: "", audience: "", platform: "", country: "",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  if (submitted) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 inline-flex rounded-full bg-success/10 p-4">
          <CheckCircle className="h-12 w-12 text-success" />
        </div>
        <h1 className="mb-2 font-display text-2xl font-bold">Campaign Published!</h1>
        <p className="mb-6 text-muted-foreground">Your campaign is now live and visible to KOLs.</p>
        <button onClick={() => { setSubmitted(false); setForm({ title: "", description: "", deliverables: "", budgetMin: "", budgetMax: "", deadline: "", audience: "", platform: "", country: "" }); }} className="gradient-primary rounded-lg px-6 py-2.5 font-semibold text-primary-foreground">
          Create Another
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="font-display text-2xl font-bold">Create Campaign</h1>
      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Campaign Title *</label>
            <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description *</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="min-h-[100px] w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Deliverables *</label>
            <textarea value={form.deliverables} onChange={(e) => update("deliverables", e.target.value)} className="min-h-[80px] w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., 3 Instagram posts, 2 Stories, 1 Reel" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Budget Min ($)</label>
              <input type="number" value={form.budgetMin} onChange={(e) => update("budgetMin", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Budget Max ($)</label>
              <input type="number" value={form.budgetMax} onChange={(e) => update("budgetMax", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Platform</label>
              <select value={form.platform} onChange={(e) => update("platform", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Any</option>
                <option>Instagram</option>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>X (Twitter)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Target Country</label>
              <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Target Audience</label>
            <input type="text" value={form.audience} onChange={(e) => update("audience", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="e.g., 18-34, tech enthusiasts" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Attach Files</label>
            <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              <Upload className="mr-2 h-4 w-4" /> Drop files here or click to upload
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="gradient-primary rounded-lg px-8 py-3 font-semibold text-primary-foreground shadow-glow">
            Publish Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
