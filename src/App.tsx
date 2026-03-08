import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CollaborationProvider } from "@/contexts/CollaborationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicLayout from "@/components/layouts/PublicLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ExploreKols from "./pages/ExploreKols";
import ExploreCampaigns from "./pages/ExploreCampaigns";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// KOL pages
import KolDashboard from "./pages/kol/Dashboard";
import KolProfile from "./pages/kol/Profile";
import KolSocialAccounts from "./pages/kol/SocialAccounts";
import KolCollaborations from "./pages/kol/Collaborations";
import KolProfileCompletion from "./pages/kol/ProfileCompletion";

// Company pages
import CompanyDashboard from "./pages/company/Dashboard";
import CompanyProfile from "./pages/company/Profile";
import CreateCampaign from "./pages/company/CreateCampaign";
import CompanyCampaigns from "./pages/company/Campaigns";
import BrowseKols from "./pages/company/BrowseKols";
import CompanyProfileSetup from "./pages/company/ProfileSetup";

// Shared pages
import Messages from "./pages/shared/Messages";
import Wallet from "./pages/shared/Wallet";
import Settings from "./pages/shared/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <AuthProvider>
          <CollaborationProvider>
            <HashRouter>
            <Routes>
              {/* Auth pages (no layout) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Public pages */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/explore-kols" element={<ExploreKols />} />
                <Route path="/explore-campaigns" element={<ExploreCampaigns />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
              </Route>

              {/* KOL protected routes */}
              <Route element={<ProtectedRoute allowedRoles={["kol"]}><DashboardLayout /></ProtectedRoute>}>
                <Route path="/kol/dashboard" element={<KolDashboard />} />
                <Route path="/kol/profile" element={<KolProfile />} />
                <Route path="/kol/profile-completion" element={<KolProfileCompletion />} />
                <Route path="/kol/social-accounts" element={<KolSocialAccounts />} />
                <Route path="/kol/collaborations" element={<KolCollaborations />} />
                <Route path="/kol/messages" element={<Messages />} />
                <Route path="/kol/wallet" element={<Wallet role="kol" />} />
                <Route path="/kol/settings" element={<Settings />} />
              </Route>

              {/* Company protected routes */}
              <Route element={<ProtectedRoute allowedRoles={["company"]}><DashboardLayout /></ProtectedRoute>}>
                <Route path="/company/dashboard" element={<CompanyDashboard />} />
                <Route path="/company/profile" element={<CompanyProfile />} />
                <Route path="/company/profile-setup" element={<CompanyProfileSetup />} />
                <Route path="/company/create-campaign" element={<CreateCampaign />} />
                <Route path="/company/campaigns" element={<CompanyCampaigns />} />
                <Route path="/company/kols" element={<BrowseKols />} />
                <Route path="/company/messages" element={<Messages />} />
                <Route path="/company/wallet" element={<Wallet role="company" />} />
                <Route path="/company/settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            </HashRouter>
          </CollaborationProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
