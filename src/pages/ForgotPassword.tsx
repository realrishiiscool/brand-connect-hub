import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold">KOL</span>
        </Link>
        {sent ? (
          <div className="text-center">
            <h1 className="mb-2 font-display text-2xl font-bold">Check your email</h1>
            <p className="mb-6 text-sm text-muted-foreground">We've sent a password reset link to {email}.</p>
            <Link to="/login" className="text-sm font-medium text-primary hover:underline">Back to login</Link>
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-center font-display text-2xl font-bold">Reset password</h1>
            <p className="mb-6 text-center text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" required />
              <button type="submit" className="gradient-primary h-11 w-full rounded-lg font-semibold text-primary-foreground">Send Reset Link</button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              <Link to="/login" className="text-primary hover:underline">Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
