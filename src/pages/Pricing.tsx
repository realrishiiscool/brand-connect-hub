import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    desc: "For KOLs just getting started",
    features: ["Up to 3 active collaborations", "Basic analytics", "Standard chat", "Community support"],
    notIncluded: ["Priority listing", "Advanced analytics", "Escrow protection"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "For growing influencers and brands",
    features: ["Unlimited collaborations", "Advanced analytics", "Priority listing", "Escrow protection", "File sharing", "Email support"],
    notIncluded: ["Dedicated manager"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For agencies and large brands",
    features: ["Everything in Pro", "Dedicated account manager", "Custom integrations", "SLA guarantee", "Bulk campaign tools", "API access", "Priority support"],
    notIncluded: [],
    cta: "Contact Sales",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h1>
        <p className="mt-3 text-lg text-muted-foreground">Choose the plan that fits your collaboration needs.</p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className={`rounded-2xl border p-6 ${tier.highlight ? "border-primary bg-primary/5 shadow-glow" : "border-border bg-card"}`}>
            {tier.highlight && <span className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Most Popular</span>}
            <h3 className="font-display text-xl font-bold">{tier.name}</h3>
            <div className="mt-2 mb-1">
              <span className="font-display text-3xl font-bold">{tier.price}</span>
              {tier.period && <span className="text-sm text-muted-foreground">{tier.period}</span>}
            </div>
            <p className="mb-6 text-sm text-muted-foreground">{tier.desc}</p>
            <ul className="mb-6 space-y-2">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-success" /> {f}</li>
              ))}
              {tier.notIncluded.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><X className="h-4 w-4" /> {f}</li>
              ))}
            </ul>
            <Link
              to="/register"
              className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold ${tier.highlight ? "gradient-primary text-primary-foreground" : "border border-border text-foreground hover:bg-secondary"}`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
