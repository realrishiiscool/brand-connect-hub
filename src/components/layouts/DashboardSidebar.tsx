import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, User, Link2, Handshake, MessageSquare, Wallet, Settings,
  Megaphone, Users, PlusCircle, ChevronLeft, ChevronRight, LogOut, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const kolNav = [
  { title: "Dashboard", path: "/kol/dashboard", icon: LayoutDashboard },
  { title: "Profile", path: "/kol/profile", icon: User },
  { title: "Social Accounts", path: "/kol/social-accounts", icon: Link2 },
  { title: "Collaborations", path: "/kol/collaborations", icon: Handshake },
  { title: "Messages", path: "/kol/messages", icon: MessageSquare },
  { title: "Wallet", path: "/kol/wallet", icon: Wallet },
  { title: "Settings", path: "/kol/settings", icon: Settings },
];

const companyNav = [
  { title: "Dashboard", path: "/company/dashboard", icon: LayoutDashboard },
  { title: "Profile", path: "/company/profile", icon: User },
  { title: "Create Campaign", path: "/company/create-campaign", icon: PlusCircle },
  { title: "Campaigns", path: "/company/campaigns", icon: Megaphone },
  { title: "Browse KOLs", path: "/company/kols", icon: Users },
  { title: "Messages", path: "/company/messages", icon: MessageSquare },
  { title: "Wallet", path: "/company/wallet", icon: Wallet },
  { title: "Settings", path: "/company/settings", icon: Settings },
];

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = user?.role === "company" ? companyNav : kolNav;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-sidebar-primary" />
            <span className="font-display text-lg font-bold text-sidebar-accent-foreground">KOL</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-3">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            {user?.name?.charAt(0) || "U"}
          </div>
          {!collapsed && (
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-sidebar-accent-foreground">{user?.name}</p>
              <p className="truncate text-xs text-sidebar-foreground">{user?.role === "kol" ? "Influencer" : "Company"}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={logout} className="rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
