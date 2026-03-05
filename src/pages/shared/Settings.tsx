import { Bell, Shield, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="font-display text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {/* Notifications */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-display text-base font-semibold">Notifications</h3>
          </div>
          <div className="space-y-3">
            {["Email notifications", "Push notifications", "Campaign updates", "Chat messages"].map((item) => (
              <label key={item} className="flex items-center justify-between">
                <span className="text-sm">{item}</span>
                <div className="relative h-6 w-11 cursor-pointer rounded-full bg-secondary transition-colors">
                  <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-muted-foreground/40 transition-all" />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-display text-base font-semibold">Security</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full rounded-lg border border-border px-4 py-3 text-left text-sm hover:bg-secondary">
              <p className="font-medium">Change Password</p>
              <p className="text-xs text-muted-foreground">Update your account password</p>
            </button>
            <button className="w-full rounded-lg border border-border px-4 py-3 text-left text-sm hover:bg-secondary">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">Add extra security to your account</p>
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
            <h3 className="font-display text-base font-semibold">Appearance</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className={`relative h-6 w-11 rounded-full transition-colors ${theme === "dark" ? "bg-primary" : "bg-secondary"}`}
              >
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-primary-foreground shadow transition-all ${theme === "dark" ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </label>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="font-display text-base font-semibold">Preferences</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Language</label>
              <select className="h-10 w-full max-w-xs rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Mandarin</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Timezone</label>
              <select className="h-10 w-full max-w-xs rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+8 (Singapore)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danger */}
        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <h3 className="mb-2 font-display text-base font-semibold text-destructive">Danger Zone</h3>
          <p className="mb-4 text-sm text-muted-foreground">Once you delete your account, there's no going back.</p>
          <button className="rounded-lg bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
