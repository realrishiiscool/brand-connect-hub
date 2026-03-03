import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Building2, Camera, Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Company Info", "Brand Details"];

const CompanyProfileSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    description: "", website: "", industry: "", country: "", logo: "",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
    else navigate("/company/dashboard");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold">Setup Your Company Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Complete your profile to start creating campaigns.</p>
      </div>

      <div className="mx-auto flex max-w-md items-center justify-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
              i <= currentStep ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            )}>
              {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={cn("text-xs font-medium", i <= currentStep ? "text-foreground" : "text-muted-foreground")}>
              {step}
            </span>
            {i < steps.length - 1 && <div className={cn("h-px w-12", i < currentStep ? "bg-primary" : "bg-border")} />}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-lg rounded-xl border border-border bg-card p-6">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
                  <Building2 className="h-8 w-8" />
                </div>
                <button className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Company Description</label>
              <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="min-h-[100px] w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tell KOLs what your company does..." />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Website</label>
              <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://" />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Industry</label>
              <select value={form.industry} onChange={(e) => update("industry", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select industry</option>
                <option>Technology</option><option>Fashion</option><option>Food & Beverage</option><option>Health & Wellness</option><option>Finance</option><option>Entertainment</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Country</label>
              <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="United States" />
            </div>
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
              <><Sparkles className="h-4 w-4" /> Complete Setup</>
            ) : (
              <>Next <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileSetup;
