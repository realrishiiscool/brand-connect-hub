import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <Outlet />
      <footer className="border-t border-border bg-secondary/50 py-12">
        <div className="container grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-bold">KOL</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              The premier platform connecting influencers with brands for authentic collaborations.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/explore-kols" className="hover:text-foreground">Explore KOLs</Link></li>
              <li><Link to="/explore-campaigns" className="hover:text-foreground">Campaigns</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-display text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2026 KOL Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
