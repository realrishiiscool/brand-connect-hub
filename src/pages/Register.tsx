import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Sparkles, User, Building2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Register = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("kol");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "", niche: "", platform: "", website: "", industry: "" });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ ...form, role });
    navigate(role === "kol" ? "/kol/profile-completion" : "/company/profile-setup");
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold">KOL</span>
          </Link>

          <h1 className="mb-2 font-display text-2xl font-bold">Create your account</h1>
          <p className="mb-6 text-sm text-muted-foreground">Choose your role and get started in minutes.</p>

          {/* Role selector */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            {([
              { value: "kol" as UserRole, icon: User, label: "I'm a KOL", desc: "Influencer / Creator" },
              { value: "company" as UserRole, icon: Building2, label: "I'm a Brand", desc: "Company / Agency" },
            ]).map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border-2 p-4 text-center transition-all",
                  role === r.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                )}
              >
                <r.icon className={cn("h-6 w-6", role === r.value ? "text-primary" : "text-muted-foreground")} />
                <span className="text-sm font-semibold">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.desc}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">{role === "company" ? "Company Name" : "Full Name"}</label>
              <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Country</label>
              <input type="text" value={form.country} onChange={(e) => update("country", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" required />
            </div>

            {role === "kol" ? (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium">Category / Niche</label>
                  <select value={form.niche} onChange={(e) => update("niche", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select niche</option>
                    <option>Fashion & Beauty</option>
                    <option>Tech & Gaming</option>
                    <option>Fitness & Health</option>
                    <option>Food & Travel</option>
                    <option>Business & Finance</option>
                    <option>Entertainment</option>
                    <option>Education</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Primary Platform</label>
                  <select value={form.platform} onChange={(e) => update("platform", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select platform</option>
                    <option>Instagram</option>
                    <option>YouTube</option>
                    <option>TikTok</option>
                    <option>X (Twitter)</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="mb-1 block text-sm font-medium">Website</label>
                  <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Industry</label>
                  <select value={form.industry} onChange={(e) => update("industry", e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select industry</option>
                    <option>Technology</option>
                    <option>Fashion</option>
                    <option>Food & Beverage</option>
                    <option>Health & Wellness</option>
                    <option>Finance</option>
                    <option>Entertainment</option>
                    <option>Education</option>
                  </select>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="gradient-primary mt-2 h-11 w-full rounded-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="gradient-hero hidden items-center justify-center lg:flex lg:w-1/2">
        <div className="max-w-md px-12 text-center">
          <Sparkles className="mx-auto mb-6 h-16 w-16 text-primary" />
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            {role === "kol" ? "Monetize Your Influence" : "Find Perfect Creators"}
          </h2>
          <p className="text-primary-foreground/60">
            {role === "kol"
              ? "Connect with brands, negotiate deals, and get paid securely for your content."
              : "Discover verified influencers, launch campaigns, and track ROI in real-time."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
