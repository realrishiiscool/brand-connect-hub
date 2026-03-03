import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, User, Globe, Camera, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Niche & Platform", "Profile Details", "Social Accounts"];

const KolProfileCompletion = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    niche: "", platform: "", bio: "", location: "", languages: "",
    instagram: "", youtube: "", tiktok: "",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
    else navigate("/kol/dashboard");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold">Complete Your Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Finish setting up to start receiving collaboration offers.</p>
      </div>

      {/* Progress */}
      <div className="mx-auto flex max-w-md items-center justify-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
              i <= currentStep ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            )}>
              {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("hidden text-xs font-medium sm:block", i <= currentStep ? "text-foreground" : "text-muted-foreground")}>
              {step}
            </span>
            {i < steps.length - 1 && <div className={cn("h-px w-8", i < currentStep ? "bg-primary" : "bg-border")} />}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-lg rounded-xl border border-border bg-card p-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Category / Niche *</label>
              <select value={form.niche} onChange={(e) => update("niche", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select your niche</option>
                <option>Fashion & Beauty</option><option>Tech & Gaming</option><option>Fitness & Health</option>
                <option>Food & Travel</option><option>Business & Finance</option><option>Entertainment</option><option>Education</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Primary Platform *</label>
              <select value={form.platform} onChange={(e) => update("platform", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select platform</option>
                <option>Instagram</option><option>YouTube</option><option>TikTok</option><option>X (Twitter)</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                  <User className="h-8 w-8" />
                </div>
                <button className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Bio</label>
              <textarea value={form.bio} onChange={(e) => update("bio", e.target.value)} className="min-h-[80px] w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tell brands about yourself..." />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Location</label>
              <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Los Angeles, CA" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Languages</label>
              <input type="text" value={form.languages} onChange={(e) => update("languages", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="English, Spanish" />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Link your social accounts to verify your reach. You can add more later.</p>
            {[
              { label: "Instagram", key: "instagram", placeholder: "@yourhandle" },
              { label: "YouTube", key: "youtube", placeholder: "Channel name" },
              { label: "TikTok", key: "tiktok", placeholder: "@yourhandle" },
            ].map((s) => (
              <div key={s.key}>
                <label className="mb-1 block text-sm font-medium">{s.label}</label>
                <input
                  type="text"
                  value={form[s.key as keyof typeof form]}
                  onChange={(e) => update(s.key, e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder={s.placeholder}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {currentStep > 0 ? (
            <button onClick={() => setCurrentStep((p) => p - 1)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
              Back
            </button>
          ) : <div />}
          <button onClick={handleNext} className="gradient-primary inline-flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold text-primary-foreground">
            {currentStep === steps.length - 1 ? (
              <><Sparkles className="h-4 w-4" /> Complete Profile</>
            ) : (
              <>Next <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KolProfileCompletion;
