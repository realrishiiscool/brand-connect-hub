import { Link } from "react-router-dom";
import { ArrowRight, Users, Megaphone, Shield, TrendingUp, Star, Zap } from "lucide-react";

const stats = [
  { label: "Active KOLs", value: "12,000+" },
  { label: "Brands", value: "3,500+" },
  { label: "Campaigns", value: "45,000+" },
  { label: "Total Payout", value: "$28M+" },
];

const features = [
  { icon: Users, title: "Discover Top KOLs", description: "Browse thousands of verified influencers across every niche and platform." },
  { icon: Megaphone, title: "Launch Campaigns", description: "Create and manage campaigns with powerful targeting and budget controls." },
  { icon: Shield, title: "Secure Escrow", description: "Funds are held safely until deliverables are approved by both parties." },
  { icon: TrendingUp, title: "Real Analytics", description: "Track performance with detailed engagement and ROI analytics." },
  { icon: Star, title: "Verified Profiles", description: "Every KOL is verified with real audience data and engagement metrics." },
  { icon: Zap, title: "Instant Chat", description: "Negotiate deals and manage collaborations with real-time messaging." },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(168, 80%, 36%, 0.15), transparent 50%), radial-gradient(circle at 80% 50%, hsl(35, 95%, 55%, 0.1), transparent 50%)" }} />
        <div className="container relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              The #1 KOL Collaboration Platform
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Where Brands Meet
              <span className="text-gradient"> Influence</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/70 md:text-xl">
              Connect with top influencers, launch powerful campaigns, and grow your brand with authentic collaborations — all in one platform.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="gradient-primary inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:opacity-90"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/explore-kols"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/5"
              >
                Explore KOLs
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-bold text-primary md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Everything you need to collaborate</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From discovery to payment, we handle every step of the influencer marketing workflow.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-hero py-20">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to grow your brand?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/60">
            Join thousands of brands and creators already collaborating on KOL.
          </p>
          <Link
            to="/register"
            className="gradient-primary mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-all hover:opacity-90"
          >
            Get Started Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
