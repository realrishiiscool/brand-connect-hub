import { Users, Target, Shield, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 font-display text-3xl font-bold md:text-4xl">About KOL Platform</h1>
        <p className="text-lg text-muted-foreground">
          We're building the future of influencer marketing — a transparent, fair, and efficient platform connecting brands with authentic creators worldwide.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
        {[
          { icon: Target, title: "Our Mission", desc: "To democratize influencer marketing by making authentic collaborations accessible to brands and creators of all sizes." },
          { icon: Users, title: "Who We Serve", desc: "From micro-influencers to celebrity KOLs, from startups to enterprise brands — we serve the entire creator economy." },
          { icon: Shield, title: "Trust & Safety", desc: "Every transaction is protected by our escrow system. Every KOL is verified with real audience data and engagement metrics." },
          { icon: Globe, title: "Global Reach", desc: "Operating in 50+ countries with support for multiple languages and currencies, connecting creators worldwide." },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3 text-primary"><item.icon className="h-6 w-6" /></div>
            <h3 className="mb-2 font-display text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
