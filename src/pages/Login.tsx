import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // Role-based redirect happens via effect
      const saved = localStorage.getItem("kol_user");
      if (saved) {
        const user = JSON.parse(saved);
        navigate(`/${user.role}/dashboard`);
      }
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold">KOL</span>
          </Link>

          <h1 className="mb-2 font-display text-2xl font-bold">Welcome back</h1>
          <p className="mb-8 text-sm text-muted-foreground">Enter your credentials to access your dashboard.</p>

          {/* Demo accounts */}
          <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
            <p className="mb-1 font-semibold text-primary">Demo Accounts:</p>
            <p className="text-muted-foreground"><strong>KOL:</strong> kol@demo.com</p>
            <p className="text-muted-foreground"><strong>Company:</strong> company@demo.com</p>
            <p className="text-muted-foreground">(any password)</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-background px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="gradient-primary h-11 w-full rounded-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="gradient-hero hidden items-center justify-center lg:flex lg:w-1/2">
        <div className="max-w-md px-12 text-center">
          <Sparkles className="mx-auto mb-6 h-16 w-16 text-primary" />
          <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground">
            Connect. Collaborate. <span className="text-gradient">Grow.</span>
          </h2>
          <p className="text-primary-foreground/60">
            Join the leading platform for influencer-brand partnerships and take your collaborations to the next level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
